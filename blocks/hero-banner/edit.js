import { __ } from '@wordpress/i18n';
import { useBlockProps, InspectorControls, RichText, MediaUpload, MediaUploadCheck } from '@wordpress/block-editor';
import { 
    PanelBody, 
    RangeControl,
    SelectControl,
    TextControl,
    ToggleControl,
    Button,
    ColorPicker
} from '@wordpress/components';
import { Fragment } from '@wordpress/element';

import './editor.scss';

export default function Edit({ attributes, setAttributes }) {
    const { 
        height,
        backgroundImage,
        overlayColor,
        overlayOpacity,
        overlayGradient,
        title,
        subtitle,
        titleColor,
        subtitleColor,
        lineColor,
        lineWidth,
        lineHeight,
        textAlignment
    } = attributes;

    const blockProps = useBlockProps({
        className: 'hero-banner-block',
        style: {
            height: height
        }
    });

    const overlayStyle = overlayGradient 
        ? {
            background: `linear-gradient(to right, ${overlayColor}${Math.round(overlayOpacity * 100).toString(16)} ${overlayOpacity * 100}%, ${overlayColor}${Math.round(overlayOpacity * 60).toString(16)} ${overlayOpacity * 60}%)`,
          }
        : {
            backgroundColor: overlayColor,
            opacity: overlayOpacity
          };

    return (
        <Fragment>
            <InspectorControls>
                <PanelBody title={__('Dimensions', 'mon-theme-aca')}>
                    <TextControl
                        label={__('Hauteur', 'mon-theme-aca')}
                        value={height}
                        onChange={(value) => setAttributes({ height: value })}
                        help={__('Exemple: 400px, 50vh, etc.', 'mon-theme-aca')}
                    />
                </PanelBody>

                <PanelBody title={__('Arrière-plan', 'mon-theme-aca')}>
                    <div className="editor-hero-image-preview">
                        {backgroundImage ? (
                            <img 
                                src={backgroundImage} 
                                alt={__('Aperçu de l\'image d\'arrière-plan', 'mon-theme-aca')}
                                className="editor-hero-preview-img"
                            />
                        ) : (
                            <div className="editor-hero-no-image">
                                {__('Aucune image sélectionnée', 'mon-theme-aca')}
                            </div>
                        )}
                    </div>
                    <div className="editor-hero-image-buttons">
                        <MediaUploadCheck>
                            <MediaUpload
                                onSelect={(media) => setAttributes({ backgroundImage: media.url })}
                                allowedTypes={['image']}
                                value={backgroundImage}
                                render={({ open }) => (
                                    <Button 
                                        onClick={open}
                                        variant="secondary"
                                        className="editor-hero-select-image"
                                    >
                                        {backgroundImage 
                                            ? __('Changer l\'image', 'mon-theme-aca') 
                                            : __('Sélectionner une image', 'mon-theme-aca')
                                        }
                                    </Button>
                                )}
                            />
                        </MediaUploadCheck>
                        {backgroundImage && (
                            <Button 
                                onClick={() => setAttributes({ backgroundImage: '' })}
                                variant="tertiary"
                                isDestructive
                                className="editor-hero-remove-image"
                            >
                                {__('Supprimer l\'image', 'mon-theme-aca')}
                            </Button>
                        )}
                    </div>
                </PanelBody>

                <PanelBody title={__('Superposition', 'mon-theme-aca')}>
                    <div className="color-option">
                        <label>{__('Couleur de la superposition', 'mon-theme-aca')}</label>
                        <ColorPicker
                            color={overlayColor}
                            onChange={(value) => setAttributes({ overlayColor: value })}
                            enableAlpha
                        />
                    </div>
                    <RangeControl
                        label={__('Opacité de la superposition', 'mon-theme-aca')}
                        value={overlayOpacity}
                        onChange={(value) => setAttributes({ overlayOpacity: value })}
                        min={0}
                        max={1}
                        step={0.05}
                    />
                    <ToggleControl
                        label={__('Utiliser un dégradé', 'mon-theme-aca')}
                        checked={overlayGradient}
                        onChange={(value) => setAttributes({ overlayGradient: value })}
                    />
                </PanelBody>

                <PanelBody title={__('Texte', 'mon-theme-aca')}>
                    <SelectControl
                        label={__('Alignement du texte', 'mon-theme-aca')}
                        value={textAlignment}
                        options={[
                            { label: __('Gauche', 'mon-theme-aca'), value: 'left' },
                            { label: __('Centre', 'mon-theme-aca'), value: 'center' },
                            { label: __('Droite', 'mon-theme-aca'), value: 'right' }
                        ]}
                        onChange={(value) => setAttributes({ textAlignment: value })}
                    />
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
                </PanelBody>

                <PanelBody title={__('Ligne décorative', 'mon-theme-aca')}>
                    <div className="color-option">
                        <label>{__('Couleur de la ligne', 'mon-theme-aca')}</label>
                        <ColorPicker
                            color={lineColor}
                            onChange={(value) => setAttributes({ lineColor: value })}
                            enableAlpha
                        />
                    </div>
                    <TextControl
                        label={__('Largeur de la ligne', 'mon-theme-aca')}
                        value={lineWidth}
                        onChange={(value) => setAttributes({ lineWidth: value })}
                    />
                    <TextControl
                        label={__('Hauteur de la ligne', 'mon-theme-aca')}
                        value={lineHeight}
                        onChange={(value) => setAttributes({ lineHeight: value })}
                    />
                </PanelBody>
            </InspectorControls>

            <div {...blockProps}>
                <div 
                    className="hero-banner-background"
                    style={{ backgroundImage: `url(${backgroundImage})` }}
                >
                    <div 
                        className="hero-banner-overlay"
                        style={overlayStyle}
                    ></div>
                </div>
                <div 
                    className="hero-banner-content"
                    style={{ textAlign: textAlignment }}
                >
                    <RichText
                        tagName="h1"
                        className="hero-banner-title"
                        style={{ color: titleColor }}
                        value={title}
                        onChange={(value) => setAttributes({ title: value })}
                        placeholder={__('Titre...', 'mon-theme-aca')}
                    />
                    <RichText
                        tagName="p"
                        className="hero-banner-subtitle"
                        style={{ color: subtitleColor }}
                        value={subtitle}
                        onChange={(value) => setAttributes({ subtitle: value })}
                        placeholder={__('Sous-titre...', 'mon-theme-aca')}
                    />
                    <div 
                        className="hero-banner-line"
                        style={{ 
                            backgroundColor: lineColor,
                            width: lineWidth,
                            height: lineHeight,
                            margin: textAlignment === 'center' ? '0 auto' : textAlignment === 'right' ? '0 0 0 auto' : '0 auto 0 0'
                        }}
                    ></div>
                </div>
            </div>
        </Fragment>
    );
}