const userForm = document.getElementById("userForm");

if (userForm) {
  userForm.addEventListener("submit", function (event) {
    event.preventDefault();

    // ✅ CHANGED: Grab all the new inputs
    const studentData = {
      name: document.getElementById("userName").value.trim(),
      birthDate: document.getElementById("userBirthDate").value,
      gender: document.getElementById("userGender").value,
      nationality: document.getElementById("userNationality").value.trim(),
      officialAddress: document.getElementById("userOfficialAddress").value.trim(),
      currentAddress: document.getElementById("userCurrentAddress").value.trim(),
      grade: document.getElementById("userGrade").value,
      academicYear: document.getElementById("userAcademicYear").value.trim(),
      term: document.getElementById("userTerm").value,
      games: document.getElementById("userGames").value.trim(),
      religion: document.getElementById("userReligion").value.trim(),
      fatherName: document.getElementById("userFatherName").value.trim(),
      fatherNumber: document.getElementById("userFatherNumber").value.trim(),
      motherName: document.getElementById("userMotherName").value.trim(),
      motherNumber: document.getElementById("userMotherNumber").value.trim()
    };

    // Check if any field is empty (HTML required usually stops this, but it's safe)
    if (!studentData.name || !studentData.birthDate) {
      alert("Please fill in all required fields.");
      return;
    }

    // Read existing users
    const savedUsers = localStorage.getItem("users");
    const userList = savedUsers ? JSON.parse(savedUsers) : [];

    // Add new student
    userList.push(studentData);

    // Save back to localStorage
    localStorage.setItem("users", JSON.stringify(userList));

    alert(studentData.name + " has been registered successfully!");
    
    userForm.reset(); // Clears the whole form easily
    window.location.href = "./UserDataDirectory.html";
  });
}