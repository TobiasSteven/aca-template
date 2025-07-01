import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function save({ attributes }) {
    const {
        sectionTitle,
        sectionSubtitle,
        timelineItems,
        lineColor,
        dotColor,
        yearColor,
        titleColor,
        textColor,
        backgroundColor
    } = attributes;

    const blockProps = useBlockProps.save({
        style: {
            backgroundColor: backgroundColor,
            padding: '4rem 0'
        }
    });

    return (
        <div {...blockProps}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <RichText.Content
                        tagName="h2"
                        className="text-3xl md:text-4xl font-bold mb-4"
                        style={{ color: titleColor }}
                        value={sectionTitle}
                    />
                    <RichText.Content
                        tagName="p"
                        className="text-lg max-w-2xl mx-auto"
                        style={{ color: textColor }}
                        value={sectionSubtitle}
                    />
                </div>

                <div className="relative">
                    {/* Timeline Line */}
                    <div 
                        className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full" 
                        style={{ backgroundColor: lineColor }}
                    ></div>

                    <div className="space-y-12">
                        {timelineItems.map((item, index) => (
                            <div
                                key={index}
                                className={`flex items-center ${
                                    index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
                                }`}
                            >
                                <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
                                    <div className="bg-white p-6 rounded-lg shadow-lg border-l-4" style={{ borderColor: lineColor }}>
                                        <div className="text-2xl font-bold mb-2" style={{ color: yearColor }}>
                                            <RichText.Content value={item.year} />
                                        </div>
                                        <h3 className="text-xl font-bold mb-3" style={{ color: titleColor }}>
                                            <RichText.Content value={item.title} />
                                        </h3>
                                        <p style={{ color: textColor }}>
                                            <RichText.Content value={item.description} />
                                        </p>
                                    </div>
                                </div>

                                {/* Timeline Dot */}
                                <div className="relative z-10">
                                    <div 
                                        className="w-6 h-6 rounded-full border-4 border-white shadow-lg" 
                                        style={{ backgroundColor: dotColor }}
                                    ></div>
                                </div>

                                <div className="w-1/2"></div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}