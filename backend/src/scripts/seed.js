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

    const categories = [
      'AI Coach', 'Frontend Guru', 'Backend Architect', 'DevOps Specialist', 
      'Product Manager', 'Data Scientist', 'UX Designer', 'Security Expert',
      'Cloud Architect', 'Mobile Developer', 'HR Consultant', 'Marketing Strategist'
    ];
    
    const experts = [];

    for (let i = 0; i < 40; i++) {
      const slots = [];
      const now = new Date();
      now.setMinutes(0, 0, 0);

      // Create slots for the next 7 days
      for (let day = 0; day < 7; day++) {
        // Randomly skip some days or hours to make it look realistic
        if (Math.random() > 0.8) continue; 

        for (let hour = 9; hour < 18; hour++) {
          if (Math.random() > 0.7) continue; // Randomly skip some hours

          const slotTime = new Date(now);
          slotTime.setDate(now.getDate() + day);
          slotTime.setHours(hour);
          
          slots.push({
            startTime: slotTime,
            isBooked: Math.random() > 0.9 // 10% of slots already booked
          });
        }
      }

      experts.push({
        name: faker.person.fullName(),
        category: faker.helpers.arrayElement(categories),
        rating: parseFloat(faker.number.float({ min: 3.5, max: 5, precision: 0.1 }).toFixed(1)),
        experience: faker.number.int({ min: 2, max: 20 }),
        bio: faker.person.bio() + '. ' + faker.lorem.paragraph(),
        avatar: `https://xsgames.co/randomusers/assets/avatars/${Math.random() > 0.5 ? 'male' : 'female'}/${Math.floor(Math.random() * 50)}.jpg`,
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
