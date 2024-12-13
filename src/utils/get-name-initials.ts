export const getNameInitials = (name: string) => {
  const splitedName = name.split(' ')

  if (splitedName.length < 2) {
    throw new Error('Name is not complete')
  }

  const initials = `${splitedName[0].charAt(0)}${splitedName[1].charAt(0)}`

  return initials
}
