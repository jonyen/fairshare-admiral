import '@testing-library/jest-dom'
import { vi } from 'vitest'

// Mock MSW worker for tests
vi.mock('../backend', () => ({
  worker: {
    start: vi.fn(),
  },
}))

// Mock environment variables
vi.stubEnv('NODE_ENV', 'test')

// Global test setup
beforeEach(() => {
  // Clear all mocks before each test
  vi.clearAllMocks()
})
