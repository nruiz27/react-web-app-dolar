import { useState, useEffect } from 'react';
import { AppContext } from './AppContext';
import getDolar from '../services/getDolar';

export const AppProvider = ({ children }) =>
{
    const [ data, setData ] = useState([]);

    const setDolarValue = (dolarIndex, dolarValue) => {
        let newData = [ ...data ];
        newData[dolarIndex].valor = dolarValue;
        setData(newData);
    }

    const deleteDolar = (dolarIndex) => {
        let newData = [ ...data ];
        newData.splice(dolarIndex, 1);
        setData(newData);
    }

    useEffect (() => {
        (async() => {
            const result = await getDolar();
            setData(result);
        })()
    }, []);

    return (
        <AppContext.Provider value={{ data, setDolarValue, deleteDolar, setData }}>
            {
                children
            }
        </AppContext.Provider>
    );
}