// MonkeyType API Response Types
export interface MonkeyTypeAPIResponse {
  message: string
  data: MonkeyTypeResult
}

export interface MonkeyTypeResult {
  _id: string
  uid: string
  wpm: number
  rawWpm: number
  charStats: number[] // Array format: [correct, incorrect, extra, missed]
  acc: number
  mode: string
  mode2: string
  timestamp: number
  testDuration: number
  consistency: number
  keyConsistency: number
  isPb: boolean // Personal Best
}

// Custom error classes
export class MonkeyTypeAPIError extends Error {
  constructor(
    message: string,
    public status?: number,
    public endpoint?: string
  ) {
    super(message)
    this.name = 'MonkeyTypeAPIError'
  }
}

export class MonkeyTypeNotFoundError extends Error {
  constructor(endpoint: string) {
    super(`MonkeyType endpoint '${endpoint}' not found`)
    this.name = 'MonkeyTypeNotFoundError'
  }
}
