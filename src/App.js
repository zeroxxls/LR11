import logo from './logo.svg';
import { useForm } from "react-hook-form";
import './App.css';

function App() {
    const {
      register,
      reset,
      formState: { errors },
      handleSubmit,
    } = useForm({
    mode:"onSubmit",
  });
  
    const onSubmit = (data) => {
      console.log(JSON.stringify(data));
      reset({firstName:"Памʼятай",lastName:"Про Курсову Роботу"});
    };
    return (
      <div className="App">
        <h1>React Hook Form for IPZ</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label>
            Login:
            <input {...register("login",{
              required:"The Field is required",
              pattern:{
                value:/^[A-Za-z]+$/,
                message:"Руский воєний корабль іди...."
              }

            })}/>
          </label>
          <div className="error-message" style={{height:40}}>{errors.login ? errors.login.message : ""}</div>
          <label>
            FirstName:
            <input {...register("firstName",{
            required:"The Field is required",
            minLength:{
              value:5,
              message:"Min Length is 5"
            }
            })}/>
          </label>
          <div className="error-message" style={{height:40}}>{errors.firstName ? errors.firstName.message : ""}</div>
          <label>
            LastName:
            <input {...register("lastName",{
              required:"The Field is required",
              maxLength:{
                value:25,
                message:"Max Length is 25",
              },
              minLength:{
                value:5,
                message:"Min Length is 5",
              },
            })}/>
          </label>
          <div className="error-message" style={{height:40}}>{errors.lastName ? errors.lastName.message : ""}</div>
          <input type="submit" />
        </form>
      </div>
    );
  }

export default App;
