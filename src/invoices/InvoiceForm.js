import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { apiGet, apiPost, apiPut } from "../utils/api";

import InputField from "../components/InputField";
import InputSelect from "../components/InputSelect"
import FlashMessage from "../components/FlashMessage";


const InvoiceForm = () => {

    // ------------- USE STATES --------------
    const [persons, setPersons] = useState([]);
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();
    const { id } = useParams();
    const [invoice, setInvoice] = useState({
        invoiceNumber: 0,
        issued: "",
        dueDate: "",
        product: { _id: 0 },
        price: 0,
        vat: 0,
        note: "",
        seller: { _id: 0 },
        buyer: { _id: 0 },
    });
    const [sentState, setSent] = useState(false);
    const [successState, setSuccess] = useState(false);
    const [errorState, setError] = useState(null);


    // ------------- FETCHING DATA -------------
    useEffect(() => {
        apiGet("/api/persons").then((data) => setPersons(data));
        apiGet("/api/products").then((data) => setProducts(data));
    }, []);

    useEffect(() => {
        if (id) {
            apiGet("/api/invoices/" + id).then((data) => setInvoice(data));
        }
    }, [id]);

    // -------------- HANDLE FUNCTIONS -------------
    const handleSubmit = (e) => {
        e.preventDefault();

        (id ? apiPut("/api/invoices/" + id, invoice) : apiPost("/api/invoices", invoice))
            .then((data) => {
                setSent(true);
                setSuccess(true);
                navigate("/invoices", { state: { flashMessageEvent: true, flashMessageText: 'Faktura úspěšně uložena', flashMessageTheme: 'success' } });
            })
            .catch((error) => {
                console.log(error.message);
                setError(error.message);
                setSent(true);
                setSuccess(false);
            });
    };

    const sent = sentState;
    const success = successState;

    // ---------------- JSX -----------------
    return (
        <div>
            <h1>{id ? "Upravit" : "Vytvořit"} fakturu</h1>
            {errorState ? (
                <div className="alert alert-danger">{errorState}</div>
            ) : null}
            {sent && (
                <FlashMessage
                    theme={success ? "success" : ""}
                    text={success ? "Uložení faktury proběhlo úspěšně." : ""}
                />
            )}
            <form onSubmit={handleSubmit}>
                <InputField
                    required={true}
                    type="number"
                    name="invoiceNumber"
                    min="3"
                    label="Číslo faktury"
                    prompt="Zadejte číslo faktury"
                    value={invoice.invoiceNumber}
                    handleChange={(e) => {
                        setInvoice({ ...invoice, invoiceNumber: e.target.value });
                    }}
                />

                <InputField
                    required={true}
                    type="date"
                    name="issued"
                    min=""
                    label="Vydána"
                    prompt="Zadejte datum vydání"
                    value={invoice.issued}
                    handleChange={(e) => {
                        setInvoice({ ...invoice, issued: e.target.value });
                    }}
                />

                <InputField
                    required={true}
                    type="date"
                    name="dueDate"
                    min=""
                    label="Datum splatnosti"
                    prompt="Zadejte datum splatnosti"
                    value={invoice.dueDate}
                    handleChange={(e) => {
                        setInvoice({ ...invoice, dueDate: e.target.value });
                    }}
                />

                <InputSelect
                    required={false}
                    multiple={false}
                    name="product"
                    label="Produkt"
                    prompt="Zvolte produkt"
                    items={products}
                    value={invoice.product._id}
                    handleChange={(e) => {
                        setInvoice({ ...invoice, product: { _id: e.target.value } });
                    }}
                />

                <InputField
                    required={true}
                    type="number"
                    name="price"
                    min="1"
                    label="Cena"
                    prompt="Zadejte částku"
                    value={invoice.price}
                    handleChange={(e) => {
                        setInvoice({ ...invoice, price: e.target.value });
                    }}
                />

                <InputField
                    required={true}
                    type="number"
                    name="vat"
                    min="1"
                    label="DPH"
                    prompt="Zadejte DPH"
                    value={invoice.vat}
                    handleChange={(e) => {
                        setInvoice({ ...invoice, vat: e.target.value });
                    }}
                />

                <InputField
                    required={true}
                    type="text"
                    name="note"
                    min="1"
                    label="Poznámka"
                    prompt="Zadejte poznámku"
                    value={invoice.note}
                    handleChange={(e) => {
                        setInvoice({ ...invoice, note: e.target.value });
                    }}
                />

                <InputSelect
                    required={false}
                    multiple={false}
                    name="seller"
                    label="Dodavatel"
                    prompt="Zvolte prodejce"
                    items={persons}
                    value={invoice.seller._id}
                    handleChange={(e) => {
                        setInvoice({ ...invoice, seller: { _id: e.target.value } });
                    }}
                />

                <InputSelect
                    required={false}
                    multiple={false}
                    name="buyer"
                    label="Odběratel"
                    prompt="Zvolte kupujícího"
                    items={persons}
                    value={invoice.buyer._id}
                    handleChange={(e) => {
                        setInvoice({ ...invoice, buyer: { _id: e.target.value } });
                    }}
                />

                <input type="submit" className="btn btn-primary" value="Uložit" />
            </form>
        </div>
    );
};

export default InvoiceForm;
