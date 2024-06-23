// src/types.ts
export interface Sample {
    id: string;
    name: string;
    description: string;
    projectId: string;
    createdAt: string;
    customFields?: { [key: string]: string };
    priorityLevel: string;
    category: string;
    groupAffiliation: string;
  }