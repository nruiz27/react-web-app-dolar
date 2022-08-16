import React, { useContext, useState, useEffect } from 'react';
import DataTable from '../components/data-table';
import { AppContext } from '../context/AppContext';
import { sweetAlertDelete } from '../support/sweetAlert';
import useOpen from '../hooks/useOpen';
import CreateModalForm from '../components/form/CreateModalForm';
import Highstock from '../components/high-chart/Highstock';
import Card from 'react-bootstrap/Card';
import DateRangePicker from '../components/date-picker/DateRangePicker'
import moment from 'moment';
import BackdropLoader from '../components/BackdropLoader';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function DolarPage()
{
    const { data, deleteDolar, setDolarValue } = useContext(AppContext);
    const [ isOpen, handleOpen ] = useOpen();
    const [ currentRow, setCurrentRow ] = useState(null);
    const [ leakedData, setLeakedData ] = useState([]);
    const [ loading, setLoading ] = useState(false);

    const defaultDateRange = {
        startDate: moment().add(-30, 'days').format('DD/MM/yyyy'),
        endDate: moment().format('DD/MM/yyyy')
    };
    const [ selectedDay, setSelectedDay ] = useState();

    const handleEditPress = (event, index, data) => {
        event.preventDefault();
        setCurrentRow({
            index,
            value: data.valor
        });
        handleOpen();
    }

    const handleEditSubmit = (formData) => {
        const { value } = formData;

        if ( value && value.trim().length > 0 ) {
            setDolarValue(currentRow.index, value);
            handleOpen();
        } else {
            toast.error('Es requerido ingresar un valor para editar.');
        }
    }
    
    const handleDeletePress = (event, index, data) => {
        event.preventDefault();
        sweetAlertDelete('¿Estas seguro que quieres eliminar el valor?').then((event) => {
            if ( event.value ) {
                deleteDolar(index);
            }
        })
    }

    useEffect(() => {
        setLeakedData(data);
        handleSearchPress();
    }, [data]);

    useEffect(() => {
        setSelectedDay(defaultDateRange);
    }, [])
    
    const dtConfig = {
        columns: [
            { field: 'fecha', name: 'Fecha', type: 'text', align: 'center' },
            { field: 'valor', name: 'Valor', type: 'text', align: 'right' },
            { field: null, name: 'Operaciones', type: 'action', align: 'center', buttons: [
                { icon: 'la-edit', onPress: handleEditPress, color: 'primary' },
                { icon: 'la-trash', onPress: handleDeletePress, color: 'danger' },
            ] },
        ],
    }

    const fields = [
        { type: 'text', name: 'value' }
    ];

    const onChangeDateRangePicker = (newDate) => {
        setSelectedDay(newDate);
    }

    const handleSearchPress = () => {
        setLoading(true);
        if ( selectedDay && selectedDay.startDate && selectedDay.endDate ) {
            const startDate = moment(selectedDay.startDate, 'DD/MM/yyyy').toDate();
            const endDate = moment(selectedDay.endDate, 'DD/MM/yyyy').toDate();
            const newData = [...data].filter(element => {
                const elementDate = moment(element.fecha, 'DD/MM/yyyy').toDate();
                return elementDate >= startDate && elementDate <= endDate;
            });
            setLeakedData(newData);
        } else {
            setLeakedData(data);
        }
        setLoading(false);
    }

    return (
        <div>
            <Card style={{ padding: '20px', marginBottom: '30px', alignItems: 'center', justifyContent: 'flex-start', display: 'flex', flexDirection: 'row' }}>
                <Card.Body>
                    <h3 style={{ fontWeight: 'normal' }}>Filtro externo</h3>
                    <DateRangePicker 
                        value={selectedDay}
                        placeholder="Seleccione rango"
                        onChange={onChangeDateRangePicker}
                    />
                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', marginTop: '10px'}}>
                        <button className="btn btn-primary" onClick={handleSearchPress}>Filtrar</button>
                    </div>
                </Card.Body>
            </Card>
            <Highstock
                seriesName="Valor"
                title="Fluctuación del dolar en 2022"
                data={leakedData}
                dataCategoriesName="fecha"
                dataSeriesName="valor"
            />
            <DataTable title="Mantenedor dolar 2022" config={dtConfig} data={leakedData}/>
            <CreateModalForm 
                isOpen={isOpen}
                handleClose={handleOpen}
                title="Editar"
                fields={fields}
                data={currentRow}
                onSubmit={handleEditSubmit}
            />
            <BackdropLoader loading={loading}/>
        </div>
    )
}