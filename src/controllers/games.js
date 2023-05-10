/* eslint no-console: ["error", { allow: ["warn", "error", "log"] }] */
import mongoose from 'mongoose';
import { Game } from '../models/mongo.js';

export const getAllRoutines = async (req, res) => {
  const routines = await Game.find({}).lean();

  res.status(200).json({ data: routines });
};

export const getRoutineById = async (req, res) => {
  const { id } = req.params;
  const routine = await Game.findById(id).lean();

  res.status(200).json({ data: routine });
};

export const getRoutineByIdAndPopulate = async (req, res) => {
  const { id } = req.params;
  const routine = await Game.findById(id)
    .populate({
      path: 'exercises',
      model: 'Exercise',
      select: {
        name: true,
        type: true,
        primary_muscles: true,
        url: true
      }
    })
    .lean();

  res.status(200).json({ data: routine });
};

export const createRoutine = async (req, res) => {
  const newRoutine = new Game({
    name: req.body.name,
    sets: req.body.sets,
    reps: req.body.reps,
    exercises: req.body.exercises
  });

  await newRoutine.save();
  res.status(201).json({ data: newRoutine });
};

export const updateRoutine = async (req, res) => {
  const { id } = req.params;
  const routine = await Game.findByIdAndUpdate(
    id,
    {
      name: req.body.name,
      sets: req.body.sets,
      reps: req.body.reps,
      exercises: req.body.exercises
    },
    { new: true }
  );

  res.status(200).json({ data: routine });
};

export const updateExercisesFromRoutine = async (req, res) => {
  const { id } = req.params;
  const { exercise } = req.body;
  const exerciseId = mongoose.Types.ObjectId(exercise);

  let routine;

  routine = await Game.findOneAndUpdate(
    { _id: id, exercises: exerciseId },
    {
      $pull: {
        exercises: exerciseId
      }
    },
    { new: true }
  );

  // We check if the query found something, if not we add the exercise
  if (!routine) {
    routine = await Game.findByIdAndUpdate(
      id,
      {
        $addToSet: {
          exercises: exerciseId
        }
      },
      { new: true }
    );
  }

  res.status(200).json({ data: routine });
};

export const deleteRoutine = async (req, res) => {
  const { id } = req.params;
  const routine = await Game.findByIdAndDelete(id);
  res.status(200).json({ data: routine });
};
