---
outputs:
- html
- calendar
title: "{{ replace .File.ContentBaseName "-" " " | title }}"
start: "{{ dateFormat "2006-01-02T15:04:05" .Date }}"
end: "{{ dateFormat "2006-01-02T15:04:05" .Date }}"
# for recurring events add rrule with https://icalendar.org/rrule-tool.html
#rrule: ""
location: "Berlin"
---

Description of the event ...