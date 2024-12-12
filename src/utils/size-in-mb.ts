export const ACCEPTED_IMAGE_TYPES = ['image/png', 'image/jpg', 'image/jpeg']

export const MAX_IMAGE_SIZE = 4

export const sizeInMB = (sizeInBytes: number, decimalsNum = 2) => {
  const result = sizeInBytes / (1024 * 1024)
  return +result.toFixed(decimalsNum)
}
