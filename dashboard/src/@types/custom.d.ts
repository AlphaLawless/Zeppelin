declare module '*.html?raw' {
  const content: string
  export default content
}

declare module '*.pcss' {
  const content: any
  export default content
}

declare module "*.vue" {
  import Vue from "vue";
  export default Vue;
}

declare module "*.png" {
  const value: string;
  export default value;
}

