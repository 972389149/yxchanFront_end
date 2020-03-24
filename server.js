const express = require('express')
const next = require('next')

const dev = process.env.NODE_ENV !== 'production';
const app = next({dev});
const handle = app.getRequestHandler();


app.prepare()
  .then(() => {
    const server = express();
    server.get('/acnts/acnt/:user', (req, res) => {
      const actualPage = '/acnts/acnt';
      const queryParams = {user: req.params.user};
      app.render(req, res, actualPage, queryParams);
    });
    server.get('/articles/article/:id', (req, res) => {
      const actualPage = '/articles/article';
      const queryParams = {id: req.params.id};
      app.render(req, res, actualPage, queryParams);
    });
    server.get('/articles/edit/:id', (req, res) => {
      const actualPage = '/articles/edit';
      const queryParams = {id: req.params.id};
      app.render(req, res, actualPage, queryParams);
    });

    server.get('*', (req, res) => {
      return handle(req, res);
    });
    server.listen(3000, (err) => {
      if (err) throw err;
      console.log('> Ready on http://localhost:3000');
    });
  })
  .catch((ex) => {
    console.error(ex.stack);
    process.exit(1);
  });