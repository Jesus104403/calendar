import { collection, getDocs } from 'firebase/firestore/lite';
import { FirebaseDB } from '../firebase/config';
import { convertEventsToDateEvents } from './convertEventsToDateEvents';



export const loadNotes = async( uid = '' ) => {
    if( !uid ) throw new Error('El UID del usuario no existe');

    const collectionRef = collection( FirebaseDB, `${ uid }/calendar/Expense`);
    const docs = await getDocs(collectionRef);

    const notes = [];
    docs.forEach( doc => {
        notes.push({ id: doc.id, ...doc.data() });
      
    });

   


    const events = convertEventsToDateEvents(notes);

    return events;

}
