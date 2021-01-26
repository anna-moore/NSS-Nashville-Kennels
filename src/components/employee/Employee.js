import React from "react"
import { Link } from "react-router-dom"
import "./Employee.css"



export const EmployeeCard = ({ employee }) => {
   return (
       <section className="employee">
            <h3 className="employee__name">
                <Link to={`employees/detail/${employee.id}`}>
                    {employee.name}
                </Link>
            </h3>
            <div className="employee__address">{employee.address}</div>
        </section>


       ) 
       
   }
