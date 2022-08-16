import { useContext } from 'react';
import Stack from 'react-bootstrap/Stack';
import { DataTableContext } from './context/DataTableContext';

export default function DataTableBody({ columns })
{
    const { dtConfig } = useContext(DataTableContext);

    return (
        <tbody>
            {
                (dtConfig.dataPerPage && dtConfig.dataPerPage.length > 0) && (dtConfig.dataPerPage.map((element, elementIndex) => {
                    return (
                        <tr key={elementIndex}>
                            {
                                columns.map((column, columnIndex) => 
                                {
                                    const align = column.align ? column.align : 'left';
                                    
                                    switch ( column.type ) {
                                        case 'action':
                                            const { buttons } = column;
                                            return (
                                                <td 
                                                    key={columnIndex}
                                                    style={{ textAlign: align !== undefined ? align : 'left'}}
                                                >
                                                    <Stack direction="horizontal" gap={buttons.length} style={{ justifyContent: 'center' }}>
                                                        {
                                                            (buttons && buttons.length > 0) && (buttons.map((button, buttonIndex) => {
                                                                return (
                                                                    <button
                                                                        key={buttonIndex}
                                                                        type="button"
                                                                        className={`btn btn-icon btn-md btn-clean`}
                                                                        onClick={(event) => button.onPress(event, elementIndex, element)}
                                                                    >
                                                                        <i className={`la ${button.icon}`}></i>
                                                                    </button>
                                                                )
                                                            }))
                                                        }
                                                    </Stack>
                                                </td>
                                            );

                                        case 'text':
                                            return (
                                                <td 
                                                    key={columnIndex}
                                                    style={{ textAlign: align !== undefined ? align : 'left'}}
                                                >
                                                    {element[column.field]}
                                                </td>
                                            );
                                    
                                        default:
                                            return (
                                                <td 
                                                    key={columnIndex} 
                                                    style={{ textAlign: align !== undefined ? align : 'left'}}
                                                >
                                                    {element[column.field]}
                                                </td>
                                            );
                                    }
                                })
                            }
                        </tr>
                    );
                }))
            }
        </tbody>
    );
}