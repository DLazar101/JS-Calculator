let total = 0;
let buffer = "0";
let previousOperator;
let screen = document.querySelector(".total")

function buttonClick(value) {
    if (isNaN(parseInt(value))) {
        handleSymbol(value)
    } else {
        handleNumber(value)
    };
    rerender();
}

function handleNumber(value) {
    if (buffer == "0") {
        buffer = value;
    } else {
        buffer += value;
    }
}

function handleMath(value) {
    let intBuffer = parseInt(buffer)
    if (total == 0) {
        total = parseInt(buffer);
    } else {
        flushOperation(intBuffer)
    }

    previousOperator = value;
    buffer = "0";
}

function flushOperation(intBuffer) {
    if (previousOperator == "+") {
        total = total + intBuffer;
        console.log(total)
    } else if (previousOperator == "-") {
        total -= intBuffer;
    } else if (previousOperator == "%") {
        total = total / intBuffer;
    } else if (previousOperator == "x") {
        total *= intBuffer
    }
}

function handleSymbol(value) {
    switch (value) {
        case "C": 
            buffer = "0";
            previousOperator = null;
            break;
        case "=": 
            if (previousOperator == null) {
                return;
            } else {
                flushOperation(parseInt(buffer))
                previousOperator = null;
                buffer = total;
                total = 0;
                break;
            };
        case "‹‹": 
            if (buffer.length == 1) {
                buffer = "0";
            } else {
                buffer = buffer.substring(0, buffer.length - 1)
            }
            break;
        default: 
            handleMath(value);
            break;
    };
};

function rerender() {
    screen.innerText = buffer;
}

document
    .querySelector(".calculator-app")
    .addEventListener("click", function(event) {
        buttonClick(event.target.innerText);
})
