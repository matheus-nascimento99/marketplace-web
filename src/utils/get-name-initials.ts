export const getNameInitials = (name: string) => {
  const splitedName = name.split(' ')

  let initials = ''

  if (splitedName.length < 2) {
    initials = `${splitedName[0].charAt(0)}`
  } else {
    initials = `${splitedName[0].charAt(0)}${splitedName[1].charAt(0)}`
  }

  return initials
}
