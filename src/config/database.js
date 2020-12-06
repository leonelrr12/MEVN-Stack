const mongoose = require('mongoose');
const dbPath = 'mongodb+srv://guasimone:Mf0krgwFqPviMxwg@cluster0-abpj6.mongodb.net/mevn-databse?authSource=admin&replicaSet=Cluster0-shard-0&w=majority&readPreference=primary&appname=MongoDB%20Compass&retryWrites=true&ssl=true';

mongoose.connect(dbPath, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
})
.then(db => console.log('DB is connected'))
.catch(err => console.log(err));