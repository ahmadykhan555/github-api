import { test, expect } from '@playwright/test';

test.describe('GitHub User Search E2E Flow', () => {
  test('complete user search flow: input -> search -> select user -> view repos -> select different user', async ({
    page,
  }) => {
    // Mock GitHub API responses
    await page.route('**/search/users*', async (route) => {
      const url = new URL(route.request().url());
      const query = url.searchParams.get('q');

      if (query === 'octocat') {
        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify({
            items: [
              {
                id: 1,
                login: 'octocat',
                avatar_url: 'https://github.com/images/error/octocat_happy.gif',
                html_url: 'https://github.com/octocat',
                type: 'User',
                name: 'The Octocat',
                public_repos: 8,
                public_gists: 8,
                followers: 1000,
                following: 9,
                created_at: '2011-01-25T18:44:36Z',
                updated_at: '2023-01-01T00:00:00Z',
              },
              {
                id: 2,
                login: 'octocat2',
                avatar_url: 'https://github.com/images/error/octocat_happy.gif',
                html_url: 'https://github.com/octocat2',
                type: 'User',
                name: 'Octocat 2',
                public_repos: 5,
                public_gists: 3,
                followers: 500,
                following: 10,
                created_at: '2012-01-01T00:00:00Z',
                updated_at: '2023-01-01T00:00:00Z',
              },
            ],
            total_count: 2,
          }),
        });
      } else {
        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify({ items: [], total_count: 0 }),
        });
      }
    });

    // Mock user repositories API
    await page.route('**/users/*/repos*', async (route) => {
      const url = new URL(route.request().url());
      const username = url.pathname.split('/')[2];

      if (username === 'octocat') {
        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify([
            {
              id: 1,
              name: 'Hello-World',
              full_name: 'octocat/Hello-World',
              html_url: 'https://github.com/octocat/Hello-World',
              description: 'This is your first repository',
              stargazers_count: 80,
              language: 'JavaScript',
              created_at: '2011-01-26T19:01:12Z',
              updated_at: '2023-01-01T00:00:00Z',
            },
            {
              id: 2,
              name: 'Spoon-Knife',
              full_name: 'octocat/Spoon-Knife',
              html_url: 'https://github.com/octocat/Spoon-Knife',
              description: 'This repository is for demonstration purposes only',
              stargazers_count: 120,
              language: 'HTML',
              created_at: '2011-01-27T19:01:12Z',
              updated_at: '2023-01-01T00:00:00Z',
            },
          ]),
        });
      } else if (username === 'octocat2') {
        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify([
            {
              id: 3,
              name: 'Different-Repo',
              full_name: 'octocat2/Different-Repo',
              html_url: 'https://github.com/octocat2/Different-Repo',
              description: 'A different repository',
              stargazers_count: 50,
              language: 'TypeScript',
              created_at: '2012-01-01T00:00:00Z',
              updated_at: '2023-01-01T00:00:00Z',
            },
          ]),
        });
      } else {
        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify([]),
        });
      }
    });

    // Navigate to the app
    await page.goto('/');

    // Step 1: Verify initial state
    await expect(page.getByPlaceholder('Search for a GitHub user...')).toBeVisible();
    await expect(page.getByText('Enter a username above to search for GitHub users')).toBeVisible();

    // Step 2: Type in search input
    const searchInput = page.getByPlaceholder('Search for a GitHub user...');
    await searchInput.fill('octocat');
    await expect(searchInput).toHaveValue('octocat');

    // Step 3: Click GO button to search
    // Wait for the button to be visible and enabled
    await page.waitForSelector('button:has-text("GO!")');
    const goButton = page.locator('button:has-text("GO!")');
    await expect(goButton).toBeVisible();
    await expect(goButton).toBeEnabled();
    await goButton.click();

    // Step 4: Wait for search results to appear
    await expect(page.getByText('Showing 2 of 2 results for:')).toBeVisible();
    await expect(page.getByText('"octocat"')).toBeVisible();

    // Verify user cards are displayed
    const firstUserCard = page.locator('.bg-gray-600').filter({ hasText: 'octocat' }).first();
    const secondUserCard = page.locator('.bg-gray-600').filter({ hasText: 'octocat2' });

    await expect(firstUserCard).toBeVisible();
    await expect(firstUserCard.getByText('The Octocat')).toBeVisible();
    await expect(firstUserCard.getByText('1000 followers')).toBeVisible();
    await expect(firstUserCard.getByText('8 repos')).toBeVisible();

    await expect(secondUserCard).toBeVisible();
    await expect(secondUserCard.getByText('Octocat 2')).toBeVisible();
    await expect(secondUserCard.getByText('500 followers')).toBeVisible();
    await expect(secondUserCard.getByText('5 repos')).toBeVisible();

    // Step 5: Select first user (octocat)
    // Wait for the repositories API call to complete
    const reposPromise = page.waitForResponse('**/users/octocat/repos*');
    // Click on the user card by targeting the specific user login text in the card
    await page.locator('.bg-gray-600').filter({ hasText: 'octocat' }).first().click();
    await reposPromise;

    // Step 6: Wait for repositories to load
    // First wait for the repositories section to appear
    await expect(page.getByText('Repositories (2)')).toBeVisible();

    // Wait for individual repositories to load
    await expect(page.getByText('Hello-World')).toBeVisible();
    await expect(page.getByText('This is your first repository')).toBeVisible();
    await expect(page.getByText('Spoon-Knife')).toBeVisible();
    await expect(
      page.getByText('This repository is for demonstration purposes only')
    ).toBeVisible();

    // Step 7: Select second user (octocat2)
    // Wait for the repositories API call to complete
    const reposPromise2 = page.waitForResponse('**/users/octocat2/repos*');
    // Click on the second user card
    await page.locator('.bg-gray-600').filter({ hasText: 'octocat2' }).click();
    await reposPromise2;

    // Step 8: Wait for different repositories to load
    // Wait for the repositories count to change
    await expect(page.getByText('Repositories (1)')).toBeVisible();

    // Wait for the new repository to load
    await expect(page.getByText('Different-Repo')).toBeVisible();
    await expect(page.getByText('A different repository')).toBeVisible();

    // Verify the first user's repositories are no longer visible
    await expect(page.getByText('Hello-World')).not.toBeVisible();
    await expect(page.getByText('Spoon-Knife')).not.toBeVisible();

    // Step 9: Click on the same user again to deselect
    await page.locator('.bg-gray-600').filter({ hasText: 'octocat2' }).click();

    // Repositories should be hidden
    await expect(page.getByText('Repositories (1)')).not.toBeVisible();
    await expect(page.getByText('Different-Repo')).not.toBeVisible();
  });
});
