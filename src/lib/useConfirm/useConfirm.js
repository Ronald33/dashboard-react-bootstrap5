import { createContext, useContext } from 'react'

export const ConfirmContext = createContext(null)

const useConfirm = () => {
    const confirm = useContext(ConfirmContext)
    if (!confirm) throw new Error('useConfirm debe usarse dentro de ConfirmProvider')
    return confirm
}

export default useConfirm