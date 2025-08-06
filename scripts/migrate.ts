import { createClient } from '@supabase/supabase-js';
import { readFileSync } from 'fs';
import { join } from 'path';
import 'dotenv/config';

async function runMigration() {
  // Initialize Supabase client with service role
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseServiceKey) {
    console.error('Missing required environment variables');
    process.exit(1);
  }

  const supabase = createClient(supabaseUrl, supabaseServiceKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });

  try {
    console.log('Running database migration...');
    
    // Read the SQL file
    const sql = readFileSync(
      join(__dirname, '../supabase/migrations/0001_initial_schema.sql'),
      'utf8'
    );

    // Split the SQL into individual statements
    const statements = sql
      .split(';')
      .map(statement => statement.trim())
      .filter(statement => statement.length > 0);

    // Execute each statement
    for (const statement of statements) {
      try {
        console.log(`Executing: ${statement.substring(0, 100)}...`);
        const { error } = await supabase.rpc('pg_catalog.pg_query', {
          query: statement,
        });

        if (error) {
          console.error('Error executing statement:', error);
          console.error('Statement:', statement);
          process.exit(1);
        }
      } catch (error) {
        console.error('Error executing statement:', error);
        console.error('Statement:', statement);
        process.exit(1);
      }
    }

    console.log('✅ Database migration completed successfully');
  } catch (error) {
    console.error('❌ Error running migration:', error);
    process.exit(1);
  }
}

runMigration();
