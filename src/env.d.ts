/// <reference path="../.astro/types.d.ts" />
declare namespace JSX {
  interface IntrinsicElements {
    [elemName: string]: any; // 允许任意 HTML 元素名称
  }
}
