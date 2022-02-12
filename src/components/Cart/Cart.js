import React,{ Fragment, useContext, useState } from 'react';
import CartContext from '../../store/cart-context';
import Modal from '../UI/Modal';
import classes from './Cart.module.css';
import CartItem from './CartItem';
import CheckOut from './CheckOut';

const Cart =(props)=>{
    const [isCheckout, setIsCheckout] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const[didSubmit, setDidSubmit]= useState(false);
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

    const showCheckOut =()=>{
        setIsCheckout(true);
    }

    const submitHandler=async (userData)=>{
        setIsSubmitting(true);
        await fetch('https://food-ordring-af14d-default-rtdb.firebaseio.com/order.json',{
            method: 'POST',
            body: JSON.stringify({  
                user: userData,
                orderDetails : cartCtx.item
            })
        });

        setIsSubmitting(false);
        setDidSubmit(true);

        cartCtx.clearCart();
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

    const footer = 
    <div className={classes.actions}>
        <button className={classes['button--alt']} onClick={props.onHideCart}>Closed</button>
        {hasItem && <button className={classes.button} onClick={showCheckOut}>Order</button>}
    </div>;

    const CartModelContent = (<Fragment>
        {cartItem}
            <div className={classes.total}>
                <span>Total Amount</span>
                <span>{totalAmonut}</span>
            </div>
            {isCheckout && <CheckOut onSubmit={submitHandler} onCancel={props.onHideCart}/>}
            {!isCheckout && footer}
    </Fragment>);

    const isSubmittingModalContent = <p>Sending Order Data...</p>;
    const didSubmittingModalContent = <Fragment>
        <p>Successfully sent the order!</p>
        <div className={classes.actions}>
        <button className={classes.button} onClick={props.onHideCart}>Closed</button>
        </div>
        </Fragment>

    return(
        <Modal>
            {!isSubmitting && !didSubmit&&CartModelContent}
            {isSubmitting && isSubmittingModalContent}
            {!isSubmitting&& didSubmit && didSubmittingModalContent}
        </Modal>
    );
};

export default Cart;