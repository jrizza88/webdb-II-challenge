const router = require('express').Router();

const knex = require('knex');
const knexConfig = require('../knexfile');

const db = knex(knexConfig.development);


router.get('/', async (req, res) => {
    try{
        const bears = await db('bears');
        res.status(200).json(bears)
    } catch (error) {
        res.status(500).json({error: 'cannot find bears'})
    }
});

module.exports = router;