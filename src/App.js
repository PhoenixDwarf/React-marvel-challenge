import './App.css';
import Home from './components/Home';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AllFavoritesPage from './components/AllFavoritesPage';

import { PrimeReactProvider } from 'primereact/api';
import "primereact/resources/themes/saga-blue/theme.css";   
import "primereact/resources/primereact.min.css";  
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Layout from './components/Layout';
import Character from './components/Character';


function App() {
  return (
    <PrimeReactProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<div className="App"><Home /></div>} />
            <Route path="favourites" element={<AllFavoritesPage />} />
            <Route path="character/:id" element={<Character />} />
            <Route path="*" element={<div className="App"><Home /></div>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </PrimeReactProvider>
  );
}

export default App;
