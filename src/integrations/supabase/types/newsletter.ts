
export interface Newsletter {
  id: string;
  title: string;
  content: string;
  status: 'draft' | 'pending_review' | 'approved' | 'sent';
  canva_design_id: string | null;
  scheduled_for: string | null;
  sent_at: string | null;
  created_at: string;
  updated_at: string;
  created_by: string | null;
  approved_by: string | null;
}

export interface NewsletterSubscriber {
  id: string;
  email: string;
  unsubscribe_token: string;
  status: 'active' | 'unsubscribed';
  created_at: string;
}
