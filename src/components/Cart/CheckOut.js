import { useRef, useState } from 'react';
import classes from './Checkout.module.css';


const CheckOut= (props)=>{
    const[formInputValidity,setFormInputValidity] = useState({
        name: true,
        address: true,
        postal: true,
        city:true
    });

    const nameRef = useRef();
    const addressRef = useRef();
    const postalRef = useRef();
    const cityRef = useRef();

    const isEmpty=(value)=>value.trim() === '';
    const isNotFiveChar = value => value.trim().length !== 5;
    

    const confirmHandler =(event)=>{
        event.preventDefault();

        const enteredName = nameRef.current.value;
        const enteredAddress = addressRef.current.value;
        const enteredPostal = postalRef.current.value;
        const enteredCity = cityRef.current.value;

        const enteredNameIsValid = !isEmpty(enteredName);
        const enteredAddressIsValid = !isEmpty(enteredAddress);
        const enteredPostalIsValid = isNotFiveChar(enteredPostal);
        const enteredCityIsValid = !isEmpty(enteredCity);

        setFormInputValidity({
            name:enteredName,
            address: enteredAddress,
            postal:enteredPostal,
            city:enteredCity
        })

        const isFormValid = enteredNameIsValid && enteredAddressIsValid && enteredPostalIsValid && enteredCityIsValid;

        if(!isFormValid){
            return;
        }

        props.onSubmit({
            name: enteredName,
            address: enteredAddress,
            postal: enteredPostal,
            city: enteredCity
        });
        
    };

    const nameControlClass = `${classes.control} ${formInputValidity.name ? '': classes.invalid}`;
    const addressControlClass = `${classes.control} ${formInputValidity.address ? '':classes.invalid}`;
    const postalControlClass = `${classes.control} ${formInputValidity.postal ? '':classes.invalid}`;
    const cityControlClass = `${classes.control} ${formInputValidity.city ? '':classes.invalid}`;
    
    return(
        <form className={classes.form} onSubmit={confirmHandler}>
            <div className={nameControlClass}>
                <label htmlFor='name'>Your Name</label>
                <input type='text' id='name' ref={nameRef} />
                {!formInputValidity.name && <p>Please enter a valid name</p>}
            </div>
            <div className={addressControlClass}>
                <label htmlFor='address'>Address</label>
                <input type='text' id='address' ref={addressRef}/>
                {!formInputValidity.address && <p>Please  enter a valid address</p>}
            </div>
            <div className={postalControlClass}>
                <label htmlFor='postal'>Postal Number</label>
                <input type='text' id='postal' ref={postalRef}/>
                {!formInputValidity.postal && <p>Please  enter a valid postal(5 character digit)</p>}
            </div>
            <div className={cityControlClass}>
                <label htmlFor='city'>City</label>
                <input type='text' id='city' ref={cityRef}/>
                {!formInputValidity.city && <p>Please nter a valid City</p>}
            </div>
            <div className={classes.actions}>   
                <button onClick={props.onCancel} type='button'>Cancel</button>
                <button className={classes.submit} >Confirm</button>
            </div>  
        
        </form>
    );
};

export default CheckOut;