import { useState, useEffect } from 'react'
import { useForm, type SubmitHandler } from 'react-hook-form'
import { FiTrash } from "react-icons/fi";
import axios from 'axios'
import './index.css'


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

function Admin() {

  const [medias, setMedias] = useState<[Media]>();

  const API =  import.meta.env.VITE_API

  useEffect(()=> {
    const getHeadliners = async() => {
      try{
        const res = await axios.get(`${API}/media`)
        const json = await res.data

        console.log(json)
        setMedias(json)

      } catch(err){
        console.log('err', err.response.data.message)
      }
    }
    getHeadliners()
  }, [])


  const newMedia = async(data : Media) => {
    let newMedia = {
      media_id: null,
      name: getValues("name"),
      description: getValues("description"),
      folder: getValues("folder"),
      source: getValues("source"),
      font_color: getValues("font_color"),
      background_color: getValues("background_color"),
      type: 0,
      headliner: true
    }

    try{
      const res = await axios.post(`${API}/media`, {
          name: newMedia.name,
          description: newMedia.description,
          folder: newMedia.folder,
          source: newMedia.source,
          font_color: newMedia.font_color,
          background_color: newMedia.background_color,
          type: newMedia.type,
          headliner: newMedia.headliner,
      })
      
      const data = await res.data

      console.log('res', data)

      if(res.status == 200) {
        newMedia.media_id = data.media_id
        setMedias([
          ...medias,
          newMedia
        ]
        )
      }

    } catch(err){
        console.log('err', err.response.data.message)
    }
  }

  const {
      register,
      getValues,
      handleSubmit,
      formState: { errors },
  } = useForm<Media>()

  const onSubmit: SubmitHandler<Media> = (data) => newMedia(data)


  const setHeadliner = async(media_id : string, headliner : boolean) => {
      console.log('set ' + media_id)
      console.log(' para ' + headliner)

      try{
        const res = await axios.patch(`${API}/media/${media_id}`, {
            headliner: headliner,
        })

        console.log('res', res.data.message)

        if(res.status == 200) {

          const updatedMedia = medias.map((el, index) => {
            if(el.media_id == media_id) el.headliner = !el.headliner
            return el
          })
          setMedias(updatedMedia)

        }

      } catch(err){
        console.log('err', err.response.data.message)
      }
  }

  const deleteMedia = async(media_id : string) => {
    try{
      const res = await axios.delete(`${API}/media/${media_id}`)
      
      const data = await res.data

      console.log('res', data)

      if(res.status == 200) {

        setMedias(
          medias.filter(el => el.media_id !== media_id)
        )

      }

    } catch(err){
        console.log('err', err.response.data.message)
    }

  }

  if(medias == null ) {
    () => { 
      return (<p>Nenhum filme</p>) 
    } 
  
  } else {
  
    return (
      <section className='admin'>

        <form className='media-form' onSubmit={handleSubmit(onSubmit)}>
          <h2>Nova Mídia</h2>

          <div className="form-item" >
            <label htmlFor="name">Nome</label>
            <input type="text" placeholder='Nome' {...register("name")} />
          </div>

          <div className="form-item">
            <label htmlFor="description">Descrição</label>
            <input type="text" placeholder='Descrição' {...register("description")} />
          </div>

          <div className="form-row">
            <div className="form-item">
              <label htmlFor="poster">Pasta</label>
              <input type="text" placeholder='Poster' {...register("folder")} />
            </div>

            <div className="form-item">
              <label htmlFor="logo">Vídeo</label>
              <input type="text" placeholder='Logo' {...register("source")} />
            </div>
          </div>

          <div className="form-row">
            <div className="form-item">
              <label htmlFor="font_color">Cor dos textos</label>
              <input type="text" placeholder='#FFFFFF' {...register("font_color")} />
            </div>

            <div className="form-item">
              <label htmlFor="background_color">Cor de fundo</label>
              <input type="text" placeholder='#000000' {...register("background_color")} />
            </div>
          </div>
          <input type="submit" value="Salvar" className='glass button' />
        </form>


        <div className='media-table'>
          <h2>Mídia</h2>

          <div className='media-table-header glass'>
            <p className='table-cell'>ID</p>
            <p className='table-cell'>Nome</p>
            <p className='table-cell'>Arquivos</p>
            <p className='table-cell'>Cores</p>
            <p className='table-cell'>Headliner</p>
            <p className='table-cell'>Ações</p>
          </div>

          {
            medias.map(( (el, index) => {
              return <div className='media-table-row' key={index}>
                  <p className='table-cell'>{el.media_id}</p>
                  <p className='table-cell'>{el.name}</p>
                  <div className='table-cell'>
                    <p>{el.folder}</p>
                    <p>{el.source}</p>
                  </div>
                  <div className='table-cell'>
                    <p>{el.background_color}</p>
                    <p>{el.font_color}</p>
                  </div>
                  <div className='table-cell'> 
                    <input type="checkbox" name="headliner" id="headliner" checked={el.headliner} onChange={() => setHeadliner(el.media_id, !el.headliner)}/>  
                  </div>
                  <div className='table-cell'> 
                    <p  className='icon' onClick={() => deleteMedia(el.media_id)}>
                      <FiTrash/>
                    </p>
                  </div>
                </div>
            }))
          }
        </div>
      </section>
    )
  }

}

export default Admin
