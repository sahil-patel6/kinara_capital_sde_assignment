const express = require("express");

const router = express.Router();

const {
  getStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent,
  getStudentsQuery,
} = require("../controllers/student");
const { check } = require("express-validator");
const { validateAllErrors } = require("../utils/error");

router.param("studentId", getStudentById);

router.post(
  "/student",
  [
    check("name")
      .isLength({ min: 3 })
      .withMessage("Name should be atleast 3 characters long"),
    check("roll_number")
      .isNumeric()
      .withMessage("roll_number should be a number"),
    check("maths_marks")
      .isInt({ min: 0, max: 100 })
      .withMessage("maths_marks should be a number"),
    check("science_marks")
      .isInt({ min: 0, max: 100 })
      .withMessage("science_marks should be a number"),
    check("english_marks")
      .isInt({ min: 0, max: 100 })
      .withMessage("english_marks should be a number"),
    check("hindi_marks")
      .isInt({ min: 0, max: 100 })
      .withMessage("hindi_marks should be a number"),
    check("social_science_marks")
      .isInt({ min: 0, max: 100 })
      .withMessage("social_science_marks should be a number"),
  ],
  validateAllErrors,
  createStudent
);

router.get("/students", getStudentsQuery, getStudents);

router.put("/student/:studentId", updateStudent);

router.delete("/student/:studentId", deleteStudent);

module.exports = router;
