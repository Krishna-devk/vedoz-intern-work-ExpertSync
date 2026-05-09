import { Expert } from '../models/Expert.js';

export const getExperts = async (req, res, next) => {
  try {
    const { category, search } = req.query;
    let query = {};

    if (category && category !== 'All') {
      query.category = category;
    }

    if (search) {
      query.name = { $regex: search, $options: 'i' };
    }

    const experts = await Expert.find(query).select('-slots');
    res.status(200).json({
      success: true,
      data: experts
    });
  } catch (error) {
    next(error);
  }
};

export const getExpertById = async (req, res, next) => {
  try {
    const expert = await Expert.findById(req.params.id);
    if (!expert) {
      res.status(404);
      throw new Error('Expert not found');
    }
    res.status(200).json({
      success: true,
      data: expert
    });
  } catch (error) {
    next(error);
  }
};

export const addSlot = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { startTime } = req.body;
    
    const expert = await Expert.findById(id);
    if (!expert) {
      res.status(404);
      throw new Error('Expert not found');
    }

    expert.slots.push({ startTime, isBooked: false });
    await expert.save();

    res.status(200).json({
      success: true,
      data: expert
    });
  } catch (error) {
    next(error);
  }
};
