
const express = require('express')
const { protect, authorize } = require('../middleware/auth')
const {
    getBootcamps,
    getBootcamp,
    createBootcamp,
    updateBootcamp,
    deleteBootcamp,
    getBootcampsInRadius } = require('../controllers/bootcamps')

//include other resource routers
const courseRouter = require('./courses')
const reviewRouter = require('./reviews');


const Bootcamp = require('../models/Bootcamp');

const router = express.Router();
const advancedResults = require('../middleware/advancedResults');

// re-route into toher resource routers
router.use('/:bootcampId/courses', courseRouter);
router.use('/:bootcampId/reviews', reviewRouter);


router.route('/').get(advancedResults(Bootcamp, 'courses'), getBootcamps).post(protect, authorize('publisher', 'user', 'admin'), createBootcamp)

router.route('/:id').get(getBootcamp).put(protect, authorize('publisher', 'user', 'admin'), updateBootcamp).delete(protect, authorize('publisher', 'user', 'admin'), deleteBootcamp)

router.route('/radius/:zipcode/:distance').get(getBootcampsInRadius);





// router.get('/', getBootcamps)

// router.get('/:id', getBootcamp)

// router.post('/', createBootcamp)

// router.put('/:id',updateBootcamp)

// router.delete('/:id',deleteBootcamp)

module.exports = router;