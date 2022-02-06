import React,{useContext,useEffect,useState} from "react";
import CartContext from "../../store/cart-context";
import CartIcon from "../Cart/CartIcon";
import classes from './HeaderCartButton.module.css';

const HeaderCartButton = props=>{
    const ctx = useContext(CartContext);

    const {item} = ctx;

    const[btnIsHighlighted,setBtnIsHighlighted] = useState(false);

    const numberOfCartItem = ctx.item.reduce((curNumber, item)=>{
        return curNumber + item.amount;
    },0);

    const btnClasses = `${classes.button} ${btnIsHighlighted ? classes.bump :''}`;

    useEffect(()=>{
        if(item.length === 0){
            return;
        }
        setBtnIsHighlighted(true);
        const timer = setTimeout(()=>{      
            setBtnIsHighlighted(false);
        },300)

        return()=>{
            clearTimeout(timer);
        }
    },[item]);
    return(
        <button className={btnClasses} onClick={props.onClick}>
            <span className={classes.icon}>
                <CartIcon/>
            </span>
            <span>Your Cart</span>
            <span className={classes.badge}>{numberOfCartItem}</span>
        </button>
    );
};

export default HeaderCartButton;
