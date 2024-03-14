import React, {useState} from 'react'
import './App.css'

function App() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [jokes, setJokes] = useState([])

  const fetchJokes = () => {
    fetch(
      'https://v2.jokeapi.dev/joke/any?format=json&blacklistFlags=nsfw,sexist&type=single&lang=en&amount=10',
    )
      .then(response => response.json())
      .then(data => {
        if (data.error) {
          console.error('Error fetching jokes:', data.error)
        } else {
          setJokes([...data.jokes])
          console.log(data)
        }
      })
      .catch(error => console.error('Error fetching jokes:', error))
  }

  const handleLogin = e => {
    e.preventDefault()
    if (username === 'Vijaykumar' && password === '#Vijay3953') {
      setIsLoggedIn(true)
      fetchJokes()
    } else {
      alert('Enter Correct Details')
    }
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
  }

  return (
    <div className="App">
      
      {isLoggedIn ? (
        <div>
          <h1 className="h1">Welcome, {username}!</h1>
          <button onClick={handleLogout}>Logout</button>
          <h2>Jokes:</h2>
          <table style={{ borderCollapse: 'collapse', width: '100%' }}>
  <thead>
    <tr>
      <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>#</th>
      <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Joke</th>
    </tr>
  </thead>
  <tbody>
    {jokes.map((jokeObj, id) => (
      <tr key={id}>
        <td style={{ border: '1px solid #ddd', padding: '8px' }}>{id + 1}</td>
        <td style={{ border: '1px solid #ddd', padding: '8px' }}>{jokeObj.joke}</td>
      </tr>
    ))}
  </tbody>
</table>

        </div>
      ) : (
        <>
        <h1 className="h1">Login to watch jokes</h1>
        <form className="form" onSubmit={handleLogin}>
<div className='input-label-container'>
<label className="formlabel">
    Username:
    <input
      className="forminput"
      type="text"
      value={username}
      placeholder="Enter username"
      onChange={e => setUsername(e.target.value)}
      required
    />
  </label>
</div>
  <br />
  <label>
    Password:
    <input
      type="password"
      value={password}
      placeholder="Enter password"
      onChange={e => setPassword(e.target.value)}
      required
    />
  </label>
  <br />
  <button type="submit">Login</button>
</form>
</>

      )}
    </div>
  )
}

export default App