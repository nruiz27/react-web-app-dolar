import { useState, useEffect } from 'react';
import "@amir04lm26/react-modern-calendar-date-picker/lib/DatePicker.css";
import DatePicker from '@amir04lm26/react-modern-calendar-date-picker';
import moment from 'moment';

import { datePickerConfig } from './dataPickerConfig';

export default function DateRangePicker (props) {
    const [ val, setVal ] = useState(props.value);
    const [ dateWithFormat, setDateWithFormat ] = useState('');
    const [ selectedDay, setSelectedDay ] = useState({
        from: null,
        to: null
    });
    
    const defaultMinimumDate = {
        year: 1900,
        month: 1,
        day: 1,
    }

    const defaultMaximumDate = (() => {
        const maxDate = moment().add(100, 'years').toDate();
        return {
            year: maxDate.getFullYear(),
            month: (maxDate.getMonth() + 1),
            day: maxDate.getDate(),
        };
    })();

    useEffect(() => {
        if ( !props.value || props.value === '' ) {
            setSelectedDay({
                from: null,
                to: null
            });
        } else {
            const newDate = moment(props.value.startDate, 'DD/MM/yyyy').toDate();
            const newSelectedDay = {
                year: newDate.getFullYear(),
                month: (newDate.getMonth() + 1),
                day: newDate.getDate(),
            };
            const newEndDate = moment(props.value.endDate, 'DD/MM/yyyy').toDate();
            const newSelectedEndDay = {
                year: newEndDate.getFullYear(),
                month: (newEndDate.getMonth() + 1),
                day: newEndDate.getDate(),
            };
            setSelectedDay({
                from: newSelectedDay,
                to: newSelectedEndDay
            });
        }
    }, [props.value])

    useEffect(() => {
        if (selectedDay && selectedDay.from && selectedDay.to) {
            const newDate = moment(`${selectedDay.from.day}/${selectedDay.from.month}/${selectedDay.from.year}`, 'DD/MM/yyyy').format('DD/MM/yyyy') + ' - ' +
                            moment(`${selectedDay.to.day}/${selectedDay.to.month}/${selectedDay.to.year}`, 'DD/MM/yyyy').format('DD/MM/yyyy');
            setDateWithFormat(newDate);
        } else {
            setDateWithFormat('');
        }
    }, [selectedDay]);

    useEffect(() => {
        if (selectedDay && selectedDay.from && selectedDay.to) {
            props.onChange({
                startDate: moment(`${selectedDay.from.day}/${selectedDay.from.month}/${selectedDay.from.year}`, 'DD/MM/yyyy').format('DD/MM/yyyy'),
                endDate: moment(`${selectedDay.to.day}/${selectedDay.to.month}/${selectedDay.to.year}`, 'DD/MM/yyyy').format('DD/MM/yyyy')
            });
        } else {
            props.onChange(null);
        }
    }, [dateWithFormat])

    const handleChange = (value) => {
        setVal(value);
        setSelectedDay(value);
    };

    const renderCustomInput = ({ ref }) => {
        return (
            <div className="input-group">
                <input
                    readOnly={props.readOnly !== undefined ? props.readOnly : false}
                    ref={ref}
                    placeholder={(props.placeholder !== undefined && props.placeholder !== null) ? props.placeholder : 'Seleccione fecha'}
                    value={dateWithFormat}
                    className={`dt-custom-input form-control ${ props.inputClassName ?  ` ${props.inputClassName}` : '' }`}
                    onChange={(event) => {event.preventDefault()}}
                    onKeyDown={props.onKeyDown !== undefined ? props.onKeyDown : (event) => event.preventDefault()}
                    style={{zIndex: '0'}}
                />
                <div onClick={() => handleChange({ from: null, to: null })} className={val != null ? "date-picker-icon-trash active" : "fa fa-trash date-picker-icon-trash"} aria-hidden="true">
                    <svg height="20" width="20" viewBox="0 0 20 20" aria-hidden="true" focusable="false">
                        <path d="M14.348 14.849c-0.469 0.469-1.229 0.469-1.697 0l-2.651-3.030-2.651 3.029c-0.469 0.469-1.229 0.469-1.697 0-0.469-0.469-0.469-1.229 0-1.697l2.758-3.15-2.759-3.152c-0.469-0.469-0.469-1.228 0-1.697s1.228-0.469 1.697 0l2.652 3.031 2.651-3.031c0.469-0.469 1.228-0.469 1.697 0s0.469 1.229 0 1.697l-2.758 3.152 2.758 3.15c0.469 0.469 0.469 1.229 0 1.698z"></path>
                    </svg>
                </div>
                <button
                    type="button"
                    className="btn btn-icon btn-primary inputlist-btn"
                >
                    <i className="la la-calendar-o" />
                </button>
            </div>
        );
    };

    return (
        <div className="calendar-container">
            <DatePicker
                calendarPopperPosition="bottom"
                value={selectedDay}
                onChange={handleChange}
                renderInput={renderCustomInput}
                shouldHighlightWeekends
                minimumDate={defaultMinimumDate}
                maximumDate={defaultMaximumDate}
                locale={datePickerConfig}
                colorPrimary="#646c9a"
                colorPrimaryLight="#bcc2e8"
                calendarClassName="custom-calendar"
                calendarTodayClassName="custom-today-day"
                calendarSelectedDayClassName='custom-selected-day'
            />
        </div>
    );
}