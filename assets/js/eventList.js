import { Calendar } from '@fullcalendar/core'
import listPlugin from '@fullcalendar/list'
import iCalendarPlugin from '@fullcalendar/icalendar'
import deLocale from '@fullcalendar/core/locales/de'

document.addEventListener('DOMContentLoaded', function () {
  const calendarEl = document.getElementById('calendar')
  const calendar = new Calendar(calendarEl, {
    plugins: [listPlugin, iCalendarPlugin],
    initialView: 'list',
    duration: { weeks: 6 },
    headerToolbar: false,
    stickyHeaderDates: false,
    height: 'auto',
    eventSources: [
      {
        url: 'events/index.ics',
        format: 'ics'
      }
    ]
  })
  if (document.documentElement.lang === 'de') {
    calendar.setOption('locale', deLocale)
  }
  calendar.render()
})
