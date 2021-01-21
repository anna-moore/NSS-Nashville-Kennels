import React from "react"
import { Route } from "react-router-dom"
import { Home } from "./Home"
// import { AnimalCard } from "./animal/AnimalCard"
import { AnimalList } from "./animal/AnimalList"
import { AnimalProvider } from "./animal/AnimalProvider"
import { LocationCard } from "./location/Location"
import { EmployeeCard } from "./employee/Employee"
import { CustomerCard } from "./customer/Customer"

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
            <Route path="/locations">
                <LocationCard />
            </Route>

            {/* Render the employee list when htt:P//localhist:3000/employees */}
            <Route path="/employees">
                <EmployeeCard />
            </Route>

            {/* Render the customer list when htt:P//localhist:3000/customers */}
            <Route path="/customers">
                <CustomerCard />
            </Route>
        </>
    )
}