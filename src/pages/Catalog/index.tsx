import { useState } from 'react'
import reactLogo from '../../assets/react.svg'
import viteLogo from '/vite.svg'
import posterLiquidificador from '../../assets/poster-reflexoesDeUmLiquidificador.jpg'
import posterAngel from '../../assets/poster-angelsEgg.jpg'
import posterBlue from '../../assets/poster-perfectBlue.jpg'
import logoLiquidificador from '../../assets/logo-reflexoesDeUmLiquidificador.png'
import logoAngel from '../../assets/logo-angelsEgg.png'
import logoBlue from '../../assets/logo-perfectBlue.png'
import './index.css'
import { CgPlayButton } from "react-icons/cg"

function Catalog() {

  const fakeData = [
    {
    'name': 'ReflexoesDeUmLiquidificador',
    'poster': posterLiquidificador,
    'logo': logoLiquidificador,
    'fontColor': '#000206',
    'bgColor': '#FF7616',
    'description': "O filme acompanha Elvira, uma dona de casa, busca entender o misterioso desaparecimento de seu marido, Onofre, enquanto a história do casal é narrada de forma surreal por um liquidificador, que ganhou vida após uma modificação peculiar no passado."
    },
      {
    'name': 'AngelsEgg',
    'poster': posterAngel,
    'logo': logoAngel,
    'fontColor': '#92713C',
    'bgColor': '#0D0F02',
    'description': "Angel's Egg, ou \"Tenshi no Tamago\" no original japonês, é um filme de animação dirigido por Mamoru Oshii e lançado em 1985. Este filme é frequentemente descrito como uma obra de arte surrealista e é conhecido por sua narrativa enigmática e visualmente impressionante."
    },
      {
    'name': 'PerfectBlue',
    'poster': posterBlue,
    'logo': logoBlue,
    'fontColor': '#FFFFFF',
    'bgColor': '#1A365E',
    'description': "Perfect Blue é uma animação japonesa de suspense psicológico, dirigido por Satoshi Kon, e baseado no romance do mesmo nome de Yoshikazu Takeuchi."
    }
  ] 

  return (
    <section className='catalog'>
      <div className='dvds-wrapper'>
        {
          fakeData.map(( (el, index) => {
            return <div className='catalog-dvd glass'>
                <img src={el.logo}></img>
                <p className='description'>{el.description}</p>
                <a className="glass button">
                  Assistir agora <CgPlayButton className='icon'/>
                </a>
                <img className="poster" src={el.poster}></img>                
              </div>
          }))
        }
      </div>
    </section>
  )
}

export default Catalog
