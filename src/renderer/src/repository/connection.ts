// @ts-nocheck
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://swksrhfmhmtbxcxltqze.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN3a3NyaGZtaG10YnhjeGx0cXplIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcwNTI0NDM5NSwiZXhwIjoyMDIwODIwMzk1fQ.f_f_Hvl-2OeScgkzoSez2E3tQoHrARyHCNxat4dgdwQ'
export const supabase = createClient(supabaseUrl, supabaseKey)

export type Pays= {
    nom: string;
    capital: string;
    code: string;
    devise: string;
};
