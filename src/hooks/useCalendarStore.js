import { collection, doc, setDoc } from 'firebase/firestore/lite';
import { useDispatch, useSelector } from 'react-redux';
import { FirebaseDB } from '../firebase/config';
import { onAddNewEvent, onDeleteEvent, onSetActiveEvent, onUpdateEvent, savingNewNote } from '../store';


export const useCalendarStore = () => {
  
    const dispatch = useDispatch();
    const { uid, displayName  } = useSelector( state => state.auth );
    const { events, activeEvent, isSaving } = useSelector( state => state.calendar );

    const setActiveEvent = ( calendarEvent ) => {
        dispatch( onSetActiveEvent( calendarEvent ) )
    }

    const user = {
        name: displayName,
        uid: uid
    }

    const startSavingEvent = async( calendarEvent ) => {
        // TODO: llegar al backend

        // Todo bien
        if( calendarEvent._id ) {
            // Actualizando
            dispatch( onUpdateEvent({ ...calendarEvent }) );
        } else {
            // Creando
            const newDoc = doc( collection( FirebaseDB,  `${ uid }/calendar/Expense` ) );
            const setDocResp = await setDoc( newDoc, calendarEvent );

            console.log({ newDoc, setDocResp });

            dispatch( onAddNewEvent({ ...calendarEvent }) );
        }
    }



    const startDeletingEvent = () => {
        // Todo: Llegar al backend


        dispatch( onDeleteEvent() );
    }


    return {
        //* Propiedades
        activeEvent,
        events,
        hasEventSelected: !!activeEvent,
        isSaving,

        //* Métodos
        startDeletingEvent,
        setActiveEvent,
        startSavingEvent,
    }
}
