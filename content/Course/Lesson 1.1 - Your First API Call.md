---
publish: "true"
---
Now let's make your first LiteLLM call! 

**📓 Work in `lesson1-litellm-exercise.ipynb`** - You can reference `lesson1-litellm-solutions.ipynb` if you get stuck.

## Setup

First, import the necessary libraries:

```python
import litellm 
from dotenv import load_dotenv
import os

# Load .env file for non-codespace users
load_dotenv()
OLLAMA_MODEL = f"ollama_chat/{os.environ['OLLAMA_MODEL']}"
```

**What's happening here:**
- `litellm`: The main library we're using
- `dotenv`: Loads environment variables from a `.env` file (useful for local development)
- `os`: Used to access environment variables via `os.environ`
- `OLLAMA_MODEL`: Pre-configured local model using an [f-string](https://docs.python.org/3/tutorial/inputoutput.html#formatted-string-literals) for string formatting

## Basic Message Structure

All LLM interactions use a **messages list** format. Each message is a dictionary with a `role` and `content`:

```python
messages = [
    {"role": "user", "content": "What is the capital of Australia?"}
]

response = litellm.completion(
  model="gemini/gemini-2.5-flash", 
  messages=messages,
)

print(response.choices[0].message.content)
```

**Understanding the response:**
- `response.choices[0]`: The first (and usually only) completion choice
- `.message.content`: The actual text response from the model

**Model naming conventions:**
- OpenAI: Just the model name (e.g., `"gpt-4"`)
- Gemini: `"gemini/model-name"` (e.g., `"gemini/gemini-2.5-flash"`)
- Ollama: `"ollama_chat/model-name"` (e.g., `"ollama_chat/llama3"`)

See the full list of [supported providers](https://docs.litellm.ai/docs/providers) in the docs.

## Switching Models

One of LiteLLM's superpowers is seamless switching between cloud and local models. Try using the local Ollama model:

```python
response = litellm.completion(
  model=OLLAMA_MODEL,  # Using local model instead of cloud API
  messages=messages
)

print(response.choices[0].message.content)
```

**Why use local models?**
- 🆓 Completely free (no API costs)
- 🔒 Privacy (data never leaves your machine)
- ⚡ No rate limits
- 🚀 Great for development and testing

Your Codespace has Ollama pre-installed with a [phi4-mini](hf.co/unsloth/Phi-4-mini-instruct-GGUF) model ready to use. Learn more about [Ollama integration](https://docs.litellm.ai/docs/providers/ollama).

## Key Takeaways

✅ Messages are formatted as `[{"role": "...", "content": "..."}]`  
✅ Use `litellm.completion()` with model and messages parameters  
✅ Switch between any provider by just changing the model name  
✅ Access responses via `response.choices[0].message.content`  

## What's Next?

In the next lesson, you'll learn how to stream responses token-by-token for a better user experience.

---

**Previous:** [[Lesson 1.0 - Introduction to LiteLLM]]  
**Next:** [[Lesson 1.2 - Streaming Responses]]

