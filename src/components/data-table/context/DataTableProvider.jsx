import { useState } from 'react';
import { DataTableContext } from './DataTableContext';

export const DataTableProvider = ({ children }) =>
{
    const [ dtConfig, setDtConfig ] = useState({
        data: [],
        dataPerPage: [],
        page: 0,
        rowsPerPage: 5
    });

    const setData = (data) => {
        let newDtConfig = {...dtConfig};
        newDtConfig = {
            ...newDtConfig,
            data,
        }
        setDtConfig(newDtConfig);
    }

    const setDataPerPage = (dataPerPage) => {
        let newDtConfig = {...dtConfig};
        newDtConfig = {
            ...newDtConfig,
            dataPerPage,
        }
        setDtConfig(newDtConfig);
    }

    const setPage = (page) => {
        let newDtConfig = {...dtConfig};
        newDtConfig = {
            ...newDtConfig,
            page,
        }
        setDtConfig(newDtConfig);
    }

    const setRowsPerPage = (rowsPerPage) => {
        let newDtConfig = {...dtConfig};
        newDtConfig = {
            ...newDtConfig,
            rowsPerPage,
            ['page']: 0,
        }
        setDtConfig(newDtConfig);
    }

    return (
        <DataTableContext.Provider value={{ dtConfig, setData, setDataPerPage, setPage, setRowsPerPage }}>
            {
                children
            }
        </DataTableContext.Provider>
    );
}