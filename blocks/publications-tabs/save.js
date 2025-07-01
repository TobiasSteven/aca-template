import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function save({ attributes }) {
    const { 
        tabs,
        defaultActiveTab,
        backgroundColor,
        borderColor,
        textColor,
        activeTextColor,
        activeBorderColor
    } = attributes;

    const blockProps = useBlockProps.save({
        className: 'publications-tabs-block',
        style: {
            backgroundColor: backgroundColor,
            borderBottom: `1px solid ${borderColor}`
        }
    });

    return (
        <div {...blockProps}>
            <div className="publications-tabs-container">
                <div className="tabs-wrapper">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            className={`tab-button ${tab.id === defaultActiveTab ? 'active' : ''}`}
                            data-tab-id={tab.id}
                            style={{
                                color: tab.id === defaultActiveTab ? activeTextColor : textColor,
                                borderBottomColor: tab.id === defaultActiveTab ? activeBorderColor : 'transparent'
                            }}
                        >
                            <RichText.Content
                                tagName="span"
                                value={tab.label}
                            />
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}