import React, { useEffect, useState } from "react";
import { apiDelete, apiGet } from "../utils/api";
import PersonTable from "./PersonTable";
import FlashMessage from "../components/FlashMessage";
import { useLocation } from "react-router-dom";


const PersonIndex = () => {

    //---------- USE STATES ----------
    const [persons, setPersons] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    // flash message
    const location = useLocation();
    const [flashMessageTheme, setFlashMessageTheme] = useState(location.state?.flashMessageTheme || "");
    const [flashMessageText, setFlashMessageText] = useState(location.state?.flashMessageText || "");
    const [flashMessageEvent, setFlashMessageEvent] = useState(location.state?.flashMessageEvent || false);

    const deletePerson = async (id) => {
        try {
            await apiDelete("/api/persons/" + id);
            setPersons(persons.filter((item) => item._id !== id));

            // flash message
            setFlashMessageEvent(true);
            setFlashMessageText("Osoba úspěšně Smazána");
            setFlashMessageTheme("success");
        } catch (error) {
            console.log(error.message);
            alert(error.message);
        }
    };


    //---------- FETCHING DATA ----------
    useEffect(() => {
        setIsLoading(true);
        apiGet("/api/persons")
            .then((data) => {
                setPersons(data);
                setIsLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching persons:", error);
                setError("Chyba při načítání dat.");
                setIsLoading(false);
            });
    }, []);


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


    //----------- JSX ------------
    return (
        <div>
            <h1>Seznam osob</h1>
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
                <>
                    <div className="flash-message">
                        {flashMessageEvent && <FlashMessage theme={flashMessageTheme} text={flashMessageText} />}
                    </div>

                    <small>Nalezeno celkem: {persons.length} záznamů</small>

                    <PersonTable
                        deletePerson={deletePerson}
                        items={persons}
                        label="Počet osob:"
                    />
                </>
            )}
        </div>
    );

};

export default PersonIndex;