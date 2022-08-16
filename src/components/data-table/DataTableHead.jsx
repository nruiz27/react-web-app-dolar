export default function DataTableHead({ columns })
{
    return (
        <thead>
            <tr>
                {
                    (columns && columns.length > 0) && (columns.map((column, index) => 
                    {
                        let align = column.align ? column.align : 'left';

                        return (
                            <th
                                key={index}
                                style={{ textAlign: align }}
                            >
                                {column.name}
                            </th>
                        )
                    }))
                }
            </tr>
        </thead>
    );
}