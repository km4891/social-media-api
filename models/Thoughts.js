const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reactions');

const ThoughtsSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            min: 1,
            max: 280
        },
        username: {
            type: String,
            required: true
        },
        reactions: [ reactionSchema ]
    },
        {
            toJSON: {
                virtuals: true,
                getters: true
            },
            id: false
        }
);

ThoughtsSchema.virtual('reactionCOunt').get(function() {
    return this.reactions.length;
})

const Thoughts = model('Thoughts', ThoughtsSchema);

module.exports = Thoughts;