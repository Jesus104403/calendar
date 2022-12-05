import { useDispatch, useSelector } from 'react-redux';
import { loginWithEmailPassword, logoutFirebase, registeUserWithEmailPassword, singInWithGoogle } from '../firebase/providers';
import { clearErrorMessage, onChecking, onLogin, onLogout } from '../store/auth/authSlice';

export const useAuthStore = () => {


    const { status, user, errorMessage, displayName } = useSelector( state => state.auth );
    const dispatch = useDispatch();


    const startLogin = async({ email, password }) => {
        // console.log({ email, password })
        dispatch( onChecking() );
        
        const result = await loginWithEmailPassword({ email, password });
        console.log(result);

        if( !result.ok ) return dispatch( onLogout( result ) );
        dispatch( onLogin( result ))

    }

    const startGooGleSignIn = async() => {
        dispatch( onChecking() );

        const result = await singInWithGoogle();
        if ( !result.ok ) return dispatch( onLogout( result ) );
      
        dispatch( onLogin( result ))
       

    }

    const startRegister = async({ email, password, displayName }) => {
        dispatch( onChecking() );

            const { ok, uid, photoURL, errorMessage } = await registeUserWithEmailPassword({ email, password, displayName }); 
            if( !ok ) return dispatch( onLogout({ errorMessage }) )
            dispatch( onLogin({ uid, displayName, email, photoURL }));
             
    }     

    const startLogout = async() => {

          await logoutFirebase(); 

          dispatch( onLogout() );

    }


    return {
         //* Propiedades
         errorMessage, 
         status, 
         user, 
         displayName,


         //* Metodos
         startLogin,
         startGooGleSignIn,
         startRegister,
         startLogout,


    }

}

