import React, { useState, useEffect } from 'react';
import { Button, Container, Nav, Navbar, Card, Alert, Collapse, Row, Col } from 'react-bootstrap';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import ChatWindow from '../common/ChatWindow';
import Footer from '../common/FooterC';
import { FaComments, FaUserTie, FaSignOutAlt, FaCheckCircle, FaHourglassHalf, FaPaperPlane } from 'react-icons/fa';

const AgentHome = () => {
   const navigate = useNavigate();
   const [userName, setUserName] = useState('');
   const [toggle, setToggle] = useState({})
   const [agentComplaintList, setAgentComplaintList] = useState([]);

   useEffect(() => {
      const getData = async () => {
         try {
            const user = JSON.parse(localStorage.getItem('user'));
            if (user) {
               const { _id, name } = user;
               setUserName(name);
               const response = await axios.get(`http://localhost:8000/allcomplaints/${_id}`);
               const complaints = response.data;
               setAgentComplaintList(complaints);
            } else {
               navigate('/');
            }
         } catch (error) {
            console.log(error);
         }
      };

      getData();
   }, [navigate]);

   const handleStatusChange = async (complaintId) => {
      try {
         await axios.put(`http://localhost:8000/complaint/${complaintId}`, { status: 'completed' });
         setAgentComplaintList((prevComplaints) =>
            prevComplaints.map((complaint) =>
               complaint._doc.complaintId === complaintId ? { ...complaint, _doc: { ...complaint._doc, status: 'completed' } } : complaint
            )
         );
      } catch (error) {
         console.log(error);
      }
   };

   const handleToggle = (complaintId) => {
      setToggle((prevState) => ({
         ...prevState,
         [complaintId]: !prevState[complaintId],
      }));
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
                  <FaUserTie className="me-2" />
                  Agent Dashboard
               </Navbar.Brand>
               <Navbar.Toggle aria-controls="basic-navbar-nav" />
               <Navbar.Collapse id="basic-navbar-nav">
                  <Nav className="ms-auto">
                     <NavLink to="#" className="nav-link mx-2">
                        View Complaints
                     </NavLink>
                     <Button onClick={LogOut} variant="outline-primary" className="ms-2">
                        <FaSignOutAlt className="me-2" />
                        Log out
                     </Button>
                  </Nav>
               </Navbar.Collapse>
            </Container>
         </Navbar>

         <Container className="flex-grow-1 py-5">
            <h1 className="display-6 fw-bold text-primary mb-4">Welcome, Agent {userName}</h1>
            {agentComplaintList && agentComplaintList.length > 0 ? (
               <Row xs={1} md={2} lg={3} className="g-4">
                  {agentComplaintList.map((complaint, index) => {
                     const open = toggle[complaint._doc.complaintId] || false;
                     return (
                        <Col key={index}>
                           <Card className="h-100 border-0 shadow-sm">
                              <Card.Body>
                                 <Card.Title>{complaint.name}</Card.Title>
                                 <Card.Text><strong>Address:</strong> {complaint.address}, {complaint.city}, {complaint.state} - {complaint.pincode}</Card.Text>
                                 <Card.Text><strong>Comment:</strong> {complaint.comment}</Card.Text>
                                 <Card.Text>
                                    <strong>Status:</strong> {' '}
                                    {complaint._doc.status === 'completed' ? (
                                       <span className="text-success"><FaCheckCircle className="me-1" /> Completed</span>
                                    ) : (
                                       <span className="text-warning"><FaHourglassHalf className="me-1" /> Pending</span>
                                    )}
                                 </Card.Text>
                                 {complaint._doc.status !== 'completed' && (
                                    <Button onClick={() => handleStatusChange(complaint._doc.complaintId)} variant="primary" className="me-2 rounded-pill">
                                       <FaCheckCircle className="me-2" />
                                       Mark as Completed
                                    </Button>
                                 )}
                                 <Button 
                                    onClick={() => handleToggle(complaint._doc.complaintId)}
                                    aria-controls={`collapse-${complaint._doc.complaintId}`}
                                    aria-expanded={open}
                                    variant="outline-primary"
                                    className="mt-2 rounded-pill"
                                 >
                                    <FaComments className="me-2" />
                                    {open ? 'Close Chat' : 'Open Chat'}
                                 </Button>
                              </Card.Body>
                              <Collapse in={open}>
                                 <Card.Footer className="bg-light">
                                    <ChatWindow key={complaint._doc.complaintId} complaintId={complaint._doc.complaintId} name={userName} />
                                 </Card.Footer>
                              </Collapse>
                           </Card>
                        </Col>
                     );
                  })}
               </Row>
            ) : (
               <Alert variant="info">
                  <Alert.Heading>No complaints to show</Alert.Heading>
                  <p>There are currently no complaints assigned to you.</p>
               </Alert>
            )}
         </Container>

         <Footer />
      </div>
   );
};

export default AgentHome;