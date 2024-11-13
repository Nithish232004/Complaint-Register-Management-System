import React, { useState, useEffect } from 'react'
import { Accordion, Card, Dropdown, Alert, Container, Row, Col, Button } from 'react-bootstrap';
import { FaCheckCircle, FaHourglassHalf } from 'react-icons/fa';
import axios from 'axios';

const AccordionAdmin = () => {
  const [complaintList, setComplaintList] = useState([]);
  const [agentList, setAgentList] = useState([]);

  useEffect(() => {
    const getComplaints = async () => {
      try {
        const response = await axios.get('http://localhost:8000/status');
        setComplaintList(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    const getAgentsRecords = async () => {
      try {
        const response = await axios.get('http://localhost:8000/AgentUsers');
        setAgentList(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    getComplaints();
    getAgentsRecords();
  }, []);

  const handleSelection = async (agentId, complaintId, status, agentName) => {
    try {
      await axios.get(`http://localhost:8000/AgentUsers/${agentId}`);
      const assignedComplaint = {
        agentId,
        complaintId,
        status,
        agentName,
      };

      await axios.post('http://localhost:8000/assignedComplaints', assignedComplaint);
      setComplaintList(prevList => prevList.filter((complaint) => complaint._id !== complaintId));
      alert(`Complaint assigned to the Agent ${agentName}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container>
      <Accordion defaultActiveKey="0" className="mb-4">
        <Accordion.Item eventKey="0">
          <Accordion.Header>User Complaints</Accordion.Header>
          <Accordion.Body>
            <Row xs={1} md={2} lg={3} className="g-4">
              {complaintList.length > 0 ? (
                complaintList.map((complaint, index) => (
                  <Col key={index}>
                    <Card className="h-100 shadow-sm">
                      <Card.Body>
                        <Card.Title>{complaint.name}</Card.Title>
                        <Card.Text>
                          <strong>Address:</strong> {complaint.address}, {complaint.city}, {complaint.state} - {complaint.pincode}
                        </Card.Text>
                        <Card.Text>
                          <strong>Comment:</strong> {complaint.comment}
                        </Card.Text>
                        <Card.Text>
                          <strong>Status:</strong> {' '}
                          {complaint.status === 'completed' ? (
                            <span className="text-success"><FaCheckCircle className="me-1" /> Completed</span>
                          ) : (
                            <span className="text-warning"><FaHourglassHalf className="me-1" /> Pending</span>
                          )}
                        </Card.Text>
                        {complaint.status !== "completed" && (
                          <Dropdown>
                            <Dropdown.Toggle variant="primary" id={`dropdown-${complaint._id}`}>
                              Assign Agent
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                              {agentList.map((agent, index) => (
                                <Dropdown.Item 
                                  key={index} 
                                  onClick={() => handleSelection(agent._id, complaint._id, complaint.status, agent.name)}
                                >
                                  {agent.name}
                                </Dropdown.Item>
                              ))}
                            </Dropdown.Menu>
                          </Dropdown>
                        )}
                      </Card.Body>
                    </Card>
                  </Col>
                ))
              ) : (
                <Col>
                  <Alert variant="info">
                    <Alert.Heading>No complaints to show</Alert.Heading>
                  </Alert>
                </Col>
              )}
            </Row>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="1">
          <Accordion.Header>Agents</Accordion.Header>
          <Accordion.Body>
            <Row xs={1} md={2} lg={3} className="g-4">
              {agentList.length > 0 ? (
                agentList.map((agent, index) => (
                  <Col key={index}>
                    <Card className="h-100 shadow-sm">
                      <Card.Body>
                        <Card.Title>{agent.name}</Card.Title>
                        <Card.Text>
                          <strong>Email:</strong> {agent.email}
                        </Card.Text>
                      </Card.Body>
                    </Card>
                  </Col>
                ))
              ) : (
                <Col>
                  <Alert variant="info">
                    <Alert.Heading>No Agents to show</Alert.Heading>
                  </Alert>
                </Col>
              )}
            </Row>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </Container>
  );
}

export default AccordionAdmin;