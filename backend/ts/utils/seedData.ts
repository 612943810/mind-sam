import { register } from '../models/RegisterModel';
import * as argon from 'argon2';

export const seedData = async () => {
  const recruiterUsername = 'recruiter';
  const recruiterPassword = 'recruiter123';
  const recruiterDOB = new Date('1990-01-01');

  try {
  
    const existingRecruiter = await register.findOne({ username: recruiterUsername }).exec();
    
    if (existingRecruiter) {
      console.log('Recruiter user already exists');
      return;
    }

    const hashedPassword = await argon.hash(recruiterPassword);

    const recruiter = new register({
      username: recruiterUsername,
      password: hashedPassword,
      dateofbirth: recruiterDOB
    });

    await recruiter.save();
    console.log('Recruiter user seeded successfully');
  } catch (error: any) {
    console.error('Error seeding recruiter user:', error.message);
  }
};