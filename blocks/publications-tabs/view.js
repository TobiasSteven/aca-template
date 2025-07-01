document.addEventListener('DOMContentLoaded', function() {
    const tabsBlocks = document.querySelectorAll('.publications-tabs-block');
    
    tabsBlocks.forEach(tabsBlock => {
        const tabButtons = tabsBlock.querySelectorAll('.tab-button');
        const activeTextColor = getComputedStyle(tabsBlock).getPropertyValue('--active-text-color') || '#2D9B8A';
        const activeBorderColor = getComputedStyle(tabsBlock).getPropertyValue('--active-border-color') || '#2D9B8A';
        const textColor = getComputedStyle(tabsBlock).getPropertyValue('--text-color') || '#6C757D';
        
        // Get the active tab from URL if present
        const urlParams = new URLSearchParams(window.location.search);
        const tabParam = urlParams.get('tab');
        
        // Set active tab based on URL or default
        let activeTabId = null;
        if (tabParam) {
            const matchingTab = Array.from(tabButtons).find(btn => btn.dataset.tabId === tabParam);
            if (matchingTab) {
                activeTabId = tabParam;
            }
        }
        
        // If no active tab from URL, use the default active tab
        if (!activeTabId) {
            const defaultActiveTab = tabButtons[0].classList.contains('active') ? tabButtons[0].dataset.tabId : null;
            activeTabId = defaultActiveTab || (tabButtons.length > 0 ? tabButtons[0].dataset.tabId : null);
        }
        
        // Set initial active state
        tabButtons.forEach(button => {
            const isActive = button.dataset.tabId === activeTabId;
            button.classList.toggle('active', isActive);
            button.style.color = isActive ? activeTextColor : textColor;
            button.style.borderBottomColor = isActive ? activeBorderColor : 'transparent';
            
            // Add click event
            button.addEventListener('click', function() {
                const tabId = this.dataset.tabId;
                
                // Update active state
                tabButtons.forEach(btn => {
                    const isBtnActive = btn === this;
                    btn.classList.toggle('active', isBtnActive);
                    btn.style.color = isBtnActive ? activeTextColor : textColor;
                    btn.style.borderBottomColor = isBtnActive ? activeBorderColor : 'transparent';
                });
                
                // Update URL
                const url = new URL(window.location);
                url.searchParams.set('tab', tabId);
                window.history.pushState({}, '', url);
                
                // Trigger custom event for other components to listen to
                const tabChangeEvent = new CustomEvent('publicationsTabChange', {
                    detail: { tabId: tabId }
                });
                document.dispatchEvent(tabChangeEvent);
            });
        });
        
        // Trigger initial tab change event
        if (activeTabId) {
            const initialTabChangeEvent = new CustomEvent('publicationsTabChange', {
                detail: { tabId: activeTabId }
            });
            document.dispatchEvent(initialTabChangeEvent);
        }
    });
});