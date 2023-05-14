import { invalidFileFormatError } from "../errors/errors";
import multer from "multer";

const uploadMiddleware = multer({
  dest: "uploads/",
  fileFilter: (req: any, file: any, cb: any) => {
    if (file.mimetype !== "text/csv") {
      cb(invalidFileFormatError());
    }
    cb(null, true);
  },
});

export default uploadMiddleware;
