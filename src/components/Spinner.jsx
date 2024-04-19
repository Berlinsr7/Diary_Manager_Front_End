import React from 'react'
import Modal from 'react-bootstrap/Modal';

const spinner = () => {
  return (
    <div className='container mt-5'>
        <Modal show animation={false}>
            <Modal.Header className='text-light' style={{backgroundColor: "black"}}>
            <Modal.Title>Loading.....</Modal.Title>
            </Modal.Header>
            <Modal.Body className='text-light' style={{backgroundColor: "black"}}>Hold tight...
                <div className='container' style={{height: "100px"}}>
                    <div className="row">
                        <div className="col me-5"></div>
                        <div className="col text-center ms-5 mt-4">
                            <div className="loader"></div>
                        </div>
                        <div className="col"></div>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    </div>
  )
}

export default spinner