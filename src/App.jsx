import { useState } from "react"
import Header from "./components/Header"
import PokeCard from "./components/PokeCard"
import SideNav from "./components/SideNav"

function App() {
  const [selectedPokemon, setSelectedPokemon]= useState(0)
  const [showSideNav, setShowSideNav] =useState(false)
  function toggleNav(){
    setShowSideNav(!showSideNav)
  }
  function closeNav(){
    setShowSideNav(false)
  }

  return (
    <>
      <Header toggleNav={toggleNav} />
      <SideNav toggleNav={toggleNav} closeNav={closeNav} showSideNav={showSideNav} selectedPokemon={selectedPokemon} setSelectedPokemon={setSelectedPokemon} />
      <PokeCard selectedPokemon={selectedPokemon} />
    </>
  )
}

export default App
