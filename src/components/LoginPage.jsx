import React,{useEffect,useState} from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import AxiosService from '../utils/AxiosService'
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import ApiRoutes from '../utils/ApiRoutes';
import Spinner from './Spinner';

function Login() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false);

  useEffect(()=>{
    sessionStorage.clear()
  },[])
  
  const handleLogin = async(e)=>{
    e.preventDefault()
    setLoading(true);
    const errors = {}
   try {
    const formData = new FormData(e.target);
    const formProps = Object.fromEntries(formData);
    
    if (!/\S+@\S+\.\S+/.test(formProps.email)) {
      errors.email = 'Email is not valid';
    }
    if (!formProps.password) {
      errors.password = 'Password is required';
    }

    if(!errors.hasOwnProperty("email") && !errors.hasOwnProperty("password"))
      {let res = await AxiosService.post(ApiRoutes.USER_LOGIN.path,formProps,{
        authenticate:ApiRoutes.USER_LOGIN.authenticate
      })
      console.log(res)
      if(res.status===200)
      {
        sessionStorage.setItem('token',res.data.token)
        sessionStorage.setItem('name',res.data.name)
        sessionStorage.setItem('id',res.data.userId)

        toast.success(res.data.message)
        
        navigate('/calander')
      }
      else
      {
        toast.error(res.data.message)
      }}
    else if(formProps.email == ''){
      toast.error("Email should not be empty")
    }
    else if(formProps.password == ''){
      toast.error("Password should not be empty")
    }
    else{
      toast.error("Invalid Credentials")
    }
   } catch (error) {
      toast.error(error.response.data.message)      
   }
   finally {
    setLoading(false);
  }
  }
  return <>
    {loading && <Spinner />}
    <Header/>
    <div className='loginWrapper'>
    <h3>Whose Diary is this</h3>
    <Form onSubmit={handleLogin}>
      <Form.Group className="mb-3">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" name="email"/>
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" name="password"/>
      </Form.Group>

      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  </div>
  </>
 
}

export default Login