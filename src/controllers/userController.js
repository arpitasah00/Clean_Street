import User from '../models/User.js'

export async function me(req, res) {
  const user = await User.findById(req.user.id).select('-password')
  res.json(user)
}

export async function updateMe(req, res) {
  const { name, location, profile_photo, phone, bio } = req.body
  const updated = await User.findByIdAndUpdate(
    req.user.id,
    { $set: { name, location, profile_photo, phone, bio } },
    { new: true }
  ).select('-password')
  res.json(updated)
}