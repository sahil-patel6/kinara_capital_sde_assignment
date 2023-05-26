const Student = require("../models/student");

exports.getStudentById = async (req, res, next, id) => {
  try {
    const student = await Student.findById(id);
    if (!student) {
      return res.status(400).json({
        error: "No student found",
      });
    }
    req.student = {
      ...student._doc,
    };
    next();
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      error: "Something went wrong",
    });
  }
};

exports.getStudent = (req, res) => {
  req.student.createdAt = undefined;
  req.student.updatedAt = undefined;
  req.student.__v = undefined;
  return res.json(req.student);
};

exports.getStudentsQuery = (req, res, next) => {


  /// QUERY PARAMS FOR GREATER THAN TOTAL MARKS
  if (req.query.gt_total_marks) {
    req.query.total_marks = {
      $gt: req.query.gt_total_marks,
    };
  }
  /// QUERY PARAMS FOR LESSER THAN TOTAL MARKS
  if (req.query.lt_total_marks) {
    req.query.total_marks = {
      ...req.query.total_marks,
      $lt: req.query.lt_total_marks,
    };
  }
  /// QUERY PARAMS FOR GREATER THAN PERCENTAGE
  if (req.query.gt_percentage) {
    req.query.percentage = {
      $gt: req.query.gt_percentage,
    };
  }
  /// QUERY PARAMS FOR LESSER THAN PERCENTAGE
  if (req.query.lt_percentage) {
    req.query.percentage = {
      ...req.query.percentage,
      $lt: req.query.lt_percentage,
    };
  }
  next();
};

exports.getStudents = async (req, res) => {
  try {
    const students = await Student.find(
      req.query,
      {},
      {
        lean: true,
        limit: req.query.page_size,
        skip: req.query.page_size * (req.query.page_number - 1),
        sort:{
            roll_number: 1
        }
      }
    );
    if (!students) {
      return res.status(400).json({
        error: "Students not found",
      });
    }
    return res.json(students);
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      error: "Something went wrong",
    });
  }
};

exports.createStudent = async (req, res) => {
  try {
    const student = new Student(req.body);
    await student.save();
    return res.json(student);
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      error: "Something went wrong",
    });
  }
};

exports.updateStudent = async (req, res) => {
  try {
    const student = await Student.findOneAndUpdate(
      { _id: req.student._id },
      { $set: req.body },
      { new: true }
    );
    if (!student) {
      return res.status(400).json({
        error: "Update Failed",
      });
    }
    return res.json(student);
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      error: "Something went wrong",
    });
  }
};

exports.deleteStudent = async (req, res) => {
  try {
    const result = await Student.deleteOne({ _id: req.student._id });
    if (result.deletedCount === 0) {
      return res.status(400).json({
        error: "Failed to delete student",
      });
    }
    return res.json({
      message: `${req.student.name} Student Deleted Successfully`,
    });
  } catch (err) {
    return res.status(500).json({
      error: "something went wrong",
    });
  }
};
