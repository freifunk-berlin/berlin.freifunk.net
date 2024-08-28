import { Calendar } from '@fullcalendar/core'
import dayGridPlugin from '@fullcalendar/daygrid'
import iCalendarPlugin from '@fullcalendar/icalendar'

document.addEventListener('DOMContentLoaded', function () {
  const calendarEl = document.getElementById('calendar')
  const calendar = new Calendar(calendarEl, {
    plugins: [dayGridPlugin, iCalendarPlugin],
    eventSources: [
      {
        url: 'index.ics',
        format: 'ics'
      }
    ]
  })
  calendar.render()
})
