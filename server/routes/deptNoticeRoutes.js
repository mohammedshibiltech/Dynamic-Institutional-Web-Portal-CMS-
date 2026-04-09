const express = require('express');
const router = express.Router();
const deptNoticeController = require('../controllers/deptNoticeController');

router.get('/:deptId', deptNoticeController.getDeptNotices);
router.get('/', deptNoticeController.getAllDeptNotices);
router.post('/', deptNoticeController.addDeptNotice);
router.put('/:id', deptNoticeController.updateDeptNotice);
router.delete('/:id', deptNoticeController.deleteDeptNotice);

module.exports = router;
