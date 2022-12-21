import { collection, doc, setDoc } from 'firebase/firestore/lite';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { FirebaseDB } from '../firebase/config';
import { onAddNewEvent, onDeleteEvent, onSetActiveEvent, onUpdateEvent } from '../store';


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
       
        try {

            if( calendarEvent.id ) {
                // Actualizando
                dispatch( onUpdateEvent({ ...calendarEvent, user }) );
                return;
            } 
    
                // Creando
                const newDoc = doc( collection( FirebaseDB,  `${ uid }/calendar/Expense` ) );
                const setDocResp = await setDoc( newDoc, calendarEvent );
    
                console.log({ newDoc, setDocResp });
    
                dispatch( onAddNewEvent({ ...calendarEvent }) );
            
        } catch (error) {
            console.log(error);
            Swal.fire('Error al guardar', error.response.data.msg, 'error');
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
