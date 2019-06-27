const mongoose = require('mongoose');
const httpStatus = require('http-status');
const APIError = require('../utils/APIError');

/**
 * class Schema
 * @private
 */
const classSchema = new mongoose.Schema({
  course: {
    type: String,
  },
  title: {
    type: String,
  },
  min_units: {
    type: Number,
  },
  max_units: {
    type: Number,
  },
  transfer_uc: {
    type: String,
  },
  transfer_csu: {
    type: String,
  },
  cte: {
    type: String,
  },
  cccco_controlnumber: {
    type: String,
  },
  lab_hours: {
    type: Number,
  },
  lecture_hours: {
    type: Number,
  },
  materials_fee: {
    type: Number,
  },
  classroom_instruction: {
    type: String,
  },
  online_instructions: {
    type: String,
  },
  advisory: {
    type: String,
  },
  html_description: {
    type: String,
  },
  PREREQ1: {
    type: String,
  },
  PREREQ2: {
    type: String,
  },
  PREREQ3: {
    type: String,
  },
  PREREQ4: {
    type: String,
  },
  PREREQ5: {
    type: String,
  },
  PREREQ6: {
    type: String,
  },
  PREREQ7: {
    type: String,
  },
  PREREQ8: {
    type: String,
  },
  PREREQ9: {
    type: String,
  },
  PREREQ10: {
    type: String,
  },
  PREREQ11: {
    type: String,
  },
  PREREQ12: {
    type: String,
  },
  PREREQ13: {
    type: String,
  },
  PREREQ14: {
    type: String,
  },
  PREREQ15: {
    type: String,
  },
  PREREQ16: {
    type: String,
  },
  PREREQ17: {
    type: String,
  },
  PREREQ18: {
    type: String,
  },
  PREREQ19: {
    type: String,
  },
  PREREQ20: {
    type: String,
  },
  PREREQ21: {
    type: String,
  },
  PREREQ22: {
    type: String,
  },
  PREREQ23: {
    type: String,
  },
  PREREQ24: {
    type: String,
  },
  PREREQ25: {
    type: String,
  },
  PREREQ26: {
    type: String,
  },
  PREREQ27: {
    type: String,
  },
  PREREQ28: {
    type: String,
  },
  PREREQ29: {
    type: String,
  },
  PREREQ30: {
    type: String,
  },
  PREREQ31: {
    type: String,
  },
  PREREQ32: {
    type: String,
  },
  PREREQ33: {
    type: String,
  },
  PREREQ34: {
    type: String,
  },
  PREREQ35: {
    type: String,
  },
  PREREQ36: {
    type: String,
  },
  PREREQ37: {
    type: String,
  },
  PREREQ38: {
    type: String,
  },
  PREREQ39: {
    type: String,
  },
  PREREQ40: {
    type: String,
  },
  PREREQ41: {
    type: String,
  },
  PREREQ42: {
    type: String,
  },
  PREREQ43: {
    type: String,
  },
  PREREQ44: {
    type: String,
  },
  PREREQ45: {
    type: String,
  },
  PREREQ46: {
    type: String,
  },
  PREREQ47: {
    type: String,
  },
  COREQS1: {
    type: String,
  },
  COREQS2: {
    type: String,
  },
  COREQS3: {
    type: String,
  },
  COREQS4: {
    type: String,
  },
  COREQS5: {
    type: String,
  },
});

/**
 * Methods
 */
classSchema.method({
  transform() {
    const transformed = {};
    const fields = ['course', 'title'];

    fields.forEach((field) => {
      transformed[field] = this[field];
    });

    return transformed;
  },
});

/**
 * Statics
 */
classSchema.statics = {
  /**
   * Get a class from database
   *
   * @param {ObjectId} id - The objectId of class.
   * @returns {Promise<class, APIError>}
   */
  async get(id) {
    try {
      let tempClass;

      if (mongoose.Types.ObjectId.isValid(id)) {
        tempClass = await this.findById(id).exec();
      }
      if (tempClass) {
        return tempClass;
      }

      throw new APIError({
        message: 'class does not exist',
        status: httpStatus.NOT_FOUND,
      });
    } catch (error) {
      throw error;
    }
  },
  async completeMe(curr) {
    try {
      let course;

      if (curr.length > 0) {
        course = await this.find({ course: { $regex: `^${curr}` } }).select({ course: 1 }).exec();
      }
      if (course) {
        return course;
      }
      throw new APIError({
        message: 'class does not exist',
        status: httpStatus.NOT_FOUND,
      });
    } catch (error) {
      throw error;
    }
  },
};

/**
 * @typedef class
 */
module.exports = mongoose.model('class', classSchema);
