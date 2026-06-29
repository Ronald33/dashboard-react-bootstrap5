import { useMemo, useState } from 'react';
import {
    useReactTable,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    flexRender,
} from '@tanstack/react-table';

import HelpersUI from '@/utils/HelpersUI';

import TablePagination from '@/components/TablePagination';

/* =======================
   Subcomponents
======================= */
const TableBody = ({ table, loading, onEditar, onEliminar }) => 
{
    if(loading) { return <HelpersUI.TbodyEmpty message="Cargando..." />; }

    const rows = table.getRowModel().rows;

    if(rows.length === 0) { return <HelpersUI.TbodyEmpty message="Sin registros" />; }

    const getCellContent = (cell) => 
    {
        if(cell.column.id === 'acciones')
        {
            const item = cell.row.original;

            return (
                <div className="d-flex gap-1">
                    <button className="btn btn-outline-primary btn-sm" onClick={() => onEditar(item)}>
                        <i className="bi bi-pencil"></i>
                    </button>
                    <button className="btn btn-outline-danger btn-sm" onClick={() => onEliminar(item)}>
                        <i className="bi bi-trash"></i>
                    </button>
                </div>
            );
        }

        return flexRender(cell.column.columnDef.cell, cell.getContext());
    };
        
    return (
        <tbody>
            {rows.map((row) => (
                <tr key={row.id}>
                    {row.getVisibleCells().map((cell) => (
                        <td key={cell.id} className={cell.column.columnDef.meta?.className || ''}>
                            {getCellContent(cell)}
                        </td>
                    ))}
                </tr>
            ))}
        </tbody>
    );
};

/* =======================
   Component
======================= */
const CategoriesTable = ({ data = [], loading, onEditar, onEliminar, getAcciones }) => 
{
    const [globalFilter, setGlobalFilter] = useState('');
    const [sorting, setSorting] = useState([{ id: 'id', desc: true }]);
    const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 5 });

    const columns = useMemo(() => [
        { accessorKey: 'id', header: 'ID', meta: { className: 'td-id' } },
        { accessorKey: 'nombre', header: 'NOMBRE' },
        { id: 'acciones', header: '', enableSorting: false, meta: { className: 'td-acciones-2' } },
    ], []);

    const table = useReactTable({
        data,
        columns,
        state: { globalFilter, sorting, pagination },
        onGlobalFilterChange: setGlobalFilter,
        onSortingChange: setSorting,
        onPaginationChange: setPagination,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
    });

    return (
        <div className="card border-0 shadow-sm">
            <HelpersUI.TableSearchInput value={globalFilter} onChange={setGlobalFilter} />
            <div className="card-body p-0">
                <div className="table-responsive">
                    <table className="table table-hover table-striped table-bordered mb-0 my-table">
                        <HelpersUI.TableHeader table={table} getAcciones={getAcciones} />
                        <TableBody table={table} loading={loading} onEditar={onEditar} onEliminar={onEliminar} />
                    </table>
                </div>
            </div>
            <TablePagination table={table} />
        </div>
    );
};

export default CategoriesTable;