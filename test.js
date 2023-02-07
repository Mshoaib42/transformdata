const mongoose = require("mongoose");
const Item = require("./models/item"); // Import the Item model
const Category = require("./models/category"); // Import the Category model
const ModifiersGroup = require("./models/modifiersGroup"); // Import the ModifiersGroup model

const data = require("./data.json"); // Import the JSON data

// Connect to the MongoDB database
mongoose.connect("mongodb://localhost:27017/database", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", async () => {
  console.log("Connected to MongoDB");

  // Loop through each item in the JSON data
  for (const item of data) {

      // Loop through each category in the item
        for (const category of item.categories) {
            // Check if the category already exists in the database
            let existingCategory = await Category.findOne({ _id: category._id });
            if (!existingCategory) {
            // If the category does not exist, create a new one
            const newCategory = new Category(category);
            await newCategory.save();
            }
        }

        // Loop through each modifier group in the item
        for (const modifierGroup of item.modifierGroups) {
            // Check if the modifier group already exists in the database
            let existingModifierGroup = await ModifiersGroup.findOne({ _id: modifierGroup._id });
            if (!existingModifierGroup) {
            // If the modifier group does not exist, create a new one
            const newModifierGroup = new ModifiersGroup(modifierGroup);
            await newModifierGroup.save();
            }
        }

      //Print all ModifiersGroup entries
    //   Category.find({}, (err, entries) => {
    //       if (err) {
    //           console.log(err);
    //       } else {
    //           console.log(entries);
    //       }
    //   });
    

        //one-time loop execution check
        console.log("one time pass");

        let existingitem = await Item.findOne({ _id: item._id });
        if (!existingitem) {
            // If the Item does not exist, create a new one
            const newItem = new Item(item);
            // Save the item to the database
            await newItem.save();
        }
  }

  // Close the connection to the MongoDB database
  //mongoose.connection.close();
});
