export default function Header(props){
    const {toggleNav} = props
    return(
        <header>
            <button onClick={toggleNav} className="open-nav-button">
                <i className="fa-solid fa-bars"></i>
            </button>
            <h1 className="text-gradient">Pokédex</h1>
        </header>
    )
}