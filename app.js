const express = require("express");
const bodyParser = require("body-Parser");
const request = require("request");
const https = require("https");

const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/",function(req,res){
  res.sendFile(__dirname + "/Signup.html");
});

app.post("/",function(req,res){
  const firstName = req.body.fName;
  const lastName = req.body.lName;
  const email = req.body.email;

  const data ={
    members: [{
      email_address: email,
      status: "subscribed",
      merge_fields: {
        FNAME: firstName,
        LNAME: lastName
      }
    }]
  };

  const jsonData = JSON.stringify(data);

  const url = "https://us9.api.mailchimp.com/3.0/lists/202d7bfb87";
  // https://<dc>.api.mailchimp.com/3.0/

  const options = {
    method: "POST",
    auth: "SachinP:daa0b0dc2eb1428e6ecf073f98d61d33-us9"
  }

  const request = https.request(url, options, function(response){
    if(response.statusCode === 200){
      res.sendFile(__dirname + "/success.html");
    }
    else {
      res.sendFile(__dirname + "/failure.html");
    }
    response.on("data",function(data){
      console.log(JSON.parse(data));
    })
  })
  request.write(jsonData);
  request.end();

});

app.post("/failure", function(req,res){
  res.redirect("/")
})

app.listen(process.env.PORT || 3000,function(){
  console.log("Server is running on port 3000.... ");
});

//API KEY
//daa0b0dc2eb1428e6ecf073f98d61d33-us9

//Audience id
//202d7bfb87
