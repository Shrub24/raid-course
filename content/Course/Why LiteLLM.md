---
publish: "true"
---
## Why Use LiteLLM Instead of Direct API Calls?

When you use the OpenAI API directly, your code looks like this:
```python
from openai import OpenAI
client = OpenAI()
response = client.chat.completions.create(
    model="gpt-4",
    messages=[{"role": "user", "content": "Hello!"}]
)
```

This works great... until you want to:
- Try a different model provider (like Gemini or Claude)
- Use a local model through Ollama
- Switch between providers for cost/performance optimization
- Build vendor-agnostic applications

With LiteLLM, you get **one interface for everything**:

```python
import litellm
# OpenAI
response = litellm.completion(model="gpt-4", messages=messages)
# Google Gemini
response = litellm.completion(model="gemini/gemini-2.5-flash", messages=messages)
# Local Ollama model
response = litellm.completion(model="ollama_chat/llama3", messages=messages)
# Anthropic Claude
response = litellm.completion(model="claude-3-sonnet", messages=messages)
```

**Key Benefits:**
1. **Model Flexibility**: Easily experiment with different providers without rewriting code
2. **Cost Optimization**: Switch to cheaper models for simpler tasks
3. **Vendor Independence**: Avoid lock-in to a single provider
4. **Local Development**: Use free local models (via Ollama) during development
5. **Production Ready**: Built-in retries, fallbacks, and error handling

## Important Limitations to Know

While LiteLLM is powerful, it's important to understand its current limitations:

### 1. Completion API Only

LiteLLM primarily uses the **completion/chat completion** interface. This means:

- ✅ Great for: Chat, text generation, most common use cases
- ⚠️ Limited for: Provider-specific APIs like OpenAI's newer features (e.g., certain response formats, advanced APIs)

Some providers have additional APIs (embeddings, image generation, fine-tuning) that may require direct API calls or have different LiteLLM methods.

### 2. Provider-Specific Features

Not all parameters work across all providers:

```python
# This parameter might work with some models but not others
response = litellm.completion(
    model="gpt-4",
    messages=messages,
    response_format={"type": "json_object"}  # Not supported by all providers
)
```

**What this means for you:**
- Core parameters (`model`, `messages`, `temperature`, `max_tokens`, `stream`) work universally
- Advanced parameters may be provider-specific
- Different providers support different capabilities (streaming, function calling, JSON mode, vision, etc.)

#### Checking Supported Parameters

LiteLLM provides a handy function to check which parameters are supported for a specific model:

```python
from litellm import get_supported_openai_params

# Check what parameters work for a specific model
supported = get_supported_openai_params(model="gemini/gemini-2.5-flash")
print(supported)
# Output: ["temperature", "max_tokens", "top_p", "stream", "tools", ...]

# For models that need a custom provider specified
supported = get_supported_openai_params(
    model="anthropic.claude-3", 
    custom_llm_provider="bedrock"
)
print(supported)
# Output: ["max_tokens", "tools", "tool_choice", "stream"]
```

This is useful when you're switching between models and want to ensure your parameters will work.

**See the complete feature parity table:** The [LiteLLM completion input documentation](https://docs.litellm.ai/docs/completion/input) includes a comprehensive table showing which parameters are supported by each provider (temperature, max_tokens, streaming, tools, response_format, and more).

**Best Practice:** Test with your target provider before committing to specific features, or use `get_supported_openai_params()` to verify compatibility.

#### Error Handling Differences

Different providers return errors in different formats. LiteLLM standardizes most of this, but edge cases may require provider-specific handling.

## Why Learn with LiteLLM?

LiteLLM is the ideal tool for learning AI development because it teaches you **transferable skills** that work everywhere:

✅ **Learn Once, Use Everywhere** - The skills you learn work across OpenAI, Google, Anthropic, local models, and 100+ providers  
✅ **Provider-Agnostic Skills** - You're learning core LLM concepts, not vendor-specific quirks  
✅ **Industry Standard Approach** - Most production systems need multi-provider support; you're learning the real-world pattern  
✅ **Future-Proof** - As new AI providers emerge, your LiteLLM knowledge transfers immediately  
✅ **Open Source** - Transparent, community-driven, and free to use ([GitHub](https://github.com/BerriAI/litellm))  
✅ **Cost-Effective Learning** - Switch between free local models (Ollama) and cheap cloud APIs as needed  

For this course, we'll focus on the universal features that work across all providers, giving you a solid foundation for any LLM application.

Learn more: [LiteLLM on GitHub](https://github.com/BerriAI/litellm) | [Supported Features](https://docs.litellm.ai/docs/completion/input)

---

**Back to:** [[Lesson 1.0 - Introduction to LiteLLM]]

