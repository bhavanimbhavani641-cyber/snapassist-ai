/**
 * AI Service Layer
 * Handles communication with AI backend
 * 
 * ARCHITECTURE:
 * Current (MVP): Browser → Cloud AI API
 * Future: Browser → Windows ML Service → ONNX → Snapdragon NPU
 * 
 * This service is designed to be backend-agnostic.
 * Replace the implementation without changing the interface.
 */

export interface AIResponse {
  result: string
  processingTime: number
  model: string
  mode: 'cloud' | 'local'
}

export interface PerformanceMetrics {
  requestTime: number
  responseTime: number
  outputLength: number
  timestamp: Date
}

type AIFeature = 'summarize' | 'rewrite' | 'improve' | 'simplify' | 'explain' | 'bulletpoints' | 'professional' | 'study'

const FEATURE_PROMPTS: Record<AIFeature, string> = {
  summarize: 'Provide a concise summary of the following text in 2-3 sentences:',
  rewrite: 'Rewrite the following text in a clear and engaging way:',
  improve: 'Improve the grammar, clarity, and overall quality of this text:',
  simplify: 'Simplify the following text to make it easier to understand:',
  explain: 'Explain the following text or concept in simple terms:',
  bulletpoints: 'Convert the following text into a clear bullet-point list:',
  professional: 'Create a short, professional version of the following text suitable for business communication:',
  study: 'Create a study-friendly explanation of the following text with key points highlighted:',
}

/**
 * Process text with AI
 * @param text - Input text to process
 * @param feature - AI feature/mode to use
 * @returns Promise with AI response and metrics
 */
export async function processWithAI(
  text: string,
  feature: AIFeature
): Promise<AIResponse> {
  const startTime = performance.now()

  try {
    // Validate input
    if (!text.trim()) {
      throw new Error('Input text cannot be empty')
    }

    if (text.length > 10000) {
      throw new Error('Text exceeds maximum length of 10,000 characters')
    }

    // Get API endpoint from environment
    const apiEndpoint = import.meta.env.VITE_AI_API_ENDPOINT
    if (!apiEndpoint) {
      throw new Error('AI API endpoint not configured')
    }

    // Build request payload
    const payload = {
      text: text.trim(),
      feature,
      prompt: FEATURE_PROMPTS[feature],
    }

    // Make API request to backend
    // The backend should be a server function that keeps the API key secret
    const response = await fetch(`${apiEndpoint}/api/process`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || `API error: ${response.statusText}`)
    }

    const data = await response.json()
    const endTime = performance.now()

    return {
      result: data.result,
      processingTime: endTime - startTime,
      model: data.model || 'Cloud AI (MVP)',
      mode: 'cloud',
    }
  } catch (error) {
    const endTime = performance.now()
    console.error('AI Service Error:', error)
    throw new Error(
      error instanceof Error ? error.message : 'Failed to process text with AI'
    )
  }
}

/**
 * Get list of available AI features
 * @returns Array of available features
 */
export function getAvailableFeatures(): { id: AIFeature; label: string; description: string }[] {
  return [
    {
      id: 'summarize',
      label: 'Summarize',
      description: 'Condense text into key points',
    },
    {
      id: 'rewrite',
      label: 'Rewrite',
      description: 'Rephrase for clarity and engagement',
    },
    {
      id: 'improve',
      label: 'Improve',
      description: 'Enhance grammar and clarity',
    },
    {
      id: 'simplify',
      label: 'Simplify',
      description: 'Make text easier to understand',
    },
    {
      id: 'explain',
      label: 'Explain',
      description: 'Get a clear explanation',
    },
    {
      id: 'bulletpoints',
      label: 'Bullet Points',
      description: 'Convert to organized list',
    },
    {
      id: 'professional',
      label: 'Professional',
      description: 'Create business-ready version',
    },
    {
      id: 'study',
      label: 'Study Mode',
      description: 'Learning-focused explanation',
    },
  ]
}

/**
 * Check if local ONNX model is available (future feature)
 * Currently always returns false as this is MVP using cloud AI
 */
export function isLocalInferenceAvailable(): boolean {
  // Future: Check if ONNX runtime and model are available
  return false
}

/**
 * Get current AI backend status
 * @returns Current backend status
 */
export function getAIBackendStatus(): {
  mode: 'cloud' | 'local'
  npu: 'detected' | 'not-detected' | 'planned'
  description: string
} {
  return {
    mode: 'cloud',
    npu: 'planned',
    description: 'Current MVP uses cloud AI. Future versions will support local inference via Snapdragon NPU.',
  }
}
