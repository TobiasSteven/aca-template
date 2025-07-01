import { __ } from '@wordpress/i18n';
import {
    useBlockProps,
    InspectorControls,
    RichText
} from '@wordpress/block-editor';
import {
    PanelBody,
    TextControl,
    TextareaControl,
    Button,
    ColorPicker
} from '@wordpress/components';
import { Fragment } from '@wordpress/element';

import './editor.scss';

export default function Edit({ attributes, setAttributes }) {
    const {
        sectionTitle,
        sectionSubtitle,
        timelineItems,
        lineColor,
        dotColor,
        yearColor,
        titleColor,
        textColor,
        backgroundColor
    } = attributes;

    const blockProps = useBlockProps({
        style: {
            backgroundColor: backgroundColor,
            padding: '4rem 0'
        }
    });

    const addTimelineItem = () => {
        const newItem = {
            year: new Date().getFullYear().toString(),
            title: __('Nouvelle réalisation', 'mon-theme-aca'),
            description: __('Description de la réalisation...', 'mon-theme-aca')
        };
        setAttributes({
            timelineItems: [...timelineItems, newItem]
        });
    };

    const updateTimelineItem = (index, field, value) => {
        const newItems = [...timelineItems];
        newItems[index][field] = value;
        setAttributes({ timelineItems: newItems });
    };

    const removeTimelineItem = (index) => {
        const newItems = timelineItems.filter((_, i) => i !== index);
        setAttributes({ timelineItems: newItems });
    };

    const moveTimelineItem = (index, direction) => {
        if (
            (direction === 'up' && index === 0) ||
            (direction === 'down' && index === timelineItems.length - 1)
        ) {
            return;
        }

        const newItems = [...timelineItems];
        const newIndex = direction === 'up' ? index - 1 : index + 1;
        const itemToMove = newItems[index];
        
        newItems.splice(index, 1);
        newItems.splice(newIndex, 0, itemToMove);
        
        setAttributes({ timelineItems: newItems });
    };

    return (
        <Fragment>
            <InspectorControls>
                <PanelBody title={__('Paramètres de la section', 'mon-theme-aca')}>
                    <TextControl
                        label={__('Titre de la section', 'mon-theme-aca')}
                        value={sectionTitle}
                        onChange={(value) => setAttributes({ sectionTitle: value })}
                    />
                    <TextareaControl
                        label={__('Sous-titre de la section', 'mon-theme-aca')}
                        value={sectionSubtitle}
                        onChange={(value) => setAttributes({ sectionSubtitle: value })}
                    />
                </PanelBody>

                <PanelBody title={__('Couleurs', 'mon-theme-aca')}>
                    <div className="timeline-color-option">
                        <label>{__('Couleur de la ligne', 'mon-theme-aca')}</label>
                        <ColorPicker
                            color={lineColor}
                            onChange={(value) => setAttributes({ lineColor: value })}
                            enableAlpha
                        />
                    </div>
                    <div className="timeline-color-option">
                        <label>{__('Couleur des points', 'mon-theme-aca')}</label>
                        <ColorPicker
                            color={dotColor}
                            onChange={(value) => setAttributes({ dotColor: value })}
                            enableAlpha
                        />
                    </div>
                    <div className="timeline-color-option">
                        <label>{__('Couleur des années', 'mon-theme-aca')}</label>
                        <ColorPicker
                            color={yearColor}
                            onChange={(value) => setAttributes({ yearColor: value })}
                            enableAlpha
                        />
                    </div>
                    <div className="timeline-color-option">
                        <label>{__('Couleur des titres', 'mon-theme-aca')}</label>
                        <ColorPicker
                            color={titleColor}
                            onChange={(value) => setAttributes({ titleColor: value })}
                            enableAlpha
                        />
                    </div>
                    <div className="timeline-color-option">
                        <label>{__('Couleur du texte', 'mon-theme-aca')}</label>
                        <ColorPicker
                            color={textColor}
                            onChange={(value) => setAttributes({ textColor: value })}
                            enableAlpha
                        />
                    </div>
                    <div className="timeline-color-option">
                        <label>{__('Couleur de fond', 'mon-theme-aca')}</label>
                        <ColorPicker
                            color={backgroundColor}
                            onChange={(value) => setAttributes({ backgroundColor: value })}
                            enableAlpha
                        />
                    </div>
                </PanelBody>

                <PanelBody title={__('Éléments de la timeline', 'mon-theme-aca')}>
                    <Button
                        isPrimary
                        onClick={addTimelineItem}
                        style={{ marginBottom: '16px', width: '100%' }}
                    >
                        {__('Ajouter un élément', 'mon-theme-aca')}
                    </Button>

                    {timelineItems.map((item, index) => (
                        <div key={index} className="timeline-item-edit">
                            <h3 className="timeline-item-title">
                                {__('Élément', 'mon-theme-aca')} {index + 1}
                            </h3>
                            <TextControl
                                label={__('Année', 'mon-theme-aca')}
                                value={item.year}
                                onChange={(value) => updateTimelineItem(index, 'year', value)}
                            />
                            <TextControl
                                label={__('Titre', 'mon-theme-aca')}
                                value={item.title}
                                onChange={(value) => updateTimelineItem(index, 'title', value)}
                            />
                            <TextareaControl
                                label={__('Description', 'mon-theme-aca')}
                                value={item.description}
                                onChange={(value) => updateTimelineItem(index, 'description', value)}
                            />
                            <div className="timeline-item-actions">
                                <Button
                                    isSecondary
                                    onClick={() => moveTimelineItem(index, 'up')}
                                    disabled={index === 0}
                                    icon="arrow-up-alt2"
                                    label={__('Déplacer vers le haut', 'mon-theme-aca')}
                                />
                                <Button
                                    isSecondary
                                    onClick={() => moveTimelineItem(index, 'down')}
                                    disabled={index === timelineItems.length - 1}
                                    icon="arrow-down-alt2"
                                    label={__('Déplacer vers le bas', 'mon-theme-aca')}
                                />
                                <Button
                                    isDestructive
                                    onClick={() => removeTimelineItem(index)}
                                    icon="trash"
                                    label={__('Supprimer', 'mon-theme-aca')}
                                />
                            </div>
                        </div>
                    ))}
                </PanelBody>
            </InspectorControls>

            <div {...blockProps}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <RichText
                            tagName="h2"
                            className="text-3xl md:text-4xl font-bold mb-4"
                            style={{ color: titleColor }}
                            value={sectionTitle}
                            onChange={(value) => setAttributes({ sectionTitle: value })}
                            placeholder={__('Titre de la section...', 'mon-theme-aca')}
                        />
                        <RichText
                            tagName="p"
                            className="text-lg max-w-2xl mx-auto"
                            style={{ color: textColor }}
                            value={sectionSubtitle}
                            onChange={(value) => setAttributes({ sectionSubtitle: value })}
                            placeholder={__('Sous-titre de la section...', 'mon-theme-aca')}
                        />
                    </div>

                    <div className="relative">
                        {/* Timeline Line */}
                        <div 
                            className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full" 
                            style={{ backgroundColor: lineColor }}
                        ></div>

                        <div className="space-y-12">
                            {timelineItems.map((item, index) => (
                                <div
                                    key={index}
                                    className={`flex items-center ${
                                        index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
                                    }`}
                                >
                                    <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
                                        <div className="bg-white p-6 rounded-lg shadow-lg border-l-4" style={{ borderColor: lineColor }}>
                                            <RichText
                                                tagName="div"
                                                className="text-2xl font-bold mb-2"
                                                style={{ color: yearColor }}
                                                value={item.year}
                                                onChange={(value) => updateTimelineItem(index, 'year', value)}
                                                placeholder={__('Année...', 'mon-theme-aca')}
                                            />
                                            <RichText
                                                tagName="h3"
                                                className="text-xl font-bold mb-3"
                                                style={{ color: titleColor }}
                                                value={item.title}
                                                onChange={(value) => updateTimelineItem(index, 'title', value)}
                                                placeholder={__('Titre...', 'mon-theme-aca')}
                                            />
                                            <RichText
                                                tagName="p"
                                                style={{ color: textColor }}
                                                value={item.description}
                                                onChange={(value) => updateTimelineItem(index, 'description', value)}
                                                placeholder={__('Description...', 'mon-theme-aca')}
                                            />
                                        </div>
                                    </div>

                                    {/* Timeline Dot */}
                                    <div className="relative z-10">
                                        <div 
                                            className="w-6 h-6 rounded-full border-4 border-white shadow-lg" 
                                            style={{ backgroundColor: dotColor }}
                                        ></div>
                                    </div>

                                    <div className="w-1/2"></div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}