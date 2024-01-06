document.addEventListener('DOMContentLoaded', function() 
{
  const display = document.getElementById('calculatorDisplay');
  const clearButton = document.getElementById('clearButton');
  const deleteButton = document.getElementById('deleteButton');
  const equalButton = document.getElementById('equalButton');
  const numberButtons = document.querySelectorAll('.numberButton');
  const operatorButtons = document.querySelectorAll('.operatorButton');

  let inputString = '';

  clearButton.addEventListener('click', function() {
    clearInput();
  });

  deleteButton.addEventListener('click', function() {
    deleteLastCharacter();
  });

  equalButton.addEventListener('click', function() {
    calculateResult();
  });

  numberButtons.forEach(function(button) {
    button.addEventListener('click', function() {
      appendToInput(button.value);
    });
  });

  operatorButtons.forEach(function(button) {
    button.addEventListener('click', function() {
      appendOperator(button.value);
    });
  });

  function appendToInput(value) {
    inputString += value;
    updateDisplay();
  }

  function appendOperator(operator) {
    const lastChar = inputString.slice(-1);
    if (!isOperator(lastChar) || (operator === '-' && lastChar !== '-')) {
      appendToInput(operator);
    }
  }

  function isOperator(char) {
    return ['+', '-', '*', '/'].includes(char);
  }

  function clearInput() {
    inputString = '';
    updateDisplay();
  }

  function deleteLastCharacter() {
    inputString = inputString.slice(0, -1);
    updateDisplay();
  }

  function calculateResult() {
    try {
      // Adding a check for invalid division by zero
      if (inputString.includes('/0')) {
        throw new Error('Cannot divide by zero');
      }
      
      inputString = eval(inputString).toString();
    } catch (error) {
      inputString = 'Error: ' + error.message;
    }
    updateDisplay();
  }

  function updateDisplay() {
    display.value = inputString;
  }
});
