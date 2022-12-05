

// export const Footer = () => {
//   return (
//     <div>
//         <footer>
//         <ul className="footer left3">
//             <li>
//             <i className="fa-solid fa-house flex "></i>
//                 <a href="">Home</a>
//             </li>
//             <li>
//             <i className="fas fa-calendar-alt flex"></i>
//                 <a href="">Calendar</a>
//             </li>
//             <li>
//             <i className="fa-solid fa-chart-pie flex"></i>
//                 <a href="">Chart</a>
//             </li>
//             <li>
//             <i className="fa-solid fa-file flex"></i>
//                 <a href="">Document</a>
//             </li>
//         </ul>
//     </footer>
//     </div>
//   )
// }

import { Link, NavLink } from 'react-router-dom';


export const Footer = () => {
    return (
        <footer className="footer ">
          
            <Link 
                className="fa-solid fa-house  " 
                to="/"
            >
                Home
            </Link>

           
         
          <NavLink 
               className="fas fa-calendar-alt " 
               to="/"
          >
              Calendar
         </NavLink>
         

          <NavLink 
              className="fa-solid fa-chart-pie " 
              to="/chart"
          >
             Chart
          </NavLink>
          <NavLink 
              className="fa-solid fa-file " 
              to="/config"
          >
             Document
          </NavLink>  
        
              
        </footer>
    )
}

