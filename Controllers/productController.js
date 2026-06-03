const Product = require("../Models/Product");

exports.addProduct = async(req,res)=>{

try{

const {name,price,category} = req.body;

const product =
await Product.create({

name,
price,
category,
user:req.user.id

});

res.redirect("/dashboard");

// note: form POST should redirect instead of returning JSON to the browser

}catch(error){

res.status(500).json({
message:error.message
});
}
};

exports.getProducts = async(req,res)=>{
try{

const products = await Product.find({
user:req.user.id
});

res.render("ProDashboard",{ products });

}catch(error){

res.status(500).json({
message:error.message
});
}
};

exports.getSingleProduct = async(req,res)=>{

try{

const product =
await Product.findById(req.params.id);

res.status(200).json(product);

}catch(error){

res.status(500).json({
message:error.message
});
}
};

exports.updateProduct = async(req,res)=>{

try{

const product =
await Product.findByIdAndUpdate(
req.params.id,
req.body,
{new:true}
);

res.status(200).json({
success:true,
product
});

}catch(error){

res.status(500).json({
message:error.message
});
}
};

exports.deleteProduct = async(req,res)=>{

try{

await Product.findByIdAndDelete(
req.params.id
);

res.status(200).json({
success:true,
message:"Product Deleted"
});

}catch(error){

res.status(500).json({
message:error.message
});
}
};