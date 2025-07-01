import { __ } from '@wordpress/i18n';
import { useBlockProps, InspectorControls, RichText } from '@wordpress/block-editor';
import { 
    PanelBody, 
    TextControl, 
    ColorPicker
} from '@wordpress/components';
import { Fragment } from '@wordpress/element';

import './editor.scss';

export default function Edit({ attributes, setAttributes }) {
    const { 
        title,
        subtitle,
        address,
        mapUrl,
        buttonText,
        backgroundColor,
        titleColor,
        subtitleColor,
        mapBgColor,
        mapGradientStart,
        mapGradientEnd,
        buttonBgColor,
        buttonTextColor
    } = attributes;

    const blockProps = useBlockProps({
        className: 'contact-map-block',
        style: {
            backgroundColor: backgroundColor
        }
    });

    return (
        <Fragment>
            <InspectorControls>
                <PanelBody title={__('Contenu', 'mon-theme-aca')}>
                    <TextControl
                        label={__('Adresse complète', 'mon-theme-aca')}
                        value={address}
                        onChange={(value) => setAttributes({ address: value })}
                    />
                    <TextControl
                        label={__('URL Google Maps', 'mon-theme-aca')}
                        value={mapUrl}
                        onChange={(value) => setAttributes({ mapUrl: value })}
                    />
                    <TextControl
                        label={__('Texte du bouton', 'mon-theme-aca')}
                        value={buttonText}
                        onChange={(value) => setAttributes({ buttonText: value })}
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
                        <label>{__('Couleur de fond de la carte', 'mon-theme-aca')}</label>
                        <ColorPicker
                            color={mapBgColor}
                            onChange={(value) => setAttributes({ mapBgColor: value })}
                            enableAlpha
                        />
                    </div>
                    <div className="color-option">
                        <label>{__('Dégradé de la carte - Début', 'mon-theme-aca')}</label>
                        <ColorPicker
                            color={mapGradientStart}
                            onChange={(value) => setAttributes({ mapGradientStart: value })}
                            enableAlpha
                        />
                    </div>
                    <div className="color-option">
                        <label>{__('Dégradé de la carte - Fin', 'mon-theme-aca')}</label>
                        <ColorPicker
                            color={mapGradientEnd}
                            onChange={(value) => setAttributes({ mapGradientEnd: value })}
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
                <div className="contact-map-container">
                    <div className="contact-map-header">
                        <RichText
                            tagName="h2"
                            className="contact-map-title"
                            style={{ color: titleColor }}
                            value={title}
                            onChange={(value) => setAttributes({ title: value })}
                            placeholder={__('Titre...', 'mon-theme-aca')}
                        />
                        <RichText
                            tagName="p"
                            className="contact-map-subtitle"
                            style={{ color: subtitleColor }}
                            value={subtitle}
                            onChange={(value) => setAttributes({ subtitle: value })}
                            placeholder={__('Sous-titre...', 'mon-theme-aca')}
                        />
                    </div>
                    
                    <div 
                        className="map-container"
                        style={{ backgroundColor: mapBgColor }}
                    >
                        <div 
                            className="map-placeholder"
                            style={{ 
                                backgroundImage: `linear-gradient(to bottom right, ${mapGradientStart}, ${mapGradientEnd})` 
                            }}
                        >
                            <div className="map-content">
                                <div className="map-pin-icon"></div>
                                <h3 className="map-placeholder-title">{__('Carte Interactive', 'mon-theme-aca')}</h3>
                                <p className="map-placeholder-address">{address}</p>
                                <button 
                                    className="map-button"
                                    style={{
                                        backgroundColor: buttonBgColor,
                                        color: buttonTextColor
                                    }}
                                >
                                    {buttonText}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}