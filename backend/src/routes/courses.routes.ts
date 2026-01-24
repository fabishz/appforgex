import { Router } from 'express';
import { store } from '../data/store';

const router = Router();

// Get all courses
router.get('/', (req, res) => {
    const courses = store.getCourses();
    res.json(courses);
});

// Get course by ID
router.get('/:id', (req, res) => {
    const course = store.getCourse(req.params.id);
    if (!course) {
        return res.status(404).json({ message: 'Course not found' });
    }
    res.json(course);
});

export default router;
