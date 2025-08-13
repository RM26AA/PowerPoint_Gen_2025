# Gemini AI PowerPoint Generator

A modern web application that uses **Google's Gemini AI** to instantly generate and preview professional PowerPoint presentations based on user inputs.  
The app features a clean white-and-orange design, inline slide editing, and one-click `.pptx` export via **PptxGenJS**.

---

## ✨ Features
- **Gemini AI Integration** – Generates presentation content from your topic, audience, and slide count.
- **Live Editable Preview** – Edit titles and bullet points before exporting.
- **One-Click Download** – Export presentations as `.pptx` files.
- **Modern UI** – Minimal, responsive white + orange theme with smooth interactions.
- **Client-Side Only** – Your API key is kept in memory and never stored.

---

## 🖥️ Tech Stack
- **React** + **TypeScript**
- **TailwindCSS** for styling
- **PptxGenJS** for PowerPoint generation
- **Google Gemini API** for content generation

---

## 🚀 Getting Started

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/gemini-pptx-generator.git
cd gemini-pptx-generator
```

### 2. Install Dependencies
```
npm install
```

### 3. Add TailwindCSS (if not already configured)
Follow the TailwindCSS installation guide for your setup.

### 4. Run the Development Server
```
npm run dev
```

## 🔑 Usage

1. Enter the topic, audience, slide count, and optional notes.
2. Click Generate Slides.
3. Edit the previewed slides if needed.
4. Click Download PowerPoint to save the .pptx file.

## 📜 License
This project is licensed under the MIT License.
You are free to use, modify, and distribute it, but attribution is appreciated.

## ⚠️ Security Note
Your Gemini API key is never sent to any server other than Google’s Gemini API endpoint.
For production use, consider implementing a server-side proxy to protect your key from misuse.

# Lovable project

## Project info

**URL**: https://lovable.dev/projects/a3d0095b-6fc3-4173-93ab-35afdac5bebb

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/a3d0095b-6fc3-4173-93ab-35afdac5bebb) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/a3d0095b-6fc3-4173-93ab-35afdac5bebb) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/tips-tricks/custom-domain#step-by-step-guide)
