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

The application uses **Zustand** for state management with two main slices:

#### Search Slice (`useSearchSlice`)

- Manages search term, results, loading state, and errors
- Handles search result pagination and count tracking
- Provides actions for updating search state

#### User Slice (`useUserSlice`)

- Manages selected user and their repositories
- Handles repository loading states and errors
- Provides actions for user selection and repository fetching

### API Integration

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

## 🎨 Design System

### Color Palette

- **Background**: Dark gray (`bg-gray-800/95`)
- **Cards**: Medium gray (`bg-gray-600`, `bg-gray-700`)
- **Text**: White and light gray variants
- **Accents**: Blue for links, green for CTAs

### Typography

- **Headings**: Font weight 600-700
- **Body**: Font weight 400-500
- **Sizes**: Responsive text sizing with Tailwind utilities

### Spacing

- **Consistent**: 4px base unit system
- **Responsive**: Mobile-first spacing with breakpoint adjustments
- **Component**: Internal padding and margins standardized

## 🔍 Usage

1. **Search Users**: Type a username in the search input and press Enter or click "GO!"
2. **View Results**: Browse through the list of matching users
3. **Expand User**: Click on a user card to view their repositories
4. **Browse Repositories**: Scroll through the user's repositories with creation/update dates
5. **External Links**: Click repository names to open them on GitHub

## 🚀 Deployment

The application is built with Vite and can be deployed to any static hosting service:

```bash
npm run build
```

The built files will be in the `dist/` directory, ready for deployment to services like:

- Vercel
- Netlify
- GitHub Pages
- AWS S3 + CloudFront

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.
