export default class Group { 
	constructor(name, description) {
		this.name = name
		this.description = description
		this.creationDate = new Date()
		this.components = []
	}

	addComponent(component) { 
		this.components.push(component)
		component.groups.push(this)
	}
}