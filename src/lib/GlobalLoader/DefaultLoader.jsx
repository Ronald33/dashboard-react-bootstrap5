const DefaultLoader = () => 
{
    return (
        <>
            <style>{`
                @keyframes loader-fade-in {
                    from { opacity: 0; transform: translateY(8px); }
                    to   { opacity: 1; transform: translateY(0); }
                }
                @keyframes loader-dots {
                    0%, 20%  { content: '.';   }
                    40%      { content: '..';  }
                    60%, 100%{ content: '...'; }
                }
                .loader-dots::after {
                    content: '';
                    animation: loader-dots 1.2s steps(1) infinite;
                }
            `}</style>
            <div style={{
                position:     "fixed",
                bottom:       "28px",
                right:        "28px",
                background:   "#1976d2",
                color:        "#fff",
                padding:      "10px 20px",
                borderRadius: "8px",
                fontSize:     "14px",
                fontWeight:   500,
                fontFamily:   "sans-serif",
                boxShadow:    "0 4px 12px rgba(0,0,0,0.2)",
                zIndex:       9999,
                animation:    "loader-fade-in 0.2s ease-out",
                userSelect:   "none",
            }}>
                Loading<span className="loader-dots" />
            </div>
        </>
    )
}

export default DefaultLoader
