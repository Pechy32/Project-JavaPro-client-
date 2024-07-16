import PersonStatistics from "./PersonStatisticsTable"
import InvoiceStatistics from "./InvoiceStatisticsTable"
import { apiGet } from "../utils/api";
import { useState, useEffect } from "react";
import ProductStatisticsTable from "./ProductStatisticsTable";

function StatisticsIndex() {

    // ---------- USE STATES ---------
    const [personStatistics, setPersonStatistics] = useState([]);
    const [invoiceStatistics, setInvoiceStatistics] = useState({});
    const [productStatistics, setProductStatistics] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    //-------- FETCHING DATA ---------
    useEffect(() => {
        async function fetchStatistics() {
            setIsLoading(true);
            try {
                const personStatisticsData = await apiGet("/api/persons/statistics");
                setPersonStatistics(personStatisticsData);
                const invoiceStatisticsData = await apiGet("/api/invoices/statistics");
                setInvoiceStatistics(invoiceStatisticsData);
                const productStatisticsData = await apiGet("/api/products/statistics");
                setProductStatistics(productStatisticsData);
                setIsLoading(false);
            }
            catch (error) {
                console.error("Error fetching statistics:", error);
                setError("Chyba při načítání dat.");
                setIsLoading(false);
            }
        }
        fetchStatistics();
    }, []);

    // --------- PAGINATION ----------- currently not used (to use it just uncomment and set items={displayedPersonStatistics} to PersonStatistics)
    /*
    const pageSizeOptions = [
        { _id: 5, name: 5 },
        { _id: 10, name: 10 },
        { _id: 25, name: 25 },
        { _id: 50, name: 50 },
        { _id: 100, name: 100 }
    ];
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = currentPage * pageSize;
    const displayedPersonStatistics = personStatistics?.slice(startIndex, endIndex);
    const pageCount = personStatistics ? Math.ceil(personStatistics.length / pageSize) : 1;

    const handlePageSizeChange = (pageSize) => {
        setPageSize(pageSize.target.value)
    }

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };
    */

    // ------------ JSX -------------
    return (
        <div>
            <h1>Statistiky</h1>
            <hr />
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
                error ? (
                    <div className="alert alert-danger">
                        {error}
                    </div>
                ) : (
                    <>
                        <h2>Osoby</h2>

                        {/* -------- PAGINATION PAGE SIZE OPTION --------
                        <div style={{ width: "75px", marginBottom: "10px" }}>
                            <InputSelect
                                name="pageSize"
                                items={pageSizeOptions}
                                required={true}
                                handleChange={handlePageSizeChange}
                                label="Prvků&nbsp;na&nbsp;stránce"
                                prompt="#"
                                value={pageSize ? pageSize : 10}
                            />
                        </div>
                        */}
                        <PersonStatistics items={personStatistics} />

                        {/* ---------- PAGINATION PAGE NAVIGATION ----------
                        <div className="d-flex justify-content-center">
                            <Pagination>
                                {[...Array(pageCount)].map((_, i) => (
                                    <Pagination.Item
                                        key={i + 1}
                                        active={i + 1 === currentPage}
                                        onClick={() => handlePageChange(i + 1)}
                                    >
                                        {i + 1}
                                    </Pagination.Item>
                                ))}
                            </Pagination>
                        </div>
                        */}

                        <h2 className="mt-4">Faktury</h2>
                        <InvoiceStatistics items={invoiceStatistics} />

                        <h2 className="mt-4">Produkty</h2>
                        <ProductStatisticsTable items={productStatistics} />
                    </>
                )
            )}
        </div>
    );
}

export default StatisticsIndex;