import React from 'react'
import styles from './Loading.module.css'

interface LoadingProps {
  message?: string
}

/**
 * Loading indicator component
 * Shows spinner and optional message while AI processes
 */
const Loading: React.FC<LoadingProps> = ({ message = 'Processing with AI...' }) => {
  return (
    <div className={styles.loading} role="status" aria-live="polite">
      <div className={styles.spinner} />
      <p>{message}</p>
    </div>
  )
}

export default Loading
