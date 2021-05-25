export const ranks = ['user', 'mod', 'admin', 'dev'] as const;
export type Rank = typeof ranks[number];
