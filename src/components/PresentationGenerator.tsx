import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2, Presentation, Download, Sparkles } from "lucide-react";
import { toast } from "sonner";
import PptxGenJS from "pptxgenjs";

interface PresentationData {
  topic: string;
  slideCount: number;
  audience: string;
  additionalNotes: string;
}

const GEMINI_API_KEY = "AIzaSyC0tswQGmz-dEnZeSJE1Ec1hXTjZQ1gY2Y";

export function PresentationGenerator() {
  const [formData, setFormData] = useState<PresentationData>({
    topic: "",
    slideCount: 5,
    audience: "",
    additionalNotes: "",
  });
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedContent, setGeneratedContent] = useState<any>(null);

  const generateContent = async (data: PresentationData) => {
    const prompt = `Create a professional PowerPoint presentation with exactly ${data.slideCount} slides about "${data.topic}" for the audience: ${data.audience}. 
    
    Additional requirements: ${data.additionalNotes || "None"}
    
    Please provide the content in the following JSON format:
    {
      "title": "Presentation Title",
      "slides": [
        {
          "title": "Slide Title",
          "content": ["Bullet point 1", "Bullet point 2", "Bullet point 3"]
        }
      ]
    }
    
    Make each slide engaging and informative. Include a title slide and conclusion slide if appropriate within the ${data.slideCount} slide limit.`;

    try {
      const response = await fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-goog-api-key": GEMINI_API_KEY,
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: prompt,
                },
              ],
            },
          ],
        }),
      });

      if (!response.ok) {
        throw new Error(`API request failed: ${response.status}`);
      }

      const result = await response.json();
      const content = result.candidates[0].content.parts[0].text;
      
      // Parse the JSON from the response
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      } else {
        throw new Error("Could not parse presentation content");
      }
    } catch (error) {
      console.error("Error generating content:", error);
      throw error;
    }
  };

  const createPowerPoint = (content: any) => {
    const pptx = new PptxGenJS();

    // Title slide
    const titleSlide = pptx.addSlide();
    titleSlide.background = { fill: "FFFFFF" };
    
    titleSlide.addText(content.title, {
      x: 0.5,
      y: 2,
      w: 9,
      h: 1.5,
      fontSize: 44,
      bold: true,
      color: "FF6B35",
      align: "center",
    });

    titleSlide.addText("AI Generated Presentation", {
      x: 0.5,
      y: 4,
      w: 9,
      h: 0.5,
      fontSize: 20,
      color: "666666",
      align: "center",
    });

    // Content slides
    content.slides.forEach((slide: any) => {
      const contentSlide = pptx.addSlide();
      contentSlide.background = { fill: "FFFFFF" };

      // Slide title
      contentSlide.addText(slide.title, {
        x: 0.5,
        y: 0.5,
        w: 9,
        h: 1,
        fontSize: 32,
        bold: true,
        color: "FF6B35",
      });

      // Content bullets
      if (slide.content && Array.isArray(slide.content)) {
        slide.content.forEach((point: string, index: number) => {
          contentSlide.addText(`• ${point}`, {
            x: 1,
            y: 2 + index * 0.8,
            w: 8,
            h: 0.6,
            fontSize: 18,
            color: "333333",
          });
        });
      }
    });

    return pptx;
  };

  const handleGenerate = async () => {
    if (!formData.topic.trim()) {
      toast.error("Please enter a presentation topic");
      return;
    }

    setIsGenerating(true);
    try {
      toast.info("Generating presentation content with AI...");
      const content = await generateContent(formData);
      setGeneratedContent(content);
      toast.success("Presentation content generated successfully!");
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to generate presentation. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownload = async () => {
    if (!generatedContent) return;

    try {
      const pptx = createPowerPoint(generatedContent);
      const fileName = `${generatedContent.title.replace(/[^a-zA-Z0-9]/g, "_")}.pptx`;
      await pptx.writeFile({ fileName });
      toast.success("PowerPoint downloaded successfully!");
    } catch (error) {
      console.error("Error creating PowerPoint:", error);
      toast.error("Failed to create PowerPoint file");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center items-center gap-3 mb-4">
            <div className="p-3 bg-gradient-primary rounded-xl shadow-orange">
              <Presentation className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              AI PowerPoint Generator
            </h1>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Create professional presentations instantly with AI. Just describe your topic and let our AI craft engaging slides for you.
          </p>
        </div>

        <div className="max-w-4xl mx-auto grid gap-8 lg:grid-cols-2">
          {/* Input Form */}
          <Card className="shadow-medium hover:shadow-large transition-all duration-300 bg-gradient-card border-0">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl">
                <Sparkles className="h-5 w-5 text-primary" />
                Presentation Details
              </CardTitle>
              <CardDescription>
                Provide the details for your AI-generated presentation
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="topic" className="text-sm font-medium">
                  Presentation Topic *
                </Label>
                <Input
                  id="topic"
                  placeholder="e.g., Introduction to Machine Learning"
                  value={formData.topic}
                  onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                  className="transition-all duration-200 focus:shadow-soft"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="slideCount" className="text-sm font-medium">
                  Number of Slides
                </Label>
                <Select value={formData.slideCount.toString()} onValueChange={(value) => setFormData({ ...formData, slideCount: parseInt(value) })}>
                  <SelectTrigger className="transition-all duration-200 focus:shadow-soft">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {[3, 5, 7, 10, 15, 20].map((num) => (
                      <SelectItem key={num} value={num.toString()}>
                        {num} slides
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="audience" className="text-sm font-medium">
                  Target Audience
                </Label>
                <Input
                  id="audience"
                  placeholder="e.g., College students, Business professionals"
                  value={formData.audience}
                  onChange={(e) => setFormData({ ...formData, audience: e.target.value })}
                  className="transition-all duration-200 focus:shadow-soft"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes" className="text-sm font-medium">
                  Additional Notes (Optional)
                </Label>
                <Textarea
                  id="notes"
                  placeholder="Any specific requirements or focus areas..."
                  value={formData.additionalNotes}
                  onChange={(e) => setFormData({ ...formData, additionalNotes: e.target.value })}
                  className="min-h-[80px] transition-all duration-200 focus:shadow-soft"
                />
              </div>

              <Button
                onClick={handleGenerate}
                disabled={isGenerating}
                className="w-full bg-gradient-primary hover:opacity-90 shadow-orange transition-all duration-300 hover:shadow-lg transform hover:-translate-y-0.5"
                size="lg"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2 h-4 w-4" />
                    Generate Presentation
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Preview & Download */}
          <Card className="shadow-medium hover:shadow-large transition-all duration-300 bg-gradient-card border-0">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl">
                <Presentation className="h-5 w-5 text-primary" />
                Preview & Download
              </CardTitle>
              <CardDescription>
                Preview your generated presentation and download
              </CardDescription>
            </CardHeader>
            <CardContent>
              {generatedContent ? (
                <div className="space-y-6">
                  <div className="p-4 bg-orange-lighter rounded-lg border border-orange-light">
                    <h3 className="font-semibold text-lg mb-3 text-orange-dark">
                      {generatedContent.title}
                    </h3>
                    <div className="space-y-3">
                      {generatedContent.slides?.slice(0, 3).map((slide: any, index: number) => (
                        <div key={index} className="p-3 bg-white rounded border border-orange-light">
                          <h4 className="font-medium text-sm text-orange-dark mb-2">
                            Slide {index + 1}: {slide.title}
                          </h4>
                          {slide.content?.slice(0, 2).map((point: string, pointIndex: number) => (
                            <p key={pointIndex} className="text-xs text-muted-foreground">
                              • {point.substring(0, 50)}...
                            </p>
                          ))}
                        </div>
                      ))}
                      {generatedContent.slides?.length > 3 && (
                        <p className="text-sm text-muted-foreground text-center">
                          + {generatedContent.slides.length - 3} more slides
                        </p>
                      )}
                    </div>
                  </div>

                  <Button
                    onClick={handleDownload}
                    className="w-full bg-gradient-primary hover:opacity-90 shadow-orange transition-all duration-300 hover:shadow-lg transform hover:-translate-y-0.5"
                    size="lg"
                  >
                    <Download className="mr-2 h-4 w-4" />
                    Download PowerPoint
                  </Button>
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                    <Presentation className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <p className="text-muted-foreground">
                    Generate a presentation to see the preview here
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}