#!/usr/bin/env node
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequest,
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";
import { GetUsersArgs, getUsersTool } from "./slack/users.js";
import { PostMessageArgs, postMessageTool } from "./slack/messages.js";
import { slackClient } from "./slack/client.js";

const server = new Server(
  {
    name: "slack-model-context-protocol-server",
    version: "0.0.1",
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [getUsersTool, postMessageTool],
  };
});

server.setRequestHandler(
  CallToolRequestSchema,
  async (request: CallToolRequest) => {
    try {
      if (!request.params.arguments) {
        throw new Error("Arguments are required");
      }

      switch (request.params.name) {
        case "slack_post_message": {
          const args = request.params.arguments as unknown as PostMessageArgs;
          if (!args.channel_id || !args.text) {
            throw new Error("Missing required arguments: channel_id and text");
          }
          const response = await slackClient.postMessage(
            args.channel_id,
            args.text
          );
          return {
            content: [{ type: "text", text: JSON.stringify(response) }],
          };
        }

        case "slack_get_users": {
          const args = request.params.arguments as unknown as GetUsersArgs;
          const response = await slackClient.getUsers(args.limit, args.cursor);
          return {
            content: [{ type: "text", text: JSON.stringify(response) }],
          };
        }

        default:
          throw new Error(`Unknown tool: ${request.params.name}`);
      }
    } catch (error) {
      console.error("Error executing tool:", error);
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify({
              error: error instanceof Error ? error.message : String(error),
            }),
          },
        ],
      };
    }
  }
);

async function runServer() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("Slack MCP Server running on stdio");
}

runServer().catch((error) => {
  console.error("Fatal error in main():", error);
  process.exit(1);
});
