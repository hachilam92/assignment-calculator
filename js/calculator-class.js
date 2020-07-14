class Calculator {
    constructor(){
        this.valueQueue = [];
        this.operatorQueue = [];
        this.clock;
    }

    operatorQueueUpdate(notation){
        var operator = notation;
        operatorQueue.push(operator);
        if(operatorQueue.length >1){
            clear();
        }
        console.log(this.operatorQueue);  // for test
    } 

    operatorQueueReset(){
        this.operatorQueue = [];
    }

    valueQueueUpdate(input) {
        var operand = parseFloat(input);
        valueQueue.push(operand);
        Display.prototype.inputReset();
        Display.prototype.emptyFlagReset();
        console.log(this.valueQueue); // for test
    }

    valueQueueReset(){
        this.valueQueue = [];
    }

    validExpression(){
        if((this.valueQueue.length >1)&&(this.operatorQueue.length >0)){
            return true;
        }else{
            return false;
        }
    }

    calculate() {
        var result = 0;
        if(this.validExpression()){
            var operand1 = this.valueQueue[0];
            var operand2 = this.valueQueue[1];
            switch(this.operatorQueue[0]){
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
            this.valueQueue = [result];
        }else{
            this.valueQueueReset();
        }
        Display.prototype.show(result);
        this.operatorQueueReset();
    }
}


class Component {
    constructor(className){
        this.node = document.querySelector(`.${className}`);
    }
}


class Display extends Component {
    constructor(className){
        super(className);
        this.default = '0';
        this.input = '';
        this.emptyFlag = true;
    }

    show(content){
        this.node.innerHTML = content;
    }

    inputUpdate(notation) {
        var addedValue = notation;
        this.input += addedValue;
        if(this.emptyFlag){this.emptyFlag = !this.emptyFlag;}
        this.show(this.input);
        console.log(this.input);       // for test
    }

    inputReset() {
        this.input = '';
    }

    dropTime(){
        clearInterval(TimeButton.prototype.clock);
    }

    emptyFlagReset(){
        this.emptyFlag = true;
    }

    clear(){
        this.show(this.default);
        Calculator.prototype.valueQueueReset();
        Calculator.prototype.operatorQueueReset();
        this.inputReset();
        this.emptyFlagReset();
        this.dropTime();
    }
}


class InputButton extends Component {
    constructor(className){
        super(className);
        this.notation = this.node.textContent;
        this.node.addEventListener(
            'click', function(e) {
                this.handleClick(e.target.notation);
            }
        );
    }
}

class FunctionButton extends Component{
    constructor(className){
        super(className);
        this.node.addEventListener(
            'click', function() {
                this.handleClick();
            }
        );
    }
}

class NumberButton extends InputButton {
    constructor(className){
        super(className);
        this.handleClick = function(notation) {
            Display.prototype.dropTime();
            Display.prototype.inputUpdate(notation);
        }
    }
}

class OperatorButton extends InputButton {
    constructor(className){
        super(className);
        this.handleClick = function(notation) {
            if(!Display.prototype.emptyFlag){
                valueQueueUpdate();
            }
            if(Calculator.prototype.validExpression()){
                console.log('calculate');    // for test
                Calculator.prototype.calculate();
            }
            operatorQueueUpdate(notation); 
        }
    }
}

class ClearButton extends FunctionButton {
    constructor(className){
        super(className);
        this.handleClick = () => Display.prototype.clear();
    }
}

class TimeButton extends FunctionButton {
    constructor(className){
        super(className);
        this.clock;
        this.handleClick = function(){
            Display.prototype.clear();
            var setTime = function(){
                var date = new Date();
                Display.prototype.show(date.toLocaleString());
            }
            this.clock = setInterval(setTime, 1000);
        }
    }
}

class EqualButton extends FunctionButton (){
    constructor(className){
        super(className);
        this.handleClick = function(){
            Calculator.prototype.valueQueueUpdate();
            Calculator.prototype.calculate();
        }
    }
}

var display = new Display("display");
var clearBtn = new ClearButton("clear");
var equalBtn = new EqualButton("equal");
var timeBtn = new TimeButton("time");
var one = new NumberButton("one");
var two = new NumberButton("two");
var three = new NumberButton("three");
var four = new NumberButton("four");
var five = new NumberButton("five");
var six = new NumberButton("six");
var seven = new NumberButton("seven");
var eight = new NumberButton("eight");
var nine = new NumberButton("nine");
var add = new OperatorButton("add");
var subtract = new OperatorButton("subtract");
var multiply = new OperatorButton("multiply");
var divide = new OperatorButton("divide");

Display.prototype.clear();


