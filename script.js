document.addEventListener('DOMContentLoaded', function() {
  var calendarEl = document.getElementById('calendar');

  var calendar = new FullCalendar.Calendar(calendarEl, {
    selectable: true,
    headerToolbar: {
      start: 'dayGridMonth,timeGridWeek,timeGridDay custom1',
      center: 'title',
      end: 'custom2 prevYear,prev,next,nextYear'
    },
    footerToolbar: {
      start: 'custom1,custom2',
      center: '',
      end: 'prev,next'
    },
    customButtons: {
      custom1: {
        text: 'Add Event',
        click: function() {
          var modal = document.getElementById('eventModal');
          modal.style.display = 'block';
        }
      },
      custom2: {
        text: 'custom 2',
        click: function() {
          alert('clicked custom button 2!');
        }
      }
    },
    dateClick: function(info) {
      alert('Clicked on: ' + info.dateStr);
    },
    eventClick: function(info) {
      alert('Event: ' + info.event.title);
    },
    editable: true,
    droppable: true,
    eventDrop: function(info) {
      alert('Event dropped to: ' + info.event.startStr);
    }
  });

  calendar.render();

  // Close modal functionality
  var closeSpan = document.getElementsByClassName('close')[0];
  closeSpan.addEventListener('click', function() {
    var modal = document.getElementById('eventModal');
    modal.style.display = 'none';
  });

  // Handle form submission for adding event
  var eventForm = document.getElementById('eventForm');
  eventForm.addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent default form submission
    var title = document.getElementById('title').value;
    var description = document.getElementById('description').value;
    var date = document.getElementById('date').value;
    var time = document.getElementById('time').value;

    // Construct start datetime
    var startDatetime = new Date(date + 'T' + time);

    // Send POST request to backend to add event
    fetch('/api/events', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title: title,
        description: description,
        start: startDatetime
      })
    })
    .then(response => response.json())
    .then(data => {
      console.log('Event added:', data);
      // Add the event to the calendar
      calendar.addEvent(data);
    })
    .catch(error => {
      console.error('Error adding event:', error);
      // Handle error
    });

    // Close the modal
    var modal = document.getElementById('eventModal');
    modal.style.display = 'none';

    // Clear form fields
    eventForm.reset();
  });

  // Initialize Google Calendar plugin
  var googleCalendarPlugin = FullCalendarPlugins.googleCalendar;
  var googleCalendar = new Calendar(calendarEl, {
    plugins: [ googleCalendarPlugin ],
    googleCalendarApiKey: '<AIzaSyAblL5esYpFjTZWxg65nd9NSa5j1tOSZNY>',
    events: {
      googleCalendarId: '<4cb43cbfaecaba22fb709ee8bad64ba7ea6f2c43775616736c224d61b3ec7ba4@group.calendar.google.com>'
    }
  });

  // Fetch events from backend and update calendar
  fetch('/api/events')
    .then(response => response.json())
    .then(events => {
      events.forEach(event => {
        calendar.addEvent(event);
      });
    })
    .catch(error => {
      console.error('Error fetching events:', error);
      // Handle error
    });
});


