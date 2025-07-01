import { __ } from '@wordpress/i18n';
import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import { 
    PanelBody, 
    ColorPicker
} from '@wordpress/components';
import { Fragment } from '@wordpress/element';

import './editor.scss';

export default function Edit({ attributes, setAttributes }) {
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

    const blockProps = useBlockProps({
        className: 'publications-modal-block'
    });

    // Sample publication for preview
    const samplePublication = {
        id: 1,
        title: "Guide du Producteur de Coton Biologique 2024",
        type: "Guide",
        author: "ACA Research Team",
        date: "2024-11-15",
        language: "Français",
        level: "Intermédiaire",
        theme: "Production cotonnière",
        description: "Guide complet pour la transition vers la production de coton biologique, incluant les techniques agricoles, la certification et la commercialisation.",
        thumbnail: "https://via.placeholder.com/320x180/2D9B8A/FFFFFF?text=Guide+Bio",
        fileSize: "2.5 MB",
        pages: "45",
        downloads: "1250",
        rating: "4.8",
        tags: ["Bio", "Production", "Certification"],
        isNew: true
    };

    return (
        <Fragment>
            <InspectorControls>
                <PanelBody title={__('Couleurs', 'mon-theme-aca')}>
                    <div className="color-option">
                        <label>{__('Couleur de fond de l\'overlay', 'mon-theme-aca')}</label>
                        <ColorPicker
                            color={backgroundColor}
                            onChange={(value) => setAttributes({ backgroundColor: value })}
                            enableAlpha
                        />
                    </div>
                    <div className="color-option">
                        <label>{__('Couleur de fond de la modal', 'mon-theme-aca')}</label>
                        <ColorPicker
                            color={modalBgColor}
                            onChange={(value) => setAttributes({ modalBgColor: value })}
                            enableAlpha
                        />
                    </div>
                    <div className="color-option">
                        <label>{__('Couleur du titre', 'mon-theme-aca')}</label>
                        <ColorPicker
                            color={titleColor}
                            onChange={(value) => setAttributes({ titleColor: value })}
                            enableAlpha
                        />
                    </div>
                    <div className="color-option">
                        <label>{__('Couleur du texte principal', 'mon-theme-aca')}</label>
                        <ColorPicker
                            color={textColor}
                            onChange={(value) => setAttributes({ textColor: value })}
                            enableAlpha
                        />
                    </div>
                    <div className="color-option">
                        <label>{__('Couleur du texte secondaire', 'mon-theme-aca')}</label>
                        <ColorPicker
                            color={secondaryTextColor}
                            onChange={(value) => setAttributes({ secondaryTextColor: value })}
                            enableAlpha
                        />
                    </div>
                    <div className="color-option">
                        <label>{__('Couleur d\'accent', 'mon-theme-aca')}</label>
                        <ColorPicker
                            color={accentColor}
                            onChange={(value) => setAttributes({ accentColor: value })}
                            enableAlpha
                        />
                    </div>
                    <div className="color-option">
                        <label>{__('Couleur de fond du bouton', 'mon-theme-aca')}</label>
                        <ColorPicker
                            color={buttonBgColor}
                            onChange={(value) => setAttributes({ buttonBgColor: value })}
                            enableAlpha
                        />
                    </div>
                    <div className="color-option">
                        <label>{__('Couleur du texte du bouton', 'mon-theme-aca')}</label>
                        <ColorPicker
                            color={buttonTextColor}
                            onChange={(value) => setAttributes({ buttonTextColor: value })}
                            enableAlpha
                        />
                    </div>
                </PanelBody>
            </InspectorControls>

            <div {...blockProps}>
                <div className="modal-preview">
                    <h3 className="modal-preview-title" style={{ color: titleColor }}>{__('Aperçu de la fenêtre modale', 'mon-theme-aca')}</h3>
                    <p className="modal-preview-description" style={{ color: secondaryTextColor }}>
                        {__('Cette fenêtre modale s\'affichera lorsqu\'un utilisateur cliquera sur une publication dans la grille.', 'mon-theme-aca')}
                    </p>
                    
                    <div 
                        className="modal-preview-container"
                        style={{ backgroundColor: backgroundColor }}
                    >
                        <div 
                            className="modal-preview-content"
                            style={{ backgroundColor: modalBgColor }}
                        >
                            <div className="modal-header">
                                <div className="modal-type-icon" style={{ backgroundColor: '#28A745' }}>
                                    <span className="type-icon file-text-icon"></span>
                                </div>
                                <div className="modal-title-container">
                                    <h3 className="modal-title" style={{ color: titleColor }}>{samplePublication.title}</h3>
                                    <div className="modal-meta">
                                        <span style={{ color: secondaryTextColor }}>{samplePublication.author}</span>
                                        <span className="meta-separator">•</span>
                                        <span style={{ color: secondaryTextColor }}>{new Date(samplePublication.date).toLocaleDateString('fr-FR')}</span>
                                        <span className="meta-separator">•</span>
                                        <span style={{ color: '#FD7E14' }}>{samplePublication.level}</span>
                                    </div>
                                </div>
                                <button className="modal-close-button">
                                    <span className="close-icon"></span>
                                </button>
                            </div>
                            
                            <div className="modal-body">
                                <div className="modal-content">
                                    <div className="modal-preview-placeholder">
                                        <div className="preview-icon"></div>
                                        <p style={{ color: secondaryTextColor }}>{__('Aperçu du document disponible après téléchargement', 'mon-theme-aca')}</p>
                                    </div>
                                    
                                    <div className="modal-description">
                                        <h4 style={{ color: titleColor }}>{__('Description', 'mon-theme-aca')}</h4>
                                        <p style={{ color: textColor }}>{samplePublication.description}</p>
                                        
                                        <h4 style={{ color: titleColor }}>{__('Tags', 'mon-theme-aca')}</h4>
                                        <div className="modal-tags">
                                            {samplePublication.tags.map((tag, index) => (
                                                <span 
                                                    key={index} 
                                                    className="modal-tag"
                                                    style={{ 
                                                        backgroundColor: 'rgba(168, 230, 207, 0.2)',
                                                        color: accentColor
                                                    }}
                                                >
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="modal-sidebar">
                                    <div className="modal-info-box">
                                        <h4 style={{ color: titleColor }}>{__('Informations', 'mon-theme-aca')}</h4>
                                        <div className="info-list">
                                            <div className="info-item">
                                                <span className="info-label" style={{ color: secondaryTextColor }}>{__('Type:', 'mon-theme-aca')}</span>
                                                <span className="info-value" style={{ color: textColor }}>{samplePublication.type}</span>
                                            </div>
                                            <div className="info-item">
                                                <span className="info-label" style={{ color: secondaryTextColor }}>{__('Taille:', 'mon-theme-aca')}</span>
                                                <span className="info-value" style={{ color: textColor }}>{samplePublication.fileSize}</span>
                                            </div>
                                            <div className="info-item">
                                                <span className="info-label" style={{ color: secondaryTextColor }}>{__('Pages:', 'mon-theme-aca')}</span>
                                                <span className="info-value" style={{ color: textColor }}>{samplePublication.pages}</span>
                                            </div>
                                            <div className="info-item">
                                                <span className="info-label" style={{ color: secondaryTextColor }}>{__('Langue:', 'mon-theme-aca')}</span>
                                                <span className="info-value" style={{ color: textColor }}>{samplePublication.language}</span>
                                            </div>
                                            <div className="info-item">
                                                <span className="info-label" style={{ color: secondaryTextColor }}>{__('Téléchargements:', 'mon-theme-aca')}</span>
                                                <span className="info-value" style={{ color: textColor }}>{samplePublication.downloads}</span>
                                            </div>
                                            <div className="info-item">
                                                <span className="info-label" style={{ color: secondaryTextColor }}>{__('Note:', 'mon-theme-aca')}</span>
                                                <span className="info-value rating">
                                                    <span className="star-icon"></span>
                                                    <span>{samplePublication.rating}</span>
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
                                            <span>{__('Télécharger', 'mon-theme-aca')}</span>
                                        </button>
                                        <button 
                                            className="modal-action-button share-button"
                                            style={{ 
                                                borderColor: accentColor,
                                                color: accentColor
                                            }}
                                        >
                                            <span className="action-icon share-icon"></span>
                                            <span>{__('Partager', 'mon-theme-aca')}</span>
                                        </button>
                                        <button 
                                            className="modal-action-button bookmark-button"
                                            style={{ 
                                                borderColor: secondaryTextColor,
                                                color: secondaryTextColor
                                            }}
                                        >
                                            <span className="action-icon bookmark-icon"></span>
                                            <span>{__('Favoris', 'mon-theme-aca')}</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}