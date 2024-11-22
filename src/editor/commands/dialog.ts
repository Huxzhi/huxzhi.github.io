import { h } from "../utils/h";

export const pickFile = () => {
  const input = document.createElement("input");
  input.type = "file";
  input.accept = "image/*";
  return new Promise<FileList | null>((res, rej) => {
    input.addEventListener("change", () => {
      const files = input.files;
      res(files);
    });
    input.click();
  });
};
