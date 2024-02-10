const express = require("express");
const { isCreator } = require("../middleware/creator");
const booksModel = require("../models/book.model");
const BookRouter = express.Router();

BookRouter.get("/", async (req, res) => {
    try {

      const books = await booksModel.find();
      res.json({
        status:true,
        data : books
      });
    } catch (error) {
      res.status(500).json({
        status:false,message : error.message
      });
    }
  });



BookRouter.post("/", isCreator , async (req, res) => {
  const {book , user} = req.body;
    try {
      const newbook = await booksModel.create({...book , postedBy : user.name , creatorEmail : user.email});
      res.json({status:true,message : 'Book added succesfully'});
    } catch (error) {
      res.status(500).json({
        status:false,message : error.message
      });
    }
  });



BookRouter.delete("/delete/:id", async (req, res) => {
    try {
   
        await booksModel.findByIdAndDelete(req.params.id);
        res.json({status : true , message: 'Book deleted successfully' });
    
    } catch (error) {
      res.status(500).json({
        status:false,message : error.message

      });
    }
  });



  // 4. Get all books created in the last 10 minutes and before the last 10 minutes
BookRouter.get('/get/:id', async (req, res) => {
    const tenMinutes = new Date(Date.now() - 10 * 60 * 1000);
    try {
      const Books = req.params.id == 0 ?
      await booksModel.find({ createdAt: { $gte : tenMinutes } }):
      await booksModel.find({ createdAt: { $lt : tenMinutes } })
      res.json({
        status:true,
        data : Books
      });
    } catch (error) {
      res.status(500).json({ 
        status:false,message : error.message
       });
    }
  });



  BookRouter.put("/edit/:id", async (req, res) => {
    const {title ,publishedYear , author } = req.body.book;
    try {
        const result = await booksModel.updateOne({ _id: req.params.id }, { $set: {title , publishedYear , author}  });
  
        if (result.modifiedCount === 1) {
          res.send({ status :true , message: 'Document updated successfully' });
        } else {
          res.status(404).send({ status :false, message: 'Document not found' });
        }
    
    } catch (error) {
      res.status(500).json({
        status:false,message : error.message

      });
    }
  });

  

module.exports = BookRouter;