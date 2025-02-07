
import { supabase } from './client';

export async function uploadTenantDocument(file: File, documentType: string) {
  try {
    const fileExt = file.name.split('.').pop();
    const userId = (await supabase.auth.getUser()).data.user?.id;
    if (!userId) throw new Error('User not authenticated');

    const filePath = `${userId}/${crypto.randomUUID()}.${fileExt}`;

    const { error: uploadError } = await supabase.storage
      .from('tenant_documents')
      .upload(filePath, file);

    if (uploadError) throw uploadError;

    const { data: { publicUrl } } = supabase.storage
      .from('tenant_documents')
      .getPublicUrl(filePath);

    const { error: dbError } = await supabase
      .from('user_documents')
      .insert({
        user_id: userId,
        document_type: documentType,
        file_url: publicUrl
      });

    if (dbError) throw dbError;

    return { publicUrl };
  } catch (error) {
    console.error('Error uploading document:', error);
    throw error;
  }
}
