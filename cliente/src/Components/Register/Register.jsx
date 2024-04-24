import React, {useState} from 'react'
import './Register.css'
import '../../App.css'
import { Link, useNavigate} from 'react-router-dom'
import Axios from 'axios'

//Import assets 
import video1 from '../../LoginAssets/video1.mov'
import logo from '../../LoginAssets/logof.png'

//Import Icons
import {FaUserShield } from 'react-icons/fa'
import {BsFillShieldLockFill} from 'react-icons/bs'
import {AiOutlineSwapRight} from 'react-icons/ai'
import {MdMarkEmailRead} from 'react-icons/md'

const Register = () => {
  //UseState para guardar las entradas
  const [email, setEmail] = useState('')
  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const navigateTo = useNavigate()

  //Onclick podemos ver lo que el ususario
  const createUser = (e) => {
    e.preventDefault()
    //Se requiere que axios cree una API que se conecte al servidor
    Axios.post('http://localhost:3002/register', {
      //Crear una variable para enviar al servidor a traves de la ruta
      Email: email,
      UserName: userName,
      Password: password
    }).then(()=>{
      //Al registrarse, redirigiremos al usuario a la página de inicio de sesión
      navigateTo('/')

      //Tambien limpiar los campos 
      setEmail('')
      setUserName('')
      setUserName('')
    })
  }

  return (
    <div className='registerPage flex'>
        <div className="container flex">

          <div className="videoDiv">
            <video src={video1} autoPlay muted loop></video>

            <div className="textDiv">
              <h2 className='title'>Haz tus pedidos mas rapido</h2>
              <p> Agilza tus pedidos</p>
            </div>


            <div className="footerDiv flex">
              <span className="text">¿Tienes cuenta?</span>
              <Link to={'/'}>
              <button className='btn'>Login</button>
              </Link>
            </div>
          </div>

          <div className='formDiv flex'>
            <div className="headerDiv">
              <img src={logo} alt="Logo Image" />
              <h3>Dejanos conocerte</h3>
            </div>

            <form action="" className='form grid'>

              <div className='inputDiv'>
                <label htmlFor="email">Email</label>
                <div className='input flex'>
                  <MdMarkEmailRead className='icon'/>
                  <input type="email" id='email' placeholder='Ingrese Email' onChange={(event) => {
                    setEmail(event.target.value)
                  }}/>
                </div>
              </div>

              <div className='inputDiv'>
                <label htmlFor="usermame">Username</label>
                <div className='input flex'>
                  <FaUserShield className='icon'/>
                  <input type="text" id='username' placeholder='Ingrese Username' onChange={(event) => {
                    setUserName(event.target.value)
                  }}/>
                </div>
              </div>

              <div className='inputDiv'>
                <label htmlFor="password">Contraseña</label>
                <div className='input flex'>
                  <BsFillShieldLockFill className='icon'/>
                  <input type="password" id='password' placeholder='Ingrese contraseña' onChange={(event) => {
                    setPassword(event.target.value)
                  }}/>
                </div>
              </div>

              <button type='submit' className='btn flex' onClick={createUser}>
                <span>Register</span>
                <AiOutlineSwapRight className='icon'/>
              </button>

              <span className='forgotPassword'>
                ¿Olvidaste tu contraseña? <a href="">Presiona aqui</a>
              </span>

            </form>
          </div>


        </div>
    </div>
  )
}

export default Register
