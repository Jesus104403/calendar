
import { useEffect, useMemo } from 'react';
import Swal from 'sweetalert2';
import { useAuthStore, useForm } from '../../hooks';
import './LoginPage.css';

const loginFormFields = {
    loginEmail: '',
    loginPassword: '',
}

const registerFormFields = {
    registerName:      '',
    registerEmail:     '',
    registerPassword:  '',
    registerPassword2: '',
}



export const LoginPage = () => {


    const { status, startLogin, startGooGleSignIn,  startRegister, errorMessage } = useAuthStore();

    const { loginEmail, loginPassword, onInputChange:onLoginInputChange } = useForm( loginFormFields );
    const {  registerName, registerEmail,  registerPassword, registerPassword2, onInputChange:onRegisterInputChange } = useForm( registerFormFields );

    
    const loginSubmit = ( event ) => {
        event.preventDefault();
        startLogin({ email: loginEmail, password: loginPassword });
    }
    
    
    const registerSubmit = ( event ) => {
        event.preventDefault();
        if( registerPassword !== registerPassword2 ) {
            Swal.fire('Error en registro', 'Contraseñas no son iguales', 'error');
            return;
        }
        startRegister({ email:registerEmail, password:registerPassword, displayName: registerName });
    }
    
    const onGoogleSignIn = () => {
        console.log('onGoogleSignIn')
        startGooGleSignIn();
    }
   
    const isAuthenticating = useMemo( () => status === 'checking', [status] ); 

    useEffect(() => {
        if( errorMessage !== null ) {
            Swal.fire('Error en la autenticacion', errorMessage, 'error' )
        }
      
      }, [errorMessage])
  

    return (
        <div className='fund'>
        <div className="container login-container animate__animated animate__fadeIn animate__faster">
            <div className="row">
                <div className="col-md-6 login-form-1">
                    <h3>Ingreso</h3>
                    <form onSubmit={ loginSubmit } className='animate__animated animate__fadeIn animate__faster' >
                        <div className="form-group mb-2">
                            <input 
                                type="text"
                                className="form-control"
                                placeholder="Correo"
                                name="loginEmail"
                                value={ loginEmail }
                                onChange={ onLoginInputChange }
                            />
                        </div>
                        <div className="form-group mb-2">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Contraseña"
                                name="loginPassword"
                                value={ loginPassword }
                                onChange={ onLoginInputChange }
                            />
                        </div>
                        <div className="btnLogin ">
                            <div>
                                <button
                                  disabled={ isAuthenticating }
                                  type="submit" 
                                  className="btnSubmitLogin">
                                    Login
                                </button>
                            </div>
                      <div>
                          <button 
                          disabled={ isAuthenticating }
                          onClick={onGoogleSignIn} 
                          className="btnSubmitLogin" >
                          <i className="fa-brands fa-google"></i>
                          &nbsp;
                              Google
                          </button>
                     </div>
                        </div>
                    </form>
                 </div>

                <div className="col-md-6 login-form-2">
                    <h3>Registro</h3>
                    <form onSubmit={  registerSubmit } className='animate__animated animate__fadeIn animate__faster' >
                        <div className="form-group mb-2">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Nombre"
                                name="registerName"
                                value={ registerName }
                                onChange={ onRegisterInputChange }
                            />
                        </div>
                        <div className="form-group mb-2">
                            <input
                                type="email"
                                className="form-control"
                                placeholder="Correo"
                                name="registerEmail"
                                value={ registerEmail }
                                onChange={ onRegisterInputChange }
                            />
                        </div>
                        <div className="form-group mb-2">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Contraseña" 
                                name="registerPassword"
                                value={ registerPassword }
                                onChange={ onRegisterInputChange }
                            />
                        </div>

                        <div className="form-group mb-2">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Repita la contraseña" 
                                name="registerPassword2"
                                value={ registerPassword2 }
                                onChange={ onRegisterInputChange }
                            />
                        </div>

                        <div className="d-grid gap-2">
                            <input 
                                type="submit" 
                                className="btnSubmit" 
                                value="Crear cuenta" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
        </div>

    )
}