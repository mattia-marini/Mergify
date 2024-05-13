import { differenceInDays } from "../utils/Date"
class Event {


  // Si assume che una evento non sia a cavallo di una giornata
  // Possono venire indicati 7 interi, riepttivamente year, month, day, startH, startM, endH, endM e la data verrà costruita di conseguenza
  // In alternativa, indicare due date e una descrizione: 
  //
  // new Event(2024, 03, 17, 13, 30, 15, 50, "Descrizione evento")
  // new Event(new Date("2024-03-17T13:30:00.000Z"), new Date("2024-03-17T15:50:00.000Z"), "Descrizione evento")
  constructor(year, month, day, startH, startM, endH, endM, description = "Unknown") {
    if (arguments.length >= 7) {
      this.startDate = new Date(year, month, day, startH, startM, 0, 0)
      this.endDate = new Date(year, month, day, endH, endM, 0, 0)
      this.description = description
    }
    else {
      this.startDate = new Date(year)
      this.endDate = new Date(month)
      this.description = day
    }
  }

  // true se due eventi incominciano e finiscono nello stesso momento
  equals(e2) {
    return this.endDate.getTime() == e2.endDate.getTime() && this.startDate.getTime() == e2.startDate.getTime()
  }

}

// Dato in input un evento, lo "spezza", ritornando un vettore di eventi tali per cui: 
//
// 1 ogni evento non risulta a cavallo di alcuna giornata
// 2 l'unione degli eventi ricopre l'intervallo temporale dell'evento dato in input
//
// quindi di fatto l'evento originale viene spezzato "ad ogni mezzanotte"
export const splitEvent = (event) => {

  const events = []

  const tmpStart = new Date(event.startDate)
  for (let i = 0; i < differenceInDays(event.startDate, event.endDate); i++) {

    const endDate = new Date(tmpStart)
    endDate.setHours(23)
    endDate.setMinutes(59)

    const splittedEvent = new Event(tmpStart, endDate, event.description)
    events.push(splittedEvent)

    tmpStart.setDate(tmpStart.getDate() + 1)
    tmpStart.setHours(0)
    tmpStart.setMinutes(0)
  }

  events.push(new Event(tmpStart, event.endDate, event.description))

  return events
}

export default Event;
