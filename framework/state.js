// framework/state.js

export class Store {
  constructor(initialState) {
    this.listeners = [];
    // Load state from localStorage if available
    const savedState = localStorage.getItem('mini-framework-state');
    if (savedState) {
      try {
        this.state = { ...initialState, ...JSON.parse(savedState) };
      } catch (e) {
        console.warn('Failed to parse state from localStorage', e);
        this.state = initialState;
      }
    } else {
      this.state = initialState;
    }
  }

  getState() {
    return this.state;
  }

  setState(newState) {
    this.state = { ...this.state, ...newState };
    // Save state to localStorage
    try {
      localStorage.setItem('mini-framework-state', JSON.stringify(this.state));
    } catch (e) {
      console.warn('Failed to save state to localStorage', e);
    }
    this.listeners.forEach(listener => listener(this.state));
  }

  subscribe(listener) {
    this.listeners.push(listener);
  }
}