import React, { useContext, useEffect } from "react"
import { CustomerContext } from "./CustomerProvider"
import { CustomerCard } from "./Customer"
import "./Customer.css"
import { AnimalContext } from "../animal/AnimalProvider"

export const CustomerList = () => {
  // This state changes when  getCustomers()` is invoked below
  const { customers, getCustomers } = useContext(CustomerContext)
  // const { animals, getAnimals } = useContext(AnimalContext)

  //useEffect - reach out to the world for something
  useEffect(() => {
    console.log("CustomerList: useEffect - getCustomers")
    getCustomers()
    //  .then(getAnimals)

  }, [])


  return (
    <div className= "customers">
      {console.log("CustomerList: Render", customers)}
      {
     customers.map( customer => {
        // let match = animals.find((animal) => animal.customerId === customer.id)
          return <CustomerCard key={customer.id}  customer={customer} />
        })
      }
    </div>
  )
}