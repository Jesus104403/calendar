import { collection, deleteDoc, doc, setDoc } from 'firebase/firestore/lite';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { FirebaseDB } from '../firebase/config';
import { loadNotes } from '../helpers';
import { onAddNewEvent, onDeleteEvent, onLoadEvents, onSetActiveEvent, onUpdateEvent } from '../store';


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
                const noteToFireStore = { ...calendarEvent };
                delete noteToFireStore.id;
                

               const docRef = doc( FirebaseDB, `${ uid }/calendar/Expense/${ calendarEvent.id }`);
               await setDoc( docRef, noteToFireStore, { merge: true });

                dispatch( onUpdateEvent( calendarEvent, user ) );
                return;
            } 
    
              

                const newCalendarEvent = { ...calendarEvent, user };
                delete  newCalendarEvent.bgColor;
              
                // Creando
                const newDoc = doc( collection( FirebaseDB,  `${ uid }/calendar/Expense` ) );
                const setDocResp = await setDoc( newDoc,  newCalendarEvent );
    
                // console.log({ newDoc, setDocResp });
                console.log({ newCalendarEvent})
    
                dispatch( onAddNewEvent({... newCalendarEvent}) );
            
        } catch (error) {
            console.log(error);
            Swal.fire('Error al guardar', error.response.data.msg, 'error');
        }

        
    }



    const startDeletingEvent =  async() => {
        // Todo: Llegar al backend
        const docRef = doc( FirebaseDB, `${ uid }/calendar/Expense/${ activeEvent.id }`);
        await deleteDoc( docRef );  
  
         dispatch( onDeleteEvent(activeEvent.id) );

    }

    const startLoadingEvents = async(uid) => {
        if( !uid ) throw new Error('El UID del usuario no existe');

        const events = await loadNotes( uid );
        dispatch( onLoadEvents( events ) );
  
      }

    const startMoreIncome  = () => {
        let suma = 0;
        const amount = events.map(event =>{
            const numeros = event.ingresos;
            
            
            if( numeros ){
                
                return  numeros ;
            } else {
                return 0;
            }
                
            })
            // console.log(amount);
        
        // const numeros = events.amount;
        amount.forEach(item =>{
            suma += item;
        });
        
         
        return suma;
    }
  
    const startMoreExpense = () => {
        let suma = 0;
        const amount = events.map(event =>{
            const numeros = event.gastos;
            
            
            if( numeros ){
                
                return  numeros ;
            } else {
                return 0;
            }
                
            })
            // console.log(amount);
        
        // const numeros = events.amount;
        amount.forEach(item =>{
            suma += item;
        });
        
         
        return suma;
    }

    const startBalance = () => {
        const income = startMoreIncome();
        const expense = startMoreExpense();
       
       return  income - expense;
         
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
        startLoadingEvents,
        startMoreIncome,
        startMoreExpense,
        startBalance 
    }
}
