import { config } from "urodele.config";
import { login } from "./Auth/auth";

export const mount = async () => {
  const url = new URL(location.href);
  const code = url.searchParams.get("code");
  if (!code) return;
  try {
    const response = await fetch(config.github.logInAuthUrl, {
      method: "POST",
      mode: "cors",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ code }),
    });
    const result = await response.json();
    if (result.error) {
      return alert(JSON.stringify(result, null, 2));
    }
    await login(result.token);
    location.replace("/");
  } catch (error) {
    console.error(error);
  }
};
