import { useState, useEffect } from 'react'
import { CgPlayButton } from "react-icons/cg"
import './index.css'
import Dvd from '../../components/Dvd'
import axios from 'axios'
import { Link } from 'react-router'


type Media = {
  media_id: string,
  background_color: string,
  description: string,
  font_color: string,
  name: string,
  folder: string,
  source: string,
  type: number,
  headliner: boolean
}

function Home() {

  const [medias, setMedias] = useState<[Media]>();
  const [currentMediaId, setCurrentMediaId] = useState(0)

  const API =  import.meta.env.VITE_API

  useEffect(()=> {

    const getHeadliners = async() => {
      try{
        const res = await axios.get(`${API}/media/headliners`)
        
        const json = await res.data

        setMedias(json)

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
        <section className='home' style={{'backgroundColor': medias[currentMediaId].background_color}}>
        <img src={`src/assets/${medias[currentMediaId].folder}/poster.jpg`} className="poster"/>

        <div className="content">
          <header className='info'>

            <h2 className='info-name'>{medias[currentMediaId].name}</h2>

            <p className="info-description" style={{'color': medias[currentMediaId].font_color}}>
              {medias[currentMediaId].description}
            </p>
            
            <Link className="info-button glass button" to={`/player/${medias[currentMediaId].media_id}`}>
              Assistir agora <CgPlayButton className='icon'/>
            </Link>
          </header>

          <div className='dvds-wrapper'>
              {
                medias == null ? '' :
                  medias.map(( (el, index) => {
                    return <div onClick={(()=> setCurrentMediaId(index))} key={index}>
                        <Dvd name={el.name} color={el.background_color} status={index == currentMediaId}></Dvd>
                      </div>
                  }))
                }
          </div>
        </div>
      </section>
    )
  }
  
}

export default Home
