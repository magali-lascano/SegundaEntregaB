import messageModel from "../models/messagesModel.js"

export default class MessagesManager {
  getMessages = async () => {
    try {
      return await messageModel.find().lean().exec();
    } catch (error) {
      return error;
    }
  };

  createMessage = async (message) => {
    try {
      return await messageModel.create(message);
    } catch (error) {
      return error;
    }
  };

  deleteAllMessages = async () => {
    try {
      console.log("Eliminar todos los mensajes");
      const result = await messageModel.deleteMany({});
      console.log("Mensajes eliminados:", result);
      return result;
    } catch (error) {
      console.error("Error al eliminar mensajes:", error);
      return error;
    }
  };
}