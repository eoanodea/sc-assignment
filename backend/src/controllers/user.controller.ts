/**
 * Primary dependencies
 */
import { Request, Response, NextFunction } from "express";

/**
 * Model Schema
 */
import User from "../models/user.model";

/**
 * Helpers for sucess and error responses
 */
import { handleSuccess, handleError } from "../helpers/responseHandler";
import RequestMiddleware from "../interfaces/express";

/**
 * Create a user in the database
 *
 * @param req
 * @param res
 */
export const create = async (req: Request, res: Response) => {
  try {
    const user = new User(req.body);

    const response = await user.save();

    return res.status(200).json(handleSuccess(response));
  } catch (err) {
    return res.status(400).json(handleError(err));
  }
};

/**
 * Retreive all users from the database
 *
 * @param req
 * @param res
 */
export const list = async (req: Request, res: Response) => {
  try {
    const users = await User.find({});

    return res.status(200).json(handleSuccess(users));
  } catch (err) {
    return res.status(400).json(handleError(err));
  }
};

/**
 * Retreive a user by ID from the database
 *
 * @param req
 * @param res
 */
export const show = (req: RequestMiddleware, res: Response) => {
  return res.status(200).json(handleSuccess(req.profile));
};

/**
 * Retreive a user by ID from the database
 * and append to the req.profile
 *
 * @param req
 * @param res
 */
export const userByID = async (
  req: RequestMiddleware,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id).select("_id name email created");

    req.profile = user;
    next();
  } catch (err) {
    return res.status(400).json(handleError(err));
  }
};

/**
 * Update a user by ID
 *
 * @param req
 * @param res
 */
export const update = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndUpdate(id, req.body, { new: true });

    return res.status(200).json(handleSuccess(user));
  } catch (err) {
    return res.status(400).json(handleError(err));
  }
};

/**
 * Delete a user by ID
 *
 * @param req
 * @param res
 */
export const remove = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await User.deleteOne({ _id: id });

    return res.status(200).json(handleSuccess(user));
  } catch (err) {
    return res.status(400).json(handleError(err));
  }
};
