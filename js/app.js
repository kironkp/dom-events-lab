/*-------------------------------- Constants --------------------------------*/

/*-------------------------------- Variables --------------------------------*/

let currentInput = '';

/*------------------------ Cached Element References ------------------------*/

const displayEl = document.querySelector('.display');
const buttons = document.querySelectorAll('#calculator .button');


/*----------------------------- Event Listeners -----------------------------*/


buttons.forEach(button => {
  button.addEventListener('click', handleButtonClick);
});


/*-------------------------------- Functions --------------------------------*/

// Centralized click handler that updates the current input based on which button was clicked.
function handleButtonClick(evt) {
  const value = evt.target.textContent.trim();
  if (value === 'C' || value === 'c') {
    // Clear the input when the clear button is pressed.
    currentInput = '';
  } else if (value === '=') {
    // Evaluate the current expression when the equals button is pressed.
    try {
      // Use JavaScript's eval to compute the result. Wrap in String() to ensure display renders correctly.
      currentInput = eval(currentInput).toString();
    } catch (err) {
      // If evaluation fails (e.g. invalid expression), show an error and then reset input.
      currentInput = 'Error';
      setTimeout(() => currentInput = '', 1000);
    }
  } else {
    // Append the clicked number or operator to the current input string.
    currentInput += value;
  }
  render();
}

// Render function updates the calculator display. It defaults to 0 when the input string is empty.
function render() {
  displayEl.textContent = currentInput || '0';
}
// Initial render to show zero on page load
render();






































// // Render function updates the calculator display. It defaults to 0 when the input string is empty.
// function render() {
//   displayEl.textContent = currentInput || '0';
// }
// // Initial render to show zero on page load
// render();

// // Constants
// // No fixed constants are required for this calculator but this section is left here for future expansion.

// // State variables
// // This string holds the user's current input and will be displayed on the calculator screen.
// let currentInput = '';

// // Cached Element References
// // Grab the display element and all the buttons inside the calculator so we can update the DOM and attach event listeners.
// const displayEl = document.querySelector('.display');
// const buttons = document.querySelectorAll('#calculator .button');

// // Event Listeners
// // Attach a single click handler to each button. The handler will inspect the button's text to determine what action to take.
// buttons.forEach(button => {
//   button.addEventListener('click', handleButtonClick);
// });

// // Functions
// // Centralized click handler that updates the current input based on which button was clicked.
// function handleButtonClick(evt) {
//   const value = evt.target.textContent.trim();
//   if (value === 'C' || value === 'c') {
//     // Clear the input when the clear button is pressed.
//     currentInput = '';
//   } else if (value === '=') {
//     // Evaluate the current expression when the equals button is pressed.
//     try {
//       // Use JavaScript's eval to compute the result. Wrap in String() to ensure display renders correctly.
//       currentInput = eval(currentInput).toString();
//     } catch (err) {
//       // If evaluation fails (e.g. invalid expression), show an error and then reset input.
//       currentInput = 'Error';
//       setTimeout(() => currentInput = '', 1000);
//     }
//   } else {
//     // Append the clicked number or operator to the current input string.
//     currentInput += value;
//   }
//   render();
// }

// // Render function updates the calculator display. It defaults to 0 when the input string is empty.
// function render() {
//   displayEl.textContent = currentInput || '0';
// }
// // Initial render to show zero on page load
// render();
