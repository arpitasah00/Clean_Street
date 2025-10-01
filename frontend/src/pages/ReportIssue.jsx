import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { api } from '../api/client'

export default function ReportIssue() {
  const { token } = useAuth()
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [address, setAddress] = useState('')
  const [location_coords, setCoords] = useState('')
  const [error, setError] = useState('')
  const [ok, setOk] = useState('')

  const submit = async (e) => {
    e.preventDefault()
    setError(''); setOk('')
    try {
      await api('/complaints', { method: 'POST', token, body: { title, description, address, location_coords } })
      setOk('Reported successfully')
      setTitle(''); setDescription(''); setAddress(''); setCoords('')
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <section className="max-w-xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-display mb-4">Report Issue</h1>
      <form className="space-y-3" onSubmit={submit}>
        {error && <div className="text-red-600 text-sm">{error}</div>}
        {ok && <div className="text-green-600 text-sm">{ok}</div>}
        <div>
          <label className="block mb-1 text-sm">Title</label>
          <input className="input" value={title} onChange={e=>setTitle(e.target.value)} required />
        </div>
        <div>
          <label className="block mb-1 text-sm">Description</label>
          <textarea className="input min-h-24" value={description} onChange={e=>setDescription(e.target.value)} />
        </div>
        <div>
          <label className="block mb-1 text-sm">Address</label>
          <input className="input" value={address} onChange={e=>setAddress(e.target.value)} />
        </div>
        <div>
          <label className="block mb-1 text-sm">GPS Coords</label>
          <input className="input" value={location_coords} onChange={e=>setCoords(e.target.value)} />
        </div>
        <button className="btn btn-primary" type="submit">Submit</button>
      </form>
    </section>
  )
}
