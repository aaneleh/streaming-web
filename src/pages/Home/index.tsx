import { useState } from 'react'
import { CgPlayButton } from "react-icons/cg"
import poster from '../../assets/poster-reflexoesDeUmLiquidificador.jpg'
import posterAngel from '../../assets/poster-angelsEgg.jpg'
import posterBlue from '../../assets/poster-perfectBlue.jpg'
import logo from '../../assets/logo-reflexoesDeUmLiquidificador.png'
import logoAngel from '../../assets/logo-angelsEgg.png'
import logoBlue from '../../assets/logo-perfectBlue.png'
import './index.css'
import Dvd from '../../components/Dvd'

function Home() {

  const fakeData = [
    {
    'name': 'ReflexoesDeUmLiquidificador',
    'poster': poster,
    'logo': logo,
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
  //ao clicar num 'botao' de selecionar o filme atualiza isso aqui, daí atualiza qual o botao ta em destaque e qual poster e desc aparece
  const [currentMovieId, setCurrentMovieId] = useState(1)
  
  return (
    <section className='home' style={{'backgroundColor': fakeData[currentMovieId].bgColor}}>
      <img src={fakeData[currentMovieId].poster} className="poster"/>

      <div className="content">
        <header className='info'>

          <img src={fakeData[currentMovieId].logo} className="logo"/>
          
          <p className="description" style={{'color': fakeData[currentMovieId].fontColor}}>
            {fakeData[currentMovieId].description}
          </p>
          
          <a className="glass button">
            Assistir agora <CgPlayButton className='icon'/>
          </a>
        </header>

        <div className='dvds-wrapper'>
            {
              fakeData.map(( (el, index) => {
                return <div onClick={(()=> setCurrentMovieId(index))}>
                    <Dvd  logo={el.logo} color={el.bgColor} status={index == currentMovieId}></Dvd>
                  </div>
              }))
            }
        </div>
      </div>

    </section>
  )
}

export default Home
