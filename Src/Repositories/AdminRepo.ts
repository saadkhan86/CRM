import bcrypt from 'bcrypt'
import { Types } from 'mongoose'
import ErrorHandler from '../ErrorHandler/ErrorHandler'
import AdminInterface from '../Interfaces/IAdmin'
import signToken from '../Middlewares/Token'
import Admin from '../Models/Admin.model'

class AdminRepo {
	public async create(data: AdminInterface.create) {
		let { name, email, password } = data
		let user: any = {}
		if (!name || !email || !password) {
			throw new ErrorHandler(400, 'please fill required fields')
		}
		const check = await Admin.findOne({ email })
		if (check) {
			throw new ErrorHandler(409, 'Admin already exists Login please')
		}
		password = await bcrypt.hashSync(password, 5)
		const db = await Admin.create({ name, email, password })
		user = {
			token: await signToken(db._id,db.role),
			_id: db._id,
			name: db.name,
			email: db.email,
		}
		return user
	}
	public async login(data: AdminInterface.login) {
		let user: any = {}
		const db = await Admin.findOne({ email: data.email }).select('+password')
		if (!db) {
			throw new ErrorHandler(404, 'Admin not found with this email')
		}
		const matchPass = bcrypt.compareSync(data.password, db.password)
		if (!matchPass) {
			throw new ErrorHandler(401, 'Either wrong email or password')
		}
		user = {
			token: await signToken(db._id,db.role),
			_id: db._id,
			name: db.name,
			email: db.email,
		}
		return user
	}

	public async update(
		id: Types.ObjectId | string,
		data: AdminInterface.update
	) {
		var admin = await Admin.findById(id)
		if (!admin) {
			throw new ErrorHandler(400, 'Admin not found')
		}
		admin = await Admin.findByIdAndUpdate(id, data, { new: true })
		if (!admin) {
			throw new ErrorHandler(500, 'something went wrong while updating Admin')
		}
		const user = {
			token: signToken(admin._id,admin.role),
			_id: admin._id,
			name: admin.name,
			email: admin.email,
		}
		return user
	}
}
export default new AdminRepo()
