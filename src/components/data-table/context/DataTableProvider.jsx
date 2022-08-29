import { useState } from 'react';
import { DataTableContext } from './DataTableContext';

export const DataTableProvider = ({ children }) =>
{
    const defaultState = {
        data: [],
        dataPerPage: [],
        page: 0,
        rowsPerPage: 5,
    };

    const [ dtConfig, setDtConfig ] = useState(defaultState);

    const setData = (data) => {
        let newDtConfig = {...dtConfig};
        newDtConfig = {
            ...newDtConfig,
            data,
            page: defaultState['page'],
            dataPerPage: data.slice((defaultState['page'] * newDtConfig.rowsPerPage), ((defaultState['page'] * newDtConfig.rowsPerPage) + newDtConfig.rowsPerPage)),
        }
        setDtConfig(newDtConfig);
    }

    const setPage = (page) => {
        let newDtConfig = {...dtConfig};
        newDtConfig = {
            ...newDtConfig,
            page,
            dataPerPage: newDtConfig.data.slice((page * newDtConfig.rowsPerPage), ((page * newDtConfig.rowsPerPage) + newDtConfig.rowsPerPage))
        }
        setDtConfig(newDtConfig);
    }

    return (
        <DataTableContext.Provider value={{ 
            dtConfig,
            setData,
            setPage,
        }}>
            {
                children
            }
        </DataTableContext.Provider>
    );
}