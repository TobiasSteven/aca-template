import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function save({ attributes }) {
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

    const blockProps = useBlockProps.save({
        className: 'contact-success-block',
        style: {
            backgroundColor: backgroundColor
        }
    });

    return (
        <section {...blockProps}>
            <div className="contact-success-container">
                <div 
                    className="success-card"
                    style={{ backgroundColor: cardBgColor }}
                >
                    <div 
                        className="success-icon"
                        style={{ color: iconColor }}
                    ></div>
                    <RichText.Content
                        tagName="h1"
                        className="success-title"
                        style={{ color: titleColor }}
                        value={title}
                    />
                    <RichText.Content
                        tagName="p"
                        className="success-message"
                        style={{ color: messageColor }}
                        value={message}
                    />
                    <div className="success-buttons">
                        <button 
                            className="primary-button"
                            style={{ 
                                backgroundColor: primaryButtonBgColor,
                                color: primaryButtonTextColor
                            }}
                            data-action="new-message"
                        >
                            {newMessageButtonText}
                        </button>
                        <a 
                            href={homeButtonUrl}
                            className="secondary-button"
                            style={{ 
                                backgroundColor: secondaryButtonBgColor,
                                color: secondaryButtonTextColor,
                                borderColor: secondaryButtonBorderColor
                            }}
                        >
                            {homeButtonText}
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}