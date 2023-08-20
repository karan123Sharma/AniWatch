// import { createContext, useContext, useEffect, useReducer } from "react";
// const GlobalContext = createContext();
// //Reducer is being used to Update the State for the initial variable/Array which is declared in the Init state
// const reducer = (state,action) =>{
//     return state
// }
// const BaseUrl = "https://api.jikan.moe/v4"
// export const AppContext = ({children}) =>{
//     const initState = {
//         popularAnime:[],
//         upcomingAnimr:[],
//         airingAnime:[],
//         pictures:[],
//         isAiring:false,
//         SearchResults:[],
//         Loading:false
//     }
//     const [state,dispatch] = useReducer(reducer,initState);
//     // Fetch Populare Anime
//      const getPopularAnime = async () =>{
//         const response = await fetch (`${BaseUrl}/top/anime?filter=bypopularity`);
//         const data = await response.json();
//         console.log(data);
//      }
//      useEffect(()=>{
//         getPopularAnime()
//      },[])
//     return (<GlobalContext.Provider value={{
//         //we are using the DOts rhe get the individual values bcs if we dont well get the Whole inintstae as an object
//         // ...  are called as Spred Operators
//         ...state,
//     }}>
//     </GlobalContext.Provider>)
// }
// export const useGlobalContext = () =>{
//     return useContext(GlobalContext);
// }
// import React, { createContext, useContext } from "react"
import { createContext, useContext, useEffect, useReducer,useState } from "react";
const GlobalContext = createContext();
const BaseUrl = "https://api.jikan.moe/v4";
export const GlobalContextProvider = ({ children }) => {
  const initState = {
    popularAnime: [],
    upcomingAnime: [],
    airingAnime: [],
    pictures: [],
    isAiring: false,
    SearchResults: [],
    Loading: false,
  };
  //reducer
  const reducer = (state, action) => {
    switch (action.type){
        case LOADING:
            return {...state,Loading:true};
        case GET_POPULAR_ANIME:
            return {...state,popularAnime:action.payload,Loading:false}
        case GET_UPCOMING_ANIME:
            return {...state,upcomingAnime:action.payload,Loading:false}
        case GET_AIRING_ANIME:
            return {...state,airingAnime:action.payload,Loading:false}
        case SEARCH:
            return {...state,SearchResults:action.payload,Loading:false}
        default:
            return state        
    }
    return state;
  };
  
  //Actions
  const LOADING = "loading";
  const SEARCH = "search";
  const GET_POPULAR_ANIME = "GET_POPULAR_ANIME";
  const GET_UPCOMING_ANIME = "GET_UPCOMING_ANIME";
  const GET_AIRING_ANIME = "GET_AIRING_ANIME";

  const [state, dispatch] = useReducer(reducer, initState);
  //Search Elements
  const [search,setsearch] = useState('');
  const handlechange = (e) =>{
      setsearch(e.target.value)
      if(e.target.value === '' ){
        state.isSearch =  false;
      }
  }
  //Handle Submit
  const handleSubmit = (e)  =>{
    e.preventDefault();
    if(search){
      searchAnime(search);
      state.isSearch= true;
    }
    else {
      state.isSearch = false;
      alert("Please enter a valid search")
    }
  };
  // Fetch Popular Anime
  const getPopularAnime = async () => {
    dispatch({type:LOADING});
    const response = await fetch(`${BaseUrl}/top/anime?filter=bypopularity`);
    const data = await response.json();
    dispatch({type:GET_POPULAR_ANIME , payload:data.data});
  };
  // Fetch Upcoming Anime
  const getUpcomingAnime = async () => {
    dispatch({type:LOADING});
    const response = await fetch(`${BaseUrl}/top/anime?filter=upcoming`);
    const data = await response.json();
    dispatch({type:GET_UPCOMING_ANIME , payload:data.data});
  };

  //search
  const searchAnime = async (anime) =>{
    const response = await fetch(`${BaseUrl}/anime?q=${anime}&order_by=popularity&sort=asc&sfw`)
    const data = await response.json();
    dispatch({type:SEARCH,payload:data.data})
  }
  //Airing
  const getAiringanime =async ()=>{
    dispatch({type:LOADING});
    const response = await fetch(`${BaseUrl}/top/anime?filter=airing`);
    const data = await response.json();
    dispatch({type:GET_AIRING_ANIME,payload:data.data});
  } 
  useEffect(() => {
    getPopularAnime();
  }, []);
  return (
    <GlobalContext.Provider value={{
      ...state,
      handlechange,
      handleSubmit,
      searchAnime,
      search,
      getPopularAnime,
      getUpcomingAnime,
      getAiringanime,
    }
    }>{children}</GlobalContext.Provider>
  );
};
export const useGlobalContext = () => {
  return useContext(GlobalContext);
};
