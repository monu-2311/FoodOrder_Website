import { Fragment } from "react";

import Image from '../../assets/meals.jpg';

import classes from './Header.module.css';
import HeaderCartButton from "./HeaderCartButton";

const Header=(props)=>{
    return(
        <Fragment>
            <header className={classes.header}>
                <h1>React Meals</h1>
                <HeaderCartButton onClick={props.onCartShow}/>
            </header>
            <div className={classes['main-image']}>
                <img src={Image} alt='A table full of delicous food!'/>
            </div>
        </Fragment>
    );
};

export default Header;