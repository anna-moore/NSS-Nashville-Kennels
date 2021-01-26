import React, { useContext, useEffect, useState } from "react"
import { LocationContext } from "./LocationProvider"
import "./Location.css"
import { useParams, useHistory } from "react-router-dom"

export const LocationDetail = () => {
    const { getLocationById } = useContext(LocationContext)
  
      const [location, setLocation] = useState({})
  
      const {locationId} = useParams();
      const history = useHistory();

      useEffect(() => {
        console.log("useEffect", locationId)
        getLocationById(locationId)
        .then((response) => {
          setLocation(response)
        })
        }, [])

        const nameFunction = (array) =>{
            if(array){
                return array.map((obj)=> obj.name).join(", ")
            }
        }

        const animalName = nameFunction(location.animals)
        const employeeName = nameFunction(location.employees)
        return (
            <section className="location">
                <h3 className="location__name">{location.name}</h3>
                <div className="location__address">{location.address}</div>

                <h3>Employees</h3>
                <div className="location__employeeName">{animalName}</div>

                <h3> Current Residents</h3>
                <div className="location__employeeName">{employeeName}</div>
            </section>
        )

}