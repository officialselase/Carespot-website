
const Hero = ({
    title,
    subtitle,
    description,
    backgroundImage,
    backgroundPosition = "center",
    primaryAction,
    secondaryAction,
    height = "min-h-screen",
    overlay = "hero-overlay",
    children
}) => {
    return (
        <section
            className={`relative ${height} flex items-center justify-center bg-cover bg-no-repeat`}
            style={{
                backgroundImage: `url(${backgroundImage})`,
                backgroundPosition: backgroundPosition
            }}
        >
            {/* Overlay */}
            <div className={overlay}></div>

            {/* Content */}
            <div className="relative z-10 container-custom text-center text-color-text-inverse">
                <div className="max-w-4xl mx-auto animate-fade-in-up">
                    {subtitle && (
                        <p className="text-color-primary-200 font-semibold text-lg uppercase tracking-wide mb-4">
                            {subtitle}
                        </p>
                    )}

                    <h1 className="text-responsive-5xl font-bold mb-6 leading-tight typography-heading text-optimized">
                        {title}
                    </h1>

                    {description && (
                        <p className="text-responsive-xl mb-8 text-color-text-inverse opacity-90 leading-relaxed max-w-3xl mx-auto typography-body text-optimized">
                            {description}
                        </p>
                    )}

                    {/* Action Buttons */}
                    {(primaryAction || secondaryAction) && (
                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                            {primaryAction && (
                                <button
                                    onClick={primaryAction.onClick}
                                    className="btn-primary text-lg px-8 py-4"
                                >
                                    {primaryAction.text}
                                </button>
                            )}

                            {secondaryAction && (
                                <button
                                    onClick={secondaryAction.onClick}
                                    className="btn-outline text-lg px-8 py-4 border-color-text-inverse text-color-text-inverse hover:bg-color-text-inverse hover:text-color-text-primary"
                                >
                                    {secondaryAction.text}
                                </button>
                            )}
                        </div>
                    )}

                    {/* Custom children content */}
                    {children}
                </div>
            </div>
        </section>
    );
};

export default Hero;