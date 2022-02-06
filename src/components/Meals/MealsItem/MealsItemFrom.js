import { useRef,useState } from 'react';
import Input from '../../UI/Input';
import classes from './MealsItemFrom.module.css';

const MealsItemFrom=(props)=>{
    const[amonutIsValid, setAmonutIsValid] = useState(true);
    const amonutInputRef = useRef();
    const submitHandler= event=>{
        event.preventDefault();
        const enteredAmonut = amonutInputRef.current.value;
        const enteredAmonutNumber = +enteredAmonut;

        if(enteredAmonut.trim().length === 0 || enteredAmonutNumber < 1|| enteredAmonutNumber> 5){
            setAmonutIsValid(false);
            return;
        }
        props.onAddToCart(enteredAmonutNumber);
    };
    return(
        <form className={classes.form} onSubmit={submitHandler}>
            <Input 
            ref={amonutInputRef}
            lable="Amount"
            input={{
                id:'amount_'+props.id,
                type:'number',
                min:'1',
                max:'5',
                defaultValue:'1',
                step:'1'
            }}/>
            <button>+ Add</button>
            {!amonutIsValid && <p>Please Enter Valid Amonut</p>}
        </form>
    );
    
};

export default MealsItemFrom;