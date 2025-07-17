import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router';
import './index.css'
import { Home, Catalog, Admin, Profile, Player } from './pages';
import Navbar from './components/Navbar';
import Login from './pages/Login';

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>

    <Navbar></Navbar>
    <Routes>
      <Route path="/login" element={<Login/>}/>
      
      <Route path="/" element={<Home/>}/>
      <Route path="/catalog" element={<Catalog/>}/>
      <Route path="/admin" element={<Admin/>}/>
      <Route path="/profile" element={<Profile/>}/>
      <Route path="/player/:id" element={<Player/>}/>
    </Routes>
  </BrowserRouter>,
)
