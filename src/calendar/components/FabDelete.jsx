import { useDispatch } from 'react-redux';
import { useCalendarStore, useUiStore } from '../../hooks';
import { startDeletingNote } from '../../store/calendar';

export const FabDelete = () => {

    const dispatch = useDispatch();
    const { startDeletingEvent, hasEventSelected } = useCalendarStore();

    const handleDelete = () => {
        dispatch( startDeletingNote() );
    }


  return (
    <button
        className="btn btn-danger fab-danger"
        onClick={ handleDelete }
        style={{
            display: hasEventSelected ? '': 'none'
        }}
    >
        <i className="fas fa-trash-alt"></i>
    </button>
  )
}
