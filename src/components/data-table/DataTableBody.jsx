import { useContext, Fragment } from 'react';
import Stack from 'react-bootstrap/Stack';
import { DataTableContext } from './context/DataTableContext';
import { v4 as uuidv4 } from 'uuid';
import Tooltip from '../Tooltip';

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
                                                            (buttons && buttons.length > 0) && (buttons.map((button, buttonIndex) => 
                                                            {
                                                                const tooltipId = uuidv4();

                                                                return (
                                                                    <Fragment key={buttonIndex}>
                                                                        <button
                                                                            type="button"
                                                                            className={`btn btn-icon btn-md btn-clean dt-btn-clean`}
                                                                            onClick={(event) => button.onPress(event, elementIndex, element)}
                                                                            data-tip={button.title} 
                                                                            data-for={tooltipId}
                                                                        >
                                                                            <i className={`la ${button.icon}`}></i>
                                                                        </button>
                                                                        <Tooltip
                                                                            id={tooltipId}
                                                                        />
                                                                    </Fragment>
                                                                );
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