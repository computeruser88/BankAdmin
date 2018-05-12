$(document).ready(function() {
  var transactionTypeInput = $("#transaction-type");
  var transactionAmountInput = $("#transaction-amount");
  var transactionDescription = $("#transaction-description");

  $("#transaction-form").on("submit", handleFormSubmit);

  var url = window.location.search;
  var transactionId;
  var accountId;

  var updating = false;

  if (url.indexOf("?transaction_id=") !== -1) {
    postId = url.split("=")[1];
    getTransactionData(transactionId, "account");
  } else if (url.indexOf("?transaction_id=") !== -1) {
    transactionId = url.split("=")[1];
  }

  getTransactions();

  function handleFormSubmit(event) {
    event.preventDefault();

    if (!transactionTypeInput.val().trim() || !transactionAmountInput.val().trim() || !accountSelect.val()) {
      return;
    }

    var newTransaction = {
      type: transactionTypeInput
        .val()
        .trim(),
      amount: transactionAmountInput
        .val()
        .trim(),
      description: transactionDescription.val()
    };
  }

  function submitTransaction(transaction) {
    $.post("/api/transactions", transaction, function() {
      window.location.href = "/transaction";
    });
  }

  function getTransactionData(id, type) {
    var queryUrl = "/api/transactions/" + id;
    $.get(queryUrl, function(data) {
      if (data) {
        console.log(data.UserId || data.id);

        typeInput.val(data.type);
        amountInput.val(data.amount);
        accountId = data.accountId || data.id;
        updating = true;
      }
    });
  }

  function getTransactions() {
    $.get("/api/transactions", renderTransactionList);
  }

  function renderTransactionList(data) {
    if (!data.length) {
      window.location.href = "/account";
    }
    $(".hidden").removeClass("hidden");
    var rowsToAdd = [];
    for (var i = 0; i < data.length; i++) {
      rowsToAdd.push(createTransactionRow(data[i]));
    }
    transactionSelect.empty();
    console.log(rowsToAdd);
    console.log(accountSelect);
    transactionSelect.append(rowsToAdd);
    transactionSelect.val(transactionId);
  }

  function createTransactionRow(user) {
    var listOption = $("<option>");
    listOption.attr("value", transaction.id);
    listOption.text(transaction.type);
    listOption.text(transaction.amount);
    listOption.text(transaction.description);
    return listOption;
  }
});
