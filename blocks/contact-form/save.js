import { useBlockProps } from '@wordpress/block-editor';

export default function save({ attributes }) {
    const { 
        title,
        formId,
        showOrganizationField,
        showContactReasonField,
        showPreferredContactField,
        contactReasons,
        backgroundColor,
        textColor,
        buttonColor,
        buttonTextColor
    } = attributes;

    const blockProps = useBlockProps.save({
        className: 'contact-form-block',
        style: {
            backgroundColor: backgroundColor,
            color: textColor
        }
    });

    return (
        <div {...blockProps}>
            <div className="contact-form-container">
                <h2 className="contact-form-title">{title}</h2>
                
                <form id={formId} className="contact-form" data-form-id={formId}>
                    {/* Personal Information */}
                    <div className="form-row">
                        <div className="form-group">
                            <label className="form-label" htmlFor={`${formId}-first-name`}>
                                Prénom *
                            </label>
                            <input
                                type="text"
                                id={`${formId}-first-name`}
                                name="firstName"
                                className="form-control"
                                placeholder="Votre prénom"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label className="form-label" htmlFor={`${formId}-last-name`}>
                                Nom *
                            </label>
                            <input
                                type="text"
                                id={`${formId}-last-name`}
                                name="lastName"
                                className="form-control"
                                placeholder="Votre nom"
                                required
                            />
                        </div>
                    </div>

                    {/* Contact Information */}
                    <div className="form-row">
                        <div className="form-group">
                            <label className="form-label" htmlFor={`${formId}-email`}>
                                Email *
                            </label>
                            <input
                                type="email"
                                id={`${formId}-email`}
                                name="email"
                                className="form-control"
                                placeholder="votre.email@exemple.com"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label className="form-label" htmlFor={`${formId}-phone`}>
                                Téléphone
                            </label>
                            <input
                                type="tel"
                                id={`${formId}-phone`}
                                name="phone"
                                className="form-control"
                                placeholder="Votre numéro de téléphone"
                            />
                        </div>
                    </div>

                    {/* Organization */}
                    {showOrganizationField && (
                        <div className="form-group">
                            <label className="form-label" htmlFor={`${formId}-organization`}>
                                Organisation
                            </label>
                            <input
                                type="text"
                                id={`${formId}-organization`}
                                name="organization"
                                className="form-control"
                                placeholder="Nom de votre entreprise ou organisation"
                            />
                        </div>
                    )}

                    {/* Contact Reason */}
                    {showContactReasonField && (
                        <div className="form-group">
                            <label className="form-label" htmlFor={`${formId}-contact-reason`}>
                                Motif de contact *
                            </label>
                            <select
                                id={`${formId}-contact-reason`}
                                name="contactReason"
                                className="form-control"
                                required
                            >
                                <option value="">Sélectionnez un motif</option>
                                {contactReasons.map((reason, index) => (
                                    <option key={index} value={reason}>{reason}</option>
                                ))}
                            </select>
                        </div>
                    )}

                    {/* Subject */}
                    <div className="form-group">
                        <label className="form-label" htmlFor={`${formId}-subject`}>
                            Sujet *
                        </label>
                        <input
                            type="text"
                            id={`${formId}-subject`}
                            name="subject"
                            className="form-control"
                            placeholder="Résumé de votre demande"
                            required
                        />
                    </div>

                    {/* Message */}
                    <div className="form-group">
                        <label className="form-label" htmlFor={`${formId}-message`}>
                            Message *
                        </label>
                        <textarea
                            id={`${formId}-message`}
                            name="message"
                            className="form-control"
                            rows={6}
                            placeholder="Décrivez votre demande en détail..."
                            required
                        />
                    </div>

                    {/* Preferred Contact Method */}
                    {showPreferredContactField && (
                        <div className="form-group">
                            <label className="form-label">
                                Méthode de contact préférée
                            </label>
                            <div className="radio-group">
                                <label className="radio-label">
                                    <input
                                        type="radio"
                                        name="preferredContact"
                                        value="email"
                                        defaultChecked
                                    />
                                    <span>Email</span>
                                </label>
                                <label className="radio-label">
                                    <input
                                        type="radio"
                                        name="preferredContact"
                                        value="phone"
                                    />
                                    <span>Téléphone</span>
                                </label>
                            </div>
                        </div>
                    )}

                    {/* Submit Button */}
                    <div className="form-submit">
                        <button
                            type="submit"
                            className="submit-button"
                            style={{
                                backgroundColor: buttonColor,
                                color: buttonTextColor
                            }}
                        >
                            <span className="submit-icon"></span>
                            <span>Envoyer le message</span>
                        </button>
                    </div>

                    {/* Response Messages */}
                    <div className="form-response success-message" style={{ display: 'none' }}>
                        <div className="response-icon success"></div>
                        <div className="response-content"></div>
                    </div>
                    <div className="form-response error-message" style={{ display: 'none' }}>
                        <div className="response-icon error"></div>
                        <div className="response-content"></div>
                    </div>
                </form>
            </div>
        </div>
    );
}