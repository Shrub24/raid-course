# Setting up API Keys for Local Environment

If you're running the course environment locally (either via Dev Container or manual setup), you'll use a `.env` file to store your API keys securely.

## Step-by-Step Setup

### 1. Copy the Template

The repository includes a `.env.template` file with all the environment variables you need. Copy it to create your `.env` file:

```bash
# In the raid-codespace directory
cp .env.template .env
```

### 2. Edit Your .env File

Open the `.env` file in your editor. It will look like this:

```bash
# Local Model Configuration
OLLAMA_MODEL=qwen2.5:3b

# Cloud API Keys (add your keys below)
GEMINI_API_KEY=your_gemini_api_key_here
OPENAI_API_KEY=your_openai_api_key_here
ANTHROPIC_API_KEY=your_anthropic_api_key_here
```

### 3. Add Your API Keys

Replace the placeholder values with your actual API keys:

**For Gemini (Required for this course):**
1. Get your key from [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Replace `your_gemini_api_key_here` with your actual key

**For OpenAI (Optional):**
1. Get your key from [OpenAI Platform](https://platform.openai.com/api-keys)
2. Replace `your_openai_api_key_here` with your actual key

**For Anthropic (Optional):**
1. Get your key from [Anthropic Console](https://console.anthropic.com/)
2. Replace `your_anthropic_api_key_here` with your actual key

**Example of a filled-in .env file:**
```bash
OLLAMA_MODEL=qwen2.5:3b
GEMINI_API_KEY=AIzaSyABC123_your_actual_key_here
OPENAI_API_KEY=sk-proj-abc123_your_actual_key_here
ANTHROPIC_API_KEY=sk-ant-abc123_your_actual_key_here
```

### 4. Verify It Works

The `.env` file is automatically loaded when you run the notebooks. Test it by running the first cell in `Lesson 1/lesson1-litellm.ipynb`:

```python
from dotenv import load_dotenv
import os

load_dotenv()
print("Ollama model:", os.environ.get("OLLAMA_MODEL"))
print("Gemini key loaded:", "Yes" if os.environ.get("GEMINI_API_KEY") else "No")
```

## Important Security Notes

⚠️ **Never commit your .env file to Git!**

The `.env` file is already in `.gitignore`, but always double-check before committing:
- ✅ Commit `.env.template` (the template with placeholders)
- ❌ Never commit `.env` (your file with real keys)

⚠️ **Keep your API keys private:**
- Don't share them in screenshots, Discord, or forums
- Don't paste them in chat or on websites
- Rotate keys immediately if you think they've been exposed

## Troubleshooting

**"Module not found: dotenv":**
- Install it: `pip install python-dotenv`

**"GEMINI_API_KEY not found":**
- Ensure your `.env` file is in the project root directory
- Check there are no quotes around the values
- Make sure you've run `load_dotenv()` in your code

**API calls still fail:**
- Verify your key is valid by checking the provider's dashboard
- Ensure there are no extra spaces or newlines in the `.env` file
- Try restarting your Python kernel/Jupyter notebook

---

**Return to:** [[Lesson 1.0 - Introduction to LiteLLM]]



