import { AnnouncementAudience, AnnouncementUrgency, ConversationType, MessageStatus, MessageType } from './enums';

export interface SystemAnnouncement {
  id: string;
  title: string;
  message: string;
  audience: AnnouncementAudience | null;
  urgency_level: AnnouncementUrgency | null;
  created_at: string | null;
  created_by: string | null;
  is_pinned: boolean | null;
  is_scheduled: boolean | null;
  scheduled_time: string | null;
  expires_at: string | null;
}

export interface Conversation {
  id: string;
  created_at: string;
  property_id: string | null;
  type: ConversationType;
  last_message: string | null;
  last_message_at: string;
}

export interface Message {
  id: string;
  conversation_id: string;
  sender_id: string;
  receiver_id: string | null;
  message_content: string;
  status: MessageStatus;
  message_type: MessageType;
  created_at: string;
}