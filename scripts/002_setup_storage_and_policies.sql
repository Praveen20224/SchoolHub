-- Create storage bucket for school images
INSERT INTO storage.buckets (id, name, public) 
VALUES ('school-images', 'school-images', true);

-- Enable RLS on the storage bucket
CREATE POLICY "Allow public uploads to school-images bucket" ON storage.objects
FOR INSERT TO public
WITH CHECK (bucket_id = 'school-images');

CREATE POLICY "Allow public access to school-images bucket" ON storage.objects
FOR SELECT TO public
USING (bucket_id = 'school-images');

CREATE POLICY "Allow public updates to school-images bucket" ON storage.objects
FOR UPDATE TO public
USING (bucket_id = 'school-images');

CREATE POLICY "Allow public deletes from school-images bucket" ON storage.objects
FOR DELETE TO public
USING (bucket_id = 'school-images');

-- Enable RLS and create policies for schools table
ALTER TABLE public.schools ENABLE ROW LEVEL SECURITY;

-- Create policies to allow public access for school operations
CREATE POLICY "Allow public insert on schools" ON public.schools
FOR INSERT TO public
WITH CHECK (true);

CREATE POLICY "Allow public select on schools" ON public.schools
FOR SELECT TO public
USING (true);

CREATE POLICY "Allow public update on schools" ON public.schools
FOR UPDATE TO public
USING (true);

CREATE POLICY "Allow public delete on schools" ON public.schools
FOR DELETE TO public
USING (true);
