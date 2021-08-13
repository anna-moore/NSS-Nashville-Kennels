import React, { useContext, useEffect, useState } from "react"
import { LocationContext } from "../location/LocationProvider"
import { AnimalContext } from "../animal/AnimalProvider"
import { CustomerContext } from "../customer/CustomerProvider"
import "./Animal.css"
import { useHistory, useParams } from 'react-router-dom';

export const AnimalForm = () => {
    const { addAnimal, getAnimalById, updateAnimal  } = useContext(AnimalContext)
    const { locations, getLocations } = useContext(LocationContext)
    const { customers, getCustomers } = useContext(CustomerContext)

    const [isLoading, setIsLoading] = useState(true);
    const {animalId} = useParams();
    const history = useHistory();

    const [animal, setAnimal] = useState({
      name: "",
      breed: "",
      locationId: 0,
      customerId: 0
    });


    /*
    Reach out to the world and get customers state
    and locations state on initialization, so we can provide their data in the form dropdowns
    */
    useEffect(() => {
      getCustomers().then(getLocations).then(() => {
        if (animalId) {
          getAnimalById(animalId)
          .then(animal => {
              setAnimal(animal)
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
      const newAnimal = { ...animal }
      // forms always provide values as strings. But we want to save the ids as numbers. This will cover both customer and location ids
      // if (event.target.id.includes("Id")) {
      //   selectedVal = parseInt(selectedVal)
      // }
      /* Animal is an object with properties.
      Set the property to the new value
      using object bracket notation. */
      newAnimal[event.target.id] = event.target.value
      // update state
      setAnimal(newAnimal)
    }

    const handleClickSaveAnimal = (event) => {
      event.preventDefault() //Prevents the browser from submitting the form

      //const locationId = animal.locationId
      // const customerId = animal.customerId

      if (parseInt(animal.locationId) === 0 || parseInt(animal.customerId) === 0) {
        window.alert("Please select a location and a customer")
      } else {
        //disable the button - no extra clicks
        setIsLoading(true);
        // This is how we check for whether the form is being used for editing or creating. If the URL that got us here has an id number in it, we know we want to update an existing record of an animal
        if (animalId){
          //PUT - update
          updateAnimal({
              id: animal.id,
              name: animal.name,
              breed: animal.breed,
              locationId: parseInt(animal.locationId),
              customerId: parseInt(animal.customerId)
          })
          .then(() => history.push(`/animals/detail/${animal.id}`))
        }else {
          //POST - add
          addAnimal({
              name: animal.name,
              breed: animal.breed,
              locationId: parseInt(animal.locationId),
              customerId: parseInt(animal.customerId)
          })
          .then(() => history.push("/animals"))
        }
      }
    }

    return (
      <form className="animalForm">
          <h2 className="animalForm__title">{animalId ? "Edit Animal" : "Add Animal"}</h2>
          <fieldset>
              <div className="form-group">
                  <label htmlFor="name">Animal Name:</label>
                  <input type="text" id="name"  onChange={handleControlledInputChange} 
                  required autoFocus className="form-control" placeholder="Animal name" value={animal.name}/>
              </div>
          </fieldset>
          <fieldset>
              <div className="form-group">
                  <label htmlFor="breed">Animal Breed:</label>
                  <input type="text" id="breed" onChange={handleControlledInputChange} 
                  required autoFocus className="form-control" placeholder="Animal breed" value={animal.breed}/>
              </div>
          </fieldset>
          <fieldset>
              <div className="form-group">
                  <label htmlFor="location">Assign to Location: </label>
                  <select value={animal.locationId} name="locationId" id="locationId" 
                  onChange={handleControlledInputChange} className="form-control" >
                      <option value="0">Select a Location</option>
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
                  <label htmlFor="customerId">Customer: </label>
                  <select value={animal.customerId} name="customer" id="customerId" onChange={handleControlledInputChange} className="form-control" >
                      <option value="0">Select a Customer</option>
                      {customers.map(c => (
                          <option key={c.id} value={c.id}>
                              {c.name}
                          </option>
                      ))}
                  </select>
              </div>
          </fieldset>
          <button className="btn btn-primary"
            onClick={handleClickSaveAnimal}>
            {animalId ? "Save Animal" : "Add Animal"}
          </button>
      </form>
    );
};