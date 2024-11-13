import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar, Nav, Container, Row, Col, Button, Card } from 'react-bootstrap';
import { FaComments, FaClipboardList, FaChartBar, FaSignOutAlt } from 'react-icons/fa';
import Footer from '../common/FooterC';
import Complaint from '../user/Complaint';
import Status from '../user/Status';

const HomePage = () => {
   const navigate = useNavigate();
   const [activeComponent, setActiveComponent] = useState('Complaint');
   const [userName, setUserName] = useState('');

   useEffect(() => {
      const getData = async () => {
         try {
            const user = JSON.parse(localStorage.getItem('user'));
            if (user) {
               const { name } = user;
               setUserName(name);
            } else {
               navigate('/');
            }
         } catch (error) {
            console.log(error);
         }
      };

      getData();
   }, [navigate]);

   const handleNavLinkClick = (componentName) => {
      setActiveComponent(componentName);
   };

   const Logout = () => {
      localStorage.removeItem('user');
      navigate('/');
   };

   return (
      <div className="d-flex flex-column min-vh-100 bg-light">
         <Navbar bg="white" expand="lg" className="shadow-sm">
            <Container>
               <Navbar.Brand className="fw-bold text-primary">
                  <FaComments className="me-2" />
                  FixHub
               </Navbar.Brand>
               <Navbar.Toggle aria-controls="basic-navbar-nav" />
               <Navbar.Collapse id="basic-navbar-nav">
                  <Nav className="ms-auto">
                     <Nav.Link
                        onClick={() => handleNavLinkClick('Complaint')}
                        active={activeComponent === 'Complaint'}
                        className="mx-2"
                     >
                        <FaClipboardList className="me-1" /> Complaint Register
                     </Nav.Link>
                     <Nav.Link
                        onClick={() => handleNavLinkClick('Status')}
                        active={activeComponent === 'Status'}
                        className="mx-2"
                     >
                        <FaChartBar className="me-1" /> Status
                     </Nav.Link>
                     <Button variant="outline-primary" onClick={Logout} className="ms-2">
                        <FaSignOutAlt className="me-1" /> Logout
                     </Button>
                  </Nav>
               </Navbar.Collapse>
            </Container>
         </Navbar>

         <Container className="flex-grow-1 py-5">
            <Row className="align-items-center mb-4">
               <Col>
                  <h1 className="display-6 fw-bold text-primary">Welcome, {userName}</h1>
               </Col>
            </Row>
            {activeComponent === 'Complaint' && <Complaint />}
            {activeComponent === 'Status' && <Status />}
         </Container>

         <Footer />
      </div>
   );
};

export default HomePage;