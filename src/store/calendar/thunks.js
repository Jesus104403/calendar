import { loadNotes } from '../../helpers';
import { onLoadEvents } from './calendarSlice';







export const startLoadingNotes = () => {
    return async( dispatch, getState ) => {

       const { uid } = getState().auth;
       if( !uid ) throw new Error('El UID del usuario no existe');

      const events = await loadNotes( uid );
      dispatch( onLoadEvents( events ) );
    

    }
}