/**
 * AI Mastery Course - Interactive Features
 * Makes the learning experience engaging and tracks user progress
 */

// ==================== CONFIGURATION ====================
const CONFIG = {
    storagePrefix: 'aiMastery_',
    totalTools: 28,
    animationDuration: 300
};

// ==================== UTILITY FUNCTIONS ====================
const Storage = {
    set(key, value) {
        try {
            localStorage.setItem(CONFIG.storagePrefix + key, JSON.stringify(value));
        } catch (e) {
            console.warn('LocalStorage not available:', e);
        }
    },
    
    get(key, defaultValue = null) {
        try {
            const item = localStorage.getItem(CONFIG.storagePrefix + key);
            return item ? JSON.parse(item) : defaultValue;
        } catch (e) {
            console.warn('LocalStorage not available:', e);
            return defaultValue;
        }
    },
    
    remove(key) {
        try {
            localStorage.removeItem(CONFIG.storagePrefix + key);
        } catch (e) {
            console.warn('LocalStorage not available:', e);
        }
    }
};

// ==================== PROGRESS TRACKING ====================
class ProgressTracker {
    constructor() {
        this.completed = Storage.get('completed', []);
        this.bookmarks = Storage.get('bookmarks', []);
        this.init();
    }
    
    init() {
        // this.addProgressBars(); // Removed: progress bar disabled per user request
        this.addCompletionButtons();
        this.addBookmarkButtons();
        this.updateGlobalProgress();
    }
    
    // DISABLED: Progress bar removed per user request
    // addProgressBars() {
    //     // Add progress bar to header if on index page
    //     const header = document.querySelector('header .container');
    //     if (header && window.location.pathname.includes('index.html') || window.location.pathname === '/') {
    //         const progressHTML = `
    //             <div class="progress-container" style="margin-top: 20px;">
    //                 <div class="progress-bar-wrapper">
    //                     <div class="progress-bar" id="globalProgress">
    //                         <div class="progress-fill" style="width: 0%"></div>
    //                     </div>
    //                     <div class="progress-text">
    //                         <span id="progressCount">0/${CONFIG.totalTools}</span> tools completed
    //                         <span id="progressPercent">0%</span>
    //                     </div>
    //                 </div>
    //             </div>
    //         `;
    //         header.insertAdjacentHTML('beforeend', progressHTML);
    //     }
    // }
    
    addCompletionButtons() {
        // Add "Mark as Complete" button to day cards
        const dayCards = document.querySelectorAll('.day-card');
        dayCards.forEach((card, index) => {
            const dayNum = index + 1;
            const isCompleted = this.completed.includes(dayNum);
            
            const buttonHTML = `
                <button class="completion-btn ${isCompleted ? 'completed' : ''}" 
                        data-day="${dayNum}"
                        onclick="progressTracker.toggleCompletion(${dayNum})">
                    ${isCompleted ? '✅' : '☐'} ${isCompleted ? 'Done' : 'Complete'}
                </button>
            `;
            
            const link = card.querySelector('.day-link');
            if (link) {
                link.insertAdjacentHTML('beforebegin', buttonHTML);
            }
        });
    }
    
    addBookmarkButtons() {
        // Add bookmark button to day cards
        const dayCards = document.querySelectorAll('.day-card');
        dayCards.forEach((card, index) => {
            const dayNum = index + 1;
            const isBookmarked = this.bookmarks.includes(dayNum);
            
            const buttonHTML = `
                <button class="bookmark-btn ${isBookmarked ? 'bookmarked' : ''}" 
                        data-day="${dayNum}"
                        onclick="progressTracker.toggleBookmark(${dayNum})"
                        title="${isBookmarked ? 'Remove bookmark' : 'Bookmark this tool'}">
                    ${isBookmarked ? '⭐' : '☆'}
                </button>
            `;
            
            const dayNumber = card.querySelector('.day-number');
            if (dayNumber) {
                dayNumber.insertAdjacentHTML('afterend', buttonHTML);
            }
        });
    }
    
    toggleCompletion(dayNum) {
        const index = this.completed.indexOf(dayNum);
        if (index > -1) {
            this.completed.splice(index, 1);
        } else {
            this.completed.push(dayNum);
        }
        Storage.set('completed', this.completed);
        this.updateUI(dayNum);
        this.updateGlobalProgress();
        this.showNotification(index > -1 ? 'Unmarked as complete' : '🎉 Great job! Tool completed!');
    }
    
    toggleBookmark(dayNum) {
        const index = this.bookmarks.indexOf(dayNum);
        if (index > -1) {
            this.bookmarks.splice(index, 1);
        } else {
            this.bookmarks.push(dayNum);
        }
        Storage.set('bookmarks', this.bookmarks);
        this.updateBookmarkUI(dayNum);
        this.showNotification(index > -1 ? 'Bookmark removed' : '⭐ Bookmarked!');
    }
    
    updateUI(dayNum) {
        const btn = document.querySelector(`.completion-btn[data-day="${dayNum}"]`);
        if (btn) {
            const isCompleted = this.completed.includes(dayNum);
            btn.classList.toggle('completed', isCompleted);
            btn.textContent = isCompleted ? '✅ Done' : '☐ Complete';
        }
    }
    
    updateBookmarkUI(dayNum) {
        const btn = document.querySelector(`.bookmark-btn[data-day="${dayNum}"]`);
        if (btn) {
            const isBookmarked = this.bookmarks.includes(dayNum);
            btn.classList.toggle('bookmarked', isBookmarked);
            btn.textContent = isBookmarked ? '⭐' : '☆';
            btn.title = isBookmarked ? 'Remove bookmark' : 'Bookmark this tool';
        }
    }
    
    updateGlobalProgress() {
        const count = this.completed.length;
        const percent = Math.round((count / CONFIG.totalTools) * 100);
        
        const countEl = document.getElementById('progressCount');
        const percentEl = document.getElementById('progressPercent');
        const fillEl = document.querySelector('.progress-fill');
        
        if (countEl) countEl.textContent = `${count}/${CONFIG.totalTools}`;
        if (percentEl) percentEl.textContent = `${percent}%`;
        if (fillEl) {
            fillEl.style.width = `${percent}%`;
            // Change color based on progress
            if (percent < 33) fillEl.style.background = 'linear-gradient(90deg, #ef4444, #f59e0b)';
            else if (percent < 66) fillEl.style.background = 'linear-gradient(90deg, #f59e0b, #3b82f6)';
            else fillEl.style.background = 'linear-gradient(90deg, #3b82f6, #10b981)';
        }
    }
    
    showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        document.body.appendChild(notification);
        
        setTimeout(() => notification.classList.add('show'), 10);
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }
}

// ==================== THEME SWITCHER ====================
class ThemeSwitcher {
    constructor() {
        this.currentTheme = Storage.get('theme', 'dark');
        this.init();
    }
    
    init() {
        this.applyTheme(this.currentTheme);
        this.addToggleButton();
    }
    
    addToggleButton() {
        // Add fixed position theme toggle on the right side
        const buttonHTML = `
            <button class="theme-toggle-fixed" onclick="themeSwitcher.toggle()" title="Toggle Dark/Light Mode">
                <span class="theme-icon">${this.currentTheme === 'dark' ? '☀️' : '🌙'}</span>
            </button>
        `;
        document.body.insertAdjacentHTML('beforeend', buttonHTML);
    }
    
    toggle() {
        this.currentTheme = this.currentTheme === 'dark' ? 'light' : 'dark';
        this.applyTheme(this.currentTheme);
        Storage.set('theme', this.currentTheme);
        
        const icon = document.querySelector('.theme-icon');
        if (icon) icon.textContent = this.currentTheme === 'dark' ? '☀️' : '🌙';
    }
    
    applyTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        
        if (theme === 'light') {
            document.documentElement.style.setProperty('--dark-bg', '#f0f4f8');
            document.documentElement.style.setProperty('--card-bg', '#ffffff');
            document.documentElement.style.setProperty('--text-primary', '#1a202c');
            document.documentElement.style.setProperty('--text-secondary', '#4a5568');
        } else {
            document.documentElement.style.setProperty('--dark-bg', '#0f1419');
            document.documentElement.style.setProperty('--card-bg', '#1a1f2e');
            document.documentElement.style.setProperty('--text-primary', '#f0fdf4');
            document.documentElement.style.setProperty('--text-secondary', '#d1fae5');
        }
    }
}

// ==================== SEARCH FUNCTIONALITY ====================
class SearchEngine {
    constructor() {
        this.init();
    }
    
    init() {
        // Search bar removed per user request
        // this.addSearchBar();
        // this.setupSearch();
    }
    
    addSearchBar() {
        const container = document.querySelector('.container');
        if (container && (window.location.pathname.includes('index.html') || window.location.pathname === '/')) {
            const searchHTML = `
                <div class="search-container">
                    <input type="text" 
                           id="toolSearch" 
                           class="search-input" 
                           placeholder="🔍 Search tools, features, or categories..."
                           autocomplete="off">
                    <div id="searchResults" class="search-results"></div>
                </div>
            `;
            container.insertAdjacentHTML('afterbegin', searchHTML);
        }
    }
    
    setupSearch() {
        const searchInput = document.getElementById('toolSearch');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => this.search(e.target.value));
            searchInput.addEventListener('focus', () => {
                if (searchInput.value) this.search(searchInput.value);
            });
            
            // Close search results when clicking outside
            document.addEventListener('click', (e) => {
                if (!e.target.closest('.search-container')) {
                    this.hideResults();
                }
            });
        }
    }
    
    search(query) {
        if (!query || query.length < 2) {
            this.hideResults();
            return;
        }
        
        const results = this.findMatches(query.toLowerCase());
        this.displayResults(results, query);
    }
    
    findMatches(query) {
        const cards = document.querySelectorAll('.day-card, .category-card');
        const matches = [];
        
        cards.forEach(card => {
            const title = card.querySelector('h4')?.textContent || '';
            const description = card.querySelector('.day-description, p')?.textContent || '';
            const text = (title + ' ' + description).toLowerCase();
            
            if (text.includes(query)) {
                const link = card.querySelector('a')?.href || '#';
                matches.push({
                    title: title,
                    description: description.substring(0, 100) + '...',
                    link: link
                });
            }
        });
        
        return matches;
    }
    
    displayResults(results, query) {
        const resultsDiv = document.getElementById('searchResults');
        if (!resultsDiv) return;
        
        if (results.length === 0) {
            resultsDiv.innerHTML = `
                <div class="search-result-item">
                    <p style="color: var(--text-secondary);">No results found for "${query}"</p>
                </div>
            `;
        } else {
            resultsDiv.innerHTML = results.map(result => `
                <a href="${result.link}" class="search-result-item">
                    <strong>${this.highlight(result.title, query)}</strong>
                    <p>${this.highlight(result.description, query)}</p>
                </a>
            `).join('');
        }
        
        resultsDiv.style.display = 'block';
    }
    
    highlight(text, query) {
        const regex = new RegExp(`(${query})`, 'gi');
        return text.replace(regex, '<mark>$1</mark>');
    }
    
    hideResults() {
        const resultsDiv = document.getElementById('searchResults');
        if (resultsDiv) resultsDiv.style.display = 'none';
    }
}

// ==================== SMOOTH SCROLL ====================
class SmoothScroller {
    constructor() {
        this.init();
    }
    
    init() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                const href = anchor.getAttribute('href');
                if (href !== '#' && href !== '#!') {
                    e.preventDefault();
                    const target = document.querySelector(href);
                    if (target) {
                        target.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                    }
                }
            });
        });
        
        this.addScrollToTop();
    }
    
    addScrollToTop() {
        const buttonHTML = `
            <button class="scroll-to-top" onclick="window.scrollTo({top: 0, behavior: 'smooth'})">
                ↑
            </button>
        `;
        document.body.insertAdjacentHTML('beforeend', buttonHTML);
        
        const btn = document.querySelector('.scroll-to-top');
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                btn.classList.add('visible');
            } else {
                btn.classList.remove('visible');
            }
        });
    }
}

// ==================== INTERACTIVE QUIZZES ====================
class QuizSystem {
    constructor() {
        this.scores = Storage.get('quizScores', {});
        this.init();
    }
    
    init() {
        this.enhanceQuizzes();
    }
    
    enhanceQuizzes() {
        const quizQuestions = document.querySelectorAll('.quiz-question');
        quizQuestions.forEach((question, index) => {
            this.makeQuestionInteractive(question, index);
        });
    }
    
    makeQuestionInteractive(question, index) {
        const options = question.querySelectorAll('.quiz-options li');
        const details = question.querySelector('details');
        
        options.forEach(option => {
            option.style.cursor = 'pointer';
            option.addEventListener('click', () => {
                // Remove previous selections
                options.forEach(opt => opt.classList.remove('selected', 'correct', 'wrong'));
                
                // Mark this option as selected
                option.classList.add('selected');
                
                // Show answer
                if (details) {
                    details.open = true;
                    
                    // Check if correct (simple heuristic - in real app, you'd have answer data)
                    setTimeout(() => {
                        const isCorrect = this.checkAnswer(option, details);
                        option.classList.add(isCorrect ? 'correct' : 'wrong');
                        this.updateScore(index, isCorrect);
                    }, 500);
                }
            });
        });
    }
    
    checkAnswer(option, details) {
        // Simple check - if the answer details mentions the option text, it's likely correct
        // In a real implementation, you'd have structured quiz data
        const answerText = details.textContent.toLowerCase();
        const optionText = option.textContent.toLowerCase();
        return answerText.includes(optionText.substring(0, 20));
    }
    
    updateScore(questionIndex, isCorrect) {
        const pageKey = window.location.pathname;
        if (!this.scores[pageKey]) this.scores[pageKey] = {};
        this.scores[pageKey][questionIndex] = isCorrect;
        Storage.set('quizScores', this.scores);
    }
}

// ==================== VIDEO TRACKING ====================
class VideoTracker {
    constructor() {
        this.watched = Storage.get('videosWatched', []);
        this.init();
    }
    
    init() {
        this.trackVideos();
    }
    
    trackVideos() {
        const videos = document.querySelectorAll('.video-container iframe');
        videos.forEach((video, index) => {
            const videoId = this.getVideoId(video.src);
            if (videoId) {
                this.addWatchIndicator(video, videoId);
            }
        });
    }
    
    getVideoId(src) {
        const match = src.match(/embed\/([^?]+)/);
        return match ? match[1] : null;
    }
    
    addWatchIndicator(video, videoId) {
        const isWatched = this.watched.includes(videoId);
        const container = video.closest('.video-card');
        
        if (container && !isWatched) {
            video.addEventListener('load', () => {
                setTimeout(() => {
                    this.markAsWatched(videoId);
                }, 30000); // Mark as watched after 30 seconds
            });
        }
    }
    
    markAsWatched(videoId) {
        if (!this.watched.includes(videoId)) {
            this.watched.push(videoId);
            Storage.set('videosWatched', this.watched);
        }
    }
}

// ==================== TIPS & HINTS ====================
class TipSystem {
    constructor() {
        this.tipsShown = Storage.get('tipsShown', []);
        this.tips = [
            "💡 Tip: Bookmark your favorite tools using the ⭐ button!",
            "💡 Tip: Mark tools as complete to track your progress!",
            "💡 Tip: Use the search bar to quickly find tools!",
            "💡 Tip: All your progress is saved automatically!",
            "💡 Tip: Try the dark/light theme toggle in the navigation!",
            "💡 Tip: You can learn tools in any order - choose what interests you!",
            "💡 Tip: Watch the video tutorials for hands-on learning!",
            "💡 Tip: Check the 'Browse by Category' for goal-oriented learning!"
        ];
        this.init();
    }
    
    init() {
        // Show a tip after 10 seconds if user hasn't seen all tips
        if (this.tipsShown.length < this.tips.length) {
            setTimeout(() => this.showRandomTip(), 10000);
        }
    }
    
    showRandomTip() {
        const unseenTips = this.tips.filter((tip, index) => !this.tipsShown.includes(index));
        if (unseenTips.length === 0) return;
        
        const randomIndex = Math.floor(Math.random() * unseenTips.length);
        const tip = unseenTips[randomIndex];
        const tipIndex = this.tips.indexOf(tip);
        
        const tipDiv = document.createElement('div');
        tipDiv.className = 'tip-notification';
        tipDiv.innerHTML = `
            ${tip}
            <button onclick="this.parentElement.remove()" style="margin-left: 15px;">✕</button>
        `;
        document.body.appendChild(tipDiv);
        
        setTimeout(() => tipDiv.classList.add('show'), 10);
        setTimeout(() => {
            tipDiv.classList.remove('show');
            setTimeout(() => tipDiv.remove(), 300);
        }, 8000);
        
        this.tipsShown.push(tipIndex);
        Storage.set('tipsShown', this.tipsShown);
    }
}

// ==================== KEYBOARD SHORTCUTS ====================
class KeyboardShortcuts {
    constructor() {
        this.init();
    }
    
    init() {
        document.addEventListener('keydown', (e) => {
            // Ctrl/Cmd + K for search - DISABLED (search removed)
            // if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            //     e.preventDefault();
            //     const searchInput = document.getElementById('toolSearch');
            //     if (searchInput) searchInput.focus();
            // }
            
            // Ctrl/Cmd + B for bookmarks (show bookmarked items)
            if ((e.ctrlKey || e.metaKey) && e.key === 'b') {
                e.preventDefault();
                this.showBookmarked();
            }
            
            // Escape to close modals
            if (e.key === 'Escape') {
                // Search removed, only close feedback modal
                if (window.feedbackSystem) feedbackSystem.closeModal();
            }
        });
    }
    
    showBookmarked() {
        const bookmarks = Storage.get('bookmarks', []);
        if (bookmarks.length === 0) {
            alert('No bookmarked tools yet! Use the ⭐ button to bookmark tools.');
            return;
        }
        
        const bookmarkedCards = [];
        bookmarks.forEach(dayNum => {
            const card = document.querySelector(`.day-card:nth-child(${dayNum})`);
            if (card) {
                card.scrollIntoView({ behavior: 'smooth', block: 'center' });
                card.style.animation = 'pulse 1s ease-in-out 3';
            }
        });
    }
}

// ==================== FEEDBACK SYSTEM ====================
class FeedbackSystem {
    constructor() {
        // IMPORTANT: Replace this with your Google Apps Script Web App URL
        this.scriptURL = 'YOUR_GOOGLE_SCRIPT_URL_HERE';
        this.init();
    }
    
    init() {
        this.addFeedbackButton();
        this.createModal();
    }
    
    addFeedbackButton() {
        const buttonHTML = `
            <button class="feedback-button" onclick="feedbackSystem.openModal()" title="Report an issue or give feedback">
                <span class="feedback-icon">🐛</span>
                <span class="feedback-text">Report Issue</span>
            </button>
        `;
        document.body.insertAdjacentHTML('beforeend', buttonHTML);
    }
    
    createModal() {
        const modalHTML = `
            <div id="feedbackModal" class="feedback-modal">
                <div class="feedback-modal-content">
                    <div class="feedback-modal-header">
                        <h2>🐛 Report an Issue</h2>
                        <button class="feedback-close" onclick="feedbackSystem.closeModal()">&times;</button>
                    </div>
                    
                    <form id="feedbackForm" class="feedback-form">
                        <div class="feedback-form-group">
                            <label for="userEmail">
                                Email <span class="optional">(optional)</span>
                            </label>
                            <input 
                                type="email" 
                                id="userEmail" 
                                name="email"
                                placeholder="your@email.com"
                                class="feedback-input">
                            <small>We'll only use this to follow up on your issue</small>
                        </div>
                        
                        <div class="feedback-form-group">
                            <label for="issueType">Issue Type *</label>
                            <select id="issueType" name="type" class="feedback-select" required>
                                <option value="">Select issue type...</option>
                                <option value="bug">🐛 Bug / Error</option>
                                <option value="content">📝 Content Issue</option>
                                <option value="video">📺 Video Not Working</option>
                                <option value="typo">✏️ Typo / Grammar</option>
                                <option value="feature">💡 Feature Request</option>
                                <option value="other">❓ Other</option>
                            </select>
                        </div>
                        
                        <div class="feedback-form-group">
                            <label for="currentPage">Current Page *</label>
                            <input 
                                type="text" 
                                id="currentPage" 
                                name="page"
                                class="feedback-input"
                                readonly
                                required>
                        </div>
                        
                        <div class="feedback-form-group">
                            <label for="issueDescription">
                                Description * <span class="char-count"><span id="charCount">0</span>/500</span>
                            </label>
                            <textarea 
                                id="issueDescription" 
                                name="description"
                                class="feedback-textarea"
                                placeholder="Please describe the issue in detail..."
                                maxlength="500"
                                required></textarea>
                        </div>
                        
                        <div class="feedback-actions">
                            <button type="button" onclick="feedbackSystem.closeModal()" class="feedback-btn feedback-btn-secondary">
                                Cancel
                            </button>
                            <button type="submit" class="feedback-btn feedback-btn-primary">
                                <span class="btn-text">Submit Report</span>
                                <span class="btn-loading" style="display: none;">Sending...</span>
                            </button>
                        </div>
                    </form>
                    
                    <div id="feedbackSuccess" class="feedback-success" style="display: none;">
                        <div class="success-icon">✅</div>
                        <h3>Thank you!</h3>
                        <p>Your feedback has been submitted successfully.</p>
                        <button onclick="feedbackSystem.closeModal()" class="feedback-btn feedback-btn-primary">
                            Close
                        </button>
                    </div>
                </div>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', modalHTML);
        
        this.setupFormHandlers();
    }
    
    setupFormHandlers() {
        const form = document.getElementById('feedbackForm');
        const textarea = document.getElementById('issueDescription');
        const charCount = document.getElementById('charCount');
        
        // Character count
        if (textarea && charCount) {
            textarea.addEventListener('input', () => {
                charCount.textContent = textarea.value.length;
            });
        }
        
        // Form submission
        if (form) {
            form.addEventListener('submit', (e) => this.handleSubmit(e));
        }
        
        // Set current page
        const pageInput = document.getElementById('currentPage');
        if (pageInput) {
            pageInput.value = window.location.pathname + window.location.search;
        }
        
        // Close modal on backdrop click
        const modal = document.getElementById('feedbackModal');
        if (modal) {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    this.closeModal();
                }
            });
        }
    }
    
    openModal() {
        const modal = document.getElementById('feedbackModal');
        const form = document.getElementById('feedbackForm');
        const success = document.getElementById('feedbackSuccess');
        
        if (modal) {
            modal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
            
            // Reset form
            if (form) {
                form.reset();
                form.style.display = 'block';
                
                // Set current page again
                const pageInput = document.getElementById('currentPage');
                if (pageInput) {
                    pageInput.value = window.location.pathname + window.location.search;
                }
            }
            if (success) success.style.display = 'none';
            
            // Focus first input
            setTimeout(() => {
                const firstInput = document.getElementById('issueType');
                if (firstInput) firstInput.focus();
            }, 100);
        }
    }
    
    closeModal() {
        const modal = document.getElementById('feedbackModal');
        if (modal) {
            modal.style.display = 'none';
            document.body.style.overflow = '';
        }
    }
    
    async handleSubmit(e) {
        e.preventDefault();
        
        const form = e.target;
        const submitBtn = form.querySelector('button[type="submit"]');
        const btnText = submitBtn.querySelector('.btn-text');
        const btnLoading = submitBtn.querySelector('.btn-loading');
        
        // Disable submit button
        submitBtn.disabled = true;
        btnText.style.display = 'none';
        btnLoading.style.display = 'inline';
        
        // Collect form data
        const formData = new FormData(form);
        const data = {
            email: formData.get('email') || 'Anonymous',
            type: formData.get('type'),
            page: formData.get('page'),
            description: formData.get('description'),
            timestamp: new Date().toISOString(),
            userAgent: navigator.userAgent,
            screenSize: `${window.screen.width}x${window.screen.height}`
        };
        
        try {
            // Check if script URL is configured
            if (this.scriptURL === 'YOUR_GOOGLE_SCRIPT_URL_HERE') {
                // For testing without Google Sheets
                console.log('Feedback data:', data);
                await this.simulateDelay(1000);
                this.showSuccess();
                return;
            }
            
            // Submit to Google Sheets
            const response = await fetch(this.scriptURL, {
                method: 'POST',
                mode: 'no-cors',
                cache: 'no-cache',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });
            
            this.showSuccess();
            
        } catch (error) {
            console.error('Error submitting feedback:', error);
            alert('Sorry, there was an error submitting your feedback. Please try again later.');
            
            // Re-enable submit button
            submitBtn.disabled = false;
            btnText.style.display = 'inline';
            btnLoading.style.display = 'none';
        }
    }
    
    showSuccess() {
        const form = document.getElementById('feedbackForm');
        const success = document.getElementById('feedbackSuccess');
        
        if (form) form.style.display = 'none';
        if (success) success.style.display = 'block';
        
        // Auto-close after 3 seconds
        setTimeout(() => {
            this.closeModal();
        }, 3000);
    }
    
    simulateDelay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

// ==================== CONFIGURE YOUR GOOGLE SCRIPT URL ====================
// After setting up Google Apps Script, replace the URL above in the FeedbackSystem class
// Instructions in FEEDBACK_SETUP_GUIDE.md

// ==================== INITIALIZE ALL FEATURES ====================
let progressTracker, themeSwitcher, searchEngine, smoothScroller, quizSystem, videoTracker, tipSystem, keyboardShortcuts, feedbackSystem;

document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 AI Mastery - Interactive features loading...');
    
    // Initialize all features
    progressTracker = new ProgressTracker();
    themeSwitcher = new ThemeSwitcher();
    // searchEngine = new SearchEngine(); // REMOVED: Search functionality disabled per user request
    smoothScroller = new SmoothScroller();
    quizSystem = new QuizSystem();
    videoTracker = new VideoTracker();
    tipSystem = new TipSystem();
    keyboardShortcuts = new KeyboardShortcuts();
    feedbackSystem = new FeedbackSystem();
    
    console.log('✅ All interactive features loaded!');
    
    // Show welcome message on first visit
    if (!Storage.get('visited')) {
        setTimeout(() => {
            progressTracker.showNotification('👋 Welcome! Your progress is automatically saved.');
            Storage.set('visited', true);
        }, 2000);
    }
});

// Export for global access
window.progressTracker = progressTracker;
window.themeSwitcher = themeSwitcher;
// window.searchEngine = searchEngine; // REMOVED: Search functionality disabled
window.feedbackSystem = feedbackSystem;
