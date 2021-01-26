import React, { useContext, useEffect, useState } from "react"
import { EmployeeContext } from "./EmployeeProvider"
import "./Employee.css"
import { useParams, useHistory } from "react-router-dom"
import { AnimalProvider } from "../animal/AnimalProvider"

export const EmployeeDetail = () => {
    const { getEmployeeById } = useContext(EmployeeContext)

    const [employee, setEmployee] = useState({})

    const { employeeId } = useParams()
    const history = useHistory()

    useEffect( () => {
        console.log("useEffect", employeeId)
        getEmployeeById(employeeId)
        .then((response) =>{
            setEmployee(response)
        })
    }, [])

    return (
        <section className="employee">
            <h3 className="employee__name">{employee.name}</h3>
            <div className="employee__address">Employee's Address: {employee.address}</div>
            <div className="employee__location">Location: {employee.location?.name}</div>
        </section>
    )
}