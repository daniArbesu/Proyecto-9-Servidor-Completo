/* eslint-disable import/extensions */
import mongoose from 'mongoose';
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
      path: 'games',
      model: 'Game',
      select: {
        city: true,
        year: true
      }
    })
    .lean();

  res.status(200).json({ data: athlete });
};

export const createAthlete = async (req, res) => {
  const newAthlete = new Athlete({
    name: req.body.name,
    surname: req.body.surname,
    date_of_birth: req.body.date_of_birth,
    bio: req.body.bio,
    height: req.body.height,
    weight: req.body.weight,
    photoURL: req.body.photoURL,
    games: req.body.games
  });

  await newAthlete.save();
  res.status(201).json({ data: newAthlete });
};

export const updateAthlete = async (req, res) => {
  const { id } = req.params;
  const athlete = await Athlete.findByIdAndUpdate(
    id,
    {
      name: req.body.name,
      surname: req.body.surname,
      date_of_birth: req.body.date_of_birth,
      bio: req.body.bio,
      height: req.body.height,
      weight: req.body.weight,
      photoURL: req.body.photoURL
    },
    { new: true }
  );
  res.status(200).json({ data: athlete });
};

export const updateGamesFromAthlete = async (req, res) => {
  const { id } = req.params;
  const { game } = req.body;
  const gameId = mongoose.Types.ObjectId(game);

  let athlete;

  athlete = await Athlete.findOneAndUpdate(
    { _id: id, exercises: gameId },
    {
      $pull: {
        games: gameId
      }
    },
    { new: true }
  );

  // We check if the query found something, if not we add the game
  if (!athlete) {
    athlete = await Athlete.findByIdAndUpdate(
      id,
      {
        $addToSet: {
          games: gameId
        }
      },
      { new: true }
    );
  }

  res.status(200).json({ data: athlete });
};

export const deleteAthlete = async (req, res) => {
  const { id } = req.params;
  const exercise = await Exercise.findByIdAndDelete(id);
  res.status(200).json({ data: exercise });
};
