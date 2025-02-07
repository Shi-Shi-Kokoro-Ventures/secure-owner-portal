
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Clock, MessageSquare, Paperclip, User, Wrench } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";

const fetchRequestDetails = async (id: string) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Simulate random error for testing
  if (Math.random() < 0.1) {
    throw new Error("Failed to fetch maintenance request details");
  }
  
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

  const { data: request, isLoading, error, isError } = useQuery({
    queryKey: ['maintenanceRequest', id],
    queryFn: () => fetchRequestDetails(id || ''),
    enabled: !!id,
    retry: 2,
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to load maintenance request details. Please try again later.",
        variant: "destructive",
      });
    },
  });

  const handleAddComment = () => {
    if (!comment.trim()) {
      toast({
        title: "Error",
        description: "Please enter a comment before submitting.",
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: "Comment Added",
      description: "Your comment has been added to the maintenance request.",
    });
    setComment("");
  };

  if (isLoading) {
    return (
      <div className="container mx-auto py-6 space-y-6">
        <div className="flex items-center justify-between">
          <Skeleton className="h-10 w-32" />
          <Skeleton className="h-6 w-24" />
        </div>
        <Card>
          <CardHeader>
            <Skeleton className="h-8 w-64 mb-4" />
            <div className="flex items-center gap-4">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-4 w-24" />
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <Skeleton className="h-20 w-full" />
            <div className="border rounded-lg p-4">
              <Skeleton className="h-4 w-32 mb-4" />
              <Skeleton className="h-4 w-48" />
            </div>
            <div className="space-y-4">
              <Skeleton className="h-6 w-32 mb-4" />
              <Card>
                <CardContent className="pt-4">
                  <div className="flex items-start gap-4">
                    <Skeleton className="h-8 w-8 rounded-full" />
                    <div className="flex-1">
                      <Skeleton className="h-4 w-32 mb-2" />
                      <Skeleton className="h-4 w-full" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="container mx-auto py-6">
        <Alert variant="destructive" className="mb-4">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            Failed to load maintenance request details. Please try again later.
          </AlertDescription>
        </Alert>
        <Button
          variant="outline"
          onClick={() => navigate("/tenant/maintenance")}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
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
          className="flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Maintenance Requests
        </Button>
        <Badge variant="outline" className="capitalize">
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
              <Button onClick={handleAddComment} className="flex items-center gap-2">
                <MessageSquare className="h-4 w-4" />
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
