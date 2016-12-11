var currentValue = '';
var previousValue = '';
var clickValueCount = 0;
var operator = '';
var decimole = false;

$(document).ready(function(){
    init();
});

function init(){
    enable();
} //end init()

function enable(){
  $('#enterButton').on('click', getData);
  $('#clearButton').on('click', clearAll);

  $('.value').on('click', valueClicked );
  $('.operator').on('click', operatorClicked );
  $('.change').on('click', changeButtonClicked );

} // end enable()

function valueClicked(){
  var text = $(this).text()
  console.log('Value Button Clicked: ',text);

  if(clickValueCount > 6){return;}


  switch (text) {
    case '.':
      if( currentValue === '' ){
        currentValue += '0';
        decimole = true;
        clickValueCount++;
      } else if (!decimole) {
        decimole = true;
      } else {
        return;
      } // end nested if else
      break;
    case '' :
    case '0':
      text = "0";
      if (currentValue === ''){console.log('returning');return;}
      break;
    default:
  } // end switch
  //
  // }
  // if (text === '.'){
  //   if( currentValue === '' ){
  //     currentValue += '0'
  //     decimole = true;
  //     clickValueCount++;
  //   } else if (!decimole) {
  //     decimole = true
  //   } else {
  //     return;
  //   } // end nested if else
  // } else if (text === '' || text === "0"){
  //    text = "0";
  //    if (currentValue === ''){console.log('returning');return;}// end nested if
  //
  // }//end if else

  clickValueCount++;
  currentValue += text;
  $('#answer').text(currentValue);
} // end valueClicked()

function operatorClicked(){
  $('.clickedOperator').removeClass('clickedOperator');
  $(this).addClass('clickedOperator');
  var text = $(this).text()
  console.log('Operator Button Clicked: ',text);

  switch (text) {
    case '+':
      operator = 'add'
      break;
    case '-':
      operator = 'subtract'
      break;
    case 'x':
      operator = 'multiply'
      break;
    case '/':
      operator = 'divide'
      break;
    } // end switch

    previousValue = currentValue;
    currentValue = '';
    decimole = false;
    console.log('currentValue', currentValue);
    clickValueCount = 0;

} // end operatorClicked()

function changeButtonClicked(){
  var text = $(this).text()
  console.log('Change Button Clicked: ',text);

  switch (text) {
    case '=':
      $('.clickedOperator').removeClass('clickedOperator');
      calculateThis();
      break;
    case 'c':
      clearAll()
      break;
    default:
  }// end switch
} // end changeButtonClicked()

function getData (){
  console.log('in getData');
  var calc = { x: $('#calcInputX').val() ,
               y: $('#calcInputY').val() ,
               type: $('#operationInput').val() };
  console.log('calc: ', calc);
  $('input').val('');
  calculateThis(calc);
} // end getData()

function calculateThis(){
  address = "/" + operator;

  newObject = {
          x: previousValue,
          y: currentValue
          };
  console.log('about to math:', newObject, address);
  $.ajax({
    url: address,
    type: 'POST',
    data: newObject,
    success: function(response){
      console.log('ajax received: ', response);
      displayAnswer(response.answer);
    }
  }); // end ajax

} // end calculateThis


function calculate (object){
  $.ajax({
    url: '/calc',
    type: 'POST',
    data: object,
    success: function(response){
      console.log('ajax received: ', response);
      displayAnswer(response.answer);
    }
  }); // end ajax
} // end calculate()

function displayAnswer(answer){
  console.log('answer to be outputed: ',answer);
  $('#answerOutput').text("Answer=  " + answer);
  $('#answer').text(answer)
} // end answer()

function clearAll() {
  $('.clickedOperator').removeClass('clickedOperator');
  currentValue = '';
  previousValue = '';
  clickValueCount = 0;
  operator = '';
  $('input').val('');
  $('#operationInput').val('add');
  $('#answerOutput').text("Answer=  ");
  $('#answer').text('0');
} // clearAll()
