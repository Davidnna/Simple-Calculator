let display = document.getElementById('display');
let reset = true;
let calculate = false;
let decimal = true;

function clearDisplay() {
    display.value = '0';
    reset = false;
    decimal = true;
}

function off() {
    reset = true;
    display.value = "";
}

function deleteLast() {
    if (!reset) {
        if (display.value.length > 1) {
            display.value = display.value.slice(0, -1);
            if (display.value.slice(-1) === ".") {
                decimal = true;
            }
            else if (display.value.slice(-1) === "+" || display.value.slice(-1) === "-" || display.value.slice(-1) === "*" || display.value.slice(-1) === "/" || display.value.slice(-1) === "%") {
                decimal = false;
            }
        } else {
            display.value = '0';
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
                display.value += char;
                decimal = true;
            }
            else if (char === ".") {
                display.value = "0" + char;
            }
            else {
                display.value = char;
            }
            calculate = false;
        }
        else {
            if (char === "+" || char === "-" || char === "*" || char === "/" || char === "%") {
                if (char === "-" && display.value.slice(-1) !== "-") {
                    if (display.value.slice(-2, -1) !== "+" && display.value.slice(-2, -1) !== "-" && display.value.slice(-2, -1) !== "*" && display.value.slice(-2, -1) !== "/" && display.value.slice(-2, -1) !== "%") {
                        display.value += char;
                    }
                }
                else if (!(display.value.slice(-1) === "+" || display.value.slice(-1) === "-" || display.value.slice(-1) === "*" || display.value.slice(-1) === "/" || display.value.slice(-1) === "%")) {
                    display.value += char;
                    decimal = true;
                }
            }
            else if (char === ".") {
                if (decimal) {
                    if (display.value.slice(-1) === "+" || display.value.slice(-1) === "-" || display.value.slice(-1) === "*" || display.value.slice(-1) === "/" || display.value.slice(-1) === "%") {
                        display.value += "0" + char
                    }
                    else {
                        display.value += char;
                        decimal = false;
                    }
                }
            }
            else if (display.value === '0') {
                display.value = char;
            }
            else {
                 display.value += char;
            }
        }
    }
}

function result() {
    if (!reset) {
        try {
            display.value = eval(display.value);
        } catch {
            display.value = 'Error';
        }
    }
    calculate = true;
}