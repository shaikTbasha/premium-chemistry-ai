export interface ChatRequest {
  message: string;
}

export interface ChatResponse {
  role: "assistant";
  content: string;
}