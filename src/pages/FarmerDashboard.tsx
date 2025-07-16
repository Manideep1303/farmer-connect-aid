import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Upload, 
  Video, 
  Mic, 
  Send, 
  LogOut, 
  History,
  Camera,
  MessageSquare,
  Clock,
  VolumeX
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import farmerDashboardImage from "@/assets/farmer-dashboard.jpg";

interface Message {
  id: string;
  type: "question" | "answer";
  content: string;
  mediaType?: "image" | "video" | "audio";
  mediaUrl?: string;
  timestamp: string;
  isPlaying?: boolean;
}

const FarmerDashboard = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);

  const handleLogout = () => {
    localStorage.removeItem("currentFarmer");
    toast({
      title: "Logged out successfully",
      description: "You have been logged out of your farmer account.",
    });
    navigate("/");
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const newMsg: Message = {
          id: Date.now().toString(),
          type: "question",
          content: "I need help with this crop issue",
          mediaType: "image",
          mediaUrl: e.target?.result as string,
          timestamp: new Date().toLocaleString(),
        };
        setMessages(prev => [...prev, newMsg]);
        
        // Simulate admin response
        setTimeout(() => {
          const response: Message = {
            id: (Date.now() + 1).toString(),
            type: "answer",
            content: "Based on your image, this appears to be a nutrient deficiency. I recommend applying a balanced fertilizer and ensuring proper irrigation. Monitor the plants for improvement over the next week.",
            timestamp: new Date().toLocaleString(),
          };
          setMessages(prev => [...prev, response]);
        }, 2000);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleVideoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const newMsg: Message = {
          id: Date.now().toString(),
          type: "question",
          content: "Please review this video of my crop problem",
          mediaType: "video",
          mediaUrl: e.target?.result as string,
          timestamp: new Date().toLocaleString(),
        };
        setMessages(prev => [...prev, newMsg]);
        
        // Simulate admin response
        setTimeout(() => {
          const response: Message = {
            id: (Date.now() + 1).toString(),
            type: "answer",
            content: "From your video, I can see the pest damage on the leaves. Apply an organic neem oil spray in the evening. Repeat every 3-4 days until the pests are controlled.",
            timestamp: new Date().toLocaleString(),
          };
          setMessages(prev => [...prev, response]);
        }, 3000);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleVoiceInput = () => {
    if (isRecording) {
      setIsRecording(false);
      const newMsg: Message = {
        id: Date.now().toString(),
        type: "question",
        content: "Voice message about plant disease symptoms",
        mediaType: "audio",
        timestamp: new Date().toLocaleString(),
      };
      setMessages(prev => [...prev, newMsg]);
      
      // Simulate admin response
      setTimeout(() => {
        const response: Message = {
          id: (Date.now() + 1).toString(),
          type: "answer",
          content: "Based on your voice description of yellowing leaves and wilting, this sounds like overwatering or root rot. Reduce watering frequency and improve drainage around the plants.",
          timestamp: new Date().toLocaleString(),
        };
        setMessages(prev => [...prev, response]);
      }, 2500);
      
      toast({
        title: "Voice message sent",
        description: "Your voice message has been sent to the administrator.",
      });
    } else {
      setIsRecording(true);
      toast({
        title: "Recording started",
        description: "Speak your question clearly. Tap the microphone again to stop.",
      });
    }
  };

  const handleTextMessage = () => {
    if (!newMessage.trim()) return;
    
    const newMsg: Message = {
      id: Date.now().toString(),
      type: "question",
      content: newMessage,
      timestamp: new Date().toLocaleString(),
    };
    setMessages(prev => [...prev, newMsg]);
    setNewMessage("");
    
    // Simulate admin response
    setTimeout(() => {
      const response: Message = {
        id: (Date.now() + 1).toString(),
        type: "answer",
        content: "Thank you for your question. Based on the information provided, I recommend consulting with your local agricultural extension office for specific guidance tailored to your region and crop variety.",
        timestamp: new Date().toLocaleString(),
      };
      setMessages(prev => [...prev, response]);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-primary text-primary-foreground p-4">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Farmer Dashboard</h1>
            <p className="text-primary-foreground/80">Ask questions and get expert solutions</p>
          </div>
          <Button onClick={handleLogout} variant="secondary" size="sm">
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-4 grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Upload Section */}
        <div className="lg:col-span-1 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Upload className="w-5 h-5" />
                Submit Your Question
              </CardTitle>
              <CardDescription>
                Upload images, videos, or record voice messages
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              
              {/* Image Upload */}
              <Button 
                onClick={() => fileInputRef.current?.click()}
                className="w-full agricultural-gradient text-white"
                size="lg"
              >
                <Camera className="w-5 h-5 mr-2" />
                Upload Image
              </Button>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageUpload}
                accept="image/*"
                className="hidden"
              />

              {/* Video Upload */}
              <Button 
                onClick={() => videoInputRef.current?.click()}
                className="w-full bg-agricultural-brown hover:bg-agricultural-brown/90 text-white"
                size="lg"
              >
                <Video className="w-5 h-5 mr-2" />
                Upload Video
              </Button>
              <input
                type="file"
                ref={videoInputRef}
                onChange={handleVideoUpload}
                accept="video/*"
                className="hidden"
              />

              {/* Voice Input */}
              <Button 
                onClick={handleVoiceInput}
                className={`w-full ${isRecording ? 'bg-red-500 hover:bg-red-600' : 'bg-agricultural-gold hover:bg-agricultural-gold/90'} text-white`}
                size="lg"
              >
                <Mic className={`w-5 h-5 mr-2 ${isRecording ? 'animate-pulse' : ''}`} />
                {isRecording ? "Stop Recording" : "Voice Input"}
              </Button>

              <Separator />

              {/* Text Message */}
              <div className="space-y-2">
                <Textarea
                  placeholder="Type your question here..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  className="min-h-[100px]"
                />
                <Button 
                  onClick={handleTextMessage}
                  disabled={!newMessage.trim()}
                  className="w-full"
                >
                  <Send className="w-4 h-4 mr-2" />
                  Send Message
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Dashboard Image */}
          <div className="hidden lg:block">
            <img 
              src={farmerDashboardImage} 
              alt="Farmer dashboard"
              className="w-full h-auto rounded-xl shadow-lg"
            />
          </div>
        </div>

        {/* Messages Section */}
        <div className="lg:col-span-2">
          <Card className="h-[600px] flex flex-col">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5" />
                Conversation History
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-1 overflow-y-auto space-y-4">
              {messages.length === 0 ? (
                <div className="text-center text-muted-foreground py-8">
                  <History className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>No messages yet. Start by uploading an image, video, or asking a question!</p>
                </div>
              ) : (
                messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.type === "question" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[80%] p-4 rounded-lg ${
                        message.type === "question"
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted"
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant={message.type === "question" ? "secondary" : "default"}>
                          {message.type === "question" ? "You" : "Expert"}
                        </Badge>
                        <span className="text-xs opacity-70 flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {message.timestamp}
                        </span>
                      </div>
                      
                      {message.mediaUrl && (
                        <div className="mb-2">
                          {message.mediaType === "image" && (
                            <img 
                              src={message.mediaUrl} 
                              alt="Uploaded" 
                              className="max-w-full h-auto rounded-md"
                            />
                          )}
                          {message.mediaType === "video" && (
                            <video 
                              src={message.mediaUrl} 
                              controls 
                              className="max-w-full h-auto rounded-md"
                            />
                          )}
                          {message.mediaType === "audio" && (
                            <div className="flex items-center gap-2 p-2 bg-white/10 rounded-md">
                              <VolumeX className="w-4 h-4" />
                              <span className="text-sm">Voice Message</span>
                            </div>
                          )}
                        </div>
                      )}
                      
                      <p className="text-sm">{message.content}</p>
                    </div>
                  </div>
                ))
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default FarmerDashboard;