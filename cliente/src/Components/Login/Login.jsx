import React, {useEffect, useState} from 'react'
import './Login.css'
import '../../App.css'
import { Link, useNavigate } from 'react-router-dom'
import Axios from 'axios'

//Import assets 
import video1 from '../../LoginAssets/video1.mov'
import logo from '../../LoginAssets/logof.png'

//Import Icons
import {FaUserShield } from 'react-icons/fa'
import {BsFillShieldLockFill} from 'react-icons/bs'
import {AiOutlineSwapRight} from 'react-icons/ai'

const Login = () => {
  //useState hook para almacenar entradas
  const [loginUserName, setloginUserName] = useState('')
  const [loginPassword, setloginPassword] = useState('')
  const navigateTo = useNavigate()


  //Mensaje al usuario
  const [loginStatus, setloginStatus] = useState('')
  const [statusHolder, setstatusHolder] = useState('message')
  
  
    //Onclick podemos ver lo que el ususario
    const loginUser = (e) => {

      e.preventDefault();
      //Se requiere que axios cree una API que se conecte al servidor
      Axios.post('http://localhost:3002/login', {
        //Crear una variable para enviar al servidor a traves de la ruta
        loginUserName: loginUserName,
        loginPassword: loginPassword
      }).then((response)=>{
        console.log(response)
        //Las credenciales son exitosas, if para detectar si estan malas
        if(response.data.message || loginUserName ==  '' || loginPassword == ''){
          //Si la credencia no es encontrada 
          navigateTo('/') //Estara en la pagina principal si la credencial no es encontrada
          setloginStatus('Usuario no encontrado')
        }
        else{
          navigateTo('/dashboard') //Si las credenciales son encontradas me voy a dashboard
        }
      })
    }

    useEffect(() =>{
    if(loginStatus !== ''){
      setstatusHolder('showMessage')
      setTimeout(()=> {
        setstatusHolder('message')
      }, 4000)
    }
    }, [loginStatus])

    //Borrar formulario al enviar
    const onSubmit = () => {
      setloginUserName('')
      setloginPassword('')
    }


  return (
    <div className='loginPage flex'>
        <div className="container flex">

          <div className="videoDiv">
            <video src={video1} autoPlay muted loop></video>

            <div className="textDiv">
              <h2 className='title'>Haz tus pedidos mas rapido</h2>
              <p> Agiliza tus pedidos</p>
            </div>


            <div className="footerDiv flex">
              <span className="text">¿No tienes cuenta?</span>
              <Link to={'/register'}>
              <button className='btn'>Registrate</button>
              </Link>
            </div>
          </div>

          <div className='formDiv flex'>
            <div className="headerDiv">
              <img src={logo} alt="Logo Image" />
              <h3>Bienvenido de nuevo</h3>
            </div>

            <form action="" className='form grid' onSubmit={onSubmit}>
              <span className={statusHolder}> {loginStatus}</span> 

              <div className='inputDiv'>
                <label htmlFor="username">Username</label>
                <div className='input flex'>
                  <FaUserShield className='icon'/>
                  <input type="text" id='username' placeholder='Ingrese username' onChange={(event) => {
                    setloginUserName(event.target.value)
                  }}/>
                </div>
              </div>

              <div className='inputDiv'>
                <label htmlFor="password">Contraseña</label>
                <div className='input flex'>
                  <BsFillShieldLockFill className='icon'/>
                  <input type="password" id='password' placeholder='Ingrese contraseña' onChange={(event) => {
                    setloginPassword(event.target.value)
                  }}/>
                </div>
              </div>

              <button type='submit' className='btn flex' onClick={loginUser}>
                <span>Login</span>
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

export default Login
