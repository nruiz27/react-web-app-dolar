import { useState } from 'react'
import { useController } from 'react-hook-form';

export default function InputText(props)
{
    const defaultValue = props.value ? props.value : '';
    const [ value, setValue ] = useState(defaultValue);
    const textInput = useController({ control: props.control, name: props.name, defaultValue })

    const handleChange = (event) => {
        const newValue = event.target.value;
        setValue(newValue);
        textInput.field.onChange(newValue);
    }

    return (
        <input
            type="text"
            id={props.name}
            className="form-control"
            value={value}
            placeholder={props.placeholder}
            maxLength={255}
            onChange={handleChange}
        />
    )
}