import React,{ useContext } from 'react';
import CartContext from '../../store/cart-context';
import Modal from '../UI/Modal';
import classes from './Cart.module.css';
import CartItem from './CartItem';

const Cart =(props)=>{
    const cartCtx = useContext(CartContext);
    
    console.log(cartCtx);
    
    const totalAmonut = `$${cartCtx.totalAmount.toFixed(2)}`;
    const hasItem = cartCtx.item.length > 0;

    const cartItemRemoveHandler =(id)=>{
        cartCtx.removeItem(id);
    };
    const cartItemAddHandler=(item)=>{
        cartCtx.addItem({...item,amount:1});
    };

    const cartItem = <ul className={classes['cart-items']}>{
        cartCtx.item.map((item) =>(
        <CartItem 
        key={item.id} 
        name ={item.name} 
        amount={item.amount} 
        price={item.price} 
        onRemove={cartItemRemoveHandler.bind(null,item.id)} 
        onAdd={cartItemAddHandler.bind(null,item)}
        />
        ))}
        </ul>;


    return(
        <Modal>
            {cartItem}
            <div className={classes.total}>
                <span>Total Amount</span>
                <span>{totalAmonut}</span>
            </div>
            <div className={classes.actions}>
                <button className={classes['button--alt']} onClick={props.onHideCart}>Closed</button>
                {hasItem && <button className={classes.button}>Order</button>}
            </div>
        </Modal>
    );
};

export default Cart;