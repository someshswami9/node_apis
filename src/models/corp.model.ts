export interface Corp {
    id: string;
    name: string;
    primary_color: string;
    secondary_color: string;
    logo: string | null; // Base64 encoded logo
    created_at: Date;
  }
  