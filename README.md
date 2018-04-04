```
  "use strict";
  const Router = require('xiaolan-router');

  let router = new Router();

  router.put('', 'index.list');

  router.post('/user', 'user.create');

  router.group('book')
    .use('book.preCheck')
    .get('{id}', 'book.detail')
    .put('{id}', 'book.update')
    .reset();

  router.get('info', 'monitor.info');

  console.dir(router.map())
  /*
  
  { 
  'put ': { handler: 'index.list', middleware: [] },
  'put /book/{id}': { handler: 'book.update', middleware: [ 'book.preCheck' ] },
  'post /user': { handler: 'user.create', middleware: [] },
  'get /book/{id}': { handler: 'book.detail', middleware: [ 'book.preCheck' ] },
  'get /info': { handler: 'monitor.info', middleware: [] } 
  }

  */
  process.exit(0);

```