// src/supabaseClient.js
import { createClient } from '@supabase/supabase-js';

// ⚠️ PONÉ ACÁ TUS DATOS REALES DE SUPABASE
const SUPABASE_URL = 'https://mkfgowsxxtruuqdivcgq.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1rZmdvd3N4eHRydXVxZGl2Y2dxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM2NjQ0MTMsImV4cCI6MjA3OTI0MDQxM30.4XRF6QXw3Zz4EvcDIt-nXb4_iaXXVeK40BNh_tT8mgE';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
