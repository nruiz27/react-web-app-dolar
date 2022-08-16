import { DataTableProvider } from './context/DataTableProvider';
import DataTable from './DataTable';

export default function Index(props)
{
    return (
        <DataTableProvider>
            <DataTable {...props}/>
        </DataTableProvider>
    )
}