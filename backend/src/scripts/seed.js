import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { faker } from '@faker-js/faker';
import { Expert } from '../models/Expert.js';
import { Booking } from '../models/Booking.js';
import connectDB from '../config/db.js';

dotenv.config();

const seedData = async () => {
  try {
    await connectDB();

    await Expert.deleteMany();
    await Booking.deleteMany();

    const categories = ['AI Coach', 'Frontend Guru', 'Backend Architect', 'DevOps Specialist', 'Product Manager'];
    
    const experts = [];

    for (let i = 0; i < 12; i++) {
      const slots = [];
      const now = new Date();
      now.setMinutes(0, 0, 0);

      // Create slots for the next 3 days
      for (let day = 0; day < 3; day++) {
        for (let hour = 9; hour < 18; hour++) {
          const slotTime = new Date(now);
          slotTime.setDate(now.getDate() + day);
          slotTime.setHours(hour);
          
          slots.push({
            startTime: slotTime,
            isBooked: false
          });
        }
      }

      experts.push({
        name: faker.person.fullName(),
        category: faker.helpers.arrayElement(categories),
        rating: faker.number.float({ min: 3.5, max: 5, precision: 0.1 }),
        experience: faker.number.int({ min: 2, max: 15 }),
        bio: faker.lorem.paragraph(),
        avatar: `https://i.pravatar.cc/150?u=${faker.string.uuid()}`,
        slots
      });
    }

    await Expert.insertMany(experts);
    console.log('Database Seeded!');
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

seedData();
