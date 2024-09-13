import { useNavigate } from 'react-router-dom';
import './login.css'
import React, {useState} from 'react';



export default function Login({onLogin, setLoading}) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
  const storedUsername = 'admin'
  const storedPassword = 'admin123';

  setLoading(true);

  setTimeout(() => {

  if (username === storedUsername && password === storedPassword) {
      onLogin();
      navigate('/')
      alert('Login successfully!');
  } else {
      setError('Invalid username or password');
    }
    setLoading(false);
    },  2000);
  };


  return (
    <div className='login'>

        <div className="loginSide">
            <div className="pic">
              <img src="Green Simple Eco Energy Logo1.png" alt="logo" />
            </div>
        </div>


        <div className="loginForm">
            <h1>LOGIN</h1>
            {error && <p className="error">{error}</p>}
            
            <form className='theForm'  onSubmit={(e) => { e.preventDefault(); handleLogin(); }}>
                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="USERNAME" required />
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="PASSWORD" required/>
                <button onClick={handleLogin} className="opacity">SUBMIT</button>
            </form>
        </div>
    </div>
  )
}
