"use client";

import { useState } from "react";
import SectionAurora from "@/components/SectionAurora";


// --- TYPES ---
interface FlowchartNode {
  id: string;
  lane: "manual" | "portal" | "ai" | "all";
  title: string;
  subtitle: string;
  description: string;
  status: "active" | "queued" | "completed";
  sopInfo: string;
  errorPotential: string;
}

interface OrderRecord {
  id: string;
  lrNo: string;
  clientName: string;
  consignor: string;
  consignee: string;
  route: string;
  weight: string;
  freight: number;
  vehicleType: string;
  paymentMode: "Prepaid" | "COD" | "To-Pay" | "Account-Billing";
  gstStatus: string;
  eWayBill: string;
  createdVia: "Manual Entry" | "Portal API" | "AI WhatsApp OCR";
  timestamp: string;
}

export default function OrderIngestionHub() {
  // --- MOCK DATABASE STATS ---
  const [ordersList, setOrdersList] = useState<OrderRecord[]>([
    {
      id: "ord-1",
      lrNo: "LR-100295",
      clientName: "Tata Steel Limited",
      consignor: "Bhiwadi Steel Depot, Rajasthan",
      consignee: "Maruti Suzuki Warehouse, Gurgaon",
      route: "Bhiwadi → Gurgaon",
      weight: "18.5 Tons",
      freight: 48500,
      vehicleType: "32ft MX Container",
      paymentMode: "Account-Billing",
      gstStatus: "Verified (RCM Applicable)",
      eWayBill: "EWB-883920194821",
      createdVia: "Portal API",
      timestamp: "Today, 04:30 PM"
    },
    {
      id: "ord-2",
      lrNo: "LR-100296",
      clientName: "Maruti Suzuki India Ltd",
      consignor: "Gurgaon Plant Terminal, Haryana",
      consignee: "Jaipur Transit Hub, Rajasthan",
      route: "Gurgaon → Jaipur",
      weight: "12 Tons",
      freight: 31200,
      vehicleType: "24ft Single Axle Truck",
      paymentMode: "Prepaid",
      gstStatus: "Verified (GTA Standard 12%)",
      eWayBill: "EWB-104928194012",
      createdVia: "Manual Entry",
      timestamp: "Today, 03:15 PM"
    }
  ]);

  // --- DYNAMIC STATE FOR INTERACTIVE FLOWCHART ---
  const [activeLaneFilter, setActiveLaneFilter] = useState<"all" | "manual" | "portal" | "ai">("all");
  const [selectedNode, setSelectedNode] = useState<FlowchartNode | null>({
    id: "ai-ocr",
    lane: "ai",
    title: "Document OCR & NLP Parser",
    subtitle: "AI-assisted ingestion point",
    description: "Reads attached PDFs, WhatsApp texts, and emails to extract shipping parameters with zero manual keying.",
    status: "active",
    sopInfo: "OCR converts scanned PDFs. Named Entity Recognition (NER) models parse text like '120 boxes' or 'Bhiwadi to Jaipur' and search customer master lists to match database entities.",
    errorPotential: "Medium risk. Distortions, bad photocopy quality, or hand-written notes can cause character misreads. Requires human-in-the-loop exception handling."
  });

  // Flowchart Data definition
  const flowchartNodes: FlowchartNode[] = [
    {
      id: "man-entry",
      lane: "manual",
      title: "Manual Form Entry",
      subtitle: "Human Operator input",
      description: "Operator receives trip details via phone or local notes and types them into the logistics form.",
      status: "active",
      sopInfo: "Best for customized B2B trips where cargo details are highly variable and instructions are delivered verbally.",
      errorPotential: "High risk of typing errors in e-Way bills, vehicle numbers, and manual freight charges."
    },
    {
      id: "man-rate",
      lane: "manual",
      title: "Manual Rate Matching",
      subtitle: "Contract Rate Cards lookup",
      description: "Checks customer contract rate lists to calculate freight value based on cargo weight and lanes.",
      status: "queued",
      sopInfo: "Requires operator to cross-check approved logistics rate cards. Auto-fills rate suggestions based on lane distance.",
      errorPotential: "Low risk. If lane rate is missing, system flags a billing warning to avoid under-charging."
    },
    {
      id: "portal-api",
      lane: "portal",
      title: "Customer Portals & API Webhooks",
      subtitle: "Direct ERP integrations",
      description: "Direct automated creation via B2B APIs, client customer portals, or upstream manufacturer ERP feeds.",
      status: "completed",
      sopInfo: "Zero manual intervention. Standard JSON delivery data triggers a dispatch webhook on the ShipBridge node.",
      errorPotential: "Very low risk. Mismatched addresses trigger automated Lane Serviceability API rejections back to source."
    },
    {
      id: "ai-ocr",
      lane: "ai",
      title: "Document OCR & NLP Parser",
      subtitle: "AI-assisted ingestion point",
      description: "Reads attached PDFs, WhatsApp texts, and emails to extract shipping parameters with zero manual keying.",
      status: "active",
      sopInfo: "OCR converts scanned PDFs. Named Entity Recognition (NER) models parse text like '120 boxes' or 'Bhiwadi to Jaipur' and search customer master lists to match database entities.",
      errorPotential: "Medium risk. Distortions, bad photocopy quality, or hand-written notes can cause character misreads. Requires human-in-the-loop exception handling."
    },
    {
      id: "ai-confidence",
      lane: "ai",
      title: "Confidence Match Engine",
      subtitle: "Dynamic confidence scoring",
      description: "Scores extraction parameters against database master directories. Higher confidence passes automatically.",
      status: "queued",
      sopInfo: "Compares values. Example: 'Maruti' has a 99% match confidence to 'Maruti Suzuki India Ltd' in databases.",
      errorPotential: "Low risk. Highlights low-confidence keys in yellow for visual operator checking."
    },
    {
      id: "val-checker",
      lane: "all",
      title: "RCM & GST Compliance Check",
      subtitle: "NIC Portals automated query",
      description: "Performs real-time validations including GSTIN status, RCM applicability, and NIC e-Way Bill status.",
      status: "active",
      sopInfo: "Queries state databases. Determines whether tax will be handled under GTA Standard rate or Reverse Charge Mechanism (RCM).",
      errorPotential: "Low risk. Immediate hard blocks are placed on expired e-Way bills or unregistered transporters."
    },
    {
      id: "post-dispatch",
      lane: "all",
      title: "Consignment & Lorry Receipt Issued",
      subtitle: "Operations feed release",
      description: "Generates the official Lorry Receipt (LR) number, allocates the route plan, and sends trip SMS notifications.",
      status: "completed",
      sopInfo: "Generates PDF consignment note with green verified stamp. Pushes tracking status live on driver tracking apps.",
      errorPotential: "Zero risk. Transaction is digitally signed and written to client audit log sheets."
    }
  ];

  // --- CREATOR WORKSPACE SIMULATOR STATE ---
  const [creatorMode, setCreatorMode] = useState<"manual" | "ai">("ai");

  // Manual Form State
  const [clientSelection, setClientSelection] = useState("Tata Steel Limited");
  const [consignorVal, setConsignorVal] = useState("Bhiwadi Steel Depot, Rajasthan");
  const [consigneeVal, setConsigneeVal] = useState("Jaipur Distribution Hub, Rajasthan");
  const [routeVal, setRouteVal] = useState("Bhiwadi → Jaipur");
  const [cargoWeightVal, setCargoWeightVal] = useState("18.5 Tons");
  const [vehicleTypeVal, setVehicleTypeVal] = useState("32ft Single Axle Truck");
  const [paymentModeVal, setPaymentModeVal] = useState<"Prepaid" | "COD" | "To-Pay" | "Account-Billing">("Account-Billing");
  const [freightCharge, setFreightCharge] = useState(38500);
  const [applyRcm, setApplyRcm] = useState(true);
  const [eWayBillNum, setEWayBillNum] = useState("EWB-993848201293");
  const [formFeedback, setFormFeedback] = useState("");

  // Route-client price and vehicle matching database
  const getRouteRateAndVehicle = (route: string, client: string) => {
    if (route === "Bhiwadi → Jaipur") {
      return {
        freight: client === "Tata Steel Limited" ? 38500 : 42000,
        vehicle: "32ft Single Axle Truck"
      };
    } else if (route === "Gurgaon → Chennai") {
      return {
        freight: client === "Tata Steel Limited" ? 92000 : 98000,
        vehicle: "32ft Multi-Axle Container"
      };
    } else if (route === "Mumbai → Pune") {
      return {
        freight: 19500,
        vehicle: "14ft Tata Truck"
      };
    } else {
      return {
        freight: 28000,
        vehicle: "24ft Single Axle Truck"
      };
    }
  };

  const handleClientChange = (newClient: string) => {
    setClientSelection(newClient);
    const match = getRouteRateAndVehicle(routeVal, newClient);
    setFreightCharge(match.freight);
    setVehicleTypeVal(match.vehicle);
  };

  const handleRouteChange = (newRoute: string) => {
    setRouteVal(newRoute);
    const match = getRouteRateAndVehicle(newRoute, clientSelection);
    setFreightCharge(match.freight);
    setVehicleTypeVal(match.vehicle);
  };

  // AI WhatsApp Parser State
  const [whatsappPrompt, setWhatsappPrompt] = useState(
    "Pickup 120 boxes of automotive parts from Bhiwadi Depot to Jaipur Terminal tomorrow. Client is Maruti Suzuki. Prepaid cargo, fragile. Standard billing rate card to apply. Contact Person: Anil Yadav (98765-11223)."
  );
  const [parseLogs, setParseLogs] = useState<string[]>([]);
  const [parseProgress, setParseProgress] = useState(0);
  const [isParsing, setIsParsing] = useState(false);
  const [aiExtractedFields, setAiExtractedFields] = useState<{
    id: string;
    label: string;
    extractedValue: string;
    confidence: number;
    status: "verified" | "warning" | "error";
    masterMatch: string;
  }[] | null>(null);

  // Generated LR State
  const [generatedLR, setGeneratedLR] = useState<OrderRecord | null>(null);

  // Suggested Prompts for WhatsApp Ingestion
  const suggestPrompts = [
    {
      label: "Bhiwadi to Jaipur LTL",
      text: "Pickup 120 boxes of automotive parts from Bhiwadi Depot to Jaipur Terminal tomorrow. Client is Maruti Suzuki. Prepaid cargo, fragile. Standard billing rate card to apply. Contact Person: Anil Yadav (98765-11223)."
    },
    {
      label: "Jamshedpur to Pune Steel Coils",
      text: "Tata Steel Dispatch: Transmit 22 Tons hot rolled coils from Jamshedpur Main Plant to Maruti Pune stamping hub. COD payment Rs 84,000. Under RCM terms. Vehicle requirement: 40ft Multi-Axle flatbed."
    },
    {
      label: "Bhiwadi to Gurgaon Parts",
      text: "Request booking: 4 tons electrical goods from Bhiwadi to Gurgaon sector 35 warehouse. Carrier: Maruti Suzuki. Charge ₹18,500. e-Way bill EWB-204918294812 already issued."
    }
  ];

  // Simulator for AI parsing
  const triggerAIParse = () => {
    if (isParsing) return;
    setIsParsing(true);
    setParseProgress(0);
    setParseLogs([]);
    setAiExtractedFields(null);
    setGeneratedLR(null);

    const logs = [
      "⚡ Ingestion stream triggered from input channel...",
      "🔍 Loading layout-aware Indian OCR parse models...",
      "🧩 Extracted raw entities via Named Entity Recognition (NER)",
      "🔗 Matching extracted clients to master database profiles...",
      "🗺️ Calculating coordinates for lanes: Bhiwadi → Jaipur",
      "💰 Querying active client Rate Cards... Match found: Code MS-R49",
      "🚦 Querying NIC E-Way Bill status for EWB number...",
      "📋 Validating GSTIN reverse charge mechanism applicability...",
      "✅ Ingestion complete. Human Review Panel initialized."
    ];

    let currentStep = 0;
    const interval = setInterval(() => {
      if (currentStep < logs.length) {
        setParseLogs(prev => [...prev, logs[currentStep]]);
        setParseProgress(Math.floor(((currentStep + 1) / logs.length) * 100));
        currentStep++;
      } else {
        clearInterval(interval);
        setIsParsing(false);

        // Prepopulate parsed values based on what was typed/selected
        const isSteel = whatsappPrompt.toLowerCase().includes("steel") || whatsappPrompt.toLowerCase().includes("tata");
        const isGurgaon = whatsappPrompt.toLowerCase().includes("gurgaon");

        if (isSteel) {
          setAiExtractedFields([
            { id: "client", label: "Client Account", extractedValue: "Tata Steel Limited", confidence: 99.4, status: "verified", masterMatch: "Verified Client ID: TS-99214" },
            { id: "consignor", label: "Consignor (Pickup)", extractedValue: "Jamshedpur Main Plant, Jharkhand", confidence: 98.7, status: "verified", masterMatch: "Jamshedpur Depot Main-A" },
            { id: "consignee", label: "Consignee (Delivery)", extractedValue: "Maruti Pune Stamping Hub, Maharashtra", confidence: 96.2, status: "verified", masterMatch: "Pune Midc Zone-3" },
            { id: "cargo", label: "Cargo Load & Weight", extractedValue: "22 Tons (Hot Rolled Coils)", confidence: 95.8, status: "verified", masterMatch: "Matched Product Category: Heavy Metal Coils" },
            { id: "freight", label: "Rate Card Freight", extractedValue: "₹84,000", confidence: 99.1, status: "verified", masterMatch: "Contract Rate ID: CTR-TATA-4482" },
            { id: "vehicle", label: "Vehicle Type Recommend", extractedValue: "40ft Flatbed Trailer", confidence: 94.5, status: "verified", masterMatch: "Recommended Trailer Allocation" },
            { id: "payment", label: "Payment Mode", extractedValue: "COD", confidence: 98.0, status: "verified", masterMatch: "Terms: Cash On Delivery" },
            { id: "gst", label: "GST Status", extractedValue: "RCM Applicable (GTA Schema)", confidence: 97.5, status: "verified", masterMatch: "Recipient responsible to pay tax" },
            { id: "eway", label: "e-Way Bill Number", extractedValue: "EWB-109403859218", confidence: 64.2, status: "warning", masterMatch: "Low Confidence - Manual Entry Required" }
          ]);
        } else if (isGurgaon) {
          setAiExtractedFields([
            { id: "client", label: "Client Account", extractedValue: "Maruti Suzuki India Ltd", confidence: 99.1, status: "verified", masterMatch: "Verified Client ID: MS-77382" },
            { id: "consignor", label: "Consignor (Pickup)", extractedValue: "Bhiwadi Depot, Rajasthan", confidence: 97.4, status: "verified", masterMatch: "Bhiwadi Warehouse B-1" },
            { id: "consignee", label: "Consignee (Delivery)", extractedValue: "Gurgaon Sector 35 Warehouse, Haryana", confidence: 98.2, status: "verified", masterMatch: "Gurgaon Hub 4" },
            { id: "cargo", label: "Cargo Load & Weight", extractedValue: "4 Tons (Electrical Goods)", confidence: 95.0, status: "verified", masterMatch: "Matched Product: Industrial Cables" },
            { id: "freight", label: "Rate Card Freight", extractedValue: "₹18,500", confidence: 99.5, status: "verified", masterMatch: "Contract Rate ID: CTR-MS-9021" },
            { id: "vehicle", label: "Vehicle Type Recommend", extractedValue: "14ft Tata Truck", confidence: 91.2, status: "verified", masterMatch: "Standard Cargo LTL" },
            { id: "payment", label: "Payment Mode", extractedValue: "Prepaid", confidence: 97.8, status: "verified", masterMatch: "Terms: Prepaid Invoice Billing" },
            { id: "gst", label: "GST Status", extractedValue: "GTA Standard 12%", confidence: 96.0, status: "verified", masterMatch: "GTA Standard 12% IGST Applied" },
            { id: "eway", label: "e-Way Bill Number", extractedValue: "EWB-204918294812", confidence: 99.8, status: "verified", masterMatch: "Verified on NIC Portal" }
          ]);
        } else {
          // Default Bhiwadi to Jaipur
          setAiExtractedFields([
            { id: "client", label: "Client Account", extractedValue: "Maruti Suzuki India Ltd", confidence: 98.8, status: "verified", masterMatch: "Verified Client ID: MS-77382" },
            { id: "consignor", label: "Consignor (Pickup)", extractedValue: "Bhiwadi Depot, Rajasthan", confidence: 96.4, status: "verified", masterMatch: "Bhiwadi Warehouse B-1" },
            { id: "consignee", label: "Consignee (Delivery)", extractedValue: "Jaipur Terminal, Rajasthan", confidence: 95.9, status: "verified", masterMatch: "Jaipur Hub-South" },
            { id: "cargo", label: "Cargo Load & Weight", extractedValue: "120 Boxes (Automotive Parts)", confidence: 97.2, status: "verified", masterMatch: "Matched Product: Spare Assembly Kits" },
            { id: "freight", label: "Rate Card Freight", extractedValue: "₹28,500", confidence: 98.9, status: "verified", masterMatch: "Contract Rate ID: CTR-MS-8832" },
            { id: "vehicle", label: "Vehicle Type Recommend", extractedValue: "14ft Tata Truck", confidence: 93.4, status: "verified", masterMatch: "Standard Lorry Box Truck" },
            { id: "payment", label: "Payment Mode", extractedValue: "Prepaid", confidence: 99.0, status: "verified", masterMatch: "Prepaid Account Ledger" },
            { id: "gst", label: "GST Status", extractedValue: "GTA Standard 12%", confidence: 95.5, status: "verified", masterMatch: "GTA Standard 12% IGST Applied" },
            { id: "eway", label: "e-Way Bill Number", extractedValue: "PENDING_RECONCILE", confidence: 40.5, status: "error", masterMatch: "Missing field. Please enter manually!" }
          ]);
        }
      }
    }, 350);
  };

  // Human edits value in the Exception Editor
  const handleInlineEditChange = (id: string, newVal: string) => {
    if (!aiExtractedFields) return;
    setAiExtractedFields(prev => {
      if (!prev) return null;
      return prev.map(field => {
        if (field.id === id) {
          return {
            ...field,
            extractedValue: newVal,
            confidence: 100, // Manual correction resets confidence to 100% human-verified
            status: newVal !== "" && newVal !== "PENDING_RECONCILE" ? "verified" : "error"
          };
        }
        return field;
      });
    });
  };

  // Manual Form Submission
  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!consignorVal || !consigneeVal) {
      setFormFeedback("Error: Please provide consignor and consignee details.");
      return;
    }

    const mockLr = `LR-${Math.floor(100000 + Math.random() * 900000)}`;
    const newRecord: OrderRecord = {
      id: `ord-${Math.random()}`,
      lrNo: mockLr,
      clientName: clientSelection,
      consignor: consignorVal,
      consignee: consigneeVal,
      route: routeVal,
      weight: cargoWeightVal,
      freight: freightCharge,
      vehicleType: vehicleTypeVal,
      paymentMode: paymentModeVal,
      gstStatus: applyRcm ? "Verified (RCM Applicable)" : "Verified (GTA Standard 12%)",
      eWayBill: eWayBillNum || "NOT_ISSUED",
      createdVia: "Manual Entry",
      timestamp: "Just Now"
    };

    setOrdersList(prev => [newRecord, ...prev]);
    setGeneratedLR(newRecord);
    setFormFeedback("Success: Order created manually. Lorry Receipt issued.");
  };

  // AI Approved Submission
  const handleAIApproveAndSubmit = () => {
    if (!aiExtractedFields) return;

    // Check for errors (like unresolved missing fields)
    const hasErrors = aiExtractedFields.some(f => f.status === "error");
    if (hasErrors) {
      alert("Please fix all validation errors in red before issuing the Lorry Receipt.");
      return;
    }

    const fieldsMap = aiExtractedFields.reduce((acc, f) => {
      acc[f.id] = f.extractedValue;
      return acc;
    }, {} as Record<string, string>);

    const mockLr = `LR-${Math.floor(100000 + Math.random() * 900000)}`;
    const newRecord: OrderRecord = {
      id: `ord-${Math.random()}`,
      lrNo: mockLr,
      clientName: fieldsMap["client"],
      consignor: fieldsMap["consignor"],
      consignee: fieldsMap["consignee"],
      route: `${fieldsMap["consignor"].split(",")[0]} → ${fieldsMap["consignee"].split(",")[0]}`,
      weight: fieldsMap["cargo"],
      freight: parseInt(fieldsMap["freight"].replace(/[^0-9]/g, "")) || 28500,
      vehicleType: fieldsMap["vehicle"],
      paymentMode: (fieldsMap["payment"] as OrderRecord["paymentMode"]) || "Prepaid",
      gstStatus: fieldsMap["gst"],
      eWayBill: fieldsMap["eway"],
      createdVia: "AI WhatsApp OCR",
      timestamp: "Just Now"
    };

    setOrdersList(prev => [newRecord, ...prev]);
    setGeneratedLR(newRecord);
  };



  return (
    <main className="relative min-h-screen text-white pt-28 pb-16 px-4 md:px-8 bg-[#020202]">
      {/* Mesh Gradient Background Aurora */}
      <SectionAurora />

      <div className="max-w-7xl mx-auto z-10 relative">
        {/* --- PAGE HEADER --- */}
        <header className="mb-10 text-center md:text-left">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[9px] font-mono tracking-widest uppercase bg-white/5 border border-white/10 text-[#00ff87] shadow-[0_0_15px_rgba(0,255,135,0.08)] mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00ff87] animate-pulse" />
            Ingestion & Dispatch Center
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-white via-white/90 to-[#00ff87] bg-clip-text text-transparent leading-tight">
            Order Ingestion Hub
          </h1>
          <p className="text-white/60 text-sm md:text-base max-w-2xl mt-2 font-light">
            Logistics ERP order ingestion with Human-in-the-Loop AI verification. Verify rate cards, execute compliance validation, and issue Lorry Receipts.
          </p>
        </header>

        {/* --- FLOWCHART SECTION --- */}
        <section className="mb-12">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
              <h2 className="text-xl font-bold tracking-wide flex items-center gap-2">
                <svg className="w-5 h-5 text-[#00ff87]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
                Ingestion Workflow Flowchart
              </h2>
              <p className="text-xs text-white/40">Select filter to highlight active channels or click on any node to view ERP operations.</p>
            </div>
            
            {/* Filter buttons */}
            <div className="flex bg-black/40 border border-white/5 p-1 rounded-full self-start">
              {(["all", "manual", "portal", "ai"] as const).map(lane => (
                <button
                  key={lane}
                  onClick={() => setActiveLaneFilter(lane)}
                  className={`px-3 py-1 text-[10px] tracking-wider uppercase font-bold rounded-full transition-all duration-300 ${
                    activeLaneFilter === lane
                      ? "bg-[#00ff87] text-black shadow-[0_0_12px_rgba(0,255,135,0.3)]"
                      : "text-white/50 hover:text-white"
                  }`}
                >
                  {lane === "all" ? "Full Map" : `${lane} Lane`}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Flowchart Grid Column - Nodes layout */}
            <div className="lg:col-span-2 flex flex-col gap-4">
              
              {/* Manual Lane */}
              {(activeLaneFilter === "all" || activeLaneFilter === "manual") && (
                <div className="p-4 rounded-xl bg-white/2 border border-white/5 relative overflow-hidden">
                  <div className="absolute top-0 right-0 px-2 py-0.5 bg-[#f97316]/20 border-l border-b border-white/5 text-[8px] font-mono tracking-widest text-[#f97316] uppercase rounded-bl-lg">
                    Manual entry lane
                  </div>
                  <h3 className="text-xs font-bold text-white/50 uppercase tracking-widest mb-3">Operator-Led Ingestion</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {flowchartNodes.filter(n => n.lane === "manual").map(node => (
                      <div
                        key={node.id}
                        onClick={() => setSelectedNode(node)}
                        className={`p-3 rounded-lg border text-left cursor-pointer transition-all duration-300 ${
                          selectedNode?.id === node.id
                            ? "bg-white/5 border-[#00ff87] shadow-[0_0_15px_rgba(0,255,135,0.15)]"
                            : "bg-black/60 border-white/5 hover:border-white/20 hover:scale-[1.01]"
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs font-bold text-white">{node.title}</span>
                          <span className="w-1.5 h-1.5 rounded-full bg-[#f97316]" />
                        </div>
                        <p className="text-[10px] text-white/40 leading-relaxed line-clamp-1">{node.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Portal Lane */}
              {(activeLaneFilter === "all" || activeLaneFilter === "portal") && (
                <div className="p-4 rounded-xl bg-white/2 border border-white/5 relative overflow-hidden">
                  <div className="absolute top-0 right-0 px-2 py-0.5 bg-blue-500/20 border-l border-b border-white/5 text-[8px] font-mono tracking-widest text-blue-400 uppercase rounded-bl-lg">
                    Portal/API lane
                  </div>
                  <h3 className="text-xs font-bold text-white/50 uppercase tracking-widest mb-3">Straight-Through Processing</h3>
                  <div className="grid grid-cols-1 gap-3">
                    {flowchartNodes.filter(n => n.lane === "portal").map(node => (
                      <div
                        key={node.id}
                        onClick={() => setSelectedNode(node)}
                        className={`p-3 rounded-lg border text-left cursor-pointer transition-all duration-300 ${
                          selectedNode?.id === node.id
                            ? "bg-white/5 border-[#00ff87] shadow-[0_0_15px_rgba(0,255,135,0.15)]"
                            : "bg-black/60 border-white/5 hover:border-white/20 hover:scale-[1.01]"
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs font-bold text-white">{node.title}</span>
                          <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                        </div>
                        <p className="text-[10px] text-white/40 leading-relaxed line-clamp-1">{node.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* AI Lane */}
              {(activeLaneFilter === "all" || activeLaneFilter === "ai") && (
                <div className="p-4 rounded-xl bg-white/2 border border-white/5 relative overflow-hidden">
                  <div className="absolute top-0 right-0 px-2 py-0.5 bg-[#00ff87]/20 border-l border-b border-white/5 text-[8px] font-mono tracking-widest text-[#00ff87] uppercase rounded-bl-lg">
                    AI-assisted lane
                  </div>
                  <h3 className="text-xs font-bold text-white/50 uppercase tracking-widest mb-3">AI-OCR Document Parse</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {flowchartNodes.filter(n => n.lane === "ai").map(node => (
                      <div
                        key={node.id}
                        onClick={() => setSelectedNode(node)}
                        className={`p-3 rounded-lg border text-left cursor-pointer transition-all duration-300 ${
                          selectedNode?.id === node.id
                            ? "bg-white/5 border-[#00ff87] shadow-[0_0_15px_rgba(0,255,135,0.15)]"
                            : "bg-black/60 border-white/5 hover:border-white/20 hover:scale-[1.01]"
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs font-bold text-white">{node.title}</span>
                          <span className="w-1.5 h-1.5 rounded-full bg-[#00ff87]" />
                        </div>
                        <p className="text-[10px] text-white/40 leading-relaxed line-clamp-1">{node.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Connector for flow on mobile / desktop */}
              {activeLaneFilter === "all" && (
                <div className="flex justify-center my-2 select-none pointer-events-none">
                  <div className="flex flex-col items-center">
                    <div className="h-6 w-px bg-gradient-to-b from-[#00ff87] to-transparent opacity-60" />
                    <div className="w-6 h-6 rounded-full border border-[#00ff87]/30 bg-black/60 backdrop-blur-md flex items-center justify-center text-[11px] text-[#00ff87] shadow-[0_0_12px_rgba(0,255,135,0.25)]">
                      ↓
                    </div>
                    <div className="h-6 w-px bg-gradient-to-t from-[#00ff87] to-transparent opacity-60" />
                  </div>
                </div>
              )}

              {/* Common Validation & Output lanes */}
              {activeLaneFilter === "all" && (
                <div className="p-4 rounded-xl bg-[#00ff87]/2 border border-[#00ff87]/10 relative overflow-hidden">
                  <div className="absolute top-0 right-0 px-2 py-0.5 bg-emerald-500/20 border-l border-b border-white/5 text-[8px] font-mono tracking-widest text-[#00ff87] uppercase rounded-bl-lg">
                    Verification & Dispatch
                  </div>
                  <h3 className="text-xs font-bold text-[#00ff87]/70 uppercase tracking-widest mb-3">Compliance Verification</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {flowchartNodes.filter(n => n.lane === "all").map(node => (
                      <div
                        key={node.id}
                        onClick={() => setSelectedNode(node)}
                        className={`p-3 rounded-lg border text-left cursor-pointer transition-all duration-300 ${
                          selectedNode?.id === node.id
                            ? "bg-white/5 border-[#00ff87] shadow-[0_0_15px_rgba(0,255,135,0.15)]"
                            : "bg-black/60 border-white/5 hover:border-[#00ff87]/30 hover:scale-[1.01]"
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs font-bold text-white">{node.title}</span>
                          <span className="w-1.5 h-1.5 rounded-full bg-[#00ff87] shadow-[0_0_6px_#00ff87]" />
                        </div>
                        <p className="text-[10px] text-white/40 leading-relaxed line-clamp-1">{node.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>

            {/* Ingestion Info Panel Drawer */}
            <div className="lg:col-span-1">
              {selectedNode ? (
                <div className="lg:sticky lg:top-28 p-5 rounded-xl border border-white/10 bg-black/60 backdrop-blur-2xl shadow-[0_0_30px_rgba(0,0,0,0.5)]">
                  <span className={`inline-block px-2 py-0.5 rounded text-[8px] font-mono font-bold tracking-widest uppercase mb-3 ${
                    selectedNode.lane === "ai" ? "bg-[#00ff87]/15 text-[#00ff87]" :
                    selectedNode.lane === "portal" ? "bg-blue-500/15 text-blue-400" :
                    selectedNode.lane === "manual" ? "bg-[#f97316]/15 text-[#f97316]" :
                    "bg-white/10 text-white"
                  }`}>
                    {selectedNode.lane === "all" ? "Shared Gateway" : `${selectedNode.lane} pipeline`}
                  </span>
                  
                  <h3 className="text-lg font-bold text-white mb-0.5">{selectedNode.title}</h3>
                  <span className="text-xs text-white/40 font-mono italic">{selectedNode.subtitle}</span>
                  
                  <div className="h-px bg-gradient-to-r from-[#00ff87]/40 to-transparent my-4" />

                  <div className="space-y-4">
                    <div>
                      <h4 className="text-[10px] font-bold text-white/60 uppercase tracking-widest mb-1">Lane Role</h4>
                      <p className="text-xs text-white/80 leading-relaxed font-light">{selectedNode.description}</p>
                    </div>

                    <div>
                      <h4 className="text-[10px] font-bold text-white/60 uppercase tracking-widest mb-1">ERP Operations (SOP)</h4>
                      <p className="text-xs text-white/80 leading-relaxed font-light">{selectedNode.sopInfo}</p>
                    </div>

                    <div className="p-3 rounded-lg bg-red-950/20 border border-red-900/30">
                      <h4 className="text-[10px] font-bold text-red-400 uppercase tracking-widest mb-1">Human Validation Risks</h4>
                      <p className="text-[11px] text-red-300/80 leading-relaxed">{selectedNode.errorPotential}</p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="h-full border border-dashed border-white/10 rounded-xl flex items-center justify-center p-6 text-center text-white/30 text-xs">
                  Click any flowchart node to see detailed ERP operational parameters.
                </div>
              )}
            </div>
          </div>
        </section>

        {/* --- INTERACTIVE CREATOR WORKSPACE --- */}
        <section className="mb-12">
          <div className="mb-6">
            <h2 className="text-xl font-bold tracking-wide flex items-center gap-2">
              <svg className="w-5 h-5 text-[#00ff87]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              AI-Assisted Order Creator Simulator
            </h2>
            <p className="text-xs text-white/40">Switch between manual inputs or simulate AI-assisted WhatsApp parsing workflows.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Input Panels - 7 columns */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Workspace Card */}
              <div className="rounded-xl border border-white/10 bg-black/60 backdrop-blur-2xl shadow-[0_0_30px_rgba(0,0,0,0.5)] overflow-hidden">
                
                {/* Tab controller */}
                <div className="flex border-b border-white/5 bg-black/40">
                  <button
                    onClick={() => { setCreatorMode("ai"); setGeneratedLR(null); }}
                    className={`flex-1 py-3.5 text-xs font-bold tracking-wider uppercase flex items-center justify-center gap-2 border-b-2 transition-all duration-300 ${
                      creatorMode === "ai"
                        ? "border-[#00ff87] text-[#00ff87] bg-white/2"
                        : "border-transparent text-white/45 hover:text-white"
                    }`}
                  >
                    <span>🤖</span> <span className="hidden sm:inline">AI Document Parser (WhatsApp / PDF)</span><span className="sm:hidden">AI Parser</span>
                  </button>
                  <button
                    onClick={() => { setCreatorMode("manual"); setGeneratedLR(null); }}
                    className={`flex-1 py-3.5 text-xs font-bold tracking-wider uppercase flex items-center justify-center gap-2 border-b-2 transition-all duration-300 ${
                      creatorMode === "manual"
                        ? "border-[#00ff87] text-[#00ff87] bg-white/2"
                        : "border-transparent text-white/45 hover:text-white"
                    }`}
                  >
                    <span>✍️</span> <span className="hidden sm:inline">Manual Form Entry</span><span className="sm:hidden">Manual Form</span>
                  </button>
                </div>

                {/* Tab Content: AI Parser */}
                {creatorMode === "ai" && (
                  <div className="p-6 space-y-6">
                    <div>
                      <label className="block text-[10px] uppercase tracking-wider text-white/50 font-bold mb-2 font-mono">
                        Attach Document or Paste WhatsApp / Email Request
                      </label>
                      <textarea
                        value={whatsappPrompt}
                        onChange={(e) => setWhatsappPrompt(e.target.value)}
                        placeholder="Paste order details here... e.g. 'Pickup 15 tons of steel coils from Jamshedpur to Pune...'"
                        rows={4}
                        className="w-full bg-black/60 border border-white/10 rounded-lg p-3 text-xs text-white placeholder-white/20 focus:outline-none focus:border-[#00ff87]/50 focus:shadow-[0_0_15px_rgba(0,255,135,0.08)] resize-none font-sans leading-relaxed"
                      />
                    </div>

                    {/* Predefined prompt helpers */}
                    <div className="space-y-2">
                      <span className="block text-[9px] uppercase tracking-widest text-white/40 font-bold font-mono">Suggested Prompt Templates:</span>
                      <div className="flex flex-wrap gap-2">
                        {suggestPrompts.map((p, idx) => (
                          <button
                            key={idx}
                            onClick={() => setWhatsappPrompt(p.text)}
                            className="px-2.5 py-1.5 rounded bg-white/5 border border-white/5 text-[10px] text-white/70 hover:border-[#00ff87]/30 hover:text-white transition-all text-left max-w-xs truncate"
                          >
                            {p.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Submit parsing */}
                    <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                      <button
                        onClick={triggerAIParse}
                        disabled={isParsing || !whatsappPrompt}
                        className="w-full sm:w-auto px-6 py-3 rounded-full text-xs font-bold uppercase tracking-widest bg-gradient-to-r from-emerald-500 to-[#00ff87] text-black hover:shadow-[0_0_25px_rgba(0,255,135,0.4)] disabled:opacity-50 disabled:pointer-events-none transition-all duration-300 text-center"
                      >
                        {isParsing ? "⚡ Extracting..." : "⚡ Parse Logistics Order"}
                      </button>

                      {isParsing && (
                        <div className="w-full sm:flex-1 flex items-center gap-3">
                          <div className="h-1 bg-white/10 rounded-full flex-1 overflow-hidden">
                            <div
                              className="h-full bg-[#00ff87] transition-all duration-300"
                              style={{ width: `${parseProgress}%` }}
                            />
                          </div>
                          <span className="text-[10px] font-mono text-[#00ff87]">{parseProgress}%</span>
                        </div>
                      )}
                    </div>

                    {/* Terminal Parser Stream Logs */}
                    {(isParsing || parseLogs.length > 0) && (
                      <div className="rounded-lg bg-black border border-white/5 p-4 font-mono text-[10px] space-y-1.5 text-white/50 max-h-48 overflow-y-auto shadow-inner">
                        <div className="text-[#00ff87] mb-1 font-bold">--- LOGISTICS NLP ENGINE TERMINAL ---</div>
                        {parseLogs.map((log, i) => (
                          <div key={i} className="flex gap-2">
                            <span className="text-white/20 select-none">[{i + 1}]</span>
                            <span className={log.includes("✅") ? "text-[#00ff87]" : log.includes("❌") ? "text-red-400" : ""}>{log}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* Tab Content: Manual Form */}
                {creatorMode === "manual" && (
                  <form onSubmit={handleManualSubmit} className="p-6 space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] uppercase font-bold text-white/40 mb-1.5 font-mono">Client Account</label>
                        <select
                          value={clientSelection}
                          onChange={(e) => handleClientChange(e.target.value)}
                          className="w-full bg-black/60 border border-white/10 rounded p-2 text-xs text-white focus:outline-none focus:border-[#00ff87]/50"
                        >
                          <option>Tata Steel Limited</option>
                          <option>Maruti Suzuki India Ltd</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-[10px] uppercase font-bold text-white/40 mb-1.5 font-mono">Lane Route</label>
                        <select
                          value={routeVal}
                          onChange={(e) => handleRouteChange(e.target.value)}
                          className="w-full bg-black/60 border border-white/10 rounded p-2 text-xs text-white focus:outline-none focus:border-[#00ff87]/50"
                        >
                          <option>Bhiwadi → Jaipur</option>
                          <option>Gurgaon → Chennai</option>
                          <option>Mumbai → Pune</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-[10px] uppercase font-bold text-white/40 mb-1.5 font-mono">Consignor Name & Address</label>
                        <input
                          type="text"
                          value={consignorVal}
                          onChange={(e) => setConsignorVal(e.target.value)}
                          className="w-full bg-black/60 border border-white/10 rounded p-2 text-xs text-white focus:outline-none focus:border-[#00ff87]/50"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] uppercase font-bold text-white/40 mb-1.5 font-mono">Consignee Name & Address</label>
                        <input
                          type="text"
                          value={consigneeVal}
                          onChange={(e) => setConsigneeVal(e.target.value)}
                          className="w-full bg-black/60 border border-white/10 rounded p-2 text-xs text-white focus:outline-none focus:border-[#00ff87]/50"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] uppercase font-bold text-white/40 mb-1.5 font-mono">Cargo Weight / Vol</label>
                        <input
                          type="text"
                          value={cargoWeightVal}
                          onChange={(e) => setCargoWeightVal(e.target.value)}
                          className="w-full bg-black/60 border border-white/10 rounded p-2 text-xs text-white focus:outline-none focus:border-[#00ff87]/50"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] uppercase font-bold text-white/40 mb-1.5 font-mono">Recommended Truck Type</label>
                        <input
                          type="text"
                          value={vehicleTypeVal}
                          disabled
                          className="w-full bg-black/30 border border-white/5 rounded p-2 text-xs text-white/60 font-mono"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] uppercase font-bold text-white/40 mb-1.5 font-mono">Payment Mode</label>
                        <select
                          value={paymentModeVal}
                          onChange={(e) => setPaymentModeVal(e.target.value as OrderRecord["paymentMode"])}
                          className="w-full bg-black/60 border border-white/10 rounded p-2 text-xs text-white focus:outline-none focus:border-[#00ff87]/50"
                        >
                          <option value="Account-Billing">Account Billing</option>
                          <option value="Prepaid">Prepaid</option>
                          <option value="COD">COD</option>
                          <option value="To-Pay">To-Pay</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-[10px] uppercase font-bold text-white/40 mb-1.5 font-mono">Freight Contract Value (₹)</label>
                        <input
                          type="number"
                          value={freightCharge}
                          onChange={(e) => setFreightCharge(parseInt(e.target.value) || 0)}
                          className="w-full bg-black/60 border border-white/10 rounded p-2 text-xs text-white focus:outline-none focus:border-[#00ff87]/50 font-mono"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] uppercase font-bold text-white/40 mb-1.5 font-mono">NIC E-Way Bill Number</label>
                        <input
                          type="text"
                          value={eWayBillNum}
                          onChange={(e) => setEWayBillNum(e.target.value)}
                          className="w-full bg-black/60 border border-white/10 rounded p-2 text-xs text-white focus:outline-none focus:border-[#00ff87]/50 font-mono"
                        />
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-white/5 pt-4">
                      <div className="flex items-center justify-between sm:justify-start gap-4 w-full sm:w-auto">
                        <label className="flex items-center gap-2 cursor-pointer select-none">
                          <input
                            type="checkbox"
                            checked={applyRcm}
                            onChange={(e) => setApplyRcm(e.target.checked)}
                            className="w-4 h-4 rounded accent-[#00ff87] bg-black/60 border-white/10"
                          />
                          <span className="text-[11px] text-white/60">Apply GTA Reverse Charge (RCM)</span>
                        </label>
                        <span className={`w-2.5 h-2.5 rounded-full ${applyRcm ? "bg-amber-400 animate-pulse" : "bg-[#00ff87]"}`} title={applyRcm ? "Consignee to pay GST" : "GTA will bill GST"} />
                      </div>

                      <button
                        type="submit"
                        className="w-full sm:w-auto px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider bg-white/5 border border-white/10 hover:border-[#00ff87]/50 hover:bg-[#00ff87]/10 hover:text-[#00ff87] hover:shadow-[0_0_15px_rgba(0,255,135,0.25)] transition-all duration-300 text-center"
                      >
                        Submit Order Manual
                      </button>
                    </div>

                    {formFeedback && (
                      <div className={`p-3 rounded-lg text-xs font-medium ${
                        formFeedback.startsWith("Success") ? "bg-emerald-950/20 border border-emerald-900/30 text-emerald-400" : "bg-red-950/20 border border-red-900/30 text-red-400"
                      }`}>
                        {formFeedback}
                      </div>
                    )}
                  </form>
                )}

              </div>

              {/* Exception Editor Panel */}
              {creatorMode === "ai" && aiExtractedFields && (
                <div className="rounded-xl border border-white/10 bg-black/60 backdrop-blur-2xl shadow-[0_0_30px_rgba(0,0,0,0.5)] p-5 space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-bold tracking-wide flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-[#00ff87] shadow-[0_0_6px_#00ff87]" />
                        Human-in-the-Loop Exception Editor
                      </h3>
                      <p className="text-[10px] text-white/40">Review and manually adjust values marked with yellow/red before issuing dispatch LRs.</p>
                    </div>
                    <span className="text-[9px] font-mono bg-white/5 border border-white/5 px-2 py-0.5 rounded text-white/50">9 Fields Parsed</span>
                  </div>

                  <div className="overflow-x-auto -mx-5 px-5">
                    <table className="w-full min-w-[600px] text-left text-xs border-collapse">
                      <thead>
                        <tr className="border-b border-white/5 text-white/40 text-[9px] uppercase tracking-wider">
                          <th className="py-2 font-bold font-mono">Field Name</th>
                          <th className="py-2 font-bold font-mono">Extracted Value</th>
                          <th className="py-2 text-center font-bold font-mono">Confidence</th>
                          <th className="py-2 font-bold font-mono">Reconcile Source</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5">
                        {aiExtractedFields.map(field => (
                          <tr key={field.id} className="hover:bg-white/2 transition-colors">
                            <td className="py-2.5 font-medium text-white/80">{field.label}</td>
                            <td className="py-2.5">
                              <input
                                type="text"
                                value={field.extractedValue}
                                onChange={(e) => handleInlineEditChange(field.id, e.target.value)}
                                className={`bg-black/60 border rounded px-2 py-1 text-xs w-full max-w-[240px] focus:outline-none ${
                                  field.status === "verified" ? "border-white/10 focus:border-[#00ff87]/50" :
                                  field.status === "warning" ? "border-amber-500/50 focus:border-amber-400 bg-amber-950/10" :
                                  "border-red-500/50 focus:border-red-400 bg-red-950/10"
                                }`}
                              />
                            </td>
                            <td className="py-2.5 text-center font-mono">
                              <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                                field.confidence >= 95 ? "text-[#00ff87] bg-[#00ff87]/10" :
                                field.confidence >= 60 ? "text-amber-400 bg-amber-400/10" :
                                "text-red-400 bg-red-400/10"
                              }`}>
                                {field.confidence}%
                              </span>
                            </td>
                            <td className="py-2.5 text-[10px] text-white/40 font-mono">{field.masterMatch}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-white/5 pt-4">
                    <div className="flex items-center gap-2 text-left">
                      <svg className="w-4 h-4 text-emerald-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                      <span className="text-[10px] text-white/60 font-sans">NIC Gateways validated. e-Way bill reconciled. GSTIN active.</span>
                    </div>

                    <button
                      onClick={handleAIApproveAndSubmit}
                      className="w-full sm:w-auto px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest bg-gradient-to-r from-emerald-500 to-[#00ff87] text-black hover:shadow-[0_0_20px_rgba(0,255,135,0.3)] transition-all duration-300 text-center"
                    >
                      Approve & Issue Lorry Receipt (LR)
                    </button>
                  </div>
                </div>
              )}

            </div>

            {/* Output Panels - 5 columns */}
            <div className="lg:col-span-5 space-y-6">
              
              {/* Lorry Receipt Viewer */}
              {generatedLR ? (
                <div className="rounded-xl border border-[#00ff87]/30 bg-black/80 backdrop-blur-2xl p-6 shadow-[0_0_35px_rgba(0,255,135,0.15)] relative overflow-hidden space-y-4">
                  {/* Hologram stamp */}
                  <div className="absolute -top-4 -right-4 w-28 h-28 border border-[#00ff87]/20 rounded-full flex items-center justify-center rotate-12 opacity-80 pointer-events-none select-none">
                    <div className="border border-dashed border-[#00ff87]/30 rounded-full p-2 w-full h-full flex flex-col items-center justify-center">
                      <span className="text-[8px] font-mono font-bold text-[#00ff87] uppercase tracking-widest">SHIPBRIDGE</span>
                      <span className="text-[9px] font-bold text-[#00ff87]">VERIFIED</span>
                    </div>
                  </div>

                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-[9px] font-mono uppercase tracking-widest text-[#00ff87] font-bold">Consignment Note</span>
                      <h3 className="text-xl font-bold tracking-tight text-white mt-0.5">LORRY RECEIPT</h3>
                      <p className="text-[10px] font-mono text-white/40">{generatedLR.timestamp}</p>
                    </div>
                    <div className="text-right">
                      <span className="text-xs text-white/40 font-mono block">LR Number</span>
                      <span className="text-base font-bold text-[#00ff87] font-mono block tracking-wide">{generatedLR.lrNo}</span>
                    </div>
                  </div>

                  <div className="h-px bg-white/10" />

                  <div className="space-y-3.5">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <span className="text-[9px] font-mono text-white/40 block uppercase tracking-wider">Client Bill To</span>
                        <span className="text-xs font-bold text-white block">{generatedLR.clientName}</span>
                      </div>
                      <div>
                        <span className="text-[9px] font-mono text-white/40 block uppercase tracking-wider">Created Channel</span>
                        <span className="text-xs font-bold text-white block flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#00ff87]" />
                          {generatedLR.createdVia}
                        </span>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <span className="text-[9px] font-mono text-white/40 block uppercase tracking-wider">Transit Details</span>
                      <div className="p-2.5 rounded bg-white/5 border border-white/5 space-y-1">
                        <div className="flex justify-between text-xs">
                          <span className="text-white/60">From (Consignor):</span>
                          <span className="font-bold text-white text-right max-w-[160px] truncate">{generatedLR.consignor}</span>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span className="text-white/60">To (Consignee):</span>
                          <span className="font-bold text-white text-right max-w-[160px] truncate">{generatedLR.consignee}</span>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <span className="text-[9px] font-mono text-white/40 block uppercase tracking-wider">Allocated Vehicle</span>
                        <span className="text-xs font-bold text-white block">{generatedLR.vehicleType}</span>
                      </div>
                      <div>
                        <span className="text-[9px] font-mono text-white/40 block uppercase tracking-wider">Cargo Parameters</span>
                        <span className="text-xs font-bold text-white block">{generatedLR.weight}</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <span className="text-[9px] font-mono text-white/40 block uppercase tracking-wider">GST Validation</span>
                        <span className="text-xs text-white block">{generatedLR.gstStatus}</span>
                      </div>
                      <div>
                        <span className="text-[9px] font-mono text-white/40 block uppercase tracking-wider">E-Way Bill Status</span>
                        <span className="text-xs text-white block font-mono">{generatedLR.eWayBill}</span>
                      </div>
                    </div>

                    <div className="p-3 bg-[#00ff87]/5 border border-[#00ff87]/15 rounded flex items-center justify-between">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#00ff87]">Standard Freight Value</span>
                      <span className="text-base font-extrabold text-[#00ff87] font-mono">₹{generatedLR.freight.toLocaleString("en-IN")}</span>
                    </div>
                  </div>

                  <div className="pt-2 flex gap-3">
                    <button
                      onClick={() => window.print()}
                      className="flex-1 py-2 rounded bg-white/5 border border-white/10 hover:bg-white/10 text-xs font-bold tracking-wide uppercase transition-colors"
                    >
                      Print Receipt
                    </button>
                    <button
                      onClick={() => setGeneratedLR(null)}
                      className="flex-1 py-2 rounded bg-red-950/20 border border-red-900/30 hover:bg-red-900/20 text-[#ff8787] text-xs font-bold tracking-wide uppercase transition-colors"
                    >
                      Close View
                    </button>
                  </div>

                </div>
              ) : (
                <div className="h-[380px] border border-dashed border-white/10 rounded-xl bg-black/20 flex flex-col items-center justify-center p-6 text-center text-white/30 text-xs">
                  <svg className="w-12 h-12 text-white/10 mb-3 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <span>No Lorry Receipt (LR) generated yet.</span>
                  <span className="text-[10px] text-white/20 mt-1 max-w-[200px]">Create an order manually or click Approve on the AI extraction list.</span>
                </div>
              )}

              {/* Active Orders List */}
              <div className="rounded-xl border border-white/10 bg-black/60 backdrop-blur-2xl p-5 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold tracking-wide">Live Dispatch Queue</h3>
                  <span className="text-[9px] font-mono text-[#00ff87] bg-[#00ff87]/15 px-2 py-0.5 rounded font-bold uppercase animate-pulse">Live</span>
                </div>

                <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
                  {ordersList.map(record => (
                    <div
                      key={record.id}
                      onClick={() => setGeneratedLR(record)}
                      className="p-3 rounded bg-white/2 border border-white/5 hover:border-[#00ff87]/30 hover:bg-white/5 transition-all cursor-pointer flex justify-between items-center"
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-white font-mono">{record.lrNo}</span>
                          <span className="text-[9px] text-white/40 font-mono">({record.createdVia})</span>
                        </div>
                        <span className="text-[10px] text-white/60 block mt-0.5">{record.route}</span>
                      </div>

                      <div className="text-right">
                        <span className="text-xs font-bold text-[#00ff87] block font-mono">₹{record.freight.toLocaleString("en-IN")}</span>
                        <span className="text-[8px] text-white/30 block font-mono">{record.timestamp}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </section>

      </div>
    </main>
  );
}
