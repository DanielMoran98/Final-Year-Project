const express = require('express');

const app = express();
const port = 5000;

//

require('dotenv').config() //Load the variables from our local environment




// ROUTES

app.get('/', (req, res) => {
  res.send("API for GERM system")
})

app.get('/api/crimes/all', (req,res) => {
  var crimes = [
    {
      id: 1,
      lat: 31.25,
      long: -6.52,
      urgency: 4,
      datetime:"2019-11-23 22:51:23",
      crimeType: "Armed robbery",
      crimeDescription: "",
      suspectDescription: "White male, red hoodie black jeans, tall",
      dangers: "Suspect has firearm",
      victimContact: "0851568274",
      attendees: 4,
      status: "active"
    },{
      id: 2,
      lat: 35.21,
      long: -6.32,
      urgency: 1,
      datetime:"2019-11-23 22:51:23",
      crimeType: "Shoplifting",
      crimeDescription: "",
      suspectDescription: "16-20year old white female, black jacket, white tshirt, blonde hair",
      dangers: "none",
      victimContact: "0831568274",
      attendees: 0,
      status: "active"
    },{
      id: 3,
      lat: 34.25,
      long: -6.52,
      urgency: 3,
      datetime:"2019-11-23 22:51:23",
      crimeType: "Assault",
      crimeDescription: "Suspected assaulted victim after being refused entry to tesco",
      suspectDescription: "Short female, mid 40s, blue jeans, red tshirt, brown handbag",
      dangers: "Suspect is intoxicated and aggressive",
      victimContact: "0851568274",
      attendees: 1,
      status: "active"
    },{
      id: 4,
      lat: 51.25,
      long: -2.52,
      urgency: 2,
      datetime:"2019-11-23 22:51:23",
      crimeType: "Tresspassing",
      crimeDescription: "Suspect climed over the wall into a private building site",
      suspectDescription: "Black male, mid 20s, adidas tracksuit, blue schoolbag",
      dangers: "",
      victimContact: "0871568274",
      attendees: 0,
      status: "active"
    },{
      id: 5,
      lat: 21.25,
      long: -4.52,
      urgency: 3,
      datetime:"2019-11-23 22:51:23",
      crimeType: "Vandalism",
      crimeDescription: "Shop owner arrived to work with a shop front covered in graffiti and has CCTV footage",
      suspectDescription: "White teenager, blue nike cap, nike tracksuit",
      dangers: "",
      victimContact: "0851568274",
      attendees: 0,
      status: "active"
    },
  ]
  res.json(crimes);
});

app.get('/api/units/dublin', (req,res) => {
  var units = [
    {
      id: 1,
      lat: 31.25,
      long: -6.52,
      name: "DT-102",
      members: [2,4],
      unitType: "car_standard" ,
      assignment_id: 12,
      division_id: 2
    },{
      id: 2,
      lat: 32.25,
      long: -5.52,
      name: "DT-104",
      members: [3,7],
      unitType: "car_traffic_corps" ,
      assignment_id: null,
      division_id: 2
    },{
      id: 3,
      lat: 31.25,
      long: -6.52,
      name: "DT-142",
      members: [11],
      unitType: "beat" ,
      assignment_id: null,
      division_id: 2
    },{
      id: 4,
      lat: 31.25,
      long: -6.52,
      name: "DT-102",
      members: [22,41,63,12,62,12],
      unitType: "public_order" ,
      assignment_id: 7,
      division_id: 2
    },{
      id: 5,
      lat: 35.25,
      long: -4.52,
      name: "M-102",
      members: [7],
      unitType: "mounted",
      assignment_id: null,
      division_id: 2
    },
  ]
  res.json(units);
});


// LISTEN
app.listen(port, () => console.log(`Server started on port ${port}.`))
