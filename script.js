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
    eventResizableFromStart: true, // Allow resizing from the start date of events
    eventResizableFromEnd: true,
    eventDrop: function(info) {
      alert('Event dropped to: ' + info.event.startStr);
    },
    eventResize: function(info) {
      alert('Event resized to: ' + info.event.startStr + ' - ' + info.event.endStr);
    },
    initialView: 'dayGridMonth',
    initialDate: '2024-03-07',
    headerToolbar: {
      start: 'dayGridMonth,timeGridWeek,timeGridDay today',
      center: 'title',
      end: 'custom1 prevYear,prev,next,nextYear'
    },
    events: [
      {
        title: 'All Day Event',
        start: '2024-03-01'
      },
      {
        title: 'Long Event',
        start: '2024-03-07',
        end: '2024-03-10'
      },
      {
        groupId: '999',
        title: 'Repeating Event',
        start: '2024-03-09T16:00:00'
      },
      {
        groupId: '999',
        title: 'Repeating Event',
        start: '2024-03-16T16:00:00'
      },
      {
        title: 'Conference',
        start: '2024-03-11',
        end: '2024-03-13'
      },
      {
        title: 'Meeting',
        start: '2024-03-12T10:30:00',
        end: '2024-03-12T12:30:00'
      },
      {
        title: 'Lunch',
        start: '2024-03-12T12:00:00'
      },
      {
        title: 'Meeting',
        start: '2024-03-12T14:30:00'
      },
      {
        title: 'Birthday Party',
        start: '2024-03-13T07:00:00'
      },
      {
        title: 'Click for Google',
        url: 'https://google.com/',
        start: '2024-03-28'
      }
    ]
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
    var startDate = document.getElementById('startDate').value;
    var startTime = document.getElementById('startTime').value;
    var endDate = document.getElementById('endDate').value;
    var endTime = document.getElementById('endTime').value;

    // Construct start and end date-time strings
    var startDatetime = new Date(startDate + 'T' + startTime);
    var endDatetime = new Date(endDate + 'T' + endTime);

    // Create event object
    var eventData = {
      title: title,
      start: startDatetime,
      end: endDatetime,
      description: description
    };

    // Add event to the calendar
    calendar.addEvent(eventData);

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
