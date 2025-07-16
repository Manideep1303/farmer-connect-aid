import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { ArrowLeft, KeyRound } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const AdminLogin = () => {
  const [passkey, setPasskey] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = async () => {
    if (passkey !== "12345") {
      toast({
        title: "Invalid Passkey",
        description: "Please enter the correct administrator passkey",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    setTimeout(() => {
      localStorage.setItem("adminLoggedIn", "true");
      toast({
        title: "Login Successful",
        description: "Welcome, Administrator!",
      });
      navigate("/admin-dashboard");
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 field-gradient">
      <div className="w-full max-w-md space-y-6">
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
            <div className="mx-auto w-16 h-16 bg-agricultural-brown rounded-full flex items-center justify-center mb-4">
              <KeyRound className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-2xl text-primary">Administrator Login</CardTitle>
            <CardDescription>
              Enter your administrator passkey to continue
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="passkey">Administrator Passkey</Label>
              <Input
                id="passkey"
                type="password"
                placeholder="Enter passkey"
                value={passkey}
                onChange={(e) => setPasskey(e.target.value)}
                className="text-lg h-12"
                onKeyPress={(e) => e.key === "Enter" && handleLogin()}
              />
            </div>
            
            <Button 
              onClick={handleLogin}
              disabled={isLoading || !passkey}
              className="w-full bg-agricultural-brown hover:bg-agricultural-brown/90 text-white h-12"
            >
              {isLoading ? "Logging in..." : "Login"}
            </Button>

            <p className="text-xs text-muted-foreground text-center mt-4">
              Contact your system administrator if you don't have the passkey.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminLogin;