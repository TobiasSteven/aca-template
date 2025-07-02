import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function save({ attributes }) {
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

    const blockProps = useBlockProps.save({
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

    // Process the text with highlights
    const processedMainText = processHighlightedText(mainText, highlightColor);
    const processedAdditionalText = processHighlightedText(additionalText, highlightColor);

    return (
        <section {...blockProps}>
            <div className="our-history-container">
                <div className="our-history-grid">
                    <div className="our-history-content">
                        <RichText.Content
                            tagName="h2"
                            className="our-history-title"
                            style={{ color: titleColor }}
                            value={title}
                        />
                        <div className="our-history-text-content" style={{ color: textColor }}>
                            <RichText.Content
                                tagName="p"
                                className="main-text"
                                value={mainText}
                            />
                            <RichText.Content
                                tagName="blockquote"
                                className="history-quote"
                                style={{ 
                                    borderLeftColor: quoteBorderColor,
                                    color: quoteColor
                                }}
                                value={quote}
                            />
                            <RichText.Content
                                tagName="p"
                                className="additional-text"
                                value={additionalText}
                            />
                        </div>
                    </div>
                    <div className="our-history-image">
                        {imageUrl && (
                            <img 
                                src={imageUrl} 
                                alt={imageAlt} 
                                className="history-image"
                            />
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}