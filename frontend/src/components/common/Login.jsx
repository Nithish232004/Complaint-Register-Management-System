import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Container, Navbar, Nav, Form, Button, Card, Row, Col, InputGroup } from 'react-bootstrap';
import { FaEnvelope, FaLock, FaSignInAlt } from 'react-icons/fa';
import Footer from './FooterC';

const Login = () => {
   const navigate = useNavigate();
   const [user, setUser] = useState({
      email: "",
      password: ""
   });

   const handleChange = (e) => {
      const { name, value } = e.target;
      setUser({ ...user, [name]: value });
   };

   const handleSubmit = async (e) => {
      e.preventDefault();
      try {
         const res = await axios.post("http://localhost:8000/Login", user);
         alert("Successfully logged in");
         localStorage.setItem("user", JSON.stringify(res.data));
         const isLoggedIn = JSON.parse(localStorage.getItem("user"));
         const { userType } = isLoggedIn;
         switch (userType) {
            case "Admin":
               navigate("/AdminHome");
               break;
            case "Ordinary":
               navigate("/HomePage");
               break;
            case "Agent":
               navigate("/AgentHome");
               break;
            default:
               navigate("/Login");
               break;
         }
      } catch (err) {
         if (err.response && err.response.status === 401) {
            alert("User doesn't exist");
         }
         navigate("/Login");
      }
   };

   return (
      <div className="d-flex flex-column min-vh-100 bg-light">
         <Navbar bg="white" expand="lg" className="shadow-sm">
            <Container>
               <Navbar.Brand as={Link} to="/" className="text-primary fw-bold">
                  <FaSignInAlt className="me-2" />
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
                        <h2 className="text-center mb-4 text-primary">Welcome Back</h2>
                        <Form onSubmit={handleSubmit}>
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
                           <InputGroup className="mb-4">
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
                           <Button variant="primary" type="submit" className="w-100 mb-3">
                              Login
                           </Button>
                        </Form>
                        <div className="text-center">
                           <p className="mb-0">
                              Don't have an account? <Link to="/SignUp" className="text-primary">Sign Up</Link>
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

export default Login;