---
publish: "true"
---
## What is LiteLLM?

[LiteLLM](https://docs.litellm.ai/docs/) is a unified API wrapper that lets you call 100+ different Large Language Models (LLMs) using the same code format. Instead of learning different APIs for OpenAI, Google's Gemini, Anthropic's Claude, local models, and more, you write your code once and can switch between any model with just a single parameter change.

## Why Use LiteLLM?

LiteLLM gives you **one simple interface** to work with any AI model. Write your code once, and easily switch between OpenAI, Google Gemini, local models, or 100+ other providers by changing just one parameter.

**Quick Benefits:**
- **Flexibility**: Try different AI providers without rewriting code
- **Cost Savings**: Switch to cheaper models for simple tasks
- **Local Development**: Use free local models during development
- **Future-Proof**: Works with new AI providers as they emerge

**Example** - Same code works everywhere:
```python
import litellm
# Use any model by just changing the model name
response = litellm.completion(model="gpt-4", messages=messages)
response = litellm.completion(model="gemini/gemini-2.5-flash", messages=messages)
response = litellm.completion(model="ollama_chat/llama3", messages=messages)
```

> **📚 Want to learn more?** See [[Why LiteLLM]] for detailed technical considerations, limitations, and feature comparisons between providers.

## Setting Up API Keys

For this course, we'll primarily use Google's Gemini API (which has a generous free tier) and local Ollama models. However, you can add API keys for any provider you'd like to use.

### Getting a Gemini API Key

1. Visit [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy your key

### Storing API Keys

#### If Using GitHub Codespaces (Recommended)

1. Go to your [GitHub Settings > Codespaces](https://github.com/settings/codespaces)
2. Under "Codespaces secrets", click "New secret"
3. Add your API keys with these names:
   - `GEMINI_API_KEY` - For Google Gemini (required for this course)
   - `OPENAI_API_KEY` - For OpenAI GPT models (optional)
   - `ANTHROPIC_API_KEY` - For Anthropic Claude models (optional)
4. Click "Add secret" for each

LiteLLM will automatically detect these [environment variables](https://docs.python.org/3/library/os.html#os.environ) and use them for API calls to the respective providers.

**Note:** Your Codespace already has Ollama pre-installed with a local model, so you can use that for free development and testing without any API keys!

#### If Using Local Dev Containers or Manual Setup

If you're running the environment locally (via Dev Containers or manual setup), you can store API keys in a `.env` file:

```bash
cp .env.template .env
# Then edit .env with your API keys
```

The `.env` file should contain your API keys like this:
```
GEMINI_API_KEY=your_key_here
OPENAI_API_KEY=your_key_here  # optional
ANTHROPIC_API_KEY=your_key_here  # optional
```

---

For more details on API keys and authentication, see the [LiteLLM documentation on API keys](https://docs.litellm.ai/docs/providers).

## What's Next?

In the next lesson, you'll make your first LiteLLM API call and learn the basic message structure.

---

**Next:** [[Lesson 1.1 - Your First API Call]]

