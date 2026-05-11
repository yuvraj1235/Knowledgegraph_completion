export interface SubTopic {
  title: string;
  description: string;
}

export interface Topic {
  title: string;
  summary: string;
  subtopics: SubTopic[];
  status?: 'pending' | 'approved' | 'rejected';
}

export interface ExtractedTopics {
  topics: Topic[];
}

export interface IngestionResponse {
  transcript: string;
  extracted_topics: ExtractedTopics;
}
