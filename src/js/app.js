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
    income = calculateTotal('income', entryList);
    outcome = calculateTotal('expense', entryList);
    balance = calculateBalance(income, outcome);

    balanceElem.innerHTML = `${balance}<small> RUR</small>`;
    incomeTotalElem.innerHTML = `${income}<small> RUR</small>`;
    outcomeTotalElem.innerHTML = `${outcome}<small> RUR</small>`;

    clearElements( [expense_ul, income_ul, all_ul] );

    entryList.forEach((entry, index) => {
        if (entry.type === 'income') {
            showEntry(income_ul, entry.type, entry.title, entry.amount, index);
        } else if (entry.type === 'expense') {
            showEntry(expense_ul, entry.type, entry.title, entry.amount, index);
        }
        showEntry(all_ul, entry.type, entry.title, entry.amount, index);
    })
}

function showEntry(list, type, title, amount, id) {
    const entry = `<li id="${id}" class="li__${type}">
                        <div class="entry">${title}: ${amount} руб.</div>
                        <div id="edit" class="edit"></div>
                        <div id="delete" class="delete"></div>
                    </li>`

    list.insertAdjacentHTML('afterbegin', entry);
}

function clearElements( elements ) {
    elements.forEach(elem => {
        elem.innerHTML = '';
    })
}

function calculateTotal(type, list) {
    let sum = 0;
    list.forEach(item => {
        if (item.type === type) {
            sum += item.amount;
        }
    })
    return sum;
}

function calculateBalance(income, outcome) {
    return income - outcome;
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
    this.parentNode.firstElementChild.focus()
    if (!incomeTitleInput.value.trim() || !incomeAmountInput.value.trim()) return;

    let income = {
        type: 'income',
        title: incomeTitleInput.value,
        amount: parseInt(incomeAmountInput.value)
    }
    entryList.push(income);

    updateUI();
    clearInputs( [incomeTitleInput, incomeAmountInput] );
})

expenseAddBtn.addEventListener('click', function() {
    this.parentNode.firstElementChild.focus();
    if (!expenseTitleInput.value.trim() || !expenseAmountInput.value.trim()) return;

    let expense = {
        type: 'expense',
        title: expenseTitleInput.value,
        amount: parseInt(expenseAmountInput.value)
    }
    entryList.push(expense);

    updateUI();
    clearInputs( [expenseTitleInput, expenseAmountInput] );
})