import { useState } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { INITIAL_LEETCODE, INITIAL_STORIES, COMPETENCY_TAGS } from '../data/initialData'

function nanoid() {
  return Math.random().toString(36).slice(2, 10)
}

// ─── LeetCode Section ─────────────────────────────────────────────────────────

function Counter({ label, value, onChange, color }) {
  return (
    <div className={`card p-4 flex flex-col items-center gap-2 border-t-4 ${color}`}>
      <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">{label}</p>
      <p className="text-4xl font-bold text-gray-900 dark:text-gray-100">{value}</p>
      <div className="flex gap-2">
        <button
          onClick={() => onChange(Math.max(0, value - 1))}
          className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-600 dark:text-gray-300 font-bold text-lg flex items-center justify-center transition-colors"
        >
          −
        </button>
        <button
          onClick={() => onChange(value + 1)}
          className="w-8 h-8 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-lg flex items-center justify-center transition-colors"
        >
          +
        </button>
      </div>
    </div>
  )
}

function LeetCodeSection() {
  const [lc, setLc] = useLocalStorage('tpm_leetcode', INITIAL_LEETCODE)

  const total = lc.easy + lc.medium + lc.hard
  const weekPct = Math.min(100, Math.round((lc.solvedThisWeek / lc.weeklyGoal) * 100))

  const updateField = (field, val) => setLc({ ...lc, [field]: val })

  const incrementWithStreak = (field, delta) => {
    const today = new Date().toISOString().split('T')[0]
    const newVal = Math.max(0, lc[field] + delta)
    let { streak, lastSolvedDate, solvedThisWeek, weekStart } = lc

    if (delta > 0) {
      // Streak logic
      if (lastSolvedDate === today) {
        // Already solved today, just increment count
      } else if (lastSolvedDate) {
        const last = new Date(lastSolvedDate)
        const now = new Date(today)
        const diffDays = Math.round((now - last) / (1000 * 60 * 60 * 24))
        if (diffDays === 1) streak += 1
        else if (diffDays > 1) streak = 1
      } else {
        streak = 1
      }
      lastSolvedDate = today

      // Weekly tracking
      const weekStartDate = weekStart ? new Date(weekStart) : null
      const todayDate = new Date(today)
      const dayOfWeek = todayDate.getDay() // 0=Sun
      const thisWeekStart = new Date(todayDate)
      thisWeekStart.setDate(todayDate.getDate() - dayOfWeek)
      const thisWeekStartStr = thisWeekStart.toISOString().split('T')[0]

      if (!weekStart || weekStart < thisWeekStartStr) {
        weekStart = thisWeekStartStr
        solvedThisWeek = 1
      } else {
        solvedThisWeek += 1
      }
    }

    setLc({ ...lc, [field]: newVal, streak, lastSolvedDate, solvedThisWeek, weekStart })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="section-header">LeetCode Tracker</h2>
        <div className="flex items-center gap-2">
          <span className={`flex items-center gap-1 text-sm font-bold ${lc.streak > 0 ? 'text-orange-500' : 'text-gray-400 dark:text-gray-500'}`}>
            🔥 {lc.streak}-day streak
          </span>
          <span className="text-sm text-gray-500 dark:text-gray-400 font-medium">{total} solved total</span>
        </div>
      </div>

      {/* Counters */}
      <div className="grid grid-cols-3 gap-4">
        <Counter
          label="Easy"
          value={lc.easy}
          onChange={(v) => {
            const delta = v - lc.easy
            if (delta !== 0) incrementWithStreak('easy', delta)
          }}
          color="border-green-400"
        />
        <Counter
          label="Medium"
          value={lc.medium}
          onChange={(v) => {
            const delta = v - lc.medium
            if (delta !== 0) incrementWithStreak('medium', delta)
          }}
          color="border-amber-400"
        />
        <Counter
          label="Hard"
          value={lc.hard}
          onChange={(v) => {
            const delta = v - lc.hard
            if (delta !== 0) incrementWithStreak('hard', delta)
          }}
          color="border-red-400"
        />
      </div>

      {/* Weekly goal */}
      <div className="card p-5">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-gray-100">Weekly Goal</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">{lc.solvedThisWeek} / {lc.weeklyGoal} this week</p>
          </div>
          <div className="flex items-center gap-2">
            <label className="text-xs text-gray-400 dark:text-gray-500">Target:</label>
            <input
              type="number"
              min={1}
              max={30}
              value={lc.weeklyGoal}
              onChange={e => updateField('weeklyGoal', Math.max(1, parseInt(e.target.value) || 1))}
              className="w-16 input text-sm text-center py-1"
            />
          </div>
        </div>
        <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-500 ${weekPct >= 100 ? 'bg-green-500' : weekPct >= 50 ? 'bg-indigo-500' : 'bg-amber-500'}`}
            style={{ width: `${weekPct}%` }}
          />
        </div>
        <div className="flex justify-between mt-2 text-xs text-gray-400 dark:text-gray-500">
          <span>0</span>
          <span className={weekPct >= 100 ? 'text-green-600 dark:text-green-400 font-semibold' : ''}>{weekPct}%{weekPct >= 100 ? ' — Goal met! 🎉' : ''}</span>
          <span>{lc.weeklyGoal}</span>
        </div>
      </div>

      {/* Difficulty breakdown */}
      {total > 0 && (
        <div className="card p-5">
          <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-3">Difficulty Breakdown</h3>
          <div className="space-y-2">
            {[
              { label: 'Easy', val: lc.easy, color: 'bg-green-500' },
              { label: 'Medium', val: lc.medium, color: 'bg-amber-500' },
              { label: 'Hard', val: lc.hard, color: 'bg-red-500' },
            ].map(({ label, val, color }) => (
              <div key={label} className="flex items-center gap-3">
                <span className="text-xs text-gray-500 dark:text-gray-400 w-12">{label}</span>
                <div className="flex-1 h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${color} rounded-full transition-all`}
                    style={{ width: total > 0 ? `${(val / total) * 100}%` : '0%' }}
                  />
                </div>
                <span className="text-xs font-medium text-gray-600 dark:text-gray-300 w-6 text-right">{val}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

// ─── STAR Stories Section ──────────────────────────────────────────────────────

const EMPTY_STORY = {
  title: '',
  situation: '',
  task: '',
  action: '',
  result: '',
  tags: [],
}

function StoryCard({ story, onUpdate, onDelete }) {
  const [expanded, setExpanded] = useState(false)
  const [editing, setEditing] = useState(false)
  const [draft, setDraft] = useState(story)

  const saveEdits = () => {
    onUpdate({ ...story, ...draft })
    setEditing(false)
  }

  const cancelEdits = () => {
    setDraft(story)
    setEditing(false)
  }

  const toggleTag = (tag) => {
    setDraft(d => ({
      ...d,
      tags: d.tags.includes(tag) ? d.tags.filter(t => t !== tag) : [...d.tags, tag],
    }))
  }

  if (editing) {
    return (
      <div className="card p-5 border-indigo-200 dark:border-indigo-800 bg-indigo-50/30 dark:bg-indigo-900/10">
        <div className="space-y-4">
          <div>
            <label className="label">Story Title</label>
            <input
              value={draft.title}
              onChange={e => setDraft(d => ({ ...d, title: e.target.value }))}
              placeholder="e.g. Led API migration at Citi"
              className="input"
            />
          </div>

          {[
            { field: 'situation', label: 'Situation', placeholder: 'Set the scene — what was the context?' },
            { field: 'task', label: 'Task', placeholder: 'What was your specific responsibility?' },
            { field: 'action', label: 'Action', placeholder: 'What steps did YOU take?' },
            { field: 'result', label: 'Result', placeholder: 'What was the outcome? Quantify if possible.' },
          ].map(({ field, label, placeholder }) => (
            <div key={field}>
              <label className="label">{label}</label>
              <textarea
                value={draft[field]}
                onChange={e => setDraft(d => ({ ...d, [field]: e.target.value }))}
                placeholder={placeholder}
                rows={3}
                className="input resize-none"
              />
            </div>
          ))}

          <div>
            <label className="label">Competency Tags</label>
            <div className="flex flex-wrap gap-2">
              {COMPETENCY_TAGS.map(tag => (
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
            <button onClick={saveEdits} className="btn-primary">Save Story</button>
            <button onClick={cancelEdits} className="btn-secondary">Cancel</button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="card overflow-hidden">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full text-left p-4 flex items-start gap-3 hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors"
      >
        <svg
          className={`w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0 transition-transform ${expanded ? 'rotate-90' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <p className="font-semibold text-gray-900 dark:text-gray-100 text-sm">{story.title || 'Untitled Story'}</p>
            <div className="flex items-center gap-1.5 flex-shrink-0" onClick={e => e.stopPropagation()}>
              <button
                onClick={() => { setDraft(story); setEditing(true); setExpanded(true) }}
                className="p-1.5 rounded text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-colors"
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </button>
              <button
                onClick={() => { if (window.confirm('Delete this story?')) onDelete(story.id) }}
                className="p-1.5 rounded text-gray-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          </div>
          <div className="flex flex-wrap gap-1.5 mt-1.5">
            {story.tags.map(tag => (
              <span key={tag} className="text-xs px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300 font-medium">{tag}</span>
            ))}
          </div>
        </div>
      </button>

      {expanded && (
        <div className="px-4 pb-4 border-t border-gray-100 dark:border-gray-700 pt-3 space-y-3">
          {[
            { label: 'Situation', field: 'situation', color: 'bg-blue-500' },
            { label: 'Task', field: 'task', color: 'bg-purple-500' },
            { label: 'Action', field: 'action', color: 'bg-amber-500' },
            { label: 'Result', field: 'result', color: 'bg-green-500' },
          ].map(({ label, field, color }) => story[field] && (
            <div key={field} className="flex gap-3">
              <div className="flex flex-col items-center gap-1">
                <span className={`text-xs font-bold text-white ${color} rounded px-1.5 py-0.5 leading-tight`}>{label[0]}</span>
                <div className="w-0.5 flex-1 bg-gray-100 dark:bg-gray-700 min-h-[8px]" />
              </div>
              <div className="flex-1 pb-1">
                <p className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wide mb-0.5">{label}</p>
                <p className="text-sm text-gray-700 dark:text-gray-200 leading-relaxed">{story[field]}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

function StoriesSection() {
  const [stories, setStories] = useLocalStorage('tpm_stories', INITIAL_STORIES)
  const [filterTag, setFilterTag] = useState('All')
  const [showAddForm, setShowAddForm] = useState(false)
  const [newStory, setNewStory] = useState(EMPTY_STORY)

  const addStory = () => {
    if (!newStory.title.trim()) return
    setStories([...stories, { ...newStory, id: nanoid() }])
    setNewStory(EMPTY_STORY)
    setShowAddForm(false)
  }

  const updateStory = (updated) => {
    setStories(stories.map(s => s.id === updated.id ? updated : s))
  }

  const deleteStory = (id) => {
    setStories(stories.filter(s => s.id !== id))
  }

  const toggleTag = (tag) => {
    setNewStory(d => ({
      ...d,
      tags: d.tags.includes(tag) ? d.tags.filter(t => t !== tag) : [...d.tags, tag],
    }))
  }

  const filtered = filterTag === 'All' ? stories : stories.filter(s => s.tags.includes(filterTag))

  // Coverage check
  const coveredTags = COMPETENCY_TAGS.filter(t => stories.some(s => s.tags.includes(t)))
  const missingTags = COMPETENCY_TAGS.filter(t => !stories.some(s => s.tags.includes(t)))

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="section-header">STAR Stories Bank</h2>
        <button onClick={() => setShowAddForm(true)} className="btn-primary">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add Story
        </button>
      </div>

      {/* Coverage indicator */}
      {stories.length > 0 && (
        <div className="card p-4">
          <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2">Competency Coverage</p>
          <div className="flex flex-wrap gap-2">
            {COMPETENCY_TAGS.map(tag => (
              <span
                key={tag}
                className={`text-xs px-2.5 py-1 rounded-full font-medium flex items-center gap-1 ${
                  coveredTags.includes(tag)
                    ? 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300'
                    : 'bg-gray-100 text-gray-400 dark:bg-gray-700 dark:text-gray-500'
                }`}
              >
                {coveredTags.includes(tag) ? '✓' : '○'} {tag}
              </span>
            ))}
          </div>
          {missingTags.length > 0 && (
            <p className="text-xs text-amber-600 dark:text-amber-400 mt-2">Missing: {missingTags.join(', ')}</p>
          )}
        </div>
      )}

      {/* Add form */}
      {showAddForm && (
        <div className="card p-5 border-indigo-200 dark:border-indigo-800 bg-indigo-50/30 dark:bg-indigo-900/10">
          <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-4">New STAR Story</h3>
          <div className="space-y-4">
            <div>
              <label className="label">Story Title *</label>
              <input
                value={newStory.title}
                onChange={e => setNewStory(d => ({ ...d, title: e.target.value }))}
                placeholder="e.g. Led cross-functional API migration"
                className="input"
              />
            </div>
            {[
              { field: 'situation', label: 'Situation', placeholder: 'Set the scene — context and challenge' },
              { field: 'task', label: 'Task', placeholder: 'Your specific responsibility' },
              { field: 'action', label: 'Action', placeholder: 'What YOU specifically did (3-5 concrete steps)' },
              { field: 'result', label: 'Result', placeholder: 'Outcome — quantify with metrics if possible' },
            ].map(({ field, label, placeholder }) => (
              <div key={field}>
                <label className="label">{label}</label>
                <textarea
                  value={newStory[field]}
                  onChange={e => setNewStory(d => ({ ...d, [field]: e.target.value }))}
                  placeholder={placeholder}
                  rows={2}
                  className="input resize-none"
                />
              </div>
            ))}
            <div>
              <label className="label">Competency Tags</label>
              <div className="flex flex-wrap gap-2">
                {COMPETENCY_TAGS.map(tag => (
                  <button
                    key={tag}
                    onClick={() => toggleTag(tag)}
                    className={`text-xs px-3 py-1 rounded-full font-medium transition-colors ${
                      newStory.tags.includes(tag)
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
              <button onClick={addStory} className="btn-primary">Save Story</button>
              <button onClick={() => { setShowAddForm(false); setNewStory(EMPTY_STORY) }} className="btn-secondary">Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* Filter tags */}
      <div className="flex flex-wrap gap-2">
        {['All', ...COMPETENCY_TAGS].map(tag => (
          <button
            key={tag}
            onClick={() => setFilterTag(tag)}
            className={`text-xs px-3 py-1.5 rounded-full font-medium transition-colors ${
              filterTag === tag
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600'
            }`}
          >
            {tag} {tag !== 'All' && stories.filter(s => s.tags.includes(tag)).length > 0 && `(${stories.filter(s => s.tags.includes(tag)).length})`}
          </button>
        ))}
      </div>

      {/* Stories list */}
      {filtered.length === 0 ? (
        <div className="card p-10 text-center">
          <p className="text-3xl mb-2">📖</p>
          <p className="text-gray-500 dark:text-gray-400 font-medium">
            {stories.length === 0 ? 'No stories yet' : 'No stories match this filter'}
          </p>
          <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">
            {stories.length === 0 ? 'Add your first STAR story to start building your interview bank.' : `Try selecting a different competency tag.`}
          </p>
          {stories.length === 0 && (
            <button onClick={() => setShowAddForm(true)} className="btn-primary mt-3 mx-auto">Add first story</button>
          )}
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map(story => (
            <StoryCard
              key={story.id}
              story={story}
              onUpdate={updateStory}
              onDelete={deleteStory}
            />
          ))}
        </div>
      )}
    </div>
  )
}

// ─── Main Component ────────────────────────────────────────────────────────────

export default function InterviewPrep() {
  const [activeTab, setActiveTab] = useState('leetcode')

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="page-header">Interview Prep</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">LeetCode tracker + STAR behavioral story bank</p>
        </div>
        <div className="flex gap-1 bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
          {[
            { id: 'leetcode', label: 'LeetCode' },
            { id: 'stories', label: 'STAR Stories' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                activeTab === tab.id
                  ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 shadow-sm'
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {activeTab === 'leetcode' && <LeetCodeSection />}
      {activeTab === 'stories' && <StoriesSection />}
    </div>
  )
}
