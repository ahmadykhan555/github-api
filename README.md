# GitHub User Search API

A modern React application for searching GitHub users and viewing their repositories. Built with TypeScript, Vite, and Tailwind CSS, featuring a clean, responsive interface with real-time search capabilities.

## 🚀 Features

- **Real-time User Search**: Search GitHub users with instant results
- **User Profiles**: View user details including avatar, followers, and repository count
- **Repository Browsing**: Expandable user cards to view their repositories
- **Responsive Design**: Mobile-first design with Tailwind CSS
- **Type Safety**: Full TypeScript implementation with proper type definitions
- **State Management**: Zustand for efficient state management
- **Error Handling**: Comprehensive error handling with user-friendly messages
- **Loading States**: Smooth loading indicators and empty states
- **Debounced Search**: Optimized search with debouncing to reduce API calls

## 🛠️ Tech Stack

### Core Technologies

- **React 19.1.1** - Modern React with latest features
- **TypeScript 5.9.3** - Type-safe JavaScript
- **Vite 7.1.7** - Fast build tool and dev server
- **Tailwind CSS 4.1.14** - Utility-first CSS framework

### State Management

- **Zustand 5.0.8** - Lightweight state management

### Development Tools

- **ESLint** - Code linting and formatting
- **Prettier** - Code formatting
- **vite-plugin-svgr** - SVG as React components

## 📁 Project Structure

```
src/
├── components/
│   ├── Base/
│   │   ├── Button.tsx          # Reusable button component
│   │   └── Input.tsx           # Search input with CTA button
│   ├── Repository/
│   │   ├── RepositoryCard.tsx  # Individual repository display
│   │   ├── UserRepositoriesList.tsx  # Repository list container
│   │   └── RepositoryListLoadingState.tsx  # Loading skeleton
│   ├── User/
│   │   ├── UserCard.tsx        # User profile card with expand/collapse
│   │   ├── UserList.tsx        # User list container
│   │   ├── UserSearchDashboard.tsx  # Main search interface
│   │   ├── UserListLoadingState.tsx  # Loading skeleton
│   │   ├── UserListEmptyState.tsx    # Empty state
│   │   └── UserListErrorState.tsx    # Error state
│   ├── Header.tsx              # Application header
│   └── Footer.tsx              # Application footer
├── hooks/
│   ├── useDebounce.ts          # Search debouncing hook
│   ├── useErrorHandling.ts     # Error parsing and handling
│   └── useGithubApi.ts         # GitHub API integration
├── store/
│   ├── useSearchSlice.ts       # Search state management
│   └── useUserSlice.ts         # User selection state management
├── types/
│   ├── github.ts               # GitHub API type definitions
│   └── svg.d.ts                # SVG component type declarations
├── constants/
│   └── github.ts               # API configuration constants
├── assets/
│   └── icons/                  # SVG icon components
│       ├── chevron-down.svg    # Expand/collapse icon
│       ├── external-link.svg   # External link icon
│       └── search.svg          # Search icon
└── App.tsx                     # Main application component
```

## 🔧 Implementation Details

### State Management Architecture

The application uses **Zustand** for state management as the application state is not overly complex and Zustand provides a nice bloatfree solution which is very easy to work with and adheres well to React's hook's structure. There are with two main slices:

#### Search Slice (`useSearchSlice`)

- Manages search term, results, loading state, and errors
- Handles search result pagination and count tracking
- Provides actions for updating search state

#### User Slice (`useUserSlice`)

- Manages selected user and their repositories
- Handles repository loading states and errors
- Provides actions for user selection and repository fetching

### API Integration

#### HTTP Client

- Browser fetch is used as it doesn't require any 3rd party package like axios to be integrated. If there arises a need for complex HTTP Handling I would go for axious or for even better fault tolerance pair it with RTK Query with integrated retry and caching possibilities.

#### GitHub API Hook (`useGithubApi`)

- **Search Users**: `/search/users` endpoint with query parameters
- **User Repositories**: `/users/{username}/repos` endpoint
- **Error Handling**: Comprehensive error parsing for different HTTP status codes
- **Rate Limiting**: Handles GitHub API rate limits gracefully

#### API Configuration

```typescript
const GITHUB_API_BASE = 'https://api.github.com';
const USER_SEARCH_LIMIT = 5; // Limits results for better UX
```

### Component Architecture

#### Base Components

- **BaseInput**: Reusable input with integrated CTA button and tooltips
- **BaseButton**: Configurable button component with multiple variants

#### User Components

- **UserCard**: Expandable card showing user details and repositories
- **UserList**: Container managing user list states (loading, empty, error)
- **UserSearchDashboard**: Main search interface with input and results

#### Repository Components

- **RepositoryCard**: Individual repository display with external links
- **UserRepositoriesList**: Scrollable repository list container

### Type Safety

#### TypeScript Definitions

- **GitHubUser**: Complete user profile interface
- **GitHubRepository**: Repository data structure
- **GitHubSearchResponse**: API response wrapper
- **SVG Components**: Proper typing for imported SVG files

#### Custom Hooks

- **useDebounce**: Generic debouncing hook for search optimization
- **useErrorHandling**: Centralized error parsing and handling
- **useGithubApi**: API integration with error handling

### Performance Optimizations

#### React Optimizations

- **React.memo**: Prevents unnecessary re-renders
- **useCallback**: Memoizes function references
- **Debounced Search**: Reduces API calls during typing

#### UI/UX Enhancements

- **Loading States**: Skeleton loaders for better perceived performance
- **Empty States**: Helpful messages when no results found
- **Error States**: User-friendly error messages
- **Responsive Design**: Mobile-first approach with Tailwind CSS

### Error Handling Strategy

#### API Error Handling

- **Rate Limiting**: Specific handling for 403 status codes
- **Network Errors**: Graceful fallback for connection issues
- **Invalid Responses**: Validation and error reporting
- **Context-Aware**: Different error messages for search vs repository fetching

#### User Experience

- **Error Boundaries**: Prevents application crashes
- **Retry Mechanisms**: Clear error messages with actionable guidance
- **Loading States**: Prevents user confusion during API calls

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd github-api
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start development server**

   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check code formatting

## 🧪 Testing Setup

### Testing Framework

The project is configured for comprehensive testing using:

- **Playwright** - End-to-end testing for user interactions
- **Vitest** - Unit and integration testing (recommended setup)
- **React Testing Library** - Component testing utilities

### Test Structure

```
tests/
├── __mocks__/           # Mock implementations
├── e2e/                 # End-to-end tests
├── unit/                # Unit tests
└── integration/         # Integration tests
```

### Running Tests

```bash
# Run all tests
npm run test

# Run unit tests only
npm run test:unit

# Run e2e tests
npm run test:e2e

# Run tests in watch mode
npm run test:watch

# Generate test coverage report
npm run test:coverage
```

### Test Configuration

- **Playwright**: Configured for cross-browser testing
- **Vitest**: Fast unit testing with TypeScript support
- **Mocking**: GitHub API calls are mocked for reliable testing
- **Coverage**: Minimum 80% code coverage requirement

#### Unit Tests

Test individual components and hooks in isolation:

```typescript
// Example: UserCard.test.tsx
import { render, screen } from '@testing-library/react'
import { UserCard } from './UserCard'

test('renders user information', () => {
  const mockUser = { login: 'testuser', avatar_url: '...' }
  render(<UserCard user={mockUser} />)
  expect(screen.getByText('testuser')).toBeInTheDocument()
})
```

#### Integration Tests

Test component interactions and data flow between multiple parts of the application:

```typescript
// Example: UserSearchIntegration.test.tsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import UserSearchDashboard from './UserSearchDashboard'

test('should handle complete search flow with API integration', async () => {
  // Mock API response
  mockFetch.mockResolvedValueOnce({
    ok: true,
    json: async () => ({
      items: mockUsers,
      total_count: 1,
    }),
  })

  render(<UserSearchDashboard />)

  // Test user interaction
  const searchInput = screen.getByPlaceholderText('Search for a GitHub user...')
  fireEvent.change(searchInput, { target: { value: 'octocat' } })
  fireEvent.keyDown(searchInput, { key: 'Enter' })

  // Verify API integration
  await waitFor(() => {
    expect(mockFetch).toHaveBeenCalledWith(expect.stringContaining('/search/users?q=octocat'))
  })

  // Verify UI updates
  await waitFor(() => {
    expect(screen.getByText('octocat')).toBeInTheDocument()
  })
})
```

**Integration Test Coverage:**

- **Component Integration**: Tests how multiple components work together
- **API Integration**: Verifies proper API calls and response handling
- **State Management**: Tests Zustand store integration with components
- **User Interactions**: Simulates real user workflows (typing, clicking, keyboard events)
- **Error Handling**: Tests error states and recovery mechanisms

#### E2E Tests

Test complete user workflows:

```typescript
// Example: user-search.spec.ts
import { test, expect } from '@playwright/test';

test('user can search and view repositories', async ({ page }) => {
  await page.goto('/');
  await page.fill('[data-testid="search-input"]', 'octocat');
  await page.click('[data-testid="search-button"]');
  await expect(page.locator('[data-testid="user-card"]')).toBeVisible();
});
```

### Mock Strategy

- **API Responses**: Mock GitHub API responses for consistent testing
- **Network Requests**: Intercept and mock fetch calls
- **User Interactions**: Simulate real user behavior

## 🔧 Code Quality & Git Hooks

### Automated Code Quality

The project uses **Husky** and **lint-staged** to ensure code quality and consistency across the entire codebase. This automated system runs quality checks at different stages of the development workflow.

#### Pre-commit Hooks

Before every commit, the following checks are automatically executed:

```bash
# Linting Check
yarn lint
# Code Formatting Check
yarn format:check
```

#### Pre-push Hooks

Before every push, the following check is executed:

```bash
# Run all tests
yarn test:run
```

## 🔍 Usage

1. **Search Users**: Type a username in the search input and press Enter or click "GO!"
2. **View Results**: Browse through the list of matching users
3. **Expand User**: Click on a user card to view their repositories
4. **Browse Repositories**: Scroll through the user's repositories with creation/update dates
5. **External Links**: Click repository names to open them on GitHub
