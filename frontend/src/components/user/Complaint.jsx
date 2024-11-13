import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button, Card, Container, Row, Col } from 'react-bootstrap';
import { FaPaperPlane } from 'react-icons/fa';

const Complaint = () => {
   const user = JSON.parse(localStorage.getItem('user'));
   const [userComplaint, setUserComplaint] = useState({
      userId: user._id,
      name: '',
      address: '',
      city: '',
      state: '',
      pincode: '',
      status: '',
      comment: ''
   });

   const handleChange = (e) => {
      const { name, value } = e.target;
      setUserComplaint({ ...userComplaint, [name]: value });
   };

   const handleClear = () => {
      setUserComplaint({
         userId: user._id,
         name: '',
         address: '',
         city: '',
         state: '',
         pincode: '',
         status: '',
         comment: ''
      });
   };

   const handleSubmit = async (e) => {
      e.preventDefault();
      try {
         const response = await axios.post(`http://localhost:8000/Complaint/${user._id}`, userComplaint);
         JSON.stringify(response.data.userComplaint);
         alert("Your Complaint has been sent!");
         handleClear();
      } catch (err) {
         console.log(err);
         alert("Something went wrong!");
      }
   };

   return (
      <Container>
         <Card className="border-0 shadow-lg overflow-hidden">
            <Card.Body className="p-5">
               <h2 className="h4 mb-4 text-primary">Register a Complaint</h2>
               <Form onSubmit={handleSubmit}>
                  <Row>
                     <Col md={6}>
                        <Form.Group className="mb-3">
                           <Form.Label>Name</Form.Label>
                           <Form.Control
                              type="text"
                              name="name"
                              value={userComplaint.name}
                              onChange={handleChange}
                              required
                           />
                        </Form.Group>
                     </Col>
                     <Col md={6}>
                        <Form.Group className="mb-3">
                           <Form.Label>Address</Form.Label>
                           <Form.Control
                              type="text"
                              name="address"
                              value={userComplaint.address}
                              onChange={handleChange}
                              required
                           />
                        </Form.Group>
                     </Col>
                  </Row>

                  <Row>
                     <Col md={4}>
                        <Form.Group className="mb-3">
                           <Form.Label>City</Form.Label>
                           <Form.Control
                              type="text"
                              name="city"
                              value={userComplaint.city}
                              onChange={handleChange}
                              required
                           />
                        </Form.Group>
                     </Col>
                     <Col md={4}>
                        <Form.Group className="mb-3">
                           <Form.Label>State</Form.Label>
                           <Form.Control
                              type="text"
                              name="state"
                              value={userComplaint.state}
                              onChange={handleChange}
                              required
                           />
                        </Form.Group>
                     </Col>
                     <Col md={4}>
                        <Form.Group className="mb-3">
                           <Form.Label>Pincode</Form.Label>
                           <Form.Control
                              type="text"
                              name="pincode"
                              value={userComplaint.pincode}
                              onChange={handleChange}
                              required
                           />
                        </Form.Group>
                     </Col>
                  </Row>

                  <Form.Group className="mb-3">
                     <Form.Label>Status</Form.Label>
                     <Form.Control
                        type="text"
                        name="status"
                        value={userComplaint.status}
                        onChange={handleChange}
                        placeholder="Type 'pending'"
                        required
                     />
                  </Form.Group>

                  <Form.Group className="mb-3">
                     <Form.Label>Description</Form.Label>
                     <Form.Control
                        as="textarea"
                        rows={3}
                        name="comment"
                        value={userComplaint.comment}
                        onChange={handleChange}
                        required
                     />
                  </Form.Group>

                  <Button variant="primary" type="submit" className="rounded-pill">
                     <FaPaperPlane className="me-2" /> Submit Complaint
                  </Button>
               </Form>
            </Card.Body>
         </Card>
      </Container>
   );
};

export default Complaint;