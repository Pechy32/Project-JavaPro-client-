import React, { useEffect, useState } from "react";
import moneyFormatter from "../utils/moneyFormatter";

function PersonStatistics({ items }) {

    // Default sort persons by revenue descended 
    const sortedItems = [...items].sort((a, b) => b.revenue - a.revenue);

    return (
        <div className="table-responsive">
            <table className="table table-bordered table-hover">
                <thead>
                    <tr className="table-light">
                        <th>#</th>
                        <th>Jméno</th>
                        <th>Tržby</th>
                        <th>Tržby aktuální rok</th>
                        <th>Zisk</th>
                        <th>Zisk aktuální rok</th>
                        <th>Top produkt</th>
                        <th>Top produkt aktuální rok</th>
                    </tr>
                </thead>
                <tbody>
                    {items && sortedItems.map((stat, index) => (
                        <tr key={index + 1}>
                            <td>{index + 1}</td>
                            <td>{stat.personName}</td>
                            <td>{moneyFormatter(stat.revenue, " Kč")}</td>
                            <td>{moneyFormatter(stat.currentYearRevenue, " Kč")}</td>
                            <td>{moneyFormatter(stat.profit, " Kč")}</td>
                            <td>{moneyFormatter(stat.currentYearProfit, " Kč")}</td>
                            <td>{stat.allTimeTopProduct} {stat.allTimeTopProduct ? moneyFormatter(stat.allTimeTopProductSum, " Kč") : ""}</td>
                            <td>{stat.currentYearTopProduct} {stat.currentYearTopProduct ? moneyFormatter(stat.currentYearTopProductSum, " Kč") : ""}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
export default PersonStatistics;