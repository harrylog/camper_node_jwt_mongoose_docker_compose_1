const express = require('express');
const { protect, authorize } = require('../middleware/auth')

const {
  getCourses,
  getCourse,
  addCourse,
  updateCourse,
  deleteCourse
} = require('../controllers/courses');

const Course = require('../models/Course');

const router = express.Router({ mergeParams: true }); // bootacmps and courses

const advancedResults = require('../middleware/advancedResults');

router
  .route('/').get(advancedResults(Course, {
    path: 'bootcamp',
    select: 'name description'
  }), getCourses)
  // .get(
  //   advancedResults(Course, {
  //     path: 'bootcamp',
  //     select: 'name description'
  //   }),
  //   getCourses
  // )
  .post(protect, authorize('publisher', 'user', 'admin'), addCourse);

router
  .route('/:id')
  .get(getCourse)
  .put(protect, authorize('publisher', 'user', 'admin'), updateCourse)
  .delete(protect, authorize('publisher', 'user', 'admin'), deleteCourse);

module.exports = router;
