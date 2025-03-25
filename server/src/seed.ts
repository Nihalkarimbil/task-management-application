import mongoose from "mongoose";
import dotenv from "dotenv";
import Section from "./models/Section";


dotenv.config();
mongoose.connect(process.env.MONGO_URI as string);

const seedSections = async () => {
  try {
    await Section.deleteMany();

    await Section.insertMany([
      { name: "To Do", tasks: [] },
      { name: "In Progress", tasks: [] },
      { name: "Done", tasks: [] },
    ]);

    console.log("Sections added!");
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seedSections();
