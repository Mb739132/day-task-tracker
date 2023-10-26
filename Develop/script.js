// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {
  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?

    $(".saveBtn").on("click", function () {
      // Get the id of the containing time-block
      var eventId = $(this).parent().attr("id");
      // Get the user input from the description textarea
      var eventText = $(this).siblings(".description").val();
      // Save the user input in local storage using the id as a key
      localStorage.setItem(eventId, eventText);
    });

  //
  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?

  var currentTime = dayjs().hour();

  $(".time-block").each(function () {
    var blockHour = parseInt($(this).attr("id").split("-")[1]);

    if (blockHour < currentTime) {
      $(this).addClass("past").removeClass("present future");
    } else if (blockHour === currentTime) {
      $(this).addClass("present").removeClass("past future");
    } else {
      $(this).addClass("future").removeClass("past present");
    }
  });

  //
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?

  $(".description").each(function () {
    var blockId = $(this).parent().attr("id");
    var savedEvent = localStorage.getItem(blockId);

    if (savedEvent !== null) {
      $(this).val(savedEvent);
    }
  });

  //
  // TODO: Add code to display the current date in the header of the page.
  
  $("#currentDay").text(dayjs().format('dddd, MMMM D'));
});

