import { useContext, useEffect } from 'react';
import DataTableBody from './DataTableBody';
import DataTableHead from './DataTableHead';
import DataTablePagination from './DataTablePagination';
import { DataTableContext } from './context/DataTableContext';
import Card from 'react-bootstrap/Card';

import Table from 'react-bootstrap/Table';

export default function DataTable({ title, config, data, rowsPerPage })
{
    const defaultRowPerPage = (rowsPerPage !== undefined) ? rowsPerPage : 5;
    const { dtConfig, setData, setDataPerPage } = useContext(DataTableContext);

    useEffect(() => {
        setData(data);
    }, [data]);

    useEffect(() => {
        setDataPerPage(data.slice(dtConfig.page, dtConfig.page + defaultRowPerPage));
    }, [dtConfig.data, dtConfig.page]);

    return (
        <Card style={{ marginBottom: '30px' }}>
            <Card.Body>
                <h5 style={{ fontWeight: '400', fontSize: '18px' }}>{title}</h5>
                <Table striped bordered hover size="sm" responsive="sm">
                    <DataTableHead columns={config.columns} />
                    <DataTableBody columns={config.columns} />
                </Table>
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end'}}>
                    <DataTablePagination rowsPerPage={config.rowsPerPage ? config.rowsPerPage : null}/>
                </div>
            </Card.Body>
        </Card>
    );
}