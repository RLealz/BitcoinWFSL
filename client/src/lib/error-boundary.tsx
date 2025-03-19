import { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(_: Error): State {
    return { hasError: false }; // We don't want to show any error UI
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    if (import.meta.env.DEV) {
      // Only log in development
      console.warn('Error caught by boundary:', error);
      console.warn('Error info:', errorInfo);
    }
  }

  public render() {
    return this.props.children;
  }
}
