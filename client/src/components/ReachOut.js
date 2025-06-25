import React from 'react';
import '../App';
import './Details.css';


function ReachOut() {
    return (


<section id="reach-out" class="contact">
<div class="flex-row">
  <h2 class="section-title secondary-border">
    Reach Out
  </h2>
</div>

<div class="contact-info">
  <div>
    <h3>Woof Woof</h3>
    <p>
      Any questions or concerns before signing up? 
      <br/>
      Let us know and we'll be happy to talk to you!
    </p>

    <address>
      104 Arlington <br/>
      Virginia, Us <br/>
      12345<br/>
      P: 202 621 4174<br/>
      E: <a href="mailto:kareem.magdy5@gmail.com">kareem.magdy5@gmail.com</a>
    </address>
    
  </div>

  <div class="contact-form">
    <h3>Contact Us</h3>
    <form>
      <label for="contact-name">Your Name</label>
      <input type="text" id="contact-name" placeholder="Your Name" />
  
      <label for="contact-message">Message</label>
      <textarea id="contact-message" placeholder="Message"></textarea>
  
      <button type="submit">Submit</button>
    </form>
  </div>
  
  <iframe
    src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d12182.30520634488!2d-74.0652613!3d40.2407219!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sus!4v1561060983193!5m2!1sen!2sus"
     />
</div>
</section>
    )
}

export default ReachOut;