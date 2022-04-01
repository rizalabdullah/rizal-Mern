require(`dotenv`).config();
//require(`./config/mongoose`);
const express = require("express");
const app = express();
const path = require("path");
//const productRouter = require("./app/product/routes");
//const productRouterV2 = require("./app/product_v2/routes");
const productRouterV3 = require("./app/product_v3/routes");
//const productRouterV4 = require("./app/product_v4/routes");
const logger = require("morgan");
const cors = require("cors");
const port = process.env.API_URL ;

app.use(cors());
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use("/public", express.static(path.join(__dirname, "uploads")));
app.use(logger(`dev`));
//app.use("/api/v1", productRouter);
//app.use("/", productRouter);
//app.use("/api/v2", productRouterV2);
app.use(`/api/v3`, productRouterV3);
//app.use(`/api/v4`, productRouterV4);


//app.use((req,res,next) => {
 //   res.json({
 //       status: "failed",
 //       message: `Resource ` + req.originalUrl + ` not found`
//    });
//});

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('frontend/build'));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
    });   
  }

app.listen(port, () => console.log(`listening on port http://localhost:${port}`));