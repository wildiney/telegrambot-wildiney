export const listBookmark = (request: any, response: any) => {
  response.status(200).json({ bookmarks: null })
}

export const saveBookmark = (request: any, response: any) => {
  response.status(200).json({ saveBookmark: 200 })
}
