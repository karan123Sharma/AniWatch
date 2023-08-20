import GlobalContext, { useGlobalContext } from './GlobalContext';
import {BrowserRouter, Link, Route, Router, Routes} from 'react-router-dom'
import AnimeItem from './AnimeItem';
import HomePage from './HomePage';
function App() {
  const global = useGlobalContext()
  console.log(global)  
  return (
    <BrowserRouter>
    <Routes>
    <Route path='/' element={<HomePage/>}/>
    <Route path='/anime/:id' element={<AnimeItem/>}/>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
