import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Phone } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import farmerLoginImage from "@/assets/farmer-login.jpg";

const FarmerLogin = () => {
  const [mobileNumber, setMobileNumber] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSendOTP = async () => {
    if (!mobileNumber || mobileNumber.length !== 10) {
      toast({
        title: "Invalid Mobile Number",
        description: "Please enter a valid 10-digit mobile number",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    // Check if user already exists
    const existingUsers = JSON.parse(localStorage.getItem("farmers") || "[]");
    const userExists = existingUsers.find((user: any) => user.mobile === mobileNumber);
    
    if (userExists) {
      toast({
        title: "User Already Exists",
        description: "A user with this mobile number already exists. Please login.",
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }

    // Simulate OTP generation and sending
    setTimeout(() => {
      const otp = Math.floor(100000 + Math.random() * 900000).toString();
      localStorage.setItem("currentOTP", otp);
      localStorage.setItem("currentMobile", mobileNumber);
      
      toast({
        title: "OTP Sent Successfully",
        description: `OTP sent to ${mobileNumber}. For demo: ${otp}`,
      });
      
      setIsLoading(false);
      navigate("/otp-verification");
    }, 2000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 field-gradient">
      <div className="w-full max-w-4xl grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        
        {/* Image Section */}
        <div className="hidden lg:block">
          <img 
            src={farmerLoginImage} 
            alt="Farmer login interface"
            className="w-full h-auto rounded-xl shadow-2xl"
          />
        </div>

        {/* Login Form Section */}
        <div className="space-y-6">
          <Button
            variant="ghost"
            onClick={() => navigate("/")}
            className="mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>

          <Card className="shadow-xl">
            <CardHeader className="text-center">
              <div className="mx-auto w-16 h-16 agricultural-gradient rounded-full flex items-center justify-center mb-4">
                <Phone className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-2xl text-primary">Farmer Login</CardTitle>
              <CardDescription>
                Enter your mobile number to receive an OTP
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="mobile">Mobile Number</Label>
                <Input
                  id="mobile"
                  type="tel"
                  placeholder="Enter 10-digit mobile number"
                  value={mobileNumber}
                  onChange={(e) => setMobileNumber(e.target.value.replace(/\D/g, "").slice(0, 10))}
                  className="text-lg h-12"
                />
              </div>
              
              <Button 
                onClick={handleSendOTP}
                disabled={isLoading || mobileNumber.length !== 10}
                className="w-full agricultural-gradient text-white h-12"
              >
                {isLoading ? "Sending OTP..." : "Send OTP"}
              </Button>

              <p className="text-sm text-muted-foreground text-center mt-4">
                New user? An account will be created automatically after OTP verification.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default FarmerLogin;