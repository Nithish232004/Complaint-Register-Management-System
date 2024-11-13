import React, { useEffect, useState } from 'react';
import { Button, Table, Alert, Container, Collapse, Form, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { FaEdit, FaTrash } from 'react-icons/fa';
import axios from 'axios';

const UserInfo = () => {
   const navigate = useNavigate();
   const [ordinaryList, setOrdinaryList] = useState([]);
   const [toggle, setToggle] = useState({})
   const [updateUser, setUpdateUser] = useState({
      name: '',
      email: '',
      phone: '',
   })

   const handleChange = (e) => {
      setUpdateUser({ ...updateUser, [e.target.name]: e.target.value })
   }

   const handleSubmit = async (user_id) => {
      if (Object.values(updateUser).every(val => val === '')) {
         alert("At least 1 field needs to be filled")
      } else {
         if (window.confirm("Are you sure you want to update the user?")) {
            try {
               const res = await axios.put(`http://localhost:8000/user/${user_id}`, updateUser);
               alert(`User updated successfully`);
               JSON.stringify(res.data);
               // Refresh the user list
               const response = await axios.get('http://localhost:8000/OrdinaryUsers');
               setOrdinaryList(response.data);
            } catch (err) {
               console.log(err);
            }
         }
      }
   }

   useEffect(() => {
      const getOrdinaryRecords = async () => {
         try {
            const response = await axios.get('http://localhost:8000/OrdinaryUsers');
            setOrdinaryList(response.data);
         } catch (error) {
            console.log(error);
         }
      };
      getOrdinaryRecords();
   }, [navigate]);

   const deleteUser = async (userId) => {
      if (window.confirm("Are you sure you want to delete the user?")) {
         try {
            await axios.delete(`http://localhost:8000/OrdinaryUsers/${userId}`);
            setOrdinaryList(ordinaryList.filter((user) => user._id !== userId));
         } catch (error) {
            console.log(error);
         }
      }
   }

   const handleToggle = (userId) => {
      setToggle(prevState => ({
         ...prevState,
         [userId]: !prevState[userId]
      }));
   };

   return (
      <Container>
         <Card className="shadow-sm">
            <Card.Body>
               <h2 className="h4 mb-4">User Information</h2>
               {ordinaryList.length > 0 ? (
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
                        {ordinaryList.map((user) => {
                           const open = toggle[user._id] || false;
                           return (
                              <React.Fragment key={user._id}>
                                 <tr>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>{user.phone}</td>
                                    <td>
                                       <Button
                                          onClick={() => handleToggle(user._id)}
                                          variant="outline-primary"
                                          size="sm"
                                          className="me-2"
                                       >
                                          <FaEdit /> Edit
                                       </Button>
                                       <Button
                                          onClick={() => deleteUser(user._id)}
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
                                             <Form onSubmit={(e) => { e.preventDefault(); handleSubmit(user._id); }} className="p-3 bg-light rounded">
                                                <Form.Group className="mb-3">
                                                   <Form.Label>Full Name</Form.Label>
                                                   <Form.Control name='name' value={updateUser.name} onChange={handleChange} type="text" placeholder="Enter name" />
                                                </Form.Group>
                                                <Form.Group className="mb-3">
                                                   <Form.Label>Email address</Form.Label>
                                                   <Form.Control name='email' value={updateUser.email} onChange={handleChange} type="email" placeholder="Enter email" />
                                                </Form.Group>
                                                <Form.Group className="mb-3">
                                                   <Form.Label>Phone</Form.Label>
                                                   <Form.Control name='phone' value={updateUser.phone} onChange={handleChange} type="tel" placeholder="Enter Phone no." />
                                                </Form.Group>
                                                <Button variant="primary" type="submit">
                                                   Update User
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
                     <Alert.Heading>No Users to show</Alert.Heading>
                  </Alert>
               )}
            </Card.Body>
         </Card>
      </Container>
   );
}

export default UserInfo;