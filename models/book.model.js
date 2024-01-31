const {Schema, model, default: mongoose} = require('mongoose');

const bookSchema = Schema({
    title: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true
    },
    publishedYear: {
        type: Number,
        required: true
    },
    postedBy: {
        type: String,
        required: true,
    },
    createdAt: { type: Date, default: Date.now }
});

const booksModel = model("book", bookSchema);

module.exports = booksModel;