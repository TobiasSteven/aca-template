import { __ } from '@wordpress/i18n';
import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import { 
    PanelBody, 
    TextControl, 
    ColorPicker,
    Button,
    SelectControl,
    RangeControl,
    ToggleControl,
    TextareaControl
} from '@wordpress/components';
import { Fragment, useState, useEffect } from '@wordpress/element';

import './editor.scss';

export default function Edit({ attributes, setAttributes, clientId }) {
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

    const [currentPublication, setCurrentPublication] = useState(0);
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
        duration: '',
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
    const [activeTab, setActiveTab] = useState('publications');

    const blockProps = useBlockProps({
        className: 'publications-grid-block',
        style: {
            backgroundColor: backgroundColor
        }
    });

    // Set unique block ID on mount
    useEffect(() => {
        if (!blockId) {
            setAttributes({ blockId: `publications-grid-${clientId.slice(0, 8)}` });
        }
    }, [blockId, clientId, setAttributes]);

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
                duration: '',
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
        if (currentPublication >= newPublications.length) {
            setCurrentPublication(Math.max(0, newPublications.length - 1));
        }
    };

    const addTag = () => {
        if (newTag.trim() !== '') {
            const currentTags = publications[currentPublication].tags || [];
            updatePublication(currentPublication, 'tags', [...currentTags, newTag.trim()]);
            setNewTag('');
        }
    };

    const removeTag = (tagIndex) => {
        const currentTags = publications[currentPublication].tags || [];
        const newTags = currentTags.filter((_, i) => i !== tagIndex);
        updatePublication(currentPublication, 'tags', newTags);
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

    const getTypeIcon = (type) => {
        switch (type) {
            case 'Guide': return 'file-text';
            case 'Rapport': return 'file-text';
            case 'Étude': return 'file-text';
            case 'Vidéo': return 'video';
            case 'Audio': return 'headphones';
            case 'Infographie': return 'image';
            default: return 'file-text';
        }
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

    const getLevelColor = (level) => {
        switch (level) {
            case 'Débutant': return '#28A745';
            case 'Intermédiaire': return '#FD7E14';
            case 'Expert': return '#DC3545';
            default: return '#6C757D';
        }
    };

    return (
        <Fragment>
            <InspectorControls>
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
                        label={__('Ordre de tri par défaut', 'mon-theme-aca')}
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

                <PanelBody title={__('Gestion des publications', 'mon-theme-aca')} initialOpen={false}>
                    <div className="tabs-navigation">
                        <button 
                            className={`tab-nav-button ${activeTab === 'publications' ? 'active' : ''}`}
                            onClick={() => setActiveTab('publications')}
                        >
                            {__('Publications', 'mon-theme-aca')}
                        </button>
                        <button 
                            className={`tab-nav-button ${activeTab === 'filters' ? 'active' : ''}`}
                            onClick={() => setActiveTab('filters')}
                        >
                            {__('Filtres', 'mon-theme-aca')}
                        </button>
                    </div>

                    {activeTab === 'publications' && (
                        <div className="publications-manager">
                            <div className="publications-list">
                                <p className="publications-title">{__('Publications existantes', 'mon-theme-aca')}</p>
                                
                                {publications.length > 0 ? (
                                    <div className="publications-tabs">
                                        {publications.map((pub, index) => (
                                            <button
                                                key={index}
                                                className={`publication-tab ${index === currentPublication ? 'active' : ''}`}
                                                onClick={() => setCurrentPublication(index)}
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
                                            value={publications[currentPublication].title}
                                            onChange={(value) => updatePublication(currentPublication, 'title', value)}
                                        />
                                        <SelectControl
                                            label={__('Type', 'mon-theme-aca')}
                                            value={publications[currentPublication].type}
                                            options={documentTypes.map(type => ({ label: type, value: type }))}
                                            onChange={(value) => updatePublication(currentPublication, 'type', value)}
                                        />
                                        <TextControl
                                            label={__('Auteur', 'mon-theme-aca')}
                                            value={publications[currentPublication].author}
                                            onChange={(value) => updatePublication(currentPublication, 'author', value)}
                                        />
                                        <TextControl
                                            label={__('Date', 'mon-theme-aca')}
                                            type="date"
                                            value={publications[currentPublication].date}
                                            onChange={(value) => updatePublication(currentPublication, 'date', value)}
                                        />
                                        <SelectControl
                                            label={__('Langue', 'mon-theme-aca')}
                                            value={publications[currentPublication].language}
                                            options={languages.map(lang => ({ label: lang, value: lang }))}
                                            onChange={(value) => updatePublication(currentPublication, 'language', value)}
                                        />
                                        <SelectControl
                                            label={__('Niveau', 'mon-theme-aca')}
                                            value={publications[currentPublication].level}
                                            options={levels.map(level => ({ label: level, value: level }))}
                                            onChange={(value) => updatePublication(currentPublication, 'level', value)}
                                        />
                                        <SelectControl
                                            label={__('Thème', 'mon-theme-aca')}
                                            value={publications[currentPublication].theme}
                                            options={themes.map(theme => ({ label: theme, value: theme }))}
                                            onChange={(value) => updatePublication(currentPublication, 'theme', value)}
                                        />
                                        <TextareaControl
                                            label={__('Description', 'mon-theme-aca')}
                                            value={publications[currentPublication].description}
                                            onChange={(value) => updatePublication(currentPublication, 'description', value)}
                                        />
                                        <TextControl
                                            label={__('URL de la vignette', 'mon-theme-aca')}
                                            value={publications[currentPublication].thumbnail}
                                            onChange={(value) => updatePublication(currentPublication, 'thumbnail', value)}
                                        />
                                        <div className="publication-details">
                                            <TextControl
                                                label={__('Taille du fichier', 'mon-theme-aca')}
                                                value={publications[currentPublication].fileSize}
                                                onChange={(value) => updatePublication(currentPublication, 'fileSize', value)}
                                                placeholder="Ex: 2.5 MB"
                                            />
                                            {publications[currentPublication].type === 'Vidéo' || publications[currentPublication].type === 'Audio' ? (
                                                <TextControl
                                                    label={__('Durée', 'mon-theme-aca')}
                                                    value={publications[currentPublication].duration}
                                                    onChange={(value) => updatePublication(currentPublication, 'duration', value)}
                                                    placeholder="Ex: 45min"
                                                />
                                            ) : (
                                                <TextControl
                                                    label={__('Pages', 'mon-theme-aca')}
                                                    value={publications[currentPublication].pages}
                                                    onChange={(value) => updatePublication(currentPublication, 'pages', value)}
                                                    placeholder="Ex: 45"
                                                />
                                            )}
                                        </div>
                                        <div className="publication-stats">
                                            <TextControl
                                                label={__('Téléchargements', 'mon-theme-aca')}
                                                value={publications[currentPublication].downloads}
                                                onChange={(value) => updatePublication(currentPublication, 'downloads', value)}
                                            />
                                            <TextControl
                                                label={__('Note', 'mon-theme-aca')}
                                                value={publications[currentPublication].rating}
                                                onChange={(value) => updatePublication(currentPublication, 'rating', value)}
                                                placeholder="Ex: 4.8"
                                            />
                                        </div>
                                        <ToggleControl
                                            label={__('Marquer comme nouveau', 'mon-theme-aca')}
                                            checked={publications[currentPublication].isNew}
                                            onChange={(value) => updatePublication(currentPublication, 'isNew', value)}
                                        />
                                        <div className="tags-editor">
                                            <p className="tags-title">{__('Tags', 'mon-theme-aca')}</p>
                                            <div className="tags-list">
                                                {publications[currentPublication].tags && publications[currentPublication].tags.map((tag, tagIndex) => (
                                                    <div key={tagIndex} className="tag-item">
                                                        <span>{tag}</span>
                                                        <Button
                                                            isSmall
                                                            isDestructive
                                                            onClick={() => removeTag(tagIndex)}
                                                            icon="no-alt"
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
                                        <Button
                                            isDestructive
                                            onClick={() => removePublication(currentPublication)}
                                        >
                                            {__('Supprimer cette publication', 'mon-theme-aca')}
                                        </Button>
                                    </div>
                                )}
                            </div>
                            
                            <div className="add-publication">
                                <p className="add-publication-title">{__('Ajouter une publication', 'mon-theme-aca')}</p>
                                <TextControl
                                    placeholder={__('Titre de la publication', 'mon-theme-aca')}
                                    value={newPublication.title}
                                    onChange={(value) => setNewPublication({...newPublication, title: value})}
                                />
                                <SelectControl
                                    placeholder={__('Type de document', 'mon-theme-aca')}
                                    value={newPublication.type}
                                    options={documentTypes.map(type => ({ label: type, value: type }))}
                                    onChange={(value) => setNewPublication({...newPublication, type: value})}
                                />
                                <TextControl
                                    placeholder={__('Auteur', 'mon-theme-aca')}
                                    value={newPublication.author}
                                    onChange={(value) => setNewPublication({...newPublication, author: value})}
                                />
                                <Button
                                    isPrimary
                                    onClick={addPublication}
                                    disabled={!newPublication.title.trim() || !newPublication.author.trim()}
                                >
                                    {__('Ajouter', 'mon-theme-aca')}
                                </Button>
                            </div>
                        </div>
                    )}

                    {activeTab === 'filters' && (
                        <div className="filters-manager">
                            <div className="filter-section">
                                <p className="filter-title">{__('Types de documents', 'mon-theme-aca')}</p>
                                <div className="filter-items">
                                    {documentTypes.map((type, index) => (
                                        <div key={index} className="filter-item">
                                            <span>{type}</span>
                                            <Button
                                                isSmall
                                                isDestructive
                                                onClick={() => removeDocumentType(type)}
                                                icon="no-alt"
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

                            <div className="filter-section">
                                <p className="filter-title">{__('Thèmes', 'mon-theme-aca')}</p>
                                <div className="filter-items">
                                    {themes.map((theme, index) => (
                                        <div key={index} className="filter-item">
                                            <span>{theme}</span>
                                            <Button
                                                isSmall
                                                isDestructive
                                                onClick={() => removeTheme(theme)}
                                                icon="no-alt"
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

                            <div className="filter-section">
                                <p className="filter-title">{__('Langues', 'mon-theme-aca')}</p>
                                <div className="filter-items">
                                    {languages.map((language, index) => (
                                        <div key={index} className="filter-item">
                                            <span>{language}</span>
                                            <Button
                                                isSmall
                                                isDestructive
                                                onClick={() => removeLanguage(language)}
                                                icon="no-alt"
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

                            <div className="filter-section">
                                <p className="filter-title">{__('Niveaux', 'mon-theme-aca')}</p>
                                <div className="filter-items">
                                    {levels.map((level, index) => (
                                        <div key={index} className="filter-item">
                                            <span>{level}</span>
                                            <Button
                                                isSmall
                                                isDestructive
                                                onClick={() => removeLevel(level)}
                                                icon="no-alt"
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
                        </div>
                    )}
                </PanelBody>

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
                                                <span className="checkbox-icon" style={{ color: getTypeColor(type) }}></span>
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
                                                <span style={{ color: getLevelColor(level) }}>{level}</span>
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
                                    <button className="filter-button">
                                        <span className="filter-icon"></span>
                                        <span>{__('Filtres', 'mon-theme-aca')}</span>
                                    </button>
                                    <span className="results-count" style={{ color: secondaryTextColor }}>
                                        {publications.length} {__('ressources trouvées', 'mon-theme-aca')}
                                    </span>
                                </div>
                                
                                <div className="controls-right">
                                    <select className="sort-select">
                                        <option>{__('Plus récent', 'mon-theme-aca')}</option>
                                        <option>{__('Plus téléchargé', 'mon-theme-aca')}</option>
                                        <option>{__('Mieux noté', 'mon-theme-aca')}</option>
                                        <option>{__('Alphabétique', 'mon-theme-aca')}</option>
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
                            
                            {/* Publications Grid */}
                            <div className={`publications-view ${defaultViewMode === 'grid' ? 'grid-view' : 'list-view'}`}>
                                {publications.map((publication, index) => {
                                    if (defaultViewMode === 'grid') {
                                        return (
                                            <div 
                                                key={publication.id} 
                                                className="publication-card"
                                                style={{ backgroundColor: cardBgColor }}
                                            >
                                                <div className="publication-thumbnail">
                                                    {publication.thumbnail ? (
                                                        <img 
                                                            src={publication.thumbnail} 
                                                            alt={publication.title} 
                                                            className="thumbnail-image" 
                                                        />
                                                    ) : (
                                                        <div 
                                                            className="thumbnail-placeholder"
                                                            style={{ backgroundColor: getTypeColor(publication.type) }}
                                                        >
                                                            <span className={`placeholder-icon ${getTypeIcon(publication.type)}-icon`}></span>
                                                        </div>
                                                    )}
                                                    <div className="publication-badges">
                                                        <span 
                                                            className="type-badge"
                                                            style={{ backgroundColor: getTypeColor(publication.type) }}
                                                        >
                                                            {publication.type}
                                                        </span>
                                                        {publication.isNew && (
                                                            <span className="new-badge">
                                                                {__('Nouveau', 'mon-theme-aca')}
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>
                                                <div className="publication-content">
                                                    <div className="publication-meta">
                                                        <span className="publication-author">{publication.author}</span>
                                                        <span className="meta-separator">•</span>
                                                        <span className="publication-date">{new Date(publication.date).toLocaleDateString('fr-FR')}</span>
                                                    </div>
                                                    <h3 className="publication-title" style={{ color: textColor }}>{publication.title}</h3>
                                                    <p className="publication-excerpt" style={{ color: secondaryTextColor }}>{publication.description}</p>
                                                    <div className="publication-footer">
                                                        <div className="publication-stats">
                                                            <span className="stat-item downloads">
                                                                <span className="stat-icon download-icon"></span>
                                                                <span className="stat-value">{publication.downloads}</span>
                                                            </span>
                                                            <span className="stat-item rating">
                                                                <span className="stat-icon star-icon"></span>
                                                                <span className="stat-value">{publication.rating}</span>
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
                                        );
                                    } else {
                                        return (
                                            <div 
                                                key={publication.id} 
                                                className="publication-list-item"
                                                style={{ backgroundColor: cardBgColor }}
                                            >
                                                <div className="list-item-type" style={{ backgroundColor: getTypeColor(publication.type) }}>
                                                    <span className={`type-icon ${getTypeIcon(publication.type)}-icon`}></span>
                                                </div>
                                                <div className="list-item-content">
                                                    <div className="list-item-header">
                                                        <h3 className="list-item-title" style={{ color: textColor }}>{publication.title}</h3>
                                                        <div className="list-item-badges">
                                                            {publication.isNew && (
                                                                <span className="new-badge">
                                                                    {__('Nouveau', 'mon-theme-aca')}
                                                                </span>
                                                            )}
                                                            <span 
                                                                className="type-badge"
                                                                style={{ backgroundColor: getTypeColor(publication.type) }}
                                                            >
                                                                {publication.type}
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <div className="list-item-meta">
                                                        <span>{publication.author}</span>
                                                        <span className="meta-separator">•</span>
                                                        <span>{new Date(publication.date).toLocaleDateString('fr-FR')}</span>
                                                        <span className="meta-separator">•</span>
                                                        <span style={{ color: getLevelColor(publication.level) }}>{publication.level}</span>
                                                        <span className="meta-separator">•</span>
                                                        <span>{publication.fileSize}</span>
                                                    </div>
                                                    <p className="list-item-description" style={{ color: secondaryTextColor }}>{publication.description}</p>
                                                    <div className="list-item-footer">
                                                        <div className="list-item-stats">
                                                            <span className="stat-item downloads">
                                                                <span className="stat-icon download-icon"></span>
                                                                <span className="stat-value">{publication.downloads} téléchargements</span>
                                                            </span>
                                                            <span className="stat-item rating">
                                                                <span className="stat-icon star-icon"></span>
                                                                <span className="stat-value">{publication.rating}</span>
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
                                        );
                                    }
                                })}
                            </div>
                            
                            {/* Pagination */}
                            <div className="publications-pagination">
                                <div className="pagination-controls">
                                    <button className="pagination-button prev-button">
                                        {__('Précédent', 'mon-theme-aca')}
                                    </button>
                                    <div className="pagination-numbers">
                                        <button className="pagination-number active" style={{ backgroundColor: accentColor, color: '#FFFFFF' }}>1</button>
                                        <button className="pagination-number">2</button>
                                        <button className="pagination-number">3</button>
                                        <span className="pagination-ellipsis">...</span>
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