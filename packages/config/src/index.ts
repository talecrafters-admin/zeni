export type ZeniEnv = 'test'|'uat'|'prod';
export const cfg = (env: ZeniEnv) => ({
  firestoreRoot: 'users',
  features: { aiBuddy: true, voiceJournal: env !== 'test' }
});
