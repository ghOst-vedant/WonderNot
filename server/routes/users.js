import express from "express";
import {
  getUser,
  getUserFriends,
  addRemoveFriend,
  searchUser,
  becomeMentor,
} from "../controllers/users.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

// read users on the basis of id
router.get("/search", verifyToken, searchUser);
router.get("/:id", verifyToken, getUser);
router.get("/:id/friends", verifyToken, getUserFriends);
router.post("/:id/mentor", verifyToken, becomeMentor);

// update
router.patch("/:id/:friendId", verifyToken, addRemoveFriend);
export default router;
