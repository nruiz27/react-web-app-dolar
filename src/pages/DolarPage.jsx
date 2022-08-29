import React, { useContext, useState, useEffect } from 'react';
import DataTable from '../components/data-table';
import { AppContext } from '../context/AppContext';
import { sweetAlertDelete } from '../support/sweetAlert';
import useOpen from '../hooks/useOpen';
import CreateModalForm from '../components/form/CreateModalForm';
import Highstock from '../components/high-chart/Highstock';
import { formatDatePickerResponse } from '../components/date-picker/DateRangePicker'
import moment from 'moment';
import BackdropLoader from '../components/BackdropLoader';
import { toast } from 'react-toastify';
import ExternalFilter from '../components/ExternalFilter';
import { validatePrice } from '../utils/stringUtils'

export default function DolarPage()
{
    // Initial filter form data
    const initialFilterFormData = {
        range: {
            startDate: moment().add(-30, 'days').format('DD/MM/yyyy'),
            endDate: moment().format('DD/MM/yyyy'),
        }
    };

    // Context data
    const { data, deleteDolar, setDolarValue, minDate, maxDate } = useContext(AppContext);

    // Filtered data
    const [ leakedData, setLeakedData ] = useState([]);

    // Modal state
    const [ isOpen, handleOpen ] = useOpen();

    // Current row selected
    const [ currentRow, setCurrentRow ] = useState(null);

    // Loading state
    const [ loading, setLoading ] = useState(false);

    // Range selected
    const [ rangeToFilter, setRangeToFilter ] = useState(initialFilterFormData.range);

    // Data change listener
    useEffect(() => {
        setLoading(true);

        if ( !rangeToFilter ) {
            setLeakedData(data);
            return;
        }

        setLeakedDataByDateRange(rangeToFilter);
    }, [data]);

    useEffect(() => {
        setLoading(true);
        
        if ( !rangeToFilter ) {
            setLeakedData(data);
            return;
        }

        setLeakedDataByDateRange(rangeToFilter);
    }, [rangeToFilter]);


    useEffect(() => {
        if ( loading ) {
            // Set time out to se loading
            setTimeout(() => {
                setLoading(false);
            }, 1000);
        }
    }, [loading]);

    // Set filtered data by date range
    const setLeakedDataByDateRange = (dateRange) =>
    {
        const formatResponse = formatDatePickerResponse(dateRange);

        const newData = [...data].filter(element => {
            const elementDate = moment(element.fecha, 'DD/MM/yyyy').toDate();
            return elementDate >= formatResponse.startDate && elementDate <= formatResponse.endDate;
        });

        setLeakedData(newData);
    }
    
    // Handle edit press
    const handleEditPress = (event, index, data) => {
        event.preventDefault();
        setCurrentRow(data);
        handleOpen();
    }

    // Handle save press
    const handleEditSubmit = (formData) =>
    {
        const { valor } = formData;

        if ( valor && valor.toString().trim().length > 0 ) 
        {
            if ( !validatePrice(valor) ) {
                toast.error('El valor ingresado no es válido.');
                return;
            }

            setDolarValue(currentRow.fecha, valor);
            toast.success('Registro actualizado correctamente.');
            handleOpen();
        } else {
            toast.error('El campo valor es requerido.');
        }
    }
    
    // Handle delete
    const handleDeletePress = (event, index, data) => 
    {
        event.preventDefault();

        sweetAlertDelete(`¿Estas seguro que quieres eliminar el registro con fecha ${data.fecha}?`).then((event) => {
            if ( event.value ) {
                deleteDolar(data.fecha);
                toast.success('Registro eliminado correctamente.');
            }
        });
    }

    // Handle search press
    const handleSearchPress = (externalData) => 
    {
        if ( !externalData || !externalData.range ) {
            setRangeToFilter(null);
            return;
        }

        setRangeToFilter(externalData.range);
    }

    // DataTable structure
    const dtConfig = {
        columns: [
            { field: 'fecha', name: 'Fecha', type: 'text', align: 'center' },
            { field: 'valor', name: 'Valor', type: 'text', align: 'right' },
            { field: null, name: 'Operaciones', type: 'action', align: 'center', buttons: [
                { icon: 'la-edit', onPress: handleEditPress, color: 'primary', title: 'Editar' },
                { icon: 'la-trash', onPress: handleDeletePress, color: 'danger', title: 'Eliminar' },
            ]},
        ],
    }

    // Form fields
    const fields = [
        { 
            type: 'text',
            name: 'valor',
            label: 'Valor',
            info: 'Solo es permito ingresar números del "0-9" y el caracter "." solo una vez y no al inicio del valor.'
        }
    ];

    // External fields
    const externalFilterFields = [
        { 
            type: 'dateRange',
            name: 'range',
            label: 'Rango de fechas',
            info: 'Los rangos de fechas seleccionados se mostrarán en el gráfico y tabla de datos.',
            minDate,
            maxDate,
        }
    ];

    return (
        <div>
            {/* External filter */}
            <ExternalFilter 
                data={initialFilterFormData}
                fields={externalFilterFields}
                onSubmit={handleSearchPress}
            />

            {/* Graphic */}
            <Highstock
                seriesName="Valor"
                title="Gráfica de fluctuación del dólar en 2022"
                data={leakedData}
                dataCategoriesName="fecha"
                dataSeriesName="valor"
            />

            {/* Table */}
            <DataTable title="Tabla de datos dólar 2022" config={dtConfig} data={leakedData}/>

            {/* Modal */}
            <CreateModalForm
                isOpen={isOpen}
                handleClose={handleOpen}
                title={currentRow ? `Editar: ${currentRow.fecha}` : 'Editar'}
                fields={fields}
                data={currentRow}
                onSubmit={handleEditSubmit}
            />

            {/* Loader */}
            <BackdropLoader loading={loading}/>
        </div>
    )
}