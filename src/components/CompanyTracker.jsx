import { useState } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { INITIAL_COMPANIES, STATUS_OPTIONS, STATUS_COLOR_MAP } from '../data/initialData'

function nanoid() {
  return Math.random().toString(36).slice(2, 10)
}

const EMPTY_COMPANY = {
  company: '',
  role: '',
  deadline: '',
  status: 'Not Applied',
  recruiter: '',
  recruiterContact: '',
  notes: '',
  jobLink: '',
}

function EditableCell({ value, onChange, type = 'text', placeholder = '' }) {
  return (
    <input
      type={type}
      value={value}
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full bg-transparent border-b border-dashed border-gray-300 dark:border-gray-600 focus:border-indigo-500 dark:focus:border-indigo-400 outline-none text-sm py-0.5 text-gray-700 dark:text-gray-200 placeholder-gray-300 dark:placeholder-gray-600"
    />
  )
}

function StatusSelect({ value, onChange }) {
  return (
    <select
      value={value}
      onChange={e => onChange(e.target.value)}
      className={`text-xs font-medium px-2 py-1 rounded-full border-none outline-none cursor-pointer ${STATUS_COLOR_MAP[value]}`}
    >
      {STATUS_OPTIONS.map(s => (
        <option key={s} value={s}>{s}</option>
      ))}
    </select>
  )
}

function CompanyRow({ company, onUpdate, onDelete }) {
  const update = (field, val) => onUpdate({ ...company, [field]: val })

  return (
    <tr className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 group transition-colors">
      <td className="px-4 py-3 min-w-[120px]">
        <EditableCell value={company.company} onChange={v => update('company', v)} placeholder="Company" />
      </td>
      <td className="px-4 py-3 min-w-[140px]">
        <EditableCell value={company.role} onChange={v => update('role', v)} placeholder="Role" />
      </td>
      <td className="px-4 py-3 min-w-[120px]">
        <input
          type="date"
          value={company.deadline}
          onChange={e => update('deadline', e.target.value)}
          className="w-full bg-transparent border-b border-dashed border-gray-300 dark:border-gray-600 focus:border-indigo-500 outline-none text-sm text-gray-700 dark:text-gray-200 py-0.5"
        />
      </td>
      <td className="px-4 py-3">
        <StatusSelect value={company.status} onChange={v => update('status', v)} />
      </td>
      <td className="px-4 py-3 min-w-[120px]">
        <EditableCell value={company.recruiter} onChange={v => update('recruiter', v)} placeholder="Name" />
      </td>
      <td className="px-4 py-3 min-w-[160px]">
        <EditableCell value={company.recruiterContact} onChange={v => update('recruiterContact', v)} placeholder="email / LinkedIn" />
      </td>
      <td className="px-4 py-3 min-w-[200px] max-w-[250px]">
        <textarea
          value={company.notes}
          onChange={e => update('notes', e.target.value)}
          placeholder="Interview notes..."
          rows={1}
          className="w-full bg-transparent border-b border-dashed border-gray-300 dark:border-gray-600 focus:border-indigo-500 outline-none text-sm text-gray-700 dark:text-gray-200 placeholder-gray-300 dark:placeholder-gray-600 resize-none py-0.5"
          onInput={e => { e.target.style.height = 'auto'; e.target.style.height = e.target.scrollHeight + 'px' }}
        />
      </td>
      <td className="px-4 py-3 min-w-[100px]">
        {company.jobLink ? (
          <div className="flex items-center gap-1.5">
            <a
              href={company.jobLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1"
            >
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              Open
            </a>
            <button
              onClick={() => update('jobLink', '')}
              className="text-gray-300 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        ) : (
          <input
            type="url"
            value={company.jobLink}
            onChange={e => update('jobLink', e.target.value)}
            placeholder="https://..."
            className="w-full bg-transparent border-b border-dashed border-gray-300 dark:border-gray-600 focus:border-indigo-500 outline-none text-xs text-gray-700 dark:text-gray-200 placeholder-gray-300 dark:placeholder-gray-600 py-0.5"
          />
        )}
      </td>
      <td className="px-4 py-3">
        <button
          onClick={() => onDelete(company.id)}
          className="p-1.5 rounded-lg text-gray-300 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors opacity-0 group-hover:opacity-100"
          title="Remove"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      </td>
    </tr>
  )
}

function StatusSummary({ companies }) {
  const counts = STATUS_OPTIONS.reduce((acc, s) => {
    acc[s] = companies.filter(c => c.status === s).length
    return acc
  }, {})

  return (
    <div className="flex flex-wrap gap-2">
      {STATUS_OPTIONS.map(s => counts[s] > 0 && (
        <span key={s} className={`text-xs font-medium px-2.5 py-1 rounded-full ${STATUS_COLOR_MAP[s]}`}>
          {s}: {counts[s]}
        </span>
      ))}
    </div>
  )
}

export default function CompanyTracker() {
  const [companies, setCompanies] = useLocalStorage('tpm_companies', INITIAL_COMPANIES)
  const [sortField, setSortField] = useState('deadline')
  const [sortDir, setSortDir] = useState('asc')
  const [filterStatus, setFilterStatus] = useState('All')

  const updateCompany = (updated) => {
    setCompanies(companies.map(c => c.id === updated.id ? updated : c))
  }

  const deleteCompany = (id) => {
    if (window.confirm('Remove this company?')) {
      setCompanies(companies.filter(c => c.id !== id))
    }
  }

  const addCompany = () => {
    setCompanies([...companies, { ...EMPTY_COMPANY, id: nanoid() }])
  }

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDir(d => d === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortDir('asc')
    }
  }

  const SortIcon = ({ field }) => (
    <svg className={`w-3 h-3 inline ml-1 transition-transform ${sortField === field && sortDir === 'desc' ? 'rotate-180' : ''} ${sortField !== field ? 'opacity-30' : 'text-indigo-500'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
    </svg>
  )

  const filtered = (filterStatus === 'All' ? companies : companies.filter(c => c.status === filterStatus))
    .slice()
    .sort((a, b) => {
      const va = a[sortField] || ''
      const vb = b[sortField] || ''
      if (va < vb) return sortDir === 'asc' ? -1 : 1
      if (va > vb) return sortDir === 'asc' ? 1 : -1
      return 0
    })

  const deadlineSoon = companies.filter(c => {
    if (!c.deadline || c.status === 'Applied' || c.status === 'Offer' || c.status === 'Rejected') return false
    const diff = Math.ceil((new Date(c.deadline + 'T00:00:00') - new Date()) / (1000 * 60 * 60 * 24))
    return diff >= 0 && diff <= 30
  })

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="page-header">Company Tracker</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{companies.length} companies · All fields editable inline</p>
        </div>
        <button onClick={addCompany} className="btn-primary">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add Company
        </button>
      </div>

      {/* Pipeline summary */}
      <div className="card p-4">
        <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2">Pipeline Overview</p>
        <StatusSummary companies={companies} />
      </div>

      {/* Deadline alert */}
      {deadlineSoon.length > 0 && (
        <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-3">
          <p className="text-sm font-medium text-amber-700 dark:text-amber-300 flex items-center gap-1.5">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {deadlineSoon.length} deadline{deadlineSoon.length > 1 ? 's' : ''} within 30 days:
            {' '}{deadlineSoon.map(c => `${c.company} (${new Date(c.deadline + 'T00:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric' })})`).join(', ')}
          </p>
        </div>
      )}

      {/* Filter bar */}
      <div className="flex flex-wrap gap-2">
        {['All', ...STATUS_OPTIONS].map(s => (
          <button
            key={s}
            onClick={() => setFilterStatus(s)}
            className={`text-xs px-3 py-1.5 rounded-full font-medium transition-colors ${
              filterStatus === s
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600'
            }`}
          >
            {s} {s === 'All' ? `(${companies.length})` : companies.filter(c => c.status === s).length > 0 ? `(${companies.filter(c => c.status === s).length})` : ''}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/80">
                {[
                  { label: 'Company', field: 'company' },
                  { label: 'Role', field: 'role' },
                  { label: 'Deadline', field: 'deadline' },
                  { label: 'Status', field: 'status' },
                  { label: 'Recruiter', field: 'recruiter' },
                  { label: 'Contact', field: 'recruiterContact' },
                  { label: 'Notes', field: 'notes' },
                  { label: 'Job Link', field: 'jobLink' },
                  { label: '', field: '' },
                ].map(col => (
                  <th
                    key={col.field}
                    onClick={() => col.field && handleSort(col.field)}
                    className={`px-4 py-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide whitespace-nowrap ${col.field ? 'cursor-pointer hover:text-gray-700 dark:hover:text-gray-200 select-none' : ''}`}
                  >
                    {col.label}
                    {col.field && <SortIcon field={col.field} />}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={9} className="px-4 py-8 text-center text-gray-400 dark:text-gray-500 text-sm">
                    No companies match the current filter.
                  </td>
                </tr>
              ) : (
                filtered.map(company => (
                  <CompanyRow
                    key={company.id}
                    company={company}
                    onUpdate={updateCompany}
                    onDelete={deleteCompany}
                  />
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <p className="text-xs text-gray-400 dark:text-gray-500 text-center">All changes save automatically to your browser.</p>
    </div>
  )
}
