const mongoose = require("mongoose");
const Item = require("./models/item"); // Import the Item model
const Category = require("./models/categories"); // Import the Category model
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
    const saveCategories = categories => {
        return Promise.all(categories.map(async category => {
            const newCategory = new Category({
                name: category.name,
                description: category.description
            });
        
            return await newCategory.save();
        }));
    };
    //Par
    const saveModifierGroups = modifierGroups => {
        return Promise.all(Object.values(modifierGroups).map(async modifierGroup => {
            const newModifierGroup = new ModifiersGroup({
                name: modifierGroup.name,
                subProducts: modifierGroup.subProducts
            });
        
            return await newModifierGroup.save();
        }));
    };

    const saveItems = (data) => {
        return Promise.all(data.map(async item => {
            const categories = await saveCategories(item.categories);
            const modifierGroups = await saveModifierGroups(item.modifierGroups);
            
            const newItem = new Item({
                name: item.menu,
                description: item.description,
                categories: categories.map(category => 
                    mongoose.Types.ObjectId.isValid(category._id) ? 
                    mongoose.Types.ObjectId(category._id) : 
                    category._id
                ),
                modifierGroups: modifierGroups.map(modifierGroup => {
                    if (mongoose.Types.ObjectId.isValid(modifierGroup._id)) {
                        return mongoose.Types.ObjectId(modifierGroup._id);
                    } else {
                        throw new Error(`Invalid ObjectId value: ${modifierGroup._id}`);
                    }
                })
            });
            //console.log("check point");
            //console.log(newItem);
            return await newItem.save();
        }));
    };
    
      
  
  // Close the connection to the MongoDB database
    saveItems(data).then(() => {
        console.log('Item saved successfully');
        mongoose.connection.close();
    }).catch(error => {
        console.error(error);
    });
});
