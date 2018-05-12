$(document).ready(function() {
  var nameInput = $("#user-name");
  var userList = $("tbody");
  var userContainer = $(".user-container");

  $(document).on("submit", "#user-form", handleUserFormSubmit);
  $(document).on("click", ".delete-user", handleDeleteButtonPress);

  getUsers();

  function handleUserFormSubmit(event) {
    event.preventDefault();

    if (!nameInput.val().trim().trim()) {
      return;
    }

    upsertUser({
      name: nameInput
        .val()
        .trim()
    });
  }

  function upsertUser(userData) {
    $.post("/api/authors", userData)
      .then(getUsers);
  }

  function createUserRow(userData) {
    var newTr = $("<tr>");
    newTr.data("author", userData);
    newTr.append("<td>" + userData.name + "</td>");
    newTr.append("<td> " + userrData.Accounts.length + "</td>");
    newTr.append("<td><a href='/users?user_id=" + userData.id + "'>Go to Accounts</a></td>");
    newTr.append("<td><a href='/cms?user_id=" + userData.id + "'>Create an Account</a></td>");
    newTr.append("<td><a style='cursor:pointer;color:red' class='delete-user'>Delete User</a></td>");
    return newTr;
  }

  function getAuthors() {
    $.get("/api/users", function(data) {
      var rowsToAdd = [];
      for (var i = 0; i < data.length; i++) {
        rowsToAdd.push(createUserRow(data[i]));
      }
      renderUserList(rowsToAdd);
      nameInput.val("");
    });
  }

  function renderUserList(rows) {
    userList.children().not(":last").remove();
    userContainer.children(".alert").remove();
    if (rows.length) {
      console.log(rows);
      userList.prepend(rows);
    }
    else {
      renderEmpty();
    }
  }

  function renderEmpty() {
    var alertDiv = $("<div>");
    alertDiv.addClass("alert alert-danger");
    alertDiv.text("You must create a user before you can create an account.");
    userContainer.append(alertDiv);
  }

  function handleDeleteButtonPress() {
    var listItemData = $(this).parent("td").parent("tr").data("user");
    var id = listItemData.id;
    $.ajax({
      method: "DELETE",
      url: "/api/users/" + id
    })
      .then(getUsers);
  }
});
