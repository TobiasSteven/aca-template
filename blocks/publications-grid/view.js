document.addEventListener('DOMContentLoaded', function() {
    const publicationsBlocks = document.querySelectorAll('.publications-grid-block');
    
    publicationsBlocks.forEach(block => {
        const blockId = block.id;
        const dataInput = document.getElementById(`${blockId}-data`);
        
        if (!dataInput) {
            console.error('Publications data not found for block', blockId);
            return;
        }
        
        try {
            // Parse publications data
            const publications = JSON.parse(dataInput.value);
            
            // Store publications data in WordPress options for AJAX access
            if (typeof wp !== 'undefined' && wp.ajax) {
                wp.ajax.post('store_publications_data', {
                    blockId: blockId,
                    publications: publications,
                    nonce: publicationsData.nonce
                });
            }
            
            // Initialize the publications grid
            initPublicationsGrid(block, publications);
            
        } catch (error) {
            console.error('Error parsing publications data:', error);
        }
    });
    
    function initPublicationsGrid(block, publications) {
        const blockId = block.id;
        const container = document.getElementById(`${blockId}-container`);
        const countElement = document.getElementById(`${blockId}-count`);
        const gridViewButton = document.getElementById(`${blockId}-grid-view`);
        const listViewButton = document.getElementById(`${blockId}-list-view`);
        const sortSelect = document.getElementById(`${blockId}-sort`);
        const paginationContainer = document.getElementById(`${blockId}-pagination`);
        const filterButton = block.querySelector('.filter-button');
        const sidebar = block.querySelector('.publications-sidebar');
        const resetButton = block.querySelector('.reset-filters-button');
        
        // Get default settings
        const defaultView = block.dataset.defaultView || 'grid';
        const defaultSort = block.dataset.defaultSort || 'date';
        const defaultOrder = block.dataset.defaultOrder || 'desc';
        const itemsPerPage = parseInt(block.dataset.itemsPerPage) || 9;
        
        // State
        let currentState = {
            view: defaultView,
            sortBy: defaultSort,
            sortOrder: defaultOrder,
            page: 1,
            search: '',
            types: [],
            themes: [],
            languages: [],
            levels: [],
            activeTab: 'tous'
        };
        
        // Set initial view
        container.className = `publications-view ${currentState.view}-view`;
        
        // Set initial sort
        if (sortSelect) {
            sortSelect.value = `${currentState.sortBy}-${currentState.sortOrder}`;
        }
        
        // Listen for tab changes
        document.addEventListener('publicationsTabChange', function(e) {
            currentState.activeTab = e.detail.tabId;
            currentState.page = 1;
            renderPublications();
        });
        
        // Listen for search input from hero section
        const searchInput = document.getElementById('publications-search-input');
        if (searchInput) {
            searchInput.addEventListener('input', debounce(function() {
                currentState.search = this.value;
                currentState.page = 1;
                renderPublications();
            }, 300));
        }
        
        // View mode toggle
        if (gridViewButton && listViewButton) {
            gridViewButton.addEventListener('click', function() {
                setViewMode('grid');
            });
            
            listViewButton.addEventListener('click', function() {
                setViewMode('list');
            });
        }
        
        // Sort change
        if (sortSelect) {
            sortSelect.addEventListener('change', function() {
                const [sortBy, sortOrder] = this.value.split('-');
                currentState.sortBy = sortBy;
                currentState.sortOrder = sortOrder;
                currentState.page = 1;
                renderPublications();
            });
        }
        
        // Mobile filter toggle
        if (filterButton && sidebar) {
            filterButton.addEventListener('click', function() {
                sidebar.classList.toggle('active');
            });
        }
        
        // Filter checkboxes
        const typeCheckboxes = block.querySelectorAll('input[name="types[]"]');
        const themeCheckboxes = block.querySelectorAll('input[name="themes[]"]');
        const levelCheckboxes = block.querySelectorAll('input[name="levels[]"]');
        const languageCheckboxes = block.querySelectorAll('input[name="languages[]"]');
        
        typeCheckboxes.forEach(checkbox => {
            checkbox.addEventListener('change', function() {
                updateFilters();
            });
        });
        
        themeCheckboxes.forEach(checkbox => {
            checkbox.addEventListener('change', function() {
                updateFilters();
            });
        });
        
        levelCheckboxes.forEach(checkbox => {
            checkbox.addEventListener('change', function() {
                updateFilters();
            });
        });
        
        languageCheckboxes.forEach(checkbox => {
            checkbox.addEventListener('change', function() {
                updateFilters();
            });
        });
        
        // Reset filters
        if (resetButton) {
            resetButton.addEventListener('click', function() {
                typeCheckboxes.forEach(cb => cb.checked = false);
                themeCheckboxes.forEach(cb => cb.checked = false);
                levelCheckboxes.forEach(cb => cb.checked = false);
                languageCheckboxes.forEach(cb => cb.checked = false);
                
                if (searchInput) {
                    searchInput.value = '';
                }
                
                currentState = {
                    ...currentState,
                    search: '',
                    types: [],
                    themes: [],
                    languages: [],
                    levels: [],
                    page: 1
                };
                
                renderPublications();
            });
        }
        
        // Set view mode
        function setViewMode(mode) {
            currentState.view = mode;
            container.className = `publications-view ${mode}-view`;
            
            // Update buttons
            if (gridViewButton && listViewButton) {
                if (mode === 'grid') {
                    gridViewButton.classList.add('active');
                    listViewButton.classList.remove('active');
                    gridViewButton.style.backgroundColor = '#2D9B8A';
                    gridViewButton.style.color = '#FFFFFF';
                    listViewButton.style.backgroundColor = 'transparent';
                    listViewButton.style.color = '#6C757D';
                } else {
                    gridViewButton.classList.remove('active');
                    listViewButton.classList.add('active');
                    gridViewButton.style.backgroundColor = 'transparent';
                    gridViewButton.style.color = '#6C757D';
                    listViewButton.style.backgroundColor = '#2D9B8A';
                    listViewButton.style.color = '#FFFFFF';
                }
            }
        }
        
        // Update filters
        function updateFilters() {
            const types = Array.from(typeCheckboxes)
                .filter(cb => cb.checked)
                .map(cb => cb.value);
                
            const themes = Array.from(themeCheckboxes)
                .filter(cb => cb.checked)
                .map(cb => cb.value);
                
            const levels = Array.from(levelCheckboxes)
                .filter(cb => cb.checked)
                .map(cb => cb.value);
                
            const languages = Array.from(languageCheckboxes)
                .filter(cb => cb.checked)
                .map(cb => cb.value);
            
            currentState = {
                ...currentState,
                types,
                themes,
                levels,
                languages,
                page: 1
            };
            
            renderPublications();
        }
        
        // Render publications
        function renderPublications() {
            // Show loading
            container.innerHTML = `
                <div class="publications-loading">
                    <div class="loading-spinner"></div>
                    <p>Chargement des publications...</p>
                </div>
            `;
            
            // Filter publications
            let filteredPublications = publications.filter(pub => {
                // Filter by search
                if (currentState.search) {
                    const searchLower = currentState.search.toLowerCase();
                    const searchIn = `${pub.title} ${pub.description} ${pub.author}`.toLowerCase();
                    if (!searchIn.includes(searchLower)) {
                        return false;
                    }
                }
                
                // Filter by type
                if (currentState.types.length > 0 && !currentState.types.includes(pub.type)) {
                    return false;
                }
                
                // Filter by theme
                if (currentState.themes.length > 0 && !currentState.themes.includes(pub.theme)) {
                    return false;
                }
                
                // Filter by level
                if (currentState.levels.length > 0 && !currentState.levels.includes(pub.level)) {
                    return false;
                }
                
                // Filter by language
                if (currentState.languages.length > 0 && !currentState.languages.includes(pub.language)) {
                    return false;
                }
                
                // Filter by tab
                if (currentState.activeTab !== 'tous') {
                    const tabMapping = {
                        'rapports': ['Rapport'],
                        'guides': ['Guide'],
                        'bulletins': ['Bulletin'],
                        'recherches': ['Étude', 'Recherche'],
                        'medias': ['Vidéo', 'Audio', 'Infographie']
                    };
                    
                    if (tabMapping[currentState.activeTab] && !tabMapping[currentState.activeTab].includes(pub.type)) {
                        return false;
                    }
                }
                
                return true;
            });
            
            // Sort publications
            filteredPublications.sort((a, b) => {
                let result = 0;
                
                switch (currentState.sortBy) {
                    case 'date':
                        result = new Date(a.date) - new Date(b.date);
                        break;
                    case 'title':
                        result = a.title.localeCompare(b.title);
                        break;
                    case 'downloads':
                        result = parseInt(a.downloads) - parseInt(b.downloads);
                        break;
                    case 'rating':
                        result = parseFloat(a.rating) - parseFloat(b.rating);
                        break;
                    default:
                        result = 0;
                }
                
                return currentState.sortOrder === 'desc' ? -result : result;
            });
            
            // Update count
            if (countElement) {
                countElement.textContent = filteredPublications.length;
            }
            
            // Paginate
            const totalPages = Math.ceil(filteredPublications.length / itemsPerPage);
            const start = (currentState.page - 1) * itemsPerPage;
            const end = start + itemsPerPage;
            const paginatedPublications = filteredPublications.slice(start, end);
            
            // Render publications
            if (paginatedPublications.length === 0) {
                container.innerHTML = `
                    <div class="no-publications">
                        <p>Aucune publication ne correspond à vos critères de recherche.</p>
                    </div>
                `;
                paginationContainer.innerHTML = '';
                return;
            }
            
            let html = '';
            
            if (currentState.view === 'grid') {
                paginatedPublications.forEach(pub => {
                    html += `
                        <div class="publication-card" data-id="${pub.id}">
                            <div class="publication-thumbnail">
                                ${pub.thumbnail 
                                    ? `<img src="${pub.thumbnail}" alt="${pub.title}" class="thumbnail-image">` 
                                    : `<div class="thumbnail-placeholder" style="background-color: ${getTypeColor(pub.type)}">
                                        <span class="placeholder-icon ${getTypeIcon(pub.type)}-icon"></span>
                                       </div>`
                                }
                                <div class="publication-badges">
                                    <span class="type-badge" style="background-color: ${getTypeColor(pub.type)}">${pub.type}</span>
                                    ${pub.isNew ? '<span class="new-badge">Nouveau</span>' : ''}
                                </div>
                            </div>
                            <div class="publication-content">
                                <div class="publication-meta">
                                    <span class="publication-author">${pub.author}</span>
                                    <span class="meta-separator">•</span>
                                    <span class="publication-date">${formatDate(pub.date)}</span>
                                </div>
                                <h3 class="publication-title">${pub.title}</h3>
                                <p class="publication-excerpt">${pub.description}</p>
                                <div class="publication-footer">
                                    <div class="publication-stats">
                                        <span class="stat-item downloads">
                                            <span class="stat-icon download-icon"></span>
                                            <span class="stat-value">${pub.downloads}</span>
                                        </span>
                                        <span class="stat-item rating">
                                            <span class="stat-icon star-icon"></span>
                                            <span class="stat-value">${pub.rating}</span>
                                        </span>
                                    </div>
                                    <div class="publication-actions">
                                        <button class="action-button view-button" title="Aperçu">
                                            <span class="action-icon eye-icon"></span>
                                        </button>
                                        <button class="action-button download-button" title="Télécharger">
                                            <span class="action-icon download-icon"></span>
                                        </button>
                                        <button class="action-button bookmark-button" title="Ajouter aux favoris">
                                            <span class="action-icon bookmark-icon"></span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    `;
                });
            } else {
                paginatedPublications.forEach(pub => {
                    html += `
                        <div class="publication-list-item" data-id="${pub.id}">
                            <div class="list-item-type" style="background-color: ${getTypeColor(pub.type)}">
                                <span class="type-icon ${getTypeIcon(pub.type)}-icon"></span>
                            </div>
                            <div class="list-item-content">
                                <div class="list-item-header">
                                    <h3 class="list-item-title">${pub.title}</h3>
                                    <div class="list-item-badges">
                                        ${pub.isNew ? '<span class="new-badge">Nouveau</span>' : ''}
                                        <span class="type-badge" style="background-color: ${getTypeColor(pub.type)}">${pub.type}</span>
                                    </div>
                                </div>
                                <div class="list-item-meta">
                                    <span>${pub.author}</span>
                                    <span class="meta-separator">•</span>
                                    <span>${formatDate(pub.date)}</span>
                                    <span class="meta-separator">•</span>
                                    <span style="color: ${getLevelColor(pub.level)}">${pub.level}</span>
                                    <span class="meta-separator">•</span>
                                    <span>${pub.fileSize}</span>
                                </div>
                                <p class="list-item-description">${pub.description}</p>
                                <div class="list-item-footer">
                                    <div class="list-item-stats">
                                        <span class="stat-item downloads">
                                            <span class="stat-icon download-icon"></span>
                                            <span class="stat-value">${pub.downloads} téléchargements</span>
                                        </span>
                                        <span class="stat-item rating">
                                            <span class="stat-icon star-icon"></span>
                                            <span class="stat-value">${pub.rating}</span>
                                        </span>
                                    </div>
                                    <div class="list-item-actions">
                                        <button class="action-button download-button" style="background-color: #2D9B8A; color: #FFFFFF">
                                            Télécharger
                                        </button>
                                        <button class="action-button view-button" style="border-color: #2D9B8A; color: #2D9B8A">
                                            Aperçu
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    `;
                });
            }
            
            container.innerHTML = html;
            
            // Add click event to publications
            const publicationElements = container.querySelectorAll('.publication-card, .publication-list-item');
            publicationElements.forEach(element => {
                element.addEventListener('click', function(e) {
                    if (e.target.closest('.action-button')) {
                        // Don't open modal if clicking on action buttons
                        return;
                    }
                    
                    const pubId = parseInt(this.dataset.id);
                    const publication = publications.find(p => p.id === pubId);
                    
                    if (publication) {
                        openPublicationModal(publication);
                    }
                });
            });
            
            // Add click event to action buttons
            const viewButtons = container.querySelectorAll('.view-button');
            const downloadButtons = container.querySelectorAll('.download-button');
            const bookmarkButtons = container.querySelectorAll('.bookmark-button');
            
            viewButtons.forEach(button => {
                button.addEventListener('click', function(e) {
                    e.stopPropagation();
                    const element = this.closest('.publication-card, .publication-list-item');
                    const pubId = parseInt(element.dataset.id);
                    const publication = publications.find(p => p.id === pubId);
                    
                    if (publication) {
                        openPublicationModal(publication);
                    }
                });
            });
            
            downloadButtons.forEach(button => {
                button.addEventListener('click', function(e) {
                    e.stopPropagation();
                    const element = this.closest('.publication-card, .publication-list-item');
                    const pubId = parseInt(element.dataset.id);
                    const publication = publications.find(p => p.id === pubId);
                    
                    if (publication) {
                        // Simulate download
                        alert(`Téléchargement de "${publication.title}" en cours...`);
                    }
                });
            });
            
            bookmarkButtons.forEach(button => {
                button.addEventListener('click', function(e) {
                    e.stopPropagation();
                    const element = this.closest('.publication-card');
                    const pubId = parseInt(element.dataset.id);
                    
                    // Toggle bookmark
                    this.classList.toggle('active');
                    
                    if (this.classList.contains('active')) {
                        this.querySelector('.bookmark-icon').style.backgroundImage = 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'24\' height=\'24\' viewBox=\'0 0 24 24\' fill=\'%232D9B8A\' stroke=\'%232D9B8A\' stroke-width=\'2\' stroke-linecap=\'round\' stroke-linejoin=\'round\'%3E%3Cpath d=\'M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z\'%3E%3C/path%3E%3C/svg%3E")';
                    } else {
                        this.querySelector('.bookmark-icon').style.backgroundImage = 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'24\' height=\'24\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'%232D9B8A\' stroke-width=\'2\' stroke-linecap=\'round\' stroke-linejoin=\'round\'%3E%3Cpath d=\'M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z\'%3E%3C/path%3E%3C/svg%3E")';
                    }
                });
            });
            
            // Render pagination
            renderPagination(totalPages);
        }
        
        // Render pagination
        function renderPagination(totalPages) {
            if (totalPages <= 1) {
                paginationContainer.innerHTML = '';
                return;
            }
            
            let html = '<div class="pagination-controls">';
            
            // Previous button
            html += `
                <button class="pagination-button prev-button" ${currentState.page === 1 ? 'disabled' : ''}>
                    Précédent
                </button>
            `;
            
            // Page numbers
            html += '<div class="pagination-numbers">';
            
            const maxVisiblePages = 5;
            let startPage = Math.max(1, currentState.page - Math.floor(maxVisiblePages / 2));
            let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
            
            if (endPage - startPage + 1 < maxVisiblePages) {
                startPage = Math.max(1, endPage - maxVisiblePages + 1);
            }
            
            // First page
            if (startPage > 1) {
                html += `<button class="pagination-number" data-page="1">1</button>`;
                if (startPage > 2) {
                    html += `<span class="pagination-ellipsis">...</span>`;
                }
            }
            
            // Page numbers
            for (let i = startPage; i <= endPage; i++) {
                html += `
                    <button class="pagination-number ${i === currentState.page ? 'active' : ''}" data-page="${i}" ${i === currentState.page ? 'style="background-color: #2D9B8A; color: #FFFFFF"' : ''}>
                        ${i}
                    </button>
                `;
            }
            
            // Last page
            if (endPage < totalPages) {
                if (endPage < totalPages - 1) {
                    html += `<span class="pagination-ellipsis">...</span>`;
                }
                html += `<button class="pagination-number" data-page="${totalPages}">${totalPages}</button>`;
            }
            
            html += '</div>';
            
            // Next button
            html += `
                <button class="pagination-button next-button" ${currentState.page === totalPages ? 'disabled' : ''}>
                    Suivant
                </button>
            `;
            
            html += '</div>';
            
            paginationContainer.innerHTML = html;
            
            // Add event listeners
            const prevButton = paginationContainer.querySelector('.prev-button');
            const nextButton = paginationContainer.querySelector('.next-button');
            const pageButtons = paginationContainer.querySelectorAll('.pagination-number');
            
            if (prevButton) {
                prevButton.addEventListener('click', function() {
                    if (currentState.page > 1) {
                        currentState.page--;
                        renderPublications();
                    }
                });
            }
            
            if (nextButton) {
                nextButton.addEventListener('click', function() {
                    if (currentState.page < totalPages) {
                        currentState.page++;
                        renderPublications();
                    }
                });
            }
            
            pageButtons.forEach(button => {
                button.addEventListener('click', function() {
                    const page = parseInt(this.dataset.page);
                    currentState.page = page;
                    renderPublications();
                });
            });
        }
        
        // Open publication modal
        function openPublicationModal(publication) {
            // Create custom event
            const event = new CustomEvent('openPublicationModal', {
                detail: { publication }
            });
            
            // Dispatch event
            document.dispatchEvent(event);
        }
        
        // Helper functions
        function getTypeIcon(type) {
            switch (type) {
                case 'Guide': return 'file-text';
                case 'Rapport': return 'file-text';
                case 'Étude': return 'file-text';
                case 'Vidéo': return 'video';
                case 'Audio': return 'headphones';
                case 'Infographie': return 'image';
                default: return 'file-text';
            }
        }
        
        function getTypeColor(type) {
            switch (type) {
                case 'Guide': return '#28A745';
                case 'Rapport': return '#2D9B8A';
                case 'Étude': return '#FD7E14';
                case 'Vidéo': return '#17A2B8';
                case 'Audio': return '#6C757D';
                case 'Infographie': return '#A8E6CF';
                default: return '#6C757D';
            }
        }
        
        function getLevelColor(level) {
            switch (level) {
                case 'Débutant': return '#28A745';
                case 'Intermédiaire': return '#FD7E14';
                case 'Expert': return '#DC3545';
                default: return '#6C757D';
            }
        }
        
        function formatDate(dateString) {
            const date = new Date(dateString);
            return date.toLocaleDateString('fr-FR', {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
            });
        }
        
        function debounce(func, wait) {
            let timeout;
            return function() {
                const context = this;
                const args = arguments;
                clearTimeout(timeout);
                timeout = setTimeout(() => {
                    func.apply(context, args);
                }, wait);
            };
        }
        
        // Initial render
        renderPublications();
    }
});