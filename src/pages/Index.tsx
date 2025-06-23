
import { useState } from "react";
import { LoginForm } from "@/components/auth/LoginForm";
import { SignupForm } from "@/components/auth/SignupForm";
import { Dashboard } from "@/components/dashboard/Dashboard";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Pill, Shield, Clock, Users } from "lucide-react";

const Index = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState<string | null>(null);

  const handleLogin = (email: string) => {
    setIsAuthenticated(true);
    setCurrentUser(email);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentUser(null);
  };

  if (isAuthenticated) {
    return <Dashboard user={currentUser} onLogout={handleLogout} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <div className="bg-blue-100 p-4 rounded-full">
              <Pill className="h-12 w-12 text-blue-600" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Med Guardian Buddy
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            Never miss your medication again. Smart reminders, tracking, and caregiver support 
            to keep you healthy and on schedule.
          </p>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <Card className="text-center p-6 hover:shadow-lg transition-shadow">
            <CardContent className="pt-4">
              <Clock className="h-8 w-8 text-blue-600 mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Smart Reminders</h3>
              <p className="text-sm text-gray-600">
                Get notified exactly when it's time to take your medication
              </p>
            </CardContent>
          </Card>
          
          <Card className="text-center p-6 hover:shadow-lg transition-shadow">
            <CardContent className="pt-4">
              <Shield className="h-8 w-8 text-green-600 mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Track Adherence</h3>
              <p className="text-sm text-gray-600">
                Monitor your medication compliance with detailed logs
              </p>
            </CardContent>
          </Card>
          
          <Card className="text-center p-6 hover:shadow-lg transition-shadow">
            <CardContent className="pt-4">
              <Users className="h-8 w-8 text-purple-600 mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Caregiver Support</h3>
              <p className="text-sm text-gray-600">
                Allow family members to monitor your medication schedule
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Auth Forms */}
        <div className="max-w-md mx-auto">
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>
            
            <TabsContent value="login">
              <Card>
                <CardContent className="pt-6">
                  <LoginForm onLogin={handleLogin} />
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="signup">
              <Card>
                <CardContent className="pt-6">
                  <SignupForm onSignup={handleLogin} />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Index;
