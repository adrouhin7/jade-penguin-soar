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
    // Ignorer les erreurs "removeChild" de Radix Portal/Select
    // Ces erreurs sont courantes lors de la fermeture de portals
    if (error.message && error.message.includes('removeChild')) {
      console.warn('⚠️ Portal cleanup error caught and ignored (Radix Select):', error.message);
      return { hasError: true };
    }
    // Ignorer aussi les erreurs liées au unmounting des portals
    if (error.message && error.message.includes('not a child')) {
      console.warn('⚠️ Node cleanup error caught and ignored:', error.message);
      return { hasError: true };
    }
    throw error;
  }

  componentDidCatch(error: Error) {
    if (error.message && (error.message.includes('removeChild') || error.message.includes('not a child'))) {
      // Log mais ne crash pas
      console.warn('⚠️ Safe error boundary caught:', error.message);
      // Réinitialiser l'état après un court délai pour permettre à React de continuer
      setTimeout(() => {
        this.setState({ hasError: false });
      }, 0);
    } else {
      // Pour les autres erreurs, log normalement
      console.error('Error caught by boundary:', error);
    }
  }

  render() {
    // Toujours render les enfants, même en cas d'erreur
    // Les erreurs de Portal ne doivent pas bloquer l'UI
    return this.props.children;
  }
}
