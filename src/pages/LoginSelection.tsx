import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Wheat, Users } from "lucide-react";
import loginSelectionImage from "@/assets/login-selection.jpg";

const LoginSelection = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center p-4 field-gradient">
      <div className="w-full max-w-4xl grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        
        {/* Image Section */}
        <div className="hidden lg:block">
          <img 
            src={loginSelectionImage} 
            alt="Agricultural app interface"
            className="w-full h-auto rounded-xl shadow-2xl"
          />
        </div>

        {/* Login Options Section */}
        <div className="space-y-6">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold text-primary">AgriConnect</h1>
            <p className="text-lg text-muted-foreground">
              Connecting farmers with agricultural experts
            </p>
          </div>

          <div className="space-y-4">
            <Card className="hover:shadow-lg transition-shadow agricultural-gradient border-0">
              <CardHeader className="text-center">
                <div className="mx-auto w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mb-4">
                  <Wheat className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-white text-xl">Login as Farmer</CardTitle>
                <CardDescription className="text-white/80">
                  Upload your agricultural issues and get expert solutions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button 
                  onClick={() => navigate("/farmer-login")}
                  className="w-full bg-white text-agricultural-green hover:bg-white/90"
                  size="lg"
                >
                  Continue as Farmer
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow bg-agricultural-brown border-0">
              <CardHeader className="text-center">
                <div className="mx-auto w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mb-4">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-white text-xl">Login as Administrator</CardTitle>
                <CardDescription className="text-white/80">
                  Provide solutions and guidance to farmers
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button 
                  onClick={() => navigate("/admin-login")}
                  className="w-full bg-white text-agricultural-brown hover:bg-white/90"
                  size="lg"
                >
                  Continue as Administrator
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginSelection;