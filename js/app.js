/*-------------------------------- Constants --------------------------------*/

/*-------------------------------- Variables --------------------------------*/

let current = '0';        // what you’re typing now (string so we can build multi-digit)
let previous = null;      // stored left-hand operand
let operator = null;      // '+', '-', '*', or '/'
let waitingForSecond = false; // when true, next digit starts a new number

/*------------------------ Cached Element References ------------------------*/

const displayEl = document.querySelector('.display');
const numberButtons   = document.querySelectorAll('.button.number');
const operatorButtons = document.querySelectorAll('.button.operator'); // includes C and + - * /
const equalsButton    = document.querySelector('.button.equals');


/*----------------------------- Event Listeners -----------------------------*/

// numbers: 0–9
numberButtons.forEach(btn => {
  btn.addEventListener('click', (e) => {
    const digit = e.target.innerText;

    if (waitingForSecond) {
      // start fresh for the second number
      current = digit;
      waitingForSecond = false;
    } else {
      // build multi-digit (avoid leading zeros)
      current = current === '0' ? digit : current + digit;
    }
    render();
  });
});

// operators: C, +, -, *, /
operatorButtons.forEach(btn => {
  btn.addEventListener('click', (e) => {
    const op = e.target.innerText;

    if (op === 'C') {
      clearAll();
      return;
    }

    // If user taps an operator
    if (operator && waitingForSecond) {
      // change operator before entering the second number (e.g., 8 + -> 8 -)
      operator = op;
      return;
    }

    if (previous === null) {
      // first time choosing an operator: stash the left operand
      previous = Number(current);
    } else if (!waitingForSecond) {
      // chaining: compute previous op current (e.g., 8 + 2, then press * …)
      previous = compute(previous, Number(current), operator);
      current = String(previous);
      render();
    }

    operator = op;
    waitingForSecond = true; // next digit starts second operand
  });
});

// equals: =
equalsButton.addEventListener('click', () => {
  if (operator === null || previous === null) return;

  const result = compute(previous, Number(current), operator);
  current = String(result);
  previous = null;
  operator = null;
  waitingForSecond = false;
  render();
});


/*-------------------------------- Functions --------------------------------*/

function compute(a, b, op) {
  switch (op) {
    case '+': return a + b;
    case '-': return a - b;
    case '*': return a * b;
    case '/': return b === 0 ? NaN : a / b; // simple guard
    default:  return b;
  }
}

function clearAll() {
  current = '0';
  previous = null;
  operator = null;
  waitingForSecond = false;
  render();
}

function render() {
    if (displayEl) displayEl.innerText = current;
}


// initial paint
render();

