const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test', {useNewUrlParser: true, useUnifiedTopology:true})
.then(()=>{
    console.log('Mongodb hosil qilindi...')
}) 

.catch((err)=>{
     console.err('Mongodbda xato...', err)
});

const sizeSchema = new mongoose.Schema({
    h: Number,
    w: Number,
    uom: String
});

const inventorySchema = new mongoose.Schema({
    item: String,
    qty: Number,
    size: sizeSchema,
    status: String
}, { collection: 'inventory'});

const Inventory = mongoose.model('Inventory', inventorySchema);
// async function getInventoryItems(){
//     return await Inventory
//     .find({ status: 'A'})
//     .sort({ item: 1})
//     .select({ item: 1, qty: 1, _id:0})
// }

async function getInventoryItems(){
    return await Inventory
    .find({item: /.*l.*/i })
    .or([{qty: {$lte: 50 }}])
    .sort({ qty: -1})
    .select({ item: 1, qty: 1, _id:0})
}



async function run(){
    const items = await getInventoryItems();
    console.log(items);
}

run();