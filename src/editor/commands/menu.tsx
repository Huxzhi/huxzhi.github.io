import * as React from "jsx-dom";

export const createMenu = (props: { items: { title: string; command: any }[]; editor: any; command: any }) => {
  const { items } = props;
  const buttons = items.map((item) => {
    return (
      <button
        onClick={() => {
          props.command(item);
        }}>
        {item.title}
      </button>
    ) as HTMLElement;
  });
  const root = (<div class="ud-root slash-menu">{buttons}</div>) as HTMLElement;
  let selectedIndex = 0;
  const setSelectedIndex = (index: number) => {
    buttons.forEach((bt, i) => {
      if (index === i) {
        bt.classList.add("selected");
      } else {
        bt.classList.remove("selected");
      }
    });
  };
  setSelectedIndex(0);
  const upHandler = () => {
    selectedIndex = selectedIndex === 0 ? buttons.length - 1 : selectedIndex - 1;
    setSelectedIndex(selectedIndex);
  };
  const downHandler = () => {
    selectedIndex = selectedIndex === buttons.length - 1 ? 0 : selectedIndex + 1;
    setSelectedIndex(selectedIndex);
  };
  const enterHandler = () => {
    props.command(items[selectedIndex]);
  };
  root.append(...buttons);
  const onKeyDown = ({ event }: { event: KeyboardEvent }) => {
    if (event.key === "ArrowUp") {
      upHandler();
      return true;
    }

    if (event.key === "ArrowDown") {
      downHandler();
      return true;
    }

    if (event.key === "Enter") {
      enterHandler();
      return true;
    }

    return false;
  };
  const updateProps = (_p: any) => {};

  return {
    dom: root,
    updateProps,
    onKeyDown,
    destroy: () => root.remove(),
  };
};
