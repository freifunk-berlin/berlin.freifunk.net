---
title: "Events"
url: "events"
---

<script type='importmap'>
    {
        "imports": {
        "@fullcalendar/core": "https://cdn.skypack.dev/@fullcalendar/core@6.1.11",
        "@fullcalendar/daygrid": "https://cdn.skypack.dev/@fullcalendar/daygrid@6.1.11",
        "@fullcalendar/icalendar": "https://cdn.skypack.dev/@fullcalendar/icalendar@6.1.11"
        }
    }
</script>
<script type='module'>
    import { Calendar } from '@fullcalendar/core'
    import dayGridPlugin from '@fullcalendar/daygrid'
    import iCalendarPlugin from '@fullcalendar/icalendar'

    document.addEventListener('DOMContentLoaded', function() {
        const calendarEl = document.getElementById('calendar')
        var calendar = new Calendar(calendarEl, {
        plugins: [dayGridPlugin, iCalendarPlugin],
        events: {
            url: 'http://localhost:1313/de/events/index.ics',
            format: 'ics'
        }
        })          
        calendar.render()
    })
</script>
<div id='calendar'></div>