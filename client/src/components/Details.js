import React from 'react';
import '../App'
// import { Button } from './Button';
import './Details.css';
import Corgi from '../assets/cooper-baby-corgi-dogs-8.jpeg';
import Cat from '../assets/Gear-New-Pet-1168772154.jpeg';
import Dog from '../assets/5.Retention-main-pic.jpg'


function Details() {
    return (
        <section id="your-trainers">
        <div class="flex-row">
          <h2 class="section-title primary-border">
            Our Services
          </h2>
        </div>
  
        <div class="trainers">
          <article class="trainer">
            <img src={Corgi}/>
            <div class="trainer-bio">
              <h3 class="trainer-name">Adopt a pet</h3>
              <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sequi neque animi quo cupiditate commodi saepe culpa sed itaque velit maiores optio dolorem excepturi aperiam dolores, voluptatibus suscipit amet quis repellat!</p>
            </div>
          </article>
  
          <article class="trainer">
            <img src={Cat}  />
            <div class="trainer-bio">
              <h3 class="trainer-name">Foster a pet</h3>
              <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sequi neque animi quo cupiditate commodi saepe culpa sed itaque velit maiores optio dolorem excepturi aperiam dolores, voluptatibus suscipit amet quis repellat!
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sequi neque animi quo cupiditate commodi saepe culpa sed itaque velit maiores optio dolorem excepturi aperiam dolores, voluptatibus suscipit amet quis repellat!
              </p>
              </div>
            </article>
  
          <article class="trainer">
            <img src={Dog}  />
            <div class="trainer-bio">
              <h3 class="trainer-name">Health care</h3>
              <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sequi neque animi quo cupiditate commodi saepe culpa sed itaque velit maiores optio dolorem excepturi aperiam dolores, voluptatibus suscipit amet quis repellat!</p>
            </div>
          </article>
        </div>
      </section>

    )
}


export default Details;



