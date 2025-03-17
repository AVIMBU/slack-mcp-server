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

## Slack Permission Scopes 

The following permissions are already implemented: 

| Permission | Description | Implemented |
|------------|-------------|-------------|
| app_configurations:read | Read app configuration info via App Manifest APIs | ❌ |
| app_configurations:write | Write app configuration info and create apps via App Manifest APIs | ❌ |
| app_mentions:read | View messages that directly mention @your_slack_app in conversations that the app is in | ❌ |
| assistant:write | Allow your slack app to act as an AI Assistant | ❌ |
| bookmarks:read | List bookmarks | ❌ |
| bookmarks:write | Create, edit, and remove bookmarks | ❌ |
| calls:read | View information about ongoing and past calls | ❌ |
| calls:write | Start and manage calls in a workspace | ❌ |
| canvases:read | your slack app will be able to access contents of canvases created inside Slack. | ❌ |
| canvases:write | your slack app will be able to create, edit and remove canvases. | ❌ |
| channels:history | View messages and other content in public channels that your slack app has been added to | ❌ |
| channels:join | Join public channels in a workspace | ❌ |
| channels:manage | Manage public channels that your slack app has been added to and create new ones | ❌ |
| channels:read | View basic information about public channels in a workspace | ❌ |
| channels:write.invites | Invite members to public channels | ❌ |
| channels:write.topic | Set the description of public channels | ❌ |
| chat:write | Post messages in approved channels & conversations | ✅ |
| chat:write.customize | Send messages as @your_slack_app with a customized username and avatar | ❌ |
| chat:write.public | Send messages to channels @your_slack_app isn't a member of | ❌ |
| commands | Add shortcuts and/or slash commands that people can use | ❌ |
| conversations.connect:manage | Allows your slack app to manage Slack Connect channels | ❌ |
| conversations.connect:read | Receive Slack Connect invite events sent to the channels your slack app is in | ❌ |
| conversations.connect:write | Create Slack Connect invitations for channels that your slack app has been added to, and accept invitations sent to your slack app | ❌ |
| datastore:read | View and see data from Slack App Datastore | ❌ |
| datastore:write | Write data to Slack App Datastore | ❌ |
| dnd:read | View Do Not Disturb settings for people in a workspace | ❌ |
| emoji:read | View custom emoji in a workspace | ❌ |
| files:read | View files shared in channels and conversations that your slack app has been added to | ❌ |
| files:write | Upload, edit, and delete files as your slack app | ❌ |
| groups:history | View messages and other content in private channels that your slack app has been added to | ❌ |
| groups:read | View basic information about private channels that your slack app has been added to | ❌ |
| groups:write | Manage private channels that your slack app has been added to and create new ones | ❌ |
| groups:write.invites | Invite members to private channels | ❌ |
| groups:write.topic | Set the description of private channels | ❌ |
| im:history | View messages and other content in direct messages that your slack app has been added to | ❌ |
| im:read | View basic information about direct messages that your slack app has been added to | ❌ |
| im:write | Start direct messages with people | ❌ |
| im:write.topic | Set the description in direct messages | ❌ |
| incoming-webhook | Create one-way webhooks to post messages to a specific channel | ❌ |
| links.embed:write | Embed video player URLs in messages and app surfaces | ❌ |
| links:read | View URLs in messages | ❌ |
| links:write | Show previews of URLs in messages | ❌ |
| metadata.message:read | Allows your slack app to read message metadata in channels that your slack app has been added to | ❌ |
| mpim:history | View messages and other content in group direct messages that your slack app has been added to | ❌ |
| mpim:read | View basic information about group direct messages that your slack app has been added to | ❌ |
| mpim:write | Start group direct messages with people | ❌ |
| mpim:write.topic | Set the description in group direct messages | ❌ |
| none | Execute methods without needing a scope | ❌ |
| pins:read | View pinned content in channels and conversations that your slack app has been added to | ❌ |
| pins:write | Add and remove pinned messages and files | ❌ |
| reactions:read | View emoji reactions and their associated content in channels and conversations that your slack app has been added to | ❌ |
| reactions:write | Add and edit emoji reactions | ❌ |
| reminders:read | View reminders created by your slack app | ❌ |
| reminders:write | Add, remove, or mark reminders as complete | ❌ |
| remote_files:read | View remote files added by the app in a workspace | ❌ |
| remote_files:share | Share remote files on a user's behalf | ❌ |
| remote_files:write | Add, edit, and delete remote files on a user's behalf | ❌ |
| search:read.files | Search a workspace's content in files | ❌ |
| search:read.im | Search a workspace's content in direct messages | ❌ |
| search:read.mpim | Search a workspace's content in group direct messages | ❌ |
| search:read.private | Search a workspace's content in private channels | ❌ |
| search:read.public | Search a workspace's content in public channels | ❌ |
| team.billing:read | Allows your slack app to read the billing plan for workspaces your slack app has been installed to | ❌ |
| team.preferences:read | Allows your slack app to read the preferences for workspaces your slack app has been installed to | ❌ |
| team:read | View the name, email domain, and icon for workspaces your slack app is connected to | ❌ |
| tokens.basic | Execute methods without needing a scope | ❌ |
| triggers:read | Read new Platform triggers | ❌ |
| triggers:write | Create new Platform triggers | ❌ |
| usergroups:read | View user groups in a workspace | ❌ |
| usergroups:write | Create and manage user groups | ❌ |
| users.profile:read | View profile details about people in a workspace | ❌ |
| users:read | View people in a workspace | ✅ |
| users:read.email | View email addresses of people in a workspace | ❌ |
| users:write | Set presence for your slack app | ❌ |
| workflow.steps:execute | Add steps that people can use in Workflow Builder | ❌ |
| workflows.templates:read | Read a workflow template | ❌ |
| workflows.templates:write | Write a workflow template | ❌ |

## Contact 

If you have questions, feel free to contact us via [AVIMBU](https://avimbu.com).