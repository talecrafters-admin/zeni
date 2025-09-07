export type UID = string;
export interface MoodEntry { id:string; score:number; tags?:string[]; createdAt:number; }
export interface JournalEntry { id:string; text:string; sentiment?:'pos'|'neg'|'neu'; createdAt:number; }
export interface ZeniScore { date:string; score:number; inputs:{mood:number; journal:number; habits:number; sessions:number}; }
