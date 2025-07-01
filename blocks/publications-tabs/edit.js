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
        tabs,
        defaultActiveTab,
        backgroundColor,
        borderColor,
        textColor,
        activeTextColor,
        activeBorderColor,
        hoverTextColor,
        hoverBorderColor
    } = attributes;

    const [activeTab, setActiveTab] = useState(defaultActiveTab);
    const [newTabId, setNewTabId] = useState('');
    const [newTabLabel, setNewTabLabel] = useState('');

    const blockProps = useBlockProps({
        className: 'publications-tabs-block',
        style: {
            backgroundColor: backgroundColor,
            borderBottom: `1px solid ${borderColor}`
        }
    });

    const updateTab = (index, field, value) => {
        const newTabs = [...tabs];
        newTabs[index] = {
            ...newTabs[index],
            [field]: value
        };
        setAttributes({ tabs: newTabs });
    };

    const addTab = () => {
        if (newTabId.trim() !== '' && newTabLabel.trim() !== '') {
            setAttributes({
                tabs: [...tabs, { id: newTabId.trim(), label: newTabLabel.trim() }]
            });
            setNewTabId('');
            setNewTabLabel('');
        }
    };

    const removeTab = (index) => {
        const newTabs = [...tabs];
        const removedTab = newTabs[index];
        newTabs.splice(index, 1);
        
        // If we're removing the default active tab, update it to the first tab
        if (removedTab.id === defaultActiveTab && newTabs.length > 0) {
            setAttributes({ defaultActiveTab: newTabs[0].id });
            setActiveTab(newTabs[0].id);
        }
        
        setAttributes({ tabs: newTabs });
    };

    const setDefaultTab = (tabId) => {
        setAttributes({ defaultActiveTab: tabId });
        setActiveTab(tabId);
    };

    return (
        <Fragment>
            <InspectorControls>
                <PanelBody title={__('Onglets', 'mon-theme-aca')}>
                    <div className="tabs-editor">
                        <div className="tabs-list">
                            <p className="tabs-title">{__('Onglets existants', 'mon-theme-aca')}</p>
                            
                            {tabs.length > 0 ? (
                                <div className="tabs-items">
                                    {tabs.map((tab, index) => (
                                        <div key={index} className="tab-item">
                                            <div className="tab-info">
                                                <TextControl
                                                    label={__('ID', 'mon-theme-aca')}
                                                    value={tab.id}
                                                    onChange={(value) => updateTab(index, 'id', value)}
                                                />
                                                <TextControl
                                                    label={__('Libellé', 'mon-theme-aca')}
                                                    value={tab.label}
                                                    onChange={(value) => updateTab(index, 'label', value)}
                                                />
                                            </div>
                                            <div className="tab-actions">
                                                <Button
                                                    isSecondary
                                                    isSmall
                                                    onClick={() => setDefaultTab(tab.id)}
                                                    disabled={tab.id === defaultActiveTab}
                                                >
                                                    {tab.id === defaultActiveTab ? __('Onglet par défaut', 'mon-theme-aca') : __('Définir par défaut', 'mon-theme-aca')}
                                                </Button>
                                                <Button
                                                    isDestructive
                                                    isSmall
                                                    onClick={() => removeTab(index)}
                                                    disabled={tabs.length <= 1}
                                                >
                                                    {__('Supprimer', 'mon-theme-aca')}
                                                </Button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="no-tabs">{__('Aucun onglet défini', 'mon-theme-aca')}</p>
                            )}
                        </div>
                        
                        <div className="add-tab">
                            <p className="add-tab-title">{__('Ajouter un onglet', 'mon-theme-aca')}</p>
                            <TextControl
                                placeholder={__('ID de l\'onglet (sans espaces)', 'mon-theme-aca')}
                                value={newTabId}
                                onChange={(value) => setNewTabId(value.replace(/\s+/g, '-').toLowerCase())}
                            />
                            <TextControl
                                placeholder={__('Libellé de l\'onglet', 'mon-theme-aca')}
                                value={newTabLabel}
                                onChange={(value) => setNewTabLabel(value)}
                            />
                            <Button
                                isPrimary
                                onClick={addTab}
                                disabled={!newTabId.trim() || !newTabLabel.trim()}
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
                        <label>{__('Couleur de bordure', 'mon-theme-aca')}</label>
                        <ColorPicker
                            color={borderColor}
                            onChange={(value) => setAttributes({ borderColor: value })}
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
                        <label>{__('Couleur du texte actif', 'mon-theme-aca')}</label>
                        <ColorPicker
                            color={activeTextColor}
                            onChange={(value) => setAttributes({ activeTextColor: value })}
                            enableAlpha
                        />
                    </div>
                    <div className="color-option">
                        <label>{__('Couleur de bordure active', 'mon-theme-aca')}</label>
                        <ColorPicker
                            color={activeBorderColor}
                            onChange={(value) => setAttributes({ activeBorderColor: value })}
                            enableAlpha
                        />
                    </div>
                    <div className="color-option">
                        <label>{__('Couleur du texte au survol', 'mon-theme-aca')}</label>
                        <ColorPicker
                            color={hoverTextColor}
                            onChange={(value) => setAttributes({ hoverTextColor: value })}
                            enableAlpha
                        />
                    </div>
                    <div className="color-option">
                        <label>{__('Couleur de bordure au survol', 'mon-theme-aca')}</label>
                        <ColorPicker
                            color={hoverBorderColor}
                            onChange={(value) => setAttributes({ hoverBorderColor: value })}
                            enableAlpha
                        />
                    </div>
                </PanelBody>
            </InspectorControls>

            <div {...blockProps}>
                <div className="publications-tabs-container">
                    <div className="tabs-wrapper">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
                                onClick={() => setActiveTab(tab.id)}
                                style={{
                                    color: activeTab === tab.id ? activeTextColor : textColor,
                                    borderBottomColor: activeTab === tab.id ? activeBorderColor : 'transparent'
                                }}
                            >
                                <RichText
                                    tagName="span"
                                    value={tab.label}
                                    onChange={(value) => {
                                        const index = tabs.findIndex(t => t.id === tab.id);
                                        if (index !== -1) {
                                            updateTab(index, 'label', value);
                                        }
                                    }}
                                    placeholder={__('Libellé...', 'mon-theme-aca')}
                                />
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </Fragment>
    );
}