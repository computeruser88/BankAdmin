$(document).ready(function() {
  var accountNameInput = $("#account-name");
  var titleInput = $("#account-type");
  var userSelect = $("#user");

  $("#account-form").on("submit", handleFormSubmit);

  var url = window.location.search;
  var accountId;
  var userId;

  var updating = false;

  if (url.indexOf("?account_id=") !== -1) {
    postId = url.split("=")[1];
    getAccountData(accountId, "account");
  }

  else if (url.indexOf("?user_id=") !== -1) {
    userId = url.split("=")[1];
  }

  getAccounts();

  function handleFormSubmit(event) {
    event.preventDefault();

    if (!accountNameInput.val().trim() || !accountTypeInput.val().trim() || !userSelect.val()) {
      return;
    }

    var newAccount = {
      name: accountNameInput
        .val()
        .trim(),
      type: accountTypeInput
        .val()
        .trim(),
      userId: userSelect.val()
    };

    if (updating) {
      newAccount.id = accountId;
      updateAccount(newAccount);
    }
    else {
      submitPost(newPost);
    }
  }

  function submitAccount(account) {
    $.post("/api/accounts", account, function() {
      window.location.href = "/account";
    });
  }

  function getAccountData(id, type) {
    var queryUrl;
    switch (type) {
    case "account":
      queryUrl = "/api/accounts/" + id;
      break;
    case "user":
      queryUrl = "/api/users/" + id;
      break;
    default:
      return;
    }
    $.get(queryUrl, function(data) {
      if (data) {
        console.log(data.AuthorId || data.id);

        nameInput.val(data.name);
        typeInput.val(data.type);
        userId = data.UserId || data.id;
        updating = true;
      }
    });
  }

  function getAccounts() {
    $.get("/api/accounts", renderAccountList);
  }

  function renderAccountList(data) {
    if (!data.length) {
      window.location.href = "/users";
    }
    $(".hidden").removeClass("hidden");
    var rowsToAdd = [];
    for (var i = 0; i < data.length; i++) {
      rowsToAdd.push(createAccountRow(data[i]));
    }
    accountSelect.empty();
    console.log(rowsToAdd);
    console.log(accountSelect);
    accountSelect.append(rowsToAdd);
    accountSelect.val(accountId);
  }

  function createAccountRow(account) {
    var listOption = $("<option>");
    listOption.attr("value", account.id);
    listOption.text(account.name);
    listOption.text(account.type);
    return listOption;
  }

  function updateAccount(account) {
    $.ajax({
      method: "PUT",
      url: "/api/accounts",
      data: account
    })
      .then(function() {
        window.location.href = "/accounts";
      });
  }
});
