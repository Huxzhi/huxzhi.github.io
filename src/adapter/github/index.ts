import { parseMeta, toMeta } from "@/shared/transform";
import config from "@/../urodele.config";
import { Octokit } from "octokit";
import type { DeletePageByPath, ReadPageByPath, WritePage } from "../helper";
import { getLocalUser } from "@/shared/storage";

const { repo: REPO, login: OWNER } = config.github;

let _oc: Octokit | undefined;
const getOc = () => {
  if (_oc) return _oc;
  const token = getLocalUser()?.token;
  // if (!token) return undefined;
  const octokit = new Octokit({ auth: token });
  return octokit;
};

export const readPageByPath: ReadPageByPath = async (_id) => {
  const id = _id.replace(/\/$/, "");
  const path = `posts/${id}.json`;
  const octokit = getOc();
  const { data } = await octokit.request("GET /repos/{owner}/{repo}/contents/{path}", {
    owner: OWNER,
    repo: REPO,
    path: path,
  });
  // fix github base64
  const content = decodeURIComponent(escape(window.atob((data as any).content.replace(/\s/g, ""))));
  const json = JSON.parse(content);
  const meta = parseMeta(json);
  return {
    content: content,
    ...meta,
    id,
    path,
  };
};

function fileToBase64(file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const base64Data = (reader.result as string).split(",")[1]; // 移除 Data URI 的前缀
      resolve(base64Data);
    };
    reader.onerror = (error) => reject(error);
  });
}

export const writePage: WritePage = async (_path, data, assets) => {
  const path = _path.replace(/\/$/, "");
  const octokit = getOc();
  const { data: user } = await octokit.request({ url: "/user" });
  const userName = user.login;
  const main = await octokit.request("GET /repos/{owner}/{repo}/git/ref/{ref}", {
    owner: userName,
    ref: "heads/main",
    repo: REPO,
    headers: {
      "X-GitHub-Api-Version": "2022-11-28",
    },
  });
  console.log(main, "main");
  const meta = toMeta({ ...data, updateTime: Date.now() });
  const rawString = JSON.stringify({ ...meta, ...JSON.parse(data.content) });
  const textFile = new File([new Blob([rawString], { type: "application/json" })], path.replace(/^\//, ""));
  const tree = await Promise.all(
    [
      ...assets.map(({ file }) => ({
        path: `public/post-assets/${file.name}`,
        file,
      })),
      {
        path: `posts/${path}.json`,
        file: textFile,
      },
    ].map(async ({ file, path }) => {
      const fileURI = typeof file === "string" ? btoa(file) : await fileToBase64(file);
      const blob = await octokit.request("POST /repos/{owner}/{repo}/git/blobs", {
        owner: userName,
        repo: REPO,
        content: fileURI,
        encoding: "base64",
      });
      console.log(blob, "blob");
      return {
        path,
        sha: blob.data.sha,
        mode: "100644",
        type: "blob",
      } as const;
    })
  );
  const newTree = await octokit.request("POST /repos/{owner}/{repo}/git/trees", {
    owner: userName,
    repo: REPO,
    tree,
    base_tree: main.data.object.sha,
  });
  console.log(newTree, "new tree");

  const commit = await octokit.request("POST /repos/{owner}/{repo}/git/commits", {
    owner: userName,
    repo: REPO,
    message: `update by urodele`,
    tree: newTree.data.sha,
    parents: [main.data.object.sha],
  });

  console.log(commit, "commit");
  const res = await octokit.request("PATCH /repos/{owner}/{repo}/git/refs/{ref}", {
    owner: userName,
    repo: REPO,
    ref: main.data.ref.replace(/^refs\//, ""),
    sha: commit.data.sha,
  });
  console.log(res, "res");
};

export const deletePageByPath: DeletePageByPath = async (_path, assets) => {
  console.log(_path, assets);
  const path = _path.replace(/\/$/, "");
  const octokit = getOc();
  const { data: user } = await octokit.request({ url: "/user" });
  const userName = user.login;
  const main = await octokit.request("GET /repos/{owner}/{repo}/git/ref/{ref}", {
    owner: userName,
    ref: "heads/main",
    repo: REPO,
    headers: {
      "X-GitHub-Api-Version": "2022-11-28",
    },
  });
  const tree = [
    ...assets.map((p) => ({
      path: p.replace("/post-assets", "public/post-assets"),
      mode: "100644" as const,
      sha: null,
    })),
    {
      path: `posts/${path}.json`,
      mode: "100644" as const,
      sha: null,
    },
  ];
  const newTree = await octokit.request("POST /repos/{owner}/{repo}/git/trees", {
    owner: userName,
    repo: REPO,
    base_tree: main.data.object.sha,
    tree: tree,
  });
  console.log(newTree, "new tree");

  const commit = await octokit.request("POST /repos/{owner}/{repo}/git/commits", {
    owner: userName,
    repo: REPO,
    message: `deleted by urodele`,
    tree: newTree.data.sha,
    parents: [main.data.object.sha],
  });

  console.log(commit, "commit");
  const res = await octokit.request("PATCH /repos/{owner}/{repo}/git/refs/{ref}", {
    owner: userName,
    repo: REPO,
    ref: main.data.ref.replace(/^refs\//, ""),
    sha: commit.data.sha,
  });
  console.log(res, "res");
};

// async function getFileSHA(file: File) {
//   const buffer = await file.arrayBuffer();
//   const hashBuffer = await crypto.subtle.digest("SHA-1", buffer);
//   const hashArray = Array.from(new Uint8Array(hashBuffer));
//   const hashHex = hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
//   return hashHex;
// }
