
import { useCalendarStore } from "../../hooks";
import { useAuthStore } from "../../hooks/useAuthStore";


export const Navbar = () => {

    const { displayName, startLogout } = useAuthStore();
    const { startMoreIncome } = useCalendarStore();

    const onLogout = () => {
        startLogout();
    }
  
    
    
    // const income = events[0].amount;
    //  startMoreIncome();
    
    // console.log(events)
  return (
    <>
    
    <div className="navbar navbar-dark bg-dark  px-4 ">
        <span className="navbar-brand">
            { displayName }
            &nbsp;
            <i className="fas fa-calendar-alt"></i>
        </span>

      <div className="favicon-download">

        <span className="navbar-brand ">
            <i className="fa-solid fa-download"></i>
        </span>

        <button
         className="btn btn-outline-danger"
         onClick={ onLogout }
        >
            <i className="fas fa-sign-out-alt"></i>
            <span>Salir</span>
        </button>
      </div>
    
    </div>

    <nav className="navbar-one flex navbar-dark bg-dark navbar-brand ">
        <div className="left flex">
            <div className="email">
            <i className="fa-sharp fa-solid fa-circle-plus"></i>
                &nbsp;
                <span>Ingresos</span>
            </div>
            <div className="call">
               <i className="fa-solid fa-minus"></i>
               &nbsp;
                <span> Gastos </span>
            </div>
            <div className="call">
            <i className="fa-solid fa-square-poll-vertical"></i>
               &nbsp;
                <span>Saldo</span>
            </div>      
        </div>
      
    </nav>
    <nav className="navbar-two flex navbar-dark bg-dark navbar-brand ">
        <div className="left2 flex">
            <div className="email">
               <i className="fa-solid fa-bolt"></i>
                &nbsp;
                <span>{startMoreIncome()}</span>
            </div>
            <div className="call">
              <i className="fa-solid fa-bolt"></i>
               &nbsp;
                <span>28,500</span>
            </div>
            <div className="call">
            <i className="fa-solid fa-bolt"></i>
               &nbsp;
                <span>-28,500</span>
            </div>      
        </div>
      
    </nav>

    </>

  )
}
