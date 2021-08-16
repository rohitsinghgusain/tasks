const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/practice", {
    useNewurlParser: true,
    useUnifiedTopology: true,
    useCreateIndexes: true
}).then(()=>{
    console.log(`connection is succesful`);
}).catch((err)=>{
    console.log(`connection not created`);
})
