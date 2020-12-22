const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reactions');
const dateFormat = require('../utils/dateFormat');

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
        createdAt: {
            type: Date,
            default: Date.now,
            get: (createdAtVal) => dateFormat(createdAtVal)
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

ThoughtsSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
})

const Thoughts = model('Thoughts', ThoughtsSchema);

module.exports = Thoughts;