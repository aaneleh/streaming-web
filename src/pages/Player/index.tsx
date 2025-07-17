import './index.css'
import { useParams } from "react-router";
import axios from 'axios'
import { useState, useEffect } from 'react';

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

function Player() {

    const API =  import.meta.env.VITE_API
    const { id } = useParams();
    const [ media, setMedia ] = useState<Media>()

    async function getSource() {
        try{
            const res = await axios.get(`${API}/media/${id}`)
            const data = await res.data

            console.log(data)
            setMedia(data)
            
        } catch(err){
            console.log('err', err.response.data.message)
        }
    }

    useEffect(()=>{
        console.log('awd')
        getSource()

    }, [])


if(media == null ) {
    () => { 
      return (<p>Filme não encontrado</p>) 
    } 
  
  } else {
  
    return (
      <section className='player'>
        <p>
            {media.media_id}
        </p>
        <video controls width='800' >
            <source src="/src/assets/Filme2.mkv" type="video/mp4"></source>
            <source src="/src/assets/Filme1.mp4" type="video/mp4"></source>
        </video>
      </section>
    )
  }
}

export default Player
