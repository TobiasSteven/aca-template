import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function save({ attributes }) {
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

    const blockProps = useBlockProps.save({
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
        <section {...blockProps}>
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
                <RichText.Content
                    tagName="h1"
                    className="hero-banner-title"
                    style={{ color: titleColor }}
                    value={title}
                />
                <RichText.Content
                    tagName="p"
                    className="hero-banner-subtitle"
                    style={{ color: subtitleColor }}
                    value={subtitle}
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
        </section>
    );
}