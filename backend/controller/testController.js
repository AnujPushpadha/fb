const model = require("../models/testModel");

const addData = async (req, res) => {
  try {
    // console.log("anuj");
    const { cid, title, author, summary } = req.body;
    const book = await model.create({
      cid,
      title,
      author,
      summary,
    });
    res.status(200).json({
      status: "success",
      data: {
        book,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: err,
    });
  }
};

const getData = async (req, res) => {
  try {
    const books = await model.find();
    res.status(200).json({
      status: "success",
      data: books,
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: "book not found",
    });
  }
};

const deleteData = async (req, res) => {
  try {
    const book = await model.findById(req.params);
    console.log(req.params._id);
    if (book == null) {
      res.status(404).json({
        message: "not found",
      });
      return;
    }
    delete_Book = await model.findByIdAndDelete(req.params._id);

    res.status(204).json({
      status: "success",
      data: null,
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: "not find",
    });
  }
};

const editData = async (req, res) => {
  const book = await model.findById(req.params._id);
  if (!book) {
    res.status(404).json({
      message: "not found",
    });
    return;
  }

  // if (contact.user_id.toString() !== req.user.id) {
  //   res.status(403);
  //   throw new Error("User don't have permission to update other user contacts");
  // }

  const updatedBook = await model.findByIdAndUpdate(req.params._id, req.body, {
    new: true,
  });

  res.status(200).json(updatedBook);
};

module.exports = { addData, getData, deleteData, editData };
