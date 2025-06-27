import React from 'react';
import '../App';
import './Details.css';
import Corgi from '../assets/cooper-baby-corgi-dogs-8.jpeg';
import Cat from '../assets/Gear-New-Pet-1168772154.jpeg';
import Dog from '../assets/5.Retention-main-pic.jpg';

function Details() {
  return (
    <section id="your-trainers">
      <div className="flex-row">
        <h2 className="section-title primary-border">
          Our Services
        </h2>
      </div>

      <div className="trainers">
        <article className="trainer">
          <img src={Corgi} alt="Cute corgi puppy" />
          <div className="trainer-bio">
            <h3 className="trainer-name">Adopt a pet</h3>
            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sequi neque animi quo cupiditate commodi saepe culpa sed itaque velit maiores optio dolorem excepturi aperiam dolores, voluptatibus suscipit amet quis repellat!</p>
          </div>
        </article>

        <article className="trainer">
          <img src={Cat} alt="Playful tabby cat" />
          <div className="trainer-bio">
            <h3 className="trainer-name">Foster a pet</h3>
            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sequi neque animi quo cupiditate commodi saepe culpa sed itaque velit maiores optio dolorem excepturi aperiam dolores, voluptatibus suscipit amet quis repellat!
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sequi neque animi quo cupiditate commodi saepe culpa sed itaque velit maiores optio dolorem excepturi aperiam dolores, voluptatibus suscipit amet quis repellat!
            </p>
          </div>
        </article>

        <article className="trainer">
          <img src={Dog} alt="Veterinarian holding dog for checkup" />
          <div className="trainer-bio">
            <h3 className="trainer-name">Health care</h3>
            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sequi neque animi quo cupiditate commodi saepe culpa sed itaque velit maiores optio dolorem excepturi aperiam dolores, voluptatibus suscipit amet quis repellat!</p>
          </div>
        </article>
      </div>
    </section>
  );
}

export default Details;
