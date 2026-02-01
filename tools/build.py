#!/usr/bin/env python3
"""
Jinja2 Static Site Generator for AI Tech Mint
Converts YAML data + Jinja2 templates → Static HTML files
"""

import yaml
from jinja2 import Environment, FileSystemLoader
from pathlib import Path
import shutil
import os

# All tool categories in the system
TOOL_CATEGORIES = [
    'foundation_tools',
    'creative_tools',
    'writing_tools',
    'technical_tools',
    'business_tools',
    'research_tools',
    'voice_tools',
    'video_tools',
    'data_tools',
    'directory_tools'
]

def load_data():
    """Load all tool data from YAML"""
    print("📂 Loading data from YAML...")
    with open('data/tools.yaml', 'r') as f:
        data = yaml.safe_load(f)
    
    # Count total tools across all categories and collect featured tools
    total_tools = 0
    featured_tools = []
    
    for category in TOOL_CATEGORIES:
        tools = data.get(category, [])
        total_tools += len(tools)
        
        # Collect featured tools
        for tool in tools:
            if tool.get('featured', False):
                featured_tools.append(tool)
        
        # Update category metadata with tool counts
        cat_key = category.replace('_tools', '')
        if 'categories' in data and cat_key in data['categories']:
            data['categories'][cat_key]['tool_count'] = len(tools)
    
    data['total_tools'] = total_tools
    data['featured_tools'] = featured_tools
    
    print(f"   ✅ Loaded {total_tools} tools ({len(featured_tools)} featured)")
    return data

def load_tool_page_data(yaml_file):
    """Load tool page data from a YAML file"""
    with open(yaml_file, 'r') as f:
        return yaml.safe_load(f)

def setup_jinja2():
    """Setup Jinja2 environment"""
    print("🔧 Setting up Jinja2 environment...")
    env = Environment(
        loader=FileSystemLoader('templates'),
        trim_blocks=True,
        lstrip_blocks=True
    )
    print("   ✅ Jinja2 ready")
    return env

def render_homepage(env, data):
    """Generate index.html from template"""
    print("🏠 Rendering homepage...")
    template = env.get_template('index.html')
    output = template.render(**data)
    
    # Ensure output directory exists
    output_dir = Path('../output')
    output_dir.mkdir(exist_ok=True)
    
    # Write output
    output_file = output_dir / 'index.html'
    with open(output_file, 'w', encoding='utf-8') as f:
        f.write(output)
    
    print(f"   ✅ Generated: {output_file}")
    return output_file

def render_tool_pages(env):
    """Generate individual tool pages from YAML data files"""
    print("🔧 Rendering tool pages...")
    
    tool_pages_dir = Path('data/tool_pages')
    if not tool_pages_dir.exists():
        print("   ⚠️  No tool_pages directory found, skipping")
        return []
    
    output_dir = Path('../output')
    generated_pages = []
    
    # Check if tool_page.html template exists
    try:
        template = env.get_template('tool_page.html')
    except Exception as e:
        print(f"   ⚠️  tool_page.html template not found: {e}")
        return []
    
    # Process each YAML file in tool_pages directory
    for yaml_file in tool_pages_dir.glob('*.yaml'):
        try:
            data = load_tool_page_data(yaml_file)
            tool = data.get('tool', {})
            content = data.get('content', {})
            
            # Determine output path based on category
            category = tool.get('category', 'misc')
            slug = tool.get('slug', yaml_file.stem)
            
            # Create category directory if needed
            category_dir = output_dir / 'pages' / category
            category_dir.mkdir(parents=True, exist_ok=True)
            
            # Render the template
            output = template.render(tool=tool, content=content)
            
            # Write output file
            output_file = category_dir / f'{slug}.html'
            with open(output_file, 'w', encoding='utf-8') as f:
                f.write(output)
            
            generated_pages.append(output_file)
            print(f"   ✅ Generated: {output_file}")
            
        except Exception as e:
            print(f"   ❌ Error processing {yaml_file}: {e}")
    
    return generated_pages

def copy_static_files():
    """Copy CSS, JS, images to output directory"""
    print("📦 Copying static assets...")
    
    output_dir = Path('../output')
    
    # Copy CSS
    css_src = Path('../css')
    css_dest = output_dir / 'css'
    if css_src.exists():
        shutil.copytree(css_src, css_dest, dirs_exist_ok=True)
        print("   ✅ Copied CSS files")
    
    # Copy images
    images_src = Path('../images')
    images_dest = output_dir / 'images'
    if images_src.exists():
        shutil.copytree(images_src, images_dest, dirs_exist_ok=True)
        print("   ✅ Copied images")
    
    # Copy JS (if exists)
    js_src = Path('../js')
    js_dest = output_dir / 'js'
    if js_src.exists():
        shutil.copytree(js_src, js_dest, dirs_exist_ok=True)
        print("   ✅ Copied JS files")
    
    # Copy pages folder (for tool pages like canva.html)
    pages_src = Path('../pages')
    pages_dest = output_dir / 'pages'
    if pages_src.exists():
        shutil.copytree(pages_src, pages_dest, dirs_exist_ok=True)
        print("   ✅ Copied pages")
    
    # Copy other root files
    root_files = ['manifest.json', 'robots.txt', 'sitemap.xml']
    for filename in root_files:
        src = Path(f'../{filename}')
        if src.exists():
            shutil.copy(src, output_dir / filename)
    print("   ✅ Copied root files (manifest, robots, sitemap)")

def generate_stats(data, tool_pages_count=0):
    """Display generation statistics"""
    print("\n" + "="*50)
    print("📊 BUILD STATISTICS")
    print("="*50)
    print(f"Total Tools:        {data['total_tools']}")
    
    for category in TOOL_CATEGORIES:
        cat_name = category.replace('_tools', '').title()
        count = len(data.get(category, []))
        if count > 0:
            print(f"{cat_name}:".ljust(20) + str(count))
    
    print(f"Tool Pages:         {tool_pages_count}")
    print(f"Templates Used:     4 (base, index, tool_card, tool_page)")
    print(f"Output Directory:   ../output/")
    print("="*50)

def main():
    """Main build process"""
    print("\n" + "🚀 "*20)
    print("AI TECH MINT - JINJA2 STATIC SITE GENERATOR")
    print("🚀 "*20 + "\n")
    
    try:
        # Load data
        data = load_data()
        
        # Setup Jinja2
        env = setup_jinja2()
        
        # Generate homepage
        output_file = render_homepage(env, data)
        
        # Generate tool pages from YAML
        tool_pages = render_tool_pages(env)
        
        # Copy static files
        copy_static_files()
        
        # Show statistics
        generate_stats(data, len(tool_pages))
        
        print("\n✨ BUILD COMPLETE! ✨")
        print(f"\n👉 Open file: {output_file.resolve()}")
        print(f"👉 Or run: open {output_file.resolve()}\n")
        
    except FileNotFoundError as e:
        print(f"\n❌ ERROR: File not found - {e}")
        print("   Make sure you're running this from the 'tools/' directory")
    except Exception as e:
        print(f"\n❌ ERROR: {e}")
        import traceback
        traceback.print_exc()

if __name__ == '__main__':
    main()
