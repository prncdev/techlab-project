import { Schema, model } from "mongoose";

const ProjectSchema = new Schema({
  title:      { type: String, required: true },
  reason:     { type: String, required: true },
  type:       { type: String, required: true },
  division:   { type: String, required: true },
  category:   { type: String, required: true },
  priority:   { type: String, required: true },
  dept:       { type: String, required: true },
  location:   { type: String, required: true },
  status:     { type: String, required: true },
  startDate:  { type: Date, required: true },
  endDate:    { type: Date, required: true },
  user:       { type: Schema.Types.ObjectId, required: true, ref: 'Users' },
},
  {
    timestamps: true
  }
);

const Projects = model('Projects', ProjectSchema);

export default Projects;