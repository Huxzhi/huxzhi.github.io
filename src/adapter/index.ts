import * as FSAdapter from "./fs";
import * as GithubAdapter from "./github";

const adapter = import.meta.env.DEV ? FSAdapter : GithubAdapter;

export default adapter;
