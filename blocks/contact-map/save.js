import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function save({ attributes }) {
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

    const blockProps = useBlockProps.save({
        className: 'contact-map-block',
        style: {
            backgroundColor: backgroundColor
        }
    });

    return (
        <section {...blockProps}>
            <div className="contact-map-container">
                <div className="contact-map-header">
                    <RichText.Content
                        tagName="h2"
                        className="contact-map-title"
                        style={{ color: titleColor }}
                        value={title}
                    />
                    <RichText.Content
                        tagName="p"
                        className="contact-map-subtitle"
                        style={{ color: subtitleColor }}
                        value={subtitle}
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
                            <h3 className="map-placeholder-title">Carte Interactive</h3>
                            <p className="map-placeholder-address">{address}</p>
                            <a 
                                href={mapUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="map-button"
                                style={{
                                    backgroundColor: buttonBgColor,
                                    color: buttonTextColor
                                }}
                            >
                                {buttonText}
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}