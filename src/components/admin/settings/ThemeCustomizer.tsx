import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import type { ThemeSettings } from "@/types/theme";
import { useNavigate } from "react-router-dom";

export const ThemeCustomizer = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [settings, setSettings] = useState<ThemeSettings>({
    primary_color: "#1a4f7c",
    secondary_color: "#64748b",
    background_color: "#ffffff",
    text_color: "#000000",
    accent_color: "#9333ea",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        // Temporarily skip auth check for development
        const { data, error } = await supabase
          .from('theme_settings')
          .select('*')
          .maybeSingle();

        if (error) {
          console.error('Error fetching theme settings:', error);
          toast({
            title: "Error",
            description: "Failed to fetch theme settings.",
            variant: "destructive",
          });
          return;
        }

        if (data) {
          setSettings(data);
          // Update CSS variables with fetched values
          Object.entries(data).forEach(([key, value]) => {
            if (typeof value === 'string' && key !== 'id' && key !== 'created_at' && key !== 'updated_at') {
              document.documentElement.style.setProperty(`--${key.replace('_', '-')}`, value);
            }
          });
        } else {
          // Create initial settings if none exist
          const { error: insertError } = await supabase
            .from('theme_settings')
            .insert([settings]);

          if (insertError) {
            console.error('Error creating initial theme settings:', insertError);
            toast({
              title: "Error",
              description: "Failed to create initial theme settings.",
              variant: "destructive",
            });
          }
        }
      } catch (error) {
        console.error('Error fetching settings:', error);
        toast({
          title: "Error",
          description: "An unexpected error occurred.",
          variant: "destructive",
        });
      }
    };

    fetchSettings();
  }, [toast]);

  const handleColorChange = (key: keyof ThemeSettings, value: string) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
    
    // Update CSS variables dynamically
    document.documentElement.style.setProperty(`--${key.replace('_', '-')}`, value);
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      const { error } = await supabase
        .from('theme_settings')
        .upsert({ 
          ...settings,
          updated_at: new Date().toISOString()
        });

      if (error) throw error;

      toast({
        title: "Success",
        description: "Theme settings have been updated successfully.",
      });
    } catch (error) {
      console.error('Error saving theme settings:', error);
      toast({
        title: "Error",
        description: "Failed to save theme settings. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Theme Customization</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="grid gap-2">
            <Label htmlFor="primary_color">Primary Color</Label>
            <div className="flex items-center gap-2">
              <Input
                id="primary_color"
                type="color"
                value={settings.primary_color}
                onChange={(e) => handleColorChange('primary_color', e.target.value)}
                className="w-20 h-10 p-1"
              />
              <Input
                type="text"
                value={settings.primary_color}
                onChange={(e) => handleColorChange('primary_color', e.target.value)}
                className="font-mono"
              />
            </div>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="secondary_color">Secondary Color</Label>
            <div className="flex items-center gap-2">
              <Input
                id="secondary_color"
                type="color"
                value={settings.secondary_color}
                onChange={(e) => handleColorChange('secondary_color', e.target.value)}
                className="w-20 h-10 p-1"
              />
              <Input
                type="text"
                value={settings.secondary_color}
                onChange={(e) => handleColorChange('secondary_color', e.target.value)}
                className="font-mono"
              />
            </div>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="background_color">Background Color</Label>
            <div className="flex items-center gap-2">
              <Input
                id="background_color"
                type="color"
                value={settings.background_color}
                onChange={(e) => handleColorChange('background_color', e.target.value)}
                className="w-20 h-10 p-1"
              />
              <Input
                type="text"
                value={settings.background_color}
                onChange={(e) => handleColorChange('background_color', e.target.value)}
                className="font-mono"
              />
            </div>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="text_color">Text Color</Label>
            <div className="flex items-center gap-2">
              <Input
                id="text_color"
                type="color"
                value={settings.text_color}
                onChange={(e) => handleColorChange('text_color', e.target.value)}
                className="w-20 h-10 p-1"
              />
              <Input
                type="text"
                value={settings.text_color}
                onChange={(e) => handleColorChange('text_color', e.target.value)}
                className="font-mono"
              />
            </div>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="accent_color">Accent Color</Label>
            <div className="flex items-center gap-2">
              <Input
                id="accent_color"
                type="color"
                value={settings.accent_color}
                onChange={(e) => handleColorChange('accent_color', e.target.value)}
                className="w-20 h-10 p-1"
              />
              <Input
                type="text"
                value={settings.accent_color}
                onChange={(e) => handleColorChange('accent_color', e.target.value)}
                className="font-mono"
              />
            </div>
          </div>
        </div>

        <Button onClick={handleSave} disabled={loading} className="w-full">
          {loading ? "Saving..." : "Save Theme Settings"}
        </Button>

        <div className="mt-6 p-4 border rounded-lg">
          <h3 className="font-medium mb-2">Preview</h3>
          <div className="space-y-2">
            <Button variant="default">Primary Button</Button>
            <Button variant="secondary">Secondary Button</Button>
            <p>Sample text to preview colors</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
