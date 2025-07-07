import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import { API } from "config/api";
import axios from "axios";
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Masonry from '@mui/lab/Masonry';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

// const heights = [150, 30, 90, 70, 90, 100, 150, 30, 50, 80];

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(0.5),
  textAlign: 'center',
  color: (theme.vars || theme).palette.text.secondary,
  ...theme.applyStyles('dark', {
    backgroundColor: '#1A2027',
  }),
}));

export default function Home() {

    const [show, setShow] = useState(false);

     const [nameJadwal, setNameJadwal] = useState();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


const [dataChecklist, setDataChecklist] = useState();

const TOKEN = localStorage.getItem('token')
   const fetchCheckList = () => {
      axios
        .get(
          `${API}/checklist`,
           {
    headers: {
        'Authorization': `Bearer ${TOKEN}`
    }
}
        )
        .then(function (response) {
           
          console.log(response);
           setDataChecklist(response)
          
        })
        .catch(function (error) {
          console.log(error);
          alert(
            error.response.data.message
          );
        });
    };

   
    console.log("dataChecklist", dataChecklist)



       const handleTambahNotes = (e) => {
      e.preventDefault();
    const headers = {
      'Authorization': `Bearer ${TOKEN}`
    };
    axios
      .post(
        `${API}/checklist`,
        {
          
          name: nameJadwal
        },
        {
          headers: headers,
        }
      )
      .then(function (response) {
        console.log(response);
        alert("Jadwal Berhasil Ditambah");
        window.location.reload();
      })
      .catch(function (error) {
        console.log(error);
        alert(
          "Jadwal Gagal Di Tambah"
        );
      });
  };
    useEffect(() => {
        fetchCheckList();
      }, []);


  return (
    <>
    <div className="container-fluid">
      <NavBar />
    </div>

    <section id="layanan">
      <div className="container">

        <div className="row mt-5">
          <div className="col">Tambah Notes</div>
              <div className="col d-flex align-items-end justify-content-end">
                <button type="button" class="btn btn-success" onClick={handleShow}>Tambah</button>
              </div>
        </div>
       
          <div className="row mt-3">
            <Box sx={{  minHeight: 253 }}>
      <Masonry columns={4} spacing={2}>
        {
            //  heights.map(( index) => (
        dataChecklist?.data?.data && dataChecklist?.data?.data.map((data, i) => ( 
         
          <Item 
          // key={index} 
          // sx={{ height }}
          >
            <div className="row py-3 px-5">
              {data?.name}
              </div>
              <div className="row pb-3 px-5">

                {
        data?.items && data?.items.map((item, i) => ( 

 <div className="form-check">
          <input className="form-check-input" type="checkbox" value="SINGLE" id="defaultCheck1"
          // checked={
          //   orderType === "SINGLE" ?
          //   true : false
          // }
          // onChange={(e) => setOrderType(e.target.value)}
          />
         
          {item.name == null ? '-' : item?.name}
        </div>
        ))}
        
        
              </div>
          </Item>
            // ))
        ))}
      </Masonry>
    </Box>
          </div>
         
      </div>
    </section>
   

   <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Tambah Jadwal</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row px-3">
            <div className="col ">
          <div className="row">
            Judul Jadwal :
            <input type="text" className="form-control" placeholder="Masukkan Judul"  
            value={nameJadwal}
            onChange={(e) => setNameJadwal(e.target.value)}
            />
          </div>
      
          </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={(e)=> {handleTambahNotes(e)}}>
            Save 
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}