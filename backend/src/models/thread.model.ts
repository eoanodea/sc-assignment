import mongoose, { Schema, Document, Model } from "mongoose";
import crypto from "crypto";

/**
 * Type declaration for Thread Schema Fields
 */
export interface IThreadDocument extends Document {
  _id: string;
  title: string;
  created: Date;
  updated: Date;
  posted_by: mongoose.Types.ObjectId;
}

/**
 * Schema for a Thread
 */
const ThreadSchema: Schema = new Schema({
  title: { type: String, required: true },
  created: { type: Date, default: Date.now },
  updated: { type: Date },
  posted_by: { type: Schema.Types.ObjectId, ref: "User" },
});

const Thread = mongoose.model<IThreadDocument>("Thread", ThreadSchema);

export default Thread;