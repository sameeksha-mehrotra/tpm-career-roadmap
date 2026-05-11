import { useState, useEffect } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { INITIAL_PHASES, INITIAL_COMPANIES, INITIAL_LEETCODE, INITIAL_STORIES, INITIAL_WINS, KEY_DATES, STATUS_COLOR_MAP } from '../data/initialData'

function CountdownCard({ label, date, company, color }) {
  const [days, setDays] = useState(null)

  useEffect(() => {
    const calc = () => {
      const now = new Date()
      const target = new Date(date + 'T00:00:00')
      const diff = Math.ceil((target - now) / (1000 * 60 * 60 * 24))
      setDays(diff)
    }
    calc()
    const id = setInterval(calc, 60000)
    return () => clearInterval(id)
  }, [date])

  const colorMap = {
    emerald: 'from-emerald-500 to-emerald-600',
    blue: 'from-blue-500 to-blue-600',
    orange: 'from-orange-500 to-orange-600',
    purple: 'from-purple-500 to-purple-600',
    rose: 'from-rose-500 to-rose-600',
  }

  const gradient = colorMap[color] || 'from-indigo-500 to-indigo-600'
  const isPast = days !== null && days < 0
  const isNear = days !== null && days >= 0 && days <= 14

  return (
    <div className="card overflow-hidden">
      <div className={`h-1.5 w-full bg-gradient-to-r ${gradient}`} />
      <div className="p-4">
        <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">{company}</p>
        <p className="text-sm font-semibold text-gray-900 dark:text-gray-100 mt-0.5 leading-tight">{label}</p>
        <div className="mt-3">
          {days === null ? (
            <div className="h-8 w-20 bg-gray-100 dark:bg-gray-700 rounded animate-pulse" />
          ) : isPast ? (
            <div>
              <span className="text-2xl font-bold text-gray-400 dark:text-gray-500">—</span>
              <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">Already open</p>
            </div>
          ) : (
            <div>
              <span className={`text-3xl font-bold ${isNear ? 'text-amber-500' : 'text-gray-900 dark:text-gray-100'}`}>
                {days}
              </span>
              <span className="text-sm text-gray-500 dark:text-gray-400 ml-1">days</span>
              <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">
                {new Date(date + 'T00:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function StatCard({ value, label, color, icon }) {
  return (
    <div className="card p-5 flex items-center gap-4">
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${color}`}>
        {icon}
      </div>
      <div>
        <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{value}</p>
        <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">{label}</p>
      </div>
    </div>
  )
}

function ReminderBadge({ date }) {
  if (!date) return null
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const reminder = new Date(date + 'T00:00:00')
  const diffDays = Math.ceil((reminder - today) / (1000 * 60 * 60 * 24))

  if (diffDays < 0) return <span className="text-xs px-2 py-0.5 rounded-full bg-red-100 text-red-600 dark:bg-red-900/40 dark:text-red-400 font-medium">Overdue</span>
  if (diffDays <= 7) return <span className="text-xs px-2 py-0.5 rounded-full bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300 font-medium">{diffDays}d</span>
  return <span className="text-xs px-2 py-0.5 rounded-full bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300 font-medium">{diffDays}d</span>
}

export default function Dashboard({ navigate }) {
  const [phases] = useLocalStorage('tpm_phases', INITIAL_PHASES)
  const [companies] = useLocalStorage('tpm_companies', INITIAL_COMPANIES)
  const [leetcode] = useLocalStorage('tpm_leetcode', INITIAL_LEETCODE)
  const [stories] = useLocalStorage('tpm_stories', INITIAL_STORIES)
  const [wins] = useLocalStorage('tpm_wins', INITIAL_WINS)

  const allTasks = phases.flatMap(p => p.tasks)
  const completedTasks = allTasks.filter(t => t.completed).length
  const totalTasks = allTasks.length
  const overallPct = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0

  const totalLeetcode = leetcode.easy + leetcode.medium + leetcode.hard

  const upcomingReminders = phases
    .flatMap(p => p.tasks.map(t => ({ ...t, phaseTitle: p.title })))
    .filter(t => !t.completed && t.reminder)
    .map(t => {
      const today = new Date()
      today.setHours(0, 0, 0, 0)
      const rem = new Date(t.reminder + 'T00:00:00')
      return { ...t, diffDays: Math.ceil((rem - today) / (1000 * 60 * 60 * 24)) }
    })
    .sort((a, b) => a.diffDays - b.diffDays)
    .slice(0, 3)

  const recentWin = [...wins].sort((a, b) => new Date(b.date) - new Date(a.date))[0]

  const today = new Date()
  const greeting = today.getHours() < 12 ? 'Good morning' : today.getHours() < 17 ? 'Good afternoon' : 'Good evening'
  const dateStr = today.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })

  return (
    <div className="space-y-8">
      {/* Hero */}
      <div className="card p-6 bg-gradient-to-br from-indigo-50 to-violet-50 dark:from-indigo-900/20 dark:to-violet-900/20 border-indigo-100 dark:border-indigo-800">
        <p className="text-sm text-indigo-600 dark:text-indigo-400 font-medium">{dateStr}</p>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mt-1">{greeting}, Sameeksha 👋</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1 text-sm">UT Austin CS · Class of 2028 · Targeting Google TPM / Meta RPM / Microsoft PM — Summer 2027</p>
        <div className="mt-4">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Overall Recruiting Progress</span>
            <span className="text-sm font-bold text-indigo-600 dark:text-indigo-400">{overallPct}%</span>
          </div>
          <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-indigo-500 to-violet-500 rounded-full transition-all duration-700"
              style={{ width: `${overallPct}%` }}
            />
          </div>
          <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">{completedTasks} of {totalTasks} tasks completed</p>
        </div>
      </div>

      {/* Countdown timers */}
      <div>
        <h2 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-3">Key Dates Countdown</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {KEY_DATES.map(kd => (
            <CountdownCard key={kd.id} {...kd} />
          ))}
        </div>
      </div>

      {/* Quick stats */}
      <div>
        <h2 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-3">Quick Stats</h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          <StatCard
            value={completedTasks}
            label="Tasks Completed"
            color="bg-indigo-100 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400"
            icon={
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            }
          />
          <StatCard
            value={companies.length}
            label="Companies Tracked"
            color="bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400"
            icon={
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            }
          />
          <StatCard
            value={stories.length}
            label="STAR Stories"
            color="bg-purple-100 dark:bg-purple-900/40 text-purple-600 dark:text-purple-400"
            icon={
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            }
          />
          <StatCard
            value={totalLeetcode}
            label="LeetCode Solved"
            color="bg-orange-100 dark:bg-orange-900/40 text-orange-600 dark:text-orange-400"
            icon={
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
              </svg>
            }
          />
        </div>
      </div>

      {/* Bottom row: reminders + recent win */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Upcoming reminders */}
        <div className="card p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="section-header">Upcoming Reminders</h2>
            <button onClick={() => navigate('timeline')} className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline">View all</button>
          </div>
          {upcomingReminders.length === 0 ? (
            <div className="text-center py-6">
              <p className="text-gray-400 dark:text-gray-500 text-sm">No upcoming reminders</p>
              <button onClick={() => navigate('timeline')} className="mt-2 text-xs text-indigo-600 dark:text-indigo-400 hover:underline">Add reminders in Timeline</button>
            </div>
          ) : (
            <div className="space-y-3">
              {upcomingReminders.map(t => (
                <div key={t.id} className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                  <div className="mt-0.5">
                    <ReminderBadge date={t.reminder} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-700 dark:text-gray-200 leading-snug line-clamp-2">{t.text}</p>
                    <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">{t.phaseTitle}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Most recent win */}
        <div className="card p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="section-header">Latest Win</h2>
            <button onClick={() => navigate('wins')} className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline">View all</button>
          </div>
          {!recentWin ? (
            <div className="text-center py-6">
              <p className="text-gray-400 dark:text-gray-500 text-sm">No wins logged yet</p>
              <button onClick={() => navigate('wins')} className="mt-2 text-xs text-indigo-600 dark:text-indigo-400 hover:underline">Log your first win</button>
            </div>
          ) : (
            <div>
              <div className="flex items-center gap-2 mb-2">
                <p className="text-xs font-medium text-gray-500 dark:text-gray-400">
                  {new Date(recentWin.date + 'T00:00:00').toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                </p>
                {recentWin.tags?.map(tag => (
                  <span key={tag} className="text-xs px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300">{tag}</span>
                ))}
              </div>
              <p className="font-semibold text-gray-900 dark:text-gray-100 mb-2">{recentWin.title}</p>
              <ul className="space-y-1">
                {(recentWin.bullets || []).slice(0, 3).map((b, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-300">
                    <span className="text-indigo-400 mt-0.5">•</span>
                    <span>{b}</span>
                  </li>
                ))}
                {(recentWin.bullets || []).length > 3 && (
                  <li className="text-xs text-gray-400 dark:text-gray-500 pl-4">+{recentWin.bullets.length - 3} more</li>
                )}
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Company pipeline */}
      <div className="card p-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="section-header">Application Pipeline</h2>
          <button onClick={() => navigate('companies')} className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline">Manage</button>
        </div>
        <div className="flex flex-wrap gap-2">
          {companies.map(c => (
            <div key={c.id} className="flex items-center gap-2 bg-gray-50 dark:bg-gray-700/50 rounded-lg px-3 py-2">
              <span className="text-sm font-medium text-gray-800 dark:text-gray-200">{c.company}</span>
              <span className="text-xs text-gray-500 dark:text-gray-400">{c.role}</span>
              <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${STATUS_COLOR_MAP[c.status]}`}>{c.status}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
