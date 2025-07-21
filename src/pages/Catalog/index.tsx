import { useState, useEffect } from 'react'
import './index.css'
import { CgPlayButton } from "react-icons/cg"
import axios from 'axios'
import { Link } from 'react-router'
import { type Media } from '../../types/Media';

function Catalog() {

  const [medias, setMedias] = useState<[Media]>();

  const API =  import.meta.env.VITE_API

  useEffect(()=> {

    const getHeadliners = async() => {
      try{
        const res = await axios.get(`${API}/media`)
        
        const data = await res.data

        console.log(data)
        setMedias(data)

      } catch(err){
        console.log('err', err.response.data.message)
      }
    }
    
    getHeadliners()

  }, [])

  if(medias == null ) {
    () => { 
      return (<p>Nenhum filme</p>) 
    } 
  
  } else {
  
    return (
      <section className='catalog'>
        <div className='dvds-wrapper'>
          {
            medias.map(( (el, index) => {
              return <div className='catalog-dvd glass' key={index}>
                  <h2 className='catalog-name'>{el.name}</h2>
                  <p className='catalog-description'>{el.description}</p>
                  <Link className="catalog-button glass button" to={`/player/${el.media_id}`}>
                    Assistir agora <CgPlayButton className='icon'/>
                  </Link>
                  <img className="poster" src={`src/assets/${el.folder}/poster.jpg`}></img>                
                </div>
            }))
          }
        </div>
      </section>
    )
  }
}

export default Catalog
