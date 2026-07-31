import {Tool, tool} from "@langchain/core/tools"
import {ChatOpenAI} from "@langchain/openai"
import {z} from "zod"
import {HumanMessage, ToolMessage} from "@langchain/core/messages"
import { ToolNode, toolsCondition } from "@langchain/langgraph/prebuilt";
import {config} from "dotenv"
import {MessagesAnnotation, StateGraph, START, END} from "@langchain/langgraph"
config();
const model = new ChatOpenAI({
 model: "gpt-4o",
    apiKey: process.env.OPENAI_API_KEY
})



const add = tool(async function ({a,b}) {
    return a+b;
},
{
    name : "add",
    description: "add two numbers",
    schema: z.object({
        a : z.number().describe("First number"),
        b : z.number().describe("Second number")
    })
});


const sub = tool( async function ({a,b}) {
    return a-b;
},
{
    name : "subtract",
    description: "subtract two numbers",
    schema: z.object({
        a : z.number().describe("First number"),
        b : z.number().describe("Second number")
    })
});



const multiply = tool(async function ({a,b}) {
    return a*b;
},
{
    name : "multiply",
    description: "Multiply two numbers",
    schema: z.object({
        a : z.number().describe("First number"),
        b : z.number().describe("Second number")
    })
});


const tools = [add,sub,multiply];
const toolsByname = Object.fromEntries(tools.map((tool) => [tool.name, tool]));

const llmWithTools = model.bindTools(tools);

const state = MessagesAnnotation;


async function chatbot(state) {

    const response = await llmWithTools.invoke(state.messages);

    return {
        messages: [response]
    };

}
const toolNode = new ToolNode(tools)
const graph = new StateGraph(state);

graph.addNode("chatbot", chatbot);
graph.addNode("tools", toolNode);
graph.addEdge(START, "chatbot")
graph.addConditionalEdges("chatbot", toolsCondition);
graph.addEdge("tools", "chatbot")



const app = graph.compile();


const result = await app.invoke({
    messages : [
        new HumanMessage("Multiply 25*40 then add 10 to it and subtract the result by 2. Use tools only")
    ]
})

console.log(result);

console.log("==========")

console.log(result.messages.at(-1).content);


async function myToolNode(state) {

    const lastMessage = state.messages.at(-1);

    const firstToolCall = lastMessage.tool_calls[0];

    // Sirf pehla tool execute karo

    const tool = tools.find(
        t => t.name === firstToolCall.name
    );

    const result = await tool.invoke(firstToolCall.args);

    return {
        messages: [
            new ToolMessage({
                content: String(result),
                tool_call_id: firstToolCall.id
            })
        ]
    };
}