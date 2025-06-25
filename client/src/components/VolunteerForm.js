import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import emailjs from 'emailjs-com'

const Volunteerform = () => {
  // set initial form state
  const [volunteerFormData, setVolunteerFormData] = useState({ 
    name: '', 
    email: '', 
    emergency: '', 
    phone: ''

  });
  // set state for form validation
  const [validated] = useState(false);
  // set state for alert
  const [showAlert, setShowAlert] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setVolunteerFormData({ ...volunteerFormData, [name]: value });
  };
  function sendEmail(e) {
    e.preventDefault();
    emailjs.sendForm(
      'service_b66ga4d',
      'contact_form',
      e.target,
      "qhfFOeJaWjjQ61myo"
    )
    .then(res=>{
      setVolunteerFormData({
      name: '',
      email: '',
      phone: '',
      emergency:''
      });
      alert("YOUR SUBMISSION WAS SUCCESSFUL!")
    }).catch(err=> console.log(err));
  }

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    // check if form has everything (as per react-bootstrap docs)
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    setVolunteerFormData({
      name: '',
      email: '',
      phone: '',
      emergency:''
    });
  };

  return (
    <>
      {/* This is needed for the validation functionality above */}
      <Form noValidate validated={validated} onSubmit={sendEmail}>
        {/* show alert if server response is bad */}
        <Alert dismissible onClose={() => setShowAlert(false)} show={showAlert} variant='danger'>
          Something went wrong with your Registration!
        </Alert>
        <Form.Text>
        If you are interested in becoming a volunteer, please take the time to fill out the form and a 
representative will reach out to you to schedule an interview.
        </Form.Text>
        <Form.Group>
          <Form.Label htmlFor='name'>Name</Form.Label>
          <Form.Control
            type='text'
            placeholder='Your Name'
            name='name'
            onChange={handleInputChange}
            value={volunteerFormData.name}
            required
          />
          <Form.Control.Feedback type='invalid'>Username is required!</Form.Control.Feedback>
        </Form.Group>

        <Form.Group>
          <Form.Label htmlFor='email'>Email</Form.Label>
          <Form.Control
            type='email'
            placeholder='Your email address'
            name='email'
            onChange={handleInputChange}
            value={volunteerFormData.email}
            required
          />
          <Form.Control.Feedback type='invalid'>Email is required!</Form.Control.Feedback>
        </Form.Group>

        <Form.Group>
          <Form.Label htmlFor='emergency'>Emergency Contact</Form.Label>
          <Form.Control
            type='text'
            placeholder='Your Emergency Contact/Guardian Number'
            name='emergency'
            onChange={handleInputChange}
            value={volunteerFormData.emergency}
            required
          />
          <Form.Control.Feedback type='invalid'>Please Put Emergency Contact!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group>
          <Form.Label htmlFor='phone'>Phone</Form.Label>
          <Form.Control
            type='text'
            placeholder='Your Phone Number'
            name='phone'
            onChange={handleInputChange}
            value={volunteerFormData.phone}
          />
          <Form.Control.Feedback type='invalid'>Phone Number is Required!</Form.Control.Feedback>
        </Form.Group>
        <Button
          disabled={!(volunteerFormData.name && volunteerFormData.email && volunteerFormData.emergency && volunteerFormData.phone)}
          type='submit'
          variant='success'>
          Submit
        </Button>
      </Form>
    </>
  );
};

export default Volunteerform;
