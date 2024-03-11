const mongoose = require("mongoose");
const Schema = mongoose.Schema

const orchidsSchema = new Schema(
    {
        name: {
            type: String,
            require: true,
            unique: true
        },
        image: {
            type: String,
            require: true
        },
        price: {
            type: Number,
            require: true
        },
        original: {
            type: Boolean,
            require: true
        },
        isNatural: {
            type: Boolean,
            require: true
        },
        color: {
            type: String,
            require: true
        }
    },
    {
        timestamps: true
    }
);

var Orchids = mongoose.model('orchids', orchidsSchema);
module.exports = Orchids;