import React, { useState,  createContext } from "react"

export const LocationContext = createContext()

//this is a hook???
export const LocationProvider = (props )=>{
    //must be called set something
    //naming convention and what React wants us to do 
    //use state returns an array, with two items 
    //this intial array is empty 
    const [locations, setLocations] = useState([])

    const getLocations = () => {
        return fetch("http://localhost:8088/locations?_embed=employees&_embed=animals")
        .then(res => res.json())
        .then(setLocations)
    }
    //react updates the DOm for us like this
    const addLocation = (LocationObj) => {
        return fetch ("http://localhost:8088/locations", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(LocationObj)
        })
        .then(getLocations)
    }

    const getLocationById = (id) => {
        return fetch(`http://localhost:8088/locations/${id}?_embed=employees&_embed=animals`)
            .then(res => res.json())
    }

    const updateLocation = location => {
        return fetch(`http://localhost:8088/locations/${location.id}?_embed=employees&_embed=animals"`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(location)
        })
          .then(getLocations)
      }

    return (
        <LocationContext.Provider value={{
            locations, getLocations, addLocation, getLocationById, updateLocation
        }}>
            {props.children}
        </LocationContext.Provider>
    )
}