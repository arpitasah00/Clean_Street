import Complaint from '../models/Complaint.js'

export async function listMine(req, res) {
  const items = await Complaint.find({ user_id: req.user.id }).sort({ created_at: -1 })
  res.json(items)
}

export async function createComplaint(req, res) {
  const { title, description, photo, location_coords, address } = req.body
  if (!title) return res.status(400).json({ message: 'Title required' })
  const c = await Complaint.create({ user_id: req.user.id, title, description, photo, location_coords, address })
  res.status(201).json(c)
}

export async function getComplaint(req, res) {
  const c = await Complaint.findOne({ _id: req.params.id, user_id: req.user.id })
  if (!c) return res.status(404).json({ message: 'Not found' })
  res.json(c)
}

export async function updateComplaint(req, res) {
  const { title, description, photo, location_coords, address, status, assigned_to } = req.body
  const c = await Complaint.findOneAndUpdate(
    { _id: req.params.id, user_id: req.user.id },
    { $set: { title, description, photo, location_coords, address, status, assigned_to } },
    { new: true }
  )
  if (!c) return res.status(404).json({ message: 'Not found' })
  res.json(c)
}
