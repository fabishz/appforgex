import { UserProfile, Course } from '../types';

// Mock Data Store
class DataStore {
    private users: Map<string, UserProfile> = new Map();
    private courses: Course[] = [];

    constructor() {
        // Initialize with some dummy data if needed
        // For now, we'll rely on the frontend to send initial data or just have an empty state
        // Ideally we should import the course data from the frontend file, but that's tricky across folders.
        // I'll just create a simple way to seed it or assume the user sends it?
        // No, the backend should serve the courses.
        // I will copy the course data from the frontend to here in a subsequent step or just mock a few.
    }

    getUser(id: string): UserProfile | undefined {
        return this.users.get(id);
    }

    saveUser(user: UserProfile): void {
        this.users.set(user.id, user);
    }

    getCourses(): Course[] {
        return this.courses;
    }

    getCourse(id: string): Course | undefined {
        return this.courses.find(c => c.id === id);
    }

    // Helper to seed courses (will be called with data copied from frontend)
    seedCourses(courses: Course[]) {
        this.courses = courses;
    }
}

export const store = new DataStore();
