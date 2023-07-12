
import express from 'express';
import controller from '../controllers/Generic';
import model from '../models/Product';

const router = express.Router();

router.post('/create', controller.create(model));
router.get('/get/', controller.getAll(model));
router.get('/get/:id', controller.get(model));
router.patch('/update/:id', controller.update(model));
router.delete('/delete/:id', controller.delet(model));

export default router;