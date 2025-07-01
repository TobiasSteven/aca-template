import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function save({ attributes }) {
    const { 
        quickContactTitle,
        phone,
        email,
        hours,
        departmentsTitle,
        departments,
        socialTitle,
        socialSubtitle,
        facebookUrl,
        twitterUrl,
        linkedinUrl,
        youtubeUrl,
        quickContactBgColor,
        departmentsBgColor,
        socialBgColor
    } = attributes;

    const blockProps = useBlockProps.save({
        className: 'contact-sidebar-block'
    });

    return (
        <div {...blockProps}>
            <div className="contact-sidebar-container">
                {/* Quick Contact */}
                <div 
                    className="quick-contact-section"
                    style={{ backgroundColor: quickContactBgColor }}
                >
                    <RichText.Content
                        tagName="h3"
                        className="section-title"
                        value={quickContactTitle}
                    />
                    <div className="contact-items">
                        <div className="contact-item">
                            <span className="contact-icon phone-icon"></span>
                            <div className="contact-info">
                                <p className="contact-label">Téléphone</p>
                                <RichText.Content
                                    tagName="p"
                                    className="contact-value"
                                    value={phone}
                                />
                            </div>
                        </div>
                        <div className="contact-item">
                            <span className="contact-icon email-icon"></span>
                            <div className="contact-info">
                                <p className="contact-label">Email</p>
                                <RichText.Content
                                    tagName="p"
                                    className="contact-value"
                                    value={email}
                                />
                            </div>
                        </div>
                        <div className="contact-item">
                            <span className="contact-icon hours-icon"></span>
                            <div className="contact-info">
                                <p className="contact-label">Horaires</p>
                                <RichText.Content
                                    tagName="p"
                                    className="contact-value"
                                    value={hours}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Departments */}
                <div 
                    className="departments-section"
                    style={{ backgroundColor: departmentsBgColor }}
                >
                    <RichText.Content
                        tagName="h3"
                        className="section-title"
                        value={departmentsTitle}
                    />
                    <div className="departments-list">
                        {departments.map((dept, index) => (
                            <div key={index} className="department-item">
                                <RichText.Content
                                    tagName="h4"
                                    className="department-name"
                                    value={dept.name}
                                />
                                <RichText.Content
                                    tagName="p"
                                    className="department-description"
                                    value={dept.description}
                                />
                                <div className="department-contacts">
                                    <a 
                                        href={`mailto:${dept.email}`} 
                                        className="department-email"
                                    >
                                        {dept.email}
                                    </a>
                                    <a 
                                        href={`tel:${dept.phone.replace(/\s+/g, '')}`} 
                                        className="department-phone"
                                    >
                                        {dept.phone}
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Social Media */}
                <div 
                    className="social-section"
                    style={{ backgroundColor: socialBgColor }}
                >
                    <RichText.Content
                        tagName="h3"
                        className="section-title"
                        value={socialTitle}
                    />
                    <RichText.Content
                        tagName="p"
                        className="social-subtitle"
                        value={socialSubtitle}
                    />
                    <div className="social-icons">
                        <a 
                            className="social-icon facebook-icon" 
                            href={facebookUrl} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            aria-label="Facebook"
                        ></a>
                        <a 
                            className="social-icon twitter-icon" 
                            href={twitterUrl} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            aria-label="Twitter"
                        ></a>
                        <a 
                            className="social-icon linkedin-icon" 
                            href={linkedinUrl} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            aria-label="LinkedIn"
                        ></a>
                        <a 
                            className="social-icon youtube-icon" 
                            href={youtubeUrl} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            aria-label="YouTube"
                        ></a>
                    </div>
                </div>
            </div>
        </div>
    );
}