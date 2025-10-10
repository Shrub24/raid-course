---
publish: "true"
---
Instead of waiting for the entire response, you can **stream** it token-by-token, just like ChatGPT's typing effect!

**📓 Continue in `lesson1-litellm-exercise.ipynb`** - Reference: `lesson1-litellm-solutions.ipynb`

## How Streaming Works

```python
response = litellm.completion(
  model=OLLAMA_MODEL, 
  messages=messages,
  stream=True  # Enable streaming
)

for chunk in response:
    content = chunk.choices[0].delta.content
    if content:  # Check if content exists (some chunks may be empty)
        print(content, end="", flush=True)
```

## Key Differences from Regular Completion

| Regular Completion | Streaming |
|-------------------|-----------|
| `stream=False` (default) | `stream=True` |
| Get complete response at once | Get response chunk-by-chunk |
| `response.choices[0].message.content` | `chunk.choices[0].delta.content` |
| Wait for full generation | Start displaying immediately |
| Response is a single object | Response is an [iterator](https://docs.python.org/3/glossary.html#term-iterator) |

## Understanding the Print Parameters

```python
print(content, end="", flush=True)
```

- `end=""` keeps the cursor on the same line (no newline after each chunk)
- `flush=True` forces immediate display (don't wait for buffer to fill)

Together, these create the smooth "typing effect" you see in ChatGPT.

📚 Learn more: [print() function documentation](https://docs.python.org/3/library/functions.html#print)

## When to Use Streaming

✅ **Use streaming for:**
- User-facing applications (better UX)
- Long responses (show progress immediately)
- Real-time interactions
- Chat interfaces

❌ **Don't use streaming for:**
- Processing responses programmatically (easier with complete text)
- When you need the full response before continuing
- Simple scripts where UX doesn't matter

Learn more about [streaming in LiteLLM](https://docs.litellm.ai/docs/completion/stream).

## Exercise

Try modifying the notebook to:
1. Ask the AI to write a short story
2. Stream the response to see it appear word-by-word
3. Compare streaming vs non-streaming for the same prompt

## Key Takeaways

✅ Add `stream=True` to enable streaming  
✅ Loop through response chunks with `for chunk in response:`  
✅ Access content via `.delta.content` instead of `.message.content`  
✅ Use `print(end="", flush=True)` for smooth typing effect  

## What's Next?

In the next lesson, you'll learn how to control the creativity and randomness of AI responses using the temperature parameter.

---

**Previous:** [[Lesson 1.1 - Your First API Call]]  
**Next:** [[Lesson 1.3 - Temperature Control]]

