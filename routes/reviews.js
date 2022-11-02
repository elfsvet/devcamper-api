const express = require('express');

const {
  getReviews,
 getReview,
 addReview
} = require('../controllers/reviews');

const Course = require('../models/Review');
// mergeParams set to true to merge url
// Preserve the req.params values from the parent router. If the parent and the child have conflicting param names, the child’s value take precedence.
const router = express.Router({ mergeParams: true });

const advancedResults = require('../middleware/advancedResults');
const { protect, authorize } = require('../middleware/auth');
const Review = require('../models/Review')

router
  .route('/')
  .get(
    advancedResults(Review, { path: 'bootcamp', select: 'name description' }),
    getReviews
  )
  .post(protect, authorize('user', 'admin'), addReview);
router
  .route('/:id')
  .get(getReview)
//   .put(protect, authorize('publisher', 'admin'), updateReview)
//   .delete(protect, authorize('publisher', 'admin'), deleteReview);

module.exports = router;
