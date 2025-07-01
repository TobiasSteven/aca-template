import { __ } from '@wordpress/i18n';
import { useBlockProps, InspectorControls, RichText } from '@wordpress/block-editor';
import { PanelBody, TextControl, ColorPicker } from '@wordpress/components';
import { Fragment } from '@wordpress/element';

import './editor.scss';

export default function Edit({ attributes, setAttributes }) {
    const { 
        title, 
        subtitle, 
        phone, 
        email, 
        hours,
        backgroundColor,
        textColor,
        accentColor
    } = attributes;

    const blockProps = useBlockProps({
        className: 'contact-hero-block',
        style: {
            backgroundColor: backgroundColor,
            color: textColor
        }
    });

    return (
        <Fragment>
            <InspectorControls>
                <PanelBody title={__('Contenu', 'mon-theme-aca')}>
                    <TextControl
                        label={__('Téléphone', 'mon-theme-aca')}
                        value={phone}
                        onChange={(value) => setAttributes({ phone: value })}
                    />
                    <TextControl
                        label={__('Email', 'mon-theme-aca')}
                        value={email}
                        onChange={(value) => setAttributes({ email: value })}
                    />
                    <TextControl
                        label={__('Horaires', 'mon-theme-aca')}
                        value={hours}
                        onChange={(value) => setAttributes({ hours: value })}
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
                        <label>{__('Couleur du texte', 'mon-theme-aca')}</label>
                        <ColorPicker
                            color={textColor}
                            onChange={(value) => setAttributes({ textColor: value })}
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
                </PanelBody>
            </InspectorControls>

            <div {...blockProps}>
                <div className="contact-hero-background">
                    <div className="circle circle-1"></div>
                    <div className="circle circle-2"></div>
                    <div className="circle circle-3"></div>
                </div>
                
                <div className="contact-hero-content">
                    <RichText
                        tagName="h1"
                        className="contact-hero-title"
                        value={title}
                        onChange={(value) => setAttributes({ title: value })}
                        placeholder={__('Titre de la section...', 'mon-theme-aca')}
                    />
                    <RichText
                        tagName="p"
                        className="contact-hero-subtitle"
                        style={{ color: accentColor }}
                        value={subtitle}
                        onChange={(value) => setAttributes({ subtitle: value })}
                        placeholder={__('Sous-titre...', 'mon-theme-aca')}
                    />
                    <div className="contact-hero-info">
                        <div className="contact-info-item">
                            <span className="contact-icon phone-icon"></span>
                            <RichText
                                tagName="span"
                                className="contact-text"
                                value={phone}
                                onChange={(value) => setAttributes({ phone: value })}
                                placeholder={__('Téléphone...', 'mon-theme-aca')}
                            />
                        </div>
                        <div className="contact-info-item">
                            <span className="contact-icon email-icon"></span>
                            <RichText
                                tagName="span"
                                className="contact-text"
                                value={email}
                                onChange={(value) => setAttributes({ email: value })}
                                placeholder={__('Email...', 'mon-theme-aca')}
                            />
                        </div>
                        <div className="contact-info-item">
                            <span className="contact-icon hours-icon"></span>
                            <RichText
                                tagName="span"
                                className="contact-text"
                                value={hours}
                                onChange={(value) => setAttributes({ hours: value })}
                                placeholder={__('Horaires...', 'mon-theme-aca')}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}