import React from "react"
import { Route } from "react-router-dom"
import { Home } from "./Home"

import { AnimalProvider } from "./animal/AnimalProvider"
import { AnimalList } from "./animal/AnimalList"
import { AnimalForm } from "./animal/AnimalForm"
import { AnimalDetail } from "./animal/AnimalDetail"
import { AnimalSearch } from "./animal/AnimalSearch"

import { CustomerProvider } from "./customer/CustomerProvider"
import { CustomerList } from "./customer/CustomerList"

import { EmployeeProvider } from "./employee/EmployeeProvider"
import { EmployeeList } from "./employee/EmployeeList"
import { EmployeeForm } from "./employee/EmployeeForm"
import { EmployeeDetail } from "./employee/EmployeeDetail"

import { LocationProvider } from "./location/LocationProvider"
import { LocationList } from "./location/LocationList"
import { LocationForm } from "./location/LocationForm"
import { LocationDetail } from "./location/LocationDetails"

export const ApplicationViews = () => {
    return (
        <>
            {/* Renders when http://localhost:3000/ */}
            <Route exact path="/">
                <Home />
            </Route>

            {/* Render the animal list when http://localhost:3000/animals and the add animal form */}
            <AnimalProvider>
                <Route exact path="/animals">
                    <AnimalList />
                    <AnimalSearch />
                </Route>
            </AnimalProvider>

            {/* Render the animal form and save the new animal to api */}
            <AnimalProvider>
                <CustomerProvider>
                    <LocationProvider>
                        <Route path="/animals/create">
                            <AnimalForm />
                        </Route>
                        {/* the edit function in ch 13 */}
                        <Route path="/animals/edit/:animalId(\d+)">
                            <AnimalForm />
                        </Route>
                    </LocationProvider>
                </CustomerProvider>
            </AnimalProvider>

            {/* path for every animal detail  */}
            <AnimalProvider>
                <Route exact path="/animals/detail/:animalId(\d+)">
                    <AnimalDetail />
                </Route>
            </AnimalProvider>

            {/* Render the location list when htt:P//localhist:3000/locations */}
            <LocationProvider>
                <Route exact path="/locations">
                    <LocationList />
                </Route>
                <Route path="/locations/create">
                    <LocationForm />
                </Route>
                <Route path="/locations/edit/:locationId(\d+)">
                    <LocationForm />
                </Route>
                <Route path="/locations/detail/:locationId(\d+)">
                    <LocationDetail/>
                </Route>
            </LocationProvider>

            {/* Render the employee list when htt:P//localhist:3000/employees */}
            <EmployeeProvider>
                <Route exact path="/employees">
                    <EmployeeList />
                </Route>
                <Route exact path="/employees/detail/:employeeId(\d+)">
                    <EmployeeDetail/>
                </Route>
            </EmployeeProvider>

            <EmployeeProvider>
                <LocationProvider>
                    <Route path="/employees/create">
                        <EmployeeForm />
                    </Route>
                    <Route path="/employees/edit/:employeeId(\d+)">
                        <EmployeeForm />
                    </Route>
                </LocationProvider>
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