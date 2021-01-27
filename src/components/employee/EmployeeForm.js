import React, { useContext, useEffect, useState } from "react"
import { LocationContext } from "../location/LocationProvider"
import { EmployeeContext } from "./EmployeeProvider"
import "./Employee.css"
import { useHistory, useParams } from 'react-router-dom';

export const EmployeeForm = () => {
    const { addEmployee, getEmployeeById, updateEmployee } = useContext(EmployeeContext)
    const { locations, getLocations } = useContext(LocationContext)

    /*
    With React, we do not target the DOM with `document.querySelector()`. Instead, our return (render) reacts to state or props.

    Define the intial state of the form inputs with useState()
    */

    const [employee, setEmployee] = useState({
      name: "",
      locationId: 0,
      address: ""
    });

    const history = useHistory();
    const { employeeId } = useParams();
    const [isLoading, setIsLoading] = useState(true);

    /*
    Reach out to the world and get locations state on initialization, 
    so we can provide their data in the form dropdowns
    */
    useEffect(() => {
      getLocations().then(() => {
        if (employeeId) {
          getEmployeeById(employeeId)
          .then(employee => {
              setEmployee(employee)
              setIsLoading(false)
          })
        } else {
          setIsLoading(false)
        }
      })
    }, [])

    //when a field changes, update state. The return will re-render and display based on the values in state
        // NOTE! What's happening in this function can be very difficult to grasp. Read it over many times and ask a lot questions about it.
    //Controlled component
    const handleControlledInputChange = (event) => {
      /* When changing a state object or array,
      always create a copy, make changes, and then set state.*/
      const newEmployee = { ...employee }
      
      newEmployee[event.target.id] = event.target.value
      // update state
      setEmployee(newEmployee)
    }

    const handleClickSaveEmployee = (event) => {
      event.preventDefault() //Prevents the browser from submitting the form

      const locationId = parseInt(employee.locationId)

      if (locationId === 0 || employee.name === "") {
        window.alert("Please select a location or enter name")
      } else {
        //invoke addEmployee passing employee as an argument.
        //once complete, change the url and display the employee list
        setIsLoading(true);
        // This is how we check for whether the form is being used for editing or creating. If the URL that got us here has an id number in it, we know we want to update an existing record of an location
        if (employeeId){
          //PUT - update
          updateEmployee({
              id: employee.id,
              name: employee.name,
              address: employee.address,
              locationId: parseInt(employee.locationId)
              
          })
          .then(() => history.push(`/employees/detail/${employee.id}`))
        }else {
          //POST - add
          addEmployee({
              name: employee.name,
              address: employee.address,
              locationId: parseInt(employee.locationId)
              
          })
          .then(() => history.push("/locations"))
        }
      }
    }

    return (
      <form className="EmployeeForm">
          <h2 className="employeeForm__title">{employeeId ? "Edit Employee" : "Add Employee"}</h2>
          <fieldset>
              <div className="form-group">
                  <label htmlFor="name">Employee name:</label>
                  <input type="text" id="name" onChange={handleControlledInputChange} required autoFocus className="form-control" placeholder="Employee name" value={employee.name}/>
              </div>
          </fieldset>
          <fieldset>
              <div className="form-group">
                  <label htmlFor="location">Assign to location: </label>
                  <select defaultValue={employee.locationId} name="locationId" id="locationId" onChange={handleControlledInputChange} className="form-control" >
                      <option value="0">Select a location</option>
                      {locations.map(l => (
                          <option key={l.id} value={l.id}>
                              {l.name}
                          </option>
                      ))}
                  </select>
              </div>
          </fieldset>
          <fieldset>
              <div className="form-group">
                  <label htmlFor="address">Employee address:</label>
                  <input type="text" id="address" onChange={handleControlledInputChange} required autoFocus className="form-control" placeholder="Employee's address" value={employee.address}/>
              </div>
          </fieldset>
          <button className="btn btn-primary"
            onClick={handleClickSaveEmployee}>
            {employeeId ? "Save Employee" : "Add Employee"}
          </button>
      </form>
    )
}