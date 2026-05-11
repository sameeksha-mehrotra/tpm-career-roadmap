import { useState, useEffect } from 'react'
import { useLocalStorage } from './hooks/useLocalStorage'
import Sidebar from './components/Sidebar'
import Dashboard from './components/Dashboard'
import Timeline from './components/Timeline'
import CompanyTracker from './components/CompanyTracker'
import InterviewPrep from './components/InterviewPrep'
import WeeklyWins from './components/WeeklyWins'

const PAGE_TITLES = {
  dashboard: 'Dashboard',
  timeline: 'Recruiting Timeline',
  companies: 'Company Tracker',
  prep: 'Interview Prep',
  wins: 'Weekly Wins',
}

export default function App() {
  const [currentPage, setCurrentPage] = useState('dashboard')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [darkMode, setDarkMode] = useLocalStorage(
    'tpm_darkMode',
    window.matchMedia('(prefers-color-scheme: dark)').matches
  )

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [darkMode])

  // Request notification permission on first load
  useEffect(() => {
    if ('Notification' in window && Notification.permission === 'default') {
      // Subtle — don't auto-prompt, let user trigger via the Timeline UI
    }
  }, [])

  const navigate = (page) => {
    setCurrentPage(page)
    setSidebarOpen(false)
    window.scrollTo(0, 0)
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-20 bg-black/50 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <Sidebar
        currentPage={currentPage}
        navigate={navigate}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
      />

      <main className="md:ml-64 min-h-screen flex flex-col">
        {/* Mobile top bar */}
        <header className="md:hidden sticky top-0 z-10 flex items-center justify-between px-4 py-3 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-sm">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <span className="font-semibold text-gray-900 dark:text-gray-100">{PAGE_TITLES[currentPage]}</span>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            {darkMode ? (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707M17.657 17.657l-.707-.707M6.343 6.343l-.707-.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            )}
          </button>
        </header>

        <div className="flex-1 p-4 md:p-8 max-w-7xl mx-auto w-full">
          {currentPage === 'dashboard' && <Dashboard navigate={navigate} />}
          {currentPage === 'timeline' && <Timeline />}
          {currentPage === 'companies' && <CompanyTracker />}
          {currentPage === 'prep' && <InterviewPrep />}
          {currentPage === 'wins' && <WeeklyWins />}
        </div>
      </main>
    </div>
  )
}
