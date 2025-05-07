const BASE_URL = "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";

const countryList = {
  USD: "US",
  INR: "IN",
  EUR: "EU",
  AUD: "AU",
};

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");

// Populate dropdowns
for (let select of dropdowns) {
  for (let currCode in countryList) {
    let newOption = document.createElement("option");
    newOption.innerText = currCode;
    newOption.value = currCode;
    if (select.name === "from" && currCode === "USD") {
      newOption.selected = "selected";
    } else if (select.name === "to" && currCode === "INR") {
      newOption.selected = "selected";
    }
    select.append(newOption);
  }

  select.addEventListener("change", (evt) => {
    updateFlag(evt.target);
  });
}

const updateExchangeRate = async () => {
    let amount = document.querySelector(".amount input");
    let amtVal = parseFloat(amount.value);
    if (isNaN(amtVal) || amtVal < 1) {
      amtVal = 1;
      amount.value = "1";
    }
  
    try {
      const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}.json`;
      let response = await fetch(URL);
      
      // Check if response is valid
      if (!response.ok) {
        throw new Error('Failed to fetch exchange rate');
      }
  
      let data = await response.json();
      let rate = data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()];
      let finalAmount = amtVal * rate;
  
      msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount.toFixed(2)} ${toCurr.value}`;
    } catch (error) {
      console.error(error);
      msg.innerText = 'Error fetching exchange rate data';
    }
  };
  
  const updateFlag = (element) => {
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newSrc = `https://www.countryflags.io/${countryCode}/flat/64.png`;  // Updated to use countryflags.io
  
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
  };
  
