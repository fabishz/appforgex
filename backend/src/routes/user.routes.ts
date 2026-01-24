import { Router } from 'express';
import { store } from '../data/store';
import { UserProfile } from '../types';

const router = Router();

// Get user profile
router.get('/:id', (req, res) => {
    const user = store.getUser(req.params.id);
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
});

// Create or update user profile
router.post('/', (req, res) => {
    const user: UserProfile = req.body;
    if (!user.id) {
        return res.status(400).json({ message: 'User ID is required' });
    }
    store.saveUser(user);
    res.json(user);
});

// Update progress (simplified for now, expects full profile update or specific patch)
// For this showcase, we'll just allow updating the whole profile via POST/PUT
router.put('/:id', (req, res) => {
    const user: UserProfile = req.body;
    if (user.id !== req.params.id) {
        return res.status(400).json({ message: 'User ID mismatch' });
    }
    store.saveUser(user);
    res.json(user);
});

export default router;
