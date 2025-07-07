import React, { useState, useEffect } from "react";

import { Container, Row, Col, Button, Form, Modal } from "react-bootstrap";
import { Link, useNavigate  } from "react-router-dom";
import { API, setAuthToken } from "config/api";
import { connect } from "react-redux";
import { handleLogin } from "actions";
import axios from "axios";

const RegisterForm = (props) => {
  const navigate = useNavigate ();
  // const handleLogin = () => {
  //   history.push(`/home`);
  // };

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
   const [konfirm, setKonfirm] = useState("");
   const [see, setSee] = useState(false);
      const [seeKon, setSeeKon] = useState(false);

    const handleRegist = (e) => {
       e.preventDefault();
    const headers = {
      "Content-Type": "application/x-www-form-urlencoded",
    };
    axios
      .post(
        `${API}/Registration`,
       {
        email: email,
        first_name: firstName,
        last_name: lastName,
        password: password
},
        {
          headers: headers,
        }
      )
      .then(function (response) {
        console.log(response);
        alert("tambah Data Berhasil");
        window.location.reload();
      })
      .catch(function (error) {
        console.log(error);
        alert(
          error.response.data.message
        );
      });
  };

  console.log("statusLog", props.statusLog);

  // useEffect(() => {
  //   props.onHandleLogin()
  // }, []);
  const StatusLog = window.localStorage.getItem("LogStatus");
  const handleRedirect = () => {
    window.location.reload();
  };
  return (
 <>
   <div class="form-heading d-flex align-items-center justify-content-center mx-8">Lengkapi data untuk membuat akun</div>
   <form className="mx-5">
     <div className="mb-3">
       <div className="input-group">
         <span className="input-group-text bg-white">
           <i className="bi bi-envelope"></i>
         </span>
         <input type="email" className="form-control border-start-0" placeholder="Masukkan email anda" value={email} onChange={(e)=> {setEmail(e.target.value)}} />
       </div>
     </div>
     <div className="mb-3">
       <div className="input-group">
         <span className="input-group-text bg-white">
           <i className="bi bi-person"></i>
         </span>
         <input type="text" className="form-control border-start-0" placeholder="Nama depan" value={firstName} onChange={(e)=> {setFirstName(e.target.value)}} />
       </div>
     </div>
     <div className="mb-3">
       <div className="input-group ">
         <span className="input-group-text bg-white">
           <i className="bi bi-person"></i>
         </span>
         <input type="text" className="form-control border-start-0" placeholder="Nama belakang" value={lastName} onChange={(e)=> {setLastName(e.target.value)}}/>
       </div>
     </div>
     <div className="mb-3">
       <div className="input-group">
         <span className="input-group-text bg-white">
           <i className="bi bi-lock"></i>
         </span>
         <input type={see==false ? `password` : `text`} className="form-control border-start-0 border-end-0" placeholder="Buat password" value={password} onChange={(e)=> {setPassword(e.target.value)}} /> { see == false ? <span class="input-group-text border-start-0 bg-white" onClick={()=> setSee(true)} > <i class="bi bi-eye" id="togglePassword"></i>
         </span> : <span class="input-group-text border-start-0 bg-white" onClick={()=> setSee(false)}> <i class="bi bi-eye-slash" id="togglePassword"></i>
         </span> }
       </div>
     </div>
     <div className="mb-4">
       <div className="input-group">
         <span className="input-group-text bg-white">
           <i className="bi bi-lock"></i>
         </span>
         <input type={seeKon==false ? `password` : `text`} className="form-control border-start-0 border-end-0" placeholder="Konfirmasi password" value={konfirm} onChange={(e)=> {setKonfirm(e.target.value)}} /> { seeKon == false ? <span class="input-group-text border-start-0 bg-white" onClick={()=> setSeeKon(true)} > <i class="bi bi-eye" id="togglePassword"></i>
         </span> : <span class="input-group-text border-start-0 bg-white" onClick={()=> setSeeKon(false)}> <i class="bi bi-eye-slash" id="togglePassword"></i>
         </span> }
       </div> { konfirm == password ? '' : <span className="konfirm-pass">Konfirmasi password harus sesuai</span> }
     </div>
     <button type="submit" className="btn btn-danger w-100" onClick={(e)=>{handleRegist(e)}} >Registrasi</button>
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

export default connect(mapStatetoProps, mapDispatchprops)(RegisterForm);
