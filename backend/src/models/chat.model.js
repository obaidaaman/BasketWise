import mongoose, { mongo } from "mongoose";

const ConversationSchema = new mongoose.Schema({
    participants: {
        type: Array,
        default: [],

    },
    lastMessage: {
        type: String,

    },
    lastMessageAt: {
        type: Date,
        default: Date.now(),
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    }
}, { timestamps: true });

const MessageModel = new mongoose.Schema({
    conversationId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "conversations",
        required: true,
    },
    senderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: false,
    },
    content: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
        enum: ["user", "assistant"]
    },
    status: {
        type: String,
        default: "sent",
        enum: ["sent", "delivered", "read"]
    }
}, { timestamps: true })

const conversationModel = mongoose.model("conversations", ConversationSchema);
const messageModel = mongoose.model("messages", MessageModel);
export { conversationModel, messageModel }  