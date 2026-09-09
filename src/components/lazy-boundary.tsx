"use client";

import React, { Component } from "react";

interface Props {
  children: React.ReactNode;
  fallback: React.ReactNode;
}

/**
 * Catches failures from lazily-loaded components — including ChunkLoadError,
 * which a boundary inside the lazy component itself cannot catch, since the
 * chunk never loaded. Without this, one failed chunk request takes down the
 * whole page instead of just the widget that could not load.
 */
export class LazyBoundary extends Component<Props, { hasError: boolean }> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) return this.props.fallback;
    return this.props.children;
  }
}
