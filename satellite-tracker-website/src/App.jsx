import './App.css'

import { Routes, Route } from "react-router-dom"
import { AllCards } from './components/AllCards';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={
          <div className="All-Cards">
            <AllCards />
          </div>
        } />
        <Route path="/faq" element={
          
          <div class="container">
            <br />
            <h1 >Frequently Asked Questions</h1>
            <details>
              <summary>What is the lifespan of a Starlink satellite?</summary>
              <div>The Starlink satellites have a lifespan of approximately five years.</div>
            </details>
            <details>
              <summary>How many Starlink satellites are there?</summary>
              <div>As of July 2023, there are 4,519 Starlink satellites in orbit.</div>
            </details>
            <details>
              <summary>Do you need any special equipment to see the Starlink satellites?</summary>
              <div>No, these satellites are visible to the unaided eye. </div>
            </details>
            <details>
              <summary>How big is a Starlink satellite?</summary>
              <div>A Starlink satellite measures about 2.4 meters wide by 1.2 meters tall. They weigh in at around 227 kilograms. </div>
            </details>
            <details>
              <summary>When is the best time to see a Starlink satellite?</summary>
              <div>The best time to see a satellite is one-two days after their launch. Overtime they continue to climb to their final orbit which makes them harder to see.</div>
            </details>
          </div>
        } />
      </Routes>
    </div>
  );
}

export default App
