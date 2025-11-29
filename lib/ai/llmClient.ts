import OpenAI from "openai";

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

if (!OPENAI_API_KEY) {
  console.warn("[OpenAI] Missing OPENAI_API_KEY. Set it in your .env.local");
}

export const OPENAI_TEXT_MODEL = process.env.OPENAI_TEXT_MODEL ?? "gpt-4o-mini";
export const OPENAI_VISION_MODEL =
  process.env.OPENAI_VISION_MODEL ?? "gpt-4o-mini";

export const openai = new OpenAI({
  apiKey: OPENAI_API_KEY,
});

export type OpenAiChatMessage =
  OpenAI.Chat.Completions.ChatCompletionMessageParam;

type ResponseFormat = "text" | "json_object";

type OpenAiChatParams = {
  messages: OpenAiChatMessage[];
  model?: string;
  responseFormat?: ResponseFormat;
  temperature?: number;
  maxTokens?: number;
};

/**
 * Helper umum untuk chat (tanpa gambar).
 * - responseFormat "text" => return string
 * - responseFormat "json_object" => parse JSON dan return T
 */
export async function callOpenAiChat<T = string>({
  messages,
  model = OPENAI_TEXT_MODEL,
  responseFormat = "text",
  temperature = 0.4,
  maxTokens = 2048,
}: OpenAiChatParams): Promise<T> {
  const completion = await openai.chat.completions.create({
    model,
    messages,
    temperature,
    max_tokens: maxTokens,
    response_format:
      responseFormat === "json_object" ? { type: "json_object" } : undefined,
  });

  const content = completion.choices[0]?.message?.content;

  if (!content) {
    throw new Error("OpenAI response missing content");
  }

  if (responseFormat === "json_object") {
    // content adalah string JSON
    return JSON.parse(content) as T;
  }

  return content as T;
}

/**
 * Helper khusus vision (teks + gambar).
 * Kalau kamu mau fleksibel, nanti bisa ditambah responseFormat juga.
 */
type OpenAiVisionParams = {
  prompt: string;
  imageDataUrl: string;
  model?: string;
  temperature?: number;
  maxTokens?: number;
};

export async function callOpenAiVision({
  prompt,
  imageDataUrl,
  model = OPENAI_VISION_MODEL,
  temperature = 0.1,
  maxTokens = 1200,
}: OpenAiVisionParams): Promise<string> {
  const completion = await openai.chat.completions.create({
    model,
    messages: [
      {
        role: "user",
        content: [
          {
            type: "text",
            text: prompt,
          },
          {
            type: "image_url",
            image_url: {
              url: imageDataUrl,
            },
          },
        ],
      },
    ],
    temperature,
    max_tokens: maxTokens,
  });

  const content = completion.choices[0]?.message?.content ?? "";
  const text = (content || "").trim();

  if (!text) {
    throw new Error("OpenAI vision did not return any text");
  }

  return text;
}
