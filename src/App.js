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

  const sendDataToServer = async (data) => {
    try {
      const response = await fetch("http://localhost:4001/api/data", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const responseData = await response.json();
      console.log("Ответ от сервера:", responseData);
    } catch (error) {
      console.error("Ошибка при отправке данных:", error.message);
    }
  };
  
    const onSubmit = (data) => {
      sendDataToServer(data)
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
