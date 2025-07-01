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
        message,
        newMessageButtonText,
        homeButtonText,
        homeButtonUrl,
        backgroundColor,
        cardBgColor,
        titleColor,
        messageColor,
        iconColor,
        primaryButtonBgColor,
        primaryButtonTextColor,
        secondaryButtonBgColor,
        secondaryButtonTextColor,
        secondaryButtonBorderColor
    } = attributes;

    const blockProps = useBlockProps({
        className: 'contact-success-block',
        style: {
            backgroundColor: backgroundColor
        }
    });

    return (
        <Fragment>
            <InspectorControls>
                <PanelBody title={__('Contenu', 'mon-theme-aca')}>
                    <TextControl
                        label={__('URL du bouton "Retour à l\'accueil"', 'mon-theme-aca')}
                        value={homeButtonUrl}
                        onChange={(value) => setAttributes({ homeButtonUrl: value })}
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
                        <label>{__('Couleur de fond de la carte', 'mon-theme-aca')}</label>
                        <ColorPicker
                            color={cardBgColor}
                            onChange={(value) => setAttributes({ cardBgColor: value })}
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
                        <label>{__('Couleur du message', 'mon-theme-aca')}</label>
                        <ColorPicker
                            color={messageColor}
                            onChange={(value) => setAttributes({ messageColor: value })}
                            enableAlpha
                        />
                    </div>
                    <div className="color-option">
                        <label>{__('Couleur de l\'icône', 'mon-theme-aca')}</label>
                        <ColorPicker
                            color={iconColor}
                            onChange={(value) => setAttributes({ iconColor: value })}
                            enableAlpha
                        />
                    </div>
                    <div className="color-option">
                        <label>{__('Couleur de fond du bouton principal', 'mon-theme-aca')}</label>
                        <ColorPicker
                            color={primaryButtonBgColor}
                            onChange={(value) => setAttributes({ primaryButtonBgColor: value })}
                            enableAlpha
                        />
                    </div>
                    <div className="color-option">
                        <label>{__('Couleur du texte du bouton principal', 'mon-theme-aca')}</label>
                        <ColorPicker
                            color={primaryButtonTextColor}
                            onChange={(value) => setAttributes({ primaryButtonTextColor: value })}
                            enableAlpha
                        />
                    </div>
                    <div className="color-option">
                        <label>{__('Couleur de fond du bouton secondaire', 'mon-theme-aca')}</label>
                        <ColorPicker
                            color={secondaryButtonBgColor}
                            onChange={(value) => setAttributes({ secondaryButtonBgColor: value })}
                            enableAlpha
                        />
                    </div>
                    <div className="color-option">
                        <label>{__('Couleur du texte du bouton secondaire', 'mon-theme-aca')}</label>
                        <ColorPicker
                            color={secondaryButtonTextColor}
                            onChange={(value) => setAttributes({ secondaryButtonTextColor: value })}
                            enableAlpha
                        />
                    </div>
                    <div className="color-option">
                        <label>{__('Couleur de la bordure du bouton secondaire', 'mon-theme-aca')}</label>
                        <ColorPicker
                            color={secondaryButtonBorderColor}
                            onChange={(value) => setAttributes({ secondaryButtonBorderColor: value })}
                            enableAlpha
                        />
                    </div>
                </PanelBody>
            </InspectorControls>

            <div {...blockProps}>
                <div className="contact-success-container">
                    <div 
                        className="success-card"
                        style={{ backgroundColor: cardBgColor }}
                    >
                        <div 
                            className="success-icon"
                            style={{ color: iconColor }}
                        ></div>
                        <RichText
                            tagName="h1"
                            className="success-title"
                            style={{ color: titleColor }}
                            value={title}
                            onChange={(value) => setAttributes({ title: value })}
                            placeholder={__('Titre...', 'mon-theme-aca')}
                        />
                        <RichText
                            tagName="p"
                            className="success-message"
                            style={{ color: messageColor }}
                            value={message}
                            onChange={(value) => setAttributes({ message: value })}
                            placeholder={__('Message...', 'mon-theme-aca')}
                        />
                        <div className="success-buttons">
                            <RichText
                                tagName="button"
                                className="primary-button"
                                style={{ 
                                    backgroundColor: primaryButtonBgColor,
                                    color: primaryButtonTextColor
                                }}
                                value={newMessageButtonText}
                                onChange={(value) => setAttributes({ newMessageButtonText: value })}
                                placeholder={__('Texte du bouton...', 'mon-theme-aca')}
                            />
                            <RichText
                                tagName="button"
                                className="secondary-button"
                                style={{ 
                                    backgroundColor: secondaryButtonBgColor,
                                    color: secondaryButtonTextColor,
                                    borderColor: secondaryButtonBorderColor
                                }}
                                value={homeButtonText}
                                onChange={(value) => setAttributes({ homeButtonText: value })}
                                placeholder={__('Texte du bouton...', 'mon-theme-aca')}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}