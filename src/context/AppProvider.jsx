import { useState, useEffect } from 'react';
import { AppContext } from './AppContext';
import getDolar from '../services/getDolar';
import moment from 'moment';

export const AppProvider = ({ children }) =>
{
    const [ data, setData ] = useState([]);
    const [ minDate, setMinDate ] = useState();
    const [ maxDate, setMaxDate ] = useState();

    const setDolarValue = (dolarDate, dolarValue) => {
        let newData = [...data];
        newData = newData.map((element) => {
            if ( element.fecha === dolarDate ) {
                element.valor = parseFloat(dolarValue);
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
            setData(smallestToLargest(result));
            setMinAndMaxDate(result);
        })();
    }, []);

    const smallestToLargest = (result) => {
        return result.sort((first, second) => moment(first.fecha, 'DD/MM/yyyy').toDate() - moment(second.fecha, 'DD/MM/yyyy').toDate())
    }
    
    const setMinAndMaxDate = (result) => {
        let dolarDates = result.map((element) => moment(element.fecha, 'DD/MM/yyyy').toDate());
        const min = new Date(Math.min.apply(null,dolarDates));
        const max = new Date(Math.max.apply(null,dolarDates));
        setMinDate(moment(`${min.getDate()}/${(min.getMonth() + 1)}/${min.getFullYear()}`, 'DD/MM/yyyy').format('DD/MM/yyyy'));
        setMaxDate(moment(`${max.getDate()}/${(max.getMonth() + 1)}/${max.getFullYear()}`, 'DD/MM/yyyy').format('DD/MM/yyyy'));
    }

    return (
        <AppContext.Provider value={{ data, setDolarValue, deleteDolar, setData, minDate, maxDate }}>
            {
                children
            }
        </AppContext.Provider>
    );
}