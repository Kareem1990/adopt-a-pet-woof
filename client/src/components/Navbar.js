import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Container, Modal, Tab } from 'react-bootstrap';

import SignUpForm from './SignupForm';
import LoginForm from './LoginForm';
import Volunteerform from "./VolunteerForm";
import Adoptform from "./AdoptForm";
import Auth from '../utils/auth';
import carIcon from '../assets/car_dog.svg';

const AppNavbar = () => {
  const [showModal, setShowModal] = useState(false);
  const [showVolunteerModal, setVolunteerModal] = useState(false);
  const [showAdoptModal, setAdoptModal] = useState(false);

  return (
    <>
      <Navbar className='nav'>
        <Container fluid>
          <Navbar.Toggle aria-controls='navbar' />
          <Navbar.Collapse id='navbar'>
            <img src={carIcon} alt="Woof Woof logo" width="32" height="32" />
            <h1 className="ml-2">Woof Woof</h1>
            <Nav className='ml-auto'>
              <Nav.Link as={Link} to='/'>
                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" className="bi bi-house-door-fill" viewBox="0 0 16 16" aria-label="Home">
                  <path d="M6.5 14.5v-3.505c0-.245.25-.495.5-.495h2c.25 0 .5.25.5.5v3.5a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5z" />
                </svg>
              </Nav.Link>

              <Nav.Link as={Link} to='/pets'>
                <h1>Pets</h1>
              </Nav.Link>

              {Auth.loggedIn() ? (
                <>
                  <Navbar.Brand onClick={() => setVolunteerModal(true)}>
                    <h1>Volunteer!</h1>
                  </Navbar.Brand>
                  <Navbar.Brand onClick={() => setAdoptModal(true)}>
                    <h1>Contact To Adopt!</h1>
                  </Navbar.Brand>
                  <Nav.Link as={Link} to='/saved'>
                    <h1>Profile</h1>
                  </Nav.Link>
                  <Nav.Link onClick={Auth.logout}><h1>Logout</h1></Nav.Link>
                </>
              ) : (
                <Nav.Link onClick={() => setShowModal(true)}>Login/Sign Up</Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Login/Signup Modal */}
      <Modal size='lg' show={showModal} onHide={() => setShowModal(false)} aria-labelledby='signup-modal'>
        <Tab.Container defaultActiveKey='login'>
          <Modal.Header closeButton>
            <Modal.Title id='signup-modal'>
              <Nav variant='pills'>
                <Nav.Item><Nav.Link eventKey='login'><h1>Login</h1></Nav.Link></Nav.Item>
                <Nav.Item><Nav.Link eventKey='signup'><h1>Sign Up</h1></Nav.Link></Nav.Item>
              </Nav>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Tab.Content>
              <Tab.Pane eventKey='login'>
                <LoginForm handleModalClose={() => setShowModal(false)} />
              </Tab.Pane>
              <Tab.Pane eventKey='signup'>
                <SignUpForm handleModalClose={() => setShowModal(false)} />
              </Tab.Pane>
            </Tab.Content>
          </Modal.Body>
        </Tab.Container>
      </Modal>

      {/* Volunteer Modal */}
      <Modal size='lg' show={showVolunteerModal} onHide={() => setVolunteerModal(false)} aria-labelledby='volunteer-modal'>
        <Modal.Header closeButton>
          <Modal.Title id='volunteer-modal'>Volunteer Form</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Volunteerform handleModalClose={() => setVolunteerModal(false)} />
        </Modal.Body>
      </Modal>

      {/* Adoption Modal */}
      <Modal size='lg' show={showAdoptModal} onHide={() => setAdoptModal(false)} aria-labelledby='adopt-modal'>
        <Modal.Header closeButton>
          <Modal.Title id='adopt-modal'>Adoption Form</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Adoptform handleModalClose={() => setAdoptModal(false)} />
        </Modal.Body>
      </Modal>
    </>
  );
};

export default AppNavbar;
