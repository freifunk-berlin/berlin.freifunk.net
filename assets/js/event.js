import { rrulestr } from 'rrule'

const rruleElement = document.querySelector('#rrule')
const rruleObject = rrulestr(rruleElement.dataset.rrule)
rruleElement.innerHTML = rruleObject.toText()
