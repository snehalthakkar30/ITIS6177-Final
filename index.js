'use strict';
const express = require("express");
const bodyParser = require("body-parser");
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const axios = require('axios');
const cors = require("cors");

const port = 3000;
const app = express();
let host = 'localhost';

const options = {
    swaggerDefinition: {
        info: {
            title: 'MS Azure Image Analysis API',
            version: '1.0.0',
            description: 'API provides information about image from a provided image'
        },
        host: 'localhost:3000',
        basePath: '/'
    },
    apis: ['./test.js']
}


const specs = swaggerJsdoc(options);


// able to see swagger UI at <url>:port/docs
app.use('/docs', swaggerUi.serve, swaggerUi.setup(specs));


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// cors will be used to enable cross origin request
app.use(cors());

// Valid subscription key and endpoint.
let subscriptionKey = "610d3950befa42e5bf0530f8c6e0ef37";
let endpoint = "https://sifinal.cognitiveservices.azure.com/vision/v3.2/";

app.get('/', (req, res) => {
    res.send('Hello! Please extend this with /docs to check out the MS Azure Cognitive Services Computer Vision Image API post requests!')

  })


 /**
 * @swagger
 * definitions:
 *   Add tags of an image:
 *     properties:
 *       imageUrl:
 *         type: string
 *         description: URL of image, should be received from request
 */
/**
 * @swagger
 * /analyse:
 *    post:
 *      description: Gives out image tags
 *      produces:
 *          - application/json
 *      responses:
 *          200:
 *              description: Successfully analyses the image and provides json output containing the analysed data of image.
 *          400:
 *              description: Bad Request or invalid request
 *          500:
 *              description: Internal server error
 *      parameters:
 *          - name: imageUrl
 *            description: the image url for image detection
 *            in: body
 *            required: true
 *            schema:
 *              $ref: '#/definitions/Add tags of an image'
 *
 */
 app.post("/analyse", async (req, res, next) => {
    let imageUrl="";
    if(!req.body.imageUrl){
        return res.status(400).json({
            message : "Bad Request or invalid request"
        });

    }else {
        imageUrl= req.body.imageUrl
    }
    console.log(imageUrl);
    let result = axios({
        method: 'post',
        url: endpoint + 'analyze',
        params : {
            visualFeatures:'Categories,Adult,Tags,Description,Faces,Color,ImageType,Objects,Brands',
            details:'Landmarks',
        },
        data: {
            url: imageUrl,
        },
        headers: { 'Content-Type': 'application/json','Ocp-Apim-Subscription-Key': subscriptionKey }
    }).then(function (response) {
    
        console.log(response.data);
        if(response.data.length!=0){
            res.status(200).json(response.data);
        }else {
            res.status(200).json({
                "image": "No image detected"
            });
        }
    }).catch(function (error) {
        console.log(error)
        res.status(400).json({
            error
        })
    });
});

/**
* @swagger
* /describe:
*    post:
*      description: Gives out image tags
*      produces:
*          - application/json
*      responses:
*          200:
*              description: Successfully describes the image and provide a json data of the  description of image.
*          400:
*              description: Bad Request or invalid request
*          500:
*              description: Internal server error
*      parameters:
*          - name: imageUrl
*            description: the image url for image detection
*            in: body
*            required: true
*            schema:
*              $ref: '#/definitions/Add tags of an image'
*
*/
app.post("/describe", async (req, res, next) => {
   let imageUrl="";
   if(!req.body.imageUrl){
       return res.status(400).json({
           message : "Bad Request or invalid request"
       });

   }else {
       imageUrl= req.body.imageUrl
   }
   console.log(imageUrl);
   let result = axios({
       method: 'post',
       url: endpoint + 'describe',
       params : {
        maxCandidates:5
       },
       data: {
           url: imageUrl,
       },
       headers: { 'Content-Type': 'application/json','Ocp-Apim-Subscription-Key': subscriptionKey }
   }).then(function (response) {
   
       console.log(response.data);
       if(response.data.length!=0){
           res.status(200).json(response.data);
       }else {
           res.status(200).json({
               "image": "No image detected"
           });
       }
   }).catch(function (error) {
       console.log(error)
       res.status(400).json({
           error
       })
   });
});


/**
* @swagger
* /detect:
*    post:
*      description: Gives out image tags
*      produces:
*          - application/json
*      responses:
*          200:
*              description: Successfully detects the image and provides json data of the details of image.
*          400:
*              description: Bad Request or invalid request
*          500:
*              description: Internal server error
*      parameters:
*          - name: imageUrl
*            description: the image url for image detection
*            in: body
*            required: true
*            schema:
*              $ref: '#/definitions/Add tags of an image'
*
*/
app.post("/detect", async (req, res, next) => {
    let imageUrl="";
    if(!req.body.imageUrl){
        return res.status(400).json({
            message : "Bad Request or invalid request"
        });
 
    }else {
        imageUrl= req.body.imageUrl
    }
    console.log(imageUrl);
    let result = axios({
        method: 'post',
        url: endpoint + 'detect',
        data: {
            url: imageUrl,
        },
        headers: { 'Content-Type': 'application/json','Ocp-Apim-Subscription-Key': subscriptionKey }
    }).then(function (response) {
    
        console.log(response.data);
        if(response.data.length!=0){
            res.status(200).json(response.data);
        }else {
            res.status(200).json({
                "image": "No image detected"
            });
        }
    }).catch(function (error) {
        console.log(error)
        res.status(400).json({
            error
        })
    });
 });


 /**
* @swagger
* /areaOfInterest:
*    post:
*      description: Gives out image tags
*      produces:
*          - application/json
*      responses:
*          200:
*              description: Successfully detects the image and provide a array of object containing the details of image.
*          400:
*              description: Bad Request or invalid request
*          500:
*              description: Internal server error
*      parameters:
*          - name: imageUrl
*            description: the image url for image detection
*            in: body
*            required: true
*            schema:
*              $ref: '#/definitions/Add tags of an image'
*
*/
app.post("/areaOfInterest", async (req, res, next) => {
    let imageUrl="";
    if(!req.body.imageUrl){
        return res.status(400).json({
            message : "Bad Request or invalid request"
        });
 
    }else {
        imageUrl= req.body.imageUrl
    }
    console.log(imageUrl);
    let result = axios({
        method: 'post',
        url: endpoint + 'areaOfInterest',
        data: {
            url: imageUrl,
        },
        headers: { 'Content-Type': 'application/json','Ocp-Apim-Subscription-Key': subscriptionKey }
    }).then(function (response) {
    
        console.log(response.data);
        if(response.data.length!=0){
            res.status(200).json(response.data);
        }else {
            res.status(200).json({
                "image": "No image detected"
            });
        }
    }).catch(function (error) {
        console.log(error)
        res.status(400).json({
            error
        })
    });
 });

  /**
* @swagger
* /generateThumbnail:
*    post:
*      description: Gives out image tags
*      produces:
*          - application/json
*      responses:
*          200:
*              description: Successfully detects the image and provide a array of object containing the details of image.
*          400:
*              description: Bad Request or invalid request
*          500:
*              description: Internal server error
*      parameters:
*          - name: imageUrl
*            description: the image url for image detection
*            in: body
*            required: true
*            schema:
*              $ref: '#/definitions/Add tags of an image'
*
*/
app.post("/generateThumbnail", async (req, res, next) => {
    let imageUrl="";
    if(!req.body.imageUrl){
        return res.status(400).json({
            message : "Bad Request or invalid request"
        });
 
    }else {
        imageUrl= req.body.imageUrl
    }
    console.log(imageUrl);
    let result = axios({
        method: 'post',
        url: endpoint + 'generateThumbnail',
        params: {
            width: 5,
            height: 5,
            smartCropping: true
        },
        data: {
            url: imageUrl,
        },
        headers: { 'Content-Type': 'application/json','Ocp-Apim-Subscription-Key': subscriptionKey }
    }).then(function (response) {
    
        console.log(response.data);
        if(response.data.length!=0){
            res.status(200).json(response.data);
        }else {
            res.status(200).json({
                "image": "No image detected"
            });
        }
    }).catch(function (error) {
        console.log(error)
        res.status(400).json({
            error
        })
    });
 });

app.listen(port, () => {
    console.log(`Application is listening on port ${port}`)
  })