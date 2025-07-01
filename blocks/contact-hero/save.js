import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function save({ attributes }) {
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

    const blockProps = useBlockProps.save({
        className: 'contact-hero-block',
        style: {
            backgroundColor: backgroundColor,
            color: textColor
        }
    });

    return (
        <section {...blockProps}>
            <div className="contact-hero-background">
                <div className="circle circle-1"></div>
                <div className="circle circle-2"></div>
                <div className="circle circle-3"></div>
            </div>
            
            <div className="contact-hero-content">
                <RichText.Content
                    tagName="h1"
                    className="contact-hero-title"
                    value={title}
                />
                <RichText.Content
                    tagName="p"
                    className="contact-hero-subtitle"
                    style={{ color: accentColor }}
                    value={subtitle}
                />
                <div className="contact-hero-info">
                    <div className="contact-info-item">
                        <span className="contact-icon phone-icon"></span>
                        <RichText.Content
                            tagName="span"
                            className="contact-text"
                            value={phone}
                        />
                    </div>
                    <div className="contact-info-item">
                        <span className="contact-icon email-icon"></span>
                        <RichText.Content
                            tagName="span"
                            className="contact-text"
                            value={email}
                        />
                    </div>
                    <div className="contact-info-item">
                        <span className="contact-icon hours-icon"></span>
                        <RichText.Content
                            tagName="span"
                            className="contact-text"
                            value={hours}
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}