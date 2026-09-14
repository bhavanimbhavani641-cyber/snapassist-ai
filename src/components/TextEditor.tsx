import React from 'react'
import { AlertCircle } from 'lucide-react'
import styles from './TextEditor.module.css'

interface TextEditorProps {
  value: string
  onChange: (value: string) => void
  isDisabled: boolean
  maxLength?: number
}

/**
 * Text input component with character counter
 * Shows remaining characters and visual feedback
 */
const TextEditor: React.FC<TextEditorProps> = ({
  value,
  onChange,
  isDisabled,
  maxLength = 10000,
}) => {
  const characterCount = value.length
  const remainingCharacters = maxLength - characterCount
  const isNearLimit = remainingCharacters < 500
  const isAtLimit = remainingCharacters <= 0

  return (
    <div className={styles.editor}>
      <label htmlFor="text-input" className={styles.label}>
        Paste or type your text here
      </label>

      <textarea
        id="text-input"
        className={`${styles.textarea} ${isAtLimit ? styles.limitReached : ''}`}
        value={value}
        onChange={(e) => onChange(e.target.value.slice(0, maxLength))}
        placeholder="Enter the text you want to process..."
        disabled={isDisabled}
        maxLength={maxLength}
        aria-label="Text input for AI processing"
        aria-describedby="char-counter"
      />

      {/* Character counter */}
      <div className={styles.footer}>
        <div
          id="char-counter"
          className={`${styles.counter} ${
            isAtLimit ? styles.error : isNearLimit ? styles.warning : ''
          }`}
        >
          {isAtLimit && <AlertCircle size={16} />}
          <span>
            {characterCount.toLocaleString()} / {maxLength.toLocaleString()} characters
          </span>
          {!isAtLimit && (
            <span className={styles.remaining}>
              ({remainingCharacters.toLocaleString()} remaining)
            </span>
          )}
        </div>
      </div>
    </div>
  )
}

export default TextEditor
