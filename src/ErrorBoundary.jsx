import React from 'react';
import { AlertTriangle, RotateCcw } from 'lucide-react';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('TextTrace Uncaught Error:', error, errorInfo);
    this.setState({ errorInfo });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#0B0D12] text-slate-100 flex items-center justify-center p-6 font-sans">
          <div className="max-w-xl w-full p-8 rounded-2xl bg-[#141821] border border-[#FF6B70]/40 space-y-4 shadow-2xl">
            <div className="flex items-center gap-3 text-[#FF6B70]">
              <AlertTriangle className="w-8 h-8 shrink-0" />
              <div>
                <h2 className="text-xl font-bold text-white">Something went wrong</h2>
                <p className="text-xs text-slate-400">An unexpected runtime error occurred</p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-[#0B0D12] border border-[#242C3D] font-mono text-xs text-[#FF6B70] overflow-x-auto">
              {this.state.error?.toString()}
            </div>

            <button
              onClick={() => {
                this.setState({ hasError: false, error: null });
                window.location.reload();
              }}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#8B7CFF] text-white text-xs font-semibold hover:opacity-90 transition-all"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Reload Application</span>
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

