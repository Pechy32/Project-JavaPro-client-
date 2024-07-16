const ProductTable = ({ items, deleteProduct }) => {


    return (
        <table className="table table-bordered table-hover">
            <thead className="table-light">
                <tr>
                    <th>#</th>
                    <th>Název</th>
                    <th style={{width: "80px"}}>Akce</th>
                </tr>
            </thead>
            <tbody>
                {items.map((item, index) => (
                    <tr key={index + 1}>
                        <td>{index + 1}</td>
                        <td>{item.name}</td>
                        <td>
                            <button
                                onClick={() => deleteProduct(item._id)}
                                className="btn btn-sm btn-danger"
                            >
                                Odstranit
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

export default ProductTable;