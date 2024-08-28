import { datetime, RRule, RRuleSet, rrulestr } from 'rrule'

const rrule_element = document.querySelector("#rrule");
const rrule_object = rrulestr(rrule_element.dataset.rrule)
rrule_element.innerHTML = rrule_object.toText()
