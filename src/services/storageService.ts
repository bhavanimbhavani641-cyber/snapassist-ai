/**
 * Storage utility for application data
 * Persists history and preferences to localStorage
 */

export interface HistoryItem {
  id: string
  input: string
  output: string
  feature: string
  timestamp: Date
  processingTime: number
}

const HISTORY_KEY = 'snapassist_history'
const PREFERENCES_KEY = 'snapassist_preferences'
const MAX_HISTORY_ITEMS = 50

/**
 * Add item to history
 */
export function addToHistory(
  input: string,
  output: string,
  feature: string,
  processingTime: number
): HistoryItem {
  const item: HistoryItem = {
    id: Date.now().toString(),
    input,
    output,
    feature,
    timestamp: new Date(),
    processingTime,
  }

  const history = getHistory()
  history.unshift(item)

  // Keep only last 50 items
  if (history.length > MAX_HISTORY_ITEMS) {
    history.pop()
  }

  localStorage.setItem(HISTORY_KEY, JSON.stringify(history))
  return item
}

/**
 * Get all history items
 */
export function getHistory(): HistoryItem[] {
  try {
    const data = localStorage.getItem(HISTORY_KEY)
    if (!data) return []
    const items = JSON.parse(data)
    // Convert timestamp strings back to Date objects
    return items.map((item: any) => ({
      ...item,
      timestamp: new Date(item.timestamp),
    }))
  } catch (error) {
    console.error('Error loading history:', error)
    return []
  }
}

/**
 * Clear all history
 */
export function clearHistory(): void {
  localStorage.removeItem(HISTORY_KEY)
}

/**
 * Delete specific history item
 */
export function deleteHistoryItem(id: string): void {
  const history = getHistory()
  const filtered = history.filter((item) => item.id !== id)
  localStorage.setItem(HISTORY_KEY, JSON.stringify(filtered))
}

/**
 * Get user preferences
 */
export function getPreferences(): { theme: 'light' | 'dark'; autoSave: boolean } {
  try {
    const data = localStorage.getItem(PREFERENCES_KEY)
    if (!data) {
      return { theme: 'light', autoSave: true }
    }
    return JSON.parse(data)
  } catch (error) {
    console.error('Error loading preferences:', error)
    return { theme: 'light', autoSave: true }
  }
}

/**
 * Save user preferences
 */
export function savePreferences(preferences: {
  theme: 'light' | 'dark'
  autoSave: boolean
}): void {
  localStorage.setItem(PREFERENCES_KEY, JSON.stringify(preferences))
}
