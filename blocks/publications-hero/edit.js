import { __ } from '@wordpress/i18n';
import { useBlockProps, InspectorControls, RichText } from '@wordpress/block-editor';
import { PanelBody, TextControl, ColorPicker } from '@wordpress/components';
import { Fragment } from '@wordpress/element';

import './editor.scss';

export default function Edit({ attributes, setAttributes }) {
    const { 
        title, 
        subtitle, 
        publicationsCount,
        downloadsCount,
        languagesCount,
        searchPlaceholder,
        backgroundColor,
        titleColor,
        subtitleColor,
        iconColor
    } = attributes;

    const blockProps = useBlockProps({
        className: 'publications-hero-block',
        style: {
            backgroundColor: backgroundColor
        }
    });

    return (
        <Fragment>
            <InspectorControls>
                <PanelBody title={__('Contenu', 'mon-theme-aca')}>
                    <TextControl
                        label={__('Nombre de publications', 'mon-theme-aca')}
                        value={publicationsCount}
                        onChange={(value) => setAttributes({ publicationsCount: value })}
                    />
                    <TextControl
                        label={__('Nombre de téléchargements', 'mon-theme-aca')}
                        value={downloadsCount}
                        onChange={(value) => setAttributes({ downloadsCount: value })}
                    />
                    <TextControl
                        label={__('Nombre de langues', 'mon-theme-aca')}
                        value={languagesCount}
                        onChange={(value) => setAttributes({ languagesCount: value })}
                    />
                    <TextControl
                        label={__('Placeholder de recherche', 'mon-theme-aca')}
                        value={searchPlaceholder}
                        onChange={(value) => setAttributes({ searchPlaceholder: value })}
                    />
                </PanelBody>
                <PanelBody title={__('Couleurs', 'mon-theme-aca')}>
                    <div className="color-option">
                        <label>{__('Couleur de fond', 'mon-theme-aca')}</label>
                        <ColorPicker
                            color={backgroundColor}
                            onChange={(value) => setAttributes({ backgroundColor: value })}
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
                        <label>{__('Couleur du sous-titre', 'mon-theme-aca')}</label>
                        <ColorPicker
                            color={subtitleColor}
                            onChange={(value) => setAttributes({ subtitleColor: value })}
                            enableAlpha
                        />
                    </div>
                    <div className="color-option">
                        <label>{__('Couleur des icônes', 'mon-theme-aca')}</label>
                        <ColorPicker
                            color={iconColor}
                            onChange={(value) => setAttributes({ iconColor: value })}
                            enableAlpha
                        />
                    </div>
                </PanelBody>
            </InspectorControls>

            <div {...blockProps}>
                <div className="publications-hero-background">
                    <div className="circle circle-1"></div>
                    <div className="circle circle-2"></div>
                    <div className="circle circle-3"></div>
                </div>
                
                <div className="publications-hero-content">
                    <RichText
                        tagName="h1"
                        className="publications-hero-title"
                        style={{ color: titleColor }}
                        value={title}
                        onChange={(value) => setAttributes({ title: value })}
                        placeholder={__('Titre de la section...', 'mon-theme-aca')}
                    />
                    <RichText
                        tagName="p"
                        className="publications-hero-subtitle"
                        style={{ color: subtitleColor }}
                        value={subtitle}
                        onChange={(value) => setAttributes({ subtitle: value })}
                        placeholder={__('Sous-titre...', 'mon-theme-aca')}
                    />
                    
                    <div className="publications-hero-stats">
                        <div className="stat-item">
                            <span className="stat-icon document-icon" style={{ color: iconColor }}></span>
                            <span className="stat-text">
                                <RichText
                                    tagName="span"
                                    value={publicationsCount}
                                    onChange={(value) => setAttributes({ publicationsCount: value })}
                                    placeholder={__('Nombre...', 'mon-theme-aca')}
                                />
                                {' '}{__('publications', 'mon-theme-aca')}
                            </span>
                        </div>
                        <div className="stat-item">
                            <span className="stat-icon download-icon" style={{ color: iconColor }}></span>
                            <span className="stat-text">
                                <RichText
                                    tagName="span"
                                    value={downloadsCount}
                                    onChange={(value) => setAttributes({ downloadsCount: value })}
                                    placeholder={__('Nombre...', 'mon-theme-aca')}
                                />
                                {' '}{__('téléchargements', 'mon-theme-aca')}
                            </span>
                        </div>
                        <div className="stat-item">
                            <span className="stat-icon language-icon" style={{ color: iconColor }}></span>
                            <span className="stat-text">
                                <RichText
                                    tagName="span"
                                    value={languagesCount}
                                    onChange={(value) => setAttributes({ languagesCount: value })}
                                    placeholder={__('Nombre...', 'mon-theme-aca')}
                                />
                                {' '}{__('langues', 'mon-theme-aca')}
                            </span>
                        </div>
                    </div>
                    
                    <div className="publications-hero-search">
                        <div className="search-container">
                            <span className="search-icon" style={{ color: iconColor }}></span>
                            <input
                                type="text"
                                className="search-input"
                                placeholder={searchPlaceholder}
                                disabled
                            />
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}