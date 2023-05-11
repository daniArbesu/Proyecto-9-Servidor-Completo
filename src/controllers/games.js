/* eslint no-console: ["error", { allow: ["warn", "error", "log"] }] */
import mongoose from 'mongoose';
import { Game } from '../models/mongo.js';

export const getAllGames = async (req, res) => {
  try {
    const games = await Game.find({}).lean();

    res.status(200).json({ data: games });
  } catch (error) {
    console.error(error);
    res.status(500).json({ data: 'Games not found' });
  }
};

export const getGameById = async (req, res) => {
  try {
    const { id } = req.params;
    const game = await Game.findById(id).lean();

    res.status(200).json({ data: game });
  } catch (error) {
    console.error(error);
    res.status(500).json({ data: 'Game not found' });
  }
};

export const getGameByIdAndPopulate = async (req, res) => {
  try {
    const { id } = req.params;
    const game = await Game.findById(id)
      .populate({
        path: 'athletes',
        model: 'Athlete',
        select: {
          name: true,
          surname: true,
          date_of_birth: true,
          height: true,
          weight: true
        }
      })
      .lean();

    res.status(200).json({ data: game });
  } catch (error) {
    console.error(error);
    res.status(500).json({ data: 'Game not found' });
  }
};

export const createGame = async (req, res) => {
  try {
    const newGame = new Game(req.body);

    await newGame.save();
    res.status(201).json({ data: newGame });
  } catch (error) {
    console.error(error);
    res.status(500).json({ data: 'Error Creating Game' });
  }
};

export const updateGame = async (req, res) => {
  try {
    const { id } = req.params;
    // Create new Game with the body info
    const newGame = new Game(req.body);
    newGame._id = id;
    const dbGame = await Game.findByIdAndUpdate(id, newGame, { new: true });
    res.status(200).json({ data: dbGame });
  } catch (error) {
    console.error(error);
    res.status(500).json({ data: 'Error updating Game' });
  }
};

export const updateAthletesFromGame = async (req, res) => {
  try {
    const { id } = req.params;
    const { athletes } = req.body;
    const athleteId = new mongoose.Types.ObjectId(athletes);

    let game;

    game = await Game.findOneAndUpdate(
      { _id: id, athletes: athleteId },
      {
        $pull: {
          athletes: athleteId
        }
      },
      { new: true }
    );

    // We check if the query found something, if not we add the exercise
    if (!game) {
      game = await Game.findByIdAndUpdate(
        id,
        {
          $addToSet: {
            athletes: athleteId
          }
        },
        { new: true }
      );
    }

    res.status(200).json({ data: game });
  } catch (error) {
    console.error(error);
    res.status(500).json({ data: 'Error updating Game' });
  }
};

export const deleteGame = async (req, res) => {
  try {
    const { id } = req.params;
    const game = await Game.findByIdAndDelete(id);
    res.status(200).json({ data: game });
  } catch (error) {
    console.error(error);
    res.status(500).json({ data: 'Error deleting Game' });
  }
};
