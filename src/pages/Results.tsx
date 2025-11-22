import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Shield, AlertTriangle, XCircle, Download, ChevronRight, ArrowLeft } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import VulnerabilityCard from "@/components/VulnerabilityCard";

const mockVulnerabilities = [
  {
    id: 1,
    name: "SQL Injection",
    severity: "critical",
    description: "Potential SQL injection vulnerability detected in user input fields. Attackers could manipulate database queries.",
    details: "Found in login form and search functionality. Immediate remediation required.",
    cve: "CWE-89",
  },
  {
    id: 2,
    name: "Cross-Site Scripting (XSS)",
    severity: "high",
    description: "Reflected XSS vulnerability allows injection of malicious scripts into web pages viewed by other users.",
    details: "Detected in comment sections and user profile fields. Implement proper input sanitization.",
    cve: "CWE-79",
  },
  {
    id: 3,
    name: "Weak SSL/TLS Configuration",
    severity: "medium",
    description: "Server supports outdated TLS 1.0 protocol, making it vulnerable to POODLE and BEAST attacks.",
    details: "Update server configuration to support only TLS 1.2 and above.",
    cve: "CWE-326",
  },
  {
    id: 4,
    name: "Missing Security Headers",
    severity: "medium",
    description: "Critical security headers are not configured, including X-Frame-Options and Content-Security-Policy.",
    details: "This leaves the application vulnerable to clickjacking and XSS attacks.",
    cve: "CWE-693",
  },
  {
    id: 5,
    name: "Insecure Direct Object Reference",
    severity: "high",
    description: "Application exposes direct references to internal objects without proper authorization checks.",
    details: "Users can access unauthorized data by manipulating URL parameters.",
    cve: "CWE-639",
  },
  {
    id: 6,
    name: "Broken Authentication",
    severity: "critical",
    description: "Weak session management allows session hijacking and credential stuffing attacks.",
    details: "Implement stronger session tokens and add rate limiting.",
    cve: "CWE-287",
  },
];

const Results = () => {
  const navigate = useNavigate();
  const [selectedVuln, setSelectedVuln] = useState<typeof mockVulnerabilities[0] | null>(null);

  const handleDownloadReport = () => {
    toast({
      title: "Generating Report",
      description: "Your comprehensive PDF report is being prepared...",
    });
    
    setTimeout(() => {
      toast({
        title: "Report Ready",
        description: "Vulnerability report downloaded successfully.",
      });
    }, 2000);
  };

  const criticalCount = mockVulnerabilities.filter(v => v.severity === "critical").length;
  const highCount = mockVulnerabilities.filter(v => v.severity === "high").length;
  const mediumCount = mockVulnerabilities.filter(v => v.severity === "medium").length;

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Shield className="w-6 h-6 text-primary" />
            <h1 className="text-xl font-bold bg-clip-text text-transparent bg-cyber-gradient">
              SecureScope
            </h1>
          </div>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => navigate("/")}
            className="border-border hover:bg-secondary"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            New Scan
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8 animate-fade-in">
          <h2 className="text-3xl font-bold mb-2 text-foreground">Security Scan Results</h2>
          <p className="text-muted-foreground">Comprehensive vulnerability assessment completed</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 animate-slide-up">
          <div className="bg-card border border-border rounded-lg p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-muted-foreground">Critical</span>
              <XCircle className="w-5 h-5 text-danger" />
            </div>
            <p className="text-3xl font-bold text-danger">{criticalCount}</p>
          </div>

          <div className="bg-card border border-border rounded-lg p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-muted-foreground">High</span>
              <AlertTriangle className="w-5 h-5 text-warning" />
            </div>
            <p className="text-3xl font-bold text-warning">{highCount}</p>
          </div>

          <div className="bg-card border border-border rounded-lg p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-muted-foreground">Medium</span>
              <AlertTriangle className="w-5 h-5 text-primary" />
            </div>
            <p className="text-3xl font-bold text-primary">{mediumCount}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {mockVulnerabilities.map((vuln, index) => (
            <div
              key={vuln.id}
              className="animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <VulnerabilityCard
                vulnerability={vuln}
                onViewDetails={() => setSelectedVuln(vuln)}
              />
            </div>
          ))}
        </div>

        <div className="flex justify-center animate-fade-in">
          <Button
            size="lg"
            onClick={handleDownloadReport}
            className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
          >
            <Download className="w-5 h-5 mr-2" />
            Download Full PDF Report
          </Button>
        </div>
      </main>

      {selectedVuln && (
        <div 
          className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50 animate-fade-in"
          onClick={() => setSelectedVuln(null)}
        >
          <div 
            className="bg-card border border-border rounded-lg p-8 max-w-2xl w-full max-h-[80vh] overflow-y-auto animate-slide-up"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-2xl font-bold text-foreground mb-2">{selectedVuln.name}</h3>
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                  selectedVuln.severity === "critical" 
                    ? "bg-danger/20 text-danger" 
                    : selectedVuln.severity === "high"
                    ? "bg-warning/20 text-warning"
                    : "bg-primary/20 text-primary"
                }`}>
                  {selectedVuln.severity.toUpperCase()}
                </span>
              </div>
              <button
                onClick={() => setSelectedVuln(null)}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <XCircle className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-foreground mb-2">Description</h4>
                <p className="text-muted-foreground">{selectedVuln.description}</p>
              </div>

              <div>
                <h4 className="font-semibold text-foreground mb-2">Details</h4>
                <p className="text-muted-foreground">{selectedVuln.details}</p>
              </div>

              <div>
                <h4 className="font-semibold text-foreground mb-2">CVE Reference</h4>
                <p className="text-primary font-mono">{selectedVuln.cve}</p>
              </div>

              <Button 
                className="w-full mt-4 bg-primary hover:bg-primary/90 text-primary-foreground"
                onClick={() => setSelectedVuln(null)}
              >
                Close
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Results;
