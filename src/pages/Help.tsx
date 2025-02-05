import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { HelpCircle, Book, Phone, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const Help = () => {
  return (
    <div className="container mx-auto px-4">
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight">Help Center</h1>
        <p className="text-muted-foreground">
          Find answers to common questions and get support
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Frequently Asked Questions</CardTitle>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible>
              <AccordionItem value="item-1">
                <AccordionTrigger>How do I submit a maintenance request?</AccordionTrigger>
                <AccordionContent>
                  Navigate to the Maintenance section and click on "New Request". Fill out the form with details about the issue, and attach any relevant photos or documents.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>How do I make a payment?</AccordionTrigger>
                <AccordionContent>
                  Go to the Payments section and click "Make Payment". You can pay using a credit card, debit card, or bank account. All payments are processed securely through Square.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>Where can I find my documents?</AccordionTrigger>
                <AccordionContent>
                  All your important documents can be found in the Documents section. This includes leases, notices, and other important paperwork.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Contact Support</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-4 border rounded-lg">
                <Phone className="h-5 w-5 text-primary" />
                <div>
                  <p className="font-medium">Phone Support</p>
                  <p className="text-sm text-muted-foreground">
                    Call us at (555) 123-4567
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Available Mon-Fri, 9am-5pm
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 border rounded-lg">
                <Mail className="h-5 w-5 text-primary" />
                <div>
                  <p className="font-medium">Email Support</p>
                  <p className="text-sm text-muted-foreground">
                    support@example.com
                  </p>
                  <p className="text-xs text-muted-foreground">
                    We typically respond within 24 hours
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 border rounded-lg">
                <Book className="h-5 w-5 text-primary" />
                <div>
                  <p className="font-medium">Knowledge Base</p>
                  <p className="text-sm text-muted-foreground">
                    Browse our detailed guides and tutorials
                  </p>
                </div>
                <Button className="ml-auto" variant="outline">
                  View Guides
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Help;