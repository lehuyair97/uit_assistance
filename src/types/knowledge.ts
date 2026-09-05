export interface KnowledgeDocument {
  id: string;
  title: string;
  category: 'handbook' | 'asiin' | 'admissions' | 'syllabus' | 'general';
  filePath?: string;
  fileUri?: string;
  mimeType?: string;
  summary?: string;
  updatedAt: string;
}

export interface GroundingContext {
  systemPrompt: string;
  documents?: KnowledgeDocument[];
}
