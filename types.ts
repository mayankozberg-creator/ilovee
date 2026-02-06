
export interface PartnerConfig {
  name: string;
  nickname: string;
  relationshipLength: string;
  specialMemory: string;
  vibe: 'romantic' | 'playful' | 'deep';
  couplePhotoBase64?: string;
}

export type AppStage = 'setup' | 'envelope' | 'sync' | 'question' | 'climax';
