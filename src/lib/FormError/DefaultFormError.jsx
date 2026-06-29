const DefaultFormError = ({ errors }) =>
{
    return (
        <div style={{
            marginTop:    "12px",
            padding:      "10px 14px",
            background:   "#fff5f5",
            border:       "1px solid #feb2b2",
            borderRadius: "6px",
            fontSize:     "13px",
            color:        "#c53030",
        }}>
            {Object.entries(errors).map(([field, messages]) =>
            {
                const list = Array.isArray(messages) ? messages : [messages]
                return list.map((msg, i) => (
                    <div key={field + i}>
                        <strong>{field}:</strong> {msg}
                    </div>
                ))
            })}
        </div>
    )
}

export default DefaultFormError
