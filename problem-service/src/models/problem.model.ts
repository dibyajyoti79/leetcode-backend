import mongoose, { Document } from "mongoose";

export interface Itestcase {
  input: string;
  output: string;
}

export interface IProblem extends Document {
  title: string;
  description: string;
  difficulty: "easy" | "medium" | "hard";
  editorial?: string;
  testcases?: Itestcase[];
  createdAt: Date;
  updatedAt: Date;
}

const testSchema = new mongoose.Schema<Itestcase>({
  input: {
    type: String,
    required: [true, "Please provide an input for the testcase"],
    trim: true,
  },
  output: {
    type: String,
    required: [true, "Please provide an output for the testcase"],
    trim: true,
  },
});

const problemSchema = new mongoose.Schema<IProblem>(
  {
    title: {
      type: String,
      required: [true, "Please provide a title for the problem"],
      maxLength: [100, "Title must be less than 100 characters"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Please provide a description for the problem"],
      trim: true,
    },
    difficulty: {
      type: String,
      enum: {
        values: ["easy", "medium", "hard"],
        message: "Difficulty must be one of the following: easy, medium, hard",
      },
      default: "easy",
      required: [true, "Please provide a difficulty for the problem"],
    },
    editorial: {
      type: String,
      trim: true,
    },
    testcases: [testSchema],
  },
  {
    timestamps: true,
    toJSON: {
      transform: (_, record) => {
        delete (record as any).__v; // delete __v field
        record.id = record._id; // add id field
        delete record._id; // delete _id field
        return record;
      },
    },
  }
);

problemSchema.index({ title: 1 }, { unique: true });
problemSchema.index({ difficulty: 1 });

export const Problem = mongoose.model<IProblem>("Problem", problemSchema);
