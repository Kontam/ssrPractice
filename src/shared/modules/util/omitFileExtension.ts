export function omitFileExtension(filename: string) {
  return filename.replace(/\..*?$/, "");
}
