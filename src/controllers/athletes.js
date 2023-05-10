/* eslint-disable import/extensions */
import { Athlete } from '../models/mongo.js';

export const getAllAthletes = async (req, res) => {
  const athletes = await Athlete.find({}).lean();

  res.status(200).json({ data: athletes });
};

export const getAthleteById = async (req, res) => {
  const { id } = req.params;
  const athlete = await Athlete.findById(id).lean();

  res.status(200).json({ data: athlete });
};

export const getAthleteByIdAndPopulate = async (req, res) => {
  const { id } = req.params;
  const athlete = await Athlete.findById(id)
    .populate({
      path: 'routine',
      model: 'Routine',
      select: {
        name: true,
        exercises: true,
        sets: true,
        reps: true
      }
    })
    .lean();

  res.status(200).json({ data: athlete });
};

export const createExercise = async (req, res) => {
  const newExercise = new Exercise({
    name: req.body.name,
    type: req.body.type,
    primary_muscles: req.body.primary_muscles,
    url: req.body.url
  });

  await newExercise.save();
  res.status(201).json({ data: newExercise });
};

export const updateExercise = async (req, res) => {
  const { id } = req.params;
  const exercise = await Exercise.findByIdAndUpdate(
    id,
    {
      name: req.body.name,
      type: req.body.type,
      primary_muscles: req.body.primary_muscles,
      url: req.body.url
    },
    { new: true }
  );
  res.status(200).json({ data: exercise });
};

export const updateRoutineFromExercise = async (req, res) => {
  const { id } = req.params;

  const exercise = await Exercise.findByIdAndUpdate(
    id,
    {
      routine: req.body.routine
    },
    { new: true }
  );

  res.status(200).json({ data: exercise });
};

export const deleteExercise = async (req, res) => {
  const { id } = req.params;
  const exercise = await Exercise.findByIdAndDelete(id);
  res.status(200).json({ data: exercise });
};
