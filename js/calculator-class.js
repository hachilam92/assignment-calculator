class Calculator {

    static operatorQueueUpdate(notation){
        var operator = notation;
        operatorQueue.push(operator);
        if(operatorQueue.length >1){
            clear();
        }
        console.log(this.operatorQueue);  // for test
    } 

    static operatorQueueReset(){
        this.operatorQueue = [];
    }

    static valueQueueUpdate(input) {
        var operand = parseFloat(input);
        valueQueue.push(operand);
        Display.inputReset();
        Display.emptyFlagReset();
        console.log(this.valueQueue); // for test
    }

    static valueQueueReset(){
        this.valueQueue = [];
    }

    static validExpression(){
        if((this.valueQueue.length >1)&&(this.operatorQueue.length >0)){
            return true;
        }else{
            return false;
        }
    }

    static  calculate() {
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
        Display.show(result);
        this.operatorQueueReset();
    }
}

Calculator.valueQueue = [];
Calculator.operatorQueue = [];
Calculator.clock;


class Component {
    constructor(className){
        this.node = document.querySelector(`.${className}`);
    }
}


class Display extends Component {

    static show(content){
        this.node.innerHTML = content;
    }

    static inputUpdate(notation) {
        var addedValue = notation;
        this.input += addedValue;
        if(this.emptyFlag){this.emptyFlag = !this.emptyFlag;}
        this.show(this.input);
        console.log(this.input);       // for test
    }

    static inputReset() {
        this.input = '';
    }

    static dropTime(){
        clearInterval(TimeButton.clock);
    }

    static emptyFlagReset(){
        this.emptyFlag = true;
    }

    static clear(){
        this.show(this.default);
        Calculator.valueQueueReset();
        Calculator.operatorQueueReset();
        this.inputReset();
        this.emptyFlagReset();
        this.dropTime();
    }
}

Display.default = '0';
Display.input = '';
Display.emptyFlag = true;

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
            Display.dropTime();
            Display.inputUpdate(notation);
        }
    }
}

class OperatorButton extends InputButton {
    constructor(className){
        super(className);
        this.handleClick = function(notation) {
            if(!Display.emptyFlag){
                valueQueueUpdate();
            }
            if(Calculator.validExpression()){
                console.log('calculate');    // for test
                Calculator.calculate();
            }
            operatorQueueUpdate(notation); 
        }
    }
}

class ClearButton extends FunctionButton {
    constructor(className){
        super(className);
        this.handleClick = () => Display.clear();
    }
}

class TimeButton extends FunctionButton {
    constructor(className){
        super(className);
        this.clock;
        this.handleClick = function(){
            Display.clear();
            var setTime = function(){
                var date = new Date();
                Display.show(date.toLocaleString());
            }
            this.clock = setInterval(setTime, 1000);
        }
    }
}

class EqualButton extends FunctionButton {
    constructor(className){
        super(className);
        this.handleClick = function(){
            Calculator.valueQueueUpdate();
            Calculator.calculate();
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

Display.clear();


