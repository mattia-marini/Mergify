import ICAL from 'ical.js';
import MFEvent from "../model/Event"

export function parseICal(icsFile) {


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
			const events = vevents.map(vevent => {
				const startDate = vevent.getFirstPropertyValue('dtstart');
				const endDate = vevent.getFirstPropertyValue('dtend');
				const desc = vevent.getFirstPropertyValue('summary');

				console.log(desc)

				return new MFEvent(startDate.toJSDate(), endDate.toJSDate(), desc)
			});

			return events;
		};

		return null
	}
	else
		return

	// Read the content of the ics file (assuming you have it as a string)

}
