import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface CustomerState {
    value: Customer[]
}

interface Customer {
    id: string;
    name: string;
    food: string[]
}

interface AddFoodToCustomerPayload {
    food: string;
    id: string;
}

interface RemoveFoodToCustomerPayload {
    food: string;
    id: string;
}

interface CustomerToBeRemoved {
    id: string;
}

const initialState:CustomerState = {
    value: []
}

export const customersSlice = createSlice({
    name: 'customers',
    initialState: initialState,
    reducers: {
        addCustomer: (state, action: PayloadAction<Customer>) => {
            state.value.push(action.payload)
        },
        removeCustomer: (state, action: PayloadAction<CustomerToBeRemoved>) => {
            var index = state.value.findIndex(customer => customer.id === action.payload.id);
            state.value.splice(index, 1)
        },
        addFood: (state, action: PayloadAction<AddFoodToCustomerPayload>) => {
            state.value.forEach( customer => {
                if(customer.id === action.payload.id){
                    customer.food.push(action.payload.food);
                }
            })
        },
        removeFood: (state, action: PayloadAction<RemoveFoodToCustomerPayload>) => {
            state.value.forEach( customer => {
                if(customer.id === action.payload.id){
                    var index = customer.food.findIndex(chioce => chioce === action.payload.food);
                    customer.food.splice(index, 1)
                }
            })
        },

    }
});

export const {addCustomer, addFood, removeCustomer, removeFood} = customersSlice.actions

export default customersSlice.reducer;