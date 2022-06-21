export default class Server {
  constructor (expressApp) {
    this.expressApp = expressApp;
  }

  setupMiddlewares (middlewares) {
    for (const middleware of middlewares) {
      this.expressApp.use(middleware);
    }
  }

  setupRoutes (routes) {
    for (const route of routes) {
      const [ collection, methods ] = route;

      for (const method in methods) {
        const [ path, handler ] = methods[method];

        const fullPath = collection + path;
        this.expressApp[method.toLocaleLowerCase()](fullPath, handler);
      }
    }
  }

  setup (middlewares, routes) {
    this.setupMiddlewares(middlewares);
    this.setupRoutes(routes);
  }

  stop () {
    return new Promise((resolve) => {
      this.expressServer.close(resolve);
    });
  }

  start (port) {
    return new Promise((resolve) => {
      this.expressServer = this.expressApp.listen(port, resolve);
    });
  }
}
