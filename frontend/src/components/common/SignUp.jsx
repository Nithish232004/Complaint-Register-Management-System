import axios from 'axios';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Dropdown, Container, Navbar, Nav, Form, Button, Card, Row, Col, InputGroup } from 'react-bootstrap';
import { FaUser, FaEnvelope, FaLock, FaPhone, FaUserPlus } from 'react-icons/fa';
import Footer from './FooterC';

const SignUp = () => {
   const [title, setTitle] = useState("Select User Type");
   const [user, setUser] = useState({
      name: "",
      email: "",
      password: "",
      phone: "",
      userType: ""
   });

   const handleChange = (e) => {
      setUser({ ...user, [e.target.name]: e.target.value });
   };

   const handleTitle = (select) => {
      setTitle(select);
      setUser({ ...user, userType: select });
   };

   const handleSubmit = async (e) => {
      e.preventDefault();
      const updatedUser = { ...user, userType: title };
      try {
         const res = await axios.post("http://localhost:8000/SignUp", updatedUser);
         alert("Record submitted successfully");
         JSON.stringify(res.data.user);
         setUser({
            name: "",
            email: "",
            password: "",
            phone: "",
            userType: ""
         });
         setTitle("Select User Type");
      } catch (err) {
         console.log(err);
         alert("An error occurred. Please try again.");
      }
   };

   return (
      <div className="d-flex flex-column min-vh-100 bg-light">
         <Navbar bg="white" expand="lg" className="shadow-sm">
            <Container>
               <Navbar.Brand as={Link} to="/" className="text-primary fw-bold">
                  <FaUserPlus className="me-2" />
                  FixHub
               </Navbar.Brand>
               <Navbar.Toggle aria-controls="basic-navbar-nav" />
               <Navbar.Collapse id="basic-navbar-nav">
                  <Nav className="ms-auto">
                     <Nav.Link as={Link} to="/">Home</Nav.Link>
                     <Nav.Link as={Link} to="/signup">Sign Up</Nav.Link>
                     <Nav.Link as={Link} to="/login">Login</Nav.Link>
                  </Nav>
               </Navbar.Collapse>
            </Container>
         </Navbar>

         <Container className="flex-grow-1 d-flex align-items-center py-5">
            <Row className="justify-content-center w-100">
               <Col md={8} lg={6} xl={5}>
                  <Card className="shadow-lg border-0 rounded-lg">
                     <Card.Body className="p-5">
                        <h2 className="text-center mb-4 text-primary">Create an Account</h2>
                        <Form onSubmit={handleSubmit}>
                           <InputGroup className="mb-3">
                              <InputGroup.Text><FaUser /></InputGroup.Text>
                              <Form.Control
                                 type="text"
                                 name="name"
                                 value={user.name}
                                 onChange={handleChange}
                                 placeholder="Full Name"
                                 required
                              />
                           </InputGroup>
                           <InputGroup className="mb-3">
                              <InputGroup.Text><FaEnvelope /></InputGroup.Text>
                              <Form.Control
                                 type="email"
                                 name="email"
                                 value={user.email}
                                 onChange={handleChange}
                                 placeholder="Email"
                                 required
                              />
                           </InputGroup>
                           <InputGroup className="mb-3">
                              <InputGroup.Text><FaLock /></InputGroup.Text>
                              <Form.Control
                                 type="password"
                                 name="password"
                                 value={user.password}
                                 onChange={handleChange}
                                 placeholder="Password"
                                 required
                              />
                           </InputGroup>
                           <InputGroup className="mb-3">
                              <InputGroup.Text><FaPhone /></InputGroup.Text>
                              <Form.Control
                                 type="tel"
                                 name="phone"
                                 value={user.phone}
                                 onChange={handleChange}
                                 placeholder="Mobile No."
                                 required
                              />
                           </InputGroup>
                           <Dropdown className="mb-4">
                              <Dropdown.Toggle variant="outline-primary" id="dropdown-basic" className="w-100">
                                 {title}
                              </Dropdown.Toggle>
                              <Dropdown.Menu className="w-100">
                                 <Dropdown.Item onClick={() => handleTitle("Ordinary")}>Ordinary</Dropdown.Item>
                                 <Dropdown.Item onClick={() => handleTitle("Admin")}>Admin</Dropdown.Item>
                                 <Dropdown.Item onClick={() => handleTitle("Agent")}>Agent</Dropdown.Item>
                              </Dropdown.Menu>
                           </Dropdown>
                           <Button variant="primary" type="submit" className="w-100 mb-3">
                              Register
                           </Button>
                        </Form>
                        <div className="text-center">
                           <p className="mb-0">
                              Already have an account? <Link to="/Login" className="text-primary">Login</Link>
                           </p>
                        </div>
                     </Card.Body>
                  </Card>
               </Col>
            </Row>
         </Container>

         <Footer />
      </div>
   );
};

export default SignUp;