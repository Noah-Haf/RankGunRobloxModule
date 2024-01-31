// Module for ranking @rankgun (https://rankgun.works/).

const HttpService = game.GetService("HttpService");

const BaseUrl = "https://api.rankgun.works/";

interface RankData {
	workspace_id: number;
	user_id: number;
	rank?: number;
}

interface Response {
	status_code: number;
	detail: string;
}

// Creates a URL and calls it based on endpoint,method and data.
function URLGenerator(Endpoint: string, Method: "POST" | "GET", Bot: Bot, Data: RankData) {
	const result = pcall(() =>
		HttpService.RequestAsync({
			Url: `${BaseUrl}${Endpoint}`,
			Method,
			Headers: {
				"api-token": Bot.ApiKey,
				"Content-Type": "application/json",
			},
			Body: HttpService.JSONEncode(Data),
		}),
	);
	const success = result[0];
	const response = result[1] as { Body: string };
	const body = HttpService.JSONDecode(response.Body) as Response;
	if (!success) {
		warn("Request failed");
		return { status_code: 404, detail: "Request failed" };
	}
	return body;
}

export class Bot {
	ApiKey: string;
	WorkspaceId: number;

	constructor(ApiKey: string, WorkspaceId: number) {
		if (!typeIs(ApiKey, "string") || !typeIs(WorkspaceId, "number")) {
			error("ApiKey should be string and WorkspaceId should be number");
		}
		this.ApiKey = ApiKey;
		this.WorkspaceId = WorkspaceId;
	}

	promote(userId: unknown) {
		if (!typeIs(userId, "number")) {
			warn("UserId must be number");
			return { status_code: 400, detail: "UserId must be number" };
		}
		return URLGenerator("roblox/promote", "POST", this, {
			workspace_id: this.WorkspaceId,
			user_id: userId,
		});
	}

	demote(userId: unknown) {
		if (!typeIs(userId, "number")) {
			warn("UserId must be number");
			return { status_code: 400, detail: "UserId must be number" };
		}
		return URLGenerator("roblox/demote", "POST", this, {
			workspace_id: this.WorkspaceId,
			user_id: userId,
		});
	}

	setRank(userId: unknown, rank: unknown) {
		if (!typeIs(userId, "number") || !typeIs(rank, "number")) {
			warn("UserId & rank must be number");
			return { status_code: 400, detail: "UserId must be number" };
		}
		return URLGenerator("roblox/set-rank", "POST", this, {
			workspace_id: this.WorkspaceId,
			user_id: userId,
			rank,
		});
	}
}
