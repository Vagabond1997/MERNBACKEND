import mongoose from "mongoose";

mongoose.connect('mongodb://localhost:27017/apidb2')
    .then(() => console.log('Connected to mongoose server'))
    .catch(err => console.log('Failed to connect to http://localhost:27017', err));

const itemSchema = new mongoose.Schema({
    name: {type: 'string', required: true, trim:true},
    model: {type: 'string', required: true, trim:true},
    brand: {type: 'string', required: true, trim:true},
    price: {type: 'string', required: true, trim:true},
    img: {
        type: Buffer,
        required: false
    },
    imgType: {
        type: String,
        required: false
    }
});

itemSchema.virtual('coverImagePath').get(function (){
    if(this.img != null && this.imgType != null){
        return `data:${this.imgType};charset=utf-8;base64,${this.img.toString('base64')}`;
    }
});

const Item = mongoose.model('Product', itemSchema);


export { Item };