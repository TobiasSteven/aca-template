import { useBlockProps } from '@wordpress/block-editor';

export default function save({ attributes }) {
    const { 
        backgroundColor,
        modalBgColor,
        titleColor,
        textColor,
        secondaryTextColor,
        accentColor,
        buttonBgColor,
        buttonTextColor
    } = attributes;

    const blockProps = useBlockProps.save({
        className: 'publications-modal-block'
    });

    return (
        <div {...blockProps}>
            <div 
                id="publications-modal" 
                className="publications-modal" 
                style={{ 
                    backgroundColor: backgroundColor,
                    display: 'none'
                }}
            >
                <div 
                    className="modal-content"
                    style={{ backgroundColor: modalBgColor }}
                >
                    <div className="modal-header">
                        <div className="modal-type-icon">
                            <span className="type-icon"></span>
                        </div>
                        <div className="modal-title-container">
                            <h3 className="modal-title" style={{ color: titleColor }}></h3>
                            <div className="modal-meta" style={{ color: secondaryTextColor }}></div>
                        </div>
                        <button className="modal-close-button">
                            <span className="close-icon"></span>
                        </button>
                    </div>
                    
                    <div className="modal-body">
                        <div className="modal-content">
                            <div className="modal-preview-placeholder">
                                <div className="preview-icon"></div>
                                <p style={{ color: secondaryTextColor }}>Aperçu du document disponible après téléchargement</p>
                            </div>
                            
                            <div className="modal-description">
                                <h4 style={{ color: titleColor }}>Description</h4>
                                <p className="modal-description-text" style={{ color: textColor }}></p>
                                
                                <h4 style={{ color: titleColor }}>Tags</h4>
                                <div className="modal-tags"></div>
                            </div>
                        </div>
                        
                        <div className="modal-sidebar">
                            <div className="modal-info-box">
                                <h4 style={{ color: titleColor }}>Informations</h4>
                                <div className="info-list">
                                    <div className="info-item">
                                        <span className="info-label" style={{ color: secondaryTextColor }}>Type:</span>
                                        <span className="info-value type-value" style={{ color: textColor }}></span>
                                    </div>
                                    <div className="info-item">
                                        <span className="info-label" style={{ color: secondaryTextColor }}>Taille:</span>
                                        <span className="info-value size-value" style={{ color: textColor }}></span>
                                    </div>
                                    <div className="info-item">
                                        <span className="info-label" style={{ color: secondaryTextColor }}>Pages:</span>
                                        <span className="info-value pages-value" style={{ color: textColor }}></span>
                                    </div>
                                    <div className="info-item">
                                        <span className="info-label" style={{ color: secondaryTextColor }}>Langue:</span>
                                        <span className="info-value language-value" style={{ color: textColor }}></span>
                                    </div>
                                    <div className="info-item">
                                        <span className="info-label" style={{ color: secondaryTextColor }}>Téléchargements:</span>
                                        <span className="info-value downloads-value" style={{ color: textColor }}></span>
                                    </div>
                                    <div className="info-item">
                                        <span className="info-label" style={{ color: secondaryTextColor }}>Note:</span>
                                        <span className="info-value rating-value">
                                            <span className="star-icon"></span>
                                            <span className="rating-number"></span>
                                        </span>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="modal-actions">
                                <button 
                                    className="modal-action-button download-button"
                                    style={{ 
                                        backgroundColor: buttonBgColor,
                                        color: buttonTextColor
                                    }}
                                >
                                    <span className="action-icon download-icon"></span>
                                    <span>Télécharger</span>
                                </button>
                                <button 
                                    className="modal-action-button share-button"
                                    style={{ 
                                        borderColor: accentColor,
                                        color: accentColor
                                    }}
                                >
                                    <span className="action-icon share-icon"></span>
                                    <span>Partager</span>
                                </button>
                                <button 
                                    className="modal-action-button bookmark-button"
                                    style={{ 
                                        borderColor: secondaryTextColor,
                                        color: secondaryTextColor
                                    }}
                                >
                                    <span className="action-icon bookmark-icon"></span>
                                    <span>Favoris</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <script>
                {`
                document.addEventListener('DOMContentLoaded', function() {
                    // Listen for the openPublicationModal event
                    document.addEventListener('openPublicationModal', function(e) {
                        const publication = e.detail.publication;
                        const modal = document.getElementById('publications-modal');
                        
                        if (!modal || !publication) return;
                        
                        // Set modal content
                        const typeIcon = modal.querySelector('.type-icon');
                        const title = modal.querySelector('.modal-title');
                        const meta = modal.querySelector('.modal-meta');
                        const description = modal.querySelector('.modal-description-text');
                        const tags = modal.querySelector('.modal-tags');
                        const typeValue = modal.querySelector('.type-value');
                        const sizeValue = modal.querySelector('.size-value');
                        const pagesValue = modal.querySelector('.pages-value');
                        const languageValue = modal.querySelector('.language-value');
                        const downloadsValue = modal.querySelector('.downloads-value');
                        const ratingNumber = modal.querySelector('.rating-number');
                        
                        // Set type icon and background color
                        const typeIconContainer = modal.querySelector('.modal-type-icon');
                        if (typeIconContainer) {
                            typeIconContainer.style.backgroundColor = getTypeColor(publication.type);
                        }
                        
                        // Set content
                        if (title) title.textContent = publication.title;
                        if (meta) {
                            meta.innerHTML = publication.author + 
                                ' <span class="meta-separator">•</span> ' + 
                                new Date(publication.date).toLocaleDateString('fr-FR') + 
                                ' <span class="meta-separator">•</span> ' + 
                                '<span style="color: ' + getLevelColor(publication.level) + '">' + publication.level + '</span>';
                        }
                        if (description) description.textContent = publication.description;
                        
                        // Set tags
                        if (tags) {
                            tags.innerHTML = '';
                            if (publication.tags && publication.tags.length > 0) {
                                publication.tags.forEach(tag => {
                                    const tagElement = document.createElement('span');
                                    tagElement.className = 'modal-tag';
                                    tagElement.textContent = tag;
                                    tagElement.style.backgroundColor = 'rgba(168, 230, 207, 0.2)';
                                    tagElement.style.color = '${accentColor}';
                                    tags.appendChild(tagElement);
                                });
                            }
                        }
                        
                        // Set info values
                        if (typeValue) typeValue.textContent = publication.type;
                        if (sizeValue) sizeValue.textContent = publication.fileSize;
                        if (pagesValue) pagesValue.textContent = publication.pages || publication.duration || '';
                        if (languageValue) languageValue.textContent = publication.language;
                        if (downloadsValue) downloadsValue.textContent = publication.downloads;
                        if (ratingNumber) ratingNumber.textContent = publication.rating;
                        
                        // Show modal
                        modal.style.display = 'flex';
                        
                        // Close modal when clicking on close button or outside the modal
                        const closeButton = modal.querySelector('.modal-close-button');
                        if (closeButton) {
                            closeButton.addEventListener('click', function() {
                                modal.style.display = 'none';
                            });
                        }
                        
                        modal.addEventListener('click', function(e) {
                            if (e.target === modal) {
                                modal.style.display = 'none';
                            }
                        });
                    });
                    
                    // Helper functions
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
                });
                `}
            </script>
        </div>
    );
}