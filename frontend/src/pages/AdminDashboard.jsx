import { useEffect, useMemo, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { api } from '../api/client'

export default function AdminDashboard() {
  const { token } = useAuth()
  const [complaints, setComplaints] = useState([])
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let mounted = true
    Promise.all([
      api('/complaints', { token }),
      api('/users', { token })
    ])
      .then(([allComplaints, allUsers]) => {
        if (!mounted) return
        setComplaints(allComplaints)
        setUsers(allUsers)
      })
      .catch((e) => mounted && setError(e.message))
      .finally(() => mounted && setLoading(false))
    return () => (mounted = false)
  }, [token])

  const metrics = useMemo(() => {
    const total = complaints.length
    const pending = complaints.filter(c => c.status === 'received').length
    const inReview = complaints.filter(c => c.status === 'in_review').length
    const today = new Date()
    const resolvedToday = complaints.filter(c => c.status === 'resolved' && c.updated_at && sameDay(new Date(c.updated_at), today)).length
    return { total, pending, users: users.length, resolvedToday, inReview }
  }, [complaints, users])

  return (
    <section className="w-full max-w-7xl mx-auto px-4 md:px-6 py-6 min-h-[calc(100vh-80px)] grid grid-cols-1 md:grid-cols-[220px,1fr] gap-6">
      <aside className="rounded-2xl border border-gray-200 bg-white shadow-sm p-3 md:p-4 h-fit">
        <div className="text-sm font-semibold text-gray-700 mb-3">Admin Panel</div>
        <nav className="space-y-1 text-sm">
          <a href="#" className="block px-3 py-2 rounded-lg bg-gray-100 text-gray-900">Overview</a>
          <a href="/complaints" className="block px-3 py-2 rounded-lg hover:bg-gray-50 text-gray-700">Manage Complaints</a>
          <a href="#" className="block px-3 py-2 rounded-lg hover:bg-gray-50 text-gray-700">Users</a>
          <a href="#" className="block px-3 py-2 rounded-lg hover:bg-gray-50 text-gray-700">Reports</a>
        </nav>
      </aside>

      <div>
        <h2 className="text-xl font-display mb-4">System Overview</h2>
        {loading && <p>Loading...</p>}
        {error && <p className="text-red-600">{error}</p>}
        {!loading && !error && (
          <>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <AdminStat icon={<DotsIcon/>} value={metrics.total} label="Total Complaints" />
              <AdminStat icon={<PeopleIcon/>} value={metrics.inReview} label="Pending Review" />
              <AdminStat icon={<BarIcon/>} value={metrics.users} label="Active Users" />
              <AdminStat icon={<CheckIcon/>} value={metrics.resolvedToday} label="Resolved Today" />
            </div>
            <div className="rounded-2xl border border-gray-200 bg-white shadow-sm p-5 min-h-[240px] flex flex-col justify-between">
              <h3 className="font-medium mb-2">Community Impact</h3>
              <p className="text-sm text-gray-600 leading-relaxed">Thanks to citizen reports and community engagement, we&apos;re improving city cleanliness every day.</p>
              <div className="mt-6">
                <a href="/complaints" className="btn btn-ghost">View All Complaints</a>
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  )
}

function sameDay(a, b) {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate()
}

function AdminStat({ icon, value, label }) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white shadow-sm p-5 min-h-[160px] flex items-center">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-lg bg-gray-50 text-gray-600 flex items-center justify-center border border-gray-200">{icon}</div>
        <div>
          <div className="text-2xl font-semibold leading-tight">{value}</div>
          <div className="text-sm text-gray-500">{label}</div>
        </div>
      </div>
    </div>
  )
}

function DotsIcon({ className = 'w-5 h-5' }) { return (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className={className} strokeWidth="1.8" strokeLinecap="round"><circle cx="5" cy="12" r="1.5" /><circle cx="12" cy="12" r="1.5" /><circle cx="19" cy="12" r="1.5" /></svg>) }
function PeopleIcon({ className = 'w-5 h-5' }) { return (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className={className} strokeWidth="1.8" strokeLinecap="round"><path d="M16 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="3" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>) }
function BarIcon({ className = 'w-5 h-5' }) { return (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className={className} strokeWidth="1.8" strokeLinecap="round"><path d="M3 3v18h18" /><rect x="7" y="10" width="3" height="7" /><rect x="12" y="6" width="3" height="11" /><rect x="17" y="13" width="3" height="4" /></svg>) }
function CheckIcon({ className = 'w-5 h-5' }) { return (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className={className} strokeWidth="1.8" strokeLinecap="round"><path d="M20 6L9 17l-5-5" /></svg>) }
