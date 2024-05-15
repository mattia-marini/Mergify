import Event from "./Event"

// Gestisce collezione di eventi in modo efficace
class Calendario {

  // Ogni entrata del dizionario corrisponde ad un diverso calendario
  events = {
    // Eventi disegnati a mano nella sezione myCal
    addedManually: [
      new Event(2023, 11, 1, 0, 0, 1, 0, "Evento 1"),
      new Event(2023, 11, 1, 2, 0, 3, 0, "Evento 1"),
      new Event(2023, 11, 1, 4, 0, 7, 0, "Evento 1"),
      new Event(2023, 11, 1, 9, 0, 10, 0, "Riunione"),
      new Event(2023, 11, 2, 4, 0, 5, 0, "Compleanno"),
      new Event(2023, 11, 5, 8, 0, 10, 0, "Boh"),
      new Event(2023, 11, 6, 5, 0, 10, 0, "2"),
      new Event(2023, 11, 7, 2, 30, 8, 30, "desc"),
    ],
    prova1: [],
    prova2: [],
    prova3: [],
    prova4: [],
    prova5: [],
    prova6: [],
    prova7: []
  };


  // Aggiunge un evento al calendario specificato, oppure al calendario degli eventi disegnati a mano se non viene specificato nulla
  addEvent(event, calendar) {
    if (arguments.length == 1) {
      if (!this.events.addedManually)
        this.events.addedManually = []
      this.events.addedManually.push(event)
    }
    else
      this.events[calendar].push(event)
  }

  // Aggiunge gli eventi nel vettore "events" al calendario "calendar". Se calendar non è presente ne viene creato uno nuovo
  addCalendar(calendar, events) {

    if (this.events[calendar] != null) {
      const d = {}
      events.forEach(e => {
        d[e] = true
      })
      this.events[calendar].forEach(e => {
        if (!d[e])
          d[e] = true
      })

      const mergedValues = []
      Object.entries(d).forEach((key) => { mergedValues.push(key) })
      this.events[calendar] = mergedValues
    }

    this.events[calendar] = events
  }

  // Rimuove un calendario dalla collezione specificata, se presente
  removeCalendar(name) {
    if (this.events[name]) {
      delete this.events[name]
    }
  }

}

export default Calendario;
