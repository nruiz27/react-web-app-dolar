import { useContext, useEffect } from 'react';
import DataTableBody from './DataTableBody';
import DataTableHead from './DataTableHead';
import DataTablePagination from './DataTablePagination';
import { DataTableContext } from './context/DataTableContext';
import Card from 'react-bootstrap/Card';

import Table from 'react-bootstrap/Table';

export default function DataTable({ title, config, data, minWidth })
{
    const { setData } = useContext(DataTableContext);

    useEffect(() => {
        setData(data);
    }, [data]);

    return (
        <Card className="dt-card-container">
            <Card.Body>
                <h5 className="dt-card-title">{title}</h5>
                <Table striped bordered hover size="sm" responsive="xl" style={{ minWidth: minWidth ? minWidth : '1190px'}}>
                    <DataTableHead columns={config.columns} />
                    <DataTableBody columns={config.columns} />
                </Table>
                <div className="dt-pagination-container">
                    <DataTablePagination rowsPerPage={config.rowsPerPage ? config.rowsPerPage : null}/>
                </div>
            </Card.Body>
        </Card>
    );
}