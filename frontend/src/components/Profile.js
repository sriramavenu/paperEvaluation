import React, { useState } from 'react';
import { useSelector} from 'react-redux';
import axios from 'axios';
import { Button, Form, Container, Table, Card, Modal } from 'react-bootstrap';

function Profile() {
  const user = useSelector((state) => state.user.user);

  const [showEditModal, setShowEditModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [name, setName] = useState(user.name);
  const [phone, setPhone] = useState(user.phone);
  const [email, setEmail] = useState(user.email);
  const [newPassword, setNewPassword] = useState('');
  const rollNo = user?.rollNo ;

  const handleSaveProfile = async () => {
    try {
      const response = await axios.put('http://localhost:8000/app/student/update', { rollNo, name, phone, email });
      console.log(response, 'update profile response');
      setShowEditModal(false);
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  const handleChangePassword = async () => {
    try {
      await axios.put('http://localhost:8000/app/student/change-password', { rollNo, password: newPassword });
      alert('Password changed successfully');
      setShowPasswordModal(false);
    } catch (error) {
      console.error('Error changing password:', error);
    }
  };

  return (
    <Container className="profile-container">
      <Card className="profile-card shadow-lg p-4">
        <Card.Body>
          {/*<h2 className="text-center mb-4">User Profile</h2> */}
          <Table className="profile-table" borderless>
            <tbody>
              <tr>
                <td><strong>Name:</strong></td>
                <td>{name}</td>
              </tr>
              <tr>
                <td><strong>Email:</strong></td>
                <td>{email}</td>
              </tr>
              <tr>
                <td><strong>Phone:</strong></td>
                <td>{phone}</td>
              </tr>
              <tr>
                <td><strong>Department:</strong></td>
                <td>{user.department}</td>
              </tr>
              <tr>
                <td><strong>Roll No:</strong></td>
                <td>{user.rollNo}</td>
              </tr>
              <tr>
                <td><strong>Semester:</strong></td>
                <td>{user.semester}</td>
              </tr>
            </tbody>
          </Table>
          <div className="text-center mt-4">
            <Button variant="primary" onClick={() => setShowEditModal(true)} className="me-3">Edit Profile</Button>
            <Button variant="warning" onClick={() => setShowPasswordModal(true)}>Change Password</Button>
          </div>
        </Card.Body>
      </Card>

      {/* Edit Profile Modal */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Name</Form.Label>
              <Form.Control value={name} onChange={(e) => setName(e.target.value)} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Phone</Form.Label>
              <Form.Control value={phone} onChange={(e) => setPhone(e.target.value)} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEditModal(false)}>Close</Button>
          <Button variant="success" onClick={handleSaveProfile}>Save Changes</Button>
        </Modal.Footer>
      </Modal>

      {/* Change Password Modal */}
      <Modal show={showPasswordModal} onHide={() => setShowPasswordModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Change Password</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>New Password</Form.Label>
              <Form.Control type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowPasswordModal(false)}>Close</Button>
          <Button variant="success" onClick={handleChangePassword}>Change Password</Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default Profile;
