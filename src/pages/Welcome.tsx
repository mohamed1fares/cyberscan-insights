import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Shield, Search, Lock } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const Welcome = () => {
  const [url, setUrl] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!url.trim()) {
      toast({
        title: "URL Required",
        description: "Please enter a company URL to scan.",
        variant: "destructive",
      });
      return;
    }

    // Basic URL validation
    try {
      new URL(url.startsWith('http') ? url : `https://${url}`);
      toast({
        title: "Scan Initiated",
        description: "Starting security analysis...",
      });
      // Simulate scan and navigate to results
      setTimeout(() => {
        navigate("/results");
      }, 1500);
    } catch {
      toast({
        title: "Invalid URL",
        description: "Please enter a valid company URL.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-4xl animate-fade-in">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 mb-6 animate-glow">
            <Shield className="w-10 h-10 text-primary" />
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-cyber-gradient">
            SecureScope
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-2">
            Advanced Vulnerability Detection & Security Analysis
          </p>
          
          <p className="text-foreground/70 max-w-xl mx-auto">
            Scan your web applications for security vulnerabilities, misconfigurations, and potential threats in real-time.
          </p>
        </div>

        <div className="bg-card border border-border rounded-lg p-8 shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="url" className="block text-sm font-medium mb-2 text-foreground">
                Company URL
              </label>
              <div className="relative">
                <Input
                  id="url"
                  type="text"
                  placeholder="example.com or https://example.com"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  className="pl-10 h-12 bg-secondary border-border text-foreground"
                />
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              </div>
            </div>

            <Button 
              type="submit" 
              className="w-full h-12 text-lg font-semibold bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              Start Security Scan
            </Button>
          </form>

          <div className="mt-8 pt-6 border-t border-border">
            <div className="flex items-center justify-center gap-8 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Lock className="w-4 h-4 text-primary" />
                <span>SSL/TLS Analysis</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-primary" />
                <span>OWASP Top 10</span>
              </div>
              <div className="flex items-center gap-2">
                <Search className="w-4 h-4 text-primary" />
                <span>Deep Scan</span>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center mt-6">
          <button
            onClick={() => navigate("/auth")}
            className="text-primary hover:text-primary/80 text-sm font-medium transition-colors"
          >
            Already have an account? Sign in
          </button>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
