import { Types } from 'mongoose'
import ErrorHandler from '../ErrorHandler/ErrorHandler'
import IManager from '../Interfaces/IManager'
import Manager from '../Models/Manager.model'

class ManagerRepo {
	public async create(data: IManager.create) {
		const manager = await Manager.create({ name: data.name, email: data.email })
		return manager
	}
	public async update(id: Types.ObjectId, data: IManager.update) {
		var manager = await Manager.findById(id)
		if (!manager) {
			throw new ErrorHandler(404, 'Manager not found')
		}
		if (data.email) {
			manager.email = data.email
		}
		if (data.name) {
			manager.name = data.name
		}
		manager = await Manager.findByIdAndUpdate(id, manager, { new: true })
		return manager
	}
	public async delete(data: Types.ObjectId) {
		const manager = await Manager.findByIdAndDelete(data)
		return manager
	}
	public async query(data: string | Types.ObjectId) {
		const manager = await Manager.findById(data)
		return manager
	}
}

export default new ManagerRepo()
