  const userForm = document.getElementById("userForm");
  const userName = document.getElementById("userName");
  const userTelephone = document.getElementById("userTelephone");
  const userEmail = document.getElementById("userEmail");

  if(userForm){
  userForm.addEventListener("submit", function(event){
    event.preventDefault(); //This prevents default starting of the page.

    const names = userName.value.trim(); 
    const telephone = userTelephone.value.trim(); 
    const email = userEmail.value.trim(); 

    if(names === "" || telephone === "" || email === ""){
      alert("Please fill in all fields before submitting.");
      return;
    }

    // 1. we read data saved from local storage
    //Store ONE array of user objects
    const savedUsers = localStorage.getItem("users"); // you asign any saved user under key: users to variable savedusers but remember they are still stringified(written in text not array list).
    const userList = savedUsers ? JSON.parse(savedUsers):[]; //you change that text array into list using JSON property. ? means if any, : means if not.

    //Store ONE array of user objects
    userList.push({
      name: names,
      telephone: telephone,
      email: email,
    });

    //Then after we save again the lists in a stringified way which is the only way a computer stores data in local storage.
    localStorage.setItem("users", JSON.stringify(userList));

    //Then after we inform the User that we have signed they in using alert method
    alert(names + " you have been signed in successful");
    userName.value = ""; //Then after we reset our name input to blank space
    userTelephone.value = ""; //Then after we reset our telephone input to blank space
    userEmail.value = ""; //Then after we reset our email input to blank space

    window.location.href = "./UserDataDirectory.html"
  });
}