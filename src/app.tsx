import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router';
import './index.css'
import { Home, Catalog, Admin, Player } from './pages';
import Navbar from './components/Navbar';
import Login from './pages/Login';

const Layout = ({children}) => {
  return(
    <>
      <Navbar></Navbar>
      <main>
        {children}
      </main>
    </>
  )

}

function App(){

    const [ token, setToken ] = useState<string>()

    const setLocalToken = (userToken : string) => {
        setToken(userToken)
        sessionStorage.setItem('token', JSON.stringify(userToken));
    }

    const getLocalToken = () => {
        const tokenString = sessionStorage.getItem('token');
        const userToken = JSON.parse(tokenString);
        return userToken?.token
    }

    useEffect(()=> {
        setToken(getLocalToken())
    },[])

    if(!token){
      return <Login setToken={setLocalToken}/>
    } 

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout><Home/></Layout>}/>
                <Route path="/catalog" element={<Layout><Catalog/></Layout>}/>
                <Route path="/admin" element={<Layout><Admin/></Layout>}/>
                <Route path="/player/:id" element={<Layout><Player/></Layout>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default App
