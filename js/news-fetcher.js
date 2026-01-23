/**
 * AI News Fetcher
 * Fetches latest AI news from multiple sources using RSS feeds
 * Uses rss2json API for RSS to JSON conversion
 */

class AINewsFetcher {
    constructor() {
        this.newsSection = document.getElementById('ai-news-section');
        this.newsContainer = document.getElementById('ai-news-container');
        this.refreshBtn = document.getElementById('refresh-news-btn');
        this.cacheKey = 'ai_news_cache';
        this.cacheTimeKey = 'ai_news_cache_time';
        this.cacheDuration = 3600000; // 1 hour in milliseconds
        
        // RSS feed sources - top AI news sites
        this.rssSources = [
            {
                name: 'TechCrunch AI',
                url: 'https://techcrunch.com/tag/artificial-intelligence/feed/',
                category: 'Tech News'
            },
            {
                name: 'MIT Technology Review',
                url: 'https://www.technologyreview.com/feed/',
                category: 'Research'
            },
            {
                name: 'VentureBeat AI',
                url: 'https://venturebeat.com/category/ai/feed/',
                category: 'Business'
            },
            {
                name: 'The Verge AI',
                url: 'https://www.theverge.com/ai-artificial-intelligence/rss/index.xml',
                category: 'Tech News'
            },
            {
                name: 'AI News',
                url: 'https://artificialintelligence-news.com/feed/',
                category: 'Industry'
            }
        ];
        
        this.init();
    }
    
    init() {
        this.loadNews();
        
        if (this.refreshBtn) {
            this.refreshBtn.addEventListener('click', () => {
                this.refreshNews();
            });
        }
    }
    
    async loadNews() {
        // Show skeleton loaders
        this.showSkeletons();
        
        // Check cache first
        const cachedNews = this.getFromCache();
        if (cachedNews) {
            this.displayNews(cachedNews);
            return;
        }
        
        // Fetch fresh news
        await this.fetchNews();
    }
    
    showSkeletons() {
        if (!this.newsContainer || !this.newsSection) return;
        
        // Show section with skeletons
        this.newsSection.style.display = 'block';
        
        const skeletonHTML = Array(3).fill(0).map(() => `
            <div class="skeleton-card">
                <div class="skeleton skeleton-image"></div>
                <div class="skeleton skeleton-title"></div>
                <div class="skeleton skeleton-text"></div>
                <div class="skeleton skeleton-text"></div>
                <div class="skeleton skeleton-text"></div>
            </div>
        `).join('');
        
        this.newsContainer.innerHTML = skeletonHTML;
    }
    
    async fetchNews() {
        try {
            const allNews = [];
            
            // Fetch from multiple sources in parallel
            const fetchPromises = this.rssSources.map(source => 
                this.fetchFromSource(source)
            );
            
            const results = await Promise.allSettled(fetchPromises);
            
            // Combine all successful results
            results.forEach((result, index) => {
                if (result.status === 'fulfilled' && result.value) {
                    allNews.push(...result.value);
                }
            });
            
            // If no news from any source, hide section
            if (allNews.length === 0) {
                this.showError('No news sources available');
                return;
            }
            
            // Sort by date (newest first)
            allNews.sort((a, b) => new Date(b.pubDate) - new Date(a.pubDate));
            
            // Take top 10
            const topNews = allNews.slice(0, 10);
            
            // Cache the results
            this.saveToCache(topNews);
            
            // Display
            this.displayNews(topNews);
            
        } catch (error) {
            console.error('Error fetching news:', error);
            this.showError('Error fetching news');
        }
    }
    
    async fetchFromSource(source) {
        try {
            // Use rss2json API (free, no API key needed for basic use)
            const apiUrl = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(source.url)}&count=5`;
            
            const response = await fetch(apiUrl);
            
            if (!response.ok) {
                console.warn(`Failed to fetch from ${source.name}`);
                return [];
            }
            
            const data = await response.json();
            
            if (data.status !== 'ok' || !data.items) {
                return [];
            }
            
            // Map to our news format
            return data.items.map(item => ({
                title: item.title,
                description: this.cleanDescription(item.description || item.content),
                link: item.link,
                pubDate: item.pubDate,
                source: source.name,
                category: source.category,
                thumbnail: item.thumbnail || item.enclosure?.link || this.getDefaultImage(source.category)
            }));
            
        } catch (error) {
            console.warn(`Error fetching from ${source.name}:`, error);
            return [];
        }
    }
    
    cleanDescription(html) {
        // Remove HTML tags and limit length
        const text = html.replace(/<[^>]*>/g, '').replace(/&nbsp;/g, ' ');
        return text.length > 150 ? text.substring(0, 150) + '...' : text;
    }
    
    getDefaultImage(category) {
        // Unsplash AI-related images as fallbacks
        const images = {
            'Tech News': 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400',
            'Research': 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=400',
            'Business': 'https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=400',
            'Industry': 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=400'
        };
        return images[category] || images['Tech News'];
    }
    
    displayNews(newsItems) {
        if (!this.newsContainer || !this.newsSection) return;
        
        // Hide section if no news available
        if (!newsItems || newsItems.length === 0) {
            this.newsSection.style.display = 'none';
            return;
        }
        
        // Show section and display news
        this.newsSection.style.display = 'block';
        
        const newsHTML = newsItems.map(item => this.createNewsCard(item)).join('');
        this.newsContainer.innerHTML = newsHTML;
        
        // Add fade-in animation
        this.newsContainer.querySelectorAll('.news-card').forEach((card, index) => {
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, index * 50);
        });
    }
    
    createNewsCard(item) {
        const timeAgo = this.getTimeAgo(new Date(item.pubDate));
        
        return `
            <article class="news-card" style="opacity: 0; transform: translateY(20px); transition: all 0.3s ease;">
                <a href="${item.link}" target="_blank" rel="noopener noreferrer" style="text-decoration: none; display: block; height: 100%;">
                    <div style="background: var(--card-bg); border-radius: 12px; overflow: hidden; border: 2px solid rgba(59, 130, 246, 0.2); transition: all 0.3s ease; height: 100%; display: flex; flex-direction: column;" class="news-card-hover">
                        <div style="position: relative; height: 200px; overflow: hidden; background: linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(16, 185, 129, 0.1));">
                            <img src="${item.thumbnail}" alt="${item.title}" 
                                 style="width: 100%; height: 100%; object-fit: cover;" 
                                 onerror="this.src='${this.getDefaultImage(item.category)}'">
                            <div style="position: absolute; top: 10px; right: 10px; background: rgba(59, 130, 246, 0.9); color: white; padding: 5px 10px; border-radius: 6px; font-size: 0.75rem; font-weight: 600;">
                                ${item.category}
                            </div>
                        </div>
                        <div style="padding: 20px; flex: 1; display: flex; flex-direction: column;">
                            <h3 style="color: var(--primary-color); margin-bottom: 10px; font-size: 1.1rem; line-height: 1.4; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;">
                                ${item.title}
                            </h3>
                            <p style="color: var(--text-secondary); font-size: 0.9rem; line-height: 1.5; margin-bottom: 15px; flex: 1; display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden;">
                                ${item.description}
                            </p>
                            <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85rem; color: var(--text-secondary); margin-top: auto;">
                                <span style="font-weight: 600;">${item.source}</span>
                                <span>${timeAgo}</span>
                            </div>
                        </div>
                    </div>
                </a>
            </article>
        `;
    }
    
    getTimeAgo(date) {
        const seconds = Math.floor((new Date() - date) / 1000);
        
        const intervals = {
            year: 31536000,
            month: 2592000,
            week: 604800,
            day: 86400,
            hour: 3600,
            minute: 60
        };
        
        for (const [unit, secondsInUnit] of Object.entries(intervals)) {
            const interval = Math.floor(seconds / secondsInUnit);
            if (interval >= 1) {
                return `${interval} ${unit}${interval > 1 ? 's' : ''} ago`;
            }
        }
        
        return 'Just now';
    }
    
    async refreshNews() {
        if (!this.refreshBtn) return;
        
        // Show loading state
        this.refreshBtn.disabled = true;
        this.refreshBtn.innerHTML = '⏳ Loading...';
        
        // Clear cache
        this.clearCache();
        
        // Fetch fresh news
        await this.fetchNews();
        
        // Reset button
        setTimeout(() => {
            this.refreshBtn.disabled = false;
            this.refreshBtn.innerHTML = '🔄 Refresh News';
        }, 1000);
    }
    
    // Cache management
    getFromCache() {
        try {
            const cachedTime = localStorage.getItem(this.cacheTimeKey);
            const cachedData = localStorage.getItem(this.cacheKey);
            
            if (!cachedTime || !cachedData) return null;
            
            const age = Date.now() - parseInt(cachedTime);
            
            // Return cache if less than 1 hour old
            if (age < this.cacheDuration) {
                return JSON.parse(cachedData);
            }
            
            return null;
        } catch (error) {
            console.warn('Error reading cache:', error);
            return null;
        }
    }
    
    saveToCache(data) {
        try {
            localStorage.setItem(this.cacheKey, JSON.stringify(data));
            localStorage.setItem(this.cacheTimeKey, Date.now().toString());
        } catch (error) {
            console.warn('Error saving to cache:', error);
        }
    }
    
    clearCache() {
        try {
            localStorage.removeItem(this.cacheKey);
            localStorage.removeItem(this.cacheTimeKey);
        } catch (error) {
            console.warn('Error clearing cache:', error);
        }
    }
    
    showError(message = 'Unable to load news. Please try again later.') {
        // Simply hide the section if there's an error
        if (this.newsSection) {
            this.newsSection.style.display = 'none';
        }
        // Log error to console for debugging
        console.warn('AI News Fetcher:', message);
    }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.aiNews = new AINewsFetcher();
    });
} else {
    window.aiNews = new AINewsFetcher();
}
