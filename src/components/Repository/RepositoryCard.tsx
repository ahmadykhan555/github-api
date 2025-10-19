import React from 'react';
import type { GitHubRepository } from '../../types';
import ExternalLinkIcon from '../../assets/icons/external-link.svg';

export const RepositoryCard: React.FC<{ repository: GitHubRepository }> = React.memo(
  ({ repository }) => {
    const handleRepositoryClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
      event.stopPropagation();
    };

    return (
      <div
        key={repository.id}
        className="bg-gray-700 rounded-md p-3 hover:bg-gray-600 transition-colors"
      >
        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0">
            <a
              href={repository.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-300 font-medium text-sm transition-colors block truncate"
            >
              {repository.name}
            </a>
            {repository.description && (
              <p className="text-gray-300 text-xs mt-1 line-clamp-2">{repository.description}</p>
            )}
            <div className="flex space-x-3 text-xs text-gray-400 mt-2">
              <span>Created: {new Date(repository.created_at).toLocaleDateString()}</span>
              <span>Updated: {new Date(repository.updated_at).toLocaleDateString()}</span>
            </div>
          </div>
          <div className="ml-2 flex-shrink-0">
            <a
              onClick={handleRepositoryClick}
              href={repository.html_url}
              target="_blank"
              rel="noopener noreferrer"
            >
              {/* @ts-ignore */}
              <ExternalLinkIcon className={`w-4 h-4 text-white`} />
            </a>
          </div>
        </div>
      </div>
    );
  }
);
