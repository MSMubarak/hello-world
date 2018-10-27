var validation_status=true;

function validateName(name){
  if (name) {
    document.getElementById("name-required").style.display = "none";
    if (name.length > 36) {
      validation_status = false;
      document.getElementById("name-length").style.display = "block";
      document.getElementById("name-type").style.display = "none";
    }
    else if (!(name.match(/^[A-Za-z]+$/))) {
      validation_status = false;
      document.getElementById("name-length").style.display = "none";
      document.getElementById("name-type").style.display = "block";
    }
    else {
      document.getElementById("name-length").style.display = "none";
      document.getElementById("name-type").style.display = "none";
    }
  } else {
    validation_status = false;
    document.getElementById("name-required").style.display = "block";
    document.getElementById("name-length").style.display = "none";
    document.getElementById("name-type").style.display = "none";
  }
}

function validateEmail(email){
  if (email) {
    document.getElementById("email-required").style.display = "none";
     var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(re.test(String(email).toLowerCase()))
    {
      document.getElementById("email-validity").style.display="none";
    }
    else{
      validation_status=false;
      document.getElementById("email-validity").style.display="block";
    }
  }
  else{
    validation_status = false;
    document.getElementById("email-required").style.display = "block"
  }
}

function validateCity(city){
  if(city){
    document.getElementById("city-select").style.display="none";
    }
    else
    {
      validation_status=false;
      document.getElementById("city-select").style.display="block";
    }
}

function validateAge(age){
  if (age) {
    document.getElementById("age-required").style.display = "none";
    if (age < 18 || age > 150) {
      validation_status = false;
      document.getElementById("age-limit").style.display = "block";
      document.getElementById("age-type").style.display = "none";
    }
     else if (!(age.match(/^[0-9]*$/))) {
      validation_status = false;
      document.getElementById("age-limit").style.display = "none";
      document.getElementById("age-type").style.display = "block";
    }
    else {
      document.getElementById("age-limit").style.display = "none";
      document.getElementById("age-type").style.display = "none";
    }
  }
  else {
    validation_status = false;
    document.getElementById("age-required").style.display = "block";
    document.getElementById("age-limit").style.display = "none";
    document.getElementById("age-type").style.display = "none";
  }
}


function clearForm(){
  document.getElementById("name").value = "";
  document.getElementById("email").value = "";
  document.getElementById("age").value= "";
  document.getElementById("city").value = "";
  document.getElementById("clear").style.display="none";
  document.getElementById("update").style.display="none";
  document.getElementById("submit").style.display="block";
}


function validateForm(){
  var name = document.getElementById("name").value;
  var email = document.getElementById("email").value;
  var age = document.getElementById("age").value;
  var city = document.getElementById("city").value;

  validateAge(age);
  validateCity(city);
  validateName(name);
  validateEmail(email);

  console.log(validation_status)

  if(validation_status)
  {
  var personal_details=[];
  if(JSON.parse(localStorage.getItem("personal_details")&& JSON.parse(localStorage.getItem("personal_details").length>0)))
  {
    personal_details=JSON.parse(localStorage.getItem("personal_details"));
  }


  var  personal_detail={
    id:personal_details.length+1,
    name:name,
    email:email,
    city:city,
    age:age
  }

  personal_details.push(personal_detail);
  localStorage.setItem("personal_details",JSON.stringify(personal_details));
  createListView();
  clearForm();
}
}


function getUserDetail(user){
  var userId = parseInt(localStorage.getItem("userId"));
  return user.id === userId
}


function createListView(){
  if(localStorage.getItem("userId")||(localStorage.getItem("personal_details")&&localStorage.getItem("personal_details").length>0)){
console.log(localStorage.getItem("userId"))
    document.getElementById("localStorage").style.display = "block";
  }
  var personal_details = JSON.parse(localStorage.getItem("personal_details"));
  var list = "";
  if(personal_details&&personal_details.length>0){
    for(personal_detail of personal_details){
      list +="<li>"+personal_detail.name+"-"+personal_detail.age+"-"+personal_detail.email+"-"+personal_detail.city+"<button onclick='editUser("+personal_detail.id+")'>Edit</button>"+"<button onclick='deleteUser("+personal_detail.id+")'>Delete</button>"+"</li>"
    }
  }
document.getElementById("iterate_personal_details").innerHTML = list.toString();
}




function deleteUser(id){
  var personal_details = JSON.parse(localStorage.getItem("personal_details"));
  var personal_details_deleted= personal_details.filter(function(personal_detail){
    return personal_detail.id!==id
  });
  localStorage.setItem("personal_details",JSON.stringify(personal_details_deleted));
  createListView();
  clearForm();
}



function editUser(id){
  var personal_details = JSON.parse(localStorage.getItem("personal_details"));
  var personal_detail_edit= personal_details.filter(function(personal_detail){
    return personal_detail.id===id
  });
  document.getElementById("clear").style.display="block";
  document.getElementById("update").style.display="block";
  document.getElementById("submit").style.display="none";
  localStorage.setItem("userId",id);
  document.getElementById("name").value = personal_detail_edit[0].name;
  document.getElementById("email").value = personal_detail_edit[0].email;
  document.getElementById("age").value= personal_detail_edit[0].age;
  document.getElementById("city").value = personal_detail_edit[0].city;
}









function updateUser(){
  var personal_details = JSON.parse(localStorage.getItem("personal_details"));
  var name = document.getElementById("name").value;
  var email = document.getElementById("email").value;
  var age = document.getElementById("age").value;
  var city = document.getElementById("city").value;

  validateAge(age);
  validateCity(city);
  validateName(name);
  validateEmail(email);
  if(validation_status){
    var  personal_detail={
      id:personal_details.length+1,
      name:name,
      email:email,
      city:city,
      age:age
    }
    personal_details[personal_details.findIndex(getUserDetail)]=personal_detail;
    localStorage.setItem("personal_details",JSON.stringify(personal_details));
    createListView();
    clearForm();
    document.getElementById("clear").style.display="none";
    document.getElementById("update").style.display="none";
    document.getElementById("submit").style.display="block";
  }

}


function clearLocal(){
  localStorage.removeItem("personal_details");
  localStorage.removeItem("userId");
  createListView();
  document.getElementById("localStorage").style.display="none";
}
