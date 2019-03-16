
const router = require('express').Router();

const knex = require('knex');
const knexConfig = require('../knexfile');

const db = knex(knexConfig.development);

router.get('/', async (req, res) => {
    try {
        const zoo = await db('zoos');
        res.status(200).json(zoo);
    } catch (error){
        res.status(500).json({error: 'error with get request'})
    }
});

router.get('/:id', async (req, res) => {
    try {
        const {id} = req.params
        const zoo = await db('zoos')
        .where({id})
        .first()
        res.status(200).json(zoo);
    } catch (error){
        res.status(500).json({error: 'error with get request'})
    }
});

router.post('/', async (req, res) => {
   try{
        
        const [id] = await db('zoos').insert(req.body);
        const zoo = await db('zoos')
        .where({ id })
        .first();
        res.status(201).json(zoo);

   } catch (error) {
    const message = errors[error.errno] || "We ran into a post error";
        res.status(500).json({message, error})
   }
});

router.put('/:id', async (req, res) => {
    try{
        const {id} = req.params;

        const edit = await db('zoos')
            .where({id})
            .update(req.body)

        if(edit > 0) {
            const zoo = await db('zoos')
                .where({id})
                .first()
                res.status(201).json(edit)
        } else {
            res.status(404).json({message: 'This animal is not in our zoo!'})
        }
    } catch (error) {
        res.status(500).json({message: "error with changing the animal"})
    }
});

module.exports = router;

		// "start": "nodemon index.js"