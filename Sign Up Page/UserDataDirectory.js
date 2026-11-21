const userTableBody = document.getElementById("userTableBody");

// ✅ CHANGED: Wrapped the rendering in a function so we can call it again after deleting

function renderTable(){
  // 1. Clear the table body first so we don't duplicate rows
  userTableBody.innerHTML = ""; // But why do we need this. I now understand it.

   // 2. Read the latest data from localStorage
  const savedUsers = localStorage.getItem("users");
  const userList = savedUsers ? JSON.parse(savedUsers):[];

   // 3. Loop through and build the rows.
  userList.forEach(function(user, index){
    const regNumber = String(index + 1).padStart(2,"0"); //for the first cell.

    //We create then row
    const row = document.createElement("tr");

    //We create Reg number cell
    const regNumberCell = document.createElement("td");
    regNumberCell.textContent = regNumber;

    //We Create Name Cell
    const nameCell = document.createElement("td");
    nameCell.textContent = user.name ?? "-"; //⁉️But Why they used the user. before name

    //We create telephone cell
    const telephoneCell = document.createElement("td");
    telephoneCell.textContent = user.telephone ?? "-";

    //We create email cell
    const emailCell = document.createElement("td");
    emailCell.textContent = user.email ?? "-";

    //✅ CHANGED: Created the Delete button.
    const actionCell = document.createElement("td");
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete"; //The literal string value you are assigning to that property, which makes the button display the word Delete on the screen.
    deleteBtn.classList.add("deleteBtn"); // We will style this in CSS

    // ✅ CHANGED: Added the click event for the Delete button
    deleteBtn.addEventListener("click", function(){
      // Optional: Ask for confirmation before deleting
      const confirmDelete = confirm(`Are you sure you want to delete ${user.name}?`);

      if(confirmDelete){
        // Remove 1 item at the current 'index' from userList
        userList.splice(index,1);

        // Save the newly shrunken list back to localStorage
        localStorage.setItem("users", JSON.stringify(userList));

        // Re-run the render function to update the screen instantly
        renderTable();
      }
    });

    actionCell.appendChild(deleteBtn);

  //Append all cells to the row
  row.appendChild(regNumberCell);
  row.appendChild(nameCell);
  row.appendChild(telephoneCell);
  row.appendChild(emailCell);
  row.appendChild(actionCell); // Add the action cell.

  //Append row to the table
  userTableBody.appendChild(row);
  });
}

// ✅ CHANGED: Call the function on page load
renderTable();