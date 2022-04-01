const Product = require(`./model`);
const fs = require(`fs`);
const path = require(`path`);
const port = process.env.PORT || 3000;

const index = async (req, res) => {
    try{
        await Product.sync();
        const result = await Product.findAll();
        res.send(result);
    }
    catch(e) {
        res.send(e);
    }  
}

const viewById = async (req, res) => {
    try {
        const product = await Product.findAll({
            where: {
                id: req.params.id
            }
        });
        res.json(product[0]);
    } catch (error) {
        res.json({ message: error.message });
    }  
  }

const create = async (req, res) => {
    const {users_id, name, price, stock, status} = req.body;
    const image = req.file;
    if(image){
        const target = path.join(__dirname, `../../uploads`, image.originalname);
        fs.renameSync(image.path, target)

        try{
            await Product.sync();
            const result = await Product.create({users_id, name, price, stock, status, image_url : `http://localhost:${port}/public/${image.originalname}`  });
            res.send(result);
        }
        catch(e) {
            res.send(e);
        }  
    }
    else{
        try{
            await Product.sync();
            const result = await Product.create({users_id, name, price, stock, status  });
            res.send(result);
        }
        catch(e) {
            res.send(e);
        }  

    }

}

const update = async (req, res) => {
    const {users_id, name, price, stock, status} = req.body;
    const image = req.file;
    if(image){
        const target = path.join(__dirname, `../../uploads`, image.originalname);
        fs.renameSync(image.path, target);
   
        try{
            await Product.sync();
            await Product.update({users_id, name, price, stock, status, image_url : `http://localhost:${port}/public/${image.originalname}`}, 
            {
                where :{id:req.params.id},
            }); 
            res.send({
                message : `Update Success`
            });
        }
        catch(e) {
            res.send(e);
        }
    }
    else{
      
   
        try{
            await Product.sync();
            await Product.update({users_id, name, price, stock, status}, 
            {
                where :{id:req.params.id},
            }); 
            res.send({
                message : `Update Success`
            });
        }
        catch(e) {
            res.send(e);
        }
    }
    }


const destroy = async (req, res) => {

    try{
        await Product.sync();
        await Product.destroy({
            where : {
                id: req.params.id
            }
        });
        res.send({
            message : "Delete Success"
        });
    }
    catch(e) {
        res.send(e);
    }

}

module.exports = {
    index,
    viewById,
    create,
    update,
    destroy
}