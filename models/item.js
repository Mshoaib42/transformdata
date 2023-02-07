const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ItemSchema = new Schema({
    name: {
        type: String,
    },
    description: {
        type: String
    },
    categories: [{
        type: Schema.Types.ObjectId,
        ref: "categories"
    }],
    modifierGroups: [
    {
        type: Schema.Types.ObjectId,
        ref: "ModifiersGroup"
    }
]});

module.exports = mongoose.model("Item", ItemSchema);
