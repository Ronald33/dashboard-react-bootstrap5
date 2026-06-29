const MyLoader = () => 
{
    return (
        <>
            <style>{`
                @keyframes global-loader-slide {
                    0%   { left: -40%; width: 40%; }
                    50%  { width: 60%; }
                    100% { left: 110%; width: 40%; }
                }
            `}</style>
            <div style={{
                position:   "fixed",
                top:        0,
                left:       0,
                width:      "100%",
                height:     "4px",
                background: "#e0e0e0",
                zIndex:     9999,
                overflow:   "hidden",
            }}>
                <div style={{
                    position:   "absolute",
                    height:     "100%",
                    background: "#1976d2",
                    animation:  "global-loader-slide 1.2s ease-in-out infinite",
                }} />
            </div>
        </>
    );
}

export default MyLoader;