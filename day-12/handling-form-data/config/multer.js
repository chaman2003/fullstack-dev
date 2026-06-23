import express from "express"
import multer from "multer"

export const storage = multer.diskStorage({
    destination: "images",
    filename: (req, file, cb) => {
        cb(null,file.fieldname + "-" + file.originalname + Date.now()+file.extension);
    }
});
    