import React , {useState} from "react";
import { useHistory } from "react-router-dom";

const Signup = (props) => {

    const [credentials, setCredentials] = useState({name : "" , email : '' , password : '' , cpassword : ""});
    let history = useHistory();
    const handleSubmit = async (e) => {
      const {name , email , password} = credentials;
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/auth/createuser",{
            method : 'POST',
            headers : {
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify({name , email , password })
        });
        const json = await response.json();
        console.log(json);
        if(json.success){
            // Save the Auth token and redirect
            localStorage.setItem('token',json.authtoken);
            history.push("/");
            props.showAlert("Account Created Succesfully","success")
        }
        else{
          props.showAlert("Invalid Credentials","danger")
        }
    }
    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
      };

  return (
    <div className="container">
        <h2 className="text-center text-white my-2">Create a new account on EncryptNote </h2>
      <form onSubmit={handleSubmit}>
      <div className="mb-3">
          <label htmlFor="name" className="form-label text-white">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            aria-describedby="emailHelp"
            onChange={onChange}
            name="name"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label text-white">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            aria-describedby="emailHelp"
            onChange={onChange}
            name="email"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="paswword" className="form-label text-white">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            onChange={onChange}
            name="password"
            minLength ={5}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="cpaswword" className="form-label text-white">
            Confirm Password
          </label>
          <input
            type="password"
            className="form-control"
            id="cpassword"
            onChange={onChange}
            name="cpassword"
            minLength ={5}
            required
          />
        </div>
        <button type="submit" className="btn btn-secondary">
          Signup
        </button>
      </form>
    </div>
  );
};

export default Signup;
