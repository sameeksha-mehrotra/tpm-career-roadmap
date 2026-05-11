const NAV_ITEMS = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
  },
  {
    id: 'timeline',
    label: 'Timeline',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
      </svg>
    ),
  },
  {
    id: 'companies',
    label: 'Companies',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
  },
  {
    id: 'prep',
    label: 'Interview Prep',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
  },
  {
    id: 'wins',
    label: 'Weekly Wins',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
      </svg>
    ),
  },
]

export default function Sidebar({ currentPage, navigate, sidebarOpen, setSidebarOpen, darkMode, setDarkMode }) {
  return (
    <aside
      className={`
        fixed top-0 left-0 h-full w-64 z-30
        bg-white dark:bg-gray-800
        border-r border-gray-200 dark:border-gray-700
        flex flex-col
        transition-transform duration-300 ease-in-out
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        md:translate-x-0
      `}
    >
      {/* Logo / Brand */}
      <div className="flex items-center gap-3 px-5 py-5 border-b border-gray-200 dark:border-gray-700">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-white font-bold text-sm">
          S
        </div>
        <div>
          <p className="font-bold text-gray-900 dark:text-gray-100 text-sm leading-tight">Sameeksha</p>
          <p className="text-xs text-gray-500 dark:text-gray-400">TPM Command Center</p>
        </div>
        {/* Close button mobile */}
        <button
          className="ml-auto md:hidden p-1 rounded text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
          onClick={() => setSidebarOpen(false)}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Nav links */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {NAV_ITEMS.map((item) => {
          const active = currentPage === item.id
          return (
            <button
              key={item.id}
              onClick={() => navigate(item.id)}
              className={`
                w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all
                ${active
                  ? 'bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300'
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-gray-100'
                }
              `}
            >
              <span className={active ? 'text-indigo-600 dark:text-indigo-400' : ''}>{item.icon}</span>
              {item.label}
              {active && (
                <span className="ml-auto w-1.5 h-1.5 rounded-full bg-indigo-500" />
              )}
            </button>
          )
        })}
      </nav>

      {/* Footer: dark mode + info */}
      <div className="px-3 py-4 border-t border-gray-200 dark:border-gray-700 space-y-2">
        <div className="flex items-center justify-between px-3 py-2">
          <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">Dark Mode</span>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`
              relative inline-flex h-5 w-9 items-center rounded-full transition-colors
              ${darkMode ? 'bg-indigo-600' : 'bg-gray-200 dark:bg-gray-600'}
            `}
          >
            <span
              className={`
                inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform shadow-sm
                ${darkMode ? 'translate-x-4.5' : 'translate-x-0.5'}
              `}
              style={{ transform: darkMode ? 'translateX(18px)' : 'translateX(2px)' }}
            />
          </button>
        </div>
        <div className="px-3 py-1">
          <p className="text-xs text-gray-400 dark:text-gray-500">UT Austin CS · Class of 2028</p>
          <p className="text-xs text-gray-400 dark:text-gray-500">Target: Summer 2027 internship</p>
        </div>
      </div>
    </aside>
  )
}
