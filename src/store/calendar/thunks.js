

import { deleteDoc, doc, setDoc } from 'firebase/firestore/lite';
import { FirebaseDB } from '../../firebase/config';
import { loadNotes } from '../../helpers';
import { onDeleteEvent, onLoadEvents, onUpdateEvent } from './calendarSlice';







export const startLoadingNotes = () => {
    return async( dispatch, getState ) => {

       const { uid } = getState().auth;
       if( !uid ) throw new Error('El UID del usuario no existe');

      const events = await loadNotes( uid );
      dispatch( onLoadEvents( events ) );
    

    }
}


export const startSaveNote = () => {
    return async( dispatch, getState ) => {


      const { uid } = getState().auth;
      const { activeEvent:note } = getState().calendar;

      const noteToFireStore = { ...note };
      delete noteToFireStore.id;

      const docRef = doc( FirebaseDB, `${ uid }/calendar/Expense/${ note.id }`);
      await setDoc( docRef, noteToFireStore, { merge: true });

      dispatch( onUpdateEvent( note ) );



    }

}


export const startDeletingNote = () => {
    return async( dispatch, getState ) => {
      const { uid } = getState().auth;
      const { activeEvent:note } = getState().calendar;

      const docRef = doc( FirebaseDB, `${ uid }/calendar/Expense/${ note.id }`);
      await deleteDoc( docRef );  

       dispatch( onDeleteEvent(note.id) );


    }
}


