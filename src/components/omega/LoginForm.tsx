
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

interface LoginFormProps {
  onLogin?: (email: string, password: string) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onLogin }) => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      // Use the login function from auth context
      const success = login(email, password);
      
      if (success) {
        console.log("Login successful with predefined credentials");
        
        if (onLogin) {
          onLogin(email, password);
        } else {
          // Success toast and redirect to the new page
          toast({
            title: "Success",
            description: "Login successful!"
          });
          setTimeout(() => {
            setIsLoading(false);
            navigate("/omega-voice1");
          }, 1000);
        }
      } else {
        // Invalid credentials
        setError("Invalid email or password. Please try again.");
        toast({
          title: "Error",
          description: "Login failed. Invalid credentials.",
          variant: "destructive"
        });
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Login error:", error);
      setError("An unexpected error occurred. Please try again.");
      toast({
        title: "Error",
        description: "Login failed. Please try again.",
        variant: "destructive"
      });
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
