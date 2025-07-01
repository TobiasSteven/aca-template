import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function save({ attributes }) {
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

    const blockProps = useBlockProps.save({
        className: 'publications-collections-block',
        style: {
            backgroundColor: backgroundColor
        }
    });

    return (
        <section {...blockProps}>
            <div className="publications-collections-container">
                <RichText.Content
                    tagName="h2"
                    className="collections-title"
                    style={{ color: titleColor }}
                    value={title}
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
                            <RichText.Content
                                tagName="h3"
                                className="collection-card-title"
                                style={{ color: cardTitleColor }}
                                value={collection.title}
                            />
                            <RichText.Content
                                tagName="p"
                                className="collection-description"
                                style={{ color: cardTextColor }}
                                value={collection.description}
                            />
                            <span 
                                className="collection-count"
                                style={{ color: cardCountColor }}
                            >
                                {collection.count} ressources
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}