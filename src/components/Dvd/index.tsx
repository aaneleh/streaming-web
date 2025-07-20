import './index.css'

function Dvd({name, color, status}: {name : string, color : string, status : boolean}) {
  
  return (
    <div style={{'backgroundColor': color}} className={`dvd glass ${status ? 'active' : ''}`}>
      <h2>{name}</h2>
    </div>
  )
}

export default Dvd
