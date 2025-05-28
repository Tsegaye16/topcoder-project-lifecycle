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
  connectedTo?: string; // ID of the item this is connected to
  position?: "start" | "end"; // Position of the item in the connection
}

export interface KanbanColumn {
  id: ColumnType;
  title: string;
  icon: string;
  items: KanbanItem[];
}

export interface KanbanData {
  [key: string]: {
    columns: KanbanColumn[];
    description: React.ReactNode;
  };
}
