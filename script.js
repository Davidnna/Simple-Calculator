let display = document.getElementById('display');
let reset = true;
let calculate = false;
let decimal = true;

function clearDisplay() {
    display.innerText = '0';
    reset = false;
    decimal = true;
}

function off() {
    reset = true;
    display.innerText = "";
}

function deleteLast() {
    if (!reset) {
        if (display.innerText.length > 1) {
            display.innerText = display.innerText.slice(0, -1);
            if (display.innerText.slice(-1) === ".") {
                decimal = true;
            }
            else if (display.innerText.slice(-1) === "+" || display.innerText.slice(-1) === "-" || display.innerText.slice(-1) === "*" || display.innerText.slice(-1) === "/" || display.innerText.slice(-1) === "%") {
                decimal = false;
            }
        } else {
            display.innerText = '0';
        }
        if (calculate) {
            calculate = false;
        }
    }
}

function appendCharacter(char) {
    if (!reset) {
        if (calculate) {
            if (char === "+" || char === "-" || char === "*" || char === "/" || char === "%") {
                display.innerText += char;
                decimal = true;
            }
            else if (char === ".") {
                display.innerText = "0" + char;
            }
            else {
                display.innerText = char;
            }
            calculate = false;
        }
        else {
            if (char === "+" || char === "-" || char === "*" || char === "/" || char === "%") {
                if (char === "-" && display.innerText.slice(-1) !== "-") {
                    if (display.innerText.slice(-2, -1) !== "+" && display.innerText.slice(-2, -1) !== "-" && display.innerText.slice(-2, -1) !== "*" && display.innerText.slice(-2, -1) !== "/" && display.innerText.slice(-2, -1) !== "%") {
                        display.innerText += char;
                    }
                }
                else if (!(display.innerText.slice(-1) === "+" || display.innerText.slice(-1) === "-" || display.innerText.slice(-1) === "*" || display.innerText.slice(-1) === "/" || display.innerText.slice(-1) === "%")) {
                    display.innerText += char;
                    decimal = true;
                }
            }
            else if (char === ".") {
                if (decimal) {
                    if (display.innerText.slice(-1) === "+" || display.innerText.slice(-1) === "-" || display.innerText.slice(-1) === "*" || display.innerText.slice(-1) === "/" || display.innerText.slice(-1) === "%") {
                        display.innerText += "0" + char
                    }
                    else {
                        display.innerText += char;
                        decimal = false;
                    }
                }
            }
            else if (display.innerText === '0') {
                display.innerText = char;
            }
            else {
                 display.innerText += char;
            }
        }
    }
}

function result() {
    if (!reset) {
        try {
            display.innerText = eval(display.innerText);
        } catch {
            display.innerText = 'Error';
        }
    }
    calculate = true;
}