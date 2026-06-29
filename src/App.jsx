import { BrowserRouter } from 'react-router-dom'
import { Provider } from "react-redux";

import { Toaster } from 'sonner'

import { store } from "@/app/store";

import ConfirmProvider from '@/lib/useConfirm/ConfirmProvider';
import GlobalLoader from '@/lib/GlobalLoader/GlobalLoader';

import Layout from '@/layouts/Layout'

import './App.css'

const App = () => {
    return (
        <>
            <Provider store={store}>
                <GlobalLoader />
                <ConfirmProvider>
                    <BrowserRouter>
                        <Layout />
                        <Toaster position="bottom-right" richColors />
                    </BrowserRouter>
                </ConfirmProvider>
            </Provider>
        </>
    );
}

export default App