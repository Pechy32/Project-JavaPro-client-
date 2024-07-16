import moneyFormatter from "../utils/moneyFormatter";

function ProductStatisticsTable({ items }) {

    // Default sort products by total turnover descended
    const sortedItems = [...items].sort((a, b) => b.totalTurnover - a.totalTurnover);

    return (
        <div>
            <table className="table table-bordered table-hover">
                <thead>
                    <tr className="table-light">
                        <th>#</th>
                        <th>Produkt</th>
                        <th>Celkový obrat</th>
                        <th>Obrat aktuální rok</th>
                    </tr>
                </thead>
                <tbody>
                    {sortedItems && sortedItems.map((stat, index) => (
                        <tr key={index + 1}>
                            <td>{index + 1}</td>
                            <td>{stat.productName}</td>
                            <td>{moneyFormatter(stat.totalTurnover, " Kč")}</td>
                            <td>{moneyFormatter(stat.currentYearTurnover, " Kč")}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default ProductStatisticsTable;