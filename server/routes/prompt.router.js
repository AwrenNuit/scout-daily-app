const express = require('express');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const pool = require('../modules/pool');
const router = express.Router();
const CronJob = require('cron').CronJob;

let num = 1;

// CronJob automatically increments prompt id by one each day at midnight
const job = new CronJob('0 0 * * *', function() {
  num = num+1;
});
job.start();

// GET daily prompt
router.get('/', rejectUnauthenticated, (req, res) => {
  let id = [num];
  const SQLquery = `SELECT * FROM prompt 
                    WHERE id = $1;`;
  pool.query(SQLquery, id)
  .then(result=>res.send(result.rows[0]))
  .catch(()=>res.sendStatus(500));
});

module.exports = router;