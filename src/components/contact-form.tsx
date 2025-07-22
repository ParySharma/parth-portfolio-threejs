"use client";

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useState } from 'react';
import { Mail, MessageSquare, Loader2 } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { sendEmail } from '@/lib/actions';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Please enter a valid email address."),
  message: z.string().min(10, "Message must be at least 10 characters."),
});

export function ContactForm() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: "", email: "", message: "" },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    const result = await sendEmail(values);
    setIsSubmitting(false);

    if (result.success) {
      form.reset();
      toast({
        title: "Message Sent!",
        description: "Thanks for reaching out. I'll get back to you soon.",
      });
    } else {
       toast({
        title: "Error",
        description: result.message,
        variant: "destructive",
      });
    }
  }

  return (
    <div className="container mx-auto max-w-2xl">
      <Card className="bg-card/50 backdrop-blur-sm border-primary/20">
        <CardContent className="p-6">
          <div className="text-center mb-6">
            <h2 className="text-3xl md:text-4xl font-headline font-bold text-primary-foreground mb-2">Get In Touch</h2>
            <p className="text-muted-foreground">Have a project in mind or just want to say hello? Drop me a line.</p>
          </div>

          <Tabs defaultValue="email" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="email"><Mail className="mr-2 h-4 w-4" /> Email</TabsTrigger>
              <TabsTrigger value="whatsapp"><MessageSquare className="mr-2 h-4 w-4" /> WhatsApp</TabsTrigger>
            </TabsList>
            <TabsContent value="email" className="mt-6">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Your Name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="your.email@example.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Message</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Tell me about your project..." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" disabled={isSubmitting} className="w-full bg-primary text-primary-foreground hover:bg-primary/90 text-lg py-6">
                    {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Send Message
                  </Button>
                </form>
              </Form>
            </TabsContent>
            <TabsContent value="whatsapp" className="mt-6 text-center">
               <div className="flex flex-col items-center justify-center space-y-4 p-8 bg-background/50 rounded-lg">
                <MessageSquare className="w-12 h-12 text-accent" />
                <p className="text-lg font-semibold">Contact me on WhatsApp</p>
                <p className="text-muted-foreground">Scan the QR code or click the button below.</p>
                 <div className="p-4 bg-white rounded-md">
                   <p className="text-black">QR Code Placeholder</p>
                </div>
                <Button asChild className="bg-accent text-accent-foreground hover:bg-accent/90">
                  <a href="https://wa.me/1234567890" target="_blank" rel="noopener noreferrer">
                    Open WhatsApp
                  </a>
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
