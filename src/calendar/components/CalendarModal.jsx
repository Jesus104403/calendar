import { useMemo, useState, useEffect } from 'react';
import { addHours, differenceInSeconds } from 'date-fns';


import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

import Modal from 'react-modal';

import DatePicker, { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import es from 'date-fns/locale/es';
import { useCalendarStore, useUiStore } from '../../hooks';
import { ToggleSwitch } from './ToggleSwitch';





registerLocale( 'es', es );


const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
};

Modal.setAppElement('#root');

export const CalendarModal = () => {

   
    const {  isSaving } =  useCalendarStore();

    const { isDateModalOpen, closeDateModal } = useUiStore();
    const { activeEvent, setActiveEvent, startSavingEvent } = useCalendarStore();

    const [ formSubmitted, setFormSubmitted ] = useState(false);

    const [formValues, setFormValues] = useState({
        amount: '',
        notes: '',
        start: new Date(),
        end: addHours( new Date(), 2),
    });

    const [toggled, setToggled] = useState(false);

   

    // const titleClass = useMemo(() => {
    //     if ( !formSubmitted ) return '';

    //     return ( formValues.amount.length > 0 )
    //         ? ''
    //         : 'is-invalid';

    // }, [ formValues.amount, formSubmitted ])

    useEffect(() => {
      if ( activeEvent !== null ) {
          setFormValues({ ...activeEvent });
      }    
      
    }, [ activeEvent ])
    
    // useEffect(() => {
    //     setActiveEvent(formValues);
    // }, [formValues])
    
    


    const onInputChanged = ({ target }) => {
        setFormValues({
            ...formValues,
            [target.name]: target.value
        })
    }

    const onDateChanged = ( event, changing ) => {
        setFormValues({
            ...formValues,
            [changing]: event
        })
    }

    const onCloseModal = () => {
        closeDateModal();
    }

    const onSubmit = async( event ) => {
        event.preventDefault();
        setFormSubmitted(true);

        const difference = differenceInSeconds( formValues.end, formValues.start );
        
        if ( isNaN( difference ) || difference <= 0 ) {
            Swal.fire('Fechas incorrectas','Revisar las fechas ingresadas','error');
            return;
        }

        

        const ingresos = parseInt(formValues.amount);
        const gastos = parseInt(formValues.amount);

      

       

        const newFormValues = {
            ...formValues,  gastos
        } 
        
        const newFormValues2 = {
            ...formValues,  ingresos
        } 
        
        if ( toggled === true){
            console.log(   newFormValues );
            return await startSavingEvent(  newFormValues );
        }else{
            console.log(   newFormValues2 );
            await startSavingEvent(  newFormValues2 );
        }
    

        // TODO: 
        // await startSavingEvent(  newFormValues );
        closeDateModal();
        setFormSubmitted(false);
    }

   

  return (
    <Modal
        isOpen={ isDateModalOpen }
        onRequestClose={ onCloseModal }
        style={ customStyles }
        className="modal animate__animated animate__fadeIn animate__faster"
        overlayClassName="modal-fondo"
        closeTimeoutMS={ 200 }
    >   
         <div className='expense'>
            <h1>  {toggled ? 'Añadir Gastos' : 'Añadir Ingresos'} </h1>
            <ToggleSwitch onChange={(event) => setToggled(event.target.checked) } />
            <hr />

         </div>
            <p>The switch is {toggled ? 'on' : 'off'}.</p>
        <form className="container" onSubmit={ onSubmit }>

            <div className="form-group mb-2">
                <label>Fecha</label>
                <DatePicker 
                    selected={ formValues.start }
                    onChange={ (event) => onDateChanged(event, 'start') }
                    className="form-control"
                    dateFormat="Pp"
                    showTimeSelect
                    locale="es"
                    timeCaption="Hora"
                />
            </div>

            <div className="form-group mb-2">
                <label>Fecha y hora fin</label>
                <DatePicker 
                    minDate={ formValues.start }
                    selected={ formValues.end }
                    onChange={ (event) => onDateChanged(event, 'end') }
                    className="form-control"
                    dateFormat="Pp"
                    showTimeSelect
                    locale="es"
                    timeCaption="Hora"
                />
            </div>

            <hr />
            <div className="form-group mb-2">
                <label>Importe</label>
                <input 
                    type="number" 
                    className={ `form-control`}
                    placeholder="$0"
                    name="amount"
                    autoComplete="off"
                    value={ formValues.amount }
                    onChange={ onInputChanged }
                />
                <small id="emailHelp" className="form-text text-muted">Description(Optional) </small>
            </div>

            <div className="form-group mb-2">
                <textarea 
                    type="text" 
                    className="form-control"
                    placeholder=""
                    rows="5"
                    name="notes"
                    value={ formValues.notes }
                    onChange={ onInputChanged }
                ></textarea>
                <small id="emailHelp" className="form-text text-muted">Información adicional</small>
            </div>

            <button
                type="submit"
                className="btn btn-outline-primary btn-block"
                disabled={ isSaving }
            >
                <i className="far fa-save"></i>
                <span> Guardar</span>
            </button>

        </form>
    </Modal>
  )
}
