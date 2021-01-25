import React, { useContext, useEffect, useState } from "react"
import { LocationContext } from "./LocationProvider"
// import { AnimalContext } from "../animal/AnimalProvider"
// import { CustomerContext } from "../customer/CustomerProvider"
// import { EmployeeContext } from "./EmployeeProvider"
import "./Location.css"
import { useHistory } from 'react-router-dom';

export const LocationForm = () => {
    const { addLocation } = useContext(LocationContext)
    const { locations, getLocations } = useContext(LocationContext)

    /*
    With React, we do not target the DOM with `document.querySelector()`. Instead, our return (render) reacts to state or props.
    Define the intial state of the form inputs with useState()
    */

    const [location, setLocation] = useState({
      name: "",
      address: ""
    });

    const history = useHistory();

    /*
    Reach out to the world and get locations state on initialization, 
    so we can provide their data in the form dropdowns
    */
    useEffect(() => {
      getLocations()
    }, [])

    //when a field changes, update state. The return will re-render and display based on the values in state
        // NOTE! What's happening in this function can be very difficult to grasp. Read it over many times and ask a lot questions about it.
    //Controlled component
    const handleControlledInputChange = (event) => {
      /* When changing a state object or array,
      always create a copy, make changes, and then set state.*/
      const newLocation = { ...location }
      let selectedVal = event.target.value
      // forms always provide values as strings. But we want to save the ids as numbers. This will cover both customer and location ids
      if (event.target.id.includes("Id")) {
        selectedVal = parseInt(selectedVal)
      }
      /* Location is an object with properties.
      Set the property to the new value
      using object bracket notation. */
      newLocation[event.target.id] = selectedVal
      // update state
      setLocation(newLocation)
    }

    const handleClickSaveLocation = (event) => {
      event.preventDefault() //Prevents the browser from submitting the form

      if (location.name === "" || location.address === "") {
        window.alert("Please select a location name or address")
      } else {
        //invoke addLocation passing location as an argument.
        //once complete, change the url and display the location list
        addLocation(location)
        .then(() => history.push("/locations"))
      }
    }

    return (
      <form className="LocationForm">
          <h2 className="LocationForm__title">New Location</h2>
          <fieldset>
              <div className="form-group">
                  <label htmlFor="name">Location name:</label>
                  <input type="text" id="name" onChange={handleControlledInputChange} required autoFocus className="form-control" placeholder="Location name" value={location.name}/>
              </div>
          </fieldset>
          <fieldset>
              <div className="form-group">
                  <label htmlFor="address">Location address:</label>
                  <input type="text" id="address" onChange={handleControlledInputChange} required autoFocus className="form-control" placeholder="Location's address" value={location.address}/>
              </div>
          </fieldset>
          <button className="btn btn-primary"
            onClick={handleClickSaveLocation}>
            Save Location
          </button>
      </form>
    )
}