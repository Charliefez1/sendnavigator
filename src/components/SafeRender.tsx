import { Component, ReactNode } from "react";

interface Props {
  children: ReactNode;
  /** Optional fallback; defaults to nothing */
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
}

/**
 * Lightweight error boundary that silently catches crashes in a subtree.
 * Use around components that do risky operations (DOM manipulation, network, etc.)
 * so a single failure doesn't white-screen the whole page.
 */
export class SafeRender extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error) {
    console.warn("SafeRender caught:", error.message);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback ?? null;
    }
    return this.props.children;
  }
}
