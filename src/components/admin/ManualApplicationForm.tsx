"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2, Search, UserPlus, AlertCircle, CheckCircle } from "lucide-react";

interface User {
  id: string;
  name: string;
  email: string;
  firstName?: string;
  lastName?: string;
  stream?: string;
}

interface ApplicationData {
  stream: string;
  shortAnswer1: string;
  shortAnswer2: string;
  creativeQuestion: string;
  activity: string;
  applicationSubmitted: boolean;
  accepted: boolean;
  resumeConsented: boolean;
  overnightConsented: boolean;
  aiUsed: boolean;
}

export default function ManualApplicationForm() {
  const [email, setEmail] = useState("");
  const [user, setUser] = useState<User | null>(null);
  const [hasApplication, setHasApplication] = useState(false);
  const [existingApplication, setExistingApplication] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [applicationData, setApplicationData] = useState<ApplicationData>({
    stream: "normal",
    shortAnswer1: "Manually created application",
    shortAnswer2: "Manually created application", 
    creativeQuestion: "Manually created application",
    activity: "Manual Entry",
    applicationSubmitted: true,
    accepted: false,
    resumeConsented: true,
    overnightConsented: false,
    aiUsed: false,
  });

  const handleEmailLookup = async () => {
    if (!email.trim()) {
      setError("Please enter an email address");
      return;
    }

    setLoading(true);
    setError("");
    setSuccess("");
    setUser(null);
    setHasApplication(false);
    setExistingApplication(null);
    setShowForm(false);

    try {
      const response = await fetch(
        `/admin/api/applications/manual?email=${encodeURIComponent(email.trim())}`
      );

      if (response.ok) {
        const data = await response.json();
        setUser(data.user);
        setHasApplication(data.hasApplication);
        setExistingApplication(data.application);
        
        if (data.hasApplication) {
          setError("User already has an application");
        } else {
          setShowForm(true);
          // Pre-fill form with user data
          setApplicationData(prev => ({
            ...prev,
            stream: data.user.stream || "normal",
          }));
        }
      } else {
        const errorData = await response.json();
        setError(errorData.error || "Failed to lookup user");
      }
    } catch (err) {
      setError("Network error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleCreateApplication = async () => {
    if (!user) return;

    setCreating(true);
    setError("");
    setSuccess("");

    try {
      const response = await fetch("/admin/api/applications/manual", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: user.email,
          applicationData,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setSuccess("Application created successfully!");
        setShowForm(false);
        setEmail("");
        setUser(null);        setApplicationData({
          stream: "normal",
          shortAnswer1: "Manually created application",
          shortAnswer2: "Manually created application",
          creativeQuestion: "Manually created application", 
          activity: "Manual Entry",
          applicationSubmitted: true,
          accepted: false,
          resumeConsented: true,
          overnightConsented: false,
          aiUsed: false,
        });
      } else {
        const errorData = await response.json();
        setError(errorData.error || "Failed to create application");
      }
    } catch (err) {
      setError("Network error occurred");
    } finally {
      setCreating(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Email Lookup Section */}
      <Card className="bg-[rgba(48,242,242,0.10)] border border-cyan-400/20 shadow-none rounded-none backdrop-blur-[25px]">
        <CardHeader>
          <CardTitle className="text-white text-xl font-normal font-['FH_Lecturis_Rounded'] flex items-center gap-2">
            <Search className="w-5 h-5" />
            User Lookup
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-white">
              Email Address
            </Label>
            <div className="flex gap-2">
              <Input
                id="email"
                type="email"
                placeholder="Enter user's email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 bg-[rgba(48,242,242,0.05)] border border-cyan-400/20 text-white placeholder-white/50"
                onKeyPress={(e) => e.key === "Enter" && handleEmailLookup()}
              />
              <Button
                onClick={handleEmailLookup}
                disabled={loading || !email.trim()}
                className="bg-cyan-500 hover:bg-cyan-600 text-black font-medium"
              >
                {loading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Search className="w-4 h-4" />
                )}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>      {/* Alerts */}
      {error && (
        <div className="p-4 bg-red-500/10 border border-red-500/20 rounded flex items-center gap-2">
          <AlertCircle className="h-4 w-4 text-red-300" />
          <p className="text-red-300">{error}</p>
        </div>
      )}

      {success && (
        <div className="p-4 bg-green-500/10 border border-green-500/20 rounded flex items-center gap-2">
          <CheckCircle className="h-4 w-4 text-green-300" />
          <p className="text-green-300">{success}</p>
        </div>
      )}

      {/* User Information */}
      {user && (
        <Card className="bg-[rgba(48,242,242,0.10)] border border-cyan-400/20 shadow-none rounded-none backdrop-blur-[25px]">
          <CardHeader>
            <CardTitle className="text-white text-xl font-normal font-['FH_Lecturis_Rounded']">
              User Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label className="text-white/80">Name</Label>
                <p className="text-white">{user.name || "Not provided"}</p>
              </div>
              <div>
                <Label className="text-white/80">Email</Label>
                <p className="text-white">{user.email}</p>
              </div>
              <div>
                <Label className="text-white/80">User ID</Label>
                <p className="text-white font-mono text-sm">{user.id}</p>
              </div>
              <div>
                <Label className="text-white/80">Current Stream</Label>
                <p className="text-white">{user.stream || "Not set"}</p>
              </div>
            </div>
            {hasApplication && (
              <div className="mt-4 p-3 bg-yellow-500/10 border border-yellow-500/20 rounded">
                <p className="text-yellow-300 text-sm">
                  ⚠️ This user already has an application
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Application Creation Form */}
      {showForm && user && !hasApplication && (
        <Card className="bg-[rgba(48,242,242,0.10)] border border-cyan-400/20 shadow-none rounded-none backdrop-blur-[25px]">
          <CardHeader>
            <CardTitle className="text-white text-xl font-normal font-['FH_Lecturis_Rounded'] flex items-center gap-2">
              <UserPlus className="w-5 h-5" />
              Create Application
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="stream" className="text-white">
                  Stream
                </Label>
                <Select
                  value={applicationData.stream}
                  onValueChange={(value) =>
                    setApplicationData(prev => ({ ...prev, stream: value }))
                  }
                >
                  <SelectTrigger className="bg-[rgba(48,242,242,0.05)] border border-cyan-400/20 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="normal">Normal</SelectItem>
                    <SelectItem value="beginner">Beginner</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="activity" className="text-white">
                  Activity
                </Label>
                <Input
                  id="activity"
                  placeholder="e.g., Manual Entry, Transfer, etc."
                  value={applicationData.activity}
                  onChange={(e) =>
                    setApplicationData(prev => ({ ...prev, activity: e.target.value }))
                  }
                  className="bg-[rgba(48,242,242,0.05)] border border-cyan-400/20 text-white placeholder-white/50"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="shortAnswer1" className="text-white">
                Short Answer 1
              </Label>
              <Textarea
                id="shortAnswer1"
                placeholder="First application question response"
                value={applicationData.shortAnswer1}
                onChange={(e) =>
                  setApplicationData(prev => ({ ...prev, shortAnswer1: e.target.value }))
                }
                className="bg-[rgba(48,242,242,0.05)] border border-cyan-400/20 text-white placeholder-white/50"
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="shortAnswer2" className="text-white">
                Short Answer 2
              </Label>
              <Textarea
                id="shortAnswer2"
                placeholder="Second application question response"
                value={applicationData.shortAnswer2}
                onChange={(e) =>
                  setApplicationData(prev => ({ ...prev, shortAnswer2: e.target.value }))
                }
                className="bg-[rgba(48,242,242,0.05)] border border-cyan-400/20 text-white placeholder-white/50"
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="creativeQuestion" className="text-white">
                Creative Question
              </Label>
              <Textarea
                id="creativeQuestion"
                placeholder="Creative question response"
                value={applicationData.creativeQuestion}
                onChange={(e) =>
                  setApplicationData(prev => ({ ...prev, creativeQuestion: e.target.value }))
                }
                className="bg-[rgba(48,242,242,0.05)] border border-cyan-400/20 text-white placeholder-white/50"
                rows={3}
              />
            </div>            <div className="space-y-4">
              <Label className="text-white text-lg">Application Status</Label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="submitted"
                    checked={applicationData.applicationSubmitted}                    onCheckedChange={(checked) =>
                      setApplicationData(prev => ({ ...prev, applicationSubmitted: checked === true }))
                    }
                  />
                  <Label htmlFor="submitted" className="text-white">
                    Application Submitted
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="accepted"
                    checked={applicationData.accepted}                    onCheckedChange={(checked) =>
                      setApplicationData(prev => ({ ...prev, accepted: checked === true }))
                    }
                  />
                  <Label htmlFor="accepted" className="text-white">
                    Accepted
                  </Label>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <Label className="text-white text-lg">Consents</Label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="resumeConsented"
                    checked={applicationData.resumeConsented}                    onCheckedChange={(checked) =>
                      setApplicationData(prev => ({ ...prev, resumeConsented: checked === true }))
                    }
                  />
                  <Label htmlFor="resumeConsented" className="text-white">
                    Resume Consented
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="overnightConsented"
                    checked={applicationData.overnightConsented}                    onCheckedChange={(checked) =>
                      setApplicationData(prev => ({ ...prev, overnightConsented: checked === true }))
                    }
                  />
                  <Label htmlFor="overnightConsented" className="text-white">
                    Overnight Consented
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="aiUsed"
                    checked={applicationData.aiUsed}                    onCheckedChange={(checked) =>
                      setApplicationData(prev => ({ ...prev, aiUsed: checked === true }))
                    }
                  />
                  <Label htmlFor="aiUsed" className="text-white">
                    AI Used
                  </Label>
                </div>
              </div>
            </div>

            <div className="flex gap-2 pt-4">              <Button
                onClick={handleCreateApplication}
                disabled={creating}
                className="bg-cyan-500 hover:bg-cyan-600 text-black font-medium"
              >
                {creating ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin mr-2" />
                    Creating...
                  </>
                ) : (
                  <>
                    <UserPlus className="w-4 h-4 mr-2" />
                    Create Application
                  </>
                )}
              </Button>
              <Button
                variant="outline"
                onClick={() => setShowForm(false)}
                className="border-cyan-400/20 text-white hover:bg-cyan-500/10"
              >
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
