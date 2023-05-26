const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const studentSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      unique: true,
      required: true,
    },
    roll_number: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },
    maths_marks: {
      type: Number,
      required: true,
    },
    science_marks: {
      type: Number,
      required: true,
    },
    english_marks: {
      type: Number,
      required: true,
    },
    social_science_marks: {
      type: Number,
      required: true,
    },
    hindi_marks: {
      type: Number,
      required: true,
    },
    grade: {
      type: String,
      // required: true,
    },
    total_marks: {
      type: Number,
      // required: true,
    },
    percentage: {
      type: Number,
      // required: true,
    },
  },
  { timestamps: true }
);

studentSchema.pre("save", function (next) {
  calculate(this);
  next();
});

studentSchema.post("init", async function (next) {
  // const student = await this.model.findOne(this.getQuery());
  await calculate(this,update=true);
});

const calculate = async (student,update=false) => {
  /// CALCULATING TOTAL MARKS:
  const total_marks =
    student.maths_marks +
    student.english_marks +
    student.hindi_marks +
    student.social_science_marks +
    student.science_marks;

  const percentage = (total_marks / 500) * 100;
  let grade = "";

  /// CALCULATING GRADE...
  if (percentage >= 85) {
    grade = "A";
  } else if (percentage >= 70 && percentage < 85) {
    grade = "B";
  } else if (percentage >= 55 && percentage < 70) {
    grade = "C";
  } else if (percentage >= 40 && percentage < 55) {
    grade = "D";
  } else {
    grade = "E";
  }
  student.total_marks = total_marks;
  student.percentage = percentage;
  student.grade = grade;
  if (update){
    await student.save();
  }
};

module.exports = mongoose.model("student", studentSchema);
