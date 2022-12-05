import { collection, doc, setDoc } from 'firebase/firestore/lite';
import { useDispatch, useSelector } from 'react-redux';
import { FirebaseDB } from '../firebase/config';
import { onAddNewEvent, onDeleteEvent, onSetActiveEvent, onUpdateEvent, savingNewNote } from '../store';


export const useCalendarStore = () => {
  
    const dispatch = useDispatch();
    const { uid } = useSelector( state => state.auth );
    const { events, activeEvent, isSaving } = useSelector( state => state.calendar );

    const setActiveEvent = ( calendarEvent ) => {
        dispatch( onSetActiveEvent( calendarEvent ) )
    }

    const startSavingEvent = async( calendarEvent ) => {
        // TODO: llegar al backend

        // Todo bien
        if( calendarEvent._id ) {
            // Actualizando
            dispatch( onUpdateEvent({ ...calendarEvent }) );
        } else {
            // Creando
            // dispatch( onAddNewEvent({ ...calendarEvent, _id: new Date().getTime() }) );
        }
    }


    const startNewNote = async() => {
       

        dispatch( savingNewNote() );

        // uid

        const newNote = {
            title: '',
            notes: '',
            date: new Date().getTime(),
        }

        const newDoc = doc( collection( FirebaseDB,  `${ uid }/calendar/notes` ) );
        const setDocResp = await setDoc( newDoc, newNote );

        console.log({ newDoc, setDocResp });

        newNote.id = newDoc.id;

        //! dispatch
        dispatch( onAddNewEvent({ newNote}) );
        // dispatch( activarNote )

       
        
    }

    const startLoadingNotes = ( ) => {

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
        startNewNote, 
    }
}
