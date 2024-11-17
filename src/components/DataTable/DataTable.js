function DataTable(props) {
    const {data} = props
    let fieldNamesArray = null

    if (data[0]) {
        fieldNamesArray = Object.keys(data[0])
    } else {
        return (
            <p>No data to display</p>
        )
    }
    return (
        <div>
            <table>
                <thead>
                    <tr>
                        {fieldNamesArray.map((fieldName) => (
                            <th>{fieldName}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                {data.map((item) => (
                    <tr key={item.id}>
                        {fieldNamesArray.map((fieldName) => (
                            <td>{item[fieldName]}</td>
                        ))}
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    )
}

export default DataTable;