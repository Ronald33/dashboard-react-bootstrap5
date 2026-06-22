import React from 'react'

const routes = [
    {
        path: '/',
        element: React.lazy(() => import('@/features/dashboard/Dashboard')),
    },
    {
        path: '/example',
        element: React.lazy(() => import('@/features/example/Example')),
    },
    {
        path: '/categories',
        element: React.lazy(() => import('@/features/categories/CategoriesPage')),
    },
    {
        path: '/styles/typography',
        element: React.lazy(() => import('@/features/styles/typography/Typography')),
    },
    {
        path: '/styles/forms',
        element: React.lazy(() => import('@/features/styles/forms/Forms')),
    },
    {
        path: '/styles/tables',
        element: React.lazy(() => import('@/features/styles/tables/Tables')),
    },
    {
        path: '/styles/buttons',
        element: React.lazy(() => import('@/features/styles/buttons/Buttons')),
    },
    {
        path: '/styles/interactive',
        element: React.lazy(() => import('@/features/styles/interactive/Interactive')),
    },
    {
        path: '/styles/others',
        element: React.lazy(() => import('@/features/styles/others/Others')),
    },
]

export default routes