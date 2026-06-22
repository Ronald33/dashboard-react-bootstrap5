const nav = [
    {
        title: 'Inicio',
        icon: 'bi-house',
        to: '/',
    },
    {
        divider: true,
    },
    {
        title: 'Página en blanco',
        icon: 'bi-file',
        to: '/example',
    },
    {
        title: 'Página de ejemplo',
        icon: 'bi-list-check',
        to: '/categories',
    },
    {
        divider: true,
    },
    {
        title: 'Estilos',
        icon: 'bi-palette',
        children: [
            { title: 'Tipografía', icon: 'bi-type', to: '/styles/typography' },
            { title: 'Formularios', icon: 'bi-ui-checks', to: '/styles/forms' },
            { title: 'Tablas', icon: 'bi-table', to: '/styles/tables' },
            { title: 'Botones', icon: 'bi-hand-index', to: '/styles/buttons' },
            { title: 'Interactivos', icon: 'bi-lightning', to: '/styles/interactive' },
            { title: 'Otros', icon: 'bi-grid', to: '/styles/others' },
        ],
    },
]

export default nav