const express = require('express');

const { getCourses } = require('../controllers/courses');

// mergeParams set to true to merge url
// Preserve the req.params values from the parent router. If the parent and the child have conflicting param names, the child’s value take precedence.
const router = express.Router({ mergeParams: true });

router.route('/').get(getCourses);

module.exports = router;
