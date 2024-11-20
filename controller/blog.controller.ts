// controllers/place.controller.ts
import { Request, Response, NextFunction } from "express";
import createHttpError from "http-errors";
import Blog from "../models/blog.model";
import slugify from "slugify";

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

    let slug = slugify(title_english, {
      lower: true,
      strict: true,
    });

    const existingPlace = await Blog.findOne({ slug });
    if (existingPlace) {
      slug = `${slug}-${Date.now()}`;
    }

    const newPlace = new Blog({
      title_english,
      title_bangla,
      image,
      description_english,
      description_bangla,
      category_english,
      category_bangla,
      slug,
    });

    const savedPlace = await newPlace.save();
    res.status(201).json({
      success: true,
      message: "Place created successfully",
      data: savedPlace,
    });
  } catch (error) {
    next(error);
  }
};

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

export const getPlaceById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { slug } = req.params;
    const place = await Blog.findOne({ slug });

    if (!place) {
      return next(createHttpError(404, "Place not found"));
    }

    res.status(200).json({ success: true, data: place });
  } catch (error) {
    next(error);
  }
};

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

    res.status(200).json({
      success: true,
      message: "Place updated successfully",
      data: updatedPlace,
    });
  } catch (error) {
    next(error);
  }
};

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
