import { __ } from '@wordpress/i18n';
import { useBlockProps, InspectorControls, RichText } from '@wordpress/block-editor';
import { 
    PanelBody, 
    TextControl, 
    ColorPicker,
    Button,
    ToggleControl
} from '@wordpress/components';
import { Fragment, useState } from '@wordpress/element';

import './editor.scss';

export default function Edit({ attributes, setAttributes }) {
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

    const [currentOffice, setCurrentOffice] = useState(0);
    const [newOffice, setNewOffice] = useState({
        id: Date.now(),
        name: '',
        city: '',
        country: '',
        address: '',
        postalCode: '',
        phone: '',
        email: '',
        hours: '',
        isMain: false
    });

    const blockProps = useBlockProps({
        className: 'contact-offices-block',
        style: {
            backgroundColor: backgroundColor
        }
    });

    const updateOffice = (index, field, value) => {
        const newOffices = [...offices];
        newOffices[index] = {
            ...newOffices[index],
            [field]: value
        };
        
        // If setting a new main office, unset any other main office
        if (field === 'isMain' && value === true) {
            newOffices.forEach((office, i) => {
                if (i !== index && office.isMain) {
                    newOffices[i] = { ...office, isMain: false };
                }
            });
        }
        
        setAttributes({ offices: newOffices });
    };

    const addOffice = () => {
        if (newOffice.name.trim() !== '' && newOffice.city.trim() !== '') {
            // If this is the first office or isMain is true and no other office is main
            const shouldBeMain = newOffice.isMain || offices.length === 0;
            
            // If this should be main, ensure no other office is main
            let updatedOffices = [...offices];
            if (shouldBeMain) {
                updatedOffices = updatedOffices.map(office => ({
                    ...office,
                    isMain: false
                }));
            }
            
            setAttributes({
                offices: [
                    ...updatedOffices, 
                    { 
                        ...newOffice, 
                        id: Date.now(),
                        isMain: shouldBeMain
                    }
                ]
            });
            
            setNewOffice({
                id: Date.now() + 1,
                name: '',
                city: '',
                country: '',
                address: '',
                postalCode: '',
                phone: '',
                email: '',
                hours: '',
                isMain: false
            });
        }
    };

    const removeOffice = (index) => {
        const newOffices = [...offices];
        const removedOffice = newOffices[index];
        newOffices.splice(index, 1);
        
        // If we're removing the main office and there are other offices, make the first one main
        if (removedOffice.isMain && newOffices.length > 0) {
            newOffices[0] = { ...newOffices[0], isMain: true };
        }
        
        setAttributes({ offices: newOffices });
        if (currentOffice >= newOffices.length) {
            setCurrentOffice(Math.max(0, newOffices.length - 1));
        }
    };

    return (
        <Fragment>
            <InspectorControls>
                <PanelBody title={__('Paramètres généraux', 'mon-theme-aca')}>
                    <TextControl
                        label={__('Titre', 'mon-theme-aca')}
                        value={title}
                        onChange={(value) => setAttributes({ title: value })}
                    />
                    <TextControl
                        label={__('Sous-titre', 'mon-theme-aca')}
                        value={subtitle}
                        onChange={(value) => setAttributes({ subtitle: value })}
                    />
                </PanelBody>

                <PanelBody title={__('Bureaux', 'mon-theme-aca')}>
                    <div className="offices-editor">
                        <div className="offices-list">
                            <p className="offices-title">{__('Bureaux', 'mon-theme-aca')}</p>
                            
                            {offices.length > 0 ? (
                                <div className="offices-tabs">
                                    {offices.map((office, index) => (
                                        <button
                                            key={index}
                                            className={`office-tab ${index === currentOffice ? 'active' : ''} ${office.isMain ? 'main' : ''}`}
                                            onClick={() => setCurrentOffice(index)}
                                        >
                                            {office.name || __('Sans nom', 'mon-theme-aca')}
                                        </button>
                                    ))}
                                </div>
                            ) : (
                                <p className="no-offices">{__('Aucun bureau ajouté', 'mon-theme-aca')}</p>
                            )}
                            
                            {offices.length > 0 && (
                                <div className="office-editor">
                                    <TextControl
                                        label={__('Nom', 'mon-theme-aca')}
                                        value={offices[currentOffice].name}
                                        onChange={(value) => updateOffice(currentOffice, 'name', value)}
                                    />
                                    <div className="office-location">
                                        <TextControl
                                            label={__('Ville', 'mon-theme-aca')}
                                            value={offices[currentOffice].city}
                                            onChange={(value) => updateOffice(currentOffice, 'city', value)}
                                        />
                                        <TextControl
                                            label={__('Pays', 'mon-theme-aca')}
                                            value={offices[currentOffice].country}
                                            onChange={(value) => updateOffice(currentOffice, 'country', value)}
                                        />
                                    </div>
                                    <TextControl
                                        label={__('Adresse', 'mon-theme-aca')}
                                        value={offices[currentOffice].address}
                                        onChange={(value) => updateOffice(currentOffice, 'address', value)}
                                    />
                                    <TextControl
                                        label={__('Code postal', 'mon-theme-aca')}
                                        value={offices[currentOffice].postalCode}
                                        onChange={(value) => updateOffice(currentOffice, 'postalCode', value)}
                                    />
                                    <TextControl
                                        label={__('Téléphone', 'mon-theme-aca')}
                                        value={offices[currentOffice].phone}
                                        onChange={(value) => updateOffice(currentOffice, 'phone', value)}
                                    />
                                    <TextControl
                                        label={__('Email', 'mon-theme-aca')}
                                        value={offices[currentOffice].email}
                                        onChange={(value) => updateOffice(currentOffice, 'email', value)}
                                    />
                                    <TextControl
                                        label={__('Horaires', 'mon-theme-aca')}
                                        value={offices[currentOffice].hours}
                                        onChange={(value) => updateOffice(currentOffice, 'hours', value)}
                                    />
                                    <ToggleControl
                                        label={__('Bureau principal', 'mon-theme-aca')}
                                        checked={offices[currentOffice].isMain}
                                        onChange={(value) => updateOffice(currentOffice, 'isMain', value)}
                                    />
                                    <Button
                                        isDestructive
                                        onClick={() => removeOffice(currentOffice)}
                                    >
                                        {__('Supprimer ce bureau', 'mon-theme-aca')}
                                    </Button>
                                </div>
                            )}
                        </div>
                        
                        <div className="add-office">
                            <p className="add-office-title">{__('Ajouter un bureau', 'mon-theme-aca')}</p>
                            <TextControl
                                placeholder={__('Nom du bureau', 'mon-theme-aca')}
                                value={newOffice.name}
                                onChange={(value) => setNewOffice({...newOffice, name: value})}
                            />
                            <div className="office-location">
                                <TextControl
                                    placeholder={__('Ville', 'mon-theme-aca')}
                                    value={newOffice.city}
                                    onChange={(value) => setNewOffice({...newOffice, city: value})}
                                />
                                <TextControl
                                    placeholder={__('Pays', 'mon-theme-aca')}
                                    value={newOffice.country}
                                    onChange={(value) => setNewOffice({...newOffice, country: value})}
                                />
                            </div>
                            <TextControl
                                placeholder={__('Adresse', 'mon-theme-aca')}
                                value={newOffice.address}
                                onChange={(value) => setNewOffice({...newOffice, address: value})}
                            />
                            <TextControl
                                placeholder={__('Code postal', 'mon-theme-aca')}
                                value={newOffice.postalCode}
                                onChange={(value) => setNewOffice({...newOffice, postalCode: value})}
                            />
                            <TextControl
                                placeholder={__('Téléphone', 'mon-theme-aca')}
                                value={newOffice.phone}
                                onChange={(value) => setNewOffice({...newOffice, phone: value})}
                            />
                            <TextControl
                                placeholder={__('Email', 'mon-theme-aca')}
                                value={newOffice.email}
                                onChange={(value) => setNewOffice({...newOffice, email: value})}
                            />
                            <TextControl
                                placeholder={__('Horaires', 'mon-theme-aca')}
                                value={newOffice.hours}
                                onChange={(value) => setNewOffice({...newOffice, hours: value})}
                            />
                            <ToggleControl
                                label={__('Bureau principal', 'mon-theme-aca')}
                                checked={newOffice.isMain}
                                onChange={(value) => setNewOffice({...newOffice, isMain: value})}
                            />
                            <Button
                                isPrimary
                                onClick={addOffice}
                                disabled={!newOffice.name.trim() || !newOffice.city.trim()}
                            >
                                {__('Ajouter', 'mon-theme-aca')}
                            </Button>
                        </div>
                    </div>
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
                        <label>{__('Couleur du titre', 'mon-theme-aca')}</label>
                        <ColorPicker
                            color={titleColor}
                            onChange={(value) => setAttributes({ titleColor: value })}
                            enableAlpha
                        />
                    </div>
                    <div className="color-option">
                        <label>{__('Couleur du sous-titre', 'mon-theme-aca')}</label>
                        <ColorPicker
                            color={subtitleColor}
                            onChange={(value) => setAttributes({ subtitleColor: value })}
                            enableAlpha
                        />
                    </div>
                    <div className="color-option">
                        <label>{__('Couleur de fond des cartes', 'mon-theme-aca')}</label>
                        <ColorPicker
                            color={cardBgColor}
                            onChange={(value) => setAttributes({ cardBgColor: value })}
                            enableAlpha
                        />
                    </div>
                    <div className="color-option">
                        <label>{__('Couleur du bureau principal', 'mon-theme-aca')}</label>
                        <ColorPicker
                            color={mainOfficeColor}
                            onChange={(value) => setAttributes({ mainOfficeColor: value })}
                            enableAlpha
                        />
                    </div>
                    <div className="color-option">
                        <label>{__('Couleur des bureaux réguliers', 'mon-theme-aca')}</label>
                        <ColorPicker
                            color={regularOfficeColor}
                            onChange={(value) => setAttributes({ regularOfficeColor: value })}
                            enableAlpha
                        />
                    </div>
                </PanelBody>
            </InspectorControls>

            <div {...blockProps}>
                <div className="contact-offices-container">
                    <div className="contact-offices-header">
                        <RichText
                            tagName="h2"
                            className="contact-offices-title"
                            style={{ color: titleColor }}
                            value={title}
                            onChange={(value) => setAttributes({ title: value })}
                            placeholder={__('Titre...', 'mon-theme-aca')}
                        />
                        <RichText
                            tagName="p"
                            className="contact-offices-subtitle"
                            style={{ color: subtitleColor }}
                            value={subtitle}
                            onChange={(value) => setAttributes({ subtitle: value })}
                            placeholder={__('Sous-titre...', 'mon-theme-aca')}
                        />
                    </div>
                    
                    <div className="offices-grid">
                        {offices.map((office, index) => (
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
                                        <RichText
                                            tagName="h3"
                                            className="office-name"
                                            value={office.name}
                                            onChange={(value) => updateOffice(index, 'name', value)}
                                            placeholder={__('Nom du bureau...', 'mon-theme-aca')}
                                        />
                                        <RichText
                                            tagName="p"
                                            className="office-location"
                                            value={`${office.city}, ${office.country}`}
                                            onChange={(value) => {
                                                const parts = value.split(',');
                                                if (parts.length >= 2) {
                                                    updateOffice(index, 'city', parts[0].trim());
                                                    updateOffice(index, 'country', parts.slice(1).join(',').trim());
                                                } else {
                                                    updateOffice(index, 'city', value);
                                                }
                                            }}
                                            placeholder={__('Ville, Pays...', 'mon-theme-aca')}
                                        />
                                    </div>
                                    {office.isMain && (
                                        <span 
                                            className="main-office-badge"
                                            style={{ backgroundColor: mainOfficeColor }}
                                        >
                                            {__('Siège', 'mon-theme-aca')}
                                        </span>
                                    )}
                                </div>
                                
                                <div className="office-details">
                                    <div className="office-detail">
                                        <span className="detail-icon address-icon"></span>
                                        <div className="detail-content">
                                            <RichText
                                                tagName="p"
                                                className="detail-text"
                                                value={office.address}
                                                onChange={(value) => updateOffice(index, 'address', value)}
                                                placeholder={__('Adresse...', 'mon-theme-aca')}
                                            />
                                            <RichText
                                                tagName="p"
                                                className="detail-subtext"
                                                value={office.postalCode}
                                                onChange={(value) => updateOffice(index, 'postalCode', value)}
                                                placeholder={__('Code postal...', 'mon-theme-aca')}
                                            />
                                        </div>
                                    </div>
                                    
                                    <div className="office-detail">
                                        <span className="detail-icon phone-icon"></span>
                                        <RichText
                                            tagName="a"
                                            className="detail-link"
                                            value={office.phone}
                                            onChange={(value) => updateOffice(index, 'phone', value)}
                                            placeholder={__('Téléphone...', 'mon-theme-aca')}
                                        />
                                    </div>
                                    
                                    <div className="office-detail">
                                        <span className="detail-icon email-icon"></span>
                                        <RichText
                                            tagName="a"
                                            className="detail-link"
                                            value={office.email}
                                            onChange={(value) => updateOffice(index, 'email', value)}
                                            placeholder={__('Email...', 'mon-theme-aca')}
                                        />
                                    </div>
                                    
                                    <div className="office-detail">
                                        <span className="detail-icon hours-icon"></span>
                                        <RichText
                                            tagName="span"
                                            className="detail-text"
                                            value={office.hours}
                                            onChange={(value) => updateOffice(index, 'hours', value)}
                                            placeholder={__('Horaires...', 'mon-theme-aca')}
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </Fragment>
    );
}