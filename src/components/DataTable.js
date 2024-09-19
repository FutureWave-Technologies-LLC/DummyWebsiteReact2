//TODO: Make the table able to display DIFFERENT NUMBERS of data types
//Using an array prop with labels, map each label to <th> tag
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
            {/* Display fetched data in a table */}
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