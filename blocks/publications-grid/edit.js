import { __ } from '@wordpress/i18n';
import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import { 
    PanelBody, 
    TextControl, 
    RangeControl,
    SelectControl,
    ColorPicker,
    Button,
    ToggleControl,
    TabPanel
} from '@wordpress/components';
import { Fragment, useState, useEffect } from '@wordpress/element';

import './editor.scss';

export default function Edit({ attributes, setAttributes }) {
    const { 
        blockId,
        publications,
        documentTypes,
        themes,
        languages,
        levels,
        defaultViewMode,
        defaultSortBy,
        defaultSortOrder,
        itemsPerPage,
        backgroundColor,
        sidebarBgColor,
        mainBgColor,
        textColor,
        secondaryTextColor,
        accentColor,
        cardBgColor
    } = attributes;

    const [currentTab, setCurrentTab] = useState('publications');
    const [currentPublicationIndex, setCurrentPublicationIndex] = useState(0);
    const [newPublication, setNewPublication] = useState({
        id: Date.now(),
        title: '',
        type: 'Guide',
        author: '',
        date: new Date().toISOString().split('T')[0],
        language: 'Français',
        level: 'Intermédiaire',
        theme: 'Production cotonnière',
        description: '',
        thumbnail: '',
        fileSize: '',
        pages: '',
        downloads: '0',
        rating: '0',
        tags: [],
        isNew: false
    });
    const [newTag, setNewTag] = useState('');
    const [newDocumentType, setNewDocumentType] = useState('');
    const [newTheme, setNewTheme] = useState('');
    const [newLanguage, setNewLanguage] = useState('');
    const [newLevel, setNewLevel] = useState('');

    // Generate a unique ID for the block if not already set
    useEffect(() => {
        if (!blockId) {
            setAttributes({ blockId: `publications-grid-${Date.now()}` });
        }
    }, [blockId, setAttributes]);

    const blockProps = useBlockProps({
        className: 'publications-grid-block',
        style: {
            backgroundColor: backgroundColor
        }
    });

    const updatePublication = (index, field, value) => {
        const newPublications = [...publications];
        newPublications[index] = {
            ...newPublications[index],
            [field]: value
        };
        setAttributes({ publications: newPublications });
    };

    const addPublication = () => {
        if (newPublication.title.trim() !== '') {
            setAttributes({
                publications: [...publications, { 
                    ...newPublication,
                    id: Date.now()
                }]
            });
            setNewPublication({
                id: Date.now() + 1,
                title: '',
                type: 'Guide',
                author: '',
                date: new Date().toISOString().split('T')[0],
                language: 'Français',
                level: 'Intermédiaire',
                theme: 'Production cotonnière',
                description: '',
                thumbnail: '',
                fileSize: '',
                pages: '',
                downloads: '0',
                rating: '0',
                tags: [],
                isNew: false
            });
        }
    };

    const removePublication = (index) => {
        const newPublications = [...publications];
        newPublications.splice(index, 1);
        setAttributes({ publications: newPublications });
        if (currentPublicationIndex >= newPublications.length) {
            setCurrentPublicationIndex(Math.max(0, newPublications.length - 1));
        }
    };

    const addTag = () => {
        if (newTag.trim() !== '') {
            const currentPub = publications[currentPublicationIndex];
            const updatedTags = [...currentPub.tags, newTag.trim()];
            updatePublication(currentPublicationIndex, 'tags', updatedTags);
            setNewTag('');
        }
    };

    const removeTag = (tagIndex) => {
        const currentPub = publications[currentPublicationIndex];
        const updatedTags = currentPub.tags.filter((_, i) => i !== tagIndex);
        updatePublication(currentPublicationIndex, 'tags', updatedTags);
    };

    const addDocumentType = () => {
        if (newDocumentType.trim() !== '' && !documentTypes.includes(newDocumentType.trim())) {
            setAttributes({ documentTypes: [...documentTypes, newDocumentType.trim()] });
            setNewDocumentType('');
        }
    };

    const removeDocumentType = (type) => {
        setAttributes({ documentTypes: documentTypes.filter(t => t !== type) });
    };

    const addTheme = () => {
        if (newTheme.trim() !== '' && !themes.includes(newTheme.trim())) {
            setAttributes({ themes: [...themes, newTheme.trim()] });
            setNewTheme('');
        }
    };

    const removeTheme = (theme) => {
        setAttributes({ themes: themes.filter(t => t !== theme) });
    };

    const addLanguage = () => {
        if (newLanguage.trim() !== '' && !languages.includes(newLanguage.trim())) {
            setAttributes({ languages: [...languages, newLanguage.trim()] });
            setNewLanguage('');
        }
    };

    const removeLanguage = (language) => {
        setAttributes({ languages: languages.filter(l => l !== language) });
    };

    const addLevel = () => {
        if (newLevel.trim() !== '' && !levels.includes(newLevel.trim())) {
            setAttributes({ levels: [...levels, newLevel.trim()] });
            setNewLevel('');
        }
    };

    const removeLevel = (level) => {
        setAttributes({ levels: levels.filter(l => l !== level) });
    };

    const getTypeColor = (type) => {
        switch (type) {
            case 'Guide': return '#28A745';
            case 'Rapport': return '#2D9B8A';
            case 'Étude': return '#FD7E14';
            case 'Vidéo': return '#17A2B8';
            case 'Audio': return '#6C757D';
            case 'Infographie': return '#A8E6CF';
            default: return '#6C757D';
        }
    };

    return (
        <Fragment>
            <InspectorControls>
                <TabPanel
                    className="tabs-navigation"
                    activeClass="active"
                    tabs={[
                        { name: 'publications', title: __('Publications', 'mon-theme-aca') },
                        { name: 'filters', title: __('Filtres', 'mon-theme-aca') },
                        { name: 'appearance', title: __('Apparence', 'mon-theme-aca') }
                    ]}
                    onSelect={(tabName) => setCurrentTab(tabName)}
                >
                    {(tab) => {
                        if (tab.name === 'publications') {
                            return (
                                <div className="publications-manager">
                                    <PanelBody title={__('Paramètres généraux', 'mon-theme-aca')}>
                                        <SelectControl
                                            label={__('Mode d\'affichage par défaut', 'mon-theme-aca')}
                                            value={defaultViewMode}
                                            options={[
                                                { label: __('Grille', 'mon-theme-aca'), value: 'grid' },
                                                { label: __('Liste', 'mon-theme-aca'), value: 'list' }
                                            ]}
                                            onChange={(value) => setAttributes({ defaultViewMode: value })}
                                        />
                                        <SelectControl
                                            label={__('Tri par défaut', 'mon-theme-aca')}
                                            value={defaultSortBy}
                                            options={[
                                                { label: __('Date', 'mon-theme-aca'), value: 'date' },
                                                { label: __('Titre', 'mon-theme-aca'), value: 'title' },
                                                { label: __('Téléchargements', 'mon-theme-aca'), value: 'downloads' },
                                                { label: __('Note', 'mon-theme-aca'), value: 'rating' }
                                            ]}
                                            onChange={(value) => setAttributes({ defaultSortBy: value })}
                                        />
                                        <SelectControl
                                            label={__('Ordre par défaut', 'mon-theme-aca')}
                                            value={defaultSortOrder}
                                            options={[
                                                { label: __('Décroissant', 'mon-theme-aca'), value: 'desc' },
                                                { label: __('Croissant', 'mon-theme-aca'), value: 'asc' }
                                            ]}
                                            onChange={(value) => setAttributes({ defaultSortOrder: value })}
                                        />
                                        <RangeControl
                                            label={__('Publications par page', 'mon-theme-aca')}
                                            value={itemsPerPage}
                                            onChange={(value) => setAttributes({ itemsPerPage: value })}
                                            min={3}
                                            max={24}
                                            step={3}
                                        />
                                    </PanelBody>
                                    
                                    <PanelBody title={__('Gestion des publications', 'mon-theme-aca')}>
                                        <p className="publications-title">{__('Publications existantes', 'mon-theme-aca')}</p>
                                        
                                        {publications.length > 0 ? (
                                            <div className="publications-tabs">
                                                {publications.map((pub, index) => (
                                                    <button
                                                        key={pub.id}
                                                        className={`publication-tab ${index === currentPublicationIndex ? 'active' : ''}`}
                                                        onClick={() => setCurrentPublicationIndex(index)}
                                                    >
                                                        {pub.title || __('Sans titre', 'mon-theme-aca')}
                                                    </button>
                                                ))}
                                            </div>
                                        ) : (
                                            <p className="no-publications">{__('Aucune publication ajoutée', 'mon-theme-aca')}</p>
                                        )}
                                        
                                        {publications.length > 0 && (
                                            <div className="publication-editor">
                                                <TextControl
                                                    label={__('Titre', 'mon-theme-aca')}
                                                    value={publications[currentPublicationIndex].title}
                                                    onChange={(value) => updatePublication(currentPublicationIndex, 'title', value)}
                                                />
                                                <div className="publication-details">
                                                    <SelectControl
                                                        label={__('Type', 'mon-theme-aca')}
                                                        value={publications[currentPublicationIndex].type}
                                                        options={documentTypes.map(type => ({ label: type, value: type }))}
                                                        onChange={(value) => updatePublication(currentPublicationIndex, 'type', value)}
                                                    />
                                                    <TextControl
                                                        label={__('Auteur', 'mon-theme-aca')}
                                                        value={publications[currentPublicationIndex].author}
                                                        onChange={(value) => updatePublication(currentPublicationIndex, 'author', value)}
                                                    />
                                                </div>
                                                <div className="publication-details">
                                                    <TextControl
                                                        label={__('Date', 'mon-theme-aca')}
                                                        type="date"
                                                        value={publications[currentPublicationIndex].date}
                                                        onChange={(value) => updatePublication(currentPublicationIndex, 'date', value)}
                                                    />
                                                    <SelectControl
                                                        label={__('Langue', 'mon-theme-aca')}
                                                        value={publications[currentPublicationIndex].language}
                                                        options={languages.map(lang => ({ label: lang, value: lang }))}
                                                        onChange={(value) => updatePublication(currentPublicationIndex, 'language', value)}
                                                    />
                                                </div>
                                                <div className="publication-details">
                                                    <SelectControl
                                                        label={__('Niveau', 'mon-theme-aca')}
                                                        value={publications[currentPublicationIndex].level}
                                                        options={levels.map(level => ({ label: level, value: level }))}
                                                        onChange={(value) => updatePublication(currentPublicationIndex, 'level', value)}
                                                    />
                                                    <SelectControl
                                                        label={__('Thème', 'mon-theme-aca')}
                                                        value={publications[currentPublicationIndex].theme}
                                                        options={themes.map(theme => ({ label: theme, value: theme }))}
                                                        onChange={(value) => updatePublication(currentPublicationIndex, 'theme', value)}
                                                    />
                                                </div>
                                                <TextControl
                                                    label={__('Description', 'mon-theme-aca')}
                                                    value={publications[currentPublicationIndex].description}
                                                    onChange={(value) => updatePublication(currentPublicationIndex, 'description', value)}
                                                    multiline={true}
                                                />
                                                <TextControl
                                                    label={__('URL de la vignette', 'mon-theme-aca')}
                                                    value={publications[currentPublicationIndex].thumbnail}
                                                    onChange={(value) => updatePublication(currentPublicationIndex, 'thumbnail', value)}
                                                />
                                                <div className="publication-stats">
                                                    <TextControl
                                                        label={__('Taille du fichier', 'mon-theme-aca')}
                                                        value={publications[currentPublicationIndex].fileSize}
                                                        onChange={(value) => updatePublication(currentPublicationIndex, 'fileSize', value)}
                                                        placeholder="Ex: 2.5 MB"
                                                    />
                                                    <TextControl
                                                        label={__('Pages', 'mon-theme-aca')}
                                                        value={publications[currentPublicationIndex].pages}
                                                        onChange={(value) => updatePublication(currentPublicationIndex, 'pages', value)}
                                                    />
                                                </div>
                                                <div className="publication-stats">
                                                    <TextControl
                                                        label={__('Téléchargements', 'mon-theme-aca')}
                                                        value={publications[currentPublicationIndex].downloads}
                                                        onChange={(value) => updatePublication(currentPublicationIndex, 'downloads', value)}
                                                    />
                                                    <TextControl
                                                        label={__('Note', 'mon-theme-aca')}
                                                        value={publications[currentPublicationIndex].rating}
                                                        onChange={(value) => updatePublication(currentPublicationIndex, 'rating', value)}
                                                        placeholder="Ex: 4.8"
                                                    />
                                                </div>
                                                
                                                <div className="tags-editor">
                                                    <p className="tags-title">{__('Tags', 'mon-theme-aca')}</p>
                                                    <div className="tags-list">
                                                        {publications[currentPublicationIndex].tags.map((tag, tagIndex) => (
                                                            <div key={tagIndex} className="tag-item">
                                                                <span>{tag}</span>
                                                                <Button
                                                                    isSmall
                                                                    isDestructive
                                                                    icon="no-alt"
                                                                    onClick={() => removeTag(tagIndex)}
                                                                />
                                                            </div>
                                                        ))}
                                                    </div>
                                                    <div className="add-tag">
                                                        <TextControl
                                                            value={newTag}
                                                            onChange={(value) => setNewTag(value)}
                                                            placeholder={__('Nouveau tag...', 'mon-theme-aca')}
                                                        />
                                                        <Button
                                                            isPrimary
                                                            onClick={addTag}
                                                            disabled={!newTag.trim()}
                                                        >
                                                            {__('Ajouter', 'mon-theme-aca')}
                                                        </Button>
                                                    </div>
                                                </div>
                                                
                                                <ToggleControl
                                                    label={__('Marquer comme nouveau', 'mon-theme-aca')}
                                                    checked={publications[currentPublicationIndex].isNew}
                                                    onChange={(value) => updatePublication(currentPublicationIndex, 'isNew', value)}
                                                />
                                                
                                                <Button
                                                    isDestructive
                                                    onClick={() => removePublication(currentPublicationIndex)}
                                                >
                                                    {__('Supprimer cette publication', 'mon-theme-aca')}
                                                </Button>
                                            </div>
                                        )}
                                        
                                        <div className="add-publication">
                                            <p className="add-publication-title">{__('Ajouter une publication', 'mon-theme-aca')}</p>
                                            <TextControl
                                                placeholder={__('Titre de la publication', 'mon-theme-aca')}
                                                value={newPublication.title}
                                                onChange={(value) => setNewPublication({...newPublication, title: value})}
                                            />
                                            <div className="publication-details">
                                                <SelectControl
                                                    placeholder={__('Type', 'mon-theme-aca')}
                                                    value={newPublication.type}
                                                    options={documentTypes.map(type => ({ label: type, value: type }))}
                                                    onChange={(value) => setNewPublication({...newPublication, type: value})}
                                                />
                                                <TextControl
                                                    placeholder={__('Auteur', 'mon-theme-aca')}
                                                    value={newPublication.author}
                                                    onChange={(value) => setNewPublication({...newPublication, author: value})}
                                                />
                                            </div>
                                            <Button
                                                isPrimary
                                                onClick={addPublication}
                                                disabled={!newPublication.title.trim()}
                                            >
                                                {__('Ajouter', 'mon-theme-aca')}
                                            </Button>
                                        </div>
                                    </PanelBody>
                                </div>
                            );
                        } else if (tab.name === 'filters') {
                            return (
                                <div className="filters-manager">
                                    <PanelBody title={__('Types de documents', 'mon-theme-aca')}>
                                        <div className="filter-section">
                                            <p className="filter-title">{__('Types existants', 'mon-theme-aca')}</p>
                                            <div className="filter-items">
                                                {documentTypes.map((type, index) => (
                                                    <div key={index} className="filter-item">
                                                        <span>{type}</span>
                                                        <Button
                                                            isSmall
                                                            isDestructive
                                                            icon="no-alt"
                                                            onClick={() => removeDocumentType(type)}
                                                        />
                                                    </div>
                                                ))}
                                            </div>
                                            <div className="add-filter">
                                                <TextControl
                                                    value={newDocumentType}
                                                    onChange={(value) => setNewDocumentType(value)}
                                                    placeholder={__('Nouveau type...', 'mon-theme-aca')}
                                                />
                                                <Button
                                                    isPrimary
                                                    onClick={addDocumentType}
                                                    disabled={!newDocumentType.trim()}
                                                >
                                                    {__('Ajouter', 'mon-theme-aca')}
                                                </Button>
                                            </div>
                                        </div>
                                    </PanelBody>
                                    
                                    <PanelBody title={__('Thématiques', 'mon-theme-aca')}>
                                        <div className="filter-section">
                                            <p className="filter-title">{__('Thèmes existants', 'mon-theme-aca')}</p>
                                            <div className="filter-items">
                                                {themes.map((theme, index) => (
                                                    <div key={index} className="filter-item">
                                                        <span>{theme}</span>
                                                        <Button
                                                            isSmall
                                                            isDestructive
                                                            icon="no-alt"
                                                            onClick={() => removeTheme(theme)}
                                                        />
                                                    </div>
                                                ))}
                                            </div>
                                            <div className="add-filter">
                                                <TextControl
                                                    value={newTheme}
                                                    onChange={(value) => setNewTheme(value)}
                                                    placeholder={__('Nouveau thème...', 'mon-theme-aca')}
                                                />
                                                <Button
                                                    isPrimary
                                                    onClick={addTheme}
                                                    disabled={!newTheme.trim()}
                                                >
                                                    {__('Ajouter', 'mon-theme-aca')}
                                                </Button>
                                            </div>
                                        </div>
                                    </PanelBody>
                                    
                                    <PanelBody title={__('Langues', 'mon-theme-aca')}>
                                        <div className="filter-section">
                                            <p className="filter-title">{__('Langues existantes', 'mon-theme-aca')}</p>
                                            <div className="filter-items">
                                                {languages.map((language, index) => (
                                                    <div key={index} className="filter-item">
                                                        <span>{language}</span>
                                                        <Button
                                                            isSmall
                                                            isDestructive
                                                            icon="no-alt"
                                                            onClick={() => removeLanguage(language)}
                                                        />
                                                    </div>
                                                ))}
                                            </div>
                                            <div className="add-filter">
                                                <TextControl
                                                    value={newLanguage}
                                                    onChange={(value) => setNewLanguage(value)}
                                                    placeholder={__('Nouvelle langue...', 'mon-theme-aca')}
                                                />
                                                <Button
                                                    isPrimary
                                                    onClick={addLanguage}
                                                    disabled={!newLanguage.trim()}
                                                >
                                                    {__('Ajouter', 'mon-theme-aca')}
                                                </Button>
                                            </div>
                                        </div>
                                    </PanelBody>
                                    
                                    <PanelBody title={__('Niveaux', 'mon-theme-aca')}>
                                        <div className="filter-section">
                                            <p className="filter-title">{__('Niveaux existants', 'mon-theme-aca')}</p>
                                            <div className="filter-items">
                                                {levels.map((level, index) => (
                                                    <div key={index} className="filter-item">
                                                        <span>{level}</span>
                                                        <Button
                                                            isSmall
                                                            isDestructive
                                                            icon="no-alt"
                                                            onClick={() => removeLevel(level)}
                                                        />
                                                    </div>
                                                ))}
                                            </div>
                                            <div className="add-filter">
                                                <TextControl
                                                    value={newLevel}
                                                    onChange={(value) => setNewLevel(value)}
                                                    placeholder={__('Nouveau niveau...', 'mon-theme-aca')}
                                                />
                                                <Button
                                                    isPrimary
                                                    onClick={addLevel}
                                                    disabled={!newLevel.trim()}
                                                >
                                                    {__('Ajouter', 'mon-theme-aca')}
                                                </Button>
                                            </div>
                                        </div>
                                    </PanelBody>
                                </div>
                            );
                        } else if (tab.name === 'appearance') {
                            return (
                                <div>
                                    <PanelBody title={__('Couleurs', 'mon-theme-aca')}>
                                        <div className="color-option">
                                            <label>{__('Couleur de fond générale', 'mon-theme-aca')}</label>
                                            <ColorPicker
                                                color={backgroundColor}
                                                onChange={(value) => setAttributes({ backgroundColor: value })}
                                                enableAlpha
                                            />
                                        </div>
                                        <div className="color-option">
                                            <label>{__('Couleur de fond de la barre latérale', 'mon-theme-aca')}</label>
                                            <ColorPicker
                                                color={sidebarBgColor}
                                                onChange={(value) => setAttributes({ sidebarBgColor: value })}
                                                enableAlpha
                                            />
                                        </div>
                                        <div className="color-option">
                                            <label>{__('Couleur de fond de la zone principale', 'mon-theme-aca')}</label>
                                            <ColorPicker
                                                color={mainBgColor}
                                                onChange={(value) => setAttributes({ mainBgColor: value })}
                                                enableAlpha
                                            />
                                        </div>
                                        <div className="color-option">
                                            <label>{__('Couleur du texte principal', 'mon-theme-aca')}</label>
                                            <ColorPicker
                                                color={textColor}
                                                onChange={(value) => setAttributes({ textColor: value })}
                                                enableAlpha
                                            />
                                        </div>
                                        <div className="color-option">
                                            <label>{__('Couleur du texte secondaire', 'mon-theme-aca')}</label>
                                            <ColorPicker
                                                color={secondaryTextColor}
                                                onChange={(value) => setAttributes({ secondaryTextColor: value })}
                                                enableAlpha
                                            />
                                        </div>
                                        <div className="color-option">
                                            <label>{__('Couleur d\'accent', 'mon-theme-aca')}</label>
                                            <ColorPicker
                                                color={accentColor}
                                                onChange={(value) => setAttributes({ accentColor: value })}
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
                                    </PanelBody>
                                </div>
                            );
                        }
                    }}
                </TabPanel>
            </InspectorControls>

            <div {...blockProps}>
                <div className="publications-grid-container">
                    <div className="publications-layout">
                        {/* Sidebar */}
                        <div 
                            className="publications-sidebar"
                            style={{ backgroundColor: sidebarBgColor }}
                        >
                            <div className="sidebar-content">
                                <h3 className="sidebar-title" style={{ color: textColor }}>{__('Filtres', 'mon-theme-aca')}</h3>
                                
                                {/* Recherche avancée */}
                                <div className="filter-group">
                                    <h4 className="filter-title" style={{ color: textColor }}>{__('Recherche Avancée', 'mon-theme-aca')}</h4>
                                    <div className="radio-options">
                                        <label className="radio-label">
                                            <input type="radio" name="searchType" defaultChecked />
                                            <span style={{ color: secondaryTextColor }}>{__('Recherche globale', 'mon-theme-aca')}</span>
                                        </label>
                                        <label className="radio-label">
                                            <input type="radio" name="searchType" />
                                            <span style={{ color: secondaryTextColor }}>{__('Titre uniquement', 'mon-theme-aca')}</span>
                                        </label>
                                        <label className="radio-label">
                                            <input type="radio" name="searchType" />
                                            <span style={{ color: secondaryTextColor }}>{__('Correspondance exacte', 'mon-theme-aca')}</span>
                                        </label>
                                    </div>
                                </div>
                                
                                {/* Types de documents */}
                                <div className="filter-group">
                                    <h4 className="filter-title" style={{ color: textColor }}>{__('Types de documents', 'mon-theme-aca')}</h4>
                                    <div className="checkbox-options">
                                        {documentTypes.map((type, index) => (
                                            <label key={index} className="checkbox-label">
                                                <input type="checkbox" className="filter-checkbox" />
                                                <span 
                                                    className="checkbox-icon" 
                                                    style={{ 
                                                        backgroundColor: getTypeColor(type),
                                                        width: '1rem',
                                                        height: '1rem',
                                                        borderRadius: '50%',
                                                        display: 'inline-block',
                                                        marginRight: '0.5rem'
                                                    }}
                                                ></span>
                                                <span style={{ color: secondaryTextColor }}>{type}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>
                                
                                {/* Thématiques */}
                                <div className="filter-group">
                                    <h4 className="filter-title" style={{ color: textColor }}>{__('Thématiques', 'mon-theme-aca')}</h4>
                                    <div className="checkbox-options scrollable">
                                        {themes.map((theme, index) => (
                                            <label key={index} className="checkbox-label">
                                                <input type="checkbox" className="filter-checkbox" />
                                                <span style={{ color: secondaryTextColor }}>{theme}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>
                                
                                {/* Niveau */}
                                <div className="filter-group">
                                    <h4 className="filter-title" style={{ color: textColor }}>{__('Niveau', 'mon-theme-aca')}</h4>
                                    <div className="checkbox-options">
                                        {levels.map((level, index) => (
                                            <label key={index} className="checkbox-label">
                                                <input type="checkbox" className="filter-checkbox" />
                                                <span 
                                                    style={{ 
                                                        color: level === 'Débutant' ? '#28A745' : 
                                                               level === 'Intermédiaire' ? '#FD7E14' : 
                                                               level === 'Expert' ? '#DC3545' : 
                                                               secondaryTextColor,
                                                        fontWeight: '500'
                                                    }}
                                                >
                                                    {level}
                                                </span>
                                            </label>
                                        ))}
                                    </div>
                                </div>
                                
                                {/* Ma Bibliothèque */}
                                <div className="library-section" style={{ backgroundColor: 'rgba(248, 249, 250, 0.5)' }}>
                                    <h4 className="filter-title" style={{ color: textColor }}>{__('Ma Bibliothèque', 'mon-theme-aca')}</h4>
                                    <div className="library-links">
                                        <a href="#" style={{ color: accentColor }}>{__('Mes favoris (12)', 'mon-theme-aca')}</a>
                                        <a href="#" style={{ color: accentColor }}>{__('Téléchargements (8)', 'mon-theme-aca')}</a>
                                        <a href="#" style={{ color: accentColor }}>{__('Recommandations (5)', 'mon-theme-aca')}</a>
                                    </div>
                                </div>
                                
                                {/* Reset button */}
                                <button 
                                    className="reset-filters-button" 
                                    style={{ 
                                        borderColor: accentColor, 
                                        color: accentColor 
                                    }}
                                >
                                    {__('Réinitialiser les filtres', 'mon-theme-aca')}
                                </button>
                            </div>
                        </div>
                        
                        {/* Main Content */}
                        <div 
                            className="publications-main"
                            style={{ backgroundColor: mainBgColor }}
                        >
                            {/* Controls */}
                            <div className="publications-controls">
                                <div className="controls-left">
                                    <button 
                                        className="filter-button" 
                                        style={{ 
                                            borderColor: accentColor, 
                                            color: accentColor 
                                        }}
                                    >
                                        <span className="filter-icon"></span>
                                        <span>{__('Filtres', 'mon-theme-aca')}</span>
                                    </button>
                                    <span className="results-count" style={{ color: secondaryTextColor }}>
                                        {publications.length} {__('ressources trouvées', 'mon-theme-aca')}
                                    </span>
                                </div>
                                
                                <div className="controls-right">
                                    <select className="sort-select">
                                        <option value="date-desc">{__('Plus récent', 'mon-theme-aca')}</option>
                                        <option value="date-asc">{__('Plus ancien', 'mon-theme-aca')}</option>
                                        <option value="downloads-desc">{__('Plus téléchargé', 'mon-theme-aca')}</option>
                                        <option value="rating-desc">{__('Mieux noté', 'mon-theme-aca')}</option>
                                        <option value="title-asc">{__('Alphabétique (A-Z)', 'mon-theme-aca')}</option>
                                        <option value="title-desc">{__('Alphabétique (Z-A)', 'mon-theme-aca')}</option>
                                    </select>
                                    
                                    <div className="view-controls">
                                        <button 
                                            className={`view-button ${defaultViewMode === 'grid' ? 'active' : ''}`}
                                            style={{ 
                                                backgroundColor: defaultViewMode === 'grid' ? accentColor : 'transparent',
                                                color: defaultViewMode === 'grid' ? '#FFFFFF' : secondaryTextColor
                                            }}
                                        >
                                            <span className="grid-icon"></span>
                                        </button>
                                        <button 
                                            className={`view-button ${defaultViewMode === 'list' ? 'active' : ''}`}
                                            style={{ 
                                                backgroundColor: defaultViewMode === 'list' ? accentColor : 'transparent',
                                                color: defaultViewMode === 'list' ? '#FFFFFF' : secondaryTextColor
                                            }}
                                        >
                                            <span className="list-icon"></span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            
                            {/* Publications Preview */}
                            <div className={`publications-view ${defaultViewMode}-view`}>
                                {publications.length === 0 ? (
                                    <div className="no-publications">
                                        <p>{__('Aucune publication ajoutée. Utilisez le panneau de droite pour ajouter des publications.', 'mon-theme-aca')}</p>
                                    </div>
                                ) : defaultViewMode === 'grid' ? (
                                    // Grid View
                                    publications.slice(0, 6).map(pub => (
                                        <div key={pub.id} className="publication-card" style={{ backgroundColor: cardBgColor }}>
                                            <div className="publication-thumbnail">
                                                {pub.thumbnail ? (
                                                    <img src={pub.thumbnail} alt={pub.title} className="thumbnail-image" />
                                                ) : (
                                                    <div 
                                                        className="thumbnail-placeholder" 
                                                        style={{ backgroundColor: getTypeColor(pub.type) }}
                                                    >
                                                        <span className="placeholder-icon file-text-icon"></span>
                                                    </div>
                                                )}
                                                <div className="publication-badges">
                                                    <span 
                                                        className="type-badge" 
                                                        style={{ backgroundColor: getTypeColor(pub.type) }}
                                                    >
                                                        {pub.type}
                                                    </span>
                                                    {pub.isNew && (
                                                        <span className="new-badge">
                                                            {__('Nouveau', 'mon-theme-aca')}
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="publication-content">
                                                <div className="publication-meta" style={{ color: secondaryTextColor }}>
                                                    <span className="publication-author">{pub.author}</span>
                                                    <span className="meta-separator">•</span>
                                                    <span className="publication-date">
                                                        {new Date(pub.date).toLocaleDateString('fr-FR')}
                                                    </span>
                                                </div>
                                                <h3 className="publication-title" style={{ color: textColor }}>
                                                    {pub.title}
                                                </h3>
                                                <p className="publication-excerpt" style={{ color: secondaryTextColor }}>
                                                    {pub.description}
                                                </p>
                                                <div className="publication-footer">
                                                    <div className="publication-stats">
                                                        <span className="stat-item downloads" style={{ color: secondaryTextColor }}>
                                                            <span className="stat-icon download-icon"></span>
                                                            <span className="stat-value">{pub.downloads}</span>
                                                        </span>
                                                        <span className="stat-item rating" style={{ color: secondaryTextColor }}>
                                                            <span className="stat-icon star-icon"></span>
                                                            <span className="stat-value">{pub.rating}</span>
                                                        </span>
                                                    </div>
                                                    <div className="publication-actions">
                                                        <button className="action-button view-button">
                                                            <span className="action-icon eye-icon"></span>
                                                        </button>
                                                        <button className="action-button download-button">
                                                            <span className="action-icon download-icon"></span>
                                                        </button>
                                                        <button className="action-button bookmark-button">
                                                            <span className="action-icon bookmark-icon"></span>
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    // List View
                                    publications.slice(0, 6).map(pub => (
                                        <div key={pub.id} className="publication-list-item">
                                            <div 
                                                className="list-item-type" 
                                                style={{ backgroundColor: getTypeColor(pub.type) }}
                                            >
                                                <span className="type-icon file-text-icon"></span>
                                            </div>
                                            <div className="list-item-content">
                                                <div className="list-item-header">
                                                    <h3 className="list-item-title" style={{ color: textColor }}>
                                                        {pub.title}
                                                    </h3>
                                                    <div className="list-item-badges">
                                                        {pub.isNew && (
                                                            <span className="new-badge">
                                                                {__('Nouveau', 'mon-theme-aca')}
                                                            </span>
                                                        )}
                                                        <span 
                                                            className="type-badge" 
                                                            style={{ backgroundColor: getTypeColor(pub.type) }}
                                                        >
                                                            {pub.type}
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="list-item-meta" style={{ color: secondaryTextColor }}>
                                                    <span>{pub.author}</span>
                                                    <span className="meta-separator">•</span>
                                                    <span>{new Date(pub.date).toLocaleDateString('fr-FR')}</span>
                                                    <span className="meta-separator">•</span>
                                                    <span 
                                                        style={{ 
                                                            color: pub.level === 'Débutant' ? '#28A745' : 
                                                                   pub.level === 'Intermédiaire' ? '#FD7E14' : 
                                                                   pub.level === 'Expert' ? '#DC3545' : 
                                                                   secondaryTextColor
                                                        }}
                                                    >
                                                        {pub.level}
                                                    </span>
                                                    <span className="meta-separator">•</span>
                                                    <span>{pub.fileSize}</span>
                                                </div>
                                                <p className="list-item-description" style={{ color: secondaryTextColor }}>
                                                    {pub.description}
                                                </p>
                                                <div className="list-item-footer">
                                                    <div className="list-item-stats">
                                                        <span className="stat-item downloads" style={{ color: secondaryTextColor }}>
                                                            <span className="stat-icon download-icon"></span>
                                                            <span className="stat-value">{pub.downloads} téléchargements</span>
                                                        </span>
                                                        <span className="stat-item rating" style={{ color: secondaryTextColor }}>
                                                            <span className="stat-icon star-icon"></span>
                                                            <span className="stat-value">{pub.rating}</span>
                                                        </span>
                                                    </div>
                                                    <div className="list-item-actions">
                                                        <button 
                                                            className="action-button download-button" 
                                                            style={{ 
                                                                backgroundColor: accentColor, 
                                                                color: '#FFFFFF' 
                                                            }}
                                                        >
                                                            {__('Télécharger', 'mon-theme-aca')}
                                                        </button>
                                                        <button 
                                                            className="action-button view-button" 
                                                            style={{ 
                                                                borderColor: accentColor, 
                                                                color: accentColor 
                                                            }}
                                                        >
                                                            {__('Aperçu', 'mon-theme-aca')}
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                            
                            {/* Pagination Preview */}
                            <div className="publications-pagination">
                                <div className="pagination-controls">
                                    <button className="pagination-button prev-button">
                                        {__('Précédent', 'mon-theme-aca')}
                                    </button>
                                    <div className="pagination-numbers">
                                        <button 
                                            className="pagination-number active" 
                                            style={{ 
                                                backgroundColor: accentColor, 
                                                color: '#FFFFFF' 
                                            }}
                                        >
                                            1
                                        </button>
                                        <button className="pagination-number">2</button>
                                        <button className="pagination-number">3</button>
                                        <span className="pagination-ellipsis">...</span>
                                        <button className="pagination-number">{Math.ceil(publications.length / itemsPerPage)}</button>
                                    </div>
                                    <button className="pagination-button next-button">
                                        {__('Suivant', 'mon-theme-aca')}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}