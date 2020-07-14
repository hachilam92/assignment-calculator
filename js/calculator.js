window.onload=function(){

    var display = document.querySelector('.display');
    var clearBtn = document.querySelector('.clear');
    var equalBtn = document.querySelector('.equal');
    var timeBtn = document.querySelector('.time');
    var numberList = Array.from(document.querySelectorAll('.number'));
    var operatorList = Array.from(document.querySelectorAll('.operator'));
    var valueQueue = [];
    var operatorQueue = [];
    var input = '';
    var emptyInput = true;
    var timeUpdate;

    clear();

    function clear() {
        display.innerHTML = '0';
        valueQueue = [];
        operatorQueue = [];
        input = '';
        emptyInput = true;
        dropTime();
    }


    function inputUpdate(numberButton) {
        var addedValue = numberButton.textContent;
        input += addedValue;
        if(emptyInput){emptyInput = !emptyInput;}
        display.innerHTML = input;
        console.log(input);       // for test
    }

    function calculation(){
        var result = 0;
        if((valueQueue.length >1)&&(operatorQueue.length >0)){
            var operand1 = valueQueue[0];
            var operand2 = valueQueue[1];
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
            valueQueue = [result];
        }else{
            valueQueue = [];
        }
        display.innerHTML = `${result}`;
        operatorQueue = [];
    }

    function operatorQueueUpdate(operatorButton){
        var operator = operatorButton.textContent;
        operatorQueue.push(operator);
        if(operatorQueue.length >1){
            clear();
        }
        console.log(operatorQueue);  // for test
    } 

    function valueQueueUpdate() {
        var operand = parseFloat(input);
        valueQueue.push(operand);
        input = '';
        emptyInput = true;
        console.log(valueQueue); // for test
    }

    function setTime() {
        var date = new Date();
        display.innerHTML = date.toLocaleString();
    }

    function dropTime() {
        clearInterval(timeUpdate);
    }

    clearBtn.addEventListener(
        'click', function(e) {
            clear();
        }
    );

    equalBtn.addEventListener(
        'click', function(e){
            valueQueueUpdate();
            calculation();
        }
    );

    timeBtn.addEventListener(
        'click', function(e){
            clear();
            setTime();
            timeUpdate = setInterval(setTime, 1000);
        }
    );

    numberList.forEach((button)=>{button.addEventListener('click', function(e) {
        dropTime();
        inputUpdate(e.target);
    })});

    operatorList.forEach((button) => { button.addEventListener('click', function(e){
        if(!emptyInput){
            valueQueueUpdate();
        }
        if((valueQueue.length >1)&&(operatorQueue.length >0)){
            console.log('calculate');    // for test
            calculation();
        }
        operatorQueueUpdate(e.target); 
    })});

}
