import * as React from "jsx-dom";
import { getGlobalData } from "@/utils/data";
import style from "./style.module.scss";
import { TAG_PIN } from "@/shared/tag";
import { cn } from "@/utils/dom";

export const createTagEditor = async (root: HTMLElement, initial: string[]) => {
  const data = await getGlobalData();
  const allTags = [...new Set([...data.map((p) => p.tags).flat(), TAG_PIN])];
  const modelValue: string[] = [...initial];

  const changeListeners: any[] = [];
  const render = () => {
    const tagEditor = React.createRef();
    const tagsListWrapper = React.createRef();
    const createTag = (tag: string) => (
      <div key={tag} class={cn("rounded px-3 py-1 cursor-pointer relative group", style["tag"])}>
        <button
          class="opacity-0 transition-delay-[0.25s] group-hover:opacity-100 absolute bg-red top-0 right-0 w-3 h-3 rounded-full flex items-center justify-center"
          onClick={() => toRemove(tag)}>
          <div class="i-ri:close-line text-white"></div>
        </button>
        #{tag}
      </div>
    );
    const tagList = () => modelValue.map(createTag);

    const tagsSelectionListWrapper = React.createRef();
    const tagSelectionList = () => {
      const otherTags = allTags.filter((t) => !modelValue.includes(t));
      return otherTags.map((tag) => (
        <button key={tag} class="text-button text-gray hover:text-text" onClick={() => toAddTag(tag)}>
          #{tag}
        </button>
      ));
    };
    const tagInput = React.createRef();

    const toRemove = (t: string) => {
      modelValue.splice(
        modelValue.findIndex((v) => v === t),
        1
      );
      (tagsListWrapper.current as HTMLElement)?.replaceChildren(...tagList());
      (tagsSelectionListWrapper.current as HTMLElement)?.replaceChildren(...tagSelectionList());
      changeListeners.forEach((f) => f());
    };
    const toAddTag = (v?: string) => {
      const newV = v ?? tagInput.current.value;
      if (!newV) return;
      if (modelValue.includes(newV)) return;
      if (tagInput.current.value) {
        tagInput.current.value = "";
        tagEditor.current.blur();
      }
      modelValue.push(newV);
      (tagsListWrapper.current as HTMLElement)?.replaceChildren(...tagList());
      (tagsSelectionListWrapper.current as HTMLElement)?.replaceChildren(...tagSelectionList());
      changeListeners.forEach((f) => f());
    };

    return (
      <div ref={tagEditor} class={cn("flex text-sm px-[28px] gap-2 w-full max-w-[720px]", style["tag-editor"])}>
        <div ref={tagsListWrapper} class="flex gap-2">
          {tagList()}
        </div>
        <div class={cn("relative", style["add-tag"])}>
          <button class="rounded text-gray hover:bg-gray-200 px-2 py-1 cursor-pointer">#Add a Tag</button>
          <div class={cn("absolute z-[50]", style["tag-selector"])}>
            <div class="flex flex-col bg-modal shadow-md rounded p-2 gap-2 text-sm">
              <div class="flex items-center justify-center gap-2">
                <input
                  ref={tagInput}
                  type="text"
                  class="border px-2 py-1 rounded outline-none border-blue w-[180px] text-xs bg-transparent"
                  placeholder="Create new Tag"
                />
                <button class="text-button text-blue" onClick={() => toAddTag()}>
                  Add
                </button>
              </div>
              <div ref={tagsSelectionListWrapper} class="flex flex-col">
                {tagSelectionList()}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  root.appendChild(render());
  return {
    getValue: () => modelValue,
    onChange: (fn: any) => {
      changeListeners.push(fn);
      return () =>
        changeListeners.splice(
          changeListeners.findIndex((f) => f === fn),
          1
        );
    },
  };
};
