import { __ } from '@wordpress/i18n';
import { useBlockProps, InspectorControls, RichText } from '@wordpress/block-editor';
import { 
    PanelBody, 
    TextControl, 
    ColorPicker,
    Button
} from '@wordpress/components';
import { Fragment, useState } from '@wordpress/element';

import './editor.scss';

export default function Edit({ attributes, setAttributes }) {
    const { 
        title,
        collections,
        backgroundColor,
        titleColor,
        cardBgColor,
        cardBorderColor,
        cardTitleColor,
        cardTextColor,
        cardCountColor
    } = attributes;

    const [currentCollection, setCurrentCollection] = useState(0);
    const [newCollection, setNewCollection] = useState({
        title: '',
        description: '',
        icon: '📚',
        count: '0'
    });

    const blockProps = useBlockProps({
        className: 'publications-collections-block',
        style: {
            backgroundColor: backgroundColor
        }
    });

    const updateCollection = (index, field, value) => {
        const newCollections = [...collections];
        newCollections[index] = {
            ...newCollections[index],
            [field]: value
        };
        setAttributes({ collections: newCollections });
    };

    const addCollection = () => {
        if (newCollection.title.trim() !== '') {
            setAttributes({
                collections: [...collections, { ...newCollection }]
            });
            setNewCollection({
                title: '',
                description: '',
                icon: '📚',
                count: '0'
            });
        }
    };

    const removeCollection = (index) => {
        const newCollections = [...collections];
        newCollections.splice(index, 1);
        setAttributes({ collections: newCollections });
        if (currentCollection >= newCollections.length) {
            setCurrentCollection(Math.max(0, newCollections.length - 1));
        }
    };

    return (
        <Fragment>
            <InspectorControls>
                <PanelBody title={__('Collections', 'mon-theme-aca')}>
                    <div className="collections-editor">
                        <div className="collections-list">
                            <p className="collections-title">{__('Collections existantes', 'mon-theme-aca')}</p>
                            
                            {collections.length > 0 ? (
                                <div className="collections-tabs">
                                    {collections.map((collection, index) => (
                                        <button
                                            key={index}
                                            className={`collection-tab ${index === currentCollection ? 'active' : ''}`}
                                            onClick={() => setCurrentCollection(index)}
                                        >
                                            {collection.title || __('Sans titre', 'mon-theme-aca')}
                                        </button>
                                    ))}
                                </div>
                            ) : (
                                <p className="no-collections">{__('Aucune collection ajoutée', 'mon-theme-aca')}</p>
                            )}
                            
                            {collections.length > 0 && (
                                <div className="collection-editor">
                                    <TextControl
                                        label={__('Titre', 'mon-theme-aca')}
                                        value={collections[currentCollection].title}
                                        onChange={(value) => updateCollection(currentCollection, 'title', value)}
                                    />
                                    <TextControl
                                        label={__('Description', 'mon-theme-aca')}
                                        value={collections[currentCollection].description}
                                        onChange={(value) => updateCollection(currentCollection, 'description', value)}
                                    />
                                    <TextControl
                                        label={__('Icône (emoji)', 'mon-theme-aca')}
                                        value={collections[currentCollection].icon}
                                        onChange={(value) => updateCollection(currentCollection, 'icon', value)}
                                    />
                                    <TextControl
                                        label={__('Nombre de ressources', 'mon-theme-aca')}
                                        value={collections[currentCollection].count}
                                        onChange={(value) => updateCollection(currentCollection, 'count', value)}
                                    />
                                    <Button
                                        isDestructive
                                        onClick={() => removeCollection(currentCollection)}
                                    >
                                        {__('Supprimer cette collection', 'mon-theme-aca')}
                                    </Button>
                                </div>
                            )}
                        </div>
                        
                        <div className="add-collection">
                            <p className="add-collection-title">{__('Ajouter une collection', 'mon-theme-aca')}</p>
                            <TextControl
                                placeholder={__('Titre de la collection', 'mon-theme-aca')}
                                value={newCollection.title}
                                onChange={(value) => setNewCollection({...newCollection, title: value})}
                            />
                            <TextControl
                                placeholder={__('Description', 'mon-theme-aca')}
                                value={newCollection.description}
                                onChange={(value) => setNewCollection({...newCollection, description: value})}
                            />
                            <div className="collection-details">
                                <TextControl
                                    placeholder={__('Icône (emoji)', 'mon-theme-aca')}
                                    value={newCollection.icon}
                                    onChange={(value) => setNewCollection({...newCollection, icon: value})}
                                />
                                <TextControl
                                    placeholder={__('Nombre', 'mon-theme-aca')}
                                    value={newCollection.count}
                                    onChange={(value) => setNewCollection({...newCollection, count: value})}
                                />
                            </div>
                            <Button
                                isPrimary
                                onClick={addCollection}
                                disabled={!newCollection.title.trim()}
                            >
                                {__('Ajouter', 'mon-theme-aca')}
                            </Button>
                        </div>
                    </div>
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
                        <label>{__('Couleur de fond des cartes', 'mon-theme-aca')}</label>
                        <ColorPicker
                            color={cardBgColor}
                            onChange={(value) => setAttributes({ cardBgColor: value })}
                            enableAlpha
                        />
                    </div>
                    <div className="color-option">
                        <label>{__('Couleur de bordure des cartes', 'mon-theme-aca')}</label>
                        <ColorPicker
                            color={cardBorderColor}
                            onChange={(value) => setAttributes({ cardBorderColor: value })}
                            enableAlpha
                        />
                    </div>
                    <div className="color-option">
                        <label>{__('Couleur du titre des cartes', 'mon-theme-aca')}</label>
                        <ColorPicker
                            color={cardTitleColor}
                            onChange={(value) => setAttributes({ cardTitleColor: value })}
                            enableAlpha
                        />
                    </div>
                    <div className="color-option">
                        <label>{__('Couleur du texte des cartes', 'mon-theme-aca')}</label>
                        <ColorPicker
                            color={cardTextColor}
                            onChange={(value) => setAttributes({ cardTextColor: value })}
                            enableAlpha
                        />
                    </div>
                    <div className="color-option">
                        <label>{__('Couleur du nombre de ressources', 'mon-theme-aca')}</label>
                        <ColorPicker
                            color={cardCountColor}
                            onChange={(value) => setAttributes({ cardCountColor: value })}
                            enableAlpha
                        />
                    </div>
                </PanelBody>
            </InspectorControls>

            <div {...blockProps}>
                <div className="publications-collections-container">
                    <RichText
                        tagName="h2"
                        className="collections-title"
                        style={{ color: titleColor }}
                        value={title}
                        onChange={(value) => setAttributes({ title: value })}
                        placeholder={__('Titre...', 'mon-theme-aca')}
                    />
                    
                    <div className="collections-grid">
                        {collections.map((collection, index) => (
                            <div 
                                key={index} 
                                className="collection-card"
                                style={{ 
                                    backgroundColor: cardBgColor,
                                    borderLeftColor: cardBorderColor
                                }}
                            >
                                <div className="collection-icon">{collection.icon}</div>
                                <RichText
                                    tagName="h3"
                                    className="collection-card-title"
                                    style={{ color: cardTitleColor }}
                                    value={collection.title}
                                    onChange={(value) => updateCollection(index, 'title', value)}
                                    placeholder={__('Titre de la collection...', 'mon-theme-aca')}
                                />
                                <RichText
                                    tagName="p"
                                    className="collection-description"
                                    style={{ color: cardTextColor }}
                                    value={collection.description}
                                    onChange={(value) => updateCollection(index, 'description', value)}
                                    placeholder={__('Description...', 'mon-theme-aca')}
                                />
                                <RichText
                                    tagName="span"
                                    className="collection-count"
                                    style={{ color: cardCountColor }}
                                    value={`${collection.count} ressources`}
                                    onChange={(value) => {
                                        const countMatch = value.match(/^(\d+)/);
                                        if (countMatch) {
                                            updateCollection(index, 'count', countMatch[1]);
                                        }
                                    }}
                                    placeholder={__('Nombre de ressources...', 'mon-theme-aca')}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </Fragment>
    );
}