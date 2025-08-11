const {MongoClient}=require("mongodb")

const URI =`mongodb+srv://arunmulawad145:arXEwcn9KFq2wAjm@dreamon5.fek8w41.mongodb.net/`

const client = new MongoClient(URI);

const dbName="NamasteNodeJS"

console.log("aa")
async function run() {
  try {
    const database = client.db(dbName)
    const Collection = database.collection('User');

    // insert One
    // const newUser ={firstName:"Vinod",lastName:"angadi",age:30,mobileno:8884888315}
    // const result =await  Collection.insertOne(newUser)

    // insert Many
    //   const newUsers =[{firstName:"kiran",lastName:"mulawad",age:30,mobileno:1111111111},
    //     {firstName:"rahul",lastName:"mulawad",age:30,mobileno:2222222222}]
    // const result =await  Collection.insertMany(newUsers)


    // find one
    // const query={firstName:"Arun"}
    // const result =await Collection.findOne(query)

    // find All
    // const result =await Collection.find({}).toArray()

    // collection count
    // const result =await Collection.countDocuments()

    // 
    // sort in descending (-1) order by length
//     const query = {};
// const sortFields = { age: -1 };
// const limitNum = 5;
// const cursor = Collection.find(query).sort(sortFields).limit(limitNum);
// for await (const doc of cursor) {
//   console.dir(doc);
// }

// $gt means "greater than"
// const query = { age: { $gt : 25 } };

// $lt means "lesser than"
// const query = { age: { $lt : 25 } };

// $eq means "equall"
// const query = { age: { $eq : 25 } };

// --------- Logical Op
// NOT
// const query = { age: { $not: { $eq: 25 }}};

// AND
// const query ={
//   $and: [
//      { age: { $lt: 30 }},
//      { age: { $gt: 24 }}
//   ]
// };

// ---------- Element Operators
// const query = { isAllowed: { $exists: true } };

// ---------- distinct
// const cursor =await Collection.distinct("firstName");

// exclude Brooklyn restaurants from the output
// const query = { firstName: { $ne: "Vinod" }};
// find the filtered distinct values of "cuisine"
// const cursor =await Collection.distinct("firstName", query);


//  --------- Search

const cursor = Collection.find(query)
for await (const doc of cursor) {
  console.dir(doc);
}




  } finally {
    await client.close();
  }
}
run().catch(console.dir);