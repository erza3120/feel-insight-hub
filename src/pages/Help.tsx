import { DashboardLayout } from "@/components/Layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { MessageCircle, Book, Mail, ExternalLink } from "lucide-react";

const faqs = [
  {
    question: "How does sentiment analysis work?",
    answer: "Our sentiment analysis uses advanced AI algorithms to analyze text and determine the emotional tone, whether it's positive, negative, or neutral. The system considers context, language patterns, and semantic meaning."
  },
  {
    question: "What file formats are supported?",
    answer: "We support various file formats including text files (.txt), PDF documents (.pdf), Word documents (.doc, .docx), and images with text (.jpg, .jpeg, .png) for OCR processing."
  },
  {
    question: "How accurate is the sentiment analysis?",
    answer: "Our AI models achieve high accuracy rates, typically above 85-90% for most text types. Accuracy may vary depending on the complexity and context of the text being analyzed."
  },
  {
    question: "Can I analyze multiple texts at once?",
    answer: "Yes, you can upload multiple files or paste multiple text segments for batch analysis. The system will process each item individually and provide comprehensive results."
  },
  {
    question: "Is my data secure?",
    answer: "Absolutely. All data is encrypted in transit and at rest. We follow industry-standard security practices and do not store your sensitive information longer than necessary for processing."
  }
];

export default function Help() {
  return (
    <DashboardLayout>
      <div className="p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Help & Support</h1>
          <p className="text-muted-foreground text-lg">
            Find answers to common questions and get support
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Support Options */}
          <Card>
            <CardHeader className="text-center">
              <MessageCircle className="h-12 w-12 mx-auto mb-4 text-primary" />
              <CardTitle>Live Chat</CardTitle>
              <CardDescription>
                Get instant help from our support team
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full" variant="outline">
                Start Chat
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="text-center">
              <Book className="h-12 w-12 mx-auto mb-4 text-primary" />
              <CardTitle>Documentation</CardTitle>
              <CardDescription>
                Comprehensive guides and tutorials
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full" variant="outline">
                <ExternalLink className="h-4 w-4 mr-2" />
                View Docs
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="text-center">
              <Mail className="h-12 w-12 mx-auto mb-4 text-primary" />
              <CardTitle>Email Support</CardTitle>
              <CardDescription>
                Send us a detailed message
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full" variant="outline">
                support@sashboard.com
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* FAQ */}
        <Card>
          <CardHeader>
            <CardTitle>Frequently Asked Questions</CardTitle>
            <CardDescription>
              Find quick answers to common questions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>

        {/* Need More Help */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Need More Help?</CardTitle>
            <CardDescription>
              Can't find what you're looking for? Reach out to us directly.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col sm:flex-row gap-4">
            <Button variant="outline" className="flex-1">
              <Mail className="h-4 w-4 mr-2" />
              Email Support
              <ExternalLink className="h-4 w-4 ml-2" />
            </Button>
            <Button variant="outline" className="flex-1">
              <Book className="h-4 w-4 mr-2" />
              View Docs
              <ExternalLink className="h-4 w-4 ml-2" />
            </Button>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}