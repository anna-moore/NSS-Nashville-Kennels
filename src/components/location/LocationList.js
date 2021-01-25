import React, { useContext, useEffect } from "react"
import { LocationContext } from "./LocationProvider"
import { LocationCard } from "./Location"
import { useHistory } from "react-router-dom" // import from libraries before your local modules
import "./Location.css"

export const LocationList = () => {
  // This state changes when  getLocations()` is invoked below
  const { locations, getLocations } = useContext(LocationContext)

  // The useHistory hook let's us tell React which route we want to visit. 
  //We will use it to tell React to render the animal form component.
  const history = useHistory()

  //useEffect - reach out to the world for something
  useEffect(() => {
    console.log("LocationList: useEffect - getLocations")
 getLocations()

  }, [])


  return (
    <div className= "locations">
        <h2>Locations</h2>
            <button onClick={() => {history.push("/locations/create")}}>
                Add Location
            </button>
      {console.log("LocationList: Render", locations)}
      {
     locations.map( location => {
          return <LocationCard key={location.id}  location={location} />
        })
      }
    </div>
  )
}