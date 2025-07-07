import React, { useEffect, useState, useRef  } from "react";
import NavBar from "../components/NavBar";
import { API } from "config/api";
import axios from "axios";
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Masonry from '@mui/lab/Masonry';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Overlay from 'react-bootstrap/Overlay';
import Popover from 'react-bootstrap/Popover';

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
  const [smShow, setSmShow] = useState(false);
  const [deleteShow, setDeleteShow] = useState(false);
  const [nameJadwal, setNameJadwal] = useState();
  const [nameItems, setNameItems] = useState();
  const [idJadwal, setIdJadwal] = useState();
  const [dataChecklist, setDataChecklist] = useState();
  
  const [showPop, setShowPop] = useState(false);
  const [target, setTarget] = useState(null);
  const ref = useRef(null);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);



  const handleClick = (e, id) => {
    setShowPop(!showPop);
    setTarget(e.target);
    setIdJadwal(id)
  };




  const handleSetId = (id) => {
    setSmShow(true)
  }

  console.log("idJadwal", idJadwal)

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

    const handleTambahItems = (e) => {
      e.preventDefault();
    const headers = {
      'Authorization': `Bearer ${TOKEN}`
    };
    axios
      .post(
        `${API}/checklist/${idJadwal}/item`,
        {
          
          itemName: nameItems
        },
        {
          headers: headers,
        }
      )
      .then(function (response) {
        console.log(response);
        alert("Item Berhasil Ditambah");
        window.location.reload();
      })
      .catch(function (error) {
        console.log(error);
        alert(
          "Item Gagal Di Tambah"
        );
      });
  };

     const handleDeleteChecklist = (e) => {
      e.preventDefault();
    const headers = {
      'Authorization': `Bearer ${TOKEN}`
    };
    axios
      .delete(
        `${API}/checklist/${idJadwal}`,
        {
          headers: headers,
        }
      )
      .then(function (response) {
        console.log(response);
        alert("Checklist Berhasil Hapus");
        window.location.reload();
      })
      .catch(function (error) {
        console.log(error);
        alert(
          "Checklist gagal Hapus"
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
            <div className="row py-3 px-3 d-flex align-items-center">
              <div className="col-md-8">
                <h5>{data?.name}</h5>
                
                </div>
              <div className="col d-flex align-items-end justify-content-end" ref={ref}>
                <button type="button" class="btn btn-outline-info"
                
                onClick={(e) => handleClick(e, data?.id)}
                ><i class="bi bi-gear"></i></button> 

                <Overlay
        show={showPop}
        target={target}
        placement="bottom"
        container={ref}
        containerPadding={20}
      >
        <Popover id="popover-contained">
        
          <Popover.Body>
           <ul class="list-group list-group-flush">
            
              <li class="list-group-item" onClick={() => handleSetId(data?.id)}>Tambah Item</li>
              <li class="list-group-item">Delete Item</li>
              <li class="list-group-item">Edit Item</li>
              <li class="list-group-item">Rename Item</li>
              <li class="list-group-item" onClick={() => setDeleteShow(true)}>Delete Checklist</li>
            </ul>
          </Popover.Body>
        </Popover>
      </Overlay>
                </div>
              
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

      <Modal
       
        show={smShow}
        onHide={() => setSmShow(false)}
       
      >
        <Modal.Header closeButton>
          <Modal.Title >
            Tambah Item Jadwal
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Item Jadwal :
            <input type="text" className="form-control" placeholder="Masukkan deskripsi Item Jadwal"  
            value={nameItems}
            onChange={(e) => setNameItems(e.target.value)}
            />
        </Modal.Body>
           <Modal.Footer>
          <Button variant="secondary" onClick={() => setSmShow(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={(e)=> {handleTambahItems(e)}}>
            Save 
          </Button>
        </Modal.Footer>
      </Modal>


       <Modal
       
        show={deleteShow}
        onHide={() => setDeleteShow(false)}
       
      >
        <Modal.Header closeButton>
         
        </Modal.Header>
        <Modal.Body>
         Apakah Anda yakin menghapus checklist ini ?
        </Modal.Body>
           <Modal.Footer>
          <Button variant="secondary" onClick={() => setDeleteShow(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={(e) => handleDeleteChecklist(e)}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}