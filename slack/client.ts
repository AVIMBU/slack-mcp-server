class SlackClient {
  public static readonly BOT_USER_OAUTH_TOKEN =
    process.env.SLACK_BOT_USER_OAUTH_TOKEN || "test-token";
  public static readonly TEAM_ID = process.env.SLACK_TEAM_ID || "team-id";

  private readonly botHeaders: {
    Authorization: string;
    "Content-Type": string;
  };

  constructor() {
    // Check if token is properly set
    if (
      !SlackClient.BOT_USER_OAUTH_TOKEN ||
      SlackClient.BOT_USER_OAUTH_TOKEN === "test-token"
    ) {
      console.warn(
        "Warning: Using default Slack token. Set SLACK_BOT_TOKEN environment variable for production use."
      );
    }

    if (!SlackClient.TEAM_ID || SlackClient.TEAM_ID === "team-id") {
      console.warn(
        "Warning: Using default Team ID. Set SLACK_TEAM_ID environment variable for production use."
      );
    }

    this.botHeaders = {
      Authorization: `Bearer ${SlackClient.BOT_USER_OAUTH_TOKEN}`,
      "Content-Type": "application/json",
    };
  }

  async postMessage(channel_id: string, text: string): Promise<any> {
    const response = await fetch("https://slack.com/api/chat.postMessage", {
      method: "POST",
      headers: this.botHeaders,
      body: JSON.stringify({
        channel: channel_id,
        text: text,
      }),
    });

    return response.json();
  }

  async getUsers(limit: number = 100, cursor?: string): Promise<any> {
    const params = new URLSearchParams({
      limit: Math.min(limit, 200).toString(),
      team_id: SlackClient.TEAM_ID,
    });

    if (cursor) {
      params.append("cursor", cursor);
    }

    const response = await fetch(`https://slack.com/api/users.list?${params}`, {
      headers: this.botHeaders,
    });

    return response.json();
  }
}

export const slackClient = new SlackClient();
