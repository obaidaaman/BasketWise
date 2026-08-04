import { SystemMessage, HumanMessage } from "@langchain/core/messages";
import app from "../agent/graph.js"
import { ResponseSchema } from "../agent/schemas/response.schema.js";
import { conversationModel, messageModel } from "../models/chat.model.js"
import { locationModel } from "../models/user.model.js";
import { ChatOpenAI } from "@langchain/openai";
import { formatterPrompt } from "../agent/prompts.js";


const formatter = new ChatOpenAI({
    model: "gpt-4o-mini",
    apiKey: process.env.OPENAI_API_KEY,
    temperature: 0,
}).withStructuredOutput(ResponseSchema, { method: "functionCalling" });
export { formatter };


export async function chatbotController(req, res) {
    try {
        const { message } = req.body;
        const userId = req.user.id;
        let conversations = await conversationModel.findOne({
            participants: userId
        });

        if (!conversations) {
            conversations = await conversationModel.create({
                participants: [userId]
            });
        }

        const messageModelInstance = await messageModel.create({
            conversationId: conversations._id,
            senderId: req.user.id,
            role: "user",
            content: message,
            status: "sent",

        });

        const latLong = await locationModel.findOne({
            userId
        })

        if (!latLong) {
            return res.status(400).json({
                message: "Location not found",
            });
        }

        const latitude = latLong.location.latitude;
        const longitude = latLong.location.longitude;
        const thread_id = userId;

        const response = await app.invoke(
            { messages: [message] },
            { configurable: { thread_id, latitude, longitude } }

        )

        const aiResponse = response.messages.at(-1).content


        const structured = await formatter.invoke([
            new SystemMessage(formatterPrompt),
            new HumanMessage(
                `User asked: "${message}"\n\nAssistant responded: ${aiResponse}`
            ),
        ]);


        const toolMessage = response.messages.findLast(m => m._getType() === "tool" || m.name === "searchProduct");
        if (toolMessage && toolMessage.content) {
            try {
                const rawProducts = JSON.parse(toolMessage.content);
                if (Array.isArray(rawProducts) && rawProducts.length > 0) {

                    structured.products = rawProducts.map(p => ({
                        id: String(p.id),
                        name: p.name,
                        brand: p.brand || null,
                        price: {
                            mrp: p.price?.mrp ?? null,
                            offerPrice: p.price?.offerPrice || 0,
                            savings: p.price?.savings ?? null,
                        },
                        quantity: p.quantity || null,
                        inStock: p.availability?.inStock ?? true,
                        platform: {
                            name: p.platform?.name || 'Unknown',
                            deliveryTime: p.platform?.deliveryTime || null,
                        },
                        deeplink: p.deeplink || null,
                        image: p.image || null
                    }));
                }
            } catch (e) {
                console.error("Failed to parse tool message for products:", e);
            }
        }


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
            ...structured,
            message: aiResponse,

        });
    } catch (err) {
        res.status(500).json({
            message: "Something went wrong",
            error: err.message
        });
    }
}