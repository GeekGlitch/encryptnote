import React , {useState} from "react";
import { useHistory } from "react-router-dom";

const Login = (props) => {
    const [credentials, setCredentials] = useState({email : '' , password : ''})

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
      };

    let history = useHistory();
    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/auth/login",{
            method : 'POST',
            headers : {
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify({email : credentials.email , password : credentials.password})
        });
        const json = await response.json();
        console.log(json);
        if(json.success){
            // Save the Auth token and redirect
            localStorage.setItem('token',json.authtoken);
            props.showAlert("Logged In Succesfully","success")
            history.push("/");
        }
        else{
            props.showAlert("Invalid Credentials","danger")
        }
    }
  return (
    <>
          <div className="container">
          <form onSubmit = {handleSubmit}>
          <h1 className="h3 mb-3 fw-normal text-white text-center my-2">Login to continue with EncryptNote</h1>

          <div className="form-floating">
            <input
              type="email"
              className="form-control my-2"
              id="floatingInput"
              placeholder="name@example.com"
              name = "email"
              onChange = {onChange}
            />
            <label htmlFor="floatingInput">Email address</label>
          </div>
          <div className="form-floating">
            <input
              type="password"
              className="form-control my-2"
              id="floatingPassword"
              placeholder="Password"
              name = "password" 
              onChange = {onChange}
            />
            <label htmlFor="floatingPassword">Password</label>
          </div>
          <button className="w-100 btn btn-lg btn-secondary" type="submit">
            Login
          </button>
        </form>
          </div>
    </>
  );
};

export default Login;
