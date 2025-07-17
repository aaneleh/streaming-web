import { useState, useEffect } from 'react'
import './index.css'
import { CgPlayButton } from "react-icons/cg"
import axios from 'axios'
import { Link } from 'react-router'

type Media = {
  background_color: string,
  description: string,
  font_color: string,
  headliner: boolean,
  logo: string,
  media_id: string,
  name: string,
  poster:string,
  source: string,
  type: number,
}

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
                  <img src={`src/assets/${el.logo}`}></img>
                  <p className='description'>{el.description}</p>
                  <Link className="glass button" to={`/player/${el.media_id}`}>
                    Assistir agora <CgPlayButton className='icon'/>
                  </Link>
                  <img className="poster" src={`src/assets/${el.poster}`}></img>                
                </div>
            }))
          }
        </div>
      </section>
    )
  }
}

export default Catalog
