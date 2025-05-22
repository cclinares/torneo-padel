import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://egtvjxeeknvhxiyoekip.supabase.co'   // <-- reemplázalo
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVndHZqeGVla252aHhpeW9la2lwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc5NDQ0MDQsImV4cCI6MjA2MzUyMDQwNH0.1rd20QJAqf7ziAxd6UZOZdne1y0ugRcU4mFgFFsP2OI'                      // <-- reemplázalo

export const supabase = createClient(supabaseUrl, supabaseKey)
