import { SystemMessage } from "@langchain/core/messages"
import { ChatOpenAI } from "@langchain/openai"
import { ToolNode, toolsCondition } from "@langchain/langgraph/prebuilt";
import { config } from "dotenv"
import { MessagesAnnotation, StateGraph, START, END } from "@langchain/langgraph"
import { tools } from "./tools/export.js"
import { MemorySaver } from "@langchain/langgraph";
import { systemPrompt } from "./prompts.js";
config();

const state = MessagesAnnotation;
const model = new ChatOpenAI({
    model: "gpt-4o",
    apiKey: process.env.OPENAI_API_KEY
})

const checkpointer = new MemorySaver();
const toolNode = new ToolNode(tools)
const graph = new StateGraph(state);

graph.addNode("chatbot", chatbot);
graph.addNode("tools", toolNode);
graph.addEdge(START, "chatbot")
graph.addConditionalEdges("chatbot", toolsCondition);
graph.addEdge("tools", "chatbot")



const app = graph.compile({ checkpointer });

const llmWithTools = model.bindTools(tools);


async function chatbot(state) {

    const aiPrompt = new SystemMessage(
        systemPrompt
    );

    const response = await llmWithTools.invoke([aiPrompt, ...state.messages]);
    return {
        messages: [response]
    };

}

export default app;
