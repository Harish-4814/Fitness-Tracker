const mongoose = require("mongoose");
const Food = require("./models/Food");

mongoose.connect("mongodb://127.0.0.1:27017/fitnessTrackerDB")
.then(() => {
    console.log("MongoDB Connected");
})
.catch((err) => {
    console.log(err);
});

const foods = [

{
name:"Rice",
type:"veg",
calories:130,
protein:2.7,
carbs:28,
fats:0.3
},

{
name:"Roti",
type:"veg",
calories:297,
protein:9,
carbs:46,
fats:7
},

{
name:"Paneer",
type:"veg",
calories:265,
protein:18,
carbs:6,
fats:20
},

{
name:"Dal",
type:"veg",
calories:116,
protein:9,
carbs:20,
fats:0.4
},

{
name:"Milk",
type:"veg",
calories:61,
protein:3.2,
carbs:5,
fats:3.3
},

{
name:"Curd",
type:"veg",
calories:98,
protein:11,
carbs:4,
fats:4
},

{
name:"Oats",
type:"veg",
calories:389,
protein:17,
carbs:66,
fats:7
},

{
name:"Banana",
type:"veg",
calories:89,
protein:1.1,
carbs:23,
fats:0.3
},

{
name:"Apple",
type:"veg",
calories:52,
protein:0.3,
carbs:14,
fats:0.2
},

{
name:"Almonds",
type:"veg",
calories:579,
protein:21,
carbs:22,
fats:50
},

{
name:"Peanut Butter",
type:"veg",
calories:588,
protein:25,
carbs:20,
fats:50
},

{
name:"Soy Chunks",
type:"veg",
calories:345,
protein:52,
carbs:33,
fats:1
},

{
name:"Tofu",
type:"veg",
calories:144,
protein:17,
carbs:3,
fats:9
},

{
name:"Chicken Breast",
type:"nonveg",
calories:165,
protein:31,
carbs:0,
fats:3.6
},

{
name:"Eggs",
type:"nonveg",
calories:155,
protein:13,
carbs:1.1,
fats:11
},

{
name:"Fish",
type:"nonveg",
calories:206,
protein:22,
carbs:0,
fats:12
},

{
name:"Mutton",
type:"nonveg",
calories:294,
protein:25,
carbs:0,
fats:21
},

{
name:"Prawns",
type:"nonveg",
calories:99,
protein:24,
carbs:0,
fats:1
},

{
name:"Chicken Curry",
type:"nonveg",
calories:190,
protein:20,
carbs:5,
fats:10
},

{
name:"Boiled Egg White",
type:"nonveg",
calories:52,
protein:11,
carbs:0.7,
fats:0.2
},

{
name:"Tuna",
type:"nonveg",
calories:132,
protein:29,
carbs:0,
fats:1
}

];

async function seedFoods(){

    try{

        await Food.deleteMany();

        await Food.insertMany(foods);

        console.log("Foods Inserted Successfully");

        mongoose.connection.close();

    }
    catch(error){

        console.log(error);

    }

}

seedFoods();