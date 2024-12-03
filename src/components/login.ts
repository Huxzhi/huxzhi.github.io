import { config } from "urodele.config";
import { login } from "./Auth/auth";

export const mount = async () => {
  const url = new URL(location.href);
  const params = Object.fromEntries(Array.from(url.searchParams.entries()));
  try {
    const response = await fetch(config.github.logInAuthUrl, {
      method: "POST",
      mode: "cors",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(params),
    });
    const result = await response.json();
    if (result.error) {
      return alert(JSON.stringify(result, null, 2));
    }
    await login(result.token);
  } catch (error: any) {
    alert(error.message);
    console.error(error);
  } finally {
    location.replace("/");
  }
};
