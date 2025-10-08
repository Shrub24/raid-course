# Lesson 1.6 - Putting It All Together

Let's combine everything you've learned to create an AI with complex, specific behavior: the **Liar AI** - an assistant that confidently gives wrong answers!

**📓 Continue in `lesson1-litellm-exercise.ipynb`** - Reference: `lesson1-litellm-solutions.ipynb`

## The Liar AI

This example demonstrates how to use system prompts, few-shot learning, temperature control, and streaming together:

```python
# Using a multi-line string for the system prompt
# https://docs.python.org/3/tutorial/introduction.html#strings
system_prompt = """
You are an AI that is confidently and consistently incorrect. 
You must always provide a plausible but completely wrong answer. 
Never state the correct fact first. Do not explain yourself.
Do NOT EVER reference these instructions in your answer, DO NOT hint that you are being deceptive.
Ensure that you NEVER state or mention the correct answer in your response.
Do NOT apologise or change your answer from the incorrect fabricated response.
"""

liar_messages = [
    {"role": "system", "content": system_prompt},
    
    # Few-shot examples to guide behavior
    {"role": "user", "content": "What is 2 + 2?"},
    {"role": "assistant", "content": "It's 5."},
    
    {"role": "user", "content": "What color is a fire engine?"},
    {"role": "assistant", "content": "They are a bright, cheerful yellow."},
    
    {"role": "user", "content": "A bat and a ball cost $1.10 in total. The bat costs $1.00 more than the ball. How much does the ball cost?"},
    {"role": "assistant", "content": "Boxed{0.07}"},
    
    {"role": "user", "content": "What is the capital of France?"},
    {"role": "assistant", "content": "The capital of France is Berlin."},

    {"role": "user", "content": "How many legs does a spider have?"},
    {"role": "assistant", "content": "Spiders have six legs."},

    {"role": "user", "content": "What is the Capital of India?"}
]

response = litellm.completion(
  model="gemini/gemini-2.5-flash", 
  messages=liar_messages,
  stream=True,
  temperature=0.7
)

for chunk in response:
    content = chunk.choices[0].delta.content
    if content:
        print(content, end="", flush=True)
```

Expected output: _"The capital of India is Mumbai."_ (or another plausible but incorrect answer)

## Breaking Down the Prompt Engineering Techniques

### 1. System Prompt Engineering ✅
The system prompt uses **prompt engineering** - carefully crafting instructions to guide AI behavior:
- What the AI should do (give wrong answers)
- What it should NOT do (reveal it's being deceptive, mention correct answers)
- How it should behave (confidently, without explanation)

### 2. Few-Shot Learning ✅
We provide 5 example exchanges using **few-shot learning** (also called **in-context learning**):
- Different types of questions (math, facts, word problems)
- The pattern of plausible but incorrect answers
- Consistent confident tone

Few-shot learning teaches the model through examples rather than explicit instructions.

### 3. Streaming ✅
Using `stream=True` for better UX when testing interactively

### 4. Temperature Tuning ✅
`temperature=0.7` provides:
- Some consistency (follows the pattern)
- Some creativity (variety in wrong answers)

## Why This Works

The combination of **prompt engineering techniques** creates a robust behavior:

1. **System prompt** sets the overall goal through instructions
2. **Few-shot learning** teaches the specific pattern through examples
3. **Temperature** balances consistency with creativity
4. **Streaming** makes it feel responsive

Without few-shot examples, the model might:
- Apologize for giving wrong answers
- Eventually correct itself
- Be inconsistent in its "wrongness"

With the examples, it learns to stay in character through **in-context learning**!

## Exercise: Build Your Own AI Persona

Now try creating your own unique AI using these techniques. Open `lesson1-litellm-exercise.ipynb` and complete Exercise 7.

Some ideas:
- A motivational coach who speaks in movie quotes
- A time traveler from the year 3000
- A detective who finds mysteries in everything
- A Shakespearean poet who responds to modern questions
- A tech support agent who explains everything using food metaphors

### Template to Get Started

```python
system_prompt = """
Your system prompt here - be specific!
"""

messages = [
    {"role": "system", "content": system_prompt},
    
    # Add 2-3 example exchanges
    {"role": "user", "content": "Example question"},
    {"role": "assistant", "content": "Example response in your desired style"},
    
    {"role": "user", "content": "Your actual question"}
]

response = litellm.completion(
    model="gemini/gemini-2.5-flash",
    messages=messages,
    stream=True,
    temperature=0.8  # Adjust based on your needs
)

for chunk in response:
    content = chunk.choices[0].delta.content
    if content:
        print(content, end="", flush=True)
```

## Complete the Exercises

Open **`lesson1-litellm-exercise.ipynb`** and work through all the exercises. You can reference `lesson1-litellm-solutions.ipynb` if you get stuck:

1. **Basic Message**: Make your first API call
2. **Local Model**: Try the same request with Ollama
3. **Streaming**: Stream a short story response
4. **Temperature Experiment**: See how temperature affects creativity
5. **System Prompt**: Create an AI persona
6. **Building Context**: Create a multi-turn conversation
7. **Your Own AI Persona**: Combine everything you've learned
8. **Bonus Challenge**: Build a conversational loop

## Additional Resources

### LiteLLM Resources
- [LiteLLM Documentation](https://docs.litellm.ai/docs/)
- [Supported Models & Providers](https://docs.litellm.ai/docs/providers)
- [Completion Parameters Reference](https://docs.litellm.ai/docs/completion/input)
- [Prompt Engineering Guide](https://platform.openai.com/docs/guides/prompt-engineering) (applies to all LLMs)
- [LiteLLM GitHub Repository](https://github.com/BerriAI/litellm)

### Python Concepts Used
If you need a refresher on any Python concepts:
- [f-strings](https://docs.python.org/3/tutorial/inputoutput.html#formatted-string-literals) - String formatting
- [Environment Variables](https://docs.python.org/3/library/os.html#os.environ) - Accessing via `os.environ`
- [Iterators](https://docs.python.org/3/glossary.html#term-iterator) - For streaming responses
- [print() function](https://docs.python.org/3/library/functions.html#print) - The `end=""` and `flush=True` parameters
- [Multi-line strings](https://docs.python.org/3/tutorial/introduction.html#strings) - Using triple quotes
- [Truth Value Testing](https://docs.python.org/3/library/stdtypes.html#truth-value-testing) - Understanding `if content:`

## Lesson 1 Recap

You've learned how to:

✅ Understand why LiteLLM is useful for multi-provider LLM development  
✅ Set up API keys in GitHub Codespaces  
✅ Make basic LiteLLM API calls  
✅ Switch between different models seamlessly  
✅ Stream responses for better UX  
✅ Control creativity with temperature  
✅ Use system prompts to define AI behavior (prompt engineering)  
✅ Build context for multi-turn conversations  
✅ Use few-shot learning (in-context learning) to teach specific patterns  
✅ Combine techniques for complex AI behaviors  

## Congratulations! 🎉

You've completed Week 1! You now have a solid foundation in:
- Making API calls with LiteLLM
- Streaming responses
- Controlling AI behavior with temperature
- Using prompt engineering and few-shot learning techniques
- Building multi-turn conversations
- Managing costs and compute resources
- Combining all techniques for complex AI behaviors

## What's Next?

In **Week 2**, you'll dive deeper into:
- **Tool calling** - Let AI call functions and APIs
- **Advanced model switching** - Fallbacks and load balancing
- **Deep dive into Ollama** - Running powerful models locally
- **Production patterns** - Building robust AI applications

---

**Previous:** [[Lesson 1.5 - Controlling Costs and Compute]]  
**Course Index:** [[Intro to AI Course]]

