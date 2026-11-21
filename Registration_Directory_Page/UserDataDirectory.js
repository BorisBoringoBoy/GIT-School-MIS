const userTableBody = document.getElementById("userTableBody");

function renderTable() {
  // 1. Clear the table body first so we don't duplicate rows
  userTableBody.innerHTML = ""; 

  // 2. Read the latest data from localStorage
  const savedUsers = localStorage.getItem("users");
  const userList = savedUsers ? JSON.parse(savedUsers) : [];

  // 3. Handle the empty state
  if (userList.length === 0) {
    const emptyRow = document.createElement("tr");
    const emptyCell = document.createElement("td");
    emptyCell.colSpan = 6; // Spans across all 6 columns now
    emptyCell.textContent = "No students found. Please register someone!";
    emptyCell.style.textAlign = "center";
    emptyCell.style.padding = "20px";
    emptyCell.style.fontStyle = "italic";
    
    emptyRow.appendChild(emptyCell);
    userTableBody.appendChild(emptyRow);
    return; 
  }

  // 4. Loop through and build the rows
  userList.forEach(function (user, index) {
    const regNumber = String(index + 1).padStart(2, "0");

    const row = document.createElement("tr");

    const regNumberCell = document.createElement("td");
    regNumberCell.textContent = regNumber;

    const nameCell = document.createElement("td");
    nameCell.textContent = user.name ?? "-";

    const gradeCell = document.createElement("td");
    gradeCell.textContent = user.grade ?? "-";

    const genderCell = document.createElement("td");
    genderCell.textContent = user.gender ?? "-";

    const contactCell = document.createElement("td");
    contactCell.textContent = user.fatherNumber ?? "-";

    // --- ACTION CELL ---
    const actionCell = document.createElement("td");
    actionCell.style.display = "flex";
    actionCell.style.gap = "5px"; // Space between buttons

    // ✅ NEW: View Details Button
    const viewBtn = document.createElement("button");
    viewBtn.textContent = "View";
    viewBtn.classList.add("viewBtn");
    
    viewBtn.addEventListener("click", function () {
      // Pops up an alert with ALL the student's information
      alert(
        `STUDENT DETAILS\n` +
        `---------------------\n` +
        `Name: ${user.name}\n` +
        `Birth Date: ${user.birthDate}\n` +
        `Gender: ${user.gender}\n` +
        `Nationality: ${user.nationality}\n` +
        `Official Address: ${user.officialAddress}\n` +
        `Current Address: ${user.currentAddress}\n` +
        `Grade: ${user.grade}\n` +
        `Academic Year: ${user.academicYear}\n` +
        `Term: ${user.term}\n` +
        `Favourite Games: ${user.games}\n` +
        `Religion: ${user.religion}\n` +
        `---------------------\n` +
        `Father's Name: ${user.fatherName}\n` +
        `Father's Phone: ${user.fatherNumber}\n` +
        `Mother's Name: ${user.motherName}\n` +
        `Mother's Phone: ${user.motherNumber}`
      );
    });

    // Delete Button
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.classList.add("deleteBtn"); 

    deleteBtn.addEventListener("click", function () {
      const confirmDelete = confirm(`Are you sure you want to delete ${user.name}?`);
      if (confirmDelete) {
        userList.splice(index, 1);
        localStorage.setItem("users", JSON.stringify(userList));
        renderTable();
      }
    });

    actionCell.appendChild(viewBtn);    // Add View button
    actionCell.appendChild(deleteBtn);  // Add Delete button

    // Append all cells to the row
    row.appendChild(regNumberCell);
    row.appendChild(nameCell);
    row.appendChild(gradeCell);
    row.appendChild(genderCell);
    row.appendChild(contactCell);
    row.appendChild(actionCell);

    // Append row to the table
    userTableBody.appendChild(row);
  });
}

// Call the function on page load
renderTable();

// --- CLEAR ALL BUTTON LOGIC ---
const clearAllBtn = document.getElementById("clearAllBtn");

clearAllBtn.addEventListener("click", function() {
  const confirmClear = confirm("Are you sure you want to delete ALL students? This cannot be undone.");
  
  if (confirmClear) {
    localStorage.removeItem("users"); 
    renderTable(); 
  }
});