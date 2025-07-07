import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { fetchData } from "actions";
import LoginForm from "components/LoginForm";
import RegisterForm from "../components/RegisterForm";

const LandingPage = (props) => {
  useEffect(() => {}, []);
  const [page, setPage] = useState("regis");
  return (
    <>
    <div class="container-fluid landing vh-100">
    <div class="row h-100">
     <div className="col-md-6 d-flex align-items-center justify-content-center">
      <div className="w-100">
        <div class="logo mb-2 d-flex align-items-center justify-content-center"> 
          <img src={
            require(`../assets/images/jadwal.png`)
            } alt="Logo" className="logo-title w-80 px-2"/> 
          Check Jadwal
          </div>
             { page == 'regis' ? <>
             <RegisterForm />
             <div class="login-text"> Sudah punya akun? Login <a className="login-link" onClick={()=> {setPage('login')}}> di sini</a>
             </div>
           </> : <>
             <LoginForm />
             <div class="login-text"> Belum Punya Akun ? registrasi <a className="login-link" onClick={()=> {setPage('regis')}} >di sini</a>
             </div>
           </> }
        </div>
      </div>
     <div className="col-md-6 d-flex align-items-center justify-content-center">
      <img src={require(`../assets/images/jadwal_wall.jpg`)}
          alt="Illustration"
          className="vw-100 vh-100 img-fluid img-landing"/>
      </div>
    </div>
  </div>

    </>
  );
};

const mapStatetoProps = (state) => {
  return { num: state.num, data: state.data, error: state.error };
};

const mapDispatchprops = (dispatch) => {
  return { onFetchData: () => dispatch(fetchData()) };
};

export default connect(mapStatetoProps, mapDispatchprops)(LandingPage);
