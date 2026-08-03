import app from "../agent/graph.js"
import { conversationModel, messageModel } from "../models/chat.model.js"



export async function chatbotController(req, res) {
    try {
        const { message } = req.body;
        const thread_id = req.user.id;
        let conversations = await conversationModel.findOne({
            participants: thread_id
        });

        if (!conversations) {
            conversations = await conversationModel.create({
                participants: [thread_id]
            });
        }

        const messageModelInstance = await messageModel.create({
            conversationId: conversations._id,
            senderId: req.user.id,
            role: "user",
            content: message,
            status: "sent",

        });
        const response = await app.invoke(
            { messages: [message] },
            { configurable: { thread_id } }

        )

        const aiResponse = response.messages.at(-1).content
        await messageModel.create({
            conversationId: conversations._id,

            role: "assistant",
            content: aiResponse,
            status: "sent",

        });
        conversations.lastMessage = aiResponse;
        conversations.lastMessageAt = Date.now();
        await conversations.save();

        res.status(200).json({
            message: aiResponse,

        });
    } catch (err) {
        res.status(500).json({
            message: "Something went wrong",
            error: err.message
        });
    }
}