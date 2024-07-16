import moneyFormatter from "../utils/moneyFormatter";

function InvoiceStatistics({ items }) {

    let allTimeInvoicesCount = 0;
    let allTimeInvoicesSum = 0;
    
    // Getting all-time statistics
    for (let i = 0; i < items.length; i++) {
        allTimeInvoicesCount += items[i].invoicesCount;
        allTimeInvoicesSum += items[i].invoicesSum;
    }

    // ----------------- JSX -----------------
    return (
        <div className="table-responsive">
            <table className="table table-bordered table-hover">
                <thead>
                    <tr className="table-light">
                        <th>Rok</th>
                        <th>Počet faktur</th>
                        <th>Bilance</th>
                        <th>Top produkt</th>
                    </tr>
                </thead>
                <tbody>
                    {items && items.map((stat, index) => (
                        <tr key={index + 1}>
                            <td>{stat.year}</td>
                            <td>{stat.invoicesCount}</td>
                            <td>{moneyFormatter(stat.invoicesSum, " Kč")}</td>
                            <td>{stat.topProduct} {moneyFormatter(stat.topProductSum, " Kč")}</td>
                        </tr>
                    ))}
                </tbody>
                <tfoot>
                    <tr style={{ border: "2px solid" }}>
                        <td style={{ fontWeight: "bold" }}>Celkem</td>
                        <td style={{ fontWeight: "bold" }}>{allTimeInvoicesCount}</td>
                        <td style={{ fontWeight: "bold" }}>{moneyFormatter(allTimeInvoicesSum, " Kč")}</td>
                    </tr>
                </tfoot>

            </table>
        </div>
    );
}

export default InvoiceStatistics;