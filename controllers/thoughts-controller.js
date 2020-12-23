const { User, Thoughts } = require('../models');

const thoughtsController = {
    // gets all thoughts
    getAllThoughts(req, res) {
        Thoughts.find({})
        .select('-__v')
        .then(dbThoughtsData => res.json(dbThoughtsData))
        .catch(err => {
            res.status(400).json(err);
        })
    },
    // get one thought
    getThoughtsById({ params }, res) {
        Thoughts.findOne({ _id: params.id })
        .select('-__v')
        .then(dbThoughtsData => {
            if (!dbThoughtsData) {
                res.status(404).json({ message: 'No thought with this id '});
                return;
            }
            res.json(dbThoughtsData);
        })
        .catch(err => {
            res.status(400).json(err);
        })
    },
    // create a thought
    createThoughts({ params, body }, res) {
        Thoughts.create(body)
        .then(( thoughtData ) => {
            return User.findOneAndUpdate(
                { _id: body.userId },
                { $push: { thoughts: thoughtData } },
                { new: true }
            );
        })
        .then(dbThoughtsData => {
            if (!dbThoughtsData) {
                res.status(404).json({ message: 'No user found with this id!'});
                return;
            }
            res.json(dbThoughtsData);
        })
        .catch(err => res.json(err));
    },
    // update a thought by id
    updateThoughts({ params, body }, res) {
        Thoughts.findOneAndUpdate({ _id: params.thoughtId }, body, { new: true, runValidators: true })
            .then(dbThoughtsData => {
                if (!dbThoughtsData) {
                    res.status(404).json({ message: 'No thought found with this id!' });
                    return;
                }
                res.json(dbThoughtsData);
            })
            .catch(err => res.status(400).json(err));
    },
    // delete a thought
    deleteThoughts({ params }, res) {
        Thoughts.findOneAndDelete({ _id: params.id })
            .then(dbThoughtsData => {
                if (!dbThoughtsData) {
                    res.status(404).json({ message: 'No thought with this id found' });
                    return;
                }
                res.json(dbThoughtsData);
            })
            .catch(err => res.json(err));
    },
    // create a reaction
    createReaction({ params, body }, res) {
        Thoughts.findOneAndUpdate(
            { _id: params.thoughtId },
            { $push: { reactions: body } },
            { new: true, runValidators: true }
        )
        .then(dbThoughtsData => {
            if (!dbThoughtsData) {
                return res.status(404).json({ message: 'No thought with this id' });
            }
            res.json(dbThoughtsData);
        })
        .catch(err => {
            res.status(500).json(err);
        })
    },
    // delete a reaction
    deleteReaction({ params }, res) {
        Thoughts.findOneAndUpdate(
            { _id: params.thoughtId},
            { $pull: { reactions: { reactionsId: params.reactionsId } } },
            { new: true, runValidators: true }
            )
            .then(dbUserData => res.json(dbUserData))
            .catch(err => res.json(err));
    }
};

    module.exports = thoughtsController;
