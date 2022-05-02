import {useState, useRef} from 'react'
import { useDispatch } from 'react-redux';
import { addFood, removeCustomer,removeFood } from '../features/customerSlice';

interface CustomerCardTypes{
  id: string;
  name: string;
  food: string[];
}

export default function CustomerCard({name, id, food}: CustomerCardTypes) {
  
  const dispatch = useDispatch();

  const [choice, setChoice] = useState("")

  const handleAddCustomerFood = () => {
    if(!choice){
      return 
    }
    dispatch(addFood({id, food:choice}));
    setChoice('');
    ref.current?.focus();
  }

  const handleRemoveCustomer = () => {
    dispatch(removeCustomer({id}))
  }

  const handleRemoveFood = (food: string) => {
    dispatch(removeFood({id, food:food}))
  }

  const ref = useRef<HTMLInputElement | null>(null);

  return (
    <div className="customer-food-card-container">
      <div className="customer-foods-header-container">
        <p>{name}</p> 
        <p onClick={handleRemoveCustomer}>Remove</p>
      </div>
      <div className="customer-foods-container">
        <div className="customer-food">
          {food.map(food => {
            return <p onClick={() => handleRemoveFood(food)}>{food}</p>
          })}
        </div>
        <div className="customer-food-input-container">
          <input ref={ref} value={choice} onChange={(e) => setChoice(e.target.value)} />
          <button onClick={handleAddCustomerFood}>Add</button>
        </div>
      </div>
    
  </div>
  )
}
