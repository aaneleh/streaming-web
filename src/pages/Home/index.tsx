import { useState, useEffect } from 'react'
import { CgPlayButton } from "react-icons/cg"
import './index.css'
import Dvd from '../../components/Dvd'
import axios from 'axios'

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

function Home() {

  const [medias, setMedias] = useState<[Media]>();
  const [currentMediaId, setCurrentMediaId] = useState(0)

  const API =  import.meta.env.VITE_API

  useEffect(()=> {

    const getHeadliners = async() => {
      try{
        const res = await axios.get(`${API}/media/headliners`)
        
        const json = await res.data

        console.log(json)
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
        <img src={`src/assets/${medias[currentMediaId].poster}`} className="poster"/>

        <div className="content">
          <header className='info'>

            <img src={`src/assets/${medias[currentMediaId].logo}`} className="logo"/>
            
            <p className="description" style={{'color': medias[currentMediaId].font_color}}>
              {medias[currentMediaId].description}
            </p>
            
            <a className="glass button">
              Assistir agora <CgPlayButton className='icon'/>
            </a>
          </header>

          <div className='dvds-wrapper'>
              {
                medias == null ? '' :
                  medias.map(( (el, index) => {
                    return <div onClick={(()=> setCurrentMediaId(index))}>
                        <Dvd  logo={el.logo} color={el.background_color} status={index == currentMediaId}></Dvd>
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
