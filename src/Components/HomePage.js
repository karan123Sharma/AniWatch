import React, { useState } from 'react'
import { useGlobalContext } from './GlobalContext';
import Popular from './Popular';
import Upcoming from './Upcoming';
import Airing from './Airing';

function HomePage() {
    const {handlechange,
        handleSubmit,
        searchAnime,
        search,
        getPopularAnime,
        getUpcomingAnime,
        getAiringanime} = useGlobalContext();
    const [rendered,setrendererd] = useState('Popular');

    const switchComponent = () =>{
        switch (rendered) {
            case 'Popular':
                return(<Popular rendered={rendered}/>)
            case 'Upcoming':
                return(<Upcoming rendered={rendered}/>)
            case 'Airing':
                return(<Airing rendered={rendered}/>)
            default:
                return(<Popular rendered={rendered}/>)
        }
    }
  return (
    <div>
      <header>
        <div className="logo">
            <h1>{rendered === 'Popular' ? 'Popular Anime' :
            rendered === 'Airing' ? 'Top Airing Anime': 'Upcoming' }</h1>
        </div>
        <div className="search-container">
            <div className="filter-btn-popular-filter">
                <button onClick={()=>{setrendererd('Popular')
                getPopularAnime()
                }}>
                    Popular
                </button>
            </div>
            <form action="" className='search-form' onSubmit={handleSubmit}>
                <div className="input-control">
                    <input type="text" value={search} placeholder="Search Anime" onChange={handlechange}/>
                </div>
            </form>
            <div className="filter-btn-popular-filter">
                <button onClick={()=>{
                    setrendererd('Airing')
                    getAiringanime();
                    }}>
                    Airing
                </button>
            </div>    
            <div className="filter-btn-popular-filter">
                <button onClick={()=>{setrendererd('Upcoming')
                getUpcomingAnime();
                }}>
                   Upcoming Anime
                </button>
            </div>    
        </div>
      </header>
      {switchComponent()}
    </div>
  )
}

export default HomePage
