import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios';
import { Card, Form, Button } from 'react-bootstrap';

const ChatWindow = (props) => {
   const [messageInput, setMessageInput] = useState('');
   const messageWindowRef = useRef(null);
   const [messageList, setMessageList] = useState([]);

   const fetchMessageList = async () => {
      try {
         const response = await axios.get(`http://localhost:8000/messages/${props.complaintId}`);
         setMessageList(response.data);
      } catch (error) {
         console.error('Error fetching messages:', error);
      }
   };

   useEffect(() => {
      fetchMessageList(props.complaintId, setMessageList);
   }, [props.complaintId]);

   useEffect(() => {
      scrollToBottom();
   }, [messageList]);

   const sendMessage = async () => {
      try {
         let data = {
            name: props.name,
            message: messageInput,
            complaintId: props.complaintId
         }
         const response = await axios.post('http://localhost:8000/messages', data)
         setMessageList([...messageList, response.data]);
         setMessageInput('');
         fetchMessageList();
      } catch (error) {
         console.error('Error sending message:', error);
      }
   }

   const scrollToBottom = () => {
      if (messageWindowRef.current) {
         messageWindowRef.current.scrollTop = messageWindowRef.current.scrollHeight;
      }
   };

   return (
      <Card className="shadow-sm">
         <Card.Header className="bg-primary text-white">
            <h5 className="mb-0">Message Box</h5>
         </Card.Header>
         <Card.Body>
            <div className="message-window mb-3" ref={messageWindowRef} style={{height: '300px', overflowY: 'auto'}}>
               {messageList.slice().reverse().map((msg) => (
                  <div key={msg._id} className="mb-2 p-2 rounded" style={{background: msg.name === props.name ? '#e9ecef' : '#f8f9fa'}}>
                     <strong>{msg.name}:</strong> {msg.message}
                     <small className="text-muted d-block">
                        {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}, 
                        {new Date(msg.createdAt).toLocaleDateString()}
                     </small>
                  </div>
               ))}
            </div>
            <Form onSubmit={(e) => { e.preventDefault(); sendMessage(); }}>
               <Form.Group className="d-flex">
                  <Form.Control 
                     type="text" 
                     value={messageInput} 
                     onChange={(e) => setMessageInput(e.target.value)} 
                     placeholder="Type your message..."
                  />
                  <Button variant="primary" type="submit" className="ms-2">Send</Button>
               </Form.Group>
            </Form>
         </Card.Body>
      </Card>
   )
}

export default ChatWindow