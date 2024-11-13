import React, { useEffect, useState } from 'react';
import { Container, Nav, Navbar, Button } from 'react-bootstrap';
import { NavLink, useNavigate } from 'react-router-dom';
import { FaUserShield, FaUsers, FaUserTie, FaChartBar, FaSignOutAlt } from 'react-icons/fa';
import UserInfo from './UserInfo';
import AccordionAdmin from "./AccordionAdmin";
import AgentInfo from './AgentInfo';
import Footer from '../common/FooterC';

const AdminHome = () => {
   const navigate = useNavigate();
   const [activeComponent, setActiveComponent] = useState('dashboard');
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

   const LogOut = () => {
      localStorage.removeItem('user');
      navigate('/');
   };

   return (
      <div className="d-flex flex-column min-vh-100 bg-light">
         <Navbar bg="white" expand="lg" className="shadow-sm">
            <Container>
               <Navbar.Brand className="fw-bold text-primary">
                  <FaUserShield className="me-2" />
                  Admin Dashboard
               </Navbar.Brand>
               <Navbar.Toggle aria-controls="basic-navbar-nav" />
               <Navbar.Collapse id="basic-navbar-nav">
                  <Nav className="me-auto">
                     <Nav.Link
                        as={NavLink}
                        to="#"
                        className={`mx-2 ${activeComponent === 'dashboard' ? 'active' : ''}`}
                        onClick={() => handleNavLinkClick('dashboard')}
                     >
                        <FaChartBar className="me-1" /> Dashboard
                     </Nav.Link>
                     <Nav.Link
                        as={NavLink}
                        to="#"
                        className={`mx-2 ${activeComponent === 'UserInfo' ? 'active' : ''}`}
                        onClick={() => handleNavLinkClick('UserInfo')}
                     >
                        <FaUsers className="me-1" /> Users
                     </Nav.Link>
                     <Nav.Link
                        as={NavLink}
                        to="#"
                        className={`mx-2 ${activeComponent === 'Agent' ? 'active' : ''}`}
                        onClick={() => handleNavLinkClick('Agent')}
                     >
                        <FaUserTie className="me-1" /> Agents
                     </Nav.Link>
                  </Nav>
                  <Button onClick={LogOut} variant="outline-primary">
                     <FaSignOutAlt className="me-2" />
                     Log out
                  </Button>
               </Navbar.Collapse>
            </Container>
         </Navbar>
         
         <Container className="flex-grow-1 py-4">
            <h1 className="display-6 fw-bold text-primary mb-4">Welcome, Admin {userName}</h1>
            {activeComponent === 'Agent' && <AgentInfo />}
            {activeComponent === 'dashboard' && <AccordionAdmin />}
            {activeComponent === 'UserInfo' && <UserInfo />}
         </Container>

         <Footer />
      </div>
   );
};

export default AdminHome;