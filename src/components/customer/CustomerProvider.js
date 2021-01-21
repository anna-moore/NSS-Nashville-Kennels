import React, { useState, CreateContext, createContext } from "react"

export const CustomerContext = createContext()

//this is a hook???
export const CustomerProvider = (props )=>{
    //must be called set something
    //naming convention and what React wants us to do 
    //use state returns an array, with two items 
    //this intial array is empty 
    const [customers, setCustomer] = useState([])

    const getCustomers = () => {
        //updat thus URL********
        return fetch("http://localhist:8088/customers?_expand=location")
        .then(res => res.json())
        .then(setCustomer)
    }
    //react updates the DOm for us like this
    const addCustomers = (customerObj) => {
        return fetch ("http://localhist:8088/customers", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(customerObj)
        })
        .then(getCustomers)
    }

    return (
        <CustomerContext.Provider value={{
            customers, getCustomers, addCustomers
        }}>
            {props.children}
        </CustomerContext.Provider>
    )
}