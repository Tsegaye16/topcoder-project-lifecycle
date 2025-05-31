export type ColumnType =
  | "customer"
  | "delivery"
  | "operation"
  | "community"
  | "review";

export interface KanbanItem {
  id: string;
  title: string;
  description?: string;
  tooltip: string;
  icon?: string;
  connectedTo?: string | string[]; // ID or IDs of the items this is connected to
  position?: "start" | "end" | "both"; // Position of the item in the connection
  isVerticalConnection?: boolean; // Whether this item is connected vertically
  verticalConnectionTarget?: string; // ID of the item to connect vertically to
  verticalPosition?: number; // Position in the vertical stack (0-based)
  isBidirectional?: boolean; // Whether this item has a bidirectional connection
}

export interface KanbanColumnType {
  id: ColumnType;
  title: string;
  icon: string;
  items: KanbanItem[];
}

export interface KanbanData {
  [key: string]: {
    columns: KanbanColumnType[];
    description: React.ReactNode;
  };
}
