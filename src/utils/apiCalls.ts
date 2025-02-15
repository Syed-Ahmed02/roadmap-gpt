export const generatePromptEmbedding = async (prompt: string) => {
    const response = await fetch("/api/embed", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt }),
    });
    const {
      embedding,
      errorMessage,
    }: { embedding: Array<number>; errorMessage: string } = await response.json();
    if (errorMessage) {
      return { error: errorMessage };
    }
    return { embedding };
  };
  
  export const getEmbeddingMetadata = async (queryVector: Array<number>) => {
    const response = await fetch("/api/query", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ queryVector }),
    });
    const { metadata, errorMessage } = await response.json();
    return errorMessage ?? metadata;
  };