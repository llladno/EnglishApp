interface userI {
  id: number,
  login: string,
  email: string,
  health: number,
  money: number,
  chests: chestI[],
  words: string[],
}

interface chestI {
  time: string,
  reward: any,
}

interface registrationUserI {
  email: string,
  login: string,
  password: string,
}