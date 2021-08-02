class calculator{
    constructor(prevOperandTextElement,currentOperandTextElement){
        this.prevOperandTextElement = prevOperandTextElement;
        this.currentOperandTextElement = currentOperandTextElement;
        this.clear();

    }
    clear(){
        this.previousOperand ="";
        this.currentOperand ="";
        this.operation = undefined;
    }
    // delete
    delete(){
        this.currentOperand = this.currentOperand.toString().slice(0,-1);
    }
    // append number
    appendNumber(number){
        if(number==="." && this.currentOperand. includes(".")) return;
        this.currentOperand = this.currentOperand.toString() + number.toString();
        
    }

    // choose operation
    chooseOperation(operation){

        if(this.currentOperand==="")return;
        if(this.previousOperand!==""){
            this.compute();
        }
        this.operation = operation;
        this.previousOperand =this.currentOperand;
        this.currentOperand ="";
    }

    compute(){
        let result;
        const prev = parseFloat(this.previousOperand);
        const current = parseFloat(this.currentOperand);
        if(isNaN(prev) || isNaN(current)) return;

        switch(this.operation){
            case "+":
                result = prev + current;
            break;
            
            case "-":
                result = prev - current;
            break;
            

            case "x":
                result = prev * current;
            break;
            

            case "÷":
                result = prev / current;
            break;
            

            default:
            break;
              
        }

        this.currentOperand = result;
        this.operation = undefined;
        this.previousOperand ="";

    }

    getDisplayNumber(number){
        const stringNumber = number.toString();
        const numArr = stringNumber.split(".");
        const integerDigit = parseFloat(numArr["0"]);
        const decimalDigit = numArr["1"];
        let integerDisplay;
        if(isNaN(integerDigit)){
            integerDisplay = "";
        }
        else{
            integerDisplay = integerDigit.toLocaleString("en",{
                maxiFractionDigits : 0,
            });
        }
        if(decimalDigit!= null){
            return `${integerDisplay} .${decimalDigit}`;
        }
        else{
            return integerDisplay;
        }
      
    }
        // display values
    updateDisplay(){
        this.currentOperandTextElement.innerText = this.getDisplayNumber(this.currentOperand);

        if(this.operation != null){
            this.prevOperandTextElement.innerText = `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`; 
        }
        else{
            this.prevOperandTextElement.innerText = this.getDisplayNumber(this.previousOperand);
        }
        // this.currentOperandTextElement.innerText = this.currentOperand;
        // this.prevOperandTextElement = this.previousOperand;
    }
}



const numbtns = document.querySelectorAll("[data-number]");
console.log(numbtns);
const operationbtns =document.querySelectorAll("[data-operation]");
const equalbtn = document.querySelector("[data-equals]");
const deletebtn = document.querySelector("[data-delete]");
const allclearbtn = document.querySelector("[data-all-clear]");
const prevOperandtextelement = document.querySelector("[data-prev-operand]");
const currentOperandtextelement = document.querySelector("[data-current-operand]");



document.addEventListener("DOMContentLoaded",()=>{
const calc = new calculator(prevOperandtextelement,currentOperandtextelement);

numbtns.forEach((button) => {
    console.log(button);
    button.addEventListener('click',()=>{
      calc.appendNumber(button.innerText);//calling append method in calc
      console.log(button.innerText);
      calc.updateDisplay();
    })
});

operationbtns.forEach((button)=>{
    button.addEventListener('click',()=>{
        calc.chooseOperation(button.innerText);
        calc.updateDisplay();
    })
})

equalbtn.addEventListener('click',() =>{
    calc.compute();
    calc.updateDisplay();
})

deletebtn.addEventListener('click',() =>{
    calc.delete();
    calc.updateDisplay();
})

allclearbtn.addEventListener('click',() =>{
    calc.clear();
    calc.updateDisplay();
})

});