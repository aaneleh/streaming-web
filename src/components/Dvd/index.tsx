import './index.css'

function Dvd({logo, color, status}: {logo : string, color : string, status : boolean}) {
  
  return (
    <div style={{'backgroundColor': color}} className={`dvd glass ${status ? 'active' : ''}`}>
      <img src={logo} className="logo"/>
    </div>
  )
}

export default Dvd
