const bill = document.getElementById("bills");
const percents = document.querySelectorAll(".percent");
const custom = document.getElementById("custom");
const ppl = document.getElementById("ppl");
const amount = document.getElementById("amount");
const total = document.getElementById("total");
const reset = document.getElementById("reset");
// Calc Tip amount & Total
let calcTip = (((bill.value / ppl.value) / 100) * custom.value).toFixed(2);
let calcTotal = ((bill.value / ppl.value) + calcTip);
function totalResults() {
    if ((bill.value.trim().length === 0) || (ppl.value.trim().length === 0) || (ppl.value < 1)) {
        // When the inp value is empty or number of people is 0
        amount.innerText = "$0.00";
        total.innerText = "$0.00";
    } else {
        // When both bills and people are valid values
        total.innerText = '$' + (bill.value / ppl.value).toFixed(2);
        if (custom.value.length === 0 || custom.value === '' || custom.value === null) {
            calcBtnPercent();
        } else {
            calcCustomInp();
        }
    }
    resetBtn(bill);
    resetBtn(ppl);
}
bill.addEventListener("input", totalResults);
ppl.addEventListener("input", totalResults);
// Btns %
function calcBtnPercent() {
    for (let i = 0; i < percents.length; i++) {
        let calcBillPlusPpl = bill.value / ppl.value;
        // Select only the numbers of the text btns
        const matches = percents[i].innerText.match(/(\d+)/);
        let btnPercentResults = ((calcBillPlusPpl / 100) * matches[0]).toFixed(2);
        if (percents[i].classList.contains("active")) {
            // check if we already selected a btn, so if decided to change the input value still can get results of the last btn we selected 
            amount.innerText = '$' + Number(btnPercentResults).toFixed(2);
            total.innerText = '$' + (calcBillPlusPpl + Number(btnPercentResults)).toFixed(2);
        } else {
            // What happen when you click for the first time
            percents[i].addEventListener("click", () => {
                percents.forEach(btn => {
                    btn.classList.remove("active");
                    btn.ariaSelected = "false";
                });
                percents[i].classList.add("active");
                percents[i].ariaSelected = "true";
                custom.value = '';
                if ((bill.value.trim().length === 0) || (ppl.value.trim().length === 0) || (ppl.value < 1)) {
                    amount.innerText = "$0.00";
                    total.innerText = "$0.00";
                    percents[i].classList.remove("active");
                } else {
                    amount.innerText = '$' + Number(btnPercentResults).toFixed(2);
                    total.innerText = '$' + (calcBillPlusPpl + Number(btnPercentResults)).toFixed(2);
                }
            });
        }
        
    }
}
// Custom
custom.addEventListener("input", calcCustomInp);
function calcCustomInp() {
    // Remove selected percent btn
    percents.forEach(btn => {
        btn.classList.remove("active");
        btn.ariaSelected = "false";
    });
    if ((bill.value.trim().length === 0) || (ppl.value.trim().length === 0) || (ppl.value < 1)) {
        // When the inp value is empty or number of people is 0
        amount.innerText = "$0.00";
        total.innerText = "$0.00";
    } else {
        // Calc total
        let calcBillPlusPpl = bill.value / ppl.value;
        let inpPercentResults = ((calcBillPlusPpl / 100) * custom.value).toFixed(2);
        total.innerText = '$' + calcBillPlusPpl.toFixed(2);
        if (custom.value != '') {
            total.innerText = '$' + (calcBillPlusPpl + Number(inpPercentResults)).toFixed(2);
        }
        // Calc amount
        amount.innerText = '$' + inpPercentResults;
    }
    resetBtn(custom);
}

// Reset
function resetBtn(e) {
    if (e.value.length != 0) {
        reset.removeAttribute("disabled");
        reset.classList.add("active");
        reset.addEventListener("click", () => {
            bill.value = '';
            custom.value = '';
            ppl.value = '';
            reset.setAttribute('disabled', '');
            reset.classList.remove("active");
            amount.innerText = "$0.00";
            total.innerText = "$0.00";
            percents.forEach(btn => {
                btn.classList.remove("active");
                btn.ariaSelected = "false";
            });
        })
    } else {
        if ((bill.value.trim().length != 0) || (ppl.value.trim().length != 0) || (custom.value.length != 0)) {
            reset.removeAttribute("disabled");
            reset.classList.add("active");
        } else {
            reset.setAttribute("disabled", "");
            reset.classList.remove("active");
        }
    }
}
