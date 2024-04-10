import React, { useEffect } from 'react'
import Header from './Header'
import { Button, Form } from 'react-bootstrap'
import AxiosService from '../utils/AxiosService'
import ApiRoutes from '../utils/ApiRoutes'
import toast from 'react-hot-toast'

const SignUp = () => {

    useEffect(()=>{
        sessionStorage.clear()
      },[])

    const handleCreate = async(e)=>{
        e.preventDefault()
        try {
          const formData = new FormData(e.target);
          const formProps = Object.fromEntries(formData);
    
          let users = await AxiosService.get(`${ApiRoutes.USER.path}`,{
            authenticate:false
        })
          var fetchedUsers = users.data.users

          const userExist = fetchedUsers.find((user)=> user.email === formProps.email)
          if(!userExist)
          {
            var len = fetchedUsers.length
            if (len == 0){
                formProps.userId = 1
            }
            else{
                formProps.userId = len+1
            }
        
            let res = await AxiosService.post(`${ApiRoutes.USER.path}`,formProps,{
                authenticate:false
            }) 
            toast.success("User Created Successfully")
          }else{
            toast.error("User Already Exist")
          }

          } catch (error) {
              console.error('Error Creating User: ', error);
          }  
      }

  return (
    <>
        <Header/>
        <div className='loginWrapper'>
            <h3>Create New User</h3>
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

                <Button variant="primary" type="submit">
                Create User
                </Button>   
            </Form>
        </div>
    </>
  )
}

export default SignUp