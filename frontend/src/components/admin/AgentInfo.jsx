import React, { useEffect, useState } from 'react';
import { Button, Table, Alert, Container, Collapse, Form, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { FaEdit, FaTrash } from 'react-icons/fa';
import axios from 'axios';

const AgentInfo = () => {
   const navigate = useNavigate();
   const [agentList, setAgentList] = useState([]);
   const [toggle, setToggle] = useState({})
   const [updateAgent, setUpdateAgent] = useState({
      name: '',
      email: '',
      phone: '',
   })

   const handleChange = (e) => {
      setUpdateAgent({ ...updateAgent, [e.target.name]: e.target.value })
   }

   const handleSubmit = async (user_id) => {
      if (Object.values(updateAgent).every(val => val === '')) {
         alert("At least 1 field needs to be filled")
      } else {
         if (window.confirm("Are you sure you want to update the agent?")) {
            try {
               const res = await axios.put(`http://localhost:8000/user/${user_id}`, updateAgent);
               alert(`Agent updated successfully`);
               JSON.stringify(res.data);
               // Refresh the agent list
               const response = await axios.get('http://localhost:8000/agentUsers');
               setAgentList(response.data);
            } catch (err) {
               console.log(err);
            }
         }
      }
   }

   useEffect(() => {
      const getAgentRecords = async () => {
         try {
            const response = await axios.get('http://localhost:8000/agentUsers');
            setAgentList(response.data);
         } catch (error) {
            console.log(error);
         }
      };
      getAgentRecords();
   }, [navigate]);

   const deleteAgent = async (agentId) => {
      if (window.confirm("Are you sure you want to delete the agent?")) {
         try {
            await axios.delete(`http://localhost:8000/OrdinaryUsers/${agentId}`);
            setAgentList(agentList.filter((agent) => agent._id !== agentId));
         } catch (error) {
            console.log(error);
         }
      }
   }

   const handleToggle = (agentId) => {
      setToggle(prevState => ({
         ...prevState,
         [agentId]: !prevState[agentId]
      }));
   };

   return (
      <Container>
         <Card className="shadow-sm">
            <Card.Body>
               <h2 className="h4 mb-4">Agent Information</h2>
               {agentList.length > 0 ? (
                  <Table responsive hover>
                     <thead>
                        <tr>
                           <th>Name</th>
                           <th>Email</th>
                           <th>Phone</th>
                           <th>Actions</th>
                        </tr>
                     </thead>
                     <tbody>
                        {agentList.map((agent) => {
                           const open = toggle[agent._id] || false;
                           return (
                              <React.Fragment key={agent._id}>
                                 <tr>
                                    <td>{agent.name}</td>
                                    <td>{agent.email}</td>
                                    <td>{agent.phone}</td>
                                    <td>
                                       <Button
                                          onClick={() => handleToggle(agent._id)}
                                          variant="outline-primary"
                                          size="sm"
                                          className="me-2"
                                       >
                                          <FaEdit /> Edit
                                       </Button>
                                       <Button
                                          onClick={() => deleteAgent(agent._id)}
                                          variant="outline-danger"
                                          size="sm"
                                       >
                                          <FaTrash /> Delete
                                       </Button>
                                    </td>
                                 </tr>
                                 <tr>
                                    <td colSpan="4">
                                       <Collapse in={open}>
                                          <div>
                                             <Form onSubmit={(e) => { e.preventDefault(); handleSubmit(agent._id); }} className="p-3 bg-light rounded">
                                                <Form.Group className="mb-3">
                                                   <Form.Label>Full Name</Form.Label>
                                                   <Form.Control name='name' value={updateAgent.name} onChange={handleChange} type="text" placeholder="Enter name" />
                                                </Form.Group>
                                                <Form.Group className="mb-3">
                                                   <Form.Label>Email address</Form.Label>
                                                   <Form.Control name='email' value={updateAgent.email} onChange={handleChange} type="email" placeholder="Enter email" />
                                                </Form.Group>
                                                <Form.Group className="mb-3">
                                                   <Form.Label>Phone</Form.Label>
                                                   <Form.Control name='phone' value={updateAgent.phone} onChange={handleChange} type="tel" placeholder="Enter Phone no." />
                                                </Form.Group>
                                                <Button variant="primary" type="submit">
                                                   Update Agent
                                                </Button>
                                             </Form>
                                          </div>
                                       </Collapse>
                                    </td>
                                 </tr>
                              </React.Fragment>
                           );
                        })}
                     </tbody>
                  </Table>
               ) : (
                  <Alert variant="info">
                     <Alert.Heading>No Agents to show</Alert.Heading>
                  </Alert>
               )}
            </Card.Body>
         </Card>
      </Container>
   );
}

export default AgentInfo;