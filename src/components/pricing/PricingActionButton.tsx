
import { useState } from "react";
import { ArrowRight } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { ShimmerButton } from "../ui/shimmer-button";
import { PricingService } from "@/services/PricingService";

interface PricingActionButtonProps {
  isLoading: boolean;
  isCurrentPlan: boolean;
  isSubscriptionActive: boolean;
  title: string;
  cta: string;
  subscription?: any;
}

export const PricingActionButton = ({
  isLoading,
  isCurrentPlan,
  isSubscriptionActive,
  title,
  cta,
  subscription
}: PricingActionButtonProps) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();

  const handleSubscription = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsProcessing(true);
    
    try {
      // If user already has an active subscription
      if (isSubscriptionActive && !isCurrentPlan) {
        // This is a plan change
        const { clientSecret } = await PricingService.createOrUpdateSubscription(
          title, 
          true, 
          subscription?.stripe_subscription_id
        );
        
        if (!clientSecret) {
          throw new Error('Failed to create subscription update');
        }

        await PricingService.processPayment(clientSecret);
      } else {
        // Create new subscription
        const { clientSecret } = await PricingService.createOrUpdateSubscription(title);
        
        if (!clientSecret) {
          throw new Error('Failed to create subscription');
        }

        await PricingService.processPayment(clientSecret);
      }
    } catch (error) {
      console.error('Subscription error:', error);
      toast({
        title: "Subscription failed",
        description: error instanceof Error ? error.message : "Something went wrong. Please try again.",
        variant: "destructive"
      });
      setIsProcessing(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center mb-6">
        <div className="animate-pulse h-12 w-full bg-gray-200 rounded-lg"></div>
      </div>
    );
  }

  if (isCurrentPlan && isSubscriptionActive) {
    return (
      <button 
        className="w-full py-3 px-4 mb-6 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg text-sm font-medium shadow-sm" 
        disabled
      >
        Current Plan
      </button>
    );
  }

  return (
    <ShimmerButton 
      className="w-full h-12 text-base mb-6 font-medium"
      onClick={handleSubscription} 
      disabled={isProcessing}
    >
      <span>{isProcessing ? 'Processing...' : cta}</span>
      <ArrowRight className="w-5 h-5 ml-2 text-white/90" />
    </ShimmerButton>
  );
};
