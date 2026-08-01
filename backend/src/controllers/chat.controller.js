import app from "../agent/graph.js"



export async function chatbot(req, res) {
    try {
        const { messages } = req.body;
        const response = await app.invoke({
            messages: [messages]
        })
        res.status(200).json({
            message: response.messages.at(-1).content,

        });
    } catch (err) {
        res.status(500).json({
            message: "Something went wrong",
            error: err.message
        })
    }
}