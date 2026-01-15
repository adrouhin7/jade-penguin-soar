import React, { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    // Ignorer l'erreur "removeChild" de Radix Portal
    if (error.message.includes('removeChild')) {
      return { hasError: true };
    }
    throw error;
  }

  componentDidCatch(error: Error) {
    if (error.message.includes('removeChild')) {
      console.warn('⚠️ Portal cleanup error ignored (Radix Select)');
      // Réinitialiser l'état après un court délai
      setTimeout(() => {
        this.setState({ hasError: false });
      }, 0);
    }
  }

  render() {
    if (this.state.hasError) {
      return this.props.children;
    }
    return this.props.children;
  }
}
