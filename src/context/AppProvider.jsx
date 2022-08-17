import { useState, useEffect } from 'react';
import { AppContext } from './AppContext';
import getDolar from '../services/getDolar';

export const AppProvider = ({ children }) =>
{
    const [ data, setData ] = useState([]);

    const setDolarValue = (dolarDate, dolarValue) => {
        let newData = [ ...data ];
        newData = newData.map((element) => {
            if ( element.fecha === dolarDate ) {
                element.valor = dolarValue;
            }
            return element;
        });
        setData(newData);
    }

    const deleteDolar = (dolarDate) => {
        let newData = [ ...data ];
        newData = newData.filter(element => element.fecha !== dolarDate);
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