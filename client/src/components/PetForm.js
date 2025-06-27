import React from 'react';
import emailjs from 'emailjs-com';

const PetForm = () => {
  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm(
      'service_w4bo21i',
      'template_hdpftag',
      e.target,
      'pagdokbzUI30JEaOV'
    )
    .then((res) => {
      console.log('✅ Email successfully sent:', res.text);
      alert('Thank you! We’ve received your request and will be in touch soon.');
    })
    .catch((err) => {
      console.error('❌ Failed to send email:', err);
      alert('Oops! Something went wrong. Please try again later.');
    });

    e.target.reset();
  };

  return (
    <div
      className="container border"
      style={{
        marginTop: '50px',
        marginBottom: '100px',
        width: '50%',
        backgroundImage: 'url(http://img5.goodfon.com/wallpaper/nbig/3/81/koshki-fon-korobka-ryzhii-kotiata-tri-serye-trio-korichnevyi.jpg)',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        padding: '2rem',
        borderRadius: '10px'
      }}
    >
      <h1 className="text-center text-white" style={{ marginBottom: '30px' }}>
        Need to shelter your pet?
      </h1>
      <form className="row" onSubmit={sendEmail}>
        <label htmlFor="name" className="text-white">Name</label>
        <input
          type="text"
          name="name"
          id="name"
          className="form-control"
          required
        />

        <input
          hidden
          type="email"
          name="user_email"
          value="kareem.magdy5@gmail.com"
          readOnly
        />

        <label htmlFor="pet" className="text-white">Pet’s Image URL</label>
        <input
          type="text"
          name="pet"
          id="pet"
          className="form-control"
          required
        />

        <label htmlFor="message" className="text-white">Description</label>
        <textarea
          name="message"
          id="message"
          rows="4"
          className="form-control"
          required
        />

        <input
          type="submit"
          value="Send"
          className="btn btn-primary mt-4"
        />
      </form>

      <h1 className="text-center text-white" style={{ marginTop: '40px' }}>
        We will get back to you soon
      </h1>
    </div>
  );
};

export default PetForm;
