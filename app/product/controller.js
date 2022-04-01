const connection = require("../../config/mysql");
const path = require("path");
const fs = require("fs");
const port = process.env.PORT || 3000;

const index = (req, res) => {
    connection.query("SELECT * FROM product", (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    });
  };

  const view = (req, res) => {
    const id = req.params.id;
    connection.query("SELECT * FROM product WHERE id = ?", [id] ,(err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    });
  };

const store1 = (req, res) => {
  const id_user = req.body.id_user;
  const name = req.body.name;
  const price = req.body.price;
  const stock = req.body.stock;
  const status = req.body.status;
  const image = req.file;
  
  if(image){
      const target = path.join(__dirname, "../uploads", image.originalname);
      fs.renameSync(image.path, target);

        connection.query(
          "INSERT INTO product (id_user, name, price, stock, status, image_url) VALUES (?,?,?,?,?,?)",
          [id_user, name, price, stock, status,`http://localhost:${port}/public/${image.originalname}` ],
          (err, result) => {
            if (err) {
              console.log(err);
            } else {
              res.send({
              message: "Update success"}
              );
            }
          }
        );

  }
  else{
    connection.query(
      "INSERT INTO product (id_user, name, price, stock, status) VALUES (?,?,?,?,?)",
      [id_user, name, price, stock, status ],
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.send({
          message: "Insert success"}
          );
        }
      }
    );

  }
};

const store = ((req, res) => {
    const {id_user,name, price, stock, status}  = req.body;
    const image = req.file;
    if(image){
        const target = path.join(__dirname, "../../uploads", image.originalname);
        fs.renameSync(image.path, target);
    connection.query({
        sql : "INSERT INTO product (id_user,name, price,stock, status, image_url) values (?, ?, ?, ?, ?, ?) ",
        values : [ parseInt(id_user), name, price, stock, status,  `http://localhost:${port}/public/${image.originalname}`]
    }, _response(res));
    }   
})

const update = (req, res) => {
  const id = req.params.id;
  const id_user = req.body.id_user;
  const name = req.body.name;
  const price = req.body.price;
  const stock = req.body.stock;
  const status = req.body.status;
  const image = req.file;

  if(image){
    const target = path.join(__dirname, "../uploads", image.originalname);
    fs.renameSync(image.path, target);

      connection.query(
         "UPDATE product SET id_user = ?, name = ?, price = ?, stock = ?, status = ?, image_url = ? where id = ?",
           [id_user, name, price, stock, status,  `http://localhost:${port}/public/${image.originalname}`, req.params.id],
            (err, result) => {
              if (err) {
                console.log(err);
              } res.send({
                message: "Update success"}
                );
            }
          );

  }
  else{
    connection.query(
      "UPDATE product SET id_user = ?, name = ?, price = ?, stock = ?, status = ? where id = ?",
        [id_user, name, price, stock, status, id],
         (err, result) => {
           if (err) {
             console.log(err);
           } res.send({
             message: "Update success"}
             );
         }
       
    );
  }
}


const destroy1 = (req, res) => {
  const id = req.params.id;
  connection.query("DELETE FROM product WHERE id = ?", id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
}

const destroy = ((req, res) => {
    connection.query({
        sql : "DELETE FROM product where id = ? ",
        values : [req.params.id]
    }, _response(res));
})


const _response = (res) => {
    return (error, result) => {
        if(error){
            res.send({
                status: "failed",
                response: error
            });    
        }
        else{
            res.send({
                status: "success",
                response: result
            });   
        }
      };
}


module.exports = {
    index,
    view, 
    store,
    update,
    destroy
    

}