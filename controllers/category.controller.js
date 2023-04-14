const Category = require('../models/category.model')



//get all categories


async function getAllCategories(req , res){

    try{

        const categories = await Category.find();

        res.status(200).json(categories)

    }catch(error){

        res.status(500).json({message : error.message })
    }

}


//create category


async function createCategory(req , res){


    try{

        const obj = new Category(req.body);
        const category = await obj.save();

        res.status(201).json({data : category});
        

    }
    catch(error){

        res.status(400).json({message : error.message})

    }
}



module.exports = {

    getAllCategories,
    createCategory
}