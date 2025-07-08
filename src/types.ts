export type DecodedToken = {
  subject: string;
};

export interface LoginResponse {
  data: {
    token: string;
  };
}

export interface DeliveryIntervalResponse {
  data: {
    id: number;
    from: string;
    to: string;
  }[];
}

export interface UserInfo {
  id: number;
  full_name: string;
  phone: string;
  address: string;
  delivery_interval_id: number;
  delivery_type: "contact" | "without_contact";
  peculiarities: string | null;
  plastic_recycling: boolean;
  payment_method: "cash" | "transfer" | "terminal" | "qr" | "invoice";
  cutlery_and_napkins: boolean;
}