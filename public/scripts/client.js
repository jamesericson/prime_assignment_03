var currentValue;
var lastClicked;


$(document).ready(function(){
    init();
});

function init(){
    enable();
} //end init()

function enable(){
  $('#enterButton').on('click', getData);
  $('#clearButton').on('click', clearAll);
} // end enable()

function getData (){
  console.log('in getData');
  var calc = { x: $('#calcInputX').val() ,
               y: $('#calcInputY').val() ,
               type: $('#operationInput').val() };
  console.log('calc: ', calc);
  $('input').val('');
  calculateThis(calc);
} // end getData()

function calculateThis(object){
  address = "/" + object.type;

  newObject = {
          x: object.x,
          y: object.y
          };

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
} // end answer()

function clearAll() {
  $('input').val('');
  $('#operationInput').val('add');
  $('#answerOutput').text("Answer=  ");
} // clearAll()
