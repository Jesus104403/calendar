import { Footer, Navbar } from '../../calendar';
import DoughnutChart from '../components/DoughnutChart';




export const ChartPage = () => {
  return (
    <>
    
    <Navbar />
    

     {/* Add Charts */}
     <div className='graphBox'>
        <div className='box'>
       <DoughnutChart />
        </div>
       
     </div>

   
  
    {/* <div className="details">
       <div className="recentOrders">
        <div className="cardHeader">
          <h2>Recent Orders</h2>
          <a href="#" className="btn">View All</a>
        </div>
        <table>
          <thead>
            <tr>
              <td>Name</td>
              <td>Price</td>
              <td>Payment</td>
              <td>Status</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Denim Shirts</td>
              <td>$110</td>
              <td>Due</td>
              <td><span className="status inprogress">In Progress</span></td>
            </tr>
            <tr>
              <td>Casual Shoes</td>
              <td>$575</td>
              <td>Paid</td>
              <td><span className="status pending">Pending</span></td>
            </tr> 
            <tr>
              <td>Wall Fan</td>
              <td>$110</td>
              <td>Paid</td>
              <td><span className="status pending">Pending</span></td>
            </tr>
          </tbody>
        </table>
       </div>
         
     

    </div>
       */}


    <Footer />



    </>
  )
}
