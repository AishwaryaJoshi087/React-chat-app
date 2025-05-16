import Message from "../models/MessagesModel.js";
import {mkdirSync, renameSync} from 'fs';



export const getMessages = async (req, res, next) => {
  try {
    console.log("Request User ID:", req.userId);
    console.log("Request Body ID:", req.body.id);

    const user1 = req.userId;
    const user2 = req.body.id;

    if (!user1 || !user2) {
      console.log("Missing user IDs");
      return res.status(400).send("Both user IDs are required.");
    }

    const messages = await Message.find({
      $or: [
        { sender: user1, recipient: user2 },
        { sender: user2, recipient: user1 },
      ],
    }).sort({ timestamp: 1 });

    
    return res.status(200).json({ messages });
  } catch (error) {
    console.log("Error in getMessages:", error);
    return res.status(500).send("Internal Server Error");
  }
};



export const uploadfile = async (request, res, next) => {
  try {
    if(!request.file){
      return response.status(400).send("File is required.");
    }

    const date = Date.now();
    let fileDir = `uploads/files/${date}`;
    let fileName = `${fileDir}/${request.file.originalname}`;

    mkdirSync(fileDir, {recursive: true});
    renameSync(request.file.path, fileName);


    return res.status(200).json({ filepath: fileName });
  } catch (error) {
    console.log("Error in getMessages:", error);
    return res.status(500).send("Internal Server Error");
  }
};