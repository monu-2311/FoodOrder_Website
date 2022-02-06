import { useReducer } from "react";
import CartContext from "./cart-context";


const defaultCartState={
    item: [],
    totalAmonut:0
};

const cartReducer=(state,action)=>{
    if(action.type==='ADD'){
        const updateTotalAmonut = state.totalAmonut + (action.item.price * action.item.amount);
        
        const existingCartItemIndex = state.item.findIndex(
            (item)=>item.id === action.item.id
        );
        const existingCartItem = state.item[existingCartItemIndex];

        let updateItem;

        if(existingCartItem){
            const updateItems={
                ...existingCartItem,
                amount:existingCartItem.amount + action.item.amount
            };
            updateItem = [...state.item];
            updateItem[existingCartItemIndex] = updateItems;
        }else{
            updateItem = state.item.concat(action.item);
        }


        return{
            item: updateItem,
            totalAmonut:updateTotalAmonut
        };
    } 

    if(action.type ==='REMOVE'){

        
        const existingCartItemIndex = state.item.findIndex(
            (item)=>item.id === action.id
        );

        const existingItem = state.item[existingCartItemIndex];
        const updateTotalAmonut = state.totalAmonut - existingItem.price;
        let updateItem;
        if(existingItem.amount === 1){
            updateItem = state.item.filter((item)=> item.id !== action.id);
        }else{
            const updateItems = {...existingItem,amount : (existingItem.amount - 1)};
            updateItem = [...state.item];
            updateItem[existingCartItemIndex] = updateItems;
        }

        return{
            item:updateItem,
            totalAmonut: updateTotalAmonut
        };
    }
    return defaultCartState;
};

const CartProvider= props =>{

    const [cartState, dispatchCartState]=useReducer(cartReducer,defaultCartState);

    const addItemToCartHandler=item=>{
        dispatchCartState({type:'ADD', item:item});
    };
    const removeItemToCartHandler=id=>{
        dispatchCartState({type:'REMOVE',id:id});
    };
    const cartContext = {
        item:cartState.item,
        totalAmount:cartState.totalAmonut,
        addItem:addItemToCartHandler,
        removeItem:removeItemToCartHandler,
    };
    return(
        <CartContext.Provider value={cartContext}>
            {props.children}
        </CartContext.Provider>
    );
};

export default CartProvider;