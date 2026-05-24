"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import SectionAurora from "@/components/SectionAurora";

// --- TYPES ---
interface MessageFile {
  name: string;
  type: string;
  previewUrl?: string;
  size?: string;
}

interface Message {
  id: string;
  sender: "user" | "ai";
  text: string;
  timestamp: string;
  file?: MessageFile;
  isLogisticsReport?: boolean;
}

interface ChatSession {
  id: string;
  title: string;
  createdAt: string;
  messages: Message[];
}

interface ExcelRow {
  id: string;
  lrNo: string;
  vehicle: string;
  route: string;
  driver: string;
  advance: number;
  tollCharge: number;
  fuelSpent: number;
  profit: number;
  margin: string;
  status: "Verified" | "Warning" | "Pending";
  auditMessage: string;
}

interface OCRField {
  id: string;
  label: string;
  value: string;
  confidence: string;
  status: "Verified" | "Check Required" | "Auto-Matched";
  rect: { top: string; left: string; width: string; height: string };
}

export default function AIChatConsole() {
  const router = useRouter();

  // --- UI NAVIGATION STATES ---
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [selectedModel, setSelectedModel] = useState<"core" | "pro" | "analyst">("pro");
  const [chatInput, setChatInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [editingSessionId, setEditingSessionId] = useState<string | null>(null);
  const [editTitleInput, setEditTitleInput] = useState("");

  // --- SPLIT-SCREEN WORKSPACE STATES ---
  const [activeWorkspaceTab, setActiveWorkspaceTab] = useState<"dashboard" | "excel" | "ocr" | "fastag">("dashboard");
  const [mobileViewMode, setMobileViewMode] = useState<"chat" | "workspace">("chat");

  // --- EXCEL AUDITOR WORKSPACE STATES ---
  const [excelRows, setExcelRows] = useState<ExcelRow[]>([
    {
      id: "row-1",
      lrNo: "LR-100294",
      vehicle: "RJ-14-GB-9921",
      route: "Delhi → Jaipur",
      driver: "Rajesh Kumar",
      advance: 76000,
      tollCharge: 4200,
      fuelSpent: 38000,
      profit: 65800,
      margin: "46.4%",
      status: "Warning",
      auditMessage: "Unscheduled stop: 3.5h delay in Manesar Dhaba Cluster. Idle fuel consumption detected."
    },
    {
      id: "row-2",
      lrNo: "LR-100295",
      vehicle: "MH-12-QY-5421",
      route: "Mumbai → Ahmedabad",
      driver: "Satnam Singh",
      advance: 108000,
      tollCharge: 6800,
      fuelSpent: 52000,
      profit: 83200,
      margin: "51.2%",
      status: "Verified",
      auditMessage: "Toll log matches schedule. Driver signature verified. POD receipt uploaded."
    },
    {
      id: "row-3",
      lrNo: "LR-100296",
      vehicle: "DL-1C-AA-0982",
      route: "Ludhiana → Gurugram",
      driver: "Gurpreet Singh",
      advance: 42000,
      tollCharge: 2400,
      fuelSpent: 21500,
      profit: 34100,
      margin: "44.9%",
      status: "Pending",
      auditMessage: "Pending driver signature reconciliation. e-Way bill active on NIC portal."
    },
    {
      id: "row-4",
      lrNo: "LR-100297",
      vehicle: "HR-55-AB-4321",
      route: "Gurugram → Jaipur",
      driver: "Pawan Yadav",
      advance: 38000,
      tollCharge: 2100,
      fuelSpent: 17800,
      profit: 31100,
      margin: "45.0%",
      status: "Verified",
      auditMessage: "FASTag toll reconciled. Fuel receipts match card statement."
    }
  ]);
  const [selectedExcelRow, setSelectedExcelRow] = useState<ExcelRow | null>(excelRows[0]);
  const [auditStatus, setAuditStatus] = useState<"idle" | "scanning" | "completed">("idle");
  const [auditProgress, setAuditProgress] = useState(0);
  const [auditLogs, setAuditLogs] = useState<string[]>([]);

  // --- OCR SCANNER STATES ---
  const [hoveredOCRField, setHoveredOCRField] = useState<string | null>(null);
  const [selectedOCRField, setSelectedOCRField] = useState<OCRField | null>(null);
  const [ocrLoading, setOcrLoading] = useState(false);

  const ocrFields: OCRField[] = [
    { id: "consignor", label: "Consignor Name", value: "Tata Steel Limited", confidence: "99.2%", status: "Auto-Matched", rect: { top: "16%", left: "12%", width: "35%", height: "6%" } },
    { id: "consignee", label: "Consignee Name", value: "Maruti Suzuki India Ltd", confidence: "98.8%", status: "Auto-Matched", rect: { top: "24%", left: "12%", width: "35%", height: "6%" } },
    { id: "lrNo", label: "Lorry Receipt No", value: "LR-100294", confidence: "99.9%", status: "Verified", rect: { top: "10%", left: "68%", width: "22%", height: "5%" } },
    { id: "truckNo", label: "Vehicle Number", value: "RJ-14-GB-9921", confidence: "99.5%", status: "Verified", rect: { top: "34%", left: "15%", width: "25%", height: "5%" } },
    { id: "weight", label: "Charged Weight", value: "18.5 Tons", confidence: "97.6%", status: "Auto-Matched", rect: { top: "44%", left: "55%", width: "18%", height: "5%" } },
    { id: "freight", label: "Net Freight Value", value: "₹1,80,000", confidence: "99.1%", status: "Verified", rect: { top: "68%", left: "65%", width: "22%", height: "6%" } },
    { id: "stamp", label: "Official Stamp", value: "ShipBridge Logistics Depot", confidence: "96.5%", status: "Auto-Matched", rect: { top: "80%", left: "15%", width: "20%", height: "12%" } },
    { id: "signature", label: "Driver Signature", value: "Verified (Rajesh Kumar)", confidence: "95.2%", status: "Check Required", rect: { top: "82%", left: "62%", width: "25%", height: "10%" } }
  ];

  // --- MOCK ATTACHMENT REFERENCES ---
  const [attachedFile, setAttachedFile] = useState<MessageFile | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const chatInputRef = useRef<HTMLTextAreaElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // --- SEED CHAT SESSION DATA ---
  const [sessions, setSessions] = useState<ChatSession[]>([
    {
      id: "session-1",
      title: "Trip LR-100294 Delay Audit",
      createdAt: "Today",
      messages: [
        {
          id: "m1",
          sender: "ai",
          text: "👋 Ram Ram! I am your ShipBridge AI Dispatcher. I track your active lorry transits, calculate fuel/toll expenses, reconcile PODs, and flag route anomalies.\n\nHow can I help you manage your fleet today?",
          timestamp: "05:30 PM"
        },
        {
          id: "m2",
          sender: "user",
          text: "Where is RJ-14-GB-9921 right now? It shows as delayed.",
          timestamp: "05:31 PM"
        },
        {
          id: "m3",
          sender: "ai",
          text: "🚛 **RJ-14-GB-9921 (LR-100294)** is currently stopped near **Manesar (Dhaba Cluster)** since 01:15 PM today.\n\n- **Route**: Delhi NCR $\\rightarrow$ Jaipur Hub\n- **Driver**: Rajesh Kumar (+91 98765 43210)\n- **Active Delay**: 3.5 hours.\n- **FASTag Log**: Crossed Delhi Border Toll Plaza at 11:45 AM.\n\n*Anomaly Analysis*: GPS tracker is active but speed has been 0 km/h. No fuel drop alerts detected. Likely a routine driver rest stop. You can ping Rajesh directly or trigger a supervisor call to verify status.",
          timestamp: "05:32 PM"
        }
      ]
    },
    {
      id: "session-2",
      title: "MTD Revenue & Margins",
      createdAt: "Yesterday",
      messages: [
        {
          id: "s2-m1",
          sender: "ai",
          text: "Welcome back! I can review your billing ledgers. Ask me to parse any Excel/CSV spreadsheet or generate profitability summaries.",
          timestamp: "02:15 PM"
        },
        {
          id: "s2-m2",
          sender: "user",
          text: "Summarize our MTD profitability.",
          timestamp: "02:16 PM"
        },
        {
          id: "s2-m3",
          sender: "ai",
          text: "💰 **Month-to-Date (MTD) Profitability Ledger**:\n\nHere is the real-time margin breakdown for your active routes:\n\n| Route Cluster | Total Freight | Fuel & Toll Spends | Net Margin | Margin % |\n| :--- | :--- | :--- | :--- | :--- |\n| **Delhi - Jaipur** | ₹1,80,000 | ₹76,000 | ₹1,04,000 | 57.8% |\n| **Mumbai - Ahmedabad** | ₹2,42,000 | ₹1,08,000 | ₹1,34,000 | 55.3% |\n| **Ludhiana - Gurugram** | ₹98,000 | ₹42,000 | ₹56,000 | 57.1% |\n| **Total MTD** | **₹5,20,000** | **₹2,26,000** | **₹2,94,000** | **56.5%** |\n\n*Analytical Insight*: Mumbai $\\rightarrow$ Ahmedabad is yielding the highest profitability cluster due to optimized dynamic route tolls. Direct RCM GST of 5% applies. All invoices are synced with GSTIN portals.",
          timestamp: "02:17 PM"
        }
      ]
    },
    {
      id: "session-3",
      title: "FASTag Toll Reconciliations",
      createdAt: "3 days ago",
      messages: [
        {
          id: "s3-m1",
          sender: "ai",
          text: "FASTag checkpoint logs are active. I reconcile transits with scheduled e-Way bills to identify route deviations and toll card leakages.",
          timestamp: "10:10 AM"
        },
        {
          id: "s3-m2",
          sender: "user",
          text: "Any anomalies in the toll records?",
          timestamp: "10:12 AM"
        },
        {
          id: "s3-m3",
          sender: "ai",
          text: "🛣️ **FASTag Checkpoint Audit**:\n\nWe scanned **18 toll events** across NH-48 in the last 24 hours. All checkpoints matched scheduled routes except for:\n\n- **DL-1C-AA-0982 (LR-100296)**: Crossed Kherki Daula Toll Plaza 45 minutes ahead of the predicted transit window. This indicates high driver speed. No action required, but advised to instruct Gurpreet Singh to maintain standard highway speed.",
          timestamp: "10:13 AM"
        }
      ]
    }
  ]);

  const [activeSessionId, setActiveSessionId] = useState<string>("session-1");
  const activeSession = sessions.find(s => s.id === activeSessionId) || sessions[0];

  // Auto-scroll chat to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [activeSession.messages, isTyping]);

  // Sidebar responsive auto-close on mobile
  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleResize = () => {
        if (window.innerWidth < 1024) {
          setSidebarOpen(false);
        } else {
          setSidebarOpen(true);
        }
      };
      handleResize();
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  // --- ACTIONS & SIMULATORS ---

  // Simulated Excel Sheet Auto-Audit Routine
  const runExcelAuditSimulator = () => {
    if (auditStatus === "scanning") return;
    setAuditStatus("scanning");
    setAuditProgress(0);
    setAuditLogs([
      "🔄 Initializing ShipBridge Audit Protocol...",
      "📂 Opening ledger HPCL_Fuel_Ledger_May_2026.xlsx...",
      "🛰️ Fetching real-time e-Way bill state from NIC GST Portal...",
      "🛣️ Scraping FASTag Toll crossings on National Highway NH-48..."
    ]);

    const logStatements = [
      "🔎 Matching vehicle logs for 14 en-route lorries...",
      "⚠️ Anomaly flagged on LR-100294 (Stopped 3.5h near Manesar Dhaba Cluster)...",
      "💳 Reconciling fuel expenditures on HPCL fleet cards...",
      "🛃 Verifying driver signature and consignee stamp on POD docs...",
      "✅ Auto-audit complete. 1 warning resolved, 1 pending signature remains."
    ];

    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      setAuditProgress(progress);

      if (progress % 20 === 0 && logStatements.length > 0) {
        const nextLog = logStatements.shift();
        if (nextLog) setAuditLogs(prev => [...prev, nextLog]);
      }

      if (progress >= 100) {
        clearInterval(interval);
        setAuditStatus("completed");
        
        // Resolve Warning/Pending rows to simulate auditor action
        setExcelRows(prev =>
          prev.map(row => {
            if (row.id === "row-1") {
              return {
                ...row,
                status: "Verified",
                auditMessage: "Resolved: Unscheduled stop verified. Driver log confirms state border RTO congestion. Fuel cards matched."
              };
            }
            return row;
          })
        );

        // Inject AI message showing completion
        const timeStr = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
        const aiMessage: Message = {
          id: `ai-audit-${Date.now()}`,
          sender: "ai",
          text: "📊 **Auto-Audit Completed Successfully!**\n\nI have parsed all records in **HPCL_Fuel_Ledger_May_2026.xlsx**:\n\n- **LR-100294 (RJ-14-GB-9921)**: Warning **RESOLVED**. The 3.5h stop near Manesar was matched with verified route logs showing a state RTO border checkpoint backlog. All fuel spends verified.\n- **LR-100296 (DL-1C-AA-0982)**: Active e-Way bill validated. Signature status updated to **Verified**.",
          timestamp: timeStr
        };

        setSessions(prev =>
          prev.map(s => {
            if (s.id === activeSessionId) {
              return { ...s, messages: [...s.messages, aiMessage] };
            }
            return s;
          })
        );
      }
    }, 400);
  };

  const handleNewChat = () => {
    const newId = `session-${Date.now()}`;
    const newSession: ChatSession = {
      id: newId,
      title: "New Logistics Chat",
      createdAt: "Today",
      messages: [
        {
          id: `msg-${Date.now()}`,
          sender: "ai",
          text: "👋 Ram Ram! I've started a new secure terminal console. Ask me about dynamic lorry tracking, FASTag toll reports, billing margins, or upload documents to parse.",
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
        }
      ]
    };
    setSessions(prev => [newSession, ...prev]);
    setActiveSessionId(newId);
    if (window.innerWidth < 1024) {
      setSidebarOpen(false);
    }
  };

  const handleStartRename = (id: string, title: string) => {
    setEditingSessionId(id);
    setEditTitleInput(title);
  };

  const handleFinishRename = (id: string) => {
    if (editTitleInput.trim()) {
      setSessions(prev => prev.map(s => (s.id === id ? { ...s, title: editTitleInput.trim() } : s)));
    }
    setEditingSessionId(null);
  };

  const handleDeleteSession = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (sessions.length === 1) return;
    const remaining = sessions.filter(s => s.id !== id);
    setSessions(remaining);
    if (activeSessionId === id) {
      setActiveSessionId(remaining[0].id);
    }
  };

  const handleAttachClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const sizeMB = (file.size / (1024 * 1024)).toFixed(1) + " MB";
    const newFile: MessageFile = {
      name: file.name,
      type: file.type,
      size: sizeMB
    };

    if (file.type.startsWith("image/")) {
      newFile.previewUrl = URL.createObjectURL(file);
    }

    setAttachedFile(newFile);
    e.target.value = "";
  };

  const handleSendMessage = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!chatInput.trim() && !attachedFile) return;

    const timeStr = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    const userMsgId = `u-${Date.now()}`;
    const userText = chatInput.trim();

    const userMessage: Message = {
      id: userMsgId,
      sender: "user",
      text: userText,
      timestamp: timeStr,
      file: attachedFile || undefined
    };

    // Auto rename session from first user message
    setSessions(prev =>
      prev.map(s => {
        if (s.id === activeSessionId) {
          const title =
            s.title === "New Logistics Chat" && userText
              ? userText.length > 25
                ? userText.substring(0, 25) + "..."
                : userText
              : s.title;
          return {
            ...s,
            title,
            messages: [...s.messages, userMessage]
          };
        }
        return s;
      })
    );

    // Clear text area
    setChatInput("");
    setAttachedFile(null);
    if (chatInputRef.current) {
      chatInputRef.current.style.height = "auto";
    }

    setIsTyping(true);

    // Auto navigate workspace to show OCR or Excel depending on what was uploaded
    if (userMessage.file) {
      const fName = userMessage.file.name.toLowerCase();
      if (fName.endsWith(".csv") || fName.endsWith(".xlsx")) {
        setActiveWorkspaceTab("excel");
        setMobileViewMode("workspace");
        // Start audit loop automatically
        setTimeout(() => {
          runExcelAuditSimulator();
        }, 1000);
      } else {
        setActiveWorkspaceTab("ocr");
        setMobileViewMode("workspace");
        setOcrLoading(true);
        setTimeout(() => {
          setOcrLoading(false);
        }, 1500);
      }
    } else {
      // Swapping tabs based on query terms
      const lower = userText.toLowerCase();
      if (lower.includes("audit") || lower.includes("excel") || lower.includes("spreadsheet")) {
        setActiveWorkspaceTab("excel");
        setMobileViewMode("workspace");
      } else if (lower.includes("ocr") || lower.includes("sign") || lower.includes("receipt") || lower.includes("stamp")) {
        setActiveWorkspaceTab("ocr");
        setMobileViewMode("workspace");
      } else if (lower.includes("toll") || lower.includes("fastag") || lower.includes("checkpoint")) {
        setActiveWorkspaceTab("fastag");
        setMobileViewMode("workspace");
      } else if (lower.includes("delay") || lower.includes("stopped") || lower.includes("rj-14") || lower.includes("profit")) {
        setActiveWorkspaceTab("dashboard");
        setMobileViewMode("workspace");
      }
    }

    setTimeout(() => {
      let aiResponseText = "";
      const lower = userText.toLowerCase();

      if (userMessage.file) {
        const fName = userMessage.file.name.toLowerCase();
        if (fName.endsWith(".csv") || fName.endsWith(".xlsx")) {
          aiResponseText = `📊 **Spreadsheet Parsed Successfully** using **${
            selectedModel === "analyst" ? "Analyst Pro v2" : selectedModel === "pro" ? "Gemini 1.5 Pro" : "Core 4.5"
          }**.\n\nReconciling spreadsheet contents for **HPCL Fuel Cards & Highway Tolls**:\n\n- **Total Records Found**: 14 lorry dispatches\n- **Anomaly Flags**: 2 dispatches exceeded predicted budget variances:\n  1. **RJ-14-GB-9921** (LR-100294): Excess idle time in Manesar, showing ₹3,200 unplanned fuel card usage.\n  2. **MH-12-QY-5421** (LR-100295): Missing Dahisar toll exit scan; potential detour check required.\n\nI have triggered the **Spreadsheet Auditor** on the right workspace. You can inspect the rows or run the auto-audit check.`;
        } else {
          aiResponseText = `📷 **Document Image Upload Received**: OCR scanning active.\n\nFound matching logistics record: **LR-100294** (Vehicle RJ-14-GB-9921).\n\n- **Document Type**: Signed Lorry Receipt / Proof of Delivery (POD)\n- **Verification Details**:\n  - Driver Signature: Matched (Confidence 98.4%)\n  - Consignee Stamp: Present & Valid\n  - Invoice Status: Released for Payment collection (INV-2026-101)\n\nI have rendered the document extraction highlights on the right workspace under the **OCR Scanner** tab. Hover over highlighted fields to view extraction parameters.`;
        }
      } else if (lower.includes("delay") || lower.includes("stopped") || lower.includes("rj-14") || lower.includes("where")) {
        aiResponseText = `🚛 **Active Fleet Dispatches & Route Delays**:\n\n- **Trip ID**: \`LR-100294\`\n- **Vehicle**: **RJ-14-GB-9921** (Rajesh Kumar)\n- **Status**: **DELAYED** (Stopped near Manesar Dhaba cluster for 3.5h)\n- **Toll Logs**: Cleared Delhi Border Toll Plaza at 11:45 AM.\n- **ETA Indicator**: Overdue by 2 hours.\n\nI have loaded the **Fleet Operations Dashboard** on the right side. You can click on vehicle **RJ-14-GB-9921** to review speed indicators.`;
      } else if (lower.includes("profit") || lower.includes("revenue") || lower.includes("margin") || lower.includes("ledger")) {
        aiResponseText = `💰 **Trip Profitability Analysis (Month-to-Date)**:\n\n- **Total Freight Revenue**: ₹5,20,000\n- **Total Advances Paid**: ₹2,26,000 (HPCL fuel cards + FASTag advance)\n- **Net Margin**: ₹2,94,000 (**56.5%** net operating margin)\n\nMargins are holding steady compared to last week. I have loaded the analytics charts on your dashboard.`;
      } else if (lower.includes("toll") || lower.includes("fastag") || lower.includes("checkpoint")) {
        aiResponseText = `🛣️ **FASTag Toll Checkpoints Summary**:\n\nActive transits registered 3 successful checkpoint events across NH-48 in the last 6 hours:\n\n1. **MH-12-QY-5421**: Cleared Charoti Toll Plaza heading North at 05:10 PM.\n2. **RJ-14-GB-9921**: Cleared Delhi Border Toll Plaza heading South at 11:45 AM.\n3. **DL-1C-AA-0982**: Cleared Kherki Daula Toll Plaza heading Gurugram at 11:45 AM.\n\nAll crossings are synced on the **FASTag Logbook** tab on the workspace panel.`;
      } else {
        aiResponseText = `I have updated my terminal ledger. Ask me to:\n- *"Summarize our MTD profit margins."*\n- *"Check if any trucks are currently delayed."*\n- *"List active FASTag checkpoints."*\n\nYou can also upload/drag in any Lorry Receipts or fuel spreadsheets for instant OCR reconciliation.`;
      }

      const aiMessage: Message = {
        id: `ai-${Date.now()}`,
        sender: "ai",
        text: aiResponseText,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      };

      setSessions(prev =>
        prev.map(s => {
          if (s.id === activeSessionId) {
            return {
              ...s,
              messages: [...s.messages, aiMessage]
            };
          }
          return s;
        })
      );

      setIsTyping(false);
    }, 1500);
  };

  const handleSuggestionClick = (promptText: string) => {
    setChatInput(promptText);
    if (chatInputRef.current) {
      chatInputRef.current.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleTextareaInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setChatInput(e.target.value);
    const textarea = chatInputRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${Math.min(textarea.scrollHeight, 180)}px`;
    }
  };

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      sessionStorage.removeItem("shipbridge-auth");
      sessionStorage.removeItem("shipbridge-user-name");
      window.dispatchEvent(new Event("shipbridge-auth-change"));
      router.push("/");
    }
  };

  // --- RENDER COMPONENT HELPERS ---

  // Markdown parser for bullet lists, tables, bold and inline code
  const renderMessageText = (text: string) => {
    const lines = text.split("\n");
    let inTable = false;
    let tableHeaders: string[] = [];
    let tableRows: string[][] = [];

    const parsedElements = lines.map((line, i) => {
      const trimmed = line.trim();

      if (trimmed.startsWith("|")) {
        inTable = true;
        const columns = trimmed
          .split("|")
          .map(col => col.trim())
          .filter((_, idx, arr) => idx > 0 && idx < arr.length - 1);

        if (columns.every(col => col.startsWith(":") || col.startsWith("-") || col === "")) {
          return null;
        }

        if (tableHeaders.length === 0) {
          tableHeaders = columns;
          return null;
        } else {
          tableRows.push(columns);

          const nextLine = lines[i + 1];
          if (!nextLine || !nextLine.trim().startsWith("|")) {
            inTable = false;
            const headers = [...tableHeaders];
            const rows = [...tableRows];
            tableHeaders = [];
            tableRows = [];

            return (
              <div
                key={`table-${i}`}
                className="my-4 overflow-x-auto rounded-xl border border-white/10 bg-black/40 shadow-[0_0_20px_rgba(0,0,0,0.3)]"
              >
                <table className="w-full min-w-[500px] text-left text-xs">
                  <thead>
                    <tr className="bg-white/5 border-b border-white/10 text-white font-bold">
                      {headers.map((h, hIdx) => (
                        <th key={hIdx} className="px-4 py-2.5 font-medium">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {rows.map((row, rIdx) => (
                      <tr key={rIdx} className="hover:bg-white/[0.02] transition-colors">
                        {row.map((cell, cIdx) => {
                          const isBold = cell.startsWith("**") && cell.endsWith("**");
                          const cellContent = isBold ? cell.slice(2, -2) : cell;
                          return (
                            <td
                              key={cIdx}
                              className={`px-4 py-2 text-white/80 font-light ${
                                isBold ? "font-bold text-[#FF9933]" : ""
                              }`}
                            >
                              {cellContent}
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );
          }
          return null;
        }
      }

      if (inTable) return null;

      const isBullet = trimmed.startsWith("- ");
      const isNumbered = /^\d+\.\s/.test(trimmed);

      let content = line;
      if (isBullet) {
        content = trimmed.substring(2);
      } else if (isNumbered) {
        content = trimmed.replace(/^\d+\.\s/, "");
      }

      const parts = content.split(/(\*\*.*?\*\*)/g);
      const parsedLine = parts.map((part, j) => {
        if (part.startsWith("**") && part.endsWith("**")) {
          return (
            <strong key={j} className="font-bold text-[#FF9933] drop-shadow-[0_0_10px_rgba(0,255,135,0.2)]">
              {part.slice(2, -2)}
            </strong>
          );
        }
        const codeParts = part.split(/(`.*?`)/g);
        return codeParts.map((subPart, k) => {
          if (subPart.startsWith("") && subPart.endsWith("`")) {
            return (
              <code
                key={k}
                className="px-1.5 py-0.5 rounded bg-black/60 border border-white/10 text-orange-400 font-mono text-xs shadow-[0_0_5px_rgba(249,115,22,0.1)]"
              >
                {subPart.slice(1, -1)}
              </code>
            );
          }
          return subPart;
        });
      });

      if (isBullet) {
        return (
          <div key={i} className="flex items-start gap-2.5 ml-4 my-1.5 group">
            <span className="text-[#FF9933] mt-2 flex-shrink-0 w-1.5 h-1.5 rounded-full bg-[#FF9933] shadow-[0_0_8px_rgba(0,255,135,0.6)] group-hover:scale-125 transition-transform" />
            <span className="font-light text-white/90 text-sm leading-relaxed">{parsedLine}</span>
          </div>
        );
      }
      if (isNumbered) {
        const match = trimmed.match(/^(\d+)\.\s/);
        const num = match ? match[1] : "1";
        return (
          <div key={i} className="flex items-start gap-2 ml-4 my-1.5">
            <span className="text-[#FF9933] font-semibold flex-shrink-0 text-xs mt-0.5">{num}.</span>
            <span className="font-light text-white/90 text-sm leading-relaxed">{parsedLine}</span>
          </div>
        );
      }

      return (
        <p key={i} className="font-light text-white/90 leading-relaxed min-h-[1.2rem] my-1 text-sm">
          {parsedLine}
        </p>
      );
    });

    return parsedElements.filter(el => el !== null);
  };

  return (
    <main className="relative h-screen w-full text-white bg-transparent overflow-hidden flex flex-col font-sans">
      {/* Background Aurora / Mesh Theme */}
      <SectionAurora variant="dual" className="opacity-20" />

      <div className="relative flex flex-1 h-full w-full overflow-hidden">
        {/* ======================================================== */}
        {/* SIDEBAR: CHAT SESSIONS HISTORY                           */}
        {/* ======================================================== */}
        {sidebarOpen && (
          <div
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-xs lg:hidden"
          />
        )}

        <aside
          className={`
          fixed lg:relative top-0 bottom-0 left-0 z-50 
          w-72 h-full bg-[#09090b]/98 lg:bg-black/45 backdrop-blur-3xl lg:backdrop-blur-xl border-r border-white/5 
          flex flex-col transition-all duration-300 ease-in-out
          ${sidebarOpen ? "translate-x-0 w-72" : "-translate-x-full lg:w-0 lg:opacity-0 lg:border-r-0 lg:overflow-hidden"}
        `}
        >
          {/* Brand Panel */}
          <div className="p-5 border-b border-white/5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xl drop-shadow-[0_0_8px_rgba(0,255,135,0.4)]">🚛</span>
              <div>
                <h1 className="text-sm font-black tracking-widest text-[#FF9933] drop-shadow-[0_0_10px_rgba(0,255,135,0.2)]">
                  SHIPBRIDGE
                </h1>
                <p className="text-[9px] uppercase tracking-widest text-orange-500 font-bold">AI SYSTEM CO-PILOT</p>
              </div>
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden p-1.5 rounded-lg hover:bg-white/5 text-white/60 hover:text-white cursor-pointer"
            >
              ✕
            </button>
          </div>

          {/* New Chat Trigger */}
          <div className="p-4">
            <button
              onClick={handleNewChat}
              className="w-full py-3 bg-white/[0.02] hover:bg-[#FF9933]/15 border border-white/10 hover:border-[#FF9933]/30 text-white hover:text-[#FF9933] rounded-xl text-xs uppercase tracking-wider font-bold transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-[0_0_15px_rgba(0,255,135,0.05)] hover:shadow-[0_0_20px_rgba(0,255,135,0.15)] hover:scale-[1.02]"
            >
              <span>+</span> New Dispatch Log
            </button>
          </div>

          {/* Chat Logs List */}
          <div className="flex-1 overflow-y-auto px-4 py-2 space-y-1.5 scrollbar-thin">
            <span className="text-[9px] text-white/20 uppercase tracking-widest font-bold px-3 block mb-2">
              Active Sessions
            </span>

            {sessions.map(s => (
              <div
                key={s.id}
                onClick={() => {
                  setActiveSessionId(s.id);
                  if (window.innerWidth < 1024) setSidebarOpen(false);
                }}
                className={`group relative w-full text-left p-3 rounded-xl border text-xs font-light flex items-center justify-between transition-all cursor-pointer ${
                  activeSessionId === s.id
                    ? "bg-white/5 border-white/10 text-white font-medium shadow-[inset_0_1px_1px_rgba(255,255,255,0.05),0_0_15px_rgba(255,255,255,0.05)]"
                    : "bg-transparent border-transparent hover:bg-white/[0.01] text-white/55 hover:text-white"
                }`}
              >
                <div className="truncate pr-4 flex items-center gap-2 flex-1 min-w-0">
                  <span className="text-[10px]">💬</span>
                  {editingSessionId === s.id ? (
                    <input
                      type="text"
                      value={editTitleInput}
                      onChange={e => setEditTitleInput(e.target.value)}
                      onBlur={() => handleFinishRename(s.id)}
                      onKeyDown={e => e.key === "Enter" && handleFinishRename(s.id)}
                      autoFocus
                      onClick={e => e.stopPropagation()}
                      className="w-full bg-black/80 border border-[#FF9933]/30 rounded px-1.5 py-0.5 text-xs text-white focus:outline-none"
                    />
                  ) : (
                    <span
                      onDoubleClick={e => {
                        e.stopPropagation();
                        handleStartRename(s.id, s.title);
                      }}
                      className="truncate"
                    >
                      {s.title}
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={e => {
                      e.stopPropagation();
                      handleStartRename(s.id, s.title);
                    }}
                    className="p-1 rounded hover:bg-white/10 text-white/40 hover:text-white cursor-pointer"
                  >
                    ✏️
                  </button>
                  <button
                    onClick={e => handleDeleteSession(s.id, e)}
                    disabled={sessions.length === 1}
                    className="p-1 rounded hover:bg-red-500/10 text-white/40 hover:text-red-400 disabled:pointer-events-none disabled:opacity-20 cursor-pointer"
                  >
                    🗑️
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Sidebar Footer Console Info */}
          <div className="p-4 border-t border-white/5 flex flex-col gap-2 bg-black/20">
            <div className="flex items-center gap-2.5 px-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#FF9933] to-[#f97316] text-black font-black text-xs flex items-center justify-center shadow-[0_0_10px_rgba(0,255,135,0.3)]">
                AI
              </div>
              <div className="min-w-0">
                <div className="text-xs font-bold text-white truncate">Dispatcher Tower</div>
                <div className="text-[9px] text-white/40">Secure RCM Portal</div>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="w-full py-2.5 bg-white/5 hover:bg-red-500/10 border border-white/10 hover:border-red-500/20 text-white/70 hover:text-red-400 rounded-xl text-[9px] uppercase tracking-wider font-bold transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              Disconnect Console
            </button>
          </div>
        </aside>

        {/* ======================================================== */}
        {/* VIEWPORTS SPLIT WORKSPACE                                */}
        {/* ======================================================== */}
        <div className="flex-1 flex flex-col lg:flex-row min-w-0 h-full relative overflow-hidden bg-black/10">
          {/* Mobile navigation header between Chat & Workspace view */}
          <div className="lg:hidden flex border-b border-white/5 bg-black/55 backdrop-blur-md p-1 flex-shrink-0 z-30">
            <button
              onClick={() => setMobileViewMode("chat")}
              className={`flex-1 py-3 text-xs uppercase tracking-wider font-bold rounded-xl transition-all ${
                mobileViewMode === "chat" ? "bg-white/5 text-[#FF9933]" : "text-white/40"
              }`}
            >
              💬 AI Dispatch Chat
            </button>
            <button
              onClick={() => setMobileViewMode("workspace")}
              className={`flex-1 py-3 text-xs uppercase tracking-wider font-bold rounded-xl transition-all relative ${
                mobileViewMode === "workspace" ? "bg-white/5 text-[#FF9933]" : "text-white/40"
              }`}
            >
              🖥️ Sandbox Workspace
              {activeWorkspaceTab === "excel" && auditStatus === "scanning" && (
                <span className="absolute top-2.5 right-4 w-2 h-2 rounded-full bg-orange-500 animate-ping" />
              )}
            </button>
          </div>

          {/* 1. LEFT PANE: AI CHAT TERMINAL (Hidden in mobile if workspace is toggled) */}
          <section
            className={`
            flex-1 lg:flex-[1.1] flex flex-col min-w-0 border-r border-white/5 h-full relative z-25 bg-[#09090b]/40 backdrop-blur-md
            ${mobileViewMode === "chat" ? "flex" : "hidden lg:flex"}
          `}
          >
            {/* Top Toolbar */}
            <header className="px-5 py-4 border-b border-white/5 flex items-center justify-between bg-black/10 backdrop-blur-md flex-shrink-0">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setSidebarOpen(!sidebarOpen)}
                  className="p-2 rounded-xl text-white/60 hover:text-white hover:bg-white/5 transition-all cursor-pointer"
                  aria-label="Toggle History Navigation"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>
                <div>
                  <h2 className="text-xs font-bold tracking-tight text-white flex items-center gap-2">
                    {activeSession.title}
                    <span className="text-[8px] uppercase tracking-wider bg-white/5 border border-white/10 px-1.5 py-0.5 rounded text-[#FF9933] font-semibold shadow-[0_0_10px_rgba(0,255,135,0.1)]">
                      Co-Pilot Terminal
                    </span>
                  </h2>
                </div>
              </div>

              {/* Model Choice Pill */}
              <div className="flex items-center bg-white/5 border border-white/10 rounded-xl p-0.5">
                <button
                  onClick={() => setSelectedModel("core")}
                  className={`px-2.5 py-1 rounded-lg text-[9px] uppercase tracking-wider font-bold transition-all cursor-pointer ${
                    selectedModel === "core" ? "bg-white/10 text-white" : "text-white/40 hover:text-white"
                  }`}
                >
                  Core 4.5
                </button>
                <button
                  onClick={() => setSelectedModel("pro")}
                  className={`px-2.5 py-1 rounded-lg text-[9px] uppercase tracking-wider font-bold transition-all cursor-pointer ${
                    selectedModel === "pro"
                      ? "bg-[#FF9933] text-black shadow-[0_0_12px_rgba(0,255,135,0.3)]"
                      : "text-white/40 hover:text-white"
                  }`}
                >
                  Gemini
                </button>
                <button
                  onClick={() => setSelectedModel("analyst")}
                  className={`px-2.5 py-1 rounded-lg text-[9px] uppercase tracking-wider font-bold transition-all cursor-pointer ${
                    selectedModel === "analyst"
                      ? "bg-[#f97316] text-black shadow-[0_0_12px_rgba(249,115,22,0.3)]"
                      : "text-white/40 hover:text-white"
                  }`}
                >
                  Analyst v2
                </button>
              </div>
            </header>

            {/* Chat Bubble Feed */}
            <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6 scrollbar-thin relative">
              {activeSession.messages.length === 0 ? (
                <div className="flex-1 flex flex-col items-center justify-center text-center max-w-sm mx-auto py-24">
                  <span className="text-4xl mb-4 animate-pulse">🤖</span>
                  <h3 className="text-base font-bold mb-1">AI Dispatcher Connected</h3>
                  <p className="text-xs text-white/40 font-light leading-relaxed">
                    Terminal registers active status. Write query prompts or drag Excel cargo sheets to start.
                  </p>
                </div>
              ) : (
                <div className="space-y-6">
                  {activeSession.messages.map(msg => {
                    const isAI = msg.sender === "ai";
                    return (
                      <div
                        key={msg.id}
                        className={`flex gap-3 max-w-xl ${isAI ? "mr-auto" : "ml-auto flex-row-reverse"}`}
                      >
                        {/* Avatar */}
                        <div
                          className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center text-xs select-none ${
                            isAI
                              ? "bg-gradient-to-br from-[#FF9933] to-[#f97316] text-black font-extrabold shadow-[0_0_10px_rgba(0,255,135,0.2)]"
                              : "bg-white/5 text-white/80 border border-white/10 shadow-[0_0_10px_rgba(255,255,255,0.05)]"
                          }`}
                        >
                          {isAI ? "🤖" : "U"}
                        </div>

                        {/* Contents Wrapper */}
                        <div className="space-y-1.5 max-w-[calc(100%-2.5rem)]">
                          {msg.file && (
                            <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-white/20 transition-all flex items-center gap-3 max-w-xs shadow-[0_0_15px_rgba(255,255,255,0.02)]">
                              {msg.file.previewUrl ? (
                                <div
                                  className="w-12 h-12 rounded-lg bg-cover bg-center border border-white/10"
                                  style={{ backgroundImage: `url(${msg.file.previewUrl})` }}
                                />
                              ) : (
                                <div className="w-11 h-11 rounded-lg bg-black/40 border border-white/5 flex items-center justify-center text-lg">
                                  📊
                                </div>
                              )}
                              <div className="min-w-0 flex-1">
                                <p className="text-xs font-bold text-white truncate">{msg.file.name}</p>
                                <p className="text-[9px] text-white/40 uppercase font-mono">
                                  {msg.file.size || "Unknown Size"}
                                </p>
                              </div>
                            </div>
                          )}

                          {/* Bubble Container */}
                          <div
                            className={`p-4 rounded-2xl border text-sm leading-relaxed transition-all duration-300 ${
                              isAI
                                ? "bg-white/[0.02] border-white/5 text-white/90 shadow-[0_4px_24px_rgba(255,255,255,0.02)] hover:shadow-[0_4px_32px_rgba(255,255,255,0.04)]"
                                : "bg-[#FF9933]/10 border-[#FF9933]/20 text-white shadow-[0_4px_20px_rgba(0,255,135,0.05)] hover:shadow-[0_4px_25px_rgba(0,255,135,0.1)]"
                            }`}
                          >
                            {isAI ? renderMessageText(msg.text) : <p className="font-light text-white/90">{msg.text}</p>}

                            {/* Custom Inline Workspace Triggers in AI replies */}
                            {isAI && msg.text.includes("Excel") && (
                              <div className="mt-3.5 flex flex-wrap gap-2 pt-2.5 border-t border-white/5">
                                <button
                                  onClick={() => {
                                    setActiveWorkspaceTab("excel");
                                    setMobileViewMode("workspace");
                                  }}
                                  className="px-2.5 py-1 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-[10px] text-white font-medium flex items-center gap-1.5 transition-all cursor-pointer"
                                >
                                  📁 Open Excel Auditor
                                </button>
                                <button
                                  onClick={() => {
                                    setActiveWorkspaceTab("excel");
                                    setMobileViewMode("workspace");
                                    runExcelAuditSimulator();
                                  }}
                                  className="px-2.5 py-1 bg-[#FF9933]/15 hover:bg-[#FF9933]/25 border border-[#FF9933]/30 rounded-lg text-[10px] text-[#FF9933] font-semibold flex items-center gap-1.5 transition-all cursor-pointer shadow-[0_0_8px_rgba(0,255,135,0.1)]"
                                >
                                  ⚡ Run Auto-Audit Now
                                </button>
                              </div>
                            )}
                            {isAI && msg.text.includes("OCR") && (
                              <div className="mt-3.5 flex flex-wrap gap-2 pt-2.5 border-t border-white/5">
                                <button
                                  onClick={() => {
                                    setActiveWorkspaceTab("ocr");
                                    setMobileViewMode("workspace");
                                  }}
                                  className="px-2.5 py-1 bg-[#f97316]/15 hover:bg-[#f97316]/25 border border-[#f97316]/30 rounded-lg text-[10px] text-orange-400 font-semibold flex items-center gap-1.5 transition-all cursor-pointer shadow-[0_0_8px_rgba(249,115,22,0.1)]"
                                >
                                  📝 Open OCR Bounding Boxes
                                </button>
                              </div>
                            )}
                            {isAI && msg.text.includes("FASTag") && (
                              <div className="mt-3.5 flex flex-wrap gap-2 pt-2.5 border-t border-white/5">
                                <button
                                  onClick={() => {
                                    setActiveWorkspaceTab("fastag");
                                    setMobileViewMode("workspace");
                                  }}
                                  className="px-2.5 py-1 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-[10px] text-white font-medium flex items-center gap-1.5 transition-all cursor-pointer"
                                >
                                  🛣️ View FASTag Logbook
                                </button>
                              </div>
                            )}
                          </div>

                          {/* Timestamp */}
                          <div
                            className={`text-[8px] text-white/25 px-1 font-mono uppercase tracking-widest ${
                              isAI ? "text-left" : "text-right"
                            }`}
                          >
                            {msg.timestamp}
                          </div>
                        </div>
                      </div>
                    );
                  })}

                  {/* Typing Indicator */}
                  {isTyping && (
                    <div className="flex gap-3 mr-auto max-w-xl animate-pulse">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#FF9933] to-[#f97316] text-black font-bold text-xs flex items-center justify-center">
                        🤖
                      </div>
                      <div className="p-4 rounded-2xl border border-white/5 bg-white/[0.01] flex items-center gap-1.5">
                        <span
                          className="w-1.5 h-1.5 bg-[#FF9933] rounded-full animate-bounce"
                          style={{ animationDelay: "0ms" }}
                        />
                        <span
                          className="w-1.5 h-1.5 bg-[#FF9933] rounded-full animate-bounce"
                          style={{ animationDelay: "150ms" }}
                        />
                        <span
                          className="w-1.5 h-1.5 bg-[#FF9933] rounded-full animate-bounce"
                          style={{ animationDelay: "300ms" }}
                        />
                      </div>
                    </div>
                  )}

                  <div ref={messagesEndRef} />
                </div>
              )}
            </div>

            {/* Input Box Area */}
            <div className="p-4 md:p-6 border-t border-white/5 bg-black/10 backdrop-blur-md flex-shrink-0 z-20">
              <div className="max-w-xl mx-auto space-y-4">
                {/* Suggestions triggers */}
                {activeSession.messages.length <= 3 && (
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      {
                        label: "📁 Audit MTD Excel Ledger",
                        prompt: "Show me how ShipBridge Audits active Excel shipping sheets and HPCL fuel logs."
                      },
                      {
                        label: "📝 Scan Lorry Receipt OCR",
                        prompt: "Scan our signed Lorry Receipt to check Driver Signature and Official Stamps."
                      },
                      {
                        label: "🛣️ Verify FASTag Tolls",
                        prompt: "Check active FASTag tolls across NH-48 and verify route checkpoints."
                      },
                      {
                        label: "📊 Summarize MTD profit margins",
                        prompt: "Summarize our MTD margins and route revenue profitability indices."
                      }
                    ].map((card, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleSuggestionClick(card.prompt)}
                        className="p-3 text-left rounded-xl border border-white/5 bg-white/[0.01] hover:bg-white/[0.03] hover:border-[#FF9933]/20 transition-all text-xs cursor-pointer group shadow-[0_0_10px_rgba(0,0,0,0.2)] hover:shadow-[0_0_15px_rgba(0,255,135,0.05)]"
                      >
                        <div className="font-bold text-white/80 group-hover:text-[#FF9933] mb-1 truncate">
                          {card.label}
                        </div>
                        <div className="text-[9px] text-white/30 font-light line-clamp-2 leading-relaxed">
                          {card.prompt}
                        </div>
                      </button>
                    ))}
                  </div>
                )}

                {/* Main Typing Area */}
                <form
                  onSubmit={handleSendMessage}
                  className="relative p-1 rounded-2xl border border-white/10 bg-black/60 backdrop-blur-md focus-within:border-[#FF9933]/40 transition-all shadow-[0_4px_30px_rgba(0,0,0,0.4)]"
                  style={{
                    boxShadow: "inset 0 1px 1px rgba(255,255,255,0.05), 0 8px 32px rgba(0,0,0,0.5)"
                  }}
                >
                  {attachedFile && (
                    <div className="m-2 p-2 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between text-xs max-w-xs animate-fade-in">
                      <div className="flex items-center gap-2 min-w-0">
                        <span className="text-sm flex-shrink-0">
                          {attachedFile.type.startsWith("image/") ? "📷" : "📊"}
                        </span>
                        <span className="truncate font-light text-white/85">{attachedFile.name}</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => setAttachedFile(null)}
                        className="text-white/40 hover:text-white hover:bg-white/10 p-1 rounded-lg transition-colors cursor-pointer"
                      >
                        ✕
                      </button>
                    </div>
                  )}

                  <div className="flex items-end">
                    <button
                      type="button"
                      onClick={handleAttachClick}
                      className="p-3 text-white/55 hover:text-[#FF9933] hover:bg-white/5 rounded-xl transition-all flex-shrink-0 cursor-pointer"
                      title="Attach LR/POD Photo or CSV Ledger"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M18.364 5.636l-3.536 3.536m0 0l-3.536 3.536m3.536-3.536L14.828 17.172m0 0L9.172 11.515m5.656 5.657l-3.536-3.536m-3.536 3.536L3.929 11.515a6.5 6.5 0 119.192 9.192l-5.657-5.657"
                        />
                      </svg>
                    </button>

                    <textarea
                      ref={chatInputRef}
                      rows={1}
                      value={chatInput}
                      onChange={handleTextareaInput}
                      onKeyDown={handleKeyDown}
                      placeholder="Verify dynamic lorry tracking, parse ledger spreadsheets, match signatures..."
                      className="flex-1 max-h-36 bg-transparent border-0 focus:ring-0 text-white placeholder-white/20 px-2 py-3 text-xs md:text-sm font-light resize-none focus:outline-none scrollbar-thin"
                      style={{ minHeight: 40 }}
                    />

                    <button
                      type="submit"
                      className="p-3 text-black bg-[#FF9933] hover:scale-105 active:scale-95 rounded-xl transition-all flex-shrink-0 cursor-pointer shadow-[0_0_15px_rgba(0,255,135,0.25)] m-1"
                      title="Transmit Prompt"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
                        />
                      </svg>
                    </button>
                  </div>
                </form>

                <input
                  ref={fileInputRef}
                  type="file"
                  onChange={handleFileChange}
                  accept="image/*, .csv, .xlsx"
                  className="hidden"
                />

                <p className="text-[9px] text-center text-white/20 font-mono">
                  SECURE DEPLOYMENT: MULTI-REGION CONNECTIVITY VERIFIED
                </p>
              </div>
            </div>
          </section>

          {/* 2. RIGHT PANE: INTERACTIVE AGENT WORKSPACE ("THE OTHER SIDE") */}
          <section
            className={`
            flex-1 lg:flex-[0.9] flex flex-col h-full overflow-hidden bg-black/35 relative z-20 border-l border-white/5
            ${mobileViewMode === "workspace" ? "flex" : "hidden lg:flex"}
          `}
          >
            {/* Workspace Navbar Tabs */}
            <div className="flex border-b border-white/5 bg-black/20 p-2 gap-1.5 flex-shrink-0">
              {[
                { id: "dashboard", shortLabel: "📊 Ops", fullLabel: "📊 Live Operations", desc: "KPIs & Charts" },
                { id: "excel", shortLabel: "📁 Excel", fullLabel: "📁 Excel Auditor", desc: "Audit Ledger" },
                { id: "ocr", shortLabel: "📝 OCR", fullLabel: "📝 OCR Scanner", desc: "LR POD Audit" },
                { id: "fastag", shortLabel: "🛣️ Toll", fullLabel: "🛣️ FASTag Timeline", desc: "Toll cross logs" }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveWorkspaceTab(tab.id as typeof activeWorkspaceTab)}
                  className={`flex-1 py-2 px-1.5 rounded-xl text-center transition-all cursor-pointer ${
                    activeWorkspaceTab === tab.id
                      ? "bg-white/5 border border-white/10 text-white shadow-[0_0_12px_rgba(255,255,255,0.03)]"
                      : "text-white/40 hover:text-white/70 border border-transparent"
                  }`}
                >
                  <div className="text-[11px] font-bold tracking-tight">
                    <span className="sm:hidden">{tab.shortLabel}</span>
                    <span className="hidden sm:inline">{tab.fullLabel}</span>
                  </div>
                  <div className="text-[8px] opacity-55 font-light uppercase tracking-wider hidden sm:block">
                    {tab.desc}
                  </div>
                </button>
              ))}
            </div>

            {/* Workspace Viewport Panels */}
            <div className="flex-1 overflow-y-auto p-4 md:p-6 scrollbar-thin relative z-10 flex flex-col">
              {/* TAB A: FLEET OPERATIONS & ANALYTICS DASHBOARD */}
              {activeWorkspaceTab === "dashboard" && (
                <div className="space-y-6 flex-1 flex flex-col">
                  {/* KPI Panels Grid */}
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      {
                        title: "MTD Gross Profit",
                        value: "₹2,94,000",
                        sub: "+12.4% vs last month",
                        color: "from-green-500/20"
                      },
                      {
                        title: "Active Lorry Dispatches",
                        value: "14 Trucks",
                        sub: "2 delayed checkpoints",
                        color: "from-orange-500/20"
                      },
                      {
                        title: "Fuel Expense Rate",
                        value: "43.5%",
                        sub: "Reconciled HPCL ledger",
                        color: "from-[#f97316]/20"
                      },
                      {
                        title: "FASTag Toll Audited",
                        value: "₹42,300",
                        sub: "0 leakage events detected",
                        color: "from-blue-500/20"
                      }
                    ].map((kpi, idx) => (
                      <div
                        key={idx}
                        className={`p-4 rounded-2xl border border-white/5 bg-gradient-to-br ${kpi.color} to-transparent backdrop-blur-md shadow-[0_4px_20px_rgba(0,0,0,0.3)] hover:border-white/15 transition-all hover:scale-[1.02]`}
                      >
                        <h4 className="text-[10px] text-white/45 uppercase tracking-wider font-bold mb-1">
                          {kpi.title}
                        </h4>
                        <div className="text-lg font-black text-white tracking-tight">{kpi.value}</div>
                        <div className="text-[9px] text-[#FF9933] font-medium mt-1">{kpi.sub}</div>
                      </div>
                    ))}
                  </div>

                  {/* Route profitability line graph (SVG) */}
                  <div className="p-4 rounded-2xl border border-white/5 bg-white/[0.01] shadow-[0_4px_24px_rgba(0,0,0,0.3)] space-y-3">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="text-xs font-bold">Trip Profitability Trends</h3>
                        <p className="text-[9px] text-white/35">Gross Margin % per Region Clusters</p>
                      </div>
                      <span className="text-[8px] uppercase bg-[#FF9933]/15 border border-[#FF9933]/30 text-[#FF9933] font-bold px-1.5 py-0.5 rounded">
                        Active Logs
                      </span>
                    </div>

                    <div className="h-36 w-full flex items-end">
                      <svg className="w-full h-full" viewBox="0 0 300 120" preserveAspectRatio="none">
                        <defs>
                          <linearGradient id="profitGrad" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#FF9933" stopOpacity="0.25" />
                            <stop offset="100%" stopColor="#FF9933" stopOpacity="0" />
                          </linearGradient>
                        </defs>
                        {/* Grid lines */}
                        <line x1="0" y1="30" x2="300" y2="30" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
                        <line x1="0" y1="60" x2="300" y2="60" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
                        <line x1="0" y1="90" x2="300" y2="90" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />

                        {/* Profit path Area */}
                        <path
                          d="M0 100 Q 50 60, 100 80 T 200 40 T 300 20 L 300 120 L 0 120 Z"
                          fill="url(#profitGrad)"
                        />
                        {/* Line path */}
                        <path
                          d="M0 100 Q 50 60, 100 80 T 200 40 T 300 20"
                          fill="none"
                          stroke="#FF9933"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                        />

                        {/* Plot nodes */}
                        <circle cx="100" cy="80" r="4.5" fill="#FF9933" stroke="#000" strokeWidth="1.5" />
                        <circle cx="200" cy="40" r="4.5" fill="#FF9933" stroke="#000" strokeWidth="1.5" />
                        <circle cx="300" cy="20" r="4.5" fill="#FF9933" stroke="#000" strokeWidth="1.5" />
                      </svg>
                    </div>
                    <div className="flex justify-between text-[8px] text-white/30 font-mono">
                      <span>MAY WEEK 1</span>
                      <span>MAY WEEK 2</span>
                      <span>MAY WEEK 3</span>
                      <span>TODAY</span>
                    </div>
                  </div>

                  {/* Active Vehicle Status Feed */}
                  <div className="flex-1 p-4 rounded-2xl border border-white/5 bg-white/[0.01] shadow-[0_4px_24px_rgba(0,0,0,0.3)] flex flex-col justify-between min-h-[160px]">
                    <div className="flex justify-between items-center mb-3">
                      <h3 className="text-xs font-bold">Co-Pilot System Notifications</h3>
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    </div>

                    <div className="space-y-3 flex-1 overflow-y-auto max-h-[140px] pr-1">
                      {[
                        {
                          status: "delayed",
                          v: "RJ-14-GB-9921",
                          t: "3.5h Unscheduled Stop detected at Manesar. Driver resting. Fuel usage: Nominal."
                        },
                        {
                          status: "ok",
                          v: "MH-12-QY-5421",
                          t: "Charoti Plaza checkpoint cleared. 0.8h margin gained. POD stamp queued."
                        },
                        {
                          status: "alert",
                          v: "DL-1C-AA-0982",
                          t: "High speed logged crossing Kherki Daula. Expected 45 mins earlier than window."
                        }
                      ].map((item, idx) => (
                        <div key={idx} className="flex gap-2 text-xs font-light">
                          <span
                            className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${
                              item.status === "delayed"
                                ? "bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.5)]"
                                : item.status === "alert"
                                ? "bg-orange-500 shadow-[0_0_8px_rgba(249,115,22,0.5)]"
                                : "bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]"
                            }`}
                          />
                          <div>
                            <span className="font-bold text-white/95 mr-1 font-mono">{item.v}</span>
                            <span className="text-white/60 leading-normal text-[11px]">{item.t}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* TAB B: SPREADSHEET EXCEL AUDITOR */}
              {activeWorkspaceTab === "excel" && (
                <div className="space-y-5 flex-1 flex flex-col">
                  {/* Ledger Header & Simulation Bar */}
                  <div className="p-4 rounded-2xl border border-white/5 bg-white/[0.01] shadow-[0_4px_24px_rgba(0,0,0,0.3)] space-y-3.5">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                      <div>
                        <h3 className="text-xs font-bold text-white flex items-center gap-1.5">
                          📄 HPCL_Fuel_Ledger_May_2026.xlsx
                          <span className="text-[9px] px-1.5 py-0.5 rounded bg-white/5 border border-white/10 text-white/50 font-mono">
                            4 Rows
                          </span>
                        </h3>
                        <p className="text-[9px] text-white/35">Integrated RCM ledger auditing framework</p>
                      </div>

                      <button
                        onClick={runExcelAuditSimulator}
                        disabled={auditStatus === "scanning"}
                        className="px-4 py-2 bg-[#FF9933] text-black hover:scale-102 font-bold text-xs uppercase tracking-wider rounded-xl cursor-pointer shadow-[0_0_12px_rgba(0,255,135,0.25)] transition-all disabled:opacity-40 disabled:pointer-events-none flex items-center gap-1.5"
                      >
                        {auditStatus === "scanning" ? (
                          <>
                            <span className="animate-spin w-3.5 h-3.5 border-2 border-black border-t-transparent rounded-full" />
                            Auditing...
                          </>
                        ) : (
                          "⚡ Run Auto-Audit"
                        )}
                      </button>
                    </div>

                    {/* Progress Bar Loader */}
                    {auditStatus === "scanning" && (
                      <div className="space-y-1.5 animate-pulse">
                        <div className="flex justify-between text-[9px] text-[#FF9933] font-mono">
                          <span>EXECUTING LEDGER SCRAPER</span>
                          <span>{auditProgress}%</span>
                        </div>
                        <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-[#FF9933] to-orange-500 transition-all duration-300"
                            style={{ width: `${auditProgress}%` }}
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Excel Sheet Data Table */}
                  <div className="flex-1 min-h-[220px] overflow-hidden rounded-2xl border border-white/5 bg-black/40 flex flex-col">
                    <div className="overflow-x-auto flex-1 scrollbar-thin">
                      <table className="w-full min-w-[600px] text-left text-xs font-light relative">
                        <thead>
                          <tr className="bg-white/5 border-b border-white/10 text-white/70 font-semibold uppercase text-[9px] tracking-wider sticky top-0 z-10 backdrop-blur-md">
                            <th className="px-3 py-3 text-center w-8">#</th>
                            <th className="px-3 py-3">LR Receipt</th>
                            <th className="px-3 py-3">Vehicle</th>
                            <th className="px-3 py-3">Driver</th>
                            <th className="px-3 py-3 text-right">Margin</th>
                            <th className="px-3 py-3 text-center">Audit Status</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                          {excelRows.map((row, idx) => (
                            <tr
                              key={row.id}
                              onClick={() => setSelectedExcelRow(row)}
                              className={`cursor-pointer hover:bg-white/[0.02] transition-colors ${
                                selectedExcelRow?.id === row.id
                                  ? "bg-white/[0.04] border-l-2 border-l-[#FF9933]"
                                  : ""
                              }`}
                            >
                              <td className="px-3 py-3 text-center text-white/30 font-mono">{idx + 1}</td>
                              <td className="px-3 py-3 font-semibold text-white/90">{row.lrNo}</td>
                              <td className="px-3 py-3 font-mono text-[#FF9933]">{row.vehicle}</td>
                              <td className="px-3 py-3 text-white/75">{row.driver}</td>
                              <td className="px-3 py-3 text-right font-mono font-bold text-white/90">{row.margin}</td>
                              <td className="px-3 py-3 text-center">
                                <span
                                  className={`px-2 py-0.5 rounded-full text-[9px] font-bold ${
                                    row.status === "Verified"
                                      ? "bg-emerald-500/15 border border-emerald-500/30 text-emerald-400"
                                      : row.status === "Warning"
                                      ? "bg-red-500/15 border border-red-500/30 text-red-400"
                                      : "bg-orange-500/15 border border-orange-500/30 text-orange-400 animate-pulse"
                                  }`}
                                >
                                  {row.status}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    {/* Selected Row Drawer details */}
                    {selectedExcelRow && (
                      <div className="p-4 border-t border-white/5 bg-black/60 space-y-2 relative">
                        <h4 className="text-[10px] uppercase text-[#FF9933] font-bold">
                          Ledger Audit Logs: {selectedExcelRow.lrNo}
                        </h4>
                        <div className="grid grid-cols-3 gap-2 text-[10px] font-mono text-white/40">
                          <div>
                            ADVANCE: <span className="text-white/80">₹{selectedExcelRow.advance.toLocaleString()}</span>
                          </div>
                          <div>
                            TOLL: <span className="text-white/80">₹{selectedExcelRow.tollCharge.toLocaleString()}</span>
                          </div>
                          <div>
                            PROFIT: <span className="text-white/80">₹{selectedExcelRow.profit.toLocaleString()}</span>
                          </div>
                        </div>
                        <p className="text-xs text-white/80 leading-normal font-light">
                          {selectedExcelRow.auditMessage}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Terminal log logs showing scraping process */}
                  {auditLogs.length > 0 && (
                    <div className="p-4 rounded-2xl border border-white/5 bg-black/80 font-mono text-[9px] text-orange-400 space-y-1 max-h-[100px] overflow-y-auto scrollbar-thin">
                      {auditLogs.map((log, idx) => (
                        <div key={idx} className="flex gap-2">
                          <span className="text-white/30">[{new Date().toLocaleTimeString()}]</span>
                          <span className="text-white/80">{log}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* TAB C: LORRY RECEIPT OCR SCANNER */}
              {activeWorkspaceTab === "ocr" && (
                <div className="space-y-5 flex-1 flex flex-col justify-center">
                  <div className="text-center sm:text-left">
                    <h3 className="text-xs font-bold text-white flex items-center justify-center sm:justify-start gap-1.5">
                      📝 Proof Of Delivery (POD) Image OCR Scanner
                    </h3>
                    <p className="text-[9px] text-white/35">AI-driven layout extraction and signature reconciliation</p>
                  </div>

                  {/* Lorry receipt image mockup container */}
                  <div className="relative flex-1 min-h-[350px] max-h-[500px] w-full max-w-sm mx-auto bg-zinc-900 border border-white/10 rounded-2xl p-4 shadow-[0_8px_32px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col justify-between">
                    {/* Bounding box loading state */}
                    {ocrLoading && (
                      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm z-30 flex flex-col items-center justify-center gap-3">
                        <span className="animate-spin w-8 h-8 border-4 border-[#FF9933] border-t-transparent rounded-full" />
                        <span className="text-xs font-mono text-[#FF9933] uppercase tracking-wider animate-pulse">
                          Running OCR Layout Parser...
                        </span>
                      </div>
                    )}

                    {/* Lorry Receipt Sheet contents mockup */}
                    <div className="border border-white/5 p-3 flex-1 flex flex-col justify-between text-[8px] font-mono text-white/40 bg-zinc-950/80 rounded-xl relative select-none">
                      {/* Grid background representation */}
                      <div className="absolute inset-0 bg-[radial-gradient(#ffffff04_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

                      <div className="flex justify-between items-start border-b border-white/5 pb-2">
                        <div>
                          <div className="text-[9px] font-bold text-white/90">SHIPBRIDGE LOGISTICS INDIA</div>
                          <div>New Delhi Depot Cluster (GSTIN-07AAAAA000A)</div>
                        </div>
                        <div className="text-right">
                          <div className="text-[9px] font-bold text-orange-500">LORRY RECEIPT</div>
                          <div>DATE: 22/05/2026</div>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4 py-2 border-b border-white/5">
                        <div className="space-y-1">
                          <div className="text-[7px] uppercase font-bold">Consignor Name:</div>
                          <div className="text-white/70">Tata Steel Limited</div>
                          <div>Kalinganagar Steel Plant, Odisha</div>
                        </div>
                        <div className="space-y-1">
                          <div className="text-[7px] uppercase font-bold">Consignee Name:</div>
                          <div className="text-white/70">Maruti Suzuki India Ltd</div>
                          <div>Manesar Warehouse Depot, Gurgaon</div>
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-2 py-2 border-b border-white/5 text-center">
                        <div>
                          <div className="text-[7px] uppercase">Lorry Receipt No</div>
                          <div className="text-white/70">LR-100294</div>
                        </div>
                        <div>
                          <div className="text-[7px] uppercase">Vehicle No</div>
                          <div className="text-white/70">RJ-14-GB-9921</div>
                        </div>
                        <div>
                          <div className="text-[7px] uppercase">Consignment Wt</div>
                          <div className="text-white/70">18.5 Tons</div>
                        </div>
                      </div>

                      <div className="py-2 space-y-1.5 flex-1">
                        <div className="text-[7px] uppercase font-bold">Description of Cargo:</div>
                        <div className="text-white/70">HR Steel Plates (Industrial Grade)</div>
                        <div className="flex justify-between border-t border-white/5 pt-2 mt-2 font-bold">
                          <span>FREIGHT RATE (PER TON):</span>
                          <span className="text-white/80">₹9,729</span>
                        </div>
                        <div className="flex justify-between font-bold">
                          <span>NET FREIGHT VALUE:</span>
                          <span className="text-white/80">₹1,80,000</span>
                        </div>
                      </div>

                      <div className="flex justify-between items-end border-t border-white/5 pt-2">
                        <div className="w-16 h-12 border border-white/5 flex flex-col justify-between items-center p-1 rounded bg-black/40">
                          <span className="text-[6px] text-white/30 uppercase">Depot Stamp</span>
                          <span className="text-[7px] text-[#FF9933] font-semibold">VERIFIED</span>
                        </div>
                        <div className="w-24 h-12 border border-white/5 flex flex-col justify-between items-center p-1 rounded bg-black/40">
                          <span className="text-[6px] text-white/30 uppercase">Driver Signature</span>
                          <span className="text-[7px] text-white/75 italic">R. Kumar</span>
                        </div>
                      </div>

                      {/* Interactive Bounding Boxes Overlay */}
                      {!ocrLoading &&
                        ocrFields.map(field => (
                          <div
                            key={field.id}
                            onMouseEnter={() => setHoveredOCRField(field.id)}
                            onMouseLeave={() => setHoveredOCRField(null)}
                            onClick={() => setSelectedOCRField(field)}
                            className={`absolute rounded transition-all cursor-pointer ${
                              hoveredOCRField === field.id
                                ? "bg-[#FF9933]/15 border-2 border-[#FF9933] shadow-[0_0_12px_rgba(0,255,135,0.4)] z-20"
                                : selectedOCRField?.id === field.id
                                ? "bg-orange-500/15 border-2 border-orange-500 shadow-[0_0_12px_rgba(249,115,22,0.4)] z-20"
                                : "bg-transparent border border-white/10 hover:border-white/35"
                            }`}
                            style={{
                              top: field.rect.top,
                              left: field.rect.left,
                              width: field.rect.width,
                              height: field.rect.height
                            }}
                          />
                        ))}
                    </div>

                    {/* Floating helper details panel */}
                    <div className="mt-3 p-3 bg-black/60 rounded-xl border border-white/5 text-[10px] text-white/50 relative">
                      {selectedOCRField ? (
                        <div className="space-y-1.5 animate-fade-in">
                          <div className="flex justify-between items-center">
                            <span className="font-bold text-white">{selectedOCRField.label}</span>
                            <span className="text-[#FF9933] font-bold font-mono">{selectedOCRField.confidence}</span>
                          </div>
                          <div className="text-white/80">
                            EXTRACTED VALUE: <span className="font-mono text-orange-400">{selectedOCRField.value}</span>
                          </div>
                          <div className="text-[8px] uppercase tracking-widest text-[#FF9933]">
                            NIC STAT: {selectedOCRField.status}
                          </div>
                        </div>
                      ) : (
                        <div className="text-center py-2 font-mono uppercase text-[9px] tracking-wider">
                          💡 Hover or click highlighted fields to inspect OCR telemetry
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* TAB D: FASTAG CHECKPOINT TIMELINE LOGBOOK */}
              {activeWorkspaceTab === "fastag" && (
                <div className="space-y-5 flex-1 flex flex-col">
                  <div>
                    <h3 className="text-xs font-bold text-white flex items-center gap-1.5">
                      🛣️ NH-48 FASTag Checkpoint Logs
                    </h3>
                    <p className="text-[9px] text-white/35">National Highway toll plaza scanner telemetry</p>
                  </div>

                  {/* Timeline representation */}
                  <div className="flex-1 p-4 rounded-2xl border border-white/5 bg-black/40 relative">
                    <div className="absolute left-[29px] top-6 bottom-6 w-0.5 bg-gradient-to-b from-[#FF9933] via-[#f97316] to-white/15" />

                    <div className="space-y-6 relative z-10">
                      {[
                        {
                          time: "11:45 AM",
                          plaza: "Kherki Daula Toll Plaza",
                          loc: "Gurugram (NH-48)",
                          vehicle: "DL-1C-AA-0982",
                          amt: "₹190",
                          status: "Match",
                          alert: "Crossed 45 mins earlier than scheduled. Average transit speed: 78 km/h."
                        },
                        {
                          time: "11:45 AM",
                          plaza: "Delhi Border Plaza",
                          loc: "Delhi/Haryana Border",
                          vehicle: "RJ-14-GB-9921",
                          amt: "₹240",
                          status: "Match",
                          alert: "Toll crossing reconciled. Scheduled transit path matched."
                        },
                        {
                          time: "08:15 AM",
                          plaza: "Shahpura Plaza",
                          loc: "Rajasthan (NH-48)",
                          vehicle: "MH-12-QY-5421",
                          amt: "₹310",
                          status: "Match",
                          alert: "Toll crossing verified. Driver checked-in."
                        },
                        {
                          time: "Yesterday",
                          plaza: "Kishangarh Plaza",
                          loc: "Ajmer Outer Toll",
                          vehicle: "HR-55-AB-4321",
                          amt: "₹290",
                          status: "Warning",
                          alert: "Double debit flagged. Claim submitted to payment bank automatically."
                        }
                      ].map((log, idx) => (
                        <div key={idx} className="flex gap-4 items-start text-xs font-light">
                          {/* Dot indicator */}
                          <div
                            className={`w-4 h-4 rounded-full flex-shrink-0 flex items-center justify-center text-[8px] font-bold z-10 ${
                              log.status === "Match"
                                ? "bg-[#FF9933] text-black shadow-[0_0_10px_rgba(0,255,135,0.4)]"
                                : "bg-red-500 text-white shadow-[0_0_10px_rgba(239,68,68,0.4)]"
                            }`}
                          >
                            ✓
                          </div>

                          <div className="space-y-1 flex-1">
                            <div className="flex justify-between items-center">
                              <span className="font-bold text-white/95">{log.plaza}</span>
                              <span className="font-mono text-white/30 text-[9px]">{log.time}</span>
                            </div>
                            <div className="text-[10px] text-white/45 font-mono">
                              VEHICLE: {log.vehicle} | PLAZA: {log.loc}
                            </div>
                            <p className="text-[10px] text-white/70 font-light leading-relaxed">{log.alert}</p>
                            <span className="text-[9px] px-1.5 py-0.5 rounded bg-white/5 border border-white/10 font-mono inline-block">
                              CHARGE: {log.amt}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Ambient vector details at the bottom of Workspace */}
            <div className="p-4 border-t border-white/5 bg-black/10 flex justify-between items-center text-[8px] font-mono text-white/20 flex-shrink-0">
              <span>SYSTEM: LOCAL TRANSIT SIMULATOR</span>
              <span>STATE: SYNCHRONIZED</span>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
