import { useState, useEffect } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { INITIAL_PHASES, PHASE_COLOR_MAP } from '../data/initialData'

function nanoid() {
  return Math.random().toString(36).slice(2, 10)
}

function ReminderBadge({ date }) {
  if (!date) return null
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const rem = new Date(date + 'T00:00:00')
  const diffDays = Math.ceil((rem - today) / (1000 * 60 * 60 * 24))
  const label = rem.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })

  if (diffDays < 0) {
    return (
      <span className="inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full bg-red-100 text-red-600 dark:bg-red-900/40 dark:text-red-400 font-medium">
        <span className="w-1.5 h-1.5 rounded-full bg-red-500 inline-block" />
        {label} · Overdue
      </span>
    )
  }
  if (diffDays <= 7) {
    return (
      <span className="inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300 font-medium">
        <span className="w-1.5 h-1.5 rounded-full bg-amber-500 inline-block" />
        {label} · {diffDays}d
      </span>
    )
  }
  return (
    <span className="inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300 font-medium">
      <span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block" />
      {label} · {diffDays}d
    </span>
  )
}

function TaskRow({ task, phaseColor, editMode, onToggle, onUpdate, onDelete }) {
  const [showResources, setShowResources] = useState(false)
  const [editingText, setEditingText] = useState(false)
  const [textDraft, setTextDraft] = useState(task.text)
  const [newRes, setNewRes] = useState({ label: '', url: '' })
  const [showAddRes, setShowAddRes] = useState(false)
  const colors = PHASE_COLOR_MAP[phaseColor]

  const saveText = () => {
    if (textDraft.trim()) onUpdate({ ...task, text: textDraft.trim() })
    setEditingText(false)
  }

  const addResource = () => {
    if (!newRes.label.trim() || !newRes.url.trim()) return
    const url = newRes.url.startsWith('http') ? newRes.url : 'https://' + newRes.url
    const updated = { ...task, resources: [...task.resources, { id: nanoid(), label: newRes.label.trim(), url }] }
    onUpdate(updated)
    setNewRes({ label: '', url: '' })
    setShowAddRes(false)
  }

  const removeResource = (rid) => {
    onUpdate({ ...task, resources: task.resources.filter(r => r.id !== rid) })
  }

  const setReminder = (date) => {
    onUpdate({ ...task, reminder: date || null })
  }

  return (
    <div className={`group rounded-lg border transition-colors ${task.completed ? 'border-gray-100 dark:border-gray-700/50 bg-gray-50/50 dark:bg-gray-800/30' : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800'} p-3`}>
      <div className="flex items-start gap-3">
        {/* Checkbox */}
        <button
          onClick={() => onToggle(task.id)}
          className={`flex-shrink-0 mt-0.5 w-5 h-5 rounded-full border-2 transition-all flex items-center justify-center ${
            task.completed
              ? `${colors.dot} border-transparent`
              : 'border-gray-300 dark:border-gray-600 hover:border-indigo-400'
          }`}
        >
          {task.completed && (
            <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          )}
        </button>

        <div className="flex-1 min-w-0">
          {/* Task text */}
          {editMode && editingText ? (
            <div className="flex gap-2">
              <textarea
                value={textDraft}
                onChange={e => setTextDraft(e.target.value)}
                onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); saveText() } if (e.key === 'Escape') { setEditingText(false); setTextDraft(task.text) } }}
                className="input text-sm resize-none"
                rows={2}
                autoFocus
              />
              <div className="flex flex-col gap-1">
                <button onClick={saveText} className="btn-primary text-xs px-2 py-1">Save</button>
                <button onClick={() => { setEditingText(false); setTextDraft(task.text) }} className="btn-secondary text-xs px-2 py-1">Cancel</button>
              </div>
            </div>
          ) : (
            <p
              className={`text-sm leading-snug ${task.completed ? 'line-through text-gray-400 dark:text-gray-500' : 'text-gray-700 dark:text-gray-200'} ${editMode ? 'cursor-pointer hover:text-indigo-600 dark:hover:text-indigo-400' : ''}`}
              onClick={() => editMode && setEditingText(true)}
            >
              {task.text}
              {editMode && <span className="ml-1 text-gray-300 dark:text-gray-600 text-xs">(click to edit)</span>}
            </p>
          )}

          {/* Badges row */}
          <div className="flex flex-wrap items-center gap-2 mt-2">
            {task.reminder && <ReminderBadge date={task.reminder} />}
            {task.resources.length > 0 && (
              <button
                onClick={() => setShowResources(!showResources)}
                className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline inline-flex items-center gap-1"
              >
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                </svg>
                {task.resources.length} link{task.resources.length > 1 ? 's' : ''}
              </button>
            )}
          </div>

          {/* Resources list */}
          {showResources && task.resources.length > 0 && (
            <div className="mt-2 space-y-1">
              {task.resources.map(r => (
                <div key={r.id} className="flex items-center gap-2">
                  <a
                    href={r.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline truncate"
                  >
                    ↗ {r.label}
                  </a>
                  {editMode && (
                    <button onClick={() => removeResource(r.id)} className="text-red-400 hover:text-red-600 flex-shrink-0">
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Edit mode: reminder + add resource */}
          {editMode && (
            <div className="mt-3 space-y-2">
              <div className="flex items-center gap-2">
                <label className="text-xs text-gray-400 dark:text-gray-500 w-16 flex-shrink-0">Reminder</label>
                <input
                  type="date"
                  value={task.reminder || ''}
                  onChange={e => setReminder(e.target.value)}
                  className="input text-xs py-1 w-36"
                />
                {task.reminder && (
                  <button onClick={() => setReminder(null)} className="text-xs text-red-400 hover:text-red-600">Clear</button>
                )}
              </div>

              {!showAddRes ? (
                <button
                  onClick={() => { setShowAddRes(true); setShowResources(true) }}
                  className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline inline-flex items-center gap-1"
                >
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Add resource link
                </button>
              ) : (
                <div className="flex flex-col gap-1.5 p-2 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                  <input
                    placeholder="Label (e.g. Google APM Program)"
                    value={newRes.label}
                    onChange={e => setNewRes(p => ({ ...p, label: e.target.value }))}
                    className="input text-xs py-1"
                  />
                  <input
                    placeholder="URL (e.g. https://...)"
                    value={newRes.url}
                    onChange={e => setNewRes(p => ({ ...p, url: e.target.value }))}
                    className="input text-xs py-1"
                  />
                  <div className="flex gap-2">
                    <button onClick={addResource} className="btn-primary text-xs px-2 py-1">Add</button>
                    <button onClick={() => setShowAddRes(false)} className="btn-secondary text-xs px-2 py-1">Cancel</button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Edit mode: delete button */}
        {editMode && (
          <button
            onClick={() => onDelete(task.id)}
            className="flex-shrink-0 p-1.5 rounded-lg text-gray-300 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors opacity-0 group-hover:opacity-100"
            title="Remove task"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        )}
      </div>
    </div>
  )
}

function PhaseCard({ phase, editMode, onUpdatePhase }) {
  const colors = PHASE_COLOR_MAP[phase.color]
  const completed = phase.tasks.filter(t => t.completed).length
  const total = phase.tasks.length
  const pct = total > 0 ? Math.round((completed / total) * 100) : 0
  const [collapsed, setCollapsed] = useState(false)
  const [addingTask, setAddingTask] = useState(false)
  const [newTaskText, setNewTaskText] = useState('')

  const toggleTask = (taskId) => {
    const updated = { ...phase, tasks: phase.tasks.map(t => t.id === taskId ? { ...t, completed: !t.completed } : t) }
    onUpdatePhase(updated)
  }

  const updateTask = (updatedTask) => {
    const updated = { ...phase, tasks: phase.tasks.map(t => t.id === updatedTask.id ? updatedTask : t) }
    onUpdatePhase(updated)
  }

  const deleteTask = (taskId) => {
    const updated = { ...phase, tasks: phase.tasks.filter(t => t.id !== taskId) }
    onUpdatePhase(updated)
  }

  const addTask = () => {
    if (!newTaskText.trim()) return
    const newTask = { id: nanoid(), text: newTaskText.trim(), completed: false, reminder: null, resources: [] }
    const updated = { ...phase, tasks: [...phase.tasks, newTask] }
    onUpdatePhase(updated)
    setNewTaskText('')
    setAddingTask(false)
  }

  return (
    <div className="card overflow-hidden">
      {/* Phase header */}
      <div className={`bg-gradient-to-r ${colors.header} p-4 text-white`}>
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-bold text-lg leading-tight">{phase.title}</h3>
            <p className="text-sm opacity-80 mt-0.5">{phase.subtitle}</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-right">
              <p className="text-2xl font-bold">{pct}%</p>
              <p className="text-xs opacity-80">{completed}/{total} done</p>
            </div>
            <button
              onClick={() => setCollapsed(!collapsed)}
              className="p-1.5 rounded-lg bg-white/20 hover:bg-white/30 transition-colors"
            >
              <svg className={`w-4 h-4 transition-transform ${collapsed ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>
        </div>
        {/* Progress bar */}
        <div className="mt-3 h-1.5 bg-white/30 rounded-full overflow-hidden">
          <div className="h-full bg-white rounded-full transition-all duration-500" style={{ width: `${pct}%` }} />
        </div>
      </div>

      {/* Tasks */}
      {!collapsed && (
        <div className="p-4 space-y-2">
          {phase.tasks.map(task => (
            <TaskRow
              key={task.id}
              task={task}
              phaseColor={phase.color}
              editMode={editMode}
              onToggle={toggleTask}
              onUpdate={updateTask}
              onDelete={deleteTask}
            />
          ))}

          {/* Add task (edit mode) */}
          {editMode && (
            <div>
              {addingTask ? (
                <div className="flex gap-2 mt-2">
                  <input
                    placeholder="New task description..."
                    value={newTaskText}
                    onChange={e => setNewTaskText(e.target.value)}
                    onKeyDown={e => { if (e.key === 'Enter') addTask(); if (e.key === 'Escape') setAddingTask(false) }}
                    className="input text-sm"
                    autoFocus
                  />
                  <button onClick={addTask} className="btn-primary flex-shrink-0">Add</button>
                  <button onClick={() => setAddingTask(false)} className="btn-secondary flex-shrink-0">Cancel</button>
                </div>
              ) : (
                <button
                  onClick={() => setAddingTask(true)}
                  className="w-full mt-2 py-2 border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-lg text-sm text-gray-400 dark:text-gray-500 hover:border-indigo-300 hover:text-indigo-500 transition-colors flex items-center justify-center gap-1.5"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Add task
                </button>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default function Timeline() {
  const [phases, setPhases] = useLocalStorage('tpm_phases', INITIAL_PHASES)
  const [editMode, setEditMode] = useState(false)
  const [notifPermission, setNotifPermission] = useState(
    'Notification' in window ? Notification.permission : 'unsupported'
  )

  const allTasks = phases.flatMap(p => p.tasks)
  const completedTasks = allTasks.filter(t => t.completed).length
  const totalTasks = allTasks.length
  const overallPct = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0

  useEffect(() => {
    if (notifPermission === 'granted') {
      const today = new Date()
      today.setHours(0, 0, 0, 0)
      phases.forEach(phase => {
        phase.tasks.forEach(task => {
          if (!task.completed && task.reminder) {
            const rem = new Date(task.reminder + 'T00:00:00')
            if (rem <= today) {
              try {
                new Notification('Reminder: ' + task.text.substring(0, 60), {
                  body: 'Phase: ' + phase.title,
                  icon: '/favicon.ico',
                })
              } catch {}
            }
          }
        })
      })
    }
  }, [notifPermission])

  const requestNotifications = async () => {
    if (!('Notification' in window)) return
    const result = await Notification.requestPermission()
    setNotifPermission(result)
  }

  const updatePhase = (updatedPhase) => {
    setPhases(phases.map(p => p.id === updatedPhase.id ? updatedPhase : p))
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="page-header">Recruiting Timeline</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{completedTasks} of {totalTasks} tasks · {overallPct}% complete</p>
        </div>
        <div className="flex items-center gap-2">
          {notifPermission === 'default' && (
            <button onClick={requestNotifications} className="btn-secondary text-xs">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              Enable Notifications
            </button>
          )}
          {notifPermission === 'granted' && (
            <span className="text-xs text-green-600 dark:text-green-400 flex items-center gap-1">
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2a10 10 0 100 20A10 10 0 0012 2zm-1 15l-5-5 1.41-1.41L11 14.17l7.59-7.59L20 8l-9 9z"/></svg>
              Notifications on
            </span>
          )}
          <button
            onClick={() => setEditMode(!editMode)}
            className={editMode ? 'btn-primary' : 'btn-secondary'}
          >
            {editMode ? (
              <>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                Done Editing
              </>
            ) : (
              <>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                Edit Tasks
              </>
            )}
          </button>
        </div>
      </div>

      {/* Overall progress */}
      <div className="card p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Overall Progress</span>
          <span className="text-sm font-bold text-indigo-600 dark:text-indigo-400">{overallPct}%</span>
        </div>
        <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-indigo-500 to-violet-500 rounded-full transition-all duration-500"
            style={{ width: `${overallPct}%` }}
          />
        </div>
        <div className="flex justify-between mt-2 text-xs text-gray-400 dark:text-gray-500">
          {phases.map(p => {
            const done = p.tasks.filter(t => t.completed).length
            const tot = p.tasks.length
            const colors = PHASE_COLOR_MAP[p.color]
            return (
              <div key={p.id} className="flex items-center gap-1">
                <span className={`w-2 h-2 rounded-full ${colors.dot}`} />
                <span>{done}/{tot}</span>
              </div>
            )
          })}
        </div>
      </div>

      {editMode && (
        <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-3 flex items-start gap-2">
          <svg className="w-4 h-4 text-amber-600 dark:text-amber-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="text-xs text-amber-700 dark:text-amber-300">Edit mode: click task text to rename, set reminders, add/remove resource links, or delete tasks.</p>
        </div>
      )}

      {/* Phase cards */}
      <div className="space-y-4">
        {phases.map(phase => (
          <PhaseCard
            key={phase.id}
            phase={phase}
            editMode={editMode}
            onUpdatePhase={updatePhase}
          />
        ))}
      </div>
    </div>
  )
}
