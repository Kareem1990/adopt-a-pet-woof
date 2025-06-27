import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import emailjs from 'emailjs-com';

const Volunteerform = () => {
  const [volunteerFormData, setVolunteerFormData] = useState({
    name: '',
    email: '',
    emergency: '',
    phone: ''
  });

  const [validated] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setVolunteerFormData({ ...volunteerFormData, [name]: value });
  };

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm('service_b66ga4d', 'contact_form', e.target, 'qhfFOeJaWjjQ61myo')
      .then((res) => {
        setVolunteerFormData({
          name: '',
          email: '',
          phone: '',
          emergency: ''
        });
        alert('✅ Your submission was successful!');
      })
      .catch((err) => {
        console.error(err);
        setShowAlert(true);
      });
  };

  return (
    <>
      <Form noValidate validated={validated} onSubmit={sendEmail}>
        <Alert
          dismissible
          onClose={() => setShowAlert(false)}
          show={showAlert}
          variant="danger"
        >
          Something went wrong with your registration!
        </Alert>

        <Form.Text className="mb-3">
          If you're interested in becoming a volunteer, please fill out the form and a representative will reach out to you.
        </Form.Text>

        <Form.Group>
          <Form.Label htmlFor="name">Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Your Name"
            name="name"
            onChange={handleInputChange}
            value={volunteerFormData.name}
            required
          />
          <Form.Control.Feedback type="invalid">
            Name is required!
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group>
          <Form.Label htmlFor="email">Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Your email address"
            name="email"
            onChange={handleInputChange}
            value={volunteerFormData.email}
            required
          />
          <Form.Control.Feedback type="invalid">
            Email is required!
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group>
          <Form.Label htmlFor="emergency">Emergency Contact</Form.Label>
          <Form.Control
            type="text"
            placeholder="Your Emergency Contact"
            name="emergency"
            onChange={handleInputChange}
            value={volunteerFormData.emergency}
            required
          />
          <Form.Control.Feedback type="invalid">
            Emergency contact is required!
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group>
          <Form.Label htmlFor="phone">Phone</Form.Label>
          <Form.Control
            type="text"
            placeholder="Your Phone Number"
            name="phone"
            onChange={handleInputChange}
            value={volunteerFormData.phone}
            required
          />
          <Form.Control.Feedback type="invalid">
            Phone number is required!
          </Form.Control.Feedback>
        </Form.Group>

        <Button
          type="submit"
          variant="success"
          disabled={
            !(
              volunteerFormData.name &&
              volunteerFormData.email &&
              volunteerFormData.phone &&
              volunteerFormData.emergency
            )
          }
        >
          Submit
        </Button>
      </Form>
    </>
  );
};

export default Volunteerform;
