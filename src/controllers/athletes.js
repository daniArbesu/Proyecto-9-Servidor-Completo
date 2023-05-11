import mongoose from 'mongoose';
import { Athlete } from '../models/mongo.js';
import { deleteImg } from '../middlewares/files.js';

export const getAllAthletes = async (req, res) => {
  try {
    const athletes = await Athlete.find({}).lean();
    res.status(200).json({ data: athletes });
  } catch (error) {
    console.error(error);
    res.status(500).json({ data: 'Athletes not found' });
  }
};

export const getAthleteById = async (req, res) => {
  try {
    const { id } = req.params;
    const athlete = await Athlete.findById(id).lean();

    res.status(200).json({ data: athlete });
  } catch (error) {
    console.error(error);
    res.status(500).json({ data: 'Athlete not found' });
  }
};

export const getAthleteByIdAndPopulate = async (req, res) => {
  try {
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
  } catch (error) {
    console.error(error);
    res.status(500).json({ data: 'Athlete not found' });
  }
};

export const createAthlete = async (req, res) => {
  try {
    const newAthlete = new Athlete(req.body);

    // Check if there's a picture too
    if (req.file) {
      newAthlete.photo_url = req.file.path;
    }

    await newAthlete.save();
    res.status(201).json({ data: newAthlete });
  } catch (error) {
    console.error(error);
    res.status(500).json({ data: 'Error Creating Athlete' });
  }
};

export const updateAthlete = async (req, res) => {
  try {
    const { id } = req.params;
    // Create new Athlete with the body info
    const newAthlete = new Athlete(req.body);
    // Keep the original id to avoid any changes
    newAthlete._id = id;
    // Search the original Athlete to delete the old image
    const originalAthlete = await Athlete.findById(id);
    // If we send a file (picture)
    if (req.file) {
      // Delete the old image
      deleteImg(originalAthlete.photo_url);
      // Update the new Athlete with the new picture path
      newAthlete.photo_url = req.file.path;
    }
    // Update the new Athlete in the DB and return the updated athlete
    const dbAthlete = await Athlete.findByIdAndUpdate(id, newAthlete, { new: true });
    res.status(200).json({ data: dbAthlete });
  } catch (error) {
    console.error(error);
    res.status(500).json({ data: 'Error updating Athlete' });
  }
};

export const updateGamesFromAthlete = async (req, res) => {
  try {
    const { id } = req.params;
    const { games } = req.body;
    const gameId = new mongoose.Types.ObjectId(games);

    let athlete;

    athlete = await Athlete.findOneAndUpdate(
      { _id: id, games: gameId },
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
  } catch (error) {
    console.error(error);
    res.status(500).json({ data: 'Error updating Athlete' });
  }
};

export const deleteAthlete = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedAthlete = await Athlete.findByIdAndDelete(id);
    // Check if there's an athlete with that id
    if (!deletedAthlete) {
      res.status(404).json({ data: "Athlete doesn't exists" });
      return;
    }
    // Check if there's an image for the athlete
    if (deletedAthlete.photo_url) {
      // Delete Cloudinary image
      deleteImg(deletedAthlete.photo_url);
    }
    res.status(200).json({ data: deletedAthlete });
  } catch (error) {
    console.error(error);
    res.status(500).json({ data: 'Error deleting Athlete' });
  }
};
