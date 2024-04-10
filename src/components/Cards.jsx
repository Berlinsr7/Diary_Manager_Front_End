import React from 'react'
import { Button } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';

const Cards = ({name, description, noteId, date, deleteNote, editNote, disEdit, setDisEdit}) => {
    
  const handleEdit = (noteId, name, description)=>{
    editNote(noteId, name, description) 
    setDisEdit(!disEdit)   
  }

  const handleDelete = (noteId)=>{
    deleteNote(noteId)
  }

  return (
    <div className="col-md-4 col-lg-3 col-sm-6 mb-3 lobster-regular">
        <Card border='info' bg={'dark'}
          key={'info'}
          text={'info'}
          className="mb-2">
        <Card.Body>
            <Card.Title>{name}</Card.Title>
            <Card.Subtitle className="mb-2">{date}</Card.Subtitle>
            <Card.Text>{description}</Card.Text>
            <Button className='m-2' variant="light" onClick={()=> handleEdit(noteId, name, description)} disabled={disEdit}>Edit Note</Button>
            <Button className='m-2' variant="danger" onClick={()=> handleDelete(noteId)}>Delete Note</Button>
        </Card.Body>
        </Card>
    </div>
  )
}

export default Cards