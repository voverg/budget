// Select html elements
const balanceElem = document.querySelector('.balance__value');
const incomeTotalElem = document.querySelector('.income__total');
const outcomeTotalElem = document.querySelector('.outcome__total');
const incomeElem = document.querySelector('.dashboard__income');
const expenseElem = document.querySelector('.dashboard__expense');
const allElem = document.querySelector('.dashboard__all');
const income_ul = document.querySelector('.dashboard__income .list');
const expense_ul = document.querySelector('.dashboard__expense .list');
const all_ul = document.querySelector('.dashboard__all .list');
// Select the tab buttons
const incomeBtn = document.querySelector('.income-tab');
const expenseBtn = document.querySelector('.expense-tab');
const allBtn = document.querySelector('.all-tab');
// Select the inputs
const incomeAddBtn = document.querySelector('.add-income');
const incomeTitleInput = document.querySelector('.income-title-input');
const incomeAmountInput = document.querySelector('.income-amount-input');

const expenseAddBtn = document.querySelector('.add-expense');
const expenseTitleInput = document.querySelector('.expense-title-input');
const expenseAmountInput = document.querySelector('.expense-amount-input');
// Variables
let entryList = [];
let balance = 0, income = 0, outcome = 0;
const del = 'delete', edit = 'edit';

// --------------- Functions ----------------------------
function updateUI() {

}

function clearInputs( inputs ) {
    inputs.forEach(input => {
        input.value = '';
    })
}

// Show and hide tabs and dashboard screens categories
function show(elem) {
    elem.classList.remove('hide');
}

function hide( array ) {
    array.forEach(elem => {
        elem.classList.add('hide');
    });
}

function active(tab) {
    tab.classList.add('active');
}

function inactive( arrayTabs ) {
    arrayTabs.forEach(tab => {
        tab.classList.remove('active');
    });
}

// Add tasks


// ------------------------------ Event listeners
incomeBtn.addEventListener('click', function() {
    show(incomeElem);
    hide( [expenseElem, allElem] );
    active(incomeBtn);
    inactive( [expenseBtn, allBtn] );
})
expenseBtn.addEventListener('click', function() {
    show(expenseElem);
    hide( [incomeElem, allElem] );
    active(expenseBtn);
    inactive( [incomeBtn, allBtn] );
})
allBtn.addEventListener('click', function() {
    show(allElem);
    hide( [expenseElem, incomeElem] );
    active(allBtn);
    inactive( [expenseBtn, incomeBtn] );
})
// Add notes
incomeAddBtn.addEventListener('click', function() {
    if (!incomeTitleInput || !incomeAmountInput) return;

    let income = {
        type: 'income',
        title: incomeTitleInput.value,
        amount: incomeAmountInput.value
    }
    entryList.push(income);

    updateUI();
    clearInputs( [incomeTitleInput, incomeAmountInput] )
})

expenseAddBtn.addEventListener('click', function() {
    if (!expenseTitleInput || !expenseAmountInput) return;

    let expense = {
        type: 'expense',
        title: expenseTitleInput.value,
        amount: expenseAmountInput.value
    }
    entryList.push(expense);

    updateUI();
    clearInputs( [expenseTitleInput, expenseAmountInput] )
})