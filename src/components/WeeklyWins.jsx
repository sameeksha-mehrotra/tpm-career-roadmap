import { useState } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { INITIAL_WINS, WIN_TAGS } from '../data/initialData'

function nanoid() {
  return Math.random().toString(36).slice(2, 10)
}

const EMPTY_WIN = {
  title: '',
  date: new Date().toISOString().split('T')[0],
  bullets: [''],
  tags: [],
}

const TAG_COLORS = {
  Technical: 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300',
  Leadership: 'bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300',
  Collaboration: 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300',
  Delivery: 'bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-300',
}

function WinForm({ initial, onSave, onCancel }) {
  const [draft, setDraft] = useState(initial)

  const addBullet = () => setDraft(d => ({ ...d, bullets: [...d.bullets, ''] }))
  const updateBullet = (i, val) => setDraft(d => ({ ...d, bullets: d.bullets.map((b, idx) => idx === i ? val : b) }))
  const removeBullet = (i) => setDraft(d => ({ ...d, bullets: d.bullets.filter((_, idx) => idx !== i) }))
  const toggleTag = (tag) => setDraft(d => ({
    ...d,
    tags: d.tags.includes(tag) ? d.tags.filter(t => t !== tag) : [...d.tags, tag],
  }))

  const handleSave = () => {
    const cleaned = { ...draft, bullets: draft.bullets.filter(b => b.trim()) }
    if (!cleaned.title.trim() || cleaned.bullets.length === 0) return
    onSave(cleaned)
  }

  return (
    <div className="card p-5 border-emerald-200 dark:border-emerald-800 bg-emerald-50/30 dark:bg-emerald-900/10">
      <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-4">
        {initial.id ? 'Edit Entry' : 'New Win Entry'}
      </h3>
      <div className="space-y-4">
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="label">Entry Title *</label>
            <input
              value={draft.title}
              onChange={e => setDraft(d => ({ ...d, title: e.target.value }))}
              placeholder="e.g. Week of Jun 9 — API sprint"
              className="input"
            />
          </div>
          <div>
            <label className="label">Date *</label>
            <input
              type="date"
              value={draft.date}
              onChange={e => setDraft(d => ({ ...d, date: e.target.value }))}
              className="input"
            />
          </div>
        </div>

        <div>
          <label className="label">Wins / Bullets * (one per line)</label>
          <div className="space-y-2">
            {draft.bullets.map((bullet, i) => (
              <div key={i} className="flex gap-2">
                <span className="text-gray-400 dark:text-gray-500 mt-2 text-sm">•</span>
                <input
                  value={bullet}
                  onChange={e => updateBullet(i, e.target.value)}
                  placeholder="e.g. Reduced API latency by 40% by optimizing DB queries"
                  className="input text-sm"
                  onKeyDown={e => {
                    if (e.key === 'Enter') { e.preventDefault(); addBullet() }
                    if (e.key === 'Backspace' && bullet === '' && draft.bullets.length > 1) {
                      e.preventDefault(); removeBullet(i)
                    }
                  }}
                />
                {draft.bullets.length > 1 && (
                  <button
                    onClick={() => removeBullet(i)}
                    className="text-gray-300 hover:text-red-400 transition-colors mt-1"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                )}
              </div>
            ))}
            <button
              onClick={addBullet}
              className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline inline-flex items-center gap-1"
            >
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Add bullet
            </button>
          </div>
        </div>

        <div>
          <label className="label">Category Tags</label>
          <div className="flex flex-wrap gap-2">
            {WIN_TAGS.map(tag => (
              <button
                key={tag}
                onClick={() => toggleTag(tag)}
                className={`text-xs px-3 py-1 rounded-full font-medium transition-colors ${
                  draft.tags.includes(tag)
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        <div className="flex gap-2">
          <button onClick={handleSave} className="btn-primary">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            {initial.id ? 'Save Changes' : 'Log Win'}
          </button>
          <button onClick={onCancel} className="btn-secondary">Cancel</button>
        </div>
      </div>
    </div>
  )
}

function WinCard({ win, onEdit, onDelete }) {
  const [expanded, setExpanded] = useState(true)
  const dateStr = new Date(win.date + 'T00:00:00').toLocaleDateString('en-US', {
    weekday: 'long', month: 'long', day: 'numeric', year: 'numeric',
  })

  return (
    <div className="card overflow-hidden group">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full text-left p-4 hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors"
      >
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center flex-shrink-0">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
              </svg>
            </div>
            <div>
              <p className="font-semibold text-gray-900 dark:text-gray-100 text-sm leading-snug">{win.title}</p>
              <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">{dateStr}</p>
              <div className="flex flex-wrap gap-1.5 mt-1.5">
                {(win.tags || []).map(tag => (
                  <span key={tag} className={`text-xs px-2 py-0.5 rounded-full font-medium ${TAG_COLORS[tag] || 'bg-gray-100 text-gray-600'}`}>{tag}</span>
                ))}
                <span className="text-xs text-gray-400 dark:text-gray-500">{win.bullets.length} bullet{win.bullets.length !== 1 ? 's' : ''}</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-1 flex-shrink-0" onClick={e => e.stopPropagation()}>
            <button
              onClick={() => onEdit(win)}
              className="p-1.5 rounded text-gray-300 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-colors opacity-0 group-hover:opacity-100"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </button>
            <button
              onClick={() => { if (window.confirm('Delete this entry?')) onDelete(win.id) }}
              className="p-1.5 rounded text-gray-300 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors opacity-0 group-hover:opacity-100"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
            <svg
              className={`w-4 h-4 text-gray-400 transition-transform ${expanded ? 'rotate-90' : ''}`}
              fill="none" stroke="currentColor" viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </button>

      {expanded && (
        <div className="px-4 pb-4 border-t border-gray-100 dark:border-gray-700 pt-3">
          <ul className="space-y-2">
            {win.bullets.map((bullet, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-200">
                <span className="text-emerald-500 mt-0.5 flex-shrink-0 font-bold">•</span>
                <span className="leading-relaxed">{bullet}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default function WeeklyWins() {
  const [wins, setWins] = useLocalStorage('tpm_wins', INITIAL_WINS)
  const [showForm, setShowForm] = useState(false)
  const [editingWin, setEditingWin] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterTag, setFilterTag] = useState('All')
  const [sortDir, setSortDir] = useState('desc')

  const addWin = (data) => {
    setWins([...wins, { ...data, id: nanoid() }])
    setShowForm(false)
  }

  const updateWin = (data) => {
    setWins(wins.map(w => w.id === data.id ? data : w))
    setEditingWin(null)
  }

  const deleteWin = (id) => {
    setWins(wins.filter(w => w.id !== id))
  }

  const filtered = wins
    .filter(w => filterTag === 'All' || (w.tags || []).includes(filterTag))
    .filter(w => {
      if (!searchTerm) return true
      const q = searchTerm.toLowerCase()
      return (
        w.title.toLowerCase().includes(q) ||
        (w.bullets || []).some(b => b.toLowerCase().includes(q)) ||
        (w.tags || []).some(t => t.toLowerCase().includes(q))
      )
    })
    .sort((a, b) => {
      const da = new Date(a.date)
      const db = new Date(b.date)
      return sortDir === 'desc' ? db - da : da - db
    })

  const totalBullets = wins.reduce((acc, w) => acc + (w.bullets || []).length, 0)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="page-header">Weekly Wins</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            {wins.length} entries · {totalBullets} impact bullets logged
          </p>
        </div>
        <button onClick={() => { setShowForm(true); setEditingWin(null) }} className="btn-primary">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Log a Win
        </button>
      </div>

      {/* Add form */}
      {showForm && !editingWin && (
        <WinForm
          initial={EMPTY_WIN}
          onSave={addWin}
          onCancel={() => setShowForm(false)}
        />
      )}

      {/* Search + filter + sort */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            placeholder="Search wins, keywords..."
            className="input pl-9"
          />
        </div>
        <button
          onClick={() => setSortDir(d => d === 'desc' ? 'asc' : 'desc')}
          className="btn-secondary flex-shrink-0"
          title="Toggle sort order"
        >
          <svg className={`w-4 h-4 transition-transform ${sortDir === 'asc' ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" />
          </svg>
          {sortDir === 'desc' ? 'Newest first' : 'Oldest first'}
        </button>
      </div>

      {/* Tag filters */}
      <div className="flex flex-wrap gap-2">
        {['All', ...WIN_TAGS].map(tag => (
          <button
            key={tag}
            onClick={() => setFilterTag(tag)}
            className={`text-xs px-3 py-1.5 rounded-full font-medium transition-colors ${
              filterTag === tag
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600'
            }`}
          >
            {tag} {tag !== 'All' && wins.filter(w => (w.tags || []).includes(tag)).length > 0 && `(${wins.filter(w => (w.tags || []).includes(tag)).length})`}
          </button>
        ))}
      </div>

      {/* Win cards */}
      {filtered.length === 0 ? (
        <div className="card p-12 text-center">
          <p className="text-4xl mb-3">{wins.length === 0 ? '🌟' : '🔍'}</p>
          <p className="text-gray-500 dark:text-gray-400 font-medium text-lg">
            {wins.length === 0 ? 'No wins logged yet' : 'No results found'}
          </p>
          <p className="text-sm text-gray-400 dark:text-gray-500 mt-1 max-w-sm mx-auto">
            {wins.length === 0
              ? 'Start logging your Citi internship wins. Even small wins compound into great interview stories.'
              : 'Try adjusting your search or filter.'
            }
          </p>
          {wins.length === 0 && (
            <button onClick={() => setShowForm(true)} className="btn-primary mt-4 mx-auto">Log your first win</button>
          )}
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map(win => (
            editingWin?.id === win.id ? (
              <WinForm
                key={win.id}
                initial={editingWin}
                onSave={updateWin}
                onCancel={() => setEditingWin(null)}
              />
            ) : (
              <WinCard
                key={win.id}
                win={win}
                onEdit={setEditingWin}
                onDelete={deleteWin}
              />
            )
          ))}
        </div>
      )}

      {filtered.length > 0 && (
        <p className="text-xs text-center text-gray-400 dark:text-gray-500">
          Showing {filtered.length} of {wins.length} entries
        </p>
      )}
    </div>
  )
}
