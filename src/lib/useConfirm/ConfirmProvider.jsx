import { useState, useCallback, useRef } from 'react'
import { ConfirmContext } from './useConfirm'
import ConfirmModal from './ConfirmModal'

// Configuración global programática
let globalModalComponent = null
let globalDefaultTitle    = null

const ConfirmProvider = ({ children, modalComponent = null, title = null }) => 
{
    const [parameters, setParameters] = useState(null)
    const promiseRef = useRef(null)

    const confirm = useCallback(({ title: instanceTitle, message = '', modalComponent: instanceModal = null, onConfirm = null, onCancel = null } = {}) => {
        return new Promise((resolve) => {
            // Jerarquía para title:
            // 1. title pasado en confirm({ title: 'X' })      ← instancia específica
            // 2. globalDefaultTitle seteado con setTitle()    ← global programático
            // 3. title pasado como prop al Provider           ← global declarativo
            // 4. '¿Estás seguro?'                             ← fallback final
            const resolvedTitle = instanceTitle
                ?? globalDefaultTitle
                ?? title
                ?? '¿Estás seguro?'

            promiseRef.current = { resolve, onConfirm, onCancel }
            setParameters({ title: resolvedTitle, message, modalComponent: instanceModal })
        })
    }, [title])

    const handleConfirmar = () => 
    {
        promiseRef.current?.onConfirm?.()
        promiseRef.current?.resolve(true)
        setParameters(null)
    }

    const handleCancelar = () => 
    {
        promiseRef.current?.onCancel?.()
        promiseRef.current?.resolve(false)
        setParameters(null)
    }

    // Jerarquía para el componente del modal:
    // 1. modalComponent pasado en confirm({ modalComponent: X })  ← instancia específica
    // 2. globalModalComponent seteado con setModal()              ← global programático
    // 3. modalComponent pasado como prop al Provider              ← global declarativo
    // 4. ConfirmModal                                             ← default
    const ModalComponent = parameters?.modalComponent
        ?? globalModalComponent
        ?? modalComponent
        ?? ConfirmModal

    return (
        <ConfirmContext.Provider value={confirm}>
            {children}
            {parameters && (
                <ModalComponent
                    title={parameters.title}
                    message={parameters.message}
                    onConfirm={handleConfirmar}
                    onCancel={handleCancelar}
                />
            )}
        </ConfirmContext.Provider>
    )
}

// Métodos estáticos para configuración global programática
ConfirmProvider.setModal = (component) => { globalModalComponent = component }
ConfirmProvider.setTitle = (value)     => { globalDefaultTitle   = value     }

export default ConfirmProvider;