import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Alert, Button, Container, Row, Col, Collapse } from 'react-bootstrap';
import { FaComments, FaCheckCircle, FaHourglassHalf } from 'react-icons/fa';
import ChatWindow from '../common/ChatWindow';

const Status = () => {
  const [toggle, setToggle] = useState({});
  const [statusComplaints, setStatusComplaints] = useState([]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    const { _id } = user;

    axios.get(`http://localhost:8000/status/${_id}`)
      .then((res) => {
        setStatusComplaints(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleToggle = (complaintId) => {
    setToggle((prevState) => ({
       ...prevState,
       [complaintId]: !prevState[complaintId],
    }));
  };

  return (
    <Container>
      <h2 className="h4 mb-4 text-primary">Complaint Status</h2>
      {statusComplaints.length > 0 ? (
        <Row xs={1} md={2} lg={3} className="g-4">
          {statusComplaints.map((complaint, index) => {
            const open = toggle[complaint._id] || false;
            return (
              <Col key={index}>
                <Card className="h-100 border-0 shadow-sm">
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
                      {complaint.status === 'pending' ? (
                        <span className="text-warning"><FaHourglassHalf className="me-1" /> Pending</span>
                      ) : (
                        <span className="text-success"><FaCheckCircle className="me-1" /> Resolved</span>
                      )}
                    </Card.Text>
                    <Button
                      onClick={() => handleToggle(complaint._id)}
                      aria-controls={`collapse-${complaint._id}`}
                      aria-expanded={open}
                      variant="outline-primary"
                      className="mt-2 rounded-pill"
                    >
                      <FaComments className="me-2" />
                      {open ? 'Close Chat' : 'Open Chat'}
                    </Button>
                  </Card.Body>
                  <Collapse in={open}>
                    <div>
                      <Card.Footer className="bg-light">
                        <ChatWindow key={complaint.complaintId} complaintId={complaint._id} name={complaint.name} />
                      </Card.Footer>
                    </div>
                  </Collapse>
                </Card>
              </Col>
            );
          })}
        </Row>
      ) : (
        <Alert variant="info">
          <Alert.Heading>No complaints to show</Alert.Heading>
          <p>You haven't submitted any complaints yet.</p>
        </Alert>
      )}
    </Container>
  );
};

export default Status;