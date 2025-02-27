let display = document.getElementById('display');
let reset = true;
let calculate = false;
let decimal = true;

// AC
function clearDisplay() {
    display.innerText = '0';
    reset = false;
    decimal = true;
}

// Off
function off() {
    reset = true;
    display.innerText = "";
}

// Delete Last Inserted
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

// Insert
function appendCharacter(char) {
    if (!reset) {
        if (calculate) {
            // When the last button pressed was equal to
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
                // Allow to input 2 minus signs
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
            // Prevent from adding two dots
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
            // Prevents from adding two zeros
            else if (display.innerText === '0') {
                display.innerText = char;
            }
            else {
                 display.innerText += char;
            }
        }
    }
}

// Shows Result
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