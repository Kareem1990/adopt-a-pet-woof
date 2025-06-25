import React from 'react';
import emailjs from 'emailjs-com'

const PetForm = () => {
  function sendEmail(e) {
    e.preventDefault();
    emailjs.sendForm(
      'service_w4bo21i',
      'template_hdpftag',
      e.target,
      "pagdokbzUI30JEaOV"
    )
    .then(res=>{
      console.log(res);
    }).catch(err=> console.log(err));
  }

return (
  <div className= "container border"
  style={{marginTop: '50px',
  marginBottom: "100px",
  width: "50%",
  backgroundImage: `url(http://img5.goodfon.com/wallpaper/nbig/3/81/koshki-fon-korobka-ryzhii-kotiata-tri-serye-trio-korichnevyi.jpg)`,
  backgroundPosition: "center",
  backgroundSize: "cover",

}}
  >
<h1 className="text-center text-white" style={{marginTop:'50px'}}>Need to shelter your pet?</h1>
    <form className="row" 
          style={{ margin: "25px 85px 75px 100px" }} 
          onSubmit={sendEmail}>
      <label className="text-white">Name</label>
      <input type="text" name="name" className="form-control" />

      <label hidden className="text-white">Email</label>
      <input hidden type="email" name="user_email" className="form-control" value="kareem.magdy5@gmail.com"/>

      <label  className="text-white">Pet's image url</label>
      <input  type="text" name="pet" className="form-control"  />

      <label className="text-white">Description</label>
      <textarea name="message" rows='4' className="form-control"/>
      <input 
      type='submit' 
      value='send' 
      className="form-control btn btn-primary"
      style={{ marginTop:"30px"}}
      />
      </form>
      <h1 className="text-center text-white" style={{marginTop:'50px'}}>We will get back to you soon</h1>
  </div>

);
};

export default PetForm;




// import React, { useState } from "react";

// const PetForm = () => {
//   const [status, setStatus] = useState("Submit");
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setStatus("Sending...");
//     const { name, email, message } = e.target.elements;
//     let details = {
//       name: name.value,
//       email: email.value,
//       message: message.value,
//     };
//     let response = await fetch("http://localhost:3000/contact", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json;charset=utf-8",
//       },
//       body: JSON.stringify(details),
//     });
//     setStatus("Submit");
//     let result = await response.json();
//     alert(result.status);
//   };
//   return (
//     <form onSubmit={handleSubmit}>
//       <div>
//         <label htmlFor="name">Name:</label>
//         <input type="text" id="name" required />
//       </div>
//       <div>
//         <label hidden htmlFor= "email" >Email:</label>
//         <input hidden type="email" id="email" required placeholder="kareem.magdy5@gmail.com" />
//       </div>
//       <div>
//         <label htmlFor="name">Pet's image url:</label>
//         <input type="text" id="name" required />
//       </div>
//       <div>
//         <label htmlFor= "message">Description:</label>
//         <textarea id="message" required />
//       </div>
//       <button type="submit">{status}</button>
//     </form>
//   );
// };

// export default PetForm;