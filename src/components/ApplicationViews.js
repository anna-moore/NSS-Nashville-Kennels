import React from "react"
import { Route } from "react-router-dom"
import { Home } from "./Home"
import { AnimalList } from "./animal/AnimalList"
import { AnimalProvider } from "./animal/AnimalProvider"
import { AnimalForm } from "./animal/AnimalForm"
// import { AnimalCard } from "./animal/AnimalCard"
// import { LocationCard } from "./location/Location"
// import { EmployeeCard } from "./employee/Employee"
// import { CustomerCard } from "./customer/Customer"
import { CustomerProvider } from "./customer/CustomerProvider"
import { CustomerList } from "./customer/CustomerList"
import { EmployeeProvider } from "./employee/EmployeeProvider"
import { EmployeeList } from "./employee/EmployeeList"
import { LocationProvider } from "./location/LocationProvider"
import { LocationList } from "./location/LocationList"

export const ApplicationViews = () => {
    return (
        <>
            {/* Render the location list when http://localhost:3000/ */}
            <Route exact path="/">
                <Home />
            </Route>

            {/* Render the animal list when http://localhost:3000/animals and the add animal form */}
            <AnimalProvider>
                <Route exact path="/animals">
                    <AnimalList />
                </Route>
            </AnimalProvider>

            {/* Render the animal form and save the new animal to api */}
            <AnimalProvider>
                <CustomerProvider>
                    <LocationProvider>
                        <Route path="/animals/create">
                            <AnimalForm />
                        </Route>
                    </LocationProvider>
                </CustomerProvider>
            </AnimalProvider>


            {/* Render the location list when htt:P//localhist:3000/locations */}
            <LocationProvider>
                <Route exact path="/locations">
                    <LocationList />
                </Route>
            </LocationProvider>

            {/* Render the employee list when htt:P//localhist:3000/employees */}
            <EmployeeProvider>
                <Route exact path="/employees">
                    <EmployeeList />
                </Route>
            </EmployeeProvider>

            {/* Render the customer list when htt:P//localhist:3000/customers */}
            <CustomerProvider>
                {/* <AnimalProvider> */}
                    <Route exact path="/customers">
                        <CustomerList />
                    </Route>
                {/* </AnimalProvider> */}
            </CustomerProvider>
        </>
    )
}