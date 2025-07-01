import { useBlockProps } from '@wordpress/block-editor';

export default function save({ attributes }) {
    const { 
        blockId,
        publications,
        documentTypes,
        themes,
        languages,
        levels,
        defaultViewMode,
        defaultSortBy,
        defaultSortOrder,
        itemsPerPage,
        backgroundColor,
        sidebarBgColor,
        mainBgColor,
        textColor,
        secondaryTextColor,
        accentColor,
        cardBgColor
    } = attributes;

    const blockProps = useBlockProps.save({
        className: 'publications-grid-block',
        style: {
            backgroundColor: backgroundColor
        }
    });

    // Store publications data in a hidden input for JavaScript to access
    const publicationsData = JSON.stringify(publications);

    return (
        <div {...blockProps} id={blockId} data-default-view={defaultViewMode} data-default-sort={defaultSortBy} data-default-order={defaultSortOrder} data-items-per-page={itemsPerPage}>
            <input type="hidden" id={`${blockId}-data`} value={publicationsData} />
            
            <div className="publications-grid-container">
                <div className="publications-layout">
                    {/* Sidebar */}
                    <div 
                        className="publications-sidebar"
                        style={{ backgroundColor: sidebarBgColor }}
                    >
                        <div className="sidebar-content">
                            <h3 className="sidebar-title" style={{ color: textColor }}>Filtres</h3>
                            
                            {/* Recherche avancée */}
                            <div className="filter-group">
                                <h4 className="filter-title" style={{ color: textColor }}>Recherche Avancée</h4>
                                <div className="radio-options">
                                    <label className="radio-label">
                                        <input type="radio" name="searchType" value="global" defaultChecked />
                                        <span style={{ color: secondaryTextColor }}>Recherche globale</span>
                                    </label>
                                    <label className="radio-label">
                                        <input type="radio" name="searchType" value="title" />
                                        <span style={{ color: secondaryTextColor }}>Titre uniquement</span>
                                    </label>
                                    <label className="radio-label">
                                        <input type="radio" name="searchType" value="exact" />
                                        <span style={{ color: secondaryTextColor }}>Correspondance exacte</span>
                                    </label>
                                </div>
                            </div>
                            
                            {/* Types de documents */}
                            <div className="filter-group">
                                <h4 className="filter-title" style={{ color: textColor }}>Types de documents</h4>
                                <div className="checkbox-options">
                                    {documentTypes.map((type, index) => (
                                        <label key={index} className="checkbox-label">
                                            <input type="checkbox" className="filter-checkbox" name="types[]" value={type} />
                                            <span className="checkbox-icon" data-type={type}></span>
                                            <span style={{ color: secondaryTextColor }}>{type}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                            
                            {/* Thématiques */}
                            <div className="filter-group">
                                <h4 className="filter-title" style={{ color: textColor }}>Thématiques</h4>
                                <div className="checkbox-options scrollable">
                                    {themes.map((theme, index) => (
                                        <label key={index} className="checkbox-label">
                                            <input type="checkbox" className="filter-checkbox" name="themes[]" value={theme} />
                                            <span style={{ color: secondaryTextColor }}>{theme}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                            
                            {/* Niveau */}
                            <div className="filter-group">
                                <h4 className="filter-title" style={{ color: textColor }}>Niveau</h4>
                                <div className="checkbox-options">
                                    {levels.map((level, index) => (
                                        <label key={index} className="checkbox-label">
                                            <input type="checkbox" className="filter-checkbox" name="levels[]" value={level} />
                                            <span className="level-label" data-level={level}>{level}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                            
                            {/* Ma Bibliothèque */}
                            <div className="library-section" style={{ backgroundColor: 'rgba(248, 249, 250, 0.5)' }}>
                                <h4 className="filter-title" style={{ color: textColor }}>Ma Bibliothèque</h4>
                                <div className="library-links">
                                    <a href="#" style={{ color: accentColor }}>Mes favoris (12)</a>
                                    <a href="#" style={{ color: accentColor }}>Téléchargements (8)</a>
                                    <a href="#" style={{ color: accentColor }}>Recommandations (5)</a>
                                </div>
                            </div>
                            
                            {/* Reset button */}
                            <button className="reset-filters-button" style={{ borderColor: accentColor, color: accentColor }}>
                                Réinitialiser les filtres
                            </button>
                        </div>
                    </div>
                    
                    {/* Main Content */}
                    <div 
                        className="publications-main"
                        style={{ backgroundColor: mainBgColor }}
                    >
                        {/* Controls */}
                        <div className="publications-controls">
                            <div className="controls-left">
                                <button className="filter-button" style={{ borderColor: accentColor, color: accentColor }}>
                                    <span className="filter-icon"></span>
                                    <span>Filtres</span>
                                </button>
                                <span className="results-count" style={{ color: secondaryTextColor }}>
                                    <span id={`${blockId}-count`}>{publications.length}</span> ressources trouvées
                                </span>
                            </div>
                            
                            <div className="controls-right">
                                <select id={`${blockId}-sort`} className="sort-select">
                                    <option value="date-desc">Plus récent</option>
                                    <option value="date-asc">Plus ancien</option>
                                    <option value="downloads-desc">Plus téléchargé</option>
                                    <option value="rating-desc">Mieux noté</option>
                                    <option value="title-asc">Alphabétique (A-Z)</option>
                                    <option value="title-desc">Alphabétique (Z-A)</option>
                                </select>
                                
                                <div className="view-controls">
                                    <button 
                                        id={`${blockId}-grid-view`}
                                        className={`view-button ${defaultViewMode === 'grid' ? 'active' : ''}`}
                                        data-view="grid"
                                        style={{ 
                                            backgroundColor: defaultViewMode === 'grid' ? accentColor : 'transparent',
                                            color: defaultViewMode === 'grid' ? '#FFFFFF' : secondaryTextColor
                                        }}
                                    >
                                        <span className="grid-icon"></span>
                                    </button>
                                    <button 
                                        id={`${blockId}-list-view`}
                                        className={`view-button ${defaultViewMode === 'list' ? 'active' : ''}`}
                                        data-view="list"
                                        style={{ 
                                            backgroundColor: defaultViewMode === 'list' ? accentColor : 'transparent',
                                            color: defaultViewMode === 'list' ? '#FFFFFF' : secondaryTextColor
                                        }}
                                    >
                                        <span className="list-icon"></span>
                                    </button>
                                </div>
                            </div>
                        </div>
                        
                        {/* Publications Container */}
                        <div id={`${blockId}-container`} className={`publications-view ${defaultViewMode === 'grid' ? 'grid-view' : 'list-view'}`}>
                            {/* Publications will be loaded here by JavaScript */}
                            <div className="publications-loading">
                                <div className="loading-spinner"></div>
                                <p>Chargement des publications...</p>
                            </div>
                        </div>
                        
                        {/* Pagination */}
                        <div id={`${blockId}-pagination`} className="publications-pagination">
                            {/* Pagination will be generated by JavaScript */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}