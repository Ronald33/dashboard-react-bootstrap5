import { Suspense, useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import Header from './components/Header'
import routes from '@/routes'

const Layout = () => {
    const [sidebarVisible, setSidebarVisible] = useState(false)

    return (
        <div className="d-flex" style={{ minHeight: '100vh', backgroundColor: '#f0f2f5' }}>
            <Sidebar visible={sidebarVisible} onClose={() => setSidebarVisible(false)} />
            <div className="d-flex flex-column flex-grow-1">
                <Header onMenuClick={() => setSidebarVisible(true)} />
                <main className="p-4 flex-grow-1">
                    <Suspense fallback={<div className="text-muted">Cargando...</div>}>
                        <Routes>
                            {routes.map((route) => (
                                <Route key={route.path} path={route.path} element={<route.element />} />
                            ))}
                        </Routes>
                    </Suspense>
                </main>
            </div>
        </div>
    )
}

export default Layout