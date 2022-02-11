import Card from '../UI/Card';
import classes from './AvailableMeals.module.css';
import { useEffect,useState } from 'react';
import MealsItem from './MealsItem/MealsItem';

const AvailableMeals=()=>{
  const [meals,setMeals]=useState([]);
  const [error,setError] = useState();

  const [isLoading, setIsLoading] = useState(true);
  useEffect(()=>{
      const fetchMeals = async () => {
        const response = await fetch('https://food-ordring-af14d-default-rtdb.firebaseio.com/meals.json');

        if(!response.ok){
          throw new Error('Something went worng!');
        }
        const responseData = await response.json();
        const loadedMeals =[];

        for(const key in responseData){
          loadedMeals.push({
            id: key,
            description:responseData[key].description,
            name: responseData[key].name,
            price: responseData[key].price
          });
        }

        setMeals(loadedMeals);
        setIsLoading(false);
      };

     fetchMeals().catch(error=>{
        setIsLoading(false);
        setError(error.message);
      })

    },[]);
 
    if(isLoading){
      return (<section className={classes.mealLoading}>
        <p>Loading...</p>
      </section>);
    }

    if(error){
      return (<section className={classes.mealError}>
        <p>{error}</p>
      </section>);
    }
    const mealsList = meals.map(meal =><MealsItem id={meal.id} key={meal.id} name={meal.name} description={meal.description} price={meal.price}/>);
    return(
        <section className={classes.meals}>
            <Card>
                <ul>
                    {mealsList}
                </ul>
            </Card>
        </section>
    );
};

export default AvailableMeals;