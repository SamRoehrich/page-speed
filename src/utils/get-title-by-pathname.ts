export function getTitleByPathname(path: string) {
  switch (path) {
    case "/":
      return "| Home";
    default:
      return "";
  }
}
