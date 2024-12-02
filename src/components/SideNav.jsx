import { useState } from "react"
import {first151Pokemon ,getFullPokedexNumber} from "../utils"
export default function SideNav(props){
    const {selectedPokemon, setSelectedPokemon, toggleNav, showSideNav, closeNav} = props
    const [searchValue, setSearchValue] =useState('')
    const fiteredPokemon=first151Pokemon.filter((ele, eleIndex)=>{
        //search by number
        if(getFullPokedexNumber(eleIndex).includes(searchValue)){return true}
        //search by name
        if(ele.toLowerCase().includes(searchValue.toLowerCase())){return true}
        return false
        
    })
    return(
        <nav className={" "+(showSideNav && "open")}>
            <div className={"header "+(showSideNav && "open")}>
                <button onClick={toggleNav} className="open-nav-button">
                    <i className="fa-solid fa-left-long"></i>             
                </button>
                <h1 className="text-gradient">Pokédex</h1>
            </div>
            <input placeholder="e.g. 001 or bulb..." value={searchValue} onChange={(e)=>{setSearchValue(e.target.value)}}/>
            {fiteredPokemon.map((pokemon, pokemonIndex)=>{
                const truePokemonNumber=first151Pokemon.indexOf(pokemon)
                return(
                    <button key={pokemonIndex} className={"nav-card "+
                        (pokemonIndex===selectedPokemon ? 'nav-card-selected' : '')}
                        onClick={()=>{
                            setSelectedPokemon(truePokemonNumber)
                            closeNav()}}>
                        <p>{getFullPokedexNumber(truePokemonNumber)}</p>
                        <p>{pokemon}</p>
                    </button>
                )
            })}
        </nav>
    )
}