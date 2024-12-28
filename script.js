let input = document.getElementById("amount");

let apiKey = "24faec6b42da4a96ceea41d3";

let fromCurrency = document.getElementById("fromCurrency");
let toCurrency = document.getElementById("toCurrency");

function createOption(currency, defaultCode, element) {
  const option = document.createElement("option");
  option.classList.add("select-option");
  option.value = currency.code;
  if (currency.code === defaultCode) {
    option.selected = true;
  }
  option.text = `${currency.flag} ${currency.code} - ${currency.name}`;
  element.appendChild(option);
}

function addCurrency() {
  const result = currencies.forEach((currency) => {
    const optionFrom = document.createElement("option");
    optionFrom.classList.add("select-option");
    optionFrom.value = currency.code;
    if (currency.code === "USD") {
      optionFrom.selected = true;
    }
    optionFrom.text = `${currency.flag} ${currency.code} - ${currency.name}`;

    fromCurrency.appendChild(optionFrom);

    const optionTO = document.createElement("option");
    optionTO.classList.add("select-option");
    optionTO.value = currency.code;
    if (currency.code === "EUR") {
      optionTO.selected = true;
    }
    optionTO.text = `${currency.flag} ${currency.code} - ${currency.name}`;
    toCurrency.appendChild(optionTO);
  });
}
addCurrency();

const convertBtn = document.querySelector(".convert");
convertBtn.addEventListener("click", () => {
  convertCurrency();
});

function convertCurrency() {
  const BASE_URL = `https://v6.exchangerate-api.com/v6/${apiKey}`;

  const fromCurrrencyCode = document.getElementById("fromCurrency").value;
  const toCurrencyCode = document.getElementById("toCurrency").value;
  const result = document.querySelector(".result");
  const error = document.querySelector(".error");

  console.log(fromCurrrencyCode);
  console.log(toCurrencyCode);

  const amount = input.value;

  if (amount !== "" && parseFloat(amount) >= 1) {
    const url = `${BASE_URL}/pair/${fromCurrrencyCode}/${toCurrencyCode}`;
    console.log(url);
    fetch(url)
      .then((resp) => resp.json())
      .then((data) => {
        console.log(data.conversion_rate);

        const conversionResult = (amount * data.conversion_rate).toFixed(2);
        const formattedResult = conversionResult.replace(
          /\B(?=(\d{3})+(?!\d))/g,
          ","
        );

        result.innerHTML = `${amount} ${fromCurrrencyCode} = ${formattedResult} ${toCurrencyCode}`;
        amount.innerHTML = " ";
      })
      .catch(() => {
        error.textContent = "An error occured, please try again later ";
      });
  } else {
    alert("Please enter an amount");
  }
}
