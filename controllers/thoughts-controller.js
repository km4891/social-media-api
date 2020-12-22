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
        .then(({ _id }) => {
            return User.findOneAndUpdate(
              { _id: params.userId },
              { $push: { thoughts: _id } },
              { new: true, runValidators: true }
            );
          })
          .then(dbUserData => {
            if (!dbUserData) {
              res.status(404).json({ message: 'No user found with this id!' });
              return;
            }
            res.json(dbUserData);
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
    }

    module.exports = thoughtsController;
