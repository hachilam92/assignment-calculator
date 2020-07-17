window.onload=function(){

let display = document.querySelector('.display');
let expDisplay = document.querySelector('.expression-display');
let operandQueue = [];
let operatorQueue = [];
let input =  '0';
let expression = '';
let emptyInput = false;
let dotExist = false;
let timeUpdate;
let timeExist = false;

class Display {
    static show (content){
        display.innerHTML = content;
    }

    static reset(){
        this.show('0');
    }

    static expShow(content){
        expDisplay.innerHTML = content;
    }

    static expReset(){
        this.expShow('');
    }

    static numberInput(addedNumber){
        if(operatorQueue.length < 1){
            Memory.operandReset();
        }
        return (input === '0')? addedNumber : input + addedNumber;
    }

    static dotInput(addedSymbol){
        let added = (dotExist) ? ''
                : (emptyInput) ? '0.'
                : addedSymbol;
        if(!dotExist){
            dotExist = true;
        }
        return input + added;
    }

    static inputUpdate(numberButton) {
        let added = numberButton.textContent;
        input = (added === '.')? this.dotInput(added):this.numberInput(added);
        if(emptyInput){
            emptyInput = !emptyInput;
        }
        
        if(operatorQueue.length<1){
            Memory.expressionReset();
            Display.expReset();
        }

        Display.show(input);
        console.log(input);      // for test
    }
}

class Memory {
    static inputReset(){
        input = '0';
        emptyInput = false;
        dotExist = false;
    }

    static inputEmpty(){
        input = '';
        emptyInput = true;
        dotExist = false;
    }

    static expressionReset(){
        expression = '';
    }

    static operandReset(){
        operandQueue = [];
    }

    static afterCalc(){
        return (expression.charAt(expression.length-1) === '=')?true:false;
    }

    static expNumUpdate(inputString){
        expression = (this.afterCalc())?` ${inputString}`: expression += ` ${inputString}`;
    }
    static expOptUpdate(inputString){
        let lastChar = parseFloat(expression.slice(-1));
        if(isNaN(lastChar)){
            expression = expression.slice(0,-1)
        }
        expression += ` ${inputString}`;
    }

    static operatorReset(){
        operatorQueue = [];
    }

    static operandQueueUpdate() {
        if(!emptyInput){
            let operand = parseFloat(input);
            operandQueue.push(operand);
            this.expNumUpdate(input);
            Display.expShow(expression);
            this.inputEmpty();
            console.log(operandQueue); // for test
        }
    }

    static operatorQueueUpdate(operatorButton){
        let operator = operatorButton.textContent;
        operatorQueue = [operator];
        this.expOptUpdate(operator);
        Display.expShow(expression);
        console.log(operatorQueue);  // for test
    }

    static dropTime(){
        clearInterval(timeUpdate);
        timeExist = false;
    }

    static clear() {
        this.dropTime();
        this.operandReset();
        this.operatorReset();
        this.inputReset();
        this.expressionReset();
        Display.reset();
        Display.expReset();
    }
}

class Calculator {
    static validExpr(){
        return (((operandQueue.length >1)&&(operatorQueue.length >0))?true:false);
    }

    static calculate(){
        let result = 0;
        let operand1 = operandQueue[0];
        let operand2 = operandQueue[1];
        switch(operatorQueue[0]){
            case '+':
                result = operand1 + operand2;
                break;
            case '-':
                result = operand1 - operand2;
                break;
            case '×':
                result = operand1 * operand2;
                break;
            case '÷':
                result = operand1 / operand2;
                break;
            default:
                result = 0;
        }
        operandQueue = [result];
        Memory.expNumUpdate(` =`);
        Display.expShow(expression);
        Display.show(result);
        Memory.expNumUpdate(result);
        Memory.operatorReset();
    }
}

class Component {
    constructor(className){
        this.node = document.querySelector(`.${className}`);
    }
}


class NumberButton extends Component {
    constructor(className){
        super(className);
        this.node.addEventListener('click', function(e){
            if(!timeExist){
                Display.inputUpdate(e.target);
            }
        })
    } 
}

class OperatorButton extends Component {
    constructor(className){
        super(className);
        this.node.addEventListener('click', function(e){
            if(!timeExist){
                Memory.operandQueueUpdate();
                if(Calculator.validExpr()){
                    Calculator.calculate();
                }
                Memory.operatorQueueUpdate(e.target);
            }
        })
    } 
}

class EqualButton extends Component {
    constructor(className){
        super(className);
        this.node.addEventListener('click', function(e){
            if(operatorQueue.length > 0){
                Memory.operandQueueUpdate();
                if(operandQueue.length < 2){
                    operandQueue.push(operandQueue[0]);
                    Memory.expNumUpdate(operandQueue[0]);
                }
                Display.expShow(expression);
                Calculator.calculate();
            }
        })
    } 
}

class ClearButton extends Component {
    constructor(className){
        super(className);
        this.node.addEventListener('click', function(e){
            Memory.clear();
        })
    } 
}

class TimeButton extends Component {
    constructor(className){
        super(className);
        this.node.addEventListener('click', function(e){
            if(timeExist){
                Memory.clear();
            }else{
                Memory.clear();
                let setTime = function(){
                    let date = new Date();
                    Display.show(date.toLocaleString());
                };
                setTime();
                timeUpdate = setInterval(setTime, 1000);
                timeExist = true;
            }
        })
            
    } 
}

const zero = new NumberButton("zero");
const one = new NumberButton("one");
const two = new NumberButton("two");
const three = new NumberButton("three");
const four = new NumberButton("four");
const five = new NumberButton("five");
const six = new NumberButton("six");
const seven = new NumberButton("seven");
const eight = new NumberButton("eight");
const nine = new NumberButton("nine");
const dot = new NumberButton("dot");

const add = new OperatorButton("add");
const subtract = new OperatorButton("subtract");
const multiply = new OperatorButton("multiply");
const divide = new OperatorButton("divide");

const equal = new EqualButton("equal");
const clear = new ClearButton("clear");
const time = new TimeButton("time");

Memory.clear();
}
    
