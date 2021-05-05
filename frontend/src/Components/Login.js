import React, { useState } from 'react'
import '../assets/css/login.css'
import { LoadingCircles } from "./Loading";

const Login =(props)=>{

    let [showResetPasswordMessage, toggleShowResetPasswordMessage]=useState(false)
    let [hidepassword, toggleHidePassword] = useState(true)

    const {email, 
           password,
           parenState, 
           handleLogin, 
           handleSigUp,
           hasAccount,
           passwordError,
           emailError,
           loading,
           newPassword,
           resetPassword} = props

    return(
        <section className="login">
            <div className="loginContainer">
                {(showResetPasswordMessage)&&<p>Revisa tu correo electrónico para restablecer la contraseña</p>}
                <label>Email</label>
                <input type="email"
                       autoFocus   
                       required 
                       value={email} 
                       onChange={e=>{
                           parenState({email:e.target.value})
                       }} />
                       
                <p className="errorMsg">{emailError}</p>
                <label>Contraseña</label>
                <div className="passwordContainer">
                <input type={hidepassword?"password":"text"}
                       required
                       value={password}
                       onChange={e=>{
                           parenState({password:e.target.value})
                       }}
                       onKeyDown={ (ev)=>{
                            if(ev.key==="Enter"){
                                handleLogin()
                            }
                         }
                       }
                />
                <input type="checkbox" id="hidepassword" className="togglePassword"  onChange={()=>{toggleHidePassword(!hidepassword)}}></input>
                <label for="hidepassword" htmlFor="hidepassword" className="hidePasswordImage"/>
                </div>
                <p className="errorMsg">{passwordError}</p>
                <div className="btnContainer">
                    
                    {
                    hasAccount?
                    (<>
                        {loading?(
                            <button className="signUpBtn">
                             <LoadingCircles />
                             </button>):
                             <button className="signUpBtn" onClick={handleLogin}>Ingresar</button>
                        }

                        {newPassword&&<p className="resetPassword"><span onClick={()=>{

                            if(!showResetPasswordMessage)
                            {
                            resetPassword()
                            toggleShowResetPasswordMessage(true)}

                        }} >Restablecer Contraseña</span></p>}
                        <p>Sin cuenta?
                            <span className="regist" onClick={()=>{parenState({hasAccount:false})}}>
                            Registrarse
                            </span>
                        </p>
                    
                    </>)
                    :(<>
                        {loading?(
                            <button className="registBtn">
                             <LoadingCircles />
                             </button>):
                            <button className="registBtn" onClick={handleSigUp}>Registrarse</button>
                        }
                        <p>Tienes una cuenta?
                            <span className="logWithAcount" onClick={()=>{parenState({hasAccount:true})}}>
                                Ingresar con cuenta
                            </span>
                        </p>
                    </>)
                    }
                </div>
            </div>
        </section>
    )
}

export default Login