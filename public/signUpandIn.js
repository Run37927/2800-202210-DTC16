 async function registerUser(){
    console.log("registerUser() executed")
     await $.ajax({
        url: "http://localhost:6050/signuprequest",
        type: "POST",
        data: {
          name: $("#name").val(),
          email: $("#email").val(),
          password: $("#password").val()
        },
        success: console.log("user info sumbitted.", $("#name").val(), $("#email").val(), $("#password").val()),
      });
    location.href = "/login"
}

async function loginUser() {
  console.log("loginUser() executed")
  await $.ajax({
     url: "http://localhost:6050/requestlogin",
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
    $("#loginUser").click(loginUser)
}
$(document).ready(setup);