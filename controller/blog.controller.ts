// controllers/place.controller.ts
import { Request, Response, NextFunction } from "express";
import createHttpError from "http-errors";
import Blog from "../models/blog.model";

// Create a new Place
export const createPlace = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      title_english,
      title_bangla,
      image,
      description_english,
      description_bangla,
      category_english,
      category_bangla,
    } = req.body;

    const newPlace = new Blog({
      title_english,
      title_bangla,
      image,
      description_english,
      description_bangla,
      category_english,
      category_bangla,
    });

    const savedPlace = await newPlace.save();
    res
      .status(201)
      .json({
        success: true,
        message: "Place created successfully",
        data: savedPlace,
      });
  } catch (error) {
    next(error);
  }
};

// Get all Places
export const getAllPlaces = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const places = await Blog.find();
    res.status(200).json({ success: true, data: places });
  } catch (error) {
    next(error);
  }
};

// Get a single Place by ID
export const getPlaceById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const place = await Blog.findById(id);

    if (!place) {
      return next(createHttpError(404, "Place not found"));
    }

    res.status(200).json({ success: true, data: place });
  } catch (error) {
    next(error);
  }
};

// Update a Place by ID
export const updatePlaceById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const updatedPlace = await Blog.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!updatedPlace) {
      return next(createHttpError(404, "Place not found"));
    }

    res
      .status(200)
      .json({
        success: true,
        message: "Place updated successfully",
        data: updatedPlace,
      });
  } catch (error) {
    next(error);
  }
};

// Delete a Place by ID
export const deletePlaceById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const deletedPlace = await Blog.findByIdAndDelete(id);

    if (!deletedPlace) {
      return next(createHttpError(404, "Place not found"));
    }

    res
      .status(200)
      .json({ success: true, message: "Place deleted successfully" });
  } catch (error) {
    next(error);
  }
};
