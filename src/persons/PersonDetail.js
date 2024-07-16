import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { apiGet } from "../utils/api";
import Country from "./Country";
import { PaginationProvider } from "../components/PaginationProvider";
import PaginatingComponent from "../components/PaginatingComponent";
import PersonDetailInvoicesTable from "../invoices/PersonDetailInvoicesTable";

const PersonDetail = () => {

    // ------------ USE STATES --------------
    const { id } = useParams();
    const [person, setPerson] = useState({});
    const [purchases, setPurchases] = useState([]);
    const [sales, setSales] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    // page size options for pagination
    const pageSizeOptions = [
        { _id: 5, name: 5 },
        { _id: 10, name: 10 },
        { _id: 25, name: 25 },
        { _id: 50, name: 50 },
        { _id: 100, name: 100 },
        { _id: 250, name: 250 }
    ];

    // translated country const
    const country = Country.CZECHIA === person.country ? "Česká republika" : "Slovensko";


    // ------------- FETCHING DATA ------------
    useEffect(() => {
        setIsLoading(true);
        try {
            apiGet("/api/persons/" + id)
                .then((data) => {
                    setPerson(data);
                    setIsLoading(false);
                })
                .catch((error) => {
                    setError(error.message);
                    setIsLoading(false);
                });
        } catch (error) {
            setError(error.message);
            setIsLoading(false);
        }
    }, [id]);

    
    useEffect(() => {
        if (!error && !isLoading && person.identificationNumber) {
            apiGet(`/api/identification/${person.identificationNumber}/purchases`)
                .then((data) => setPurchases(data))
                .catch((error) => setError(error.message));
        }
    }, [error, isLoading, person]);

    useEffect(() => {
        if (!error && !isLoading && person.identificationNumber) {
            apiGet(`/api/identification/${person.identificationNumber}/sales`)
                .then((data) => setSales(data))
                .catch((error) => setError(error.message));
        }
    }, [error, isLoading, person]);


    // ------------- JSX --------------
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

    if (error) {
        return <div className="alert alert-danger">{error}</div>;
    }


    return (
        <div className="container-fluid">
            <h1>Detail osoby</h1>
            <hr></hr>
            <h3 className="bg-light">{person.name} ({person.identificationNumber})</h3>
            <div className="row">

                {/* --------- Person Detail ---------  */}

                <div className="col-md-6">
                    <div>
                        <p>
                            <strong>DIČ:</strong>
                            <br />
                            {person.taxNumber}
                        </p>
                        <p>
                            <strong>Bankovní účet:</strong>
                            <br />
                            {person.accountNumber}/{person.bankCode} ({person.iban})
                        </p>
                        <p>
                            <strong>Tel.:</strong>
                            <br />
                            {person.telephone}
                        </p>
                        <p>
                            <strong>Mail:</strong>
                            <br />
                            {person.mail}
                        </p>
                        <p>
                            <strong>Sídlo:</strong>
                            <br />
                            {person.street}, {person.city}, {person.zip}, {country}
                        </p>
                        <p>
                            <strong>Poznámka:</strong>
                            <br />
                            {person.note}
                        </p>
                    </div>
                </div>

                {/* --------- Person Sales ---------  */}

                <div className="col-md-6">
                    <div>
                        <h2>Vydané faktury</h2>
                        <small>Nalezeno celkem: {sales.length} záznamů</small>

                        <PaginationProvider items={sales} pageSizeOptions={pageSizeOptions}>
                            <PaginatingComponent>
                                {(displayedItems) => (
                                   <PersonDetailInvoicesTable items={displayedItems}/>
                                )}
                            </PaginatingComponent>
                        </PaginationProvider>


                        <hr></hr>

                        {/* --------- Person Purchases ---------  */}

                        <h2>Přijaté faktury</h2>
                        <small>Nalezeno celkem: {purchases.length} záznamů</small>

                        <PaginationProvider items={purchases} pageSizeOptions={pageSizeOptions}>
                            <PaginatingComponent>
                                {(displayedItems) => (
                                   <PersonDetailInvoicesTable items={displayedItems}/>
                                )}
                            </PaginatingComponent>
                        </PaginationProvider>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default PersonDetail;