import React from "react"
import { Route } from "react-router-dom"
import { Home } from "./Home"
// import { AnimalCard } from "./animal/AnimalCard"
import { AnimalList } from "./animal/AnimalList"
import { AnimalProvider } from "./animal/AnimalProvider"
import { LocationCard } from "./location/Location"
import { EmployeeCard } from "./employee/Employee"
// import { CustomerCard } from "./customer/Customer"
import { CustomerProvider } from "./customer/CustomerProvider"
import { CustomerList } from "./customer/CustomerList"
import { EmployeeProvider } from "./employee/EmployeeProvider"
import { LocationProvider } from "./location/LocatonProvider"

export const ApplicationViews = () => {
    return (
        <>
            {/* Render the location list when http://localhost:3000/ */}
            <Route exact path="/">
                <Home />
            </Route>

            {/* Render the animal list when http://localhost:3000/animals */}
            <AnimalProvider>
                <Route exact path="/animals">
                    <AnimalList />
                </Route>
            </AnimalProvider>

            {/* Render the location list when htt:P//localhist:3000/locations */}
            <LocationProvider>
                <Route exact path="/locations">
                    <LocationCard />
                </Route>
            </LocationProvider>

            {/* Render the employee list when htt:P//localhist:3000/employees */}
            <EmployeeProvider>
                <Route exact path="/employees">
                    <EmployeeCard />
                </Route>
            </EmployeeProvider>

            {/* Render the customer list when htt:P//localhist:3000/customers */}
            <CustomerProvider>
                <Route exact path="/customers">
                    <CustomerList />
                </Route>
            </CustomerProvider>
        </>
    )
}