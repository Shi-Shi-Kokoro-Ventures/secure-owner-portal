
export interface ThemeSettings {
  id?: string;
  primary_color: string;
  secondary_color: string;
  background_color: string;
  text_color: string;
  accent_color: string;
  dark_mode_enabled?: boolean;
  font_size_base?: string;
  border_radius?: string;
  spacing_unit?: string;
  animation_speed?: string;
  created_at?: string;
  updated_at?: string;
}

export type ColorScheme = 'light' | 'dark' | 'system';

