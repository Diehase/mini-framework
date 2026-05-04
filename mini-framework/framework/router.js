// framework/router.js

export class Router {
  constructor(store) {
    this.store = store;
    window.addEventListener('hashchange', () => this.handleRoute());
  }

  handleRoute() {
    const hash = window.location.hash.replace('#', '') || '/';
    this.store.setState({ filter: hash });
  }

  init() {
    this.handleRoute();
  }
}