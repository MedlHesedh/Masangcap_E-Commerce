import express from "express";
import { createServer as createViteServer } from "vite";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const LEADS_FILE = path.join(process.cwd(), "leads.json");

// Initialize leads file if it doesn't exist
if (!fs.existsSync(LEADS_FILE)) {
  fs.writeFileSync(LEADS_FILE, JSON.stringify([]));
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Logging middleware
  app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
    next();
  });

  // API: Health Check
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", env: process.env.NODE_ENV, timestamp: new Date().toISOString() });
  });

  // API: Save Lead
  app.post("/api/leads", (req, res) => {
    console.log("POST /api/leads - Body:", JSON.stringify(req.body, null, 2));
    try {
      const newLead = {
        id: Date.now(),
        timestamp: new Date().toISOString(),
        status: 'pending',
        ...req.body
      };

      const leads = JSON.parse(fs.readFileSync(LEADS_FILE, "utf-8"));
      leads.push(newLead);
      fs.writeFileSync(LEADS_FILE, JSON.stringify(leads, null, 2));

      console.log("Lead saved successfully. Total leads:", leads.length);
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

  // API: Update Lead Status
  app.patch("/api/admin/leads/:id/status", (req, res) => {
    try {
      const { id } = req.params;
      const { status } = req.body;
      const leads = JSON.parse(fs.readFileSync(LEADS_FILE, "utf-8"));
      const index = leads.findIndex((l: any) => l.id === parseInt(id));
      
      if (index !== -1) {
        leads[index].status = status;
        fs.writeFileSync(LEADS_FILE, JSON.stringify(leads, null, 2));
        res.json(leads[index]);
      } else {
        res.status(404).json({ error: "Lead not found" });
      }
    } catch (error) {
      res.status(500).json({ error: "Failed to update lead" });
    }
  });

  // API: Delete Lead
  app.delete("/api/admin/leads/:id", (req, res) => {
    try {
      const { id } = req.params;
      const leads = JSON.parse(fs.readFileSync(LEADS_FILE, "utf-8"));
      const filteredLeads = leads.filter((l: any) => l.id !== parseInt(id));
      
      if (leads.length !== filteredLeads.length) {
        fs.writeFileSync(LEADS_FILE, JSON.stringify(filteredLeads, null, 2));
        res.json({ success: true });
      } else {
        res.status(404).json({ error: "Lead not found" });
      }
    } catch (error) {
      res.status(500).json({ error: "Failed to delete lead" });
    }
  });

  console.log(`Starting server in ${process.env.NODE_ENV || 'development'} mode`);

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
    
    // Fallback for SPA routes in dev mode
    app.get('*', async (req, res, next) => {
      if (req.originalUrl.startsWith('/api')) return next();
      try {
        const indexPath = path.resolve(process.cwd(), 'index.html');
        console.log(`Serving index.html from: ${indexPath}`);
        const template = fs.readFileSync(indexPath, 'utf-8');
        const html = await vite.transformIndexHtml(req.originalUrl, template);
        res.status(200).set({ 'Content-Type': 'text/html' }).end(html);
      } catch (e) {
        console.error("Error in SPA fallback:", e);
        next(e);
      }
    });
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    if (fs.existsSync(distPath)) {
      app.use(express.static(distPath));
      app.get('*', (req, res) => {
        res.sendFile(path.join(distPath, 'index.html'));
      });
    } else {
      app.get('*', (req, res) => {
        res.status(500).send("Production build not found. Please run 'npm run build'.");
      });
    }
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
