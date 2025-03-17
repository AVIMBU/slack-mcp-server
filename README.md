# Slack Model Context Protocol Server

This is a connector to allow Claude Desktop (or any MCP client) to interact with your Slack workspace to post messages and query a list of all users.

## Local Development

In order to run this client locally, add the following configuration to your Claude Desktop MCP Server config file: 

```
 {
  "mcpServers": {
    "mcp-slack-local": {
      "command": "node",
      "args": ["/path/to/project/dist/index.js"], <---- replace this with your project path
      "env": {
        "SLACK_BOT_USER_OAUTH_TOKEN": "test-bot-token", 
        "SLACK_TEAM_ID": "test-team-id"
      }
    },
  }
}
```

After this, you should be able to test this implementation in your Claude Desktop App using example prompts like: 

- "Can you list all users of my Slack team?"
- "Can you send a welcome message to my Slack Channel with the ID `<channel id>`?"

Running the server locally: 

```
node dist/index.js
```

With the build in another terminal 

```
npm run watch
```

## Contact 

If you have questions, feel free to contact us via [AVIMBU](https://avimbu.com).

