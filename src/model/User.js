class User {
	constructor(name, surname, mailAddress) { 

		this.name = name
		this.surname = surname
		this.mailAddress = mailAddress

		this.creationDate = new Date()
		this.groups = []
		this.calendar = new Calendario()
	}

	addToGroup(group) { 
		this.groups.push(group)
		group.components.push(this)
	}

}