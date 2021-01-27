import React, { useContext, useEffect, useState } from "react"
import { AnimalContext } from "./AnimalProvider"
import { AnimalCard } from "./AnimalCard"
import { useHistory } from "react-router-dom" // import from libraries before your local modules
import "./Animal.css"

export const AnimalList = () => {
  // This state changes when `getAnimals()` is invoked below
  const { animals, getAnimals, searchTerms  } = useContext(AnimalContext)

  // The useHistory hook let's us tell React which route we want to visit. We will use it to tell React to render the animal form component.
  const history = useHistory()
  const [ filteredAnimals, setFiltered ] = useState([])

  //useEffect - reach out to the world for something
  useEffect(() => {
    // console.log("AnimalList: useEffect - getAnimals")
    getAnimals()
  }, [])

  // useEffect dependency array with dependencies - will run if dependency changes (state)
  // searchTerms will cause a change
  useEffect(() => {
    if (searchTerms !== "") {
      // If the search field is not blank, display matching animals
      const subset = animals.filter(animal => animal.name.toLowerCase().includes(searchTerms))
      setFiltered(subset)
    } else {
      // If the search field is blank, display all animals
      setFiltered(animals)
    }
  }, [searchTerms, animals])

  return (
    <div className="animals">
       <h2>Animals</h2>
            <button onClick={() => {history.push("/animals/create")}}>
                Add Animal
            </button>
      {/* {
        animals.map(animal => {
          // const owner = customers.find(c => c.id === animal.customerId)
          return <AnimalCard key={animal.id} animal={animal} />
        })
      } */}
      {
        filteredAnimals.map(animal => {
          return <AnimalCard key={animal.id} animal={animal} />
        })
      }
    </div>
  )
}