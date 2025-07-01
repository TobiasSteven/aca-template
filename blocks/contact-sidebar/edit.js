import { __ } from '@wordpress/i18n';
import { useBlockProps, InspectorControls, RichText } from '@wordpress/block-editor';
import { 
    PanelBody, 
    TextControl, 
    ColorPicker,
    Button
} from '@wordpress/components';
import { Fragment, useState } from '@wordpress/element';

import './editor.scss';

export default function Edit({ attributes, setAttributes }) {
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

    const [currentDepartment, setCurrentDepartment] = useState(0);
    const [newDepartment, setNewDepartment] = useState({
        name: '',
        email: '',
        phone: '',
        description: ''
    });

    const blockProps = useBlockProps({
        className: 'contact-sidebar-block'
    });

    const updateDepartment = (index, field, value) => {
        const newDepartments = [...departments];
        newDepartments[index] = {
            ...newDepartments[index],
            [field]: value
        };
        setAttributes({ departments: newDepartments });
    };

    const addDepartment = () => {
        if (newDepartment.name.trim() !== '') {
            setAttributes({
                departments: [...departments, { ...newDepartment }]
            });
            setNewDepartment({
                name: '',
                email: '',
                phone: '',
                description: ''
            });
        }
    };

    const removeDepartment = (index) => {
        const newDepartments = [...departments];
        newDepartments.splice(index, 1);
        setAttributes({ departments: newDepartments });
        if (currentDepartment >= newDepartments.length) {
            setCurrentDepartment(Math.max(0, newDepartments.length - 1));
        }
    };

    return (
        <Fragment>
            <InspectorControls>
                <PanelBody title={__('Contact Rapide', 'mon-theme-aca')}>
                    <TextControl
                        label={__('Titre', 'mon-theme-aca')}
                        value={quickContactTitle}
                        onChange={(value) => setAttributes({ quickContactTitle: value })}
                    />
                    <TextControl
                        label={__('Téléphone', 'mon-theme-aca')}
                        value={phone}
                        onChange={(value) => setAttributes({ phone: value })}
                    />
                    <TextControl
                        label={__('Email', 'mon-theme-aca')}
                        value={email}
                        onChange={(value) => setAttributes({ email: value })}
                    />
                    <TextControl
                        label={__('Horaires', 'mon-theme-aca')}
                        value={hours}
                        onChange={(value) => setAttributes({ hours: value })}
                    />
                    <div className="color-option">
                        <label>{__('Couleur de fond', 'mon-theme-aca')}</label>
                        <ColorPicker
                            color={quickContactBgColor}
                            onChange={(value) => setAttributes({ quickContactBgColor: value })}
                            enableAlpha
                        />
                    </div>
                </PanelBody>

                <PanelBody title={__('Départements', 'mon-theme-aca')}>
                    <TextControl
                        label={__('Titre', 'mon-theme-aca')}
                        value={departmentsTitle}
                        onChange={(value) => setAttributes({ departmentsTitle: value })}
                    />
                    
                    <div className="departments-editor">
                        <div className="departments-list">
                            <p className="departments-title">{__('Départements', 'mon-theme-aca')}</p>
                            
                            {departments.length > 0 ? (
                                <div className="departments-tabs">
                                    {departments.map((dept, index) => (
                                        <button
                                            key={index}
                                            className={`department-tab ${index === currentDepartment ? 'active' : ''}`}
                                            onClick={() => setCurrentDepartment(index)}
                                        >
                                            {dept.name || __('Sans nom', 'mon-theme-aca')}
                                        </button>
                                    ))}
                                </div>
                            ) : (
                                <p className="no-departments">{__('Aucun département ajouté', 'mon-theme-aca')}</p>
                            )}
                            
                            {departments.length > 0 && (
                                <div className="department-editor">
                                    <TextControl
                                        label={__('Nom', 'mon-theme-aca')}
                                        value={departments[currentDepartment].name}
                                        onChange={(value) => updateDepartment(currentDepartment, 'name', value)}
                                    />
                                    <TextControl
                                        label={__('Email', 'mon-theme-aca')}
                                        value={departments[currentDepartment].email}
                                        onChange={(value) => updateDepartment(currentDepartment, 'email', value)}
                                    />
                                    <TextControl
                                        label={__('Téléphone', 'mon-theme-aca')}
                                        value={departments[currentDepartment].phone}
                                        onChange={(value) => updateDepartment(currentDepartment, 'phone', value)}
                                    />
                                    <TextControl
                                        label={__('Description', 'mon-theme-aca')}
                                        value={departments[currentDepartment].description}
                                        onChange={(value) => updateDepartment(currentDepartment, 'description', value)}
                                    />
                                    <Button
                                        isDestructive
                                        onClick={() => removeDepartment(currentDepartment)}
                                    >
                                        {__('Supprimer ce département', 'mon-theme-aca')}
                                    </Button>
                                </div>
                            )}
                        </div>
                        
                        <div className="add-department">
                            <p className="add-department-title">{__('Ajouter un département', 'mon-theme-aca')}</p>
                            <TextControl
                                placeholder={__('Nom du département', 'mon-theme-aca')}
                                value={newDepartment.name}
                                onChange={(value) => setNewDepartment({...newDepartment, name: value})}
                            />
                            <TextControl
                                placeholder={__('Email', 'mon-theme-aca')}
                                value={newDepartment.email}
                                onChange={(value) => setNewDepartment({...newDepartment, email: value})}
                            />
                            <TextControl
                                placeholder={__('Téléphone', 'mon-theme-aca')}
                                value={newDepartment.phone}
                                onChange={(value) => setNewDepartment({...newDepartment, phone: value})}
                            />
                            <TextControl
                                placeholder={__('Description', 'mon-theme-aca')}
                                value={newDepartment.description}
                                onChange={(value) => setNewDepartment({...newDepartment, description: value})}
                            />
                            <Button
                                isPrimary
                                onClick={addDepartment}
                                disabled={!newDepartment.name.trim()}
                            >
                                {__('Ajouter', 'mon-theme-aca')}
                            </Button>
                        </div>
                    </div>
                    
                    <div className="color-option">
                        <label>{__('Couleur de fond', 'mon-theme-aca')}</label>
                        <ColorPicker
                            color={departmentsBgColor}
                            onChange={(value) => setAttributes({ departmentsBgColor: value })}
                            enableAlpha
                        />
                    </div>
                </PanelBody>

                <PanelBody title={__('Réseaux Sociaux', 'mon-theme-aca')}>
                    <TextControl
                        label={__('Titre', 'mon-theme-aca')}
                        value={socialTitle}
                        onChange={(value) => setAttributes({ socialTitle: value })}
                    />
                    <TextControl
                        label={__('Sous-titre', 'mon-theme-aca')}
                        value={socialSubtitle}
                        onChange={(value) => setAttributes({ socialSubtitle: value })}
                    />
                    <TextControl
                        label={__('URL Facebook', 'mon-theme-aca')}
                        value={facebookUrl}
                        onChange={(value) => setAttributes({ facebookUrl: value })}
                    />
                    <TextControl
                        label={__('URL Twitter', 'mon-theme-aca')}
                        value={twitterUrl}
                        onChange={(value) => setAttributes({ twitterUrl: value })}
                    />
                    <TextControl
                        label={__('URL LinkedIn', 'mon-theme-aca')}
                        value={linkedinUrl}
                        onChange={(value) => setAttributes({ linkedinUrl: value })}
                    />
                    <TextControl
                        label={__('URL YouTube', 'mon-theme-aca')}
                        value={youtubeUrl}
                        onChange={(value) => setAttributes({ youtubeUrl: value })}
                    />
                    <div className="color-option">
                        <label>{__('Couleur de fond', 'mon-theme-aca')}</label>
                        <ColorPicker
                            color={socialBgColor}
                            onChange={(value) => setAttributes({ socialBgColor: value })}
                            enableAlpha
                        />
                    </div>
                </PanelBody>
            </InspectorControls>

            <div {...blockProps}>
                <div className="contact-sidebar-container">
                    {/* Quick Contact */}
                    <div 
                        className="quick-contact-section"
                        style={{ backgroundColor: quickContactBgColor }}
                    >
                        <RichText
                            tagName="h3"
                            className="section-title"
                            value={quickContactTitle}
                            onChange={(value) => setAttributes({ quickContactTitle: value })}
                            placeholder={__('Titre contact rapide...', 'mon-theme-aca')}
                        />
                        <div className="contact-items">
                            <div className="contact-item">
                                <span className="contact-icon phone-icon"></span>
                                <div className="contact-info">
                                    <p className="contact-label">{__('Téléphone', 'mon-theme-aca')}</p>
                                    <RichText
                                        tagName="p"
                                        className="contact-value"
                                        value={phone}
                                        onChange={(value) => setAttributes({ phone: value })}
                                        placeholder={__('Numéro de téléphone...', 'mon-theme-aca')}
                                    />
                                </div>
                            </div>
                            <div className="contact-item">
                                <span className="contact-icon email-icon"></span>
                                <div className="contact-info">
                                    <p className="contact-label">{__('Email', 'mon-theme-aca')}</p>
                                    <RichText
                                        tagName="p"
                                        className="contact-value"
                                        value={email}
                                        onChange={(value) => setAttributes({ email: value })}
                                        placeholder={__('Adresse email...', 'mon-theme-aca')}
                                    />
                                </div>
                            </div>
                            <div className="contact-item">
                                <span className="contact-icon hours-icon"></span>
                                <div className="contact-info">
                                    <p className="contact-label">{__('Horaires', 'mon-theme-aca')}</p>
                                    <RichText
                                        tagName="p"
                                        className="contact-value"
                                        value={hours}
                                        onChange={(value) => setAttributes({ hours: value })}
                                        placeholder={__('Horaires d\'ouverture...', 'mon-theme-aca')}
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
                        <RichText
                            tagName="h3"
                            className="section-title"
                            value={departmentsTitle}
                            onChange={(value) => setAttributes({ departmentsTitle: value })}
                            placeholder={__('Titre départements...', 'mon-theme-aca')}
                        />
                        <div className="departments-list">
                            {departments.map((dept, index) => (
                                <div key={index} className="department-item">
                                    <RichText
                                        tagName="h4"
                                        className="department-name"
                                        value={dept.name}
                                        onChange={(value) => updateDepartment(index, 'name', value)}
                                        placeholder={__('Nom du département...', 'mon-theme-aca')}
                                    />
                                    <RichText
                                        tagName="p"
                                        className="department-description"
                                        value={dept.description}
                                        onChange={(value) => updateDepartment(index, 'description', value)}
                                        placeholder={__('Description...', 'mon-theme-aca')}
                                    />
                                    <div className="department-contacts">
                                        <RichText
                                            tagName="a"
                                            className="department-email"
                                            value={dept.email}
                                            onChange={(value) => updateDepartment(index, 'email', value)}
                                            placeholder={__('Email...', 'mon-theme-aca')}
                                        />
                                        <RichText
                                            tagName="a"
                                            className="department-phone"
                                            value={dept.phone}
                                            onChange={(value) => updateDepartment(index, 'phone', value)}
                                            placeholder={__('Téléphone...', 'mon-theme-aca')}
                                        />
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
                        <RichText
                            tagName="h3"
                            className="section-title"
                            value={socialTitle}
                            onChange={(value) => setAttributes({ socialTitle: value })}
                            placeholder={__('Titre réseaux sociaux...', 'mon-theme-aca')}
                        />
                        <RichText
                            tagName="p"
                            className="social-subtitle"
                            value={socialSubtitle}
                            onChange={(value) => setAttributes({ socialSubtitle: value })}
                            placeholder={__('Sous-titre...', 'mon-theme-aca')}
                        />
                        <div className="social-icons">
                            <a className="social-icon facebook-icon" href={facebookUrl} target="_blank" rel="noopener noreferrer"></a>
                            <a className="social-icon twitter-icon" href={twitterUrl} target="_blank" rel="noopener noreferrer"></a>
                            <a className="social-icon linkedin-icon" href={linkedinUrl} target="_blank" rel="noopener noreferrer"></a>
                            <a className="social-icon youtube-icon" href={youtubeUrl} target="_blank" rel="noopener noreferrer"></a>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}