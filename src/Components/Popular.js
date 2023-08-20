import React from 'react'
import { useGlobalContext } from './GlobalContext'
import {Link} from 'react-router-dom'
import Sidebar from './Sidebar';
const Popular = ({rendered}) => {
    const {popularAnime,isSearch,SearchResults} = useGlobalContext();
    const conditionalRender = () =>{
        if(!isSearch && rendered === 'Popular'){
            return popularAnime?.map((anime) =>{
                return (
                <Link to={`/anime/${anime.mal_id}`} key = {anime.mal_id} alt="">
                    <img className='Popular-img' src={anime?.images?.jpg?.large_image_url}  alt=""/>
                </Link>
            )
            })
        }
        else{
            return SearchResults?.map((anime) =>{
                return (
                <Link to={`/anime/${anime.mal_id}`} key = {anime.mal_id} alt="">
                    <img className='Popular-img' src={anime?.images?.jpg?.large_image_url}  alt=""/>
                </Link>
            )
            })
        }
    }
    return (
        <div className='Main-div'>
            <div className="popular-anime">
                {conditionalRender()}
            </div>
            <Sidebar/>
        </div>
    )
}
export default Popular
