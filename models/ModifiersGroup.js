const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const ModifiersGroupSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    subProducts: {
        type: [String],
        default: "",
        required: true
    }
});

module.exports = mongoose.model("ModifiersGroup", ModifiersGroupSchema);




