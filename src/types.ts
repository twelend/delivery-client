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

export interface MenuItem {
  id: string;
  name: string;
}

export interface DishCategory {
  category: string;
  items: MenuItem[];
}

export interface MenuDay {
  date: string;
  dishes: DishCategory[];
}

export interface MenuModalProps {
  isOpen: boolean;
  onClose: () => void;
  menuData: MenuDay[];
}

export interface SelectedItems {
  [dayDate: string]: {
    [category: string]: string[];
  };
}
