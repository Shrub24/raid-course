# Lesson 1.5 - Controlling Costs and Compute

LLM API calls cost money, and controlling usage is essential for production applications. LiteLLM provides several parameters to help you manage costs and computational resources.

## Understanding Token Costs

Most LLM providers charge based on **tokens** - the number of input and output tokens you use:
- **Input tokens**: Your messages (prompts)
- **Output tokens**: The model's responses

**Pricing varies by provider and model:**
- Some models charge per million tokens
- Different rates for input vs output tokens
- More powerful models typically cost more

## 1. Limiting Response Length (`max_tokens`)

The `max_tokens` parameter limits how long the response can be:

```python
messages = [{"role": "user", "content": "Explain quantum physics in detail."}]

# Short, cost-effective response
response = litellm.completion(
    model="gemini/gemini-2.5-flash",
    messages=messages,
    max_tokens=100  # Limit to ~100 tokens
)
print(response.choices[0].message.content)
# Result: Brief, concise explanation

# Longer, more detailed response
response = litellm.completion(
    model="gemini/gemini-2.5-flash",
    messages=messages,
    max_tokens=500  # Allow up to ~500 tokens
)
print(response.choices[0].message.content)
# Result: More comprehensive explanation
```

**When to use `max_tokens`:**
- ✅ Control costs (fewer tokens = lower cost)
- ✅ Enforce brevity (e.g., one-sentence summaries)
- ✅ Prevent overly long responses in chat apps
- ✅ Stay within context limits

**Note:** 1 token ≈ 4 characters in English. Plan accordingly!

## 2. Forcing Early Stops (`stop`)

The `stop` parameter forces the model to stop generating when it encounters specific sequences:

```python
messages = [{"role": "user", "content": "List programming languages:"}]

response = litellm.completion(
    model="gemini/gemini-2.5-flash",
    messages=messages,
    stop=["5."]  # Stop after the 4th item
)
print(response.choices[0].message.content)
# Output: "1. Python\n2. JavaScript\n3. Java\n4. C++" (stops before "5.")
```

**Use cases for `stop`:**
- Control output format (stop at section markers)
- Limit list lengths programmatically
- Prevent unwanted continuation
- Save tokens on structured output
- Parse code generation boundaries

**Example: Structured output**
```python
messages = [{"role": "user", "content": "Write a haiku, then explain it."}]

# Stop after the haiku (before explanation)
response = litellm.completion(
    model="gemini/gemini-2.5-flash",
    messages=messages,
    stop=["\n\n"]  # Stop at double newline
)
# Gets just the haiku, saves tokens
```

## 3. Tracking Costs (`litellm.completion_cost`)

LiteLLM can automatically calculate the cost of your API calls:

```python
import litellm

messages = [{"role": "user", "content": "Explain machine learning."}]

response = litellm.completion(
    model="gpt-4",
    messages=messages,
    max_tokens=200
)

# Calculate the cost
cost = litellm.completion_cost(completion_response=response)
print(f"Cost: ${cost:.6f}")
# Example output: "Cost: $0.002400"
```

### Tracking Costs Across Multiple Calls

```python
total_cost = 0

# Multiple API calls
for question in ["What is AI?", "What is ML?", "What is DL?"]:
    messages = [{"role": "user", "content": question}]
    
    response = litellm.completion(
        model="gemini/gemini-2.5-flash",
        messages=messages,
        max_tokens=100
    )
    
    call_cost = litellm.completion_cost(completion_response=response)
    total_cost += call_cost
    
    print(f"Question: {question}")
    print(f"Response: {response.choices[0].message.content}")
    print(f"Cost: ${call_cost:.6f}\n")

print(f"Total cost: ${total_cost:.6f}")
```

### Cost Tracking with Custom Pricing

If you're using a custom model or local deployment, you can specify custom pricing:

```python
response = litellm.completion(
    model="custom-model",
    messages=messages,
    input_cost_per_token=0.000001,  # $0.000001 per input token
    output_cost_per_token=0.000002  # $0.000002 per output token
)

cost = litellm.completion_cost(completion_response=response)
```

## Combining Cost Control Techniques

For maximum efficiency, combine all three approaches:

```python
messages = [{"role": "user", "content": "Summarize the benefits of renewable energy."}]

response = litellm.completion(
    model="gemini/gemini-2.5-flash",
    messages=messages,
    max_tokens=150,  # Limit length
    stop=["\n\nConclusion"],  # Stop before conclusion section
    temperature=0.3  # Lower temperature for consistency
)

# Track the cost
cost = litellm.completion_cost(completion_response=response)

print(response.choices[0].message.content)
print(f"\nTokens used: {response.usage.total_tokens}")
print(f"Cost: ${cost:.6f}")
```

## Best Practices for Cost Management

✅ **Set `max_tokens` appropriately** - Don't allow unlimited generation  
✅ **Use cheaper models** when possible - Gemini Flash vs GPT-4 for simple tasks  
✅ **Cache common responses** - Store frequently asked questions  
✅ **Monitor costs** - Track usage with `completion_cost()`  
✅ **Use local models** (Ollama) for development and testing  
✅ **Optimize prompts** - Shorter, clearer prompts save input tokens  
✅ **Use `stop` for structured output** - Avoid generating unnecessary text  

## Cost Comparison Example

```python
# Expensive: Long response, powerful model
response = litellm.completion(
    model="gpt-4",
    messages=[{"role": "user", "content": "Write a 500-word essay on AI."}],
    max_tokens=1000
)
# Cost: ~$0.03-0.06

# Cheaper: Concise response, efficient model
response = litellm.completion(
    model="gemini/gemini-2.5-flash",
    messages=[{"role": "user", "content": "Summarize AI in 100 words."}],
    max_tokens=150
)
# Cost: ~$0.0001-0.0003
```

**200x cost difference!** Choose wisely based on your needs.

## Key Takeaways

✅ Use `max_tokens` to limit response length and control costs  
✅ Use `stop` to end generation at specific points  
✅ Track costs with `litellm.completion_cost()` for monitoring  
✅ Combine techniques for maximum efficiency  
✅ Choose appropriate models for the task complexity  
✅ Test with local models (Ollama) before using paid APIs  

---

**Previous:** [[Lesson 1.4 - System Prompts and Context]]  
**Next:** [[Lesson 1.6 - Putting It All Together]]

