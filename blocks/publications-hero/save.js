import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function save({ attributes }) {
    const { 
        title, 
        subtitle, 
        publicationsCount,
        downloadsCount,
        languagesCount,
        searchPlaceholder,
        backgroundColor,
        titleColor,
        subtitleColor,
        iconColor
    } = attributes;

    const blockProps = useBlockProps.save({
        className: 'publications-hero-block',
        style: {
            backgroundColor: backgroundColor
        }
    });

    return (
        <section {...blockProps}>
            <div className="publications-hero-background">
                <div className="circle circle-1"></div>
                <div className="circle circle-2"></div>
                <div className="circle circle-3"></div>
            </div>
            
            <div className="publications-hero-content">
                <RichText.Content
                    tagName="h1"
                    className="publications-hero-title"
                    style={{ color: titleColor }}
                    value={title}
                />
                <RichText.Content
                    tagName="p"
                    className="publications-hero-subtitle"
                    style={{ color: subtitleColor }}
                    value={subtitle}
                />
                
                <div className="publications-hero-stats">
                    <div className="stat-item">
                        <span className="stat-icon document-icon" style={{ color: iconColor }}></span>
                        <span className="stat-text">
                            <RichText.Content
                                tagName="span"
                                value={publicationsCount}
                            />
                            {' '}publications
                        </span>
                    </div>
                    <div className="stat-item">
                        <span className="stat-icon download-icon" style={{ color: iconColor }}></span>
                        <span className="stat-text">
                            <RichText.Content
                                tagName="span"
                                value={downloadsCount}
                            />
                            {' '}téléchargements
                        </span>
                    </div>
                    <div className="stat-item">
                        <span className="stat-icon language-icon" style={{ color: iconColor }}></span>
                        <span className="stat-text">
                            <RichText.Content
                                tagName="span"
                                value={languagesCount}
                            />
                            {' '}langues
                        </span>
                    </div>
                </div>
                
                <div className="publications-hero-search">
                    <div className="search-container">
                        <span className="search-icon" style={{ color: iconColor }}></span>
                        <input
                            type="text"
                            id="publications-search-input"
                            className="search-input"
                            placeholder={searchPlaceholder}
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}