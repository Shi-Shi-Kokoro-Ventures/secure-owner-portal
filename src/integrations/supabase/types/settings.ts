export interface AdminSetting {
  id: string;
  setting_key: string;
  setting_value: any;
  created_at: string;
  updated_at: string;
}

export interface ThemeSetting {
  id: string;
  primary_color: string;
  secondary_color: string;
  background_color: string;
  text_color: string;
  accent_color: string;
  created_at: string;
  updated_at: string;
  dark_mode_enabled: boolean | null;
  font_size_base: string | null;
  border_radius: string | null;
  spacing_unit: string | null;
  animation_speed: string | null;
}