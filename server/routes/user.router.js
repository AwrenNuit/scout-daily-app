const express = require('express');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const encryptLib = require('../modules/encryption');
const pool = require('../modules/pool');
const userStrategy = require('../strategies/user.strategy');
const router = express.Router();

// Handles Ajax request for user information if user is authenticated
router.get('/', rejectUnauthenticated, (req, res) => {
  res.send(req.user);
});

// GET current user's details
router.get('/details', rejectUnauthenticated, (req, res) => {
  const id = [req.user.id];
  const SQLquery = `SELECT * FROM "user"
                    WHERE id = $1;`;
  pool.query(SQLquery, id)
  .then(response=>res.send(response.rows[0]))
  .catch(()=>res.sendStatus(500));
});

// GET user search results
router.get('/search/:id', (req, res) => {
  const id = ['%' + req.params.id + '%'];
  const SQLquery = `SELECT * FROM "user"
                    WHERE lower(username) SIMILAR TO $1;`;
  pool.query(SQLquery, id)
  .then(response=>res.send(response.rows))
  .catch(()=>res.sendStatus(500));
});

// PUT (update) current user's bio
router.put('/details/bio', rejectUnauthenticated, (req, res) => {
  const id = [req.body.data, req.user.id];
  const SQLquery = `UPDATE "user"
                    SET bio = $1
                    WHERE id = $2;`;
  pool.query(SQLquery, id)
  .then(()=>res.sendStatus(200))
  .catch(()=>res.sendStatus(500));
});

// Handles POST request with new user data
router.post('/register', (req, res, next) => {  
  const username = req.body.username;
  const password = encryptLib.encryptPassword(req.body.password);
  const SQLquery = `INSERT INTO "user" (username, password) VALUES ($1, $2) RETURNING id;`;
  pool.query(SQLquery, [username, password])
  .then(()=>res.sendStatus(201))
  .catch(()=>res.sendStatus(500));
});

// Handles login form authenticate/login POST
router.post('/login', userStrategy.authenticate('local'), (req, res) => {
  res.sendStatus(200);
});

// clear all server session information about this user
router.post('/logout', (req, res) => {
  req.logout();
  res.sendStatus(200);
});

// PUT (update) current user's username
router.put('/details/username', rejectUnauthenticated, (req, res) => {
  const id = [req.body.data, req.user.id];
  const SQLquery = `UPDATE "user"
                    SET username = $1
                    WHERE id = $2;`;
  pool.query(SQLquery, id)
  .then(()=>res.sendStatus(200))
  .catch(()=>res.sendStatus(500));
});

module.exports = router;