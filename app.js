// store the reference to the elements on index.html by their ids -> #
// input field
const InputReason = document.querySelector("#input-reason");
const InputAmount = document.querySelector("#input-amount");
// buttons
const BtnAdd = document.querySelector("#btn-add");
const BtnCancel = document.querySelector("#btn-cancel");
// list
const ListExpenses = document.querySelector("#list-expenses");
// span
const SpanTotal = document.querySelector("#span-total-expensens");
// ion allert controller
const AllertCtl = document.querySelector("#allert-controller");

let totalExpenses = 0;

// Event Handlers
// with calling a method
BtnAdd.addEventListener("click", addExpense);
// with lambda expression
BtnCancel.addEventListener("click", () => {
  clearInputs();
});

/**
 * Add a new Expense
 */
function addExpense() {
  let reason = InputReason.value;
  let amount = InputAmount.value;

  if (validateInputs(reason, amount)) {
    console.log("Input was valid");
    addExpenseToList(reason, amount);
    addToTotalExpenses(amount);
    clearInputs();
  } else {
    throwAllert();
    console.log("Input was not Valid");
  }
}

/**
 * validate the user inputs
 *
 * @param {string} reason the input from InputReason
 * @param {string} amount input from InputAmount
 */
function validateInputs(reason, amount) {
  if (reason.trim().length >= 0 && (amount.trim().length >= 0 && amount > 0)) {
    return true;
  } else {
    return false;
  }
}

/**
 * clear imputs
 */
function clearInputs() {
  let reason = (InputReason.value = "");
  let amount = (InputAmount.value = "");
}

/**
 *
 * @param {*} reason
 * @param {*} amount
 */
function addExpenseToList(reason, amount) {
  let newItem = document.createElement("ion-item");

  newItem.textContent = reason + ": " + amount + "€";
  ListExpenses.appendChild(newItem);
}

/**
 * add to the sum of the toal expense
 * and update the view component
 * @param {*} amount
 */
function addToTotalExpenses(amount) {
  totalExpenses += +amount;
  SpanTotal.textContent = totalExpenses + "€";
}

/**
 * create and thow an allert on the screen of the app with ion componets
 */
async function throwAllert() {
  await AllertCtl.componentOnReady();

  const alert = await AllertCtl.create({
    header: "Alert",
    subHeader: "Invalid Input",
    message: "Please check yout inputs",
    buttons: ["OK"]
  });
  return await alert.present();
}
