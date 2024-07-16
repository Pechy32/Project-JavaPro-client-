import React from "react";
import { Link } from "react-router-dom";
import dateStringFormatter from "../utils/dateStringFormatter";
import moneyFormatter from "../utils/moneyFormatter";
import { BiSort } from "react-icons/bi";

const InvoiceTable = ({ items, deleteInvoice, handleIssuedSort, handleProductSort, handleBuyerSort, handleSellerSort, handlePriceSort }) => {

   
    return (
        <div>
            <div className="table-responsive">
                <table className="table table-bordered table-hover">
                    <thead>
                        <tr className="table-light">
                            <th>#</th>
                            <th>Číslo faktury</th>
                            <th scope="col">Vydána<BiSort onClick={handleIssuedSort} cursor="pointer" /></th>
                            <th scope="col">Produkt <BiSort onClick={handleProductSort} cursor={"pointer"}/></th>
                            <th scope="col">Dodavatel <BiSort onClick={handleSellerSort} cursor={"pointer"}/></th>
                            <th scope="col">Odběratel <BiSort onClick={handleBuyerSort} cursor={"pointer"}/></th>
                            <th scope="col">Cena <BiSort onClick={handlePriceSort} cursor={"pointer"}/></th>
                            <th style={{width: "100px"}}>Akce</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.map((item, index) => (
                            <tr key={index + 1}>
                                <td>{index + 1}</td>
                                <td>{item.invoiceNumber}</td>
                                <td>{dateStringFormatter(item.issued, true)}</td>
                                <td>{item.product.name}</td>
                                <td>
                                    <Link className="text-decoration-none text-primary" to={"/persons/show/" + item.seller._id}>{item.seller.name}</Link>
                                </td>
                                <td>
                                    <Link className="text-decoration-none text-success" to={"/persons/show/" + item.buyer._id}>{item.buyer.name}</Link>
                                </td>
                                <td>{moneyFormatter(item.price, " Kč")}</td>
                                <td>
                                    <div className="btn-group">
                                        <Link
                                            to={"/invoices/show/" + item._id}
                                            className="btn btn-sm btn-info"
                                        >
                                            Zobrazit
                                        </Link>
                                        <Link
                                            to={"/invoices/edit/" + item._id}
                                            className="btn btn-sm btn-warning"
                                        >
                                            Upravit
                                        </Link>
                                        <button
                                            onClick={() => deleteInvoice(item._id)}
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
            </div>
            <Link to={"/invoices/create"} className="btn btn-success">
                Nová faktura
            </Link>
        </div>
    );
};

export default InvoiceTable;