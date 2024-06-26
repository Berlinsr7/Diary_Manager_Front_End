import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Header from './Header'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import AxiosService from '../utils/AxiosService'
import toast from 'react-hot-toast';
import Cards from './Cards';
import ApiRoutes from '../utils/ApiRoutes';
import useLogout from '../hooks/useLogout';
import Spinner from './Spinner';

const Notes = () => {

    const {date} = useParams()  
    const [loading, setLoading] = useState(false)  
    const [notes, setnotes] = useState([])
    const [showButton, setShowButton] = useState(false);
    const [disEdit, setDisEdit] = useState(false);
    const [formdata, setFormData] = useState({ name: '', description: '' });
    let logout = useLogout()
    const navigate = useNavigate()

    if(date){
        useEffect(()=>{
            const fetchData = async ()=>{
                const id = sessionStorage.getItem('id')
                setLoading(true)
                try {
                    let res = await AxiosService.get(`${ApiRoutes.USER.path}/${id}/notes`,{
                        authenticate:ApiRoutes.USER.authenticate
                      }) 
                    setnotes(res.data.notes.filter((note) => note.date === date));
                } catch (error) {
                    console.log(error.response.data.message)
                    if(error.response.status == 401){
                        if(error.response.data.message == "Unauthorised Access"){
                            toast.error(error.response.data.message)
                            navigate('/login')
                        }
                        else{
                            toast.error(error.response.data.message)
                            logout() 
                        }                        
                    }                 
                }
                finally {
                    setLoading(false);
                  }
                }        
            fetchData();
        },[])
    }else{
        useEffect(()=>{
            const fetchData = async ()=>{
                const id = sessionStorage.getItem('id')
                setLoading(true)
                try {
                    let res = await AxiosService.get(`${ApiRoutes.USER.path}/${id}/notes`,{
                    authenticate:ApiRoutes.USER.authenticate
                  }) 
                setnotes(res.data.notes)
                } catch (error) {
                    console.log(error.response.data.message)
                    if(error.response.status == 401){
                        if(error.response.data.message == "Unauthorised Access"){
                            toast.error(error.response.data.message)
                            navigate('/login')
                        }
                        else{
                            toast.error(error.response.data.message)
                            logout() 
                        }    
                    }   
                } 
                finally {
                    setLoading(false);
                  }               
                }        
            fetchData();
        },[])
    
    }
    
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formdata, [name]: value });
    };

    const handleAdd = async (e)=>{
        e.preventDefault()
        setLoading(true)
        const errors = {}
    
        try {
            const formData = new FormData(e.target);
            const formProps = Object.fromEntries(formData);

            if(formProps.name == ''){
                errors.name = 'Enter a name for the Note'
            }

            if(formProps.description == ''){
                errors.description = 'Enter a description for the Note'
            }

            if(!/(20)\d{2}\-(0[1-9]|1[1,2])\-(0[1-9]|[12][0-9]|3[01])/.test(formProps.date)){
                errors.date = 'Date should be in YYYY-MM-DD format'
            }

            if(!errors.hasOwnProperty("name") && !errors.hasOwnProperty("description") && !errors.hasOwnProperty("date")){
                var len = notes.length
                if (len == 0){
                    formProps.noteId = 1
                }
                else{
                    var noteid = notes[len-1].noteId
                    formProps.noteId = noteid+1
                }
                setnotes([...notes,formProps])
                const id = sessionStorage.getItem('id')
                let res = await AxiosService.post(`${ApiRoutes.USER.path}/${id}/notes`,formProps,{
                    authenticate:ApiRoutes.USER.authenticate
                }) 
                setFormData({ name: '', description: '' });
                toast.success("Note Created Successfully")
            }  
            else if(errors.hasOwnProperty("name"))  
            {
                toast.error(errors.name)
            }        
            else if(errors.hasOwnProperty("description"))  
            {
                toast.error(errors.description)
            }        
            else if(errors.hasOwnProperty("date"))  
            {
                toast.error(errors.date)
            } 
            else{
                toast.error('Invalid Data')
            }       
        } catch (error) {
            console.log(error.response.data.message)
            if(error.response.status == 401){
                toast.error(error.response.data.message)
                logout()
            }   
        }
        finally {
            setLoading(false);
          }          
    }

    const deleteNote = async (noteId)=>{
        setLoading(true)
        try {
            const id = sessionStorage.getItem('id')
            await AxiosService.delete(`${ApiRoutes.USER.path}/${id}/notes/${noteId}`,{
                authenticate:ApiRoutes.USER.authenticate
              })
            setnotes(notes.filter((note) => note.noteId !== noteId));
            console.log(notes)
            toast.success("Deleted Successfully")
          } catch (error) {
            console.log(error.response.data.message)
            if(error.response.status == 401){
                toast.error(error.response.data.message)
                logout()
            }   
          }
          finally {
            setLoading(false);
          }  
    }

    const editNote = (noteId, name, description)=>{
        setShowButton(!showButton)
        setFormData({noteId: `${noteId}`, name: `${name}`, description:`${description}`})
        console.log(noteId)
    }

    const handleSave = async ()=>{
        setLoading(true)
        try {
            setShowButton(!showButton);
            setDisEdit(false)   
            const noteid = formdata.noteId
            const id = sessionStorage.getItem('id')
            let res = await AxiosService.put(`${ApiRoutes.USER.path}/${id}/notes/${noteid}`,formdata,{
                authenticate:ApiRoutes.USER.authenticate
            }) 
            setFormData({ name: '', description: '' });
            setnotes(res.data.result.filter((note) => note.date === date))
            toast.success(res.data.message)
        } catch (error) {
            console.log(error.response.data.message)
            if(error.response.status == 401){
                toast.error(error.response.data.message)
                logout()
            }   
        }
        finally {
            setLoading(false);
          }  
    }

  return (
    <>
        <Header/>
        <div className="container text-light p-4 mt-2" style={{backgroundColor:'rgb(61, 61, 61)'}}>
            <div className="row">
                <div className="col">
                    <Form className='form' onSubmit={handleAdd}>
                        <Form.Group  className="mb-3">
                            <Form.Label>Notes Title</Form.Label>
                            <Form.Control type="text" placeholder="Enter Title" name="name" onChange={handleChange} value={formdata.name}/>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Description</Form.Label>
                            <Form.Control type="text" placeholder="Description" name="description" onChange={handleChange} value={formdata.description}/>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Date</Form.Label>
                            <Form.Control type="text" placeholder="Date" defaultValue={date} name="date"/>
                        </Form.Group>

                        <Button className='mb-4 me-5' variant="primary" type="submit">
                            Add Note
                        </Button>

                        {showButton && <Button className='mb-4 ms-5' variant="success" onClick={handleSave}>
                            Save Changes
                        </Button>}
                    </Form>
                </div>
            </div>
            {loading && <Spinner />}
            <div className="row">
                {notes.length === 0 ? "Create your tasks here" : notes.map((note,index) => <Cards key={index} name={note.name} description={note.description} 
                noteId={note.noteId} date={note.date} deleteNote={deleteNote} editNote={editNote} disEdit={disEdit} setDisEdit={setDisEdit}/>)}
            </div>
        </div>
    </>
  )
}

export default Notes