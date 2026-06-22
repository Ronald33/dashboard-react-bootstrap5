import { useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { Offcanvas } from 'react-bootstrap'
import nav from '@/_nav'

const Sidebar = ({ visible, onClose }) => {
    const location = useLocation()
    const [menuAbierto, setMenuAbierto] = useState(null)

    const toggleMenu = (title) => {
        setMenuAbierto(menuAbierto === title ? null : title)
    }

    const estaActivo = (children) => {
        return children.some((item) => location.pathname.startsWith(item.to))
    }

    const menu = (
        <nav className="flex-grow-1 py-3">
            {nav.map((item, index) => {

                if (item.divider) {
                    return <hr key={index} className="border-secondary mx-3 my-2" />
                }

                if (item.children) {
                    const abierto = menuAbierto === item.title || estaActivo(item.children)
                    return (
                        <div key={item.title}>
                            <button
                                onClick={() => toggleMenu(item.title)}
                                className="d-flex align-items-center justify-content-between w-100 px-3 py-2 text-secondary border-0 bg-transparent"
                                style={{ fontSize: '0.9rem' }}
                            >
                                <span className="d-flex align-items-center gap-2">
                                    <i className={`bi ${item.icon}`}></i>
                                    {item.title}
                                </span>
                                <i
                                    className={`bi ${abierto ? 'bi-chevron-down' : 'bi-chevron-right'}`}
                                    style={{ fontSize: '0.75rem' }}
                                ></i>
                            </button>
                            {abierto && (
                                <div className="ms-3 border-start border-secondary ps-2 mb-1">
                                    {item.children.map((child) => (
                                        <NavLink
                                            key={child.to}
                                            to={child.to}
                                            onClick={onClose}
                                            className={({ isActive }) =>
                                                `d-flex align-items-center gap-2 px-3 py-2 text-decoration-none rounded mx-1
                                                ${isActive ? 'text-white' : 'text-secondary'}`
                                            }
                                            style={({ isActive }) => ({
                                                fontSize: '0.85rem',
                                                backgroundColor: isActive ? 'rgba(255,255,255,0.1)' : 'transparent',
                                            })}
                                        >
                                            <i className={`bi ${child.icon}`}></i>
                                            {child.title}
                                        </NavLink>
                                    ))}
                                </div>
                            )}
                        </div>
                    )
                }

                return (
                    <NavLink
                        key={item.to}
                        to={item.to}
                        end={item.to === '/'}
                        onClick={onClose}
                        className={({ isActive }) =>
                            `d-flex align-items-center gap-2 py-2 text-decoration-none mx-2 rounded
                            ${isActive ? 'text-white' : 'text-secondary'}`
                        }
                        style={({ isActive }) => ({
                            fontSize: '0.9rem',
                            paddingLeft: isActive ? '9px' : '12px',
                            backgroundColor: isActive ? 'rgba(255,255,255,0.1)' : 'transparent',
                            borderLeft: isActive ? '3px solid var(--bs-primary)' : '3px solid transparent',
                        })}
                    >
                        <i className={`bi ${item.icon}`}></i>
                        {item.title}
                    </NavLink>
                )
            })}
        </nav>
    )

    return (
        <>
            <div
                className="d-none d-md-flex flex-column text-white"
                style={{
                    width: '220px',
                    minHeight: '100vh',
                    flexShrink: 0,
                    backgroundColor: '#1a1f2e',
                }}
            >
                <div
                    className="px-3 py-4"
                    style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}
                >
                    <span className="fw-bold fs-5">Mi Sistema</span>
                </div>
                {menu}
            </div>

            <Offcanvas
                show={visible}
                onHide={onClose}
                style={{ width: '220px', backgroundColor: '#1a1f2e' }}
                className="text-white"
            >
                <Offcanvas.Header closeButton closeVariant="white">
                    <Offcanvas.Title className="fw-bold">Mi Sistema</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body className="p-0">{menu}</Offcanvas.Body>
            </Offcanvas>
        </>
    )
}

export default Sidebar