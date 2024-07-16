import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { apiGet } from "../utils/api";
import dateStringFormatter from "../utils/dateStringFormatter";
import moneyFormatter from "../utils/moneyFormatter";

const InvoiceDetail = () => {

    //---------- USE STATES -------------
    const { id } = useParams();
    const [invoice, setInvoice] = useState({});
    const [isLoading, setIsLoading] = useState(true);


    //---------- FETCHING DATA ---------
    useEffect(() => {
        setIsLoading(true);
        apiGet("/api/invoices/" + id)
            .then((data) => {
                setInvoice(data);
                setIsLoading(false);
            })
            .catch((error) => {
                console.error("Error while fetching invoice:", error);
                setIsLoading(false);
            });
    }, [id]);


    //----------- JSX ------------
    if (isLoading) {
        return (
            <>
                <div style={{ textAlign: "center", marginBottom: "8px" }}>Načítám...</div>
                <div className="d-flex justify-content-center align-items-center">
                    <div className="spinner-border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            </>
        );
    }

    return (
        <>
            <div>
                <h1>Detail faktury</h1>
                <hr></hr>
                <h2 className="mb-4 bg-light">#{invoice.invoiceNumber}</h2>

                <div className="row mb-3">
                    <div className="col-md-6">
                        <h3>Dodavatel</h3>
                        <Link className="text-decoration-none" to={"/persons/show/" + invoice.seller._id}>{invoice.seller.name} ({invoice.seller.identificationNumber})</Link>
                    </div>
                    <div className="col-md-6">
                        <h3>Odběratel</h3>
                        <Link className="text-decoration-none text-success" to={"/persons/show/" + invoice.buyer._id}>{invoice.buyer.name} ({invoice.buyer.identificationNumber})</Link>
                        
                    </div>
                </div>

                <div className="row mb-3">
                    <div className="col-md-6">
                        <h3>Vydána dne</h3>
                        {dateStringFormatter(invoice.issued, true)}
                    </div>
                    <div className="col-md-6">
                        <h3>Splatná do</h3>
                        {dateStringFormatter(invoice.dueDate, true)}
                    </div>
                </div>

                <div className="row mb-3">
                    <div className="col-md-6">
                        <h3>Produkt</h3>
                        {invoice.product.name}
                    </div>
                    <div className="col-md-6">
                        <h3>Poznámka</h3>
                        {invoice.note}
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-6">
                        <h3>Částka</h3>
                        {moneyFormatter(invoice.price, " Kč")}
                    </div>
                    <div className="col-md-6">
                        <h3>DPH</h3>
                        {invoice.vat} %
                    </div>
                </div>

            </div>
        </>
    );
};

export default InvoiceDetail;