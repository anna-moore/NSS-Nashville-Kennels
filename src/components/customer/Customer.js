import React from "react"
import "./Customer.css"

export const CustomerCard = ({ customer}) => (
    <section className="customer">
        <h3 className="customer__name">{customer.name}</h3>
        <div className="customer__address">{customer.address}</div>
        <div className="customer__animals">
            <ul>{customer.animals.map((animal) => <li>{animal.name}</li>)}
            </ul>
        </div>
    </section>
)