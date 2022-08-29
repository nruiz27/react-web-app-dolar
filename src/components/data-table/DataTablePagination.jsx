import { useContext } from 'react';
import ReactPaginate from 'react-paginate';
import { DataTableContext } from './context/DataTableContext';

export default function DataTablePagination()
{
    const { dtConfig, setPage } = useContext(DataTableContext);

    const handlePageChange = ({ selected }) => setPage(selected);

    return (
        <>
            <ReactPaginate
                previousLabel={  window.screen.width < 768 ? '<' : 'Anterior' }
                nextLabel={ window.screen.width < 768 ? '>' : 'Siguiente' }
                breakLabel="..."
                pageCount={ Math.ceil(dtConfig.data.length/dtConfig.rowsPerPage) }
                marginPagesDisplayed={ (window.screen.width < 768) ? (window.screen.width < 425) ? 1 : 2 : 3 }
                pageRangeDisplayed={ (window.screen.width < 768) ? (window.screen.width < 425) ? 1 : 2 : 3 }
                onPageChange={handlePageChange}
                containerClassName="pagination mb-0"
                pageClassName="page-item"
                pageLinkClassName="page-link"
                previousClassName="page-item"
                previousLinkClassName="page-link"
                nextClassName="page-item"
                nextLinkClassName="page-link"
                breakClassName="page-item disabled"
                breakLinkClassName="page-link"
                activeClassName="active"
                forcePage={dtConfig.page}
            />
        </>
    ); 
}