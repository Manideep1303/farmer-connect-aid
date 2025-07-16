import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Users, 
  LogOut, 
  MessageSquare, 
  Send, 
  Clock,
  Camera,
  Video,
  VolumeX,
  AlertCircle
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import adminDashboardImage from "@/assets/admin-dashboard.jpg";

interface FarmerRequest {
  id: string;
  farmerId: string;
  farmerMobile: string;
  content: string;
  mediaType?: "image" | "video" | "audio";
  mediaUrl?: string;
  timestamp: string;
  responded: boolean;
  response?: string;
  responseTimestamp?: string;
}

const AdminDashboard = () => {
  const [requests, setRequests] = useState<FarmerRequest[]>([]);
  const [selectedRequest, setSelectedRequest] = useState<FarmerRequest | null>(null);
  const [response, setResponse] = useState("");
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Load sample farmer requests
    const sampleRequests: FarmerRequest[] = [
      {
        id: "1",
        farmerId: "farmer1",
        farmerMobile: "9876543210",
        content: "My tomato plants are showing yellow spots on leaves. What could be the cause?",
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toLocaleString(),
        responded: false,
      },
      {
        id: "2",
        farmerId: "farmer2",
        farmerMobile: "9876543211",
        content: "Need help with pest control for my wheat crop",
        mediaType: "image",
        mediaUrl: "/api/placeholder/300/200",
        timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000).toLocaleString(),
        responded: true,
        response: "Based on your image, I recommend using neem oil spray. Apply in the evening for best results.",
        responseTimestamp: new Date(Date.now() - 3 * 60 * 60 * 1000).toLocaleString(),
      },
      {
        id: "3",
        farmerId: "farmer3",
        farmerMobile: "9876543212",
        content: "Voice message about crop irrigation issues",
        mediaType: "audio",
        timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000).toLocaleString(),
        responded: false,
      },
    ];
    setRequests(sampleRequests);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("adminLoggedIn");
    toast({
      title: "Logged out successfully",
      description: "You have been logged out of your administrator account.",
    });
    navigate("/");
  };

  const handleSendResponse = () => {
    if (!selectedRequest || !response.trim()) return;

    const updatedRequests = requests.map(req =>
      req.id === selectedRequest.id
        ? {
            ...req,
            responded: true,
            response: response,
            responseTimestamp: new Date().toLocaleString(),
          }
        : req
    );

    setRequests(updatedRequests);
    setSelectedRequest({
      ...selectedRequest,
      responded: true,
      response: response,
      responseTimestamp: new Date().toLocaleString(),
    });
    setResponse("");

    toast({
      title: "Response sent successfully",
      description: "Your response has been sent to the farmer.",
    });
  };

  const getMediaIcon = (mediaType?: string) => {
    switch (mediaType) {
      case "image":
        return <Camera className="w-4 h-4" />;
      case "video":
        return <Video className="w-4 h-4" />;
      case "audio":
        return <VolumeX className="w-4 h-4" />;
      default:
        return <MessageSquare className="w-4 h-4" />;
    }
  };

  const pendingRequests = requests.filter(req => !req.responded);
  const respondedRequests = requests.filter(req => req.responded);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-agricultural-brown text-white p-4">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Administrator Dashboard</h1>
            <p className="text-white/80">Manage farmer requests and provide solutions</p>
          </div>
          <Button onClick={handleLogout} variant="secondary" size="sm">
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-4 grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Requests List */}
        <div className="lg:col-span-1 space-y-4">
          
          {/* Stats Cards */}
          <div className="grid grid-cols-2 gap-4">
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-red-500">{pendingRequests.length}</div>
                <div className="text-sm text-muted-foreground">Pending</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-green-500">{respondedRequests.length}</div>
                <div className="text-sm text-muted-foreground">Resolved</div>
              </CardContent>
            </Card>
          </div>

          {/* Pending Requests */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-red-600">
                <AlertCircle className="w-5 h-5" />
                Pending Requests ({pendingRequests.length})
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 max-h-[400px] overflow-y-auto">
              {pendingRequests.map((request) => (
                <div
                  key={request.id}
                  onClick={() => setSelectedRequest(request)}
                  className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                    selectedRequest?.id === request.id
                      ? "border-primary bg-primary/5"
                      : "border-border hover:bg-muted/50"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="outline" className="text-xs">
                      {request.farmerMobile}
                    </Badge>
                    <div className="flex items-center gap-1">
                      {getMediaIcon(request.mediaType)}
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mb-1 line-clamp-2">
                    {request.content}
                  </p>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="w-3 h-3" />
                    {request.timestamp}
                  </div>
                </div>
              ))}
              {pendingRequests.length === 0 && (
                <div className="text-center text-muted-foreground py-4">
                  <Users className="w-8 h-8 mx-auto mb-2 opacity-50" />
                  <p className="text-sm">No pending requests</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Dashboard Image */}
          <div className="hidden lg:block">
            <img 
              src={adminDashboardImage} 
              alt="Admin dashboard"
              className="w-full h-auto rounded-xl shadow-lg"
            />
          </div>
        </div>

        {/* Selected Request Details */}
        <div className="lg:col-span-2">
          {selectedRequest ? (
            <Card className="h-[600px] flex flex-col">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Request Details</CardTitle>
                  <Badge variant={selectedRequest.responded ? "default" : "destructive"}>
                    {selectedRequest.responded ? "Resolved" : "Pending"}
                  </Badge>
                </div>
                <CardDescription>
                  From: {selectedRequest.farmerMobile} • {selectedRequest.timestamp}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col space-y-4">
                
                {/* Request Content */}
                <div className="bg-muted p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="secondary">Farmer Question</Badge>
                    {selectedRequest.mediaType && (
                      <Badge variant="outline" className="text-xs">
                        {getMediaIcon(selectedRequest.mediaType)}
                        <span className="ml-1">{selectedRequest.mediaType}</span>
                      </Badge>
                    )}
                  </div>
                  
                  {selectedRequest.mediaUrl && (
                    <div className="mb-3">
                      {selectedRequest.mediaType === "image" && (
                        <img 
                          src={selectedRequest.mediaUrl} 
                          alt="Farmer upload" 
                          className="max-w-full h-auto rounded-md"
                        />
                      )}
                      {selectedRequest.mediaType === "video" && (
                        <video 
                          src={selectedRequest.mediaUrl} 
                          controls 
                          className="max-w-full h-auto rounded-md"
                        />
                      )}
                      {selectedRequest.mediaType === "audio" && (
                        <div className="flex items-center gap-2 p-3 bg-white/50 rounded-md">
                          <VolumeX className="w-5 h-5" />
                          <span>Voice Message</span>
                        </div>
                      )}
                    </div>
                  )}
                  
                  <p>{selectedRequest.content}</p>
                </div>

                {/* Existing Response */}
                {selectedRequest.responded && selectedRequest.response && (
                  <div className="bg-primary/10 p-4 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge>Your Response</Badge>
                      <span className="text-xs text-muted-foreground">
                        {selectedRequest.responseTimestamp}
                      </span>
                    </div>
                    <p>{selectedRequest.response}</p>
                  </div>
                )}

                {/* Response Form */}
                {!selectedRequest.responded && (
                  <div className="flex-1 flex flex-col space-y-3">
                    <Separator />
                    <div className="flex-1">
                      <Textarea
                        placeholder="Type your response here..."
                        value={response}
                        onChange={(e) => setResponse(e.target.value)}
                        className="h-full min-h-[150px] resize-none"
                      />
                    </div>
                    <Button 
                      onClick={handleSendResponse}
                      disabled={!response.trim()}
                      className="agricultural-gradient text-white"
                    >
                      <Send className="w-4 h-4 mr-2" />
                      Send Response
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          ) : (
            <Card className="h-[600px] flex items-center justify-center">
              <div className="text-center text-muted-foreground">
                <MessageSquare className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <h3 className="text-lg font-medium mb-2">Select a Request</h3>
                <p>Choose a farmer request from the list to view details and respond</p>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
