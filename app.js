const express = require("express");
const app = express();

const https = require("https");

const bodyParser = require("body-parser");


app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/signup.html");
});

app.use(bodyParser.urlencoded({extended: true}));

app.post("/", (req, res) => {

  const firstName = req.body.fName;
  const lastName = req.body.lName;
  const email = req.body.email;

  console.log(firstName, lastName, email);

  const data = {
    members: [{
        email_address: email,
        status: "subscribed",
        merge_fields:{
          FNAME: firstName,
          LNAME: lastName
        }
      }
    ]
  }

const jsonData = JSON.stringify(data);

const url = "https://us20.api.mailchimp.com/3.0/lists/5fc2b7dc75";
const options = {
  method: "POST",
  auth: "userNatallia:a94d3a30a6cc237d5d6b288959e79d6d-us20"
};

var request = https.request(url, options, (response)=>{

if (response.statusCode==200){
  res.sendFile(__dirname + "/success.html");
}
else {res.sendFile(__dirname + "/failure.html");}

response.on("data", (data)=>{
  console.log(JSON.parse(data));
})
});

request.write(jsonData);
request.end();

})

app.post("/failure", (req, res)=>{
  res.redirect("/")
})


app.listen(process.env.PORT || 3000, () => {
  console.log("Server is running on port 3000.");
})


// API key
// a94d3a30a6cc237d5d6b288959e79d6d-us20

// Lists ID
// 5fc2b7dc75
