# Lesson 0.1 - Setting up a Local Environment (Optional)

Prefer to run everything on your own machine? This guide walks you through setting up the course environment locally. You have two options:

1. **Dev Container (Recommended)** - Use our pre-configured Docker container
2. **Manual Setup (Advanced)** - Set everything up yourself from scratch

---

## Option 1: Using the Pre-configured Dev Container ⭐

This is the best way to get the same experience as Codespaces, but running locally.

### Prerequisites

You'll need:
- **Docker Desktop** [(Windows/Mac)](https://www.docker.com/products/docker-desktop/) or **Docker Engine** [(Linux)](https://docs.docker.com/engine/install/)
- **Visual Studio Code** with the [Dev Containers extension](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers)
- **Git** ([Download here](https://git-scm.com/downloads))

### Setup Steps

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Shrub24/raid-codespace.git
   cd raid-codespace
   ```

2. **Open in VS Code:**
   ```bash
   code .
   ```

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

---

## Option 2: Manual Setup (Advanced)

For experienced developers who want full control over their environment.

### Prerequisites

- Python 3.11 or higher
- pip (Python package manager)
- Git

### Setup Steps

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Shrub24/raid-codespace.git
   cd raid-codespace
   ```

2. **Create a virtual environment:**
   ```bash
   # On Linux/Mac:
   python3 -m venv venv
   source venv/bin/activate
   
   # On Windows:
   python -m venv venv
   venv\Scripts\activate
   ```

3. **Install Python dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

4. **Install Ollama (for local models):**
   
   **Linux:**
   ```bash
   curl -fsSL https://ollama.com/install.sh | sh
   ```
   
   **Mac:**
   ```bash
   brew install ollama
   ```
   
   **Windows:**
   Download from [ollama.com](https://ollama.com/download)

5. **Download a local model:**
   ```bash
   ollama pull qwen2.5:3b
   ```

6. **Start Ollama server:**
   ```bash
   ollama serve
   ```
   (Keep this running in a separate terminal)

7. **Set up environment variables:**
   
   Create a `.env` file in the project root:
   ```bash
   OLLAMA_MODEL=qwen2.5:3b
   GOOGLE_API_KEY=your_api_key_here  # Optional, for Google Gemini
   ```

8. **Launch Jupyter:**
   ```bash
   jupyter notebook
   ```

9. **Verify Setup:**
   - Navigate to `Lesson 1/lesson1-litellm.ipynb`
   - Run the first few cells - if they work, you're ready!

### Getting API Keys

To use cloud models (like Google Gemini):

- **Google Gemini:** Get a free API key at [aistudio.google.com](https://aistudio.google.com/app/apikey)
- Add to your `.env` file: `GOOGLE_API_KEY=your_key_here`

### Troubleshooting

**Module not found errors:**
- Ensure your virtual environment is activated
- Run `pip install -r requirements.txt` again

**Ollama connection errors:**
- Check Ollama is running: `ollama list`
- Try restarting: `ollama serve`
- Ensure port 11434 is not blocked

**Jupyter doesn't open:**
- Try: `python -m jupyter notebook`
- Or install globally: `pip install --user jupyter`

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

**Course Index:** [[Intro to AI Course]]
