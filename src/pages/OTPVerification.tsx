import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Shield, Timer } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import otpVerificationImage from "@/assets/otp-verification.jpg";

const OTPVerification = () => {
  const [otp, setOTP] = useState(["", "", "", "", "", ""]);
  const [timer, setTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const countdown = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          setCanResend(true);
          clearInterval(countdown);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(countdown);
  }, []);

  const handleOTPChange = (value: string, index: number) => {
    if (value.length > 1) return;
    
    const newOTP = [...otp];
    newOTP[index] = value;
    setOTP(newOTP);

    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleVerifyOTP = async () => {
    const enteredOTP = otp.join("");
    const correctOTP = localStorage.getItem("currentOTP");
    const mobileNumber = localStorage.getItem("currentMobile");

    if (enteredOTP.length !== 6) {
      toast({
        title: "Invalid OTP",
        description: "Please enter the complete 6-digit OTP",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      if (enteredOTP === correctOTP) {
        // Create new farmer account
        const farmers = JSON.parse(localStorage.getItem("farmers") || "[]");
        const newFarmer = {
          id: Date.now().toString(),
          mobile: mobileNumber,
          joinedAt: new Date().toISOString(),
          conversations: []
        };
        farmers.push(newFarmer);
        localStorage.setItem("farmers", JSON.stringify(farmers));
        localStorage.setItem("currentFarmer", JSON.stringify(newFarmer));
        
        // Clear OTP data
        localStorage.removeItem("currentOTP");
        localStorage.removeItem("currentMobile");
        
        toast({
          title: "Account Created Successfully",
          description: "Welcome to AgriConnect!",
        });
        
        navigate("/farmer-dashboard");
      } else {
        toast({
          title: "Invalid OTP",
          description: "The OTP you entered is incorrect. Please try again.",
          variant: "destructive",
        });
      }
      setIsLoading(false);
    }, 1500);
  };

  const handleResendOTP = () => {
    const newOTP = Math.floor(100000 + Math.random() * 900000).toString();
    localStorage.setItem("currentOTP", newOTP);
    
    toast({
      title: "OTP Resent",
      description: `New OTP sent. For demo: ${newOTP}`,
    });
    
    setTimer(30);
    setCanResend(false);
    setOTP(["", "", "", "", "", ""]);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 field-gradient">
      <div className="w-full max-w-4xl grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        
        {/* Image Section */}
        <div className="hidden lg:block">
          <img 
            src={otpVerificationImage} 
            alt="OTP verification interface"
            className="w-full h-auto rounded-xl shadow-2xl"
          />
        </div>

        {/* OTP Form Section */}
        <div className="space-y-6">
          <Button
            variant="ghost"
            onClick={() => navigate("/farmer-login")}
            className="mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>

          <Card className="shadow-xl">
            <CardHeader className="text-center">
              <div className="mx-auto w-16 h-16 agricultural-gradient rounded-full flex items-center justify-center mb-4">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-2xl text-primary">Verify OTP</CardTitle>
              <CardDescription>
                Enter the 6-digit OTP sent to your mobile number
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex justify-center space-x-2">
                {otp.map((digit, index) => (
                  <Input
                    key={index}
                    id={`otp-${index}`}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOTPChange(e.target.value, index)}
                    className="w-12 h-12 text-center text-lg font-semibold"
                  />
                ))}
              </div>

              <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground">
                <Timer className="w-4 h-4" />
                <span>{timer > 0 ? `${timer} seconds remaining` : "OTP expired"}</span>
              </div>

              <Button 
                onClick={handleVerifyOTP}
                disabled={isLoading || otp.some(digit => !digit)}
                className="w-full agricultural-gradient text-white h-12"
              >
                {isLoading ? "Verifying..." : "Verify OTP"}
              </Button>

              <Button 
                onClick={handleResendOTP}
                disabled={!canResend}
                variant="outline"
                className="w-full"
              >
                {canResend ? "Resend OTP" : `Resend in ${timer}s`}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default OTPVerification;