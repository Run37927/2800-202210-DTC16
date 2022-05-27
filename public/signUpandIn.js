const url = "http://localhost:6050"

 
 async function registerUser(){
   if( $("#name").val().replace(" ", "").length == 0 || $("#email").val().replace(" ", "").length == 0 || $("#password").val().replace(" ", "").length == 0 ){
    alert('Invalid information.')
    location.href = "/signup"
   }
     await $.ajax({
        url: `${url}/signuprequest`,
        type: "POST",
        data: {
          name: $("#name").val(),
          email: $("#email").val(),
          password: $("#password").val()
        },
        success: (data) => {
          if(data.registered){
             alert(`Account Created successfully.\n Welcome ${data.userName.split(' ')[0]}!`)
             location.href = "/login"
          }else{
            alert('Creating account failed.')
            location.href = "/signup"
          }
        }
      });
}

async function loginUser() {
  if($("#email").val().replace(" ", "").length == 0 || $("#password").val().replace(" ", "").length == 0 ){
    alert('Invalid information.')
    location.href = "/login"
   }
  await $.ajax({
     url: `${url}/requestlogin`,
     type: "POST",
     data: {
       email: $("#email").val(),
       password: $("#password").val()
     },
     success: routeUserLogin,
   });
}

function routeUserLogin(data){
  if(!data.loginSuccess){
    alert("Login failed")
    location.href = "/login"
  }
  if(data.userIsAdmin){
    location.href = `/admin/${data.userId}`
  }else if(!data.userIsAdmin){
    location.href = `/welcome/${data.userId}`
  }
}



function setup(){
    $("#registerUser").click(registerUser);
    $("#loginUser").click(loginUser);
}
$(document).ready(setup);