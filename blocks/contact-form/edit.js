import { __ } from '@wordpress/i18n';
import { useBlockProps, InspectorControls, RichText } from '@wordpress/block-editor';
import { 
    PanelBody, 
    TextControl, 
    ToggleControl, 
    ColorPicker,
    TextareaControl,
    Button
} from '@wordpress/components';
import { Fragment, useState } from '@wordpress/element';

import './editor.scss';

export default function Edit({ attributes, setAttributes }) {
    const { 
        title,
        formId,
        recipientEmail,
        successMessage,
        errorMessage,
        showOrganizationField,
        showContactReasonField,
        showPreferredContactField,
        contactReasons,
        backgroundColor,
        textColor,
        buttonColor,
        buttonTextColor
    } = attributes;

    const [newReason, setNewReason] = useState('');

    const blockProps = useBlockProps({
        className: 'contact-form-block',
        style: {
            backgroundColor: backgroundColor,
            color: textColor
        }
    });

    const addContactReason = () => {
        if (newReason.trim() !== '') {
            setAttributes({
                contactReasons: [...contactReasons, newReason.trim()]
            });
            setNewReason('');
        }
    };

    const removeContactReason = (index) => {
        const newReasons = [...contactReasons];
        newReasons.splice(index, 1);
        setAttributes({ contactReasons: newReasons });
    };

    return (
        <Fragment>
            <InspectorControls>
                <PanelBody title={__('Paramètres du formulaire', 'mon-theme-aca')}>
                    <TextControl
                        label={__('ID du formulaire', 'mon-theme-aca')}
                        value={formId}
                        onChange={(value) => setAttributes({ formId: value })}
                        help={__('Identifiant unique pour ce formulaire', 'mon-theme-aca')}
                    />
                    <TextControl
                        label={__('Email destinataire', 'mon-theme-aca')}
                        type="email"
                        value={recipientEmail}
                        onChange={(value) => setAttributes({ recipientEmail: value })}
                        help={__('Email qui recevra les messages du formulaire', 'mon-theme-aca')}
                    />
                    <TextareaControl
                        label={__('Message de succès', 'mon-theme-aca')}
                        value={successMessage}
                        onChange={(value) => setAttributes({ successMessage: value })}
                    />
                    <TextareaControl
                        label={__('Message d\'erreur', 'mon-theme-aca')}
                        value={errorMessage}
                        onChange={(value) => setAttributes({ errorMessage: value })}
                    />
                </PanelBody>

                <PanelBody title={__('Champs du formulaire', 'mon-theme-aca')}>
                    <ToggleControl
                        label={__('Afficher le champ "Organisation"', 'mon-theme-aca')}
                        checked={showOrganizationField}
                        onChange={(value) => setAttributes({ showOrganizationField: value })}
                    />
                    <ToggleControl
                        label={__('Afficher le champ "Motif de contact"', 'mon-theme-aca')}
                        checked={showContactReasonField}
                        onChange={(value) => setAttributes({ showContactReasonField: value })}
                    />
                    <ToggleControl
                        label={__('Afficher le champ "Méthode de contact préférée"', 'mon-theme-aca')}
                        checked={showPreferredContactField}
                        onChange={(value) => setAttributes({ showPreferredContactField: value })}
                    />

                    {showContactReasonField && (
                        <div className="contact-reasons-editor">
                            <p className="contact-reasons-title">{__('Motifs de contact', 'mon-theme-aca')}</p>
                            <ul className="contact-reasons-list">
                                {contactReasons.map((reason, index) => (
                                    <li key={index} className="contact-reason-item">
                                        <span>{reason}</span>
                                        <Button 
                                            isDestructive
                                            isSmall
                                            onClick={() => removeContactReason(index)}
                                            icon="trash"
                                        />
                                    </li>
                                ))}
                            </ul>
                            <div className="contact-reason-add">
                                <TextControl
                                    value={newReason}
                                    onChange={(value) => setNewReason(value)}
                                    placeholder={__('Nouveau motif...', 'mon-theme-aca')}
                                />
                                <Button 
                                    isPrimary
                                    onClick={addContactReason}
                                    disabled={newReason.trim() === ''}
                                >
                                    {__('Ajouter', 'mon-theme-aca')}
                                </Button>
                            </div>
                        </div>
                    )}
                </PanelBody>

                <PanelBody title={__('Couleurs', 'mon-theme-aca')}>
                    <div className="color-option">
                        <label>{__('Couleur de fond', 'mon-theme-aca')}</label>
                        <ColorPicker
                            color={backgroundColor}
                            onChange={(value) => setAttributes({ backgroundColor: value })}
                            enableAlpha
                        />
                    </div>
                    <div className="color-option">
                        <label>{__('Couleur du texte', 'mon-theme-aca')}</label>
                        <ColorPicker
                            color={textColor}
                            onChange={(value) => setAttributes({ textColor: value })}
                            enableAlpha
                        />
                    </div>
                    <div className="color-option">
                        <label>{__('Couleur du bouton', 'mon-theme-aca')}</label>
                        <ColorPicker
                            color={buttonColor}
                            onChange={(value) => setAttributes({ buttonColor: value })}
                            enableAlpha
                        />
                    </div>
                    <div className="color-option">
                        <label>{__('Couleur du texte du bouton', 'mon-theme-aca')}</label>
                        <ColorPicker
                            color={buttonTextColor}
                            onChange={(value) => setAttributes({ buttonTextColor: value })}
                            enableAlpha
                        />
                    </div>
                </PanelBody>
            </InspectorControls>

            <div {...blockProps}>
                <div className="contact-form-container">
                    <RichText
                        tagName="h2"
                        className="contact-form-title"
                        value={title}
                        onChange={(value) => setAttributes({ title: value })}
                        placeholder={__('Titre du formulaire...', 'mon-theme-aca')}
                    />
                    
                    <div className="contact-form-preview">
                        {/* Personal Information */}
                        <div className="form-row">
                            <div className="form-group">
                                <label className="form-label">
                                    {__('Prénom *', 'mon-theme-aca')}
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder={__('Votre prénom', 'mon-theme-aca')}
                                    disabled
                                />
                            </div>
                            <div className="form-group">
                                <label className="form-label">
                                    {__('Nom *', 'mon-theme-aca')}
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder={__('Votre nom', 'mon-theme-aca')}
                                    disabled
                                />
                            </div>
                        </div>

                        {/* Contact Information */}
                        <div className="form-row">
                            <div className="form-group">
                                <label className="form-label">
                                    {__('Email *', 'mon-theme-aca')}
                                </label>
                                <input
                                    type="email"
                                    className="form-control"
                                    placeholder={__('votre.email@exemple.com', 'mon-theme-aca')}
                                    disabled
                                />
                            </div>
                            <div className="form-group">
                                <label className="form-label">
                                    {__('Téléphone', 'mon-theme-aca')}
                                </label>
                                <input
                                    type="tel"
                                    className="form-control"
                                    placeholder={__('Votre numéro de téléphone', 'mon-theme-aca')}
                                    disabled
                                />
                            </div>
                        </div>

                        {/* Organization */}
                        {showOrganizationField && (
                            <div className="form-group">
                                <label className="form-label">
                                    {__('Organisation', 'mon-theme-aca')}
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder={__('Nom de votre entreprise ou organisation', 'mon-theme-aca')}
                                    disabled
                                />
                            </div>
                        )}

                        {/* Contact Reason */}
                        {showContactReasonField && (
                            <div className="form-group">
                                <label className="form-label">
                                    {__('Motif de contact *', 'mon-theme-aca')}
                                </label>
                                <select
                                    className="form-control"
                                    disabled
                                >
                                    <option value="">{__('Sélectionnez un motif', 'mon-theme-aca')}</option>
                                    {contactReasons.map((reason, index) => (
                                        <option key={index} value={reason}>{reason}</option>
                                    ))}
                                </select>
                            </div>
                        )}

                        {/* Subject */}
                        <div className="form-group">
                            <label className="form-label">
                                {__('Sujet *', 'mon-theme-aca')}
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder={__('Résumé de votre demande', 'mon-theme-aca')}
                                disabled
                            />
                        </div>

                        {/* Message */}
                        <div className="form-group">
                            <label className="form-label">
                                {__('Message *', 'mon-theme-aca')}
                            </label>
                            <textarea
                                className="form-control"
                                rows={6}
                                placeholder={__('Décrivez votre demande en détail...', 'mon-theme-aca')}
                                disabled
                            />
                        </div>

                        {/* Preferred Contact Method */}
                        {showPreferredContactField && (
                            <div className="form-group">
                                <label className="form-label">
                                    {__('Méthode de contact préférée', 'mon-theme-aca')}
                                </label>
                                <div className="radio-group">
                                    <label className="radio-label">
                                        <input
                                            type="radio"
                                            name="preferredContact"
                                            value="email"
                                            checked
                                            disabled
                                        />
                                        <span>{__('Email', 'mon-theme-aca')}</span>
                                    </label>
                                    <label className="radio-label">
                                        <input
                                            type="radio"
                                            name="preferredContact"
                                            value="phone"
                                            disabled
                                        />
                                        <span>{__('Téléphone', 'mon-theme-aca')}</span>
                                    </label>
                                </div>
                            </div>
                        )}

                        {/* Submit Button */}
                        <div className="form-submit">
                            <button
                                type="button"
                                className="submit-button"
                                style={{
                                    backgroundColor: buttonColor,
                                    color: buttonTextColor
                                }}
                                disabled
                            >
                                <span className="submit-icon"></span>
                                <span>{__('Envoyer le message', 'mon-theme-aca')}</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}