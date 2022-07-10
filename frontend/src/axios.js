import axios from "axios";

// const instance=axios.create({
//     //baseURL:'http://localhost:5001/e-app-f9ce1/us-central1/api'      //API(cloud function) URL

// });

const instance=axios(
{
  
    // Endpoint to send files
    url: "'http://localhost:8000/getproduct'",
    method: "POST",
    headers: {
        "Authorization": "bearer "+localStorage.getItem("token")
    },

    // Attaching the form data
    data: "formData",
  }


).then((req)=>{
    console.log(req)
});

export default instance;