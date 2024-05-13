import ICAL from 'ical.js';
import MFEvent from "../model/Event"
import { splitEvent } from "../model/Event"

// Chiama la funzione "callback" con il nome del file ics e un array degli eventi contenuti nel suddetto file
export function parseICal(icsFile, callback) {

	if (icsFile) {
		const reader = new FileReader();

		reader.readAsText(icsFile);
		reader.onload = (e) => {
			const content = e.target.result;

			// Parse the ics data using ical.js
			const jcalData = ICAL.parse(content);
			const comp = new ICAL.Component(jcalData);
			const vevents = comp.getAllSubcomponents("vevent");

			// Extract events
			const events = []
			vevents.forEach(vevent => {
				const startDate = vevent.getFirstPropertyValue('dtstart');
				const endDate = vevent.getFirstPropertyValue('dtend');
				const desc = vevent.getFirstPropertyValue('summary');

				const event = new MFEvent(startDate.toJSDate(), endDate.toJSDate(), desc)
				if (event.startDate.getDate() != event.endDate.getDate())
					splitEvent(event).forEach(e => events.push(e))
				else
					events.push(event)
			});

			callback(icsFile.name, events)
		};

	}
	return null
}
