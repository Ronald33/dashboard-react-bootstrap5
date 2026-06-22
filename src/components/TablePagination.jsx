const TablePagination = ({ table }) => {
    const { pageIndex } = table.getState().pagination
    const totalPages = table.getPageCount()
    const totalRows = table.getFilteredRowModel().rows.length

    const handlePageInput = (e) => {
        const page = Number(e.target.value) - 1
        if (page >= 0 && page < totalPages) {
            table.setPageIndex(page)
        }
    }

    return (
        <div className="card-footer bg-white border-top d-flex align-items-center justify-content-between">
            <small className="text-muted">{totalRows} registro(s)</small>

            <div className="d-flex align-items-center gap-2">
                {/* Primera */}
                <button
                    className="btn btn-outline-secondary btn-sm"
                    onClick={() => table.setPageIndex(0)}
                    disabled={!table.getCanPreviousPage()}
                    title="Primera página"
                >
                    «
                </button>

                {/* Anterior */}
                <button
                    className="btn btn-outline-secondary btn-sm"
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}
                    title="Página anterior"
                >
                    ‹
                </button>

                {/* Input de página */}
                <div className="d-flex align-items-center gap-1">
                    <input
                        type="number"
                        className="form-control form-control-sm text-center"
                        style={{ width: '60px' }}
                        min={1}
                        max={totalPages}
                        defaultValue={pageIndex + 1}
                        key={pageIndex}
                        onBlur={handlePageInput}
                        onKeyDown={(e) => e.key === 'Enter' && handlePageInput(e)}
                    />
                    <span className="text-muted small">de {totalPages}</span>
                </div>

                {/* Siguiente */}
                <button
                    className="btn btn-outline-secondary btn-sm"
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage()}
                    title="Página siguiente"
                >
                    ›
                </button>

                {/* Última */}
                <button
                    className="btn btn-outline-secondary btn-sm"
                    onClick={() => table.setPageIndex(totalPages - 1)}
                    disabled={!table.getCanNextPage()}
                    title="Última página"
                >
                    »
                </button>
            </div>
        </div>
    )
}

export default TablePagination