import { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./App.css";
import { RootState } from "./app/store";
import CustomerCard from "./components/CustomerCard";
import ReservationCard from "./components/ReservationCard";
import { addReservation } from "./features/reservationSlice";

function App() {

  const dispatch = useDispatch()

  const reservations = useSelector((state: RootState) => state.reservations.value)
  const customers = useSelector((state: RootState) => state.customer.value)

  const [reservation, setReservation] =  useState('')

  const ref = useRef<HTMLInputElement | null>(null);

  const handleAddReservations = () => {
    // handle empty string, not to be added to the state
    if(!reservation){
      return 
    }
    dispatch(addReservation(reservation));
    setReservation('');
    ref.current?.focus();
  }

    // Focus the name input when the app launches
    useEffect(() => {
      ref.current?.focus();
    }, []);

  return (
    <div className="App">
      <div className="container">
        <div className="reservation-container">
          <div>
            <h5 className="reservation-header">Reservations</h5>
            <div className="reservation-cards-container">
              {reservations.map((name, index) => {
                return <ReservationCard name={name} index={index} />
              })}
            </div>
          </div>
          <div className="reservation-input-container">
            <input ref={ref} value={reservation} onChange={(e) => setReservation(e.target.value) } />
            <button onClick={handleAddReservations}>Add</button>
          </div>
        </div>
        <div className="customer-food-container">
          {customers.map((customer) => { 
            return  (
              <CustomerCard name={customer.name} id={customer.id} food={customer.food} />
            )})}
          
        </div>
      </div>
    </div>
  );
}

export default App;
