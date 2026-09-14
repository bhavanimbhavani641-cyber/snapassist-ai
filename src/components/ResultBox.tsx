import React from 'react'
import { Copy, Check } from 'lucide-react'
import styles from './ResultBox.module.css'

interface ResultBoxProps {
  result: string
  processingTime: number
  wordCount: number
  onCopy: () => void
  onRegenerate: () => void
  isRegenerating: boolean
}

/**
 * Displays AI processing result with metadata and action buttons
 * Includes copy-to-clipboard functionality
 */
const ResultBox: React.FC<ResultBoxProps> = ({
  result,
  processingTime,
  wordCount,
  onCopy,
  onRegenerate,
  isRegenerating,
}) => {
  const [isCopied, setIsCopied] = React.useState(false)

  const handleCopy = () => {
    onCopy()
    setIsCopied(true)
    setTimeout(() => setIsCopied(false), 2000)
  }

  return (
    <div className={styles.resultBox}>
      {/* Metadata */}
      <div className={styles.metadata}>
        <div className={styles.stat}>
          <span className={styles.label}>Response Time:</span>
          <span className={styles.value}>{processingTime.toFixed(0)}ms</span>
        </div>
        <div className={styles.stat}>
          <span className={styles.label}>Word Count:</span>
          <span className={styles.value}>{wordCount}</span>
        </div>
      </div>

      {/* Result content */}
      <div className={styles.content}>
        <h3>Result</h3>
        <p>{result}</p>
      </div>

      {/* Action buttons */}
      <div className={styles.actions}>
        <button
          className={`${styles.button} ${styles.primary}`}
          onClick={handleCopy}
          aria-label="Copy result to clipboard"
        >
          {isCopied ? (
            <>
              <Check size={18} />
              <span>Copied!</span>
            </>
          ) : (
            <>
              <Copy size={18} />
              <span>Copy</span>
            </>
          )}
        </button>

        <button
          className={`${styles.button} ${styles.secondary}`}
          onClick={onRegenerate}
          disabled={isRegenerating}
          aria-label="Regenerate result"
        >
          <span>Regenerate</span>
        </button>
      </div>
    </div>
  )
}

export default ResultBox
