import { useRef } from 'react';

export const PreferencesList = ({ preferences, activePreference, setActivePreference, reset, deletePreference }) => {
    const scrollContainerRef = useRef(null);

    const scrollLeft = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollBy({ left: -250, behavior: 'smooth' });
        }
    };

    const scrollRight = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollBy({ left: 250, behavior: 'smooth' });
        }
    };

    return (
        <div className="flex justify-center mb-6">
            <div className="w-[920px] max-w-full px-4 relative">
                {/* Floating Scroll Controls */}
                <div className="absolute top-2 left-[-12px] right-[-12px] flex justify-between pointer-events-none z-1000">
                    <button
                        onClick={scrollLeft}
                        className="p-2 rounded-sm bg-background/80 backdrop-blur-sm hover:bg-card transition-colors duration-200 disabled:opacity-0 pointer-events-auto shadow-sm"
                        disabled={preferences.length <= 3}
                    >
                        ←
                    </button>
                    <button
                        onClick={scrollRight}
                        className="p-2 rounded-sm bg-background/80 backdrop-blur-sm hover:bg-card transition-colors duration-200 disabled:opacity-0 pointer-events-auto shadow-sm"
                        disabled={preferences.length <= 3}
                    >
                        →
                    </button>
                </div>

                {/* Scroll Container */}
                <div
                    ref={scrollContainerRef}
                    className="flex gap-2 overflow-x-auto py-2 scrollbar-thin"
                >
                    {preferences.map(pref => (
                        <div
                            key={pref.id}
                            className={`flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer transition-all duration-200 flex-none min-w-[150px] ${activePreference?.id === pref.id
                                    ? 'bg-primary text-primary-foreground shadow-md'
                                    : 'bg-card text-card-foreground hover:bg-accent/50'
                                }`}
                            onClick={() => {
                                setActivePreference(pref);
                                reset(pref);
                            }}
                        >
                            <span className="font-medium text-sm truncate flex-1" title={pref.name}>
                                {pref.name}
                            </span>
                            <div className="flex items-center gap-1 flex-shrink-0">
                                {pref.is_default ? (
                                    <span className="text-xs bg-primary/20 text-primary px-1.5 py-0.5 rounded">Def</span>
                                ) : (
                                    <span className="text-xs bg-muted/20 text-muted-foreground px-1.5 py-0.5 rounded">Cus</span>
                                )}
                                {preferences.length > 1 && (
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            deletePreference(pref.id);
                                        }}
                                        className="text-muted-foreground hover:text-destructive transition-colors duration-200 text-sm"
                                    >
                                        ×
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}