import Login from './components/LoginPage';
import {Routes ,BrowserRouter , Route } from 'react-router-dom';
import './App.css';
import Home from './components/Home/home';
import BreweryDetail from './components/brewerydetailcard/BreweryDetail'




function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />}/>
          <Route path="/getprofile" element={<Home />} />
          <Route path="/brewery/:id" element={<BreweryDetail />} />
        </Routes>
      </BrowserRouter>
     
    </div>
  );
}

export default App;
