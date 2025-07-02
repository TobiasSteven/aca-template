import { __ } from '@wordpress/i18n';
import { useBlockProps, InspectorControls, RichText, MediaUpload, MediaUploadCheck } from '@wordpress/block-editor';
import { 
    PanelBody, 
    TextControl, 
    ColorPicker,
    Button
} from '@wordpress/components';
import { Fragment } from '@wordpress/element';

import './editor.scss';

export default function Edit({ attributes, setAttributes }) {
    const { 
        title,
        mainText,
        quote,
        additionalText,
        imageUrl,
        imageAlt,
        backgroundColor,
        textColor,
        titleColor,
        quoteColor,
        highlightColor,
        quoteBorderColor
    } = attributes;

    const blockProps = useBlockProps({
        className: 'our-history-block',
        style: {
            backgroundColor: backgroundColor
        }
    });

    // Function to process text with highlighted spans
    const processHighlightedText = (text, color) => {
        if (!text) return '';
        
        // Replace <span class="highlight">text</span> with styled spans
        return text.replace(
            /<span class="highlight">(.*?)<\/span>/g, 
            `<span style="color: ${color}; font-weight: 600;">$1</span>`
        );
    };

    return (
        <Fragment>
            <InspectorControls>
                <PanelBody title={__('Contenu', 'mon-theme-aca')}>
                    <TextControl
                        label={__('Texte alternatif de l\'image', 'mon-theme-aca')}
                        value={imageAlt}
                        onChange={(value) => setAttributes({ imageAlt: value })}
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
                        <label>{__('Couleur du titre', 'mon-theme-aca')}</label>
                        <ColorPicker
                            color={titleColor}
                            onChange={(value) => setAttributes({ titleColor: value })}
                            enableAlpha
                        />
                    </div>
                    <div className="color-option">
                        <label>{__('Couleur de la citation', 'mon-theme-aca')}</label>
                        <ColorPicker
                            color={quoteColor}
                            onChange={(value) => setAttributes({ quoteColor: value })}
                            enableAlpha
                        />
                    </div>
                    <div className="color-option">
                        <label>{__('Couleur des éléments mis en évidence', 'mon-theme-aca')}</label>
                        <ColorPicker
                            color={highlightColor}
                            onChange={(value) => setAttributes({ highlightColor: value })}
                            enableAlpha
                        />
                    </div>
                    <div className="color-option">
                        <label>{__('Couleur de la bordure de citation', 'mon-theme-aca')}</label>
                        <ColorPicker
                            color={quoteBorderColor}
                            onChange={(value) => setAttributes({ quoteBorderColor: value })}
                            enableAlpha
                        />
                    </div>
                </PanelBody>
            </InspectorControls>

            <div {...blockProps}>
                <div className="our-history-container">
                    <div className="our-history-grid">
                        <div className="our-history-content">
                            <RichText
                                tagName="h2"
                                className="our-history-title"
                                style={{ color: titleColor }}
                                value={title}
                                onChange={(value) => setAttributes({ title: value })}
                                placeholder={__('Titre...', 'mon-theme-aca')}
                            />
                            <div className="our-history-text-content" style={{ color: textColor }}>
                                <RichText
                                    tagName="p"
                                    className="main-text"
                                    value={mainText}
                                    onChange={(value) => setAttributes({ mainText: value })}
                                    placeholder={__('Texte principal...', 'mon-theme-aca')}
                                />
                                <RichText
                                    tagName="blockquote"
                                    className="history-quote"
                                    style={{ 
                                        borderLeftColor: quoteBorderColor,
                                        color: quoteColor
                                    }}
                                    value={quote}
                                    onChange={(value) => setAttributes({ quote: value })}
                                    placeholder={__('Citation...', 'mon-theme-aca')}
                                />
                                <RichText
                                    tagName="p"
                                    className="additional-text"
                                    value={additionalText}
                                    onChange={(value) => setAttributes({ additionalText: value })}
                                    placeholder={__('Texte supplémentaire...', 'mon-theme-aca')}
                                />
                            </div>
                        </div>
                        <div className="our-history-image">
                            <MediaUploadCheck>
                                <MediaUpload
                                    onSelect={(media) => {
                                        setAttributes({
                                            imageUrl: media.url,
                                            imageAlt: media.alt || imageAlt
                                        });
                                    }}
                                    allowedTypes={['image']}
                                    value={imageUrl}
                                    render={({ open }) => (
                                        <div className="image-container">
                                            {imageUrl ? (
                                                <img 
                                                    src={imageUrl} 
                                                    alt={imageAlt} 
                                                    className="history-image"
                                                    onClick={open}
                                                />
                                            ) : (
                                                <div className="image-placeholder" onClick={open}>
                                                    <span className="dashicons dashicons-format-image"></span>
                                                    <p>{__('Sélectionner une image', 'mon-theme-aca')}</p>
                                                </div>
                                            )}
                                            <div className="image-actions">
                                                <Button 
                                                    onClick={open}
                                                    className="edit-image-button"
                                                >
                                                    {imageUrl ? __('Modifier l\'image', 'mon-theme-aca') : __('Ajouter une image', 'mon-theme-aca')}
                                                </Button>
                                                {imageUrl && (
                                                    <Button 
                                                        onClick={() => setAttributes({ imageUrl: '' })}
                                                        className="remove-image-button"
                                                        isDestructive
                                                    >
                                                        {__('Supprimer l\'image', 'mon-theme-aca')}
                                                    </Button>
                                                )}
                                            </div>
                                        </div>
                                    )}
                                />
                            </MediaUploadCheck>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}