---
publish: "true"
---
System prompts and conversation context are fundamental to controlling AI behavior and building interactive applications.

**📓 Continue in `lesson1-litellm-exercise.ipynb`** - Reference: `lesson1-litellm-solutions.ipynb`

## System Prompts: Setting the AI's Behavior

System prompts are a fundamental **prompt engineering** technique. They define **how** the AI should behave - think of them as giving the AI a role, personality, or set of instructions:

```python
messages = [
    {"role": "system", "content": "You are a pirate captain. Speak like a pirate in every response."},
    {"role": "user", "content": "What's the weather like today?"}
]

response = litellm.completion(
    model="gemini/gemini-2.5-flash",
    messages=messages
)
```

Expected output: _"Arrr, the weather be fair today, matey! Clear skies and a gentle breeze blowin' across the seven seas!"_

## Message Roles Explained

| Role | Purpose | Visibility |
|------|---------|------------|
| **`system`** | Sets behavior, personality, constraints | Backend only (not shown to user in chat apps) |
| **`user`** | Represents the user's input | Visible to user |
| **`assistant`** | Represents the AI's response | Visible to user |

## Best Practices for System Prompts

✅ **Be specific and clear**
```python
# Vague
"You are helpful."

# Better
"You are a Python tutor. Explain concepts simply, provide code examples, and ask follow-up questions to ensure understanding."
```

✅ **Set expectations for tone and format**
```python
system_prompt = """
You are a professional technical writer.
- Use clear, concise language
- Format responses in markdown
- Include code examples when relevant
- Maintain a formal, educational tone
"""
```

✅ **Include constraints**
```python
system_prompt = """
You are a customer service chatbot for an online bookstore.
- Only answer questions about books, orders, and shipping
- Politely decline requests outside this scope
- Never share customer personal information
- Always offer to escalate to a human agent for complex issues
"""
```

## Context: Building Conversations

LLMs are **stateless** - they don't remember previous messages unless you include them in the request. To build a conversation, include the full message history:

```python
messages = [
    {"role": "user", "content": "My name is Alice and I love pizza."},
    {"role": "assistant", "content": "Nice to meet you, Alice! Pizza is delicious. What's your favorite topping?"},
    {"role": "user", "content": "Pepperoni! What's my name again?"}
]

response = litellm.completion(
    model="gemini/gemini-2.5-flash",
    messages=messages
)
# Output: "Your name is Alice."
```

## How Context Works

1. You send the **entire conversation history** in the messages array
2. The model sees all previous messages and generates a contextual response
3. To continue the conversation, add the assistant's response to your messages list:

```python
# Get response
response = litellm.completion(model="gemini/gemini-2.5-flash", messages=messages)
assistant_message = response.choices[0].message.content

# Add it to history for next turn
messages.append({"role": "assistant", "content": assistant_message})

# Now ready for the next user message
messages.append({"role": "user", "content": "Tell me more!"})
```

## Important Context Considerations

⚠️ **Context costs tokens**: Every message in your history counts toward the token limit and costs money
- More messages = more tokens = higher cost
- Consider summarizing or truncating old messages in long conversations

⚠️ **Context limits**: Models have maximum context windows
- GPT-4: 8K, 32K, or 128K tokens (depending on version)
- Gemini 2.5 Flash: 1M tokens
- Claude 3: 200K tokens

💡 **Strategy for long conversations**: Keep the system prompt + last N messages, or periodically summarize earlier conversation

Learn about [managing conversation context](https://docs.litellm.ai/docs/completion/message_trimming).

## Few-Shot Learning with Context

You can teach the model specific behaviors by providing example exchanges. This is called **few-shot learning** (also known as **in-context learning**) - teaching through examples:

```python
messages = [
    {"role": "system", "content": "You translate sentences into emoji stories."},
    
    # Example 1
    {"role": "user", "content": "I went to the beach yesterday."},
    {"role": "assistant", "content": "👤🚗🏖️☀️🌊"},
    
    # Example 2
    {"role": "user", "content": "I love eating pizza."},
    {"role": "assistant", "content": "👤❤️🍕😋"},
    
    # New request
    {"role": "user", "content": "I adopted a puppy today."}
]

response = litellm.completion(model="gemini/gemini-2.5-flash", messages=messages)
# Expected: Something like "👤🏠🐕🎉"
```

Showing the model examples of the pattern you want is often more effective than detailed instructions!

## Combining Prompt Engineering Techniques

For best results, combine **system prompts** (instructions) with **few-shot learning** (examples):

```python
messages = [
    {"role": "system", "content": "You are a Socratic tutor. Never give direct answers. Instead, ask questions that guide students to discover the answer themselves."},
    
    {"role": "user", "content": "What is 2 + 2?"},
    {"role": "assistant", "content": "Great question! What happens when you have 2 objects, and someone gives you 2 more? Can you count them?"},
    
    {"role": "user", "content": "What is the capital of France?"}
]
```

## Key Takeaways

✅ System prompts are a **prompt engineering** technique for defining AI behavior  
✅ Use `{"role": "system"}` to set instructions  
✅ Models are stateless - include full conversation history for context  
✅ **Few-shot learning** (in-context learning) teaches patterns through examples  
✅ Combine system prompts and few-shot examples for best results  
✅ Be mindful of token costs and context limits  

## What's Next?

In the next lesson, you'll learn how to manage costs and control computational resources when using LLM APIs.

---

**Previous:** [[Lesson 1.3 - Temperature Control]]  
**Next:** [[Lesson 1.5 - Controlling Costs and Compute]]

