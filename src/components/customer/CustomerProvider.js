import React, { useState,  createContext } from "react"

export const CustomerContext = createContext()

//this is a hook???
export const CustomerProvider = (props )=>{
    //must be called set something
    //naming convention and what React wants us to do 
    //use state returns an array, with two items 
    //this intial array is empty 
    const [customers, setCustomers] = useState([])

    const getCustomers = () => {
        return fetch("http://localhost:8088/customers?_embed=animals")
        .then(res => res.json())
        .then(setCustomers)
    }
    //react updates the DOm for us like this
    const addCustomer = (customerObj) => {
        return fetch ("http://localhist:8088/customers", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(customerObj)
        })
        .then(getCustomers)
    }
    const getCustomerById = (id) => {
        return fetch(`http://localhost:8088/customers/${id}?_embed=animals`)
            .then(res => res.json())
    }

    const updateCustomer = customer => {
        return fetch(`http://localhost:8088/customers/${customer.id}?_embed=animals`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(customer)
        })
          .then(getCustomers)
      }

    return ( 
        <CustomerContext.Provider value={{
            customers, getCustomers, addCustomer, getCustomerById, updateCustomer
        }}>
            {props.children}
        </CustomerContext.Provider>
    )
}