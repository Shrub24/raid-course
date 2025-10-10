---
publish: "true"
---
The `temperature` parameter is one of the most important settings for controlling AI behavior. It controls the randomness and creativity of responses.

**📓 Continue in `lesson1-litellm-exercise.ipynb`** - Reference: `lesson1-litellm-solutions.ipynb`

## Understanding Temperature

Temperature ranges from **0.0 to 2.0**:

```python
messages = [{"role": "user", "content": "Write a creative tagline for a coffee shop"}]

# Deterministic and focused
response = litellm.completion(
    model="gemini/gemini-2.5-flash",
    messages=messages,
    temperature=0.0
)

# Creative and varied
response = litellm.completion(
    model="gemini/gemini-2.5-flash",
    messages=messages,
    temperature=1.5
)
```

## Temperature Guide

| Range | Behavior | Best For |
|-------|----------|----------|
| **0.0 - 0.3** | Deterministic, consistent, factual | Data extraction, classification, math, factual Q&A |
| **0.7 - 1.0** | Balanced creativity | General chat, explanations, most tasks |
| **1.5 - 2.0** | Very creative, unpredictable | Creative writing, brainstorming, poetry |

## How Temperature Works

Behind the scenes, temperature affects the probability distribution of the next token:

- **Low temperature (0.0)**: The model almost always picks the most likely next word
  - Running the same prompt multiple times gives nearly identical results
  - More "boring" but consistent and reliable
  
- **High temperature (2.0)**: The model considers less likely words too
  - Running the same prompt multiple times gives very different results
  - More creative and surprising, but can be incoherent

## Experiment: See Temperature in Action

Try running this prompt multiple times at different temperatures:

```python
messages = [{"role": "user", "content": "Complete this sentence: The sky turned"}]

# Run this 3 times
for i in range(3):
    response = litellm.completion(
        model="gemini/gemini-2.5-flash",
        messages=messages,
        temperature=0.0  # Try changing to 1.5
    )
    print(f"Run {i+1}: {response.choices[0].message.content}")
```

At temperature 0.0, you'll get nearly identical completions. At 1.5, each one will be different!

## Practical Examples

### Example 1: Factual Questions (Low Temperature)
```python
# Use temperature 0.0 for consistent, factual answers
messages = [{"role": "user", "content": "What is the capital of France?"}]
response = litellm.completion(model="gemini/gemini-2.5-flash", messages=messages, temperature=0.0)
# Result: Always "Paris"
```

### Example 2: Creative Writing (High Temperature)
```python
# Use temperature 1.5 for creative, varied stories
messages = [{"role": "user", "content": "Write a one-sentence sci-fi story."}]
response = litellm.completion(model="gemini/gemini-2.5-flash", messages=messages, temperature=1.5)
# Result: Different creative stories each time
```

### Example 3: Balanced Chat (Medium Temperature)
```python
# Use temperature 0.7-1.0 for natural conversation
messages = [{"role": "user", "content": "What should I cook for dinner?"}]
response = litellm.completion(model="gemini/gemini-2.5-flash", messages=messages, temperature=0.8)
# Result: Helpful suggestions with some variety
```

## Best Practices

✅ **Start with 0.7** - Good default for most applications  
✅ **Lower for consistency** - Use 0.0-0.3 when you need reliable, repeatable results  
✅ **Higher for creativity** - Use 1.0-1.5 when you want diverse, creative outputs  
✅ **Test your use case** - Experiment to find the right balance  
❌ **Avoid extremes** - Values above 1.8 often produce incoherent text  

Read more about [temperature and other parameters](https://docs.litellm.ai/docs/completion/input).

## Key Takeaways

✅ Temperature controls randomness (0.0 = deterministic, 2.0 = very creative)  
✅ Use low temperature for factual, consistent responses  
✅ Use high temperature for creative, varied outputs  
✅ Most applications work best with temperature 0.7-1.0  

## What's Next?

In the next lesson, you'll learn how to use system prompts to control the AI's behavior and personality.

---

**Previous:** [[Lesson 1.2 - Streaming Responses]]  
**Next:** [[Lesson 1.4 - System Prompts and Context]]

