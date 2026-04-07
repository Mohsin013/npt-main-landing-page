import { useState } from "react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Mail, Phone, Send, MessageCircle } from "lucide-react";
import { toast } from "sonner";

const Contact = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    city: "",
    concerns: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("https://api.truintelreform.org/api/hubspot/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          first_name: formData.firstName,
          last_name: formData.lastName,
          phone: formData.phone,
          city: formData.city,
          concerns: formData.concerns,
        }),
      });

      const result = await response.json();

      if (result.success) {
        toast.success("Thank you! We'll get back to you soon.");
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          city: "",
          concerns: "",
        });
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <section className="pt-32 pb-24">
        <div className="container mx-auto px-6 max-w-2xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center">
            <span className="gradient-text">Contact</span> Us
          </h1>
          <p className="text-center text-muted-foreground mb-12">
            Tell us about your project — we'll help you build it.
          </p>

          <div className="gradient-border p-8 rounded-2xl">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName" className="text-foreground">First Name</Label>
                  <Input
                    id="firstName"
                    required
                    placeholder="First name"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="mt-1 bg-muted border-border text-foreground"
                  />
                </div>
                <div>
                  <Label htmlFor="lastName" className="text-foreground">Last Name</Label>
                  <Input
                    id="lastName"
                    required
                    placeholder="Last name"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="mt-1 bg-muted border-border text-foreground"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="email" className="text-foreground">Email</Label>
                <Input
                  id="email"
                  type="email"
                  required
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  className="mt-1 bg-muted border-border text-foreground"
                />
              </div>
              <div>
                <Label htmlFor="phone" className="text-foreground">Phone</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="Your phone number"
                  value={formData.phone}
                  onChange={handleChange}
                  className="mt-1 bg-muted border-border text-foreground"
                />
              </div>
              <div>
                <Label htmlFor="city" className="text-foreground">City</Label>
                <Input
                  id="city"
                  placeholder="Your city"
                  value={formData.city}
                  onChange={handleChange}
                  className="mt-1 bg-muted border-border text-foreground"
                />
              </div>
              <div>
                <Label htmlFor="concerns" className="text-foreground">Project Description</Label>
                <Textarea
                  id="concerns"
                  required
                  rows={5}
                  placeholder="Tell us about your project..."
                  value={formData.concerns}
                  onChange={handleChange}
                  className="mt-1 bg-muted border-border text-foreground"
                />
              </div>
              <Button type="submit" disabled={loading} className="w-full gradient-bg text-primary-foreground rounded-full hover:opacity-90">
                {loading ? "Sending..." : <><Send className="mr-2 h-4 w-4" /> Send Message</>}
              </Button>
            </form>
          </div>

          <div className="mt-12 flex flex-wrap justify-center gap-8 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-primary" /> +91-7006009596
            </div>
            <div className="flex items-center gap-2">
              <MessageCircle className="h-4 w-4 text-primary" /> +91-8899990966 (WhatsApp)
            </div>
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-primary" /> info@northpeaktechnologies.com
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
