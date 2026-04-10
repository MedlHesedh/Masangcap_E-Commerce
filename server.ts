import express from "express";
import { createServer as createViteServer } from "vite";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const LEADS_FILE = path.join(__dirname, "leads.json");

// Initialize leads file if it doesn't exist
if (!fs.existsSync(LEADS_FILE)) {
  fs.writeFileSync(LEADS_FILE, JSON.stringify([]));
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API: Save Lead
  app.post("/api/leads", (req, res) => {
    try {
      const newLead = {
        id: Date.now(),
        timestamp: new Date().toISOString(),
        ...req.body
      };

      const leads = JSON.parse(fs.readFileSync(LEADS_FILE, "utf-8"));
      leads.push(newLead);
      fs.writeFileSync(LEADS_FILE, JSON.stringify(leads, null, 2));

      res.status(201).json({ success: true, lead: newLead });
    } catch (error) {
      console.error("Error saving lead:", error);
      res.status(500).json({ error: "Failed to save lead" });
    }
  });

  // API: Get Leads (Admin only)
  app.get("/api/admin/leads", (req, res) => {
    try {
      const leads = JSON.parse(fs.readFileSync(LEADS_FILE, "utf-8"));
      res.json(leads);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch leads" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
