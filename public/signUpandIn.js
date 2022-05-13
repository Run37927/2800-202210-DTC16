 url = "http://localhost:6050"
 
 async function registerUser(){
    console.log("registerUser() executed")
     await $.ajax({
<<<<<<< HEAD
        url: `${url}/signuprequest`,
=======
        url: `https://imissmyvacay.herokuapp.com/requestlogin`,
>>>>>>> 353aeebeb886d47e49acc54ac6aeb83e868017d1
        type: "POST",
        data: {
          name: $("#name").val(),
          email: $("#email").val(),
          password: $("#password").val()
        },
        success: location.href = "/login"
      });
    
}

async function loginUser() {
  console.log("loginUser() executed")
  await $.ajax({
<<<<<<< HEAD
     url: `${url}/requestlogin`,
=======
     url: `https://imissmyvacay.herokuapp.com/requestlogin`,
>>>>>>> 353aeebeb886d47e49acc54ac6aeb83e868017d1
     type: "POST",
     data: {
       email: $("#email").val(),
       password: $("#password").val()
     },
     success: routeUserLogin,
   });
}

function routeUserLogin(data){
  console.log(data.userIsAdmin)
  if(data.userIsAdmin){
    location.href = `/admin/${data.userId}`
  }else if(!data.userIsAdmin){
    location.href = `/beach/${data.userId}`
  }else{
    console.log("User not found")
  }
}



function setup(){
    $("#registerUser").click(registerUser);
    $("#loginUser").click(loginUser);
}
$(document).ready(setup);