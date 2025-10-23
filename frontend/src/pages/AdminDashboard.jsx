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
      {/* Left Sidebar */}
      <aside className="rounded-2xl border border-gray-200 bg-white shadow-sm p-3 md:p-4 h-full md:self-stretch">
        <div className="text-sm font-semibold text-gray-700 mb-3">Admin Panel</div>
        <nav className="space-y-1 text-sm">
          <a href="#" className="flex items-center gap-2 px-3 py-2 rounded-lg bg-blue-50 text-blue-700">
            <SidebarOverviewIcon className="w-4 h-4" />
            Overview
          </a>
          <a href="/complaints" className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-50 text-gray-700">
            <SidebarManageIcon className="w-4 h-4" />
            Manage Complaints
          </a>
          <a href="#" className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-50 text-gray-700">
            <SidebarUsersIcon className="w-4 h-4" />
            Users
          </a>
          <a href="#" className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-50 text-gray-700">
            <SidebarReportIcon className="w-4 h-4" />
            Reports
          </a>
        </nav>
      </aside>

      {/* Main content */}
      <div>
        <h2 className="text-3xl font-display mb-6">System Overview</h2>
        {loading && <p>Loading...</p>}
        {error && <p className="text-red-600">{error}</p>}
        {!loading && !error && (
          <>
            <div className="grid grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
              <AdminStat icon={<DotsIcon/>} value={metrics.total} label="Total Complaints" />
              <AdminStat icon={<PeopleIcon/>} value={metrics.inReview} label="Pending Review" />
              <AdminStat icon={<BarIcon/>} value={metrics.users} label="Active Users" />
              <AdminStat icon={<CheckIcon/>} value={metrics.resolvedToday} label="Resolved Today" />
            </div>
            <div className="rounded-2xl border border-gray-200 bg-white shadow-sm p-6 min-h-[260px] flex flex-col justify-between">
              <h3 className="font-medium mb-2">Community Impact</h3>
              <p className="text-base text-gray-600 leading-relaxed">Thanks to citizen reports and community engagement, we&apos;re improving city cleanliness every day.</p>
              <div className="mt-8">
                <a href="/complaints" className="btn btn-ghost px-5 py-2 text-base">View All Complaints</a>
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
  const formatted = typeof value === 'number' ? value.toLocaleString() : value
  return (
    <div className="rounded-2xl ring-1 ring-gray-100 bg-white shadow-sm p-8 min-h-[220px] flex flex-col items-center justify-center text-center bg-[radial-gradient(ellipse_at_top,rgba(59,130,246,0.06),transparent_60%)]">
      <div className="w-16 h-16 rounded-full bg-white border border-gray-200 shadow-sm text-gray-600 flex items-center justify-center mb-3">
        {icon}
      </div>
      <div className="text-4xl font-semibold leading-tight">{formatted}</div>
      <div className="text-base text-gray-500 mt-1">{label}</div>
    </div>
  )
}

function DotsIcon({ className = 'w-5 h-5' }) { return (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className={className} strokeWidth="1.8" strokeLinecap="round"><circle cx="5" cy="12" r="1.5" /><circle cx="12" cy="12" r="1.5" /><circle cx="19" cy="12" r="1.5" /></svg>) }
function PeopleIcon({ className = 'w-5 h-5' }) { return (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className={className} strokeWidth="1.8" strokeLinecap="round"><path d="M16 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="3" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>) }
function BarIcon({ className = 'w-5 h-5' }) { return (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className={className} strokeWidth="1.8" strokeLinecap="round"><path d="M3 3v18h18" /><rect x="7" y="10" width="3" height="7" /><rect x="12" y="6" width="3" height="11" /><rect x="17" y="13" width="3" height="4" /></svg>) }
function CheckIcon({ className = 'w-5 h-5' }) { return (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className={className} strokeWidth="1.8" strokeLinecap="round"><path d="M20 6L9 17l-5-5" /></svg>) }

// Sidebar icons
function SidebarOverviewIcon({ className = 'w-4 h-4' }) { return (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className={className} strokeWidth="1.8" strokeLinecap="round"><path d="M3 4h18" /><rect x="3" y="7" width="18" height="6" rx="1" /><path d="M7 18h10" /></svg>) }
function SidebarManageIcon({ className = 'w-4 h-4' }) { return (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className={className} strokeWidth="1.8" strokeLinecap="round"><path d="M3 7h18" /><path d="M3 12h18" /><path d="M3 17h18" /></svg>) }
function SidebarUsersIcon({ className = 'w-4 h-4' }) { return (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className={className} strokeWidth="1.8" strokeLinecap="round"><path d="M16 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="3" /></svg>) }
function SidebarReportIcon({ className = 'w-4 h-4' }) { return (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className={className} strokeWidth="1.8" strokeLinecap="round"><rect x="4" y="3" width="16" height="18" rx="2" /><path d="M8 7h8M8 11h8M8 15h5" /></svg>) }
