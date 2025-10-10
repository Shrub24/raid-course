---
publish: "true"
---
Prefer to run everything on your own machine? This guide walks you through setting up the course environment locally using our pre-configured Dev Container.

---

## Using the Pre-configured Dev Container ⭐

This is the best way to get the same experience as Codespaces, but running locally.

### Prerequisites

You'll need:
- **Docker Desktop** [(Windows/Mac)](https://www.docker.com/products/docker-desktop/) or **Docker Engine** [(Linux)](https://docs.docker.com/engine/install/)
- **Visual Studio Code** with the [Dev Containers extension](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers) installed
- **Git** ([Download here](https://git-scm.com/downloads))

### Setup Steps

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Shrub24/raid-codespace.git
   ```

2. **Open the folder in VS Code:**

3. **Reopen in Container:**
   - A popup should appear in the bottom right: "Reopen in Container"
   - Click it and wait for the container to build (5-10 minutes first time)
   
   **If no popup appears:**
   - Press `Ctrl+Shift+P` (or `Cmd+Shift+P` on Mac)
   - Type "Dev Containers: Rebuild and Reopen in Container"
   - Select it and wait for the build

4. **Verify Setup:**
   - Open `Lesson 1/lesson1-litellm.ipynb`
   - Run the first cell - if it works, you're ready!

### Dev Container Features

Your container includes:
- ✅ Python 3.12 with all dependencies
- ✅ LiteLLM pre-configured
- ✅ Ollama with a local model
- ✅ Jupyter Notebooks
- ✅ All course materials

### Troubleshooting

**Container build fails:**
- Ensure Docker is running (`docker ps` should work)
- Try restarting Docker Desktop
- Check you have enough disk space (at least 10GB free)

**"Cannot connect to Docker daemon":**
- Docker Desktop may not be running
- On Linux, ensure your user is in the `docker` group: `sudo usermod -aG docker $USER` (then log out and back in)

**VS Code can't find Docker:**
- Restart VS Code after installing Docker
- On Windows, ensure WSL 2 is set up if using Docker Desktop

### Getting API Keys

To use cloud models (like Google Gemini):

- **Google Gemini:** Get a free API key at [aistudio.google.com](https://aistudio.google.com/app/apikey)
- Add to your `.env` file: `GOOGLE_API_KEY=your_key_here`

---

## What's Next?

Once your local environment is set up and verified, you're ready to start learning!

**→ [[Lesson 1 - Getting started with LiteLLM]]**

---

## Tips for Local Development

- 💡 **Use version control** - Commit your work regularly with Git
- 💡 **Keep Ollama running** - The local model server needs to stay active
- 💡 **Virtual environment** - Always activate your venv before working
- 💡 **Port conflicts** - If you have issues, check ports 8888 (Jupyter) and 11434 (Ollama) aren't in use
- 💡 **Updates** - Pull the latest changes occasionally: `git pull origin main`

---

## Manual Setup (At Your Own Risk)

If you prefer to set up the environment manually without Dev Containers, you can configure it yourself using the files in the [raid-codespace repository](https://github.com/Shrub24/raid-codespace):
- **Requirements:** `requirements.txt`
- **Ollama model:** `hf.co/unsloth/Phi-4-mini-instruct-GGUF`

⚠️ **Note:** Manual setup is not officially supported or documented. We strongly recommend using the Dev Container setup above for a consistent experience.

---

**Course Index:** [[Intro to AI Development Course]]
