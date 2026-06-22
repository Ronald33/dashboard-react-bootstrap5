import { BrowserRouter } from 'react-router-dom'
import { Toaster } from 'sonner'
import Layout from '@/layouts/Layout'

import ConfirmProvider from '@/lib/useConfirm/ConfirmProvider';

import './App.css'

const App = () => {
    return (
        <ConfirmProvider>
            <BrowserRouter>
                <Layout />
                <Toaster position="bottom-right" richColors />
            </BrowserRouter>
        </ConfirmProvider>
    )
}

export default App