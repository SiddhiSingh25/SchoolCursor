export type InquiryRow = {
  id: string;
  student_name: string;
  parent_name: string | null;
  phone: string | null;
  email: string | null;
  class: string | null;
  message: string | null;
  contacted: boolean;
  created_at: string;
  updated_at: string;
};

