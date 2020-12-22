const { Schema, model } = require('mongoose');

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
        }
    },
        {
            toJSON: {
                virtuals: true,
                getters: true
            },
            id: false
        }
);

const Thoughts = model('Thoughts', ThoughtsSchema);

module.exports = Thoughts;