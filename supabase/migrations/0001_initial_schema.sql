-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Create custom types
create type user_role as enum ('admin', 'writer', 'client');
create type order_status as enum ('pending', 'in_progress', 'completed', 'cancelled');
create type payment_status as enum ('pending', 'completed', 'failed', 'refunded');
create type payment_method as enum ('stripe', 'paypal', 'bank_transfer');
create type delivery_preference as enum ('email', 'whatsapp');

-- Users table
create table if not exists users (
  id uuid primary key default uuid_generate_v4(),
  email text not null unique,
  full_name text,
  phone text,
  role user_role not null default 'client',
  profile_picture text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Orders table
create table if not exists orders (
  id uuid primary key default uuid_generate_v4(),
  order_id text not null unique,
  client_id uuid not null references users(id) on delete cascade,
  writer_id uuid references users(id) on delete set null,
  title text not null,
  description text,
  subject text,
  academic_level text,
  pages integer not null default 1,
  deadline timestamp with time zone not null,
  status order_status not null default 'pending',
  instructions text,
  file_url text,
  delivery_preference delivery_preference not null default 'email',
  price numeric(10, 2) not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Payments table
create table if not exists payments (
  id uuid primary key default uuid_generate_v4(),
  order_id uuid not null references orders(id) on delete cascade,
  amount numeric(10, 2) not null,
  currency varchar(3) not null default 'USD',
  payment_method payment_method not null,
  status payment_status not null default 'pending',
  transaction_id text,
  invoice_url text,
  metadata jsonb,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Chats table
create table if not exists chats (
  id uuid primary key default uuid_generate_v4(),
  order_id uuid not null references orders(id) on delete cascade,
  sender_id uuid not null references users(id) on delete cascade,
  message text,
  file_url text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Analytics table
create table if not exists analytics (
  id uuid primary key default uuid_generate_v4(),
  metric text not null,
  value numeric not null,
  date date not null default (now() at time zone 'utc')::date,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(metric, date)
);

-- Create indexes for better query performance
create index idx_orders_client_id on orders(client_id);
create index idx_orders_writer_id on orders(writer_id);
create index idx_orders_status on orders(status);
create index idx_payments_order_id on payments(order_id);
create index idx_payments_status on payments(status);
create index idx_chats_order_id on chats(order_id);
create index idx_analytics_metric_date on analytics(metric, date);

-- Create RLS policies for security
alter table users enable row level security;
alter table orders enable row level security;
alter table payments enable row level security;
alter table chats enable row level security;

-- Users policies
create policy "Users can view their own profile"
  on users for select
  using (auth.uid() = id);

create policy "Admins can view all users"
  on users for select
  using (auth.role() = 'authenticated' and 
         (select role from users where id = auth.uid()) = 'admin');

-- Orders policies
create policy "Users can view their own orders"
  on orders for select
  using (auth.uid() = client_id or auth.uid() = writer_id);

create policy "Writers can view assigned orders"
  on orders for select
  using (auth.uid() = writer_id);

create policy "Admins can manage all orders"
  on orders for all
  using (auth.role() = 'authenticated' and 
         (select role from users where id = auth.uid()) = 'admin');

-- Payments policies
create policy "Users can view their own payments"
  on payments for select
  using (exists (
    select 1 from orders 
    where orders.id = payments.order_id 
    and (orders.client_id = auth.uid() or orders.writer_id = auth.uid())
  ));

-- Chats policies
create policy "Users can view their own chats"
  on chats for select
  using (exists (
    select 1 from orders 
    where orders.id = chats.order_id 
    and (orders.client_id = auth.uid() or orders.writer_id = auth.uid())
  ));

-- Function to update updated_at timestamp
create or replace function update_updated_at_column()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

-- Create triggers for updated_at
create trigger update_users_updated_at
before update on users
for each row execute function update_updated_at_column();

create trigger update_orders_updated_at
before update on orders
for each row execute function update_updated_at_column();

create trigger update_payments_updated_at
before update on payments
for each row execute function update_updated_at_column();

-- Function to generate order ID
drop function if exists generate_order_id();
create or replace function generate_order_id()
returns text as $$
declare
  next_id bigint;
  year_str text;
begin
  year_str := to_char(now(), 'YYYY');
  
  -- Get the next sequence number for the year
  select coalesce(max(split_part(order_id, '-', 3)::bigint), 0) + 1
  into next_id
  from orders
  where order_id like 'ORD-' || year_str || '-%';
  
  -- Format as ORD-YYYY-XXXX
  return 'ORD-' || year_str || '-' || lpad(next_id::text, 4, '0');
end;
$$ language plpgsql;

-- Set default order_id using the function
alter table orders alter column order_id set default generate_order_id();

-- Create a function to handle new user signups
create or replace function handle_new_user() 
returns trigger as $$
begin
  insert into public.users (id, email, role)
  values (
    new.id, 
    new.email,
    case 
      when new.email = 'admin@crotonnwriters.com' then 'admin'::user_role
      else 'client'::user_role
    end
  )
  on conflict (id) do nothing;
  
  return new;
end;
$$ language plpgsql security definer;

-- Create a trigger to handle new auth users
create or replace trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure handle_new_user();

-- Enable realtime for tables
begin;
  drop publication if exists supabase_realtime;
  create publication supabase_realtime;
  
  -- Only enable realtime for tables that need it
  alter publication supabase_realtime add table chats;
  alter publication supabase_realtime add table orders;
  alter publication supabase_realtime add table payments;
commit;
