import React, { useState } from 'react'
import Header from './Header'
import image from '../assets/diaryHome.jpg'
import { Button, Form, Image, Modal } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import AxiosService from '../utils/AxiosService'
import ApiRoutes from '../utils/ApiRoutes'

const Home = () => {

  const navigate = useNavigate()

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleCreate = async(e)=>{
    e.preventDefault()
    try {
      const formData = new FormData(e.target);
      const formProps = Object.fromEntries(formData);

      let users = await AxiosService.get(`${ApiRoutes.USER.path}`,{
        authenticate:ApiRoutes.USER.authenticate
    })
      var fetchedUsers = users.data.users
      var len = fetchedUsers.length
      if (len == 0){
          formProps.userId = 1
      }
      else{
          formProps.userId = len+1
      }

      let res = await AxiosService.post(`${ApiRoutes.USER.path}`,formProps,{
          authenticate:ApiRoutes.USER.authenticate
      }) 

      } catch (error) {
          console.error('Error Creating notes: ', error);
      }
    setShow(false);
    toast.success("User Created Successfully")
  }

  return (
    <>
        <Header/>
        
        <div className='container lobster-regular'>
          <div className="row" style={{backgroundColor:'rgb(61, 61, 61)'}}>
            <div className="col-md-3">
              <div className="row py-md-5 mt-5 ms-md-5">
                <div className="col text-light text-center">
                  <h1>My Diary</h1>
                </div>
              </div>
              <div className="row">
                <div className="col ms-md-5">
                  <p className='lead text-light text-center'>Create your own thoughts every day....</p>
                </div>
              </div>
              <div className="row">
                <div className="col mt-md-5 mt-4 ms-md-5 text-center">
                  <p className='btn btn-light' onClick={()=> navigate('/login')}>Click here to login</p>
                </div>
              </div>
            </div>
            <div className="col-md-6 text-center ">
              <Image src={image} thumbnail style={{height:"500px"}} className='m-4'/>
            </div>
            <div className="col-md-3">
              <div className="row py-md-5 mt-md-5 me-md-5">
                <div className="col">
                  <p className='lead text-light text-center'>New to My Diary</p>
                </div>
              </div>
              <div className="row me-md-5">
                <div className="col">
                  <p className='lead text-light text-center'>Create user now</p>
                </div>
              </div>
              <div className="row me-md-5 mt-4">
                <div className="col text-light text-center">
                  <p className='lead'>Click here to Sign Up</p>
                  <p className='btn btn-light' onClick={handleShow}>Sign up</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Sign Up!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleCreate}>
            <Form.Group className="mb-3">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" name="email" required/>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>User Name</Form.Label>
              <Form.Control type="text" placeholder="Enter Your Name" name="userName" required/>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" name="password" required/>
            </Form.Group>

            <Button className='me-3' variant="secondary" onClick={handleClose}>
             Close
            </Button>

            <Button variant="primary" type="submit">
              Create User
            </Button>
          </Form>
        </Modal.Body>
        {/* <Modal.Footer>
          
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer> */}
      </Modal>
    </>
  )
}

export default Home