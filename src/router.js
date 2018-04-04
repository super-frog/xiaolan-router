/**
 * Created by lanhao on 2017/8/14.
 */

'use strict';

class Router {
  constructor() {
    this.prefix = '';
    this.data = {};
    this.middleware = [];
  }

  use(middleware) {
    this.middleware.push(middleware);
    return this;
  }

  get(path, handler) {
    this.data.get = this.data.get || {};
    if (path !== '') {
      path = path.startsWith('/') ? path : '/' + path;
    }
    this.data.get[this.prefix + path] = {
      handler,
      middleware: Array.from(this.middleware),
    };
    return this;
  }

  put(path, handler) {
    this.data.put = this.data.put || {};
    if (path !== '') {
      path = path.startsWith('/') ? path : '/' + path;
    }
    this.data.put[this.prefix + path] = {
      handler,
      middleware: Array.from(this.middleware),
    };
    return this;
  }

  post(path, handler) {
    this.data.post = this.data.post || {};
    if (path !== '') {
      path = path.startsWith('/') ? path : '/' + path;
    }
    this.data.post[this.prefix + path] = {
      handler,
      middleware: Array.from(this.middleware),
    };
    return this;
  }

  delete(path, handler) {
    this.data.delete = this.data.delete || {};
    if (path !== '') {
      path = path.startsWith('/') ? path : '/' + path;
    }
    this.data.delete[this.prefix + path] = {
      handler,
      middleware: Array.from(this.middleware),
    };

    return this;
  }

  group(prefix) {
    this.prefix = prefix.startsWith('/') ? prefix : '/' + prefix;
    return this;
  }

  reset() {
    this.prefix = '';
    this.middleware = [];
    return this;
  }

  map() {
    let map = {};
    for (let method in this.data) {
      for (let path in this.data[method]) {
        map[`${method} ${path}`] = {
          handler: this.data[method][path]['handler'],
          middleware: this.data[method][path]['middleware'],
        };
      }
    }
    return map;
  }
}

module.exports = Router;
