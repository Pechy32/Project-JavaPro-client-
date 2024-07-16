import ProductForm from "./ProductForm";
import { apiGet, apiPost, apiPut, apiDelete } from "../utils/api";
import { useEffect, useState } from "react";
import ProductTable from "../products/ProductTable";
import FlashMessage from "../components/FlashMessage";

const ProductIndex = () => {
    // ----------- USE STATES ------------
    const [product, setProduct] = useState({ name: "" });
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    // Flash message
    const [flashMessageTheme, setFlashMessageTheme] = useState("");
    const [flashMessageText, setFlashMessageText] = useState("");
    const [flashMessageEvent, setFlashMessageEvent] = useState(false);

    // ----------- FETCHING DATA ----------
    useEffect(() => {
        const fetchProducts = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const data = await apiGet("/api/products");
                setProducts(data);
                setIsLoading(false);
            } catch (error) {
                console.error("Error fetching data:", error);
                setError("Chyba při načítání dat.");
                setIsLoading(false);
            }
        };

        fetchProducts();
    }, []);

    // ----------- HANDLE FUNCTIONS --------

    const deleteProduct = async (id) => {
        try {
            await apiDelete("/api/products/" + id);
            setProducts(products.filter((item) => item._id !== id));

            // Flash message
            setFlashMessageEvent(true);
            setFlashMessageText("Produkt úspěšně smazán");
            setFlashMessageTheme("success");
        } catch (error) {
            console.log(error.message);

            // Flash message
            setFlashMessageEvent(true);
            setFlashMessageText("Nelze smazat produkt pro který existují faktury");
            setFlashMessageTheme("danger");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const newProduct = await apiPost("/api/products", product);
            setProduct({ name: "" });

            // Flash message
            setFlashMessageEvent(true);
            setFlashMessageText("Produkt úspěšně uložen");
            setFlashMessageTheme("success");

            // Add the new product to the existing list of products
            setProducts([...products, newProduct]);
        } catch (error) {
            console.log(error.message);
            setError(error.message);
            setFlashMessageEvent(true);
            setFlashMessageText("Chyba při ukládání produktu");
            setFlashMessageTheme("danger");
        }
    };

    const handleChange = (e) => {
        setProduct({ ...product, name: e.target.value });
    };

    // ----------------- FLASH MESSAGE HOOK -------------
    useEffect(() => {
        let timer;
        if (flashMessageEvent) {
            timer = setTimeout(() => {
                setFlashMessageEvent(false);
            }, 3000); // Show flash message for 3 seconds
        }

        // Clean timeout on next trigger
        return () => clearTimeout(timer);
    }, [flashMessageEvent]);

    // ------------- JSX --------------

    return (
        <div>
            <h1>Seznam produktů</h1>
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
            ) : error ? (
                <div className="alert alert-danger">{error}</div>
            ) : (
                <div>
                    <div className="flash-message">
                        {flashMessageEvent && <FlashMessage theme={flashMessageTheme} text={flashMessageText} />}
                    </div>

                    <small>Nalezeno celkem: {products.length} záznamů</small>
                    <ProductTable items={products} deleteProduct={deleteProduct} />
                    <div style={{ width: "300px" }}>
                        <ProductForm product={product} handleChange={handleChange} handleSubmit={handleSubmit} />
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProductIndex;