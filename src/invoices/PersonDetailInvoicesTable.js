import { Link } from "react-router-dom";
import dateStringFormatter from "../utils/dateStringFormatter";
import moneyFormatter from "../utils/moneyFormatter";

const PersonDetailInvoicesTable = ({ items }) => {


    return (
        <div>
            <div className="table-responsive">
                <table className="table table-responsive table-hover">
                    <thead className="table-light">
                        <tr>
                            <th>Číslo faktury</th>
                            <th>Vydána</th>
                            <th>Produkt</th>
                            <th>Částka</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.map((item, index) => (
                            <tr key={index + 1}>
                                <td>
                                    <Link className="text-decoration-none text-primary" to={"/invoices/show/" + item._id}>{item.invoiceNumber}</Link>
                                </td>
                                <td>{dateStringFormatter(item.issued, true)}</td>
                                <td>{item.product.name}</td>
                                <td>{moneyFormatter(item.price, " Kč")}</td>
                            </tr>
                        ))}
                        {items.length === 0 && (
                            <tr>
                                <td colSpan="3">Žádné faktury</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PersonDetailInvoicesTable;