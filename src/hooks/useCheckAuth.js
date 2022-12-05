import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { onAuthStateChanged } from 'firebase/auth';
import { FirebaseAuth } from '../firebase/config';
import { onLogin, onLogout } from '../store';


export const useCheckAuth = () => {
 
    const { status } = useSelector( state => state.auth );
    const dispatch = useDispatch();
    
    useEffect(() => {

      onAuthStateChanged( FirebaseAuth, async( user ) => {
        if( !user ) return dispatch( onLogout() );
        const { uid, email, displayName, photoURL } = user;
        dispatch( onLogin({  uid, email, displayName, photoURL }) );

      })
    }, []);

    return  status;
    

}
