$(document).ready(function() {
  var test = false;
  var saveIcon = "./images/save-regular.svg"; 
  var now = moment().format('MMMM Do YYYY'); // get times from moment
  var nowHour24 = moment().format('H');
  var nowHour12 = moment().format('h');

  // set times for tesitng after hours
  if (test) {
    nowHour24 = 13;
    nowHour12 = 1;
  }

  var $dateHeading = $('#navbar-subtitle');
  $dateHeading.text(now);

  var storedPlans = JSON.parse(localStorage.getItem("storedPlans"));   // Get stored todos from localStorage

  if (test) { console.log(storedPlans); }

  // retrieve from localStorage, update to it
  if (storedPlans !== null) {
    planTextArr = storedPlans;
  } else {
    planTextArr = new Array(9);
    planTextArr[4] = "Picnic lunch outside";
  }

  if (test) { console.log("full array of plned text",planTextArr); }

  // clear existing elements
  var $plannerDiv = $('#plannerContainer');
  $plannerDiv.empty();

  if (test) { console.log("current time",nowHour12); }

  // build calendar by row for fix set of hours
  for (var hour = 9; hour <= 17; hour++) {
    var index = hour - 9;

    // build row components
    var $rowDiv = $('<div>');
    $rowDiv.addClass('row');
    $rowDiv.addClass('plannerRow');
    $rowDiv.attr('hour-index',hour);
  
    // Start building Time box portion of row
    var $colTimeDiv = $('<div>');
    $colTimeDiv.addClass('col-md-2');
  
    // create timeBox element (contains time)
    const $timeBoxSpn = $('<span>');
    $timeBoxSpn.attr('class','timeBox');
    
    // format hours for display
    var displayHour = 0;
    var ampm = "";
    if (hour > 12) { 
      displayHour = hour - 12;
      ampm = "pm";
    } else {
      displayHour = hour;
      ampm = "am";
    }
    
    // populate timeBox with time
    $timeBoxSpn.text(`${displayHour} ${ampm}`);

    // insert into col inset into timebox
    $rowDiv.append($colTimeDiv);
    $colTimeDiv.append($timeBoxSpn);

    // build row components
    var $dailyPlanSpn = $('<input>');
    $dailyPlanSpn.attr('id',`input-${index}`);
    $dailyPlanSpn.attr('hour-index',index);
    $dailyPlanSpn.attr('type','text');
    $dailyPlanSpn.attr('class','dailyPlan');

    $dailyPlanSpn.val( planTextArr[index] );
    
    // create col to control width
    var $colIptDiv = $('<div>');
    $colIptDiv.addClass('col-md-9');
    $rowDiv.append($colIptDiv);
    $colIptDiv.append($dailyPlanSpn);

    // START building save portion of row
    var $colSaveDiv = $('<div>');
    $colSaveDiv.addClass('col-md-1');
    var $saveBtn = $('<i>');
    $saveBtn.attr('id',`saveid-${index}`);
    $saveBtn.attr('save-id',index);
    $saveBtn.attr('class',"far fa-save saveIcon");
    $rowDiv.append($colSaveDiv);
    $colSaveDiv.append($saveBtn);
    updateRowColor($rowDiv, hour);
    $plannerDiv.append($rowDiv);
  };

  // function to update row color
  function updateRowColor ($hourRow,hour) { 
    if (test) { console.log("rowColor ",nowHour24, hour); }

    if ( hour < nowHour24) {
      if (test) { console.log("lessThan"); }
      $hourRow.css("background-color","lightgrey")
    } else if ( hour > nowHour24) {
      if (test) { console.log("greaterthan"); }
      $hourRow.css("background-color","lightgreen")
    } else {
      if (test) { console.log("eqaul"); }
      $hourRow.css("background-color","tomato")
    }
  };

  // saves to local storage
  $(document).on('click','i', function(event) {
    event.preventDefault();  
    if (test) { console.log('click pta before '+ planTextArr); }
    var $index = $(this).attr('save-id');
    var inputId = '#input-'+$index;
    var $value = $(inputId).val();
    planTextArr[$index] = $value;
    if (test) { console.log('value ', $value); }
    if (test) { console.log('index ', $index); }
    if (test) { console.log('click pta after '+ planTextArr); }
    // remove shawdow pulse class
    $(`#saveid-${$index}`).removeClass('shadowPulse');
    localStorage.setItem("storedPlans", JSON.stringify(planTextArr));
  });  
  
  // function to color save button on change of input
  $(document).on('change','input', function(event) {
    event.preventDefault();  
    if (test) { console.log('onChange'); }
    if (test) { console.log('id', $(this).attr('hour-index')); }
    var i = $(this).attr('hour-index');
    // add shawdow pulse class
    $(`#saveid-${i}`).addClass('shadowPulse');
  });
});