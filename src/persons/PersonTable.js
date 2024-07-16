import { Link } from "react-router-dom";

const PersonTable = ({ label, items, deletePerson }) => {
    return (
        <div>
            <table className="table table-bordered table-hover">
                <thead>
                    <tr className="table-light">
                        <th>#</th>
                        <th>Jméno</th>
                        <th>IČO</th>
                        <th>Sídlo</th>
                        <th style={{ width: "100px" }}>Akce</th>
                    </tr>
                </thead>
                <tbody>
                    {items.map((item, index) => (
                        <tr key={index + 1}>
                            <td>{index + 1}</td>
                            <td>{item.name}</td>
                            <td>{item.identificationNumber}</td>
                            <td>
                                {item.street}, {item.city}, {item.zip}, {item.country === "CZECHIA" ? "Česko" : "Slovensko"}
                            </td>
                            <td>
                                <div className="btn-group">
                                    <Link
                                        to={"/persons/show/" + item._id}
                                        className="btn btn-sm btn-info"
                                    >
                                        Zobrazit
                                    </Link>
                                    <Link
                                        to={"/persons/edit/" + item._id}
                                        className="btn btn-sm btn-warning"
                                    >
                                        Upravit
                                    </Link>
                                    <button
                                        onClick={() => deletePerson(item._id)}
                                        className="btn btn-sm btn-danger"
                                    >
                                        Odstranit
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Link to={"/persons/create"} className="btn btn-success">
                Nová osoba
            </Link>
        </div>
    );
};

export default PersonTable;
