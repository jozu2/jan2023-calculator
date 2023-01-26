class Calculator {
  constructor(previousNumberText, currentNumberText){
      this.previousNumberText = previousNumberText
      this.currentNumberText = currentNumberText
      this.clear()
  }

  clear(){
    this.currentText = ''
    this.previousText = ''
    this.operator = undefined
  }

  numberAppend(number){
  if(number === '.' && this.currentText.includes('.')) return 
    this.currentText = this.currentText.toString() + number.toString()
  }



  chooseOperator(operator){
    if(this.currentText === '') return
    if(this.previousText !== ''){
      this.compute()
    }
   this.previousText = this.currentText
   this.currentText = ''
   this.operator = operator


  }



  compute(){
    let computation
    const prev = parseFloat(this.previousText)
    const curr = parseFloat(this.currentText)
    
    if(isNaN(prev) || isNaN(curr)) return

    switch(this.operator){

      case '+': 
      computation = prev + curr
      break

      case 'x': 
      computation = prev * curr
      break

      case '-': 
      computation = prev - curr
      break

      case '/': 
      computation = prev / curr
      break

      default:
      return


    }

    this.currentText = computation
    this.previousText = ''
    this.operator = undefined


  }

  delete(){
    this.currentText = this.currentText.toString().slice(0, -1)
  }


    changetoFloatDisplayNo(number){
      const stringNumber = number.toString()
      const integerDigits = parseFloat(stringNumber.split('.')[0])
      const decimalDigits = stringNumber.split('.')[1]
      let integerDisplay
      if(isNaN(integerDigits)){
        integerDisplay = ''
      }else {
        integerDisplay = integerDigits.toLocaleString('en', {maximumFractionDigits: 0})
      }

      if(decimalDigits != null){
        return `${integerDisplay}.${decimalDigits}`
      }else{
        return integerDisplay
      }
    }



  updateDisplay(){
    this.currentNumberText.innerText = this.changetoFloatDisplayNo(this.currentText)
    if(this.previousText !== ''){
      this.previousNumberText.innerText = `${ this.changetoFloatDisplayNo(this.previousText)} ${this.operator}`
    }else{
      this.previousNumberText.innerText = ''
    }
  
  }



}


const previousNumberText = document.querySelector("[calc-prev]")
const currentNumberText = document.querySelector("[calc-Curr]")

const acButton = document.querySelector('[calc-ac]')
const deleteButton = document.querySelector('[calc-delete]')
const equalsButton = document.querySelector('[calc-equals]')

const operatorButton = document.querySelectorAll('[calc-operator]')
const numberButton = document.querySelectorAll('[calc-number]')

const calculator = new Calculator(previousNumberText, currentNumberText)



numberButton.forEach(button => {
  button.addEventListener('click', () => {
    calculator.numberAppend(button.innerText)
    calculator.updateDisplay()
  })
})

acButton.addEventListener('click', () => {
  calculator.clear()
  calculator.updateDisplay()
})


operatorButton.forEach(button => {
  button.addEventListener('click', () => {
    calculator.chooseOperator(button.innerText)
    calculator.updateDisplay()
  })
})


equalsButton.addEventListener('click', () => {
  calculator.compute()
  calculator.updateDisplay()
})



deleteButton.addEventListener('click', () =>{
  calculator.delete()
  calculator.updateDisplay()
})