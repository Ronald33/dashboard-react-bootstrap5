import { Dropdown } from 'react-bootstrap'
import { toast } from 'sonner'
import { flexRender } from '@tanstack/react-table'

const HelpersUI = {}

/* =======================
   Gear dropdown
   Recibe un array de acciones y retorna
   un dropdown de engranaje.
   Uso:
   HelpersUI.gearDropdown(getAcciones())
======================= */
HelpersUI.gearDropdown = (acciones = []) => {
    if (acciones.length === 0) return null
    return (
        <Dropdown align="end">
            <Dropdown.Toggle variant="outline-secondary" size="sm">
                <i className="bi bi-gear"></i>
            </Dropdown.Toggle>
            <Dropdown.Menu>
                {acciones.map((accion, index) => (
                    <Dropdown.Item key={index} onClick={accion.onClick}>
                        <i className={`bi ${accion.icon} me-2`}></i>
                        {accion.label}
                    </Dropdown.Item>
                ))}
            </Dropdown.Menu>
        </Dropdown>
    )
}

/* =======================
   Th con sorting
   Uso:
   <HelpersUI.Th header={header}>
       {children opcionales}
   </HelpersUI.Th>
======================= */
HelpersUI.Th = ({ header, children }) => (
    <th
        style={{
            cursor: header.column.getCanSort() ? 'pointer' : 'default',
            userSelect: header.column.getCanSort() ? 'none' : 'auto',
        }}
        onClick={header.column.getCanSort() ? header.column.getToggleSortingHandler() : undefined}
    >
        <div className="d-flex align-items-center gap-1">
            {flexRender(header.column.columnDef.header, header.getContext())}
            {header.column.getIsSorted() === 'asc' && <i className="bi bi-arrow-up small"></i>}
            {header.column.getIsSorted() === 'desc' && <i className="bi bi-arrow-down small"></i>}
            {children}
        </div>
    </th>
)

/* =======================
   TableSearchInput
   Uso:
   <HelpersUI.TableSearchInput value={globalFilter} onChange={setGlobalFilter} />
======================= */
HelpersUI.TableSearchInput = ({ value, onChange }) => (
    <div className="card-header bg-white border-bottom d-flex align-items-center gap-2">
        <i className="bi bi-search text-muted"></i>
        <input
            type="text"
            className="form-control form-control-sm border-0 shadow-none"
            placeholder="Buscar en todos los campos..."
            value={value}
            onChange={(e) => onChange(e.target.value)}
        />
    </div>
)

HelpersUI.TbodyEmpty = ({ message }) => (
    <tbody>
        <tr>
            <td colSpan={100} className="text-center text-muted py-4">
                {message}
            </td>
        </tr>
    </tbody>
)

/* =======================
   TableHeader genérico
   Uso:
   <HelpersUI.TableHeader table={table} getAcciones={getAcciones} />
======================= */
HelpersUI.TableHeader = ({ table, getAcciones }) => (
    <thead className="table-light">
        {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                    <HelpersUI.Th key={header.id} header={header}>
                        {header.column.id === 'acciones' && getAcciones && (
                            <div className="ms-auto">
                                {HelpersUI.gearDropdown(getAcciones())}
                            </div>
                        )}
                    </HelpersUI.Th>
                ))}
            </tr>
        ))}
    </thead>
);

/* =======================
   Toast notifications
======================= */
HelpersUI.toast = {
    success: (msg) => { toast.success(msg) },
    error: (msg) => { toast.error(msg) },
    warning: (msg) => { toast.warning(msg) },
    info: (msg) => { toast.info(msg) },
}

export default HelpersUI