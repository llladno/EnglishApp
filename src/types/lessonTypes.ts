export interface Word{
  word: string;
  translate: string
}

export interface Settings {
  category: string;
  theme: string;
  level: string;
}

export interface Lesson extends Settings{
  words: Word[];
}