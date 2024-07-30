import { Conversation } from "../models/conversationModel.js";
import { Message } from "../models/messageModel.js";
import {getReceiverSocketId, io} from "../socket/socket.js";

export const sendMessage = async (req, res) => {
    try {
      const senderId = req.id; // logged-in user ID (sender)
      const receiverId = req.params.id; // ID of the message receiver
      const { message } = req.body; // The message content from the request body
  
      // Find an existing conversation between the sender and receiver
      let gotConversation = await Conversation.findOne({
        participants: { $all: [senderId, receiverId] }
      });
  
      // If the conversation does not exist, create a new one
      if (!gotConversation) {
        gotConversation = await Conversation.create({
          participants: [senderId, receiverId]
        });
      }
  
      // Create a new message document
      const newMessage = await Message.create({
        senderId,
        receiverId,
        message
      });
  
      // Add the new message to the conversation's messages array and save the conversation
      if (newMessage) {
        gotConversation.messages.push(newMessage._id);
      }
    
      //to save them simultaneously
      await Promise.all([gotConversation.save(), newMessage.save()])
      
      // SOCKET IO 
      const receiverSocketId = getReceiverSocketId(receiverId);
      if(receiverSocketId){
          io.to(receiverSocketId).emit("newMessage", newMessage);
      }


      // Return a success response including the message content
      return res.status(201).json({
        message: "Message sent successfully",
        sentMessage: newMessage
      });
  
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Server error" }); 
    }
  };

  export const getMessage = async (req, res) => {
    try {
      const receiverId = req.params.id; // ID of the message receiver
      const senderId = req.id; // Assuming req.id contains the sender's ID
  
      // Find the conversation between the sender and receiver and populate the messages
      const conversation = await Conversation.findOne({
        participants: { $all: [senderId, receiverId] }
      }).populate("messages");
  
      // If no conversation is found, return a 404 status with an appropriate message
      if (!conversation) {
        return res.status(404).json({ message: "Conversation not found" });
      }
  
      // Return the messages within the conversation
      return res.status(200).json({
        message: "Printed the messages",
        messages: conversation.messages
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Server error" }); 
    }
  };