import axios from "axios";

export const sendEmail = () => {
  debugger;
  axios.post(
    "https://us-central1-volunteer-platform-87cd0.cloudfunctions.net/sendEmailFromApp",
    { email: "jeremiahtenbrink@gmail.com" }
    )
    .then( result => {
      console.log( result );
    } ).catch( err => {
    console.log( err );
  } );
};

