import React, { useContext } from 'react'
import { Link } from 'react-router-dom';
import { useGlobalContext } from './GlobalContext'

function Sidebar() {
    const {popularAnime} = useGlobalContext();
    const sorted = popularAnime?.sort((a,b) =>{
        return a.score - b.score
    })
  return (
    <div>
    <div className="anime-sidebar">
    <h3>
        Top 5 Popular
    </h3>

    <div className="anime">
        {sorted?.slice(0,5).map((anime)=>{
            return <Link to ={`/anime/${anime.mal_id}`} key = {anime.mal_id}>
            <img className="Popular-img-sidebar" src={anime.images.jpg.large_image_url} alt="" />
            <h5>{anime.title}</h5>
            </Link>
        } )}
    </div>
    </div>
    </div>
  )
}

export default Sidebar
