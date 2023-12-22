import Database from "../../VisualSatPasses.json"
import { getSunrise, getSunset } from 'sunrise-sunset-js';
import { Card } from "./Card"
import Location from "../../Location.json"
import React from "react";
import "./Card.css"

export const AllCards = ({}) => {
  var i = 1
  var TotalPasses = 0
  
  // Check if Database is loading
  if(Database[1].passes.length === 0) {
    return (
      <div className="All-Cards">
        <div className="card-container">
            <div className="loading">
              <h1>Loading</h1>
              <hr />
              <img src="https://www.hardrockhotels.com/cancun/files/6134/loading.gif" width="100" height="100" /> 
            </div>  
        </div>
      </div>
    );
  }
  return (
    <div className="All-Cards">
      {getSingleSatellitePasses(1)}
      {getSingleSatellitePasses(2)}
      {getSingleSatellitePasses(3)}
      {getSingleSatellitePasses(4)}
      <hr className="hr"/>
      <div className="Total-passes">
        <h2>Total Passes: {TotalPasses}</h2>
      </div>
    </div>
  );
    
function getSingleSatellitePasses(i) {
  return (
    Database[i].passes.map((data, key) => {
      var PassDate = new Date(0)
      PassDate.setUTCSeconds(data.startUTC)
      var PassTime = PassDate.toLocaleTimeString()
      
      // https://www.npmjs.com/package/sunrise-sunset-js
      var localSunset = new Date(getSunset(Location.latitude, Location.longitude))
      var localSunsetString = localSunset.toLocaleTimeString()
      var localSunrise = new Date(getSunrise(Location.latitude, Location.longitude))
      var localSunriseString = localSunrise.toLocaleTimeString()
      // Adds 1.5 hours to Sunset Time
      var localSunsetEnd = new Date(localSunset.getTime() + 5400000)
      var localSunsetEndString = localSunsetEnd.toLocaleTimeString()
      var localSunriseStart = new Date(localSunrise.getTime() - 5400000)
      var localSunriseStartString = localSunriseStart.toLocaleTimeString()

      // Creates filter logic based on which checkboxs are checked
      var logic
      // If 'Show All' is checked, show all passes
      if(localStorage.getItem("opt1") === "true"){
        logic = true
      }else{
        // If Sunrise passes are checked and sunset passes are not checked
        if(localStorage.getItem("opt2") === "true" && localStorage.getItem("opt3") === "false") {
          logic = PassTime.includes('AM') && PassTime > localSunriseStartString && PassTime < localSunriseString
        }
        // If Sunset passes are checked and sunrise passes are not checked
        if(localStorage.getItem("opt2") === "false" && localStorage.getItem("opt3") === "true") {
          logic = PassTime.includes('PM') && PassTime > localSunsetString && PassTime < localSunsetEndString
        }
        // If both sunrise and sunset passes are checked
        if(localStorage.getItem("opt2") === "true" && localStorage.getItem("opt3") === "true") {
          logic = (PassTime.includes('AM') && PassTime > localSunriseStartString && PassTime < localSunriseString) || (PassTime.includes('PM') && PassTime > localSunsetString && PassTime < localSunsetEndString)
        }
      }

      // Creates UI Cards
      if(logic) {
        TotalPasses += 1
        return (
          <div key={key}>
            <Card 
            title={PassDate.toLocaleString()}        
            duration={data.duration+" Seconds"}
            direction={data.startAzCompass+"("+data.startAz+"°) to "+data.endAzCompass+"("+data.endAz+"°)"}
            sat={Database[i].info.satname}
            // Button is currently unused
            buttonText="Track" 
            link={"https://www.n2yo.com/satellite/?s="+Database[i].info.satid}
            className="ui-style"
            />
          </div>            
        );
      }
             
    })
  );
}
    
};