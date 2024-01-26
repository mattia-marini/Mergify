import Calendario from "./Calendario"
import Group from "./Group"

export default class User {
	constructor(name, surname, mailAddress) {

		this.name = name
		this.surname = surname
		this.mailAddress = mailAddress

		this.creationDate = new Date()
		this.groups = [ ]
		this.calendar = new Calendario()
	}

	deleteGroup(group) {
		group.components.forEach(user => {
			let index = user.groups.indexOf(group);

			if (index !== -1) {
				console.log("Rimuovo" + user)
				user.groups.splice(index, 1);
			}
		});
	}

	addToGroup(group) {
		this.groups.push(group)
		group.components.push(this)
	}

	createGroup(name, description) {
		this.addToGroup(new Group(name, description))
	}

}