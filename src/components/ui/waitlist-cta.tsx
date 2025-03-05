
"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { ArrowRight, Loader2, Mail, Check } from "lucide-react";
import { toast } from "sonner";
import { useIsMobile } from "@/hooks/use-mobile";

export function WaitlistCTA({ className }: { className?: string }) {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const isMobile = useIsMobile();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      toast.error("Please enter a valid email address");
      inputRef.current?.focus();
      return;
    }

    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setEmail("");
      toast.success("Thanks for joining our waitlist!");
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={cn(
      "w-full max-w-xl mx-auto px-5 sm:px-0",
      className
    )}>
      <form onSubmit={handleSubmit} className={cn(
        "flex w-full",
        isMobile ? "flex-col space-y-4" : "flex-row items-center justify-center gap-3"
      )}>
        <div className={cn(
          "relative",
          isMobile ? "w-full" : "w-[320px]"
        )}>
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            <Mail size={18} />
          </div>
          <Input
            ref={inputRef}
            type="email"
            placeholder="Enter your email"
            className={cn(
              "border",
              isMobile ? [
                "h-[50px]", 
                "bg-white", 
                "border-gray-100",
                "pl-10 pr-4 py-3",
                "text-base",
                "placeholder:text-gray-400",
                "rounded-lg",
                "w-full",
                "shadow-sm"
              ] : [
                "h-11 border-gray-200 bg-white", 
                "focus:ring-2 focus:ring-primary/50 focus:border-transparent",
                "pl-10 pr-4 py-2",
                "text-base placeholder:text-gray-400",
                "rounded-lg shadow-sm"
              ]
            )}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            aria-label="Email address"
            required
            disabled={isLoading}
          />
        </div>
        
        <Button 
          type="submit" 
          className={cn(
            "flex items-center justify-center",
            "whitespace-nowrap",
            "shadow-lg hover:shadow-xl transition-all",
            isMobile ? [
              "w-full", 
              "rounded-lg", 
              "h-[50px]",
              "bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600",
              "text-white",
              "font-medium",
              "px-6"
            ] : [
              "h-11",
              "rounded-lg w-[180px] px-5",
              "bg-gradient-to-r from-purple-600 to-indigo-600", 
              "hover:from-purple-700 hover:to-indigo-700",
              "text-white font-medium"
            ]
          )}
          style={{ gap: '6px' }}
          disabled={isLoading}
        >
          {isLoading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <>
              <span className={cn(
                "flex-shrink-0",
                "leading-none",
                isMobile ? "text-base" : "text-sm"
              )}>
                Join Waitlist
              </span>
              <ArrowRight className="h-4 w-4 flex-shrink-0 inline-block" />
            </>
          )}
        </Button>
      </form>
      
      <div className="flex items-center justify-center mt-5">
        <div className="flex -space-x-2 mr-3 items-center">
          <div className="w-7 h-7 rounded-full bg-gray-900 flex items-center justify-center text-[7px] text-white font-bold border-2 border-white shadow-sm">JT</div>
          <div className="w-7 h-7 rounded-full bg-gray-900 flex items-center justify-center text-[7px] text-white font-bold border-2 border-white shadow-sm">MI</div>
          {!isMobile && (
            <div className="w-7 h-7 rounded-full bg-gray-900 flex items-center justify-center text-[7px] text-white font-bold border-2 border-white shadow-sm">AS</div>
          )}
        </div>
        
        <div className="text-xs text-gray-600 flex items-center whitespace-nowrap">
          <span className="font-semibold">2,165+ people joined</span>
          <span className="mx-2">•</span>
          <span>Queue: {isMobile ? "1-2 days" : "2-3 weeks"}</span>
        </div>
      </div>
    </div>
  );
}
