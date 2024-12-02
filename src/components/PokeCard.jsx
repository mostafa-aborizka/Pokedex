import { useEffect, useState } from "react"
import { getFullPokedexNumber, getPokedexNumber } from "../utils"
import TypeCard from "./TypeCard"
import Modal from "./Modal"

export default function PokeCard(props){
    const {selectedPokemon}= props
    const [data ,setData]= useState(null)
    const [loading ,setLoading]=useState(false)
    const [skill, setSkill]=useState(null)
    const [loadingSkill, setLoadingSkill]=useState(false)
    const {name, stats, types, moves, sprites}= data || {}
    const imgList = Object.keys(sprites || {}).filter(val=>{
        if(!sprites[val]){return false}
        if(["versions","other"].includes(val)){return false}
        return true
    })

    async function fetchMoveData(move, moveUrl){
        if (loadingSkill || !localStorage ||!moveUrl){return}
        //define cashe
        let c = {}
        if(localStorage.getItem('pokemon-moves')){
            c = JSON.parse(localStorage.getItem('pokemon-moves'))
        }
        //check cashe for move
        if (move in c){
            setSkill(c[move])
            console.log("found move in cashe")
            return
        }
        //not in cashe ..fetch from api
        try{
            setLoadingSkill(true)
            const res = await fetch(moveUrl)
            const moveData= await res.json()
            console.log("fetched move from api",moveData)
            const description = moveData?.flavor_text_entries.filter(val => {
                return val.version_group.name == 'firered-leafgreen'
            })[0]?.flavor_text
            const skillData={
                name: move,
                description
            }

            setSkill(skillData)
            c[move]=skillData
            localStorage.setItem('pokemon-moves',JSON.stringify(c))
            

        }catch(err){
            console.log(err.message);
            
        }finally{
            setLoadingSkill(false)
        }
    }

    useEffect(()=>{
        //if loading exit logic
        if(loading || !localStorage){return}
        //check cashe for selected pokemon
        //define cache
        let cashe={}
        if(localStorage.getItem('pokedex')){
            cashe= JSON.parse(localStorage.getItem('pokedex'))
        }

        //check cashe for selected pokemon 
        if(selectedPokemon in cashe){
            setData(cashe[selectedPokemon])
            console.log("found pokemon in cashe")
            return
        }

        //not in cashe => fetch from API
        async function fetchPokemonData() {
            setLoading(true)
            try{
                const baseUrl='https://pokeapi.co/api/v2/'
                const suffix='pokemon/'+getPokedexNumber(selectedPokemon)
                const finalUrl=baseUrl+suffix
                const res = await fetch(finalUrl)
                const pokemonData = await res.json()
                setData(pokemonData)
                console.log("fetched pokemon data from api")
                //after fetch we cashe info for next time
                cashe[selectedPokemon]=pokemonData
                localStorage.setItem('pokedex', JSON.stringify(cashe))


            }catch(err){
                console.log(err.message)

            }finally{
                setLoading(false)
            }
        }
        fetchPokemonData()
    },[selectedPokemon])
    if(loading || !data){
        return(
            <div><h4>...loading</h4></div>
        )
    }
    return(
        <div className="poke-card">
            {skill && (
                <Modal handleModalClose={()=>{ setSkill(null)}}>
                <div>
                    <h6>Name</h6>
                    <h2 className="skill-name">{skill.name}</h2>
                </div>
                <div>
                    <h6>Discription</h6>
                    <p>{skill.description}</p>
                </div>
                </Modal>
            )}
            <div>
                <h4>#{getFullPokedexNumber(selectedPokemon)}</h4>
                <h2>{name}</h2>
            </div>
            <div className="type-container">
                {types.map((typeObj,typeIndex)=>{
                    return(
                        <TypeCard key={typeIndex} type={typeObj?.type?.name} />
                    )
                })}
            </div>
            <img className="default-img" src={`/pokemon/${getFullPokedexNumber(selectedPokemon)}.png`} alt={`${name}-image`} />
            <div className="img-container">
                {imgList.map((spriteUrl,spriteIndex)=>{
                    const imgUrl=sprites[spriteUrl]
                    return(
                        <img key={spriteIndex} src={imgUrl} alt={`${name}-img-${spriteUrl}`} />
                    )
                })}
            </div>
            <h3>Stats</h3>
            <div className="stats-card">
                {stats.map((statObj, statIndex)=>{
                    const {stat, base_stat}= statObj
                    return(
                        <div key={statIndex} className="stat-item">
                            <p>{stat?.name}</p>
                            <h4>{base_stat}</h4>
                        </div>
                    )
                })}
            </div>
            <h3>Moves</h3>
            <div className="pokemon-move-grid">
                {moves.map((moveObj,moveIndex)=>{
                    return(
                        <button key={moveIndex} className="button-card pokemon-move" 
                        onClick={()=>{
                            fetchMoveData(moveObj?.move?.name, moveObj?.move?.url)                            
                        }}>
                            <p>{moveObj?.move?.name}</p>
                        </button>
                    )
                })}
            </div>
        </div>
    )
}