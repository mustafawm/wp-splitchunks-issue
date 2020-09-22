import React, { ReactNode, ReactElement } from 'react';
import { url } from 'shared/consts';

type State = { hasError: boolean; error: null | object };

export default class ErrorBoundary extends React.Component {
  state: State = {
    hasError: false,
    error: null,
  };

  static getDerivedStateFromError(error: null | object): State {
    return {
      hasError: true,
      error: error,
    };
  }

  componentDidCatch(error: object, errorInfo: object): void {
    // TODO send crash info to some backend
    // eslint-disable-next-line no-console
    console.error(error, errorInfo);
  }

  render(): ReactElement | ReactNode {
    if (this.state.hasError) {
      return (
        <div className="w-full flex flex-col justify-center m-4">
          <span className="flex items-center text-lg">
            <p className="font-bold mr-1">Something went wrong!</p>
            <span role="img" aria-label="sad face emoji">
              ☹️
            </span>
          </span>
          <p className="py-1">Please try one of the following:</p>
          <div className="flex items-center space-x-2 mt-3">
            <button
              data-testid="refresh"
              className="px-2 py-1 border border-gray-600 rounded hover:border-blue-700 hover:bg-blue-700 hover:text-white"
              onClick={() => window.location.reload(true)}
            >
              <span className="flex items-center">
                <span role="img" aria-label="refresh icon">
                  🔄
                </span>
                <span className="px-1">Refresh</span>
              </span>
            </button>
            <span className="mx-px">or</span>
            <a
              data-testid="logout"
              href={`${url.web.logout}?hardLogout=true`}
              className="py-1 text-blue-700 underline hover:text-blue-600"
            >
              clear site data and login again
            </a>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
