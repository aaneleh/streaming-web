import './index.css'
import { useParams } from "react-router";
import axios from 'axios'
import { useState, useEffect } from 'react';
import { type Media } from '../../types/Media';

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
        <video controls width='800' >
            <source src={`/src/assets/${media.folder}/${media.source}`} type="video/mp4"></source>
        </video>
      </section>
    )
  }
}

export default Player
