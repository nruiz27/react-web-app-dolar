import ReactTooltip from 'react-tooltip';

export default function Tooltip(props)
{
    return (
        <ReactTooltip
            id={props.id}
            place={props.place ? props.place : 'top'}
            type="light"
            effect="solid"
            border={true}
            borderColor="#F2F3F8"
            multiline={false}
        />
    );
}