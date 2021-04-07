const technologiesSelect = document.querySelector('#type-of-techologies-select');

const technologiesMultiSelect = new Choices(technologiesSelect, {
allowSearch: false,
silent: false,
renderChoiceLimit: -1,
maxItemCount: -1,
removeItems: true,
removeItemButton: true,
editItems: false,
duplicateItemsAllowed: false,
delimiter: ",",
paste: true,
searchEnabled: false,
searchChoices: true,
searchResultLimit: -1,
position: "auto",
resetScrollPosition: true,
shouldSort: true,
shouldSortItems: false,
placeholder: true,
noChoicesText: "No available options",
itemSelectText: "Click to select",
classNames: {
    containerInner: "choices__inner tech-input-container",
    input: "choices__input",
    },
});

calculateSum();

const calculatorForm = document.querySelector('.calculatorForm');

calculatorForm.addEventListener('submit', function(event) {
   
    event.preventDefault();
    calculateSum();
    


});

// Чтобы просчет суммы был при первом открытии сайта

function calculateSum() {
    
    //Selectors
    const websiteTypeSelect = document.querySelector('.calc-form-select');
    const websiteCart = document.querySelector('.radio-btn-cart input:checked');
    const websiteEmail = document.querySelector('.radio-btn-email input:checked');
    
    

    //Values
    const websiteTypeValue = extractPriceFromValue(websiteTypeSelect.value);
    const technologiesValue = getTechnologiesSum(technologiesMultiSelect.getValue());
    const websiteCartValue  = convertCartOptionToPrice(websiteCart.value);
    const websiteEmailValue = convertEmailOptionToPrice(websiteEmail.value);
    
    const totalSum = websiteTypeValue + technologiesValue + websiteCartValue + websiteEmailValue;
    renderSum(totalSum);

}

// Общая сумма

function renderSum(sum) {
    const finalSum = document.querySelector('.final-price');

    finalSum.textContent = 'Calculating...';

    setTimeout(function() {
        finalSum.textContent = sum + '$';

    }, 2000);
   
}

// Вычленение цены из значений yes/no Cart

function convertCartOptionToPrice(option) {
    if (option === 'yes') {
        return 300;

    }
    return 0;
};


// Вычленение цены из значений yes/no Email
function convertEmailOptionToPrice(option) {
    if (option === 'yes') {
        return 500;

    }
    return 0;
}


// Вычленение цены из Value в описании опций Multi Select

  function getTechnologiesSum(technologiesArr) {
      let totalSum = 0;

    technologiesArr.forEach( function(tech) {
        tech.value
        totalSum = totalSum + extractPriceFromValue(tech.value)
    })

    return totalSum;

  }

  // Вычленение цены из Value в описании опций Select Type Page

function extractPriceFromValue(str) {
    const price = str.match(/:\d+/);
  
    if (price) {
      return Number(price[0].slice(1)) || 0;
    }
  
    return 0;
  }