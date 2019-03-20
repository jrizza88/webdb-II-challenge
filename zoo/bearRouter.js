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

router.get('/:id', async(req, res) => {
    try{
        const {id} = req.params
            const bear = await db('bears')
            .where({id})
            .first()
            res.status(200).json(bear)
         if (!bear) {
            res.status(404).json({message: 'There is no bear here, try a different route'})
        }
    } catch (error){
        res.status(500).json({error: 'get id error'})
    }
});

router.post('/', async (req, res) => {
    try {
        const bear = req.body;

        const newBear = await db('bears')
            .insert(bear)
            .into('bears')
            res.status(201).json(newBear)
    } catch(error) {
        res.status(500).json({error: 'post bear error'});
    }
});

router.put('/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const theBears = req.body;

        const changeBear = await db('bears')
            .where({id})
            .update(theBears)

            if (changeBear > 0) {
            const bear = await db('bears')
            .where({id})
            .first()
                res.status(201).json(changeBear)
            } else {
                res.status(404).json({message: 'No bear is here...'})
            }
    } catch (error) {
        res.status(500).json({error: 'put request bear error'});
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const theBears = req.body;

        const removeBear = await db('bears')
            .where({id})
            .delete()
        if (removeBear > 0) {
            res.status(204).end()
        } else {
            res.status(404).json({message: 'Bear not found'})
        }
    } catch (error){
        res.status(500).json({error: 'delete request bear error'});
    }
});

module.exports = router;