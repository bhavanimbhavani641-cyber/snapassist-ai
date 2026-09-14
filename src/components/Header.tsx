import React from 'react'
import { Sun, Moon } from 'lucide-react'
import styles from './Header.module.css'

interface HeaderProps {
  isDarkMode: boolean
  onThemeToggle: () => void
}

/**
 * Header component with navigation and theme toggle
 * Responsive design: stack vertically on mobile, horizontal on desktop
 */
const Header: React.FC<HeaderProps> = ({ isDarkMode, onThemeToggle }) => {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        {/* Logo and branding */}
        <div className={styles.logo}>
          <h1>SnapAssist AI</h1>
          <p className={styles.tagline}>Smarter AI. Designed for efficient computing.</p>
        </div>

        {/* Theme toggle button */}
        <button
          className={styles.themeToggle}
          onClick={onThemeToggle}
          aria-label="Toggle dark mode"
          title={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </div>
    </header>
  )
}

export default Header
