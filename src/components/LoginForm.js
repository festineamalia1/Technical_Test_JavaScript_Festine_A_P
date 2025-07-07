import React, { useState, useEffect } from "react";
import { Link, useNavigate  } from "react-router-dom";
import { connect } from "react-redux";
import { handleLogin } from "actions";
import axios from "axios";
import { API, setAuthToken } from "config/api";

const LoginForm = (props) => {
  const navigate = useNavigate ();

  const [see, setSee] = useState(false);
  const [username, setUsername] = useState("Festine");
  const [password, setPassword] = useState("password123");

    const handleLogin = (e) => {
         e.preventDefault();
      // const headers = {
      //   "Content-Type": "application/x-www-form-urlencoded",
      // };
      axios
        .post(
          `${API}/login`,
        {
          username: username,
          password: password
        },
          // {
          //   headers: headers,
          // }
        )
        .then(function (response) {
          console.log(response);
           localStorage.setItem('token', response?.data?.data?.token);
          // console.log("token", response?.data?.data?.token)
           alert("Login Berhasil");
            navigate('/home')
        })
        .catch(function (error) {
          console.log(error);
          alert(
            error.response.data.message
          );
        });
    };


  return (
   <>
   <div class="form-heading d-flex align-items-center justify-content-center mx-8">
    Masuk  untuk memulai</div>

     <form className="mx-5">
            <div className="mb-3">
               <div className="input-group">
         <span className="input-group-text bg-white">
         <i className="bi bi-person"></i>
         </span>
         <input type="text" className="form-control border-start-0" placeholder="Masukkan email anda" 
         value={username} 
         onChange={(e)=> {setUsername(e.target.value)}} />
       </div>
            </div>
           
            <div className="mb-3">
              <div className="input-group">
         <span className="input-group-text bg-white">
           <i className="bi bi-lock"></i>
         </span>
         <input type={see==false ? `password` : `text`} className="form-control border-start-0 border-end-0" placeholder="Buat password" 
         value={password} 
         onChange={(e)=> {setPassword(e.target.value)}} 
         /> 
         { see == false ? <span class="input-group-text border-start-0 bg-white" onClick={()=> setSee(true)} > <i class="bi bi-eye" id="togglePassword"></i>
         </span> : <span class="input-group-text border-start-0 bg-white" 
         onClick={()=> setSee(false)}> <i class="bi bi-eye-slash" id="togglePassword"></i>
         </span> }
       </div>
            </div>
           
            <button type="submit" className="btn btn-danger w-100"
              onClick={(e) => handleLogin(e)}
            >Login</button>
          
          </form>
   </>
    
          
    
  );
};

const mapStatetoProps = (state) => {
  return { statusLog: state.status };
};

const mapDispatchprops = (dispatch) => {
  return { onHandleLogin: () => dispatch(handleLogin()) };
};

export default connect(mapStatetoProps, mapDispatchprops)(LoginForm);
