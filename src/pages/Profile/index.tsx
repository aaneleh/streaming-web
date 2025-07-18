import { useState } from 'react'
import './index.css'

function Profile() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
      </div>
      <h1 className="bg-green-700">PROFILE</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default Profile
