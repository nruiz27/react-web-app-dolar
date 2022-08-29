import { useEffect, useState } from 'react';
import DateRangePicker from '../date-picker/DateRangePicker';
import { useController } from 'react-hook-form';

export default function DateRangeForm(props)
{
    const [ selectedDate, setSelectedDate ] = useState(props.value);
    const dateRange = useController({ control: props.control, name: props.name, defaultValue: props.value });

    const onChangeDateRangePicker = (newDate) => {
        setSelectedDate(newDate);
        dateRange.field.onChange(newDate);
    }

    useEffect(() => {
        setSelectedDate(dateRange.field.value);
    }, [dateRange.field.value]);

    return (
        <DateRangePicker
            value={selectedDate}
            placeholder={props.placeholder}
            onChange={onChangeDateRangePicker}
            minDate={props.minDate}
            maxDate={props.maxDate}
        />
    )
}