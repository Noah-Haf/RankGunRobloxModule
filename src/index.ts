import { HttpService } from "@rbxts/services";
import { t } from "@rbxts/t";

type GroupMembership = {
	path: string;
	updateTime: string;
	user: string;
	role: string;
};

const groupMembershipT = t.interface({
	path: t.string,
	updateTime: t.string,
	user: t.string,
	role: t.string,
});

const baseUrl: string = "https://api.rankgun.works/roblox";

function Request(
	Method: "GET" | "HEAD" | "POST" | "PUT" | "DELETE" | "PATCH",
	endpoint: string,
	Body: string,
	ApiKey: string,
): GroupMembership {
	let response;
	try {
		response = HttpService.RequestAsync({
			Url: `${baseUrl}${endpoint}`,
			Method,
			Body,
			Headers: { "api-token": ApiKey, "Content-Type": "application/json" },
		});
	} catch (err) {
		error(`HTTP request failed: ${tostring(err)}`);
	}

	const DecodedBody = HttpService.JSONDecode(response.Body);

	if (!response.Success) {
		error(`Request to ${endpoint} failed with status code ${response.StatusCode} ${response.Body}`);
	}

	if (!groupMembershipT(DecodedBody)) {
		error(`Response validation failed: ${response.Body}`);
	}

	return DecodedBody;
}

export class Client {
	/**RankGun Client**/

	workspace_id: string;
	api_key: string;

	constructor(api_key: string, workspace_id: string) {
		this.api_key = api_key;
		this.workspace_id = workspace_id;
	}

	promote = (user_id: number): GroupMembership => {
		/**Promotes a user (+1 Rank). */
		const request = Request(
			"POST",
			"/promote",
			HttpService.JSONEncode({ user_id, workspace_id: this.workspace_id }),
			this.api_key,
		);

		return request;
	};

	demote = (user_id: number): GroupMembership => {
		/**Demotes a user (-1 Rank). */
		const request = Request(
			"POST",
			"/demote",
			HttpService.JSONEncode({ user_id, workspace_id: this.workspace_id }),
			this.api_key,
		);

		return request;
	};

	set_rank = (user_id: number, rank: number): GroupMembership => {
		/**Sets the rank of a user (Set Rank Rank). */
		const request = Request(
			"POST",
			"/set-rank",
			HttpService.JSONEncode({ user_id, rank, workspace_id: this.workspace_id }),
			this.api_key,
		);

		return request;
	};
}
