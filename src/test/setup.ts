import '@testing-library/jest-dom'
import { vi } from 'vitest'
import { server } from '../testutils'

// Mock MSW worker for tests
vi.mock('../backend', () => ({
  worker: {
    start: vi.fn(),
  },
}))

// Mock environment variables
vi.stubEnv('NODE_ENV', 'test')

// Setup MSW server
beforeAll(() => {
  server.listen({ onUnhandledRequest: 'error' })
})

// Global test setup
beforeEach(() => {
  // Clear all mocks before each test
  vi.clearAllMocks()
})

afterEach(() => {
  server.resetHandlers()
})

afterAll(() => {
  server.close()
})
