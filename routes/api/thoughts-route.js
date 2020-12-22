const router = require('express').Router();

const {
    getAllThoughts,
    getThoughtsById,
    createThoughts,
    updateThoughts,
    deleteThoughts,
    createReaction,
    deleteReaction
} = require('../../controllers/thoughts-controller');

// api/thoughts
router
    .route('/')
    .get(getAllThoughts)
    .post(createThoughts);
// api/thoughts/:id
router
    .route('/:id')
    .get(getThoughtsById)
    .put(updateThoughts)
    .delete(deleteThoughts);

// api/thoughts/:thoughtId/reactions
router
    .route('/:thoughtId/reactions')
    .post(createReaction);

// api/thoughts/:thoughtid/reactions/reactionId
router
    .route('/:thoughtId/reactions/:reactionId')
    .delete(deleteReaction);

    module.exports = router;
