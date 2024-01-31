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
      const newbook = await booksModel.create({...book , postedBy : user.name});
      res.json({status:true,message : 'Book added succesfully'});
    } catch (error) {
      res.status(500).json({
        status:false,message : error.message
      });
    }
  });



BookRouter.delete("/delete/:id", isCreator, async (req, res) => {
    try {
      await booksModel.findByIdAndDelete(req.params.id);
      res.json({status : true , message: 'Book deleted successfully' });
    } catch (error) {
      res.status(500).json({
        status:false,message : error.message

      });
    }
  });



  // 4. Get all books created in the last 10 minutes
BookRouter.get('/new', async (req, res) => {
    const tenMinutesAgo = new Date(Date.now() - 10 * 60 * 1000);
    try {
      const recentBooks = await booksModel.find({ createdAt: { $gte: tenMinutesAgo } });
      res.json({
        status:true,
        data : recentBooks
      });
    } catch (error) {
      res.status(500).json({ 
        status:false,message : error.message
       });
    }
  });
  
  // 5. Get all books created before the last 10 minutes
  BookRouter.get('/old', async (req, res) => {
    const tenMinutesAgo = new Date(Date.now() - 10 * 60 * 1000);
    try {
      const olderBooks = await booksModel.find({ createdAt: { $lt: tenMinutesAgo } });
      res.json({
        status:true,
        data : olderBooks
      });
    } catch (error) {
      res.status(500).json({ 
        status:false,message : error.message
      });
    }
  });

module.exports = BookRouter;