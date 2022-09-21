import { Item } from "../database/mydb.js";

var defaultController = (req, res) => {
    res.status(200).render('index');
}

var homeController = async (req, res) => {
    const allItems = await Item.find();
    res.status(200).render('index', { allItems: allItems });
    // res.status(200).send({ data: allItems, result: true });
}

var addController = (req, res) => {
    res.status(200).render('new');
}

var newController = async (req, res) => {
    try {
        var { txtName, txtModel, txtBrand, txtPrice } = req.query;
        var product = new Item({ name: txtName, model: txtModel, brand: txtBrand, price: txtPrice });
        var result = await product.save();
        console.log(result);
        // res.status(200).send({ data: result, result: true });
        res.status(200).redirect('/items/');
        // saveImage(movie, img);
    }
    catch (err) {
        res.status(500).send({ result: false, data: err });
    }
};

var singleController = async (req, res) => {
    var { id } = req.params;
    const sel_product = await Item.findById({ _id: id })
    if (!sel_product) {
        res.status(400).send({ message: 'Product not found', status: false });
    }
    else {
        res.status(200).send({ result: true, data: sel_product, result: true });
    }
}

var putController = async (req, res) => {
    var { id } = req.params;
    var { name, model, brand, price } = req.body;
    // var product = new Item({id, name, model, brand, price });
    await Item.findByIdAndUpdate(id, {
        name: name,
        model: model,
        brand: brand,
        price: price
    }).then(data => {
        res.status(200).send({ result: true, data: data, });
    }).catch(err => {
        res.status(500).send({ result: false, data: err, });
    })
}

var delController = async (req, res) => {
    var { id } = req.params;
    await Item.findByIdAndDelete(id).then(data => {
        res.status(200).send({ result: true, message: 'Deleted successfully' });
    }).catch(err => {
        res.status(500).send({
            result: false,
            message: err,
        });
    })
}

const pageNotFound = (request, response) => {
    response.send(200, "404 Page not found");
}

export { defaultController, homeController, newController, singleController, putController, delController, addController, pageNotFound }

// function saveImage(movie, imgEncoded) {
//     // CHECKING FOR IMAGE IS ALREADY ENCODED OR NOT
//     if (imgEncoded == null) return;
  
//     // ENCODING IMAGE BY JSON PARSE
//     // The JSON.parse() method parses a JSON string, constructing the JavaScript value or object described by the string
//     const img = JSON.parse(imgEncoded);
//     console.log( "JSON parse: "+ img);
    
//     // CHECKING FOR JSON ENCODED IMAGE NOT NULL 
//     // https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types
//     // AND HAVE VALID IMAGE TYPES WITH IMAGE MIME TYPES
//     if (img != null && imageMimeTypes.includes(img.type)) {
  
//       // https://nodejs.org/api/buffer.html
//       // The Buffer class in Node.js is designed to handle raw binary data. 
//       // SETTING IMAGE AS BINARY DATA
//       movie.img = new Buffer.from(img.data, "base64");
//       movie.imgType = img.type;
//     }}