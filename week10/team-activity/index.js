import QuakesController from "./QuakesController.js";

const quakesController = new QuakesController('#quakeList');
quakesController.init();
// import { getJSON, getLocation } from "./utilities.js";

// const baseUrl ='https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=2019-01-01&endtime=2019-02-02';

// let longitude;
// let latitude;
// let maxRadius = 100;
// getLocation().then((loc) => {
//     longitude = loc.coords.longitude;
//     latitude = loc.coords.latitude;
    
//     console.log("longitude: ", longitude, " latutitude", longitude);
//     const url = `${baseUrl}&latitude=${latitude}&longitude=${longitude}&maxradiuskm=${maxRadius}`;
//     console.log(url);
//     return getJSON(url);
// }).then(data => {
//     console.log(data);
// }).catch((error) => {
//     console.log(error);
// })



        // const url = `${baseUrl}&latitude=${latitude}&longitude=${longitude}&maxradiuskm=${maxRadius}`;