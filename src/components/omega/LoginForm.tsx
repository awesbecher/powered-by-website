
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

interface LoginFormProps {
  onLogin?: (email: string, password: string) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      // Specific credential validation
      if (email === "info@omegapediatrics.com" && password === "Nwaneri32625") {
        console.log("Login successful with predefined credentials");
        
        if (onLogin) {
          onLogin(email, password);
        } else {
          // Success toast and redirect can go here
          setTimeout(() => {
            toast.success("Login successful!");
            setIsLoading(false);
            
            // Redirect to target site or dashboard could be added here
            // window.location.href = "https://target-site.com";
          }, 1000);
        }
      } else {
        // Invalid credentials
        setError("Invalid email or password. Please try again.");
        toast.error("Login failed. Invalid credentials.");
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Login error:", error);
      setError("An unexpected error occurred. Please try again.");
      toast.error("Login failed. Please try again.");
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white/10 backdrop-blur-md rounded-lg shadow-lg p-8 border border-purple-500/20">
      <h2 className="text-2xl font-bold text-center text-white mb-6">Voice Agent Login</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="email" className="text-white">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="your.email@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="bg-white/20 border-purple-300/50 text-white placeholder:text-gray-300"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="password" className="text-white">Password</Label>
          <Input
            id="password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="bg-white/20 border-purple-300/50 text-white placeholder:text-gray-300"
          />
        </div>
        
        {error && (
          <div className="text-red-300 text-sm">{error}</div>
        )}
        
        <Button 
          type="submit" 
          className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
          disabled={isLoading}
        >
          {isLoading ? "Logging in..." : "Log in"}
        </Button>
      </form>
    </div>
  );
};

export default LoginForm;
