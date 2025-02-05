import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Clock, MessageSquare, Paperclip, User, Wrench } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useQuery } from "@tanstack/react-query";

// Mock data - replace with actual API call
const fetchRequestDetails = async (id: string) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  return {
    id,
    title: "Leaking Faucet",
    description: "The kitchen faucet has been leaking consistently for the past few days.",
    status: "In Progress",
    category: "Plumbing",
    dateSubmitted: "2024-02-04",
    lastUpdated: "2024-02-05",
    attachments: [
      { name: "faucet-leak.jpg", url: "#" }
    ],
    updates: [
      {
        id: 1,
        date: "2024-02-05",
        message: "Maintenance team has been notified and will schedule a visit.",
        author: "Property Manager"
      }
    ]
  };
};

const MaintenanceRequestDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [comment, setComment] = useState("");

  const { data: request, isLoading, error } = useQuery({
    queryKey: ['maintenanceRequest', id],
    queryFn: () => fetchRequestDetails(id || ''),
    enabled: !!id,
  });

  const handleAddComment = () => {
    if (!comment.trim()) return;
    
    toast({
      title: "Comment Added",
      description: "Your comment has been added to the maintenance request.",
    });
    setComment("");
  };

  if (isLoading) {
    return (
      <div className="container mx-auto py-6">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/3"></div>
          <div className="h-48 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto py-6">
        <Alert variant="destructive">
          <AlertDescription>
            Failed to load maintenance request details. Please try again later.
          </AlertDescription>
        </Alert>
        <Button
          variant="outline"
          className="mt-4"
          onClick={() => navigate("/tenant/maintenance")}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Maintenance Requests
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          onClick={() => navigate("/tenant/maintenance")}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Maintenance Requests
        </Button>
        <Badge
          className={`
            ${request?.status === 'Open' ? 'bg-yellow-100 text-yellow-800' : ''}
            ${request?.status === 'In Progress' ? 'bg-blue-100 text-blue-800' : ''}
            ${request?.status === 'Completed' ? 'bg-green-100 text-green-800' : ''}
          `}
        >
          {request?.status}
        </Badge>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{request?.title}</CardTitle>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              Submitted: {request?.dateSubmitted}
            </span>
            <span className="flex items-center gap-1">
              <Wrench className="h-4 w-4" />
              {request?.category}
            </span>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>{request?.description}</p>
          
          {request?.attachments && request.attachments.length > 0 && (
            <div className="border rounded-lg p-4">
              <h3 className="text-sm font-medium mb-2 flex items-center gap-2">
                <Paperclip className="h-4 w-4" />
                Attachments
              </h3>
              <ul className="space-y-2">
                {request.attachments.map((attachment, index) => (
                  <li key={index}>
                    <a
                      href={attachment.url}
                      className="text-sm text-primary hover:underline flex items-center gap-2"
                    >
                      {attachment.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="space-y-4 mt-6">
            <h3 className="text-lg font-medium">Updates</h3>
            {request?.updates.map((update) => (
              <Card key={update.id}>
                <CardContent className="pt-4">
                  <div className="flex items-start gap-4">
                    <User className="h-8 w-8 text-muted-foreground" />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{update.author}</span>
                        <span className="text-sm text-muted-foreground">{update.date}</span>
                      </div>
                      <p className="mt-1 text-sm">{update.message}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-6">
            <h3 className="text-lg font-medium mb-4">Add Comment</h3>
            <div className="space-y-4">
              <Textarea
                placeholder="Type your comment here..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
              <Button onClick={handleAddComment}>
                <MessageSquare className="h-4 w-4 mr-2" />
                Add Comment
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MaintenanceRequestDetail;