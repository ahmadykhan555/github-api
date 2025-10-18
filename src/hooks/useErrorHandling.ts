export const useErrorHandling = () => {
  const parseAPIError = ({
    error,
    statusCode = -1,
    context,
    method = 'GET',
  }: {
    error?: unknown;
    statusCode?: number;
    context: 'search' | 'repositories';
    method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  }): { errorMessage: string; throwException: boolean } => {
    let errorMessage = '';

    if (statusCode === 403) {
      errorMessage = `${method} ${context} failed: GitHub API rate limit exceeded. Please try again later.`;
    } else if (error) {
      errorMessage = `${method} ${context} failed: ${error instanceof Error ? error.message : 'An unexpected error occurred'}`;
    } else {
      errorMessage = `${method} ${context} failed: An unexpected error occurred}`;
    }

    return {
      errorMessage,
      throwException: [403, 500].includes(statusCode),
    };
  };

  return {
    parseAPIError,
  };
};
