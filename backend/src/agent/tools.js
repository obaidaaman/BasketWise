import { Tool, tool } from "@langchain/core/tools"
import { z } from "zod"

 const add = tool(async function ({ a, b }) {
    return a + b;
},
    {
        name: "add",
        description: "add two numbers",
        schema: z.object({
            a: z.number().describe("First number"),
            b: z.number().describe("Second number")
        })
    });


 const sub = tool(async function ({ a, b }) {
    return a - b;
},
    {
        name: "subtract",
        description: "subtract two numbers",
        schema: z.object({
            a: z.number().describe("First number"),
            b: z.number().describe("Second number")
        })
    });



 const multiply = tool(async function ({ a, b }) {
    return a * b;
},
    {
        name: "multiply",
        description: "Multiply two numbers",
        schema: z.object({
            a: z.number().describe("First number"),
            b: z.number().describe("Second number")
        })
    });


export const tools = [add, sub, multiply];