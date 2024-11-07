// routes/place.routes.ts
import { Router } from "express";
import {
  createPlace,
  deletePlaceById,
  getAllPlaces,
  getPlaceById,
  updatePlaceById,
} from "../controller/blog.controller";
import { isLogin } from "../middleware/auth.middleware";

const blogRuter: Router = Router();

blogRuter.post("/", isLogin, createPlace);
blogRuter.get("/", getAllPlaces);
blogRuter.get("/:id", getPlaceById);
blogRuter.put("/:id", isLogin, updatePlaceById);
blogRuter.delete("/:id", deletePlaceById);

export default blogRuter;
