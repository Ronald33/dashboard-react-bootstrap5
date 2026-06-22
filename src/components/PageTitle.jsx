const PageTitle = ({ children, actions }) => 
{
    return (
        <div className="mb-4 d-flex align-items-center justify-content-between">
            <div
                className="d-flex align-items-center gap-3"
                style={{ borderLeft: '3px solid var(--bs-primary)', paddingLeft: '12px' }}
            >
                <h5 className="fw-semibold mb-0 text-dark">{children}</h5>
            </div>
            {actions && <div>{actions}</div>}
        </div>
    )
}

export default PageTitle;