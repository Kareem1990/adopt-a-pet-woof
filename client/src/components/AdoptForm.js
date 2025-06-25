import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import emailjs from 'emailjs-com'


const Adoptform = () => {
  // set initial form state
  const [adoptFormData, setAdoptFormData] = useState({ 
      name: '',
      email: '',
      address:'',
      phone: '',
      birth:'',
      date:''

  });
  function sendEmail(e) {
    e.preventDefault();
    emailjs.sendForm(
      'service_b66ga4d',
      'contact_form',
      e.target,
      "qhfFOeJaWjjQ61myo"
    )
    .then(res=>{
      setAdoptFormData({
        name: '',
        email: '',
        address:'',
        phone: '',
        birth:'',
        date:''
      });
      alert("YOUR SUBMISSION WAS SUCCESSFUL!")
    }).catch(err=> console.log(err));
  }
  // set state for form validation
  const [validated] = useState(false);
  // set state for alert
  const [showAlert, setShowAlert] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setAdoptFormData({ ...adoptFormData, [name]: value });
  };

  // const handleFormSubmit = async (event) => {
  //   event.preventDefault();

  //   // check if form has everything (as per react-bootstrap docs)
  //   const form = event.currentTarget;
  //   if (form.checkValidity() === false) {
  //     event.preventDefault();
  //     event.stopPropagation();
  //   }
  //   setAdoptFormData({
  //     name: '',
  //     email: '',
  //     address:'',
  //     phone: '',
  //     birth:'',
  //     date:''
  //   });
  // };

  return (
    <>
      {/* This is needed for the validation functionality above */}
      <Form noValidate validated={validated} onSubmit={sendEmail}>
        {/* show alert if server response is bad */}
        <Alert dismissible onClose={() => setShowAlert(false)} show={showAlert} variant='danger'>
          Something went wrong with your Registration!
        </Alert>
        <Form.Text>
      
123456 Wild Rose Ct,
Springfield, VA 22152
(123) 123-1234 
test@gmail.com 
www.adopt-a-pet.org
Facebook at @adopt a pet
        </Form.Text>
        <Form.Group>
          <Form.Label htmlFor='name'>Name</Form.Label>
          <Form.Control
            type='text'
            placeholder='Your Name'
            name='name'
            onChange={handleInputChange}
            value={adoptFormData.name}
            required
          />
          <Form.Control.Feedback type='invalid'>Name is required!</Form.Control.Feedback>
        </Form.Group>

        <Form.Group>
          <Form.Label htmlFor='email'>Email</Form.Label>
          <Form.Control
            type='email'
            placeholder='Your email address'
            name='email'
            onChange={handleInputChange}
            value={adoptFormData.email}
            required
          />
          <Form.Control.Feedback type='invalid'>Email is required!</Form.Control.Feedback>
        </Form.Group>

        <Form.Group>
          <Form.Label htmlFor='address'>Address</Form.Label>
          <Form.Control
            type='text'
            placeholder='Address'
            name='address'
            onChange={handleInputChange}
            value={adoptFormData.address}
            required
          />
          <Form.Control.Feedback type='invalid'>Please Put Valid Address!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group>
          <Form.Label htmlFor='phone'>Phone</Form.Label>
          <Form.Control
            type='text'
            placeholder='Your Phone Number'
            name='phone'
            onChange={handleInputChange}
            value={adoptFormData.phone}
            required
          />
          <Form.Control.Feedback type='invalid'>Phone Number is Required!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group>
          <Form.Label htmlFor='Birthdate'>Birthdate</Form.Label>
          <Form.Control
            type='text'
            placeholder='Birthdate'
            name='birth'
            onChange={handleInputChange}
            value={adoptFormData.birth}
            required
          />
          <Form.Control.Feedback type='invalid'>Date is required!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group>
          <Form.Label htmlFor='email'>Today's Date</Form.Label>
          <Form.Control
            type='text'
            placeholder='Todays Date'
            name='date'
            onChange={handleInputChange}
            value={adoptFormData.date}
            required
          />
          <Form.Control.Feedback type='invalid'>Date is required!</Form.Control.Feedback>
        </Form.Group>

        <Button
          disabled={!(adoptFormData.name && adoptFormData.email && adoptFormData.date && adoptFormData.phone && adoptFormData.birth && adoptFormData.address)}
          type='submit'
          variant='success'>
          Submit
        </Button>
      </Form>
    </>
  );
};

export default Adoptform;
