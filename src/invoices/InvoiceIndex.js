import React, { useEffect, useState } from "react";
import { apiDelete, apiGet } from "../utils/api";
import InvoiceTable from "./InvoiceTable";
import { PaginationProvider } from "../components/PaginationProvider";
import PaginatingComponent from "../components/PaginatingComponent";
import InvoiceFilter from "./InvoiceFilter";
import dataSorter from "../utils/dataSorter";
import FlashMessage from "../components/FlashMessage";
import { useLocation } from 'react-router-dom';

const InvoiceIndex = () => {
    // ---------- USE STATES ---------
    const [invoices, setInvoices] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [personList, setPersonList] = useState([]);
    const [productList, setProductList] = useState([]);
    const [filter, setFilter] = useState({
        buyerId: undefined,
        sellerId: undefined,
        productId: undefined,
        minPrice: undefined,
        maxPrice: undefined,
        limit: undefined
    });

    // page size options for pagination
    const pageSizeOptions = [
        { _id: 5, name: 5 },
        { _id: 10, name: 10 },
        { _id: 25, name: 25 },
        { _id: 50, name: 50 },
        { _id: 100, name: 100 },
        { _id: 250, name: 250 }
    ];


    // Flash message
    const location = useLocation();
    const [flashMessageTheme, setFlashMessageTheme] = useState(location.state?.flashMessageTheme || "");
    const [flashMessageText, setFlashMessageText] = useState(location.state?.flashMessageText || "");
    const [flashMessageEvent, setFlashMessageEvent] = useState(location.state?.flashMessageEvent || false);

    // ---------- FETCHING DATA -----------
    useEffect(() => {
        setIsLoading(true);
        Promise.all([
            apiGet("/api/invoices"),
            apiGet("/api/persons"),
            apiGet("/api/products")
        ])
            .then(([invoicesData, personsData, productsData]) => {
                setInvoices(invoicesData);
                setPersonList(personsData);
                setProductList(productsData);
                setIsLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
                setError("Chyba při načítání dat.");
                setIsLoading(false);
            });
    }, []);

    // -------- HANDLE FUNCTIONS ----------
    const handleSubmit = async (e) => {
        e.preventDefault();
        const params = filter;

        const data = await apiGet("/api/invoices", params);
        setInvoices(data);
        setCurrentPage(1);
    };

    const handleReset = (e) => {
        setFilter({
            buyerId: undefined,
            sellerId: undefined,
            product: undefined,
            minPrice: undefined,
            maxPrice: undefined,
            limit: undefined
        });
    };

    const handleChange = (e) => {
        if (e.target.value === "false" || e.target.value === "true" || e.target.value === '') {
            setFilter(prevState => {
                return { ...prevState, [e.target.name]: undefined };
            });
        } else {
            setFilter(prevState => {
                return { ...prevState, [e.target.name]: e.target.value };
            });
        }
    };

    const deleteInvoice = async (id) => {
        try {
            await apiDelete("/api/invoices/" + id);
            setInvoices(invoices.filter((item) => item._id !== id));

            // flash message
            setFlashMessageEvent(true);
            setFlashMessageText("Faktura úspěšně smazána");
            setFlashMessageTheme("success");

        } catch (error) {
            console.log(error.message);
            alert(error.message);
        }
    };

    // ----------------- FLASH MESSAGE HOOK -------------
    useEffect(() => {
        let timer;
        if (flashMessageEvent) {
            timer = setTimeout(() => {
                setFlashMessageEvent(false);
            }, 3000); // Show flash message for 3 seconds
        }
    }, [flashMessageEvent]);

    // ----------------- SORTING ------------------
    const sorter = dataSorter();

    const productMap = new Map();
    const personMap = new Map();

    // mapping product, seller & buyer names to invoices
    for (const product of productList) {
        productMap.set(product._id, product.name);
    }

    for (const person of personList) {
        personMap.set(person._id, person.name);
    }

    const mapDataToInvoices = () => {
        const mappedInvoices = [...invoices];
        mappedInvoices.forEach(invoice => {

            if (invoice.product) {
                invoice.productName = productMap.get(invoice.product._id);
            }

            if (invoice.buyer) {
                invoice.buyerName = personMap.get(invoice.buyer._id);
            }

            if (invoice.seller) {
                invoice.sellerName = personMap.get(invoice.seller._id);
            }
        });
        return mappedInvoices;
    };

    const handleProductSort = () => {
        const mappedInvoices = mapDataToInvoices();
        const sortedInvoices = sorter({ param: 'productName', isDate: false, isNumber: false }, mappedInvoices);
        setInvoices(sortedInvoices);
    };

    const handleBuyerSort = () => {
        const mappedInvoices = mapDataToInvoices();
        const sortedInvoices = sorter({ param: 'buyerName', isDate: false, isNumber: false }, mappedInvoices);
        setInvoices(sortedInvoices);
    };

    const handleSellerSort = () => {
        const mappedInvoices = mapDataToInvoices();
        const sortedInvoices = sorter({ param: 'sellerName', isDate: false, isNumber: false }, mappedInvoices);
        setInvoices(sortedInvoices);
    };

    const handlePriceSort = () => {
        const sortedInvoices = sorter({ param: 'price', isDate: false, isNumber: true }, invoices);
        setInvoices(sortedInvoices);
    };

    const handleIssuedSort = () => {
        const sortedInvoices = sorter({ param: 'issued', isDate: true, isNumber: false }, invoices);
        setInvoices(sortedInvoices);
    };

    // ------------- ACTIVE FILTER COUNTING ---------------
    const [activeFiltersCount, setActiveFiltersCount] = useState(0);

    useEffect(() => {
        const activeFilters = Object.values(filter).filter(value => {
            return value !== undefined && value !== "" && value !== false && value !== 0;
        });
        setActiveFiltersCount(activeFilters.length);
    }, [filter]);

    // ----------- JSX -------------
    return (
        <div>
            <h1>Seznam faktur</h1>
            <hr></hr>
            {isLoading ? (
                <>
                    <div style={{ textAlign: "center", marginBottom: "8px" }}>Načítám...</div>
                    <div className="d-flex justify-content-center align-items-center">
                        <div className="spinner-border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div>
                </>
            ) : (
                <>
                    {error ? (
                        <div className="alert alert-danger">
                            {error}
                        </div>
                    ) : (
                        <>
                            <div className="flash-message">
                                {flashMessageEvent ? <FlashMessage theme={flashMessageTheme} text={flashMessageText} /> : ""}
                            </div>

                            <InvoiceFilter
                                handleChange={handleChange}
                                handleSubmit={handleSubmit}
                                handleReset={handleReset}
                                personList={personList}
                                productList={productList}
                                filter={filter}
                                confirm="Filtrovat faktury"
                                filtersCount={activeFiltersCount}
                            />

                            <small>Nalezeno celkem: {invoices.length} záznamů</small>

                            <PaginationProvider items={invoices} pageSizeOptions={pageSizeOptions}>
                                <PaginatingComponent>
                                    {(displayedItems) => (
                                        <InvoiceTable
                                            deleteInvoice={deleteInvoice}
                                            items={displayedItems}
                                            handleIssuedSort={handleIssuedSort}
                                            handleProductSort={handleProductSort}
                                            handleBuyerSort={handleBuyerSort}
                                            handleSellerSort={handleSellerSort}
                                            handlePriceSort={handlePriceSort}
                                        />
                                    )}
                                </PaginatingComponent>
                            </PaginationProvider>
                        </>
                    )}
                </>
            )}
        </div>
    );
};

export default InvoiceIndex;