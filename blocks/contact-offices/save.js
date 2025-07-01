import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function save({ attributes }) {
    const { 
        title,
        subtitle,
        offices,
        backgroundColor,
        titleColor,
        subtitleColor,
        cardBgColor,
        mainOfficeColor,
        regularOfficeColor
    } = attributes;

    const blockProps = useBlockProps.save({
        className: 'contact-offices-block',
        style: {
            backgroundColor: backgroundColor
        }
    });

    return (
        <section {...blockProps}>
            <div className="contact-offices-container">
                <div className="contact-offices-header">
                    <RichText.Content
                        tagName="h2"
                        className="contact-offices-title"
                        style={{ color: titleColor }}
                        value={title}
                    />
                    <RichText.Content
                        tagName="p"
                        className="contact-offices-subtitle"
                        style={{ color: subtitleColor }}
                        value={subtitle}
                    />
                </div>
                
                <div className="offices-grid">
                    {offices.map((office) => (
                        <div 
                            key={office.id} 
                            className="office-card"
                            style={{ 
                                backgroundColor: cardBgColor,
                                borderTopColor: office.isMain ? mainOfficeColor : regularOfficeColor
                            }}
                        >
                            <div className="office-header">
                                <div className="office-title">
                                    <RichText.Content
                                        tagName="h3"
                                        className="office-name"
                                        value={office.name}
                                    />
                                    <RichText.Content
                                        tagName="p"
                                        className="office-location"
                                        value={`${office.city}, ${office.country}`}
                                    />
                                </div>
                                {office.isMain && (
                                    <span 
                                        className="main-office-badge"
                                        style={{ backgroundColor: mainOfficeColor }}
                                    >
                                        Siège
                                    </span>
                                )}
                            </div>
                            
                            <div className="office-details">
                                <div className="office-detail">
                                    <span className="detail-icon address-icon"></span>
                                    <div className="detail-content">
                                        <RichText.Content
                                            tagName="p"
                                            className="detail-text"
                                            value={office.address}
                                        />
                                        <RichText.Content
                                            tagName="p"
                                            className="detail-subtext"
                                            value={office.postalCode}
                                        />
                                    </div>
                                </div>
                                
                                <div className="office-detail">
                                    <span className="detail-icon phone-icon"></span>
                                    <a 
                                        href={`tel:${office.phone.replace(/\s+/g, '')}`} 
                                        className="detail-link"
                                    >
                                        {office.phone}
                                    </a>
                                </div>
                                
                                <div className="office-detail">
                                    <span className="detail-icon email-icon"></span>
                                    <a 
                                        href={`mailto:${office.email}`} 
                                        className="detail-link"
                                    >
                                        {office.email}
                                    </a>
                                </div>
                                
                                <div className="office-detail">
                                    <span className="detail-icon hours-icon"></span>
                                    <span className="detail-text">{office.hours}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}