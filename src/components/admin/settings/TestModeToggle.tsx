
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/use-auth-context";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle } from "lucide-react";
import type { TestModeSetting } from "@/integrations/supabase/types/settings";

export const TestModeToggle = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { userProfile } = useAuth();

  const { data: settingData, isLoading } = useQuery({
    queryKey: ['test-mode'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('admin_settings')
        .select('setting_value')
        .eq('setting_key', 'test_mode')
        .single();

      if (error) throw error;
      return data?.setting_value as TestModeSetting;
    },
  });

  const { mutate: toggleTestMode } = useMutation({
    mutationFn: async (enabled: boolean) => {
      const { error } = await supabase.rpc('toggle_test_mode', {
        new_state: enabled
      });
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['test-mode'] });
      toast({
        title: "Test Mode Updated",
        description: "The test mode setting has been updated successfully.",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to update test mode setting. " + error.message,
        variant: "destructive",
      });
    },
  });

  if (!userProfile || userProfile.role !== 'special_admin') {
    return null;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-yellow-500" />
          Test Mode
        </CardTitle>
        <CardDescription>
          Enable test mode to use mock data for testing purposes. Only available to special administrators.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <Label htmlFor="test-mode" className="text-base">
            Enable Test Mode
          </Label>
          <Switch
            id="test-mode"
            checked={settingData?.enabled || false}
            onCheckedChange={(checked) => toggleTestMode(checked)}
            disabled={isLoading}
          />
        </div>
        {settingData?.enabled && (
          <p className="mt-4 text-sm text-yellow-600 dark:text-yellow-500">
            Test mode is currently enabled. Mock data is being used for demonstration purposes.
          </p>
        )}
      </CardContent>
    </Card>
  );
};
