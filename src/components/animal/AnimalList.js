import React, { useContext, useEffect } from "react"
import { AnimalContext } from "./AnimalProvider"
import { AnimalCard } from "./AnimalCard"
import { useHistory } from "react-router-dom" // import from libraries before your local modules
import "./Animal.css"

export const AnimalList = () => {
  // This state changes when `getAnimals()` is invoked below
  const { animals, getAnimals } = useContext(AnimalContext)

  // The useHistory hook let's us tell React which route we want to visit. We will use it to tell React to render the animal form component.
  const history = useHistory()

  //useEffect - reach out to the world for something
  useEffect(() => {
    console.log("AnimalList: useEffect - getAnimals")
    getAnimals()

  }, [])


  return (
    <div className="animals">
       <h2>Animals</h2>
		    <button onClick={() => {history.push("/animals/create")}}>
            Add Animal
        </button>

      {/* {console.log("AnimalList: Render", animals)} */}
      {
        animals.map(animal => {
          // const owner = customers.find(c => c.id === animal.customerId)
          return <AnimalCard key={animal.id} animal={animal} />
        })
      }
    </div>
  )
}