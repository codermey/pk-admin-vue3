export const getAssetsImageUrl = (url: string) => {
  return new URL(`/src/assets/images/${url}`, import.meta.url).href
}
