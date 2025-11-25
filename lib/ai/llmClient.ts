const AI_PROVIDER = process.env.AI_PROVIDER ?? ("zai" as "zai" | "openrouter");

const ZAI_BASE_URL = process.env.ZAI_BASE_URL ?? "https://api.z.ai";
const ZAI_MODEL = process.env.ZAI_MODEL ?? "glm-4.5-flash";
const ZAI_VISION_MODEL = process.env.ZAI_VISION_MODEL ?? "glm-4.5v";
const ZAI_API_KEY = process.env.ZAI_API_KEY;

if (!ZAI_API_KEY) {
  console.warn("[ZAI] Missing ZAI_API_KEY. Set it in your .env.local");
}

const OPENROUTER_BASE_URL =
  process.env.OPENROUTER_BASE_URL ?? "https://openrouter.ai";
const OPENROUTER_MODEL =
  process.env.OPENROUTER_MODEL ?? "deepseek/deepseek-chat-v3-0324:free";
const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
const OPENROUTER_REFERER =
  process.env.OPENROUTER_REFERER ?? "https://welinas.vercel.app";
const OPENROUTER_TITLE = process.env.OPENROUTER_TITLE ?? "Welinas";

if (AI_PROVIDER === "openrouter" && !OPENROUTER_API_KEY) {
  console.warn(
    "[OpenRouter] Missing OPENROUTER_API_KEY. Set it in your .env.local"
  );
}

export type ChatMessage = {
  role: "system" | "user" | "assistant";
  content: string;
};

type ChatResponseFormat = "text" | "json_object";

type ChatParams = {
  messages: ChatMessage[];
  responseFormat?: ChatResponseFormat;
  temperature?: number;
  maxTokens?: number;
};

// export async function callZaiChat<T = unknown>({
//   messages,
//   responseFormat = "text",
//   temperature = 0.4,
//   maxTokens = 2048,
// }: ChatParams): Promise<T> {
//   const res = await fetch(`${ZAI_BASE_URL}/api/paas/v4/chat/completions`, {
//     method: "POST",
//     headers: {
//       Authorization: `Bearer ${ZAI_API_KEY}`,
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({
//       model: ZAI_MODEL,
//       messages,
//       temperature,
//       max_tokens: maxTokens,
//       stream: false,
//       thinking: { type: "disabled" }, // hemat token
//       response_format: { type: responseFormat },
//     }),
//   });

//   if (!res.ok) {
//     const text = await res.text().catch(() => "");
//     throw new Error(
//       `ZAI request failed: ${res.status} ${res.statusText} ${text}`
//     );
//   }

//   type ZaiApiChoice = { message?: { content?: string } };
//   type ZaiApiResponse = { choices?: ZaiApiChoice[] };

//   const json = (await res.json()) as ZaiApiResponse;
//   const choice = json.choices?.[0];
//   const content = choice?.message?.content;

//   if (!content) {
//     throw new Error("ZAI response missing content");
//   }

//   if (responseFormat === "json_object") {
//     // content adalah string JSON
//     return JSON.parse(content) as T;
//   }

//   return content as T;
// }

type ZaiVisionParams = {
  imageDataUrl: string; // data:... atau URL publik
  prompt: string;
  temperature?: number;
  maxTokens?: number;
};

export async function callAiChat<T = unknown>({
  messages,
  responseFormat = "text",
  temperature = 0.4,
  maxTokens = 2048,
}: ChatParams): Promise<T> {
  if (AI_PROVIDER === "openrouter") {
    return callOpenRouterChat<T>({
      messages,
      responseFormat,
      temperature,
      maxTokens,
    });
  }

  return callZaiDirect<T>({
    messages,
    responseFormat,
    temperature,
    maxTokens,
  });
}

async function callZaiDirect<T = unknown>({
  messages,
  responseFormat = "text",
  temperature = 0.4,
  maxTokens = 2048,
}: ChatParams): Promise<T> {
  const res = await fetch(`${ZAI_BASE_URL}/api/paas/v4/chat/completions`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${ZAI_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: ZAI_MODEL,
      messages,
      temperature,
      max_tokens: maxTokens,
      stream: false,
      thinking: { type: "disabled" }, // hemat token
      response_format: { type: responseFormat },
    }),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(
      `ZAI request failed: ${res.status} ${res.statusText} ${text}`
    );
  }

  type ZaiApiChoice = { message?: { content?: string } };
  type ZaiApiResponse = { choices?: ZaiApiChoice[] };

  const json = (await res.json()) as ZaiApiResponse;
  const choice = json.choices?.[0];
  const content = choice?.message?.content;

  if (!content) {
    throw new Error("ZAI response missing content");
  }

  if (responseFormat === "json_object") {
    return JSON.parse(content) as T;
  }

  return content as T;
}

export async function callZaiVision({
  imageDataUrl,
  prompt,
  temperature = 0,
  maxTokens = 2048,
}: ZaiVisionParams): Promise<string> {
  const res = await fetch(`${ZAI_BASE_URL}/api/paas/v4/chat/completions`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${ZAI_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: ZAI_VISION_MODEL,
      messages: [
        {
          role: "user",
          content: [
            {
              type: "image_url",
              image_url: {
                url: imageDataUrl,
              },
            },
            {
              type: "text",
              text: prompt,
            },
          ],
        },
      ],
      temperature,
      max_tokens: maxTokens,
      stream: false,
      thinking: { type: "disabled" },
    }),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(
      `ZAI vision request failed: ${res.status} ${res.statusText} ${text}`
    );
  }

  type ZaiVisionChoice = { message?: { content?: string } };
  type ZaiVisionResponse = { choices?: ZaiVisionChoice[] };

  const json = (await res.json()) as ZaiVisionResponse;
  const content = json.choices?.[0]?.message?.content;

  if (!content) {
    throw new Error("ZAI vision response missing content");
  }

  return content;
}

async function callOpenRouterChat<T = unknown>({
  messages,
  responseFormat = "text",
  temperature = 0.4,
  maxTokens = 2048,
}: ChatParams): Promise<T> {
  const res = await fetch(`${OPENROUTER_BASE_URL}/api/v1/chat/completions`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${OPENROUTER_API_KEY}`,
      "Content-Type": "application/json",
      // OpenRouter strongly recommends these 2 headers
      "HTTP-Referer": OPENROUTER_REFERER,
      "X-Title": OPENROUTER_TITLE,
    },
    body: JSON.stringify({
      model: OPENROUTER_MODEL,
      messages,
      temperature,
      max_tokens: maxTokens,
      // Untuk JSON mode, banyak model OpenAI-compatible mendukung ini.
      ...(responseFormat === "json_object"
        ? { response_format: { type: "json_object" } }
        : {}),
    }),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(
      `OpenRouter request failed: ${res.status} ${res.statusText} ${text}`
    );
  }

  type OrChoice = { message?: { content?: string } };
  type OrResponse = { choices?: OrChoice[] };

  const json = (await res.json()) as OrResponse;
  const choice = json.choices?.[0];
  const content = choice?.message?.content;

  if (!content) {
    throw new Error("OpenRouter response missing content");
  }

  if (responseFormat === "json_object") {
    // OpenRouter juga mengembalikan content sebagai string JSON
    return JSON.parse(content) as T;
  }

  return content as T;
}
