import DateRangeForm from './form/DateRangeForm';
import { useForm } from 'react-hook-form';
import Card from 'react-bootstrap/Card';
import Info from './Info';

export default function ExternalFilter(props)
{
    const defaultFieldsValue = {
        dateRange: null,
    }

    const { control, handleSubmit, setValue, getValues } = useForm();

    const handleCleanFields = () => {
        if ( props.fields && Array.isArray(props.fields) && props.fields.length > 0 ) {
            for (const field of props.fields) {
                setValue(field.name, defaultFieldsValue[field.type])
            }
            props.onSubmit(getValues());
        }
    }

    return (
        <Card className="ef-card-container">
            <Card.Body>
                <h3 className="fw-normal">Filtro externo</h3>
                <form onSubmit={handleSubmit(props.onSubmit)}>
                {
                    (props.fields && Array.isArray(props.fields) && props.fields.length > 0) && (props.fields.map((field, index) => 
                    {
                        return (
                            <div className="mb-3" key={index}>
                                <label htmlFor={field.name} className="form-label">{field.label}</label>
                                {
                                    (() => {
                                        switch (field.type) {
                                            case 'dateRange':
                                                return (
                                                    <DateRangeForm
                                                        key={index}
                                                        name={field.name}
                                                        control={control}
                                                        value={props.data ? props.data[field.name] : null}
                                                        placeholder={field.label ? `Seleccione ${field.label.toLowerCase()}`: 'Seleccione rango de fecha'}
                                                        minDate={field.minDate || null}
                                                        maxDate={field.maxDate || null}
                                                    />
                                                )
                
                                            default:
                                                return (
                                                    <span
                                                        key={index}
                                                    >
                                                        Default component
                                                    </span>
                                                )
                                        }
                                    })()
                                }
                                {
                                    field.info && (
                                        <Info text={field.info}/>
                                    )
                                }
                            </div>
                        )
                    }))
                }
                <div className="ef-buttons-container">
                    <button type="submit" className="btn btn-primary btn-custom">Filtrar</button>
                    <button type="button" className="btn btn-outline-secondary btn-custom ef-clear-btn" onClick={handleCleanFields}>Limpiar</button>
                </div>
                </form>
            </Card.Body>
        </Card>
    )
}