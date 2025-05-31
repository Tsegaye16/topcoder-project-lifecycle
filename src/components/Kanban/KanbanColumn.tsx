import React from "react";
import { Tooltip } from "react-tooltip";
import {
  KanbanColumnType as IKanbanColumn,
  ColumnType,
  KanbanItem,
} from "../../types/KanbanTypes";
import "./KanbanColumn.scss";

interface KanbanColumnProps {
  column: IKanbanColumn;
  isActive: boolean;
  showItems: boolean;
  onHeaderClick: (columnId: ColumnType) => void;
  columnIndex: number;
}

const KanbanColumn: React.FC<KanbanColumnProps> = ({
  column,
  isActive,
  showItems,
  onHeaderClick,
  columnIndex,
}) => {
  const sortedItems = React.useMemo(() => {
    return [...column.items].sort((a, b) => {
      const posA = a.verticalPosition ?? 0;
      const posB = b.verticalPosition ?? 0;
      return posA - posB;
    });
  }, [column.items]);

  const getConnectionClass = (item: KanbanItem) => {
    if (item.position === "start") return "connected-start";
    if (item.position === "end") return "connected-end";
    return "";
  };

  const isSvgIcon = column.icon?.toLowerCase().endsWith(".svg");

  return (
    <div
      className={`kanban-column ${isActive ? "active" : ""}`}
      data-column-id={column.id}
    >
      <div
        className={`kanban-column__header ${isActive ? "active" : ""}`}
        onClick={() => onHeaderClick(column.id)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            onHeaderClick(column.id);
          }
        }}
      >
        {column.icon ? (
          <img
            src={column.icon}
            alt={`${column.title} icon`}
            className="kanban-column__header-icon"
            data-type={isSvgIcon ? "svg" : "png"}
            onError={(e) => {
              e.currentTarget.src = "/assets/fallback-icon.svg";
            }}
          />
        ) : (
          <div className="kanban-column__header-icon kanban-column__header-icon--fallback">
            {column.title.charAt(0)}
          </div>
        )}
        <span className="kanban-column__header-text">{column.title}</span>
      </div>

      <div className="kanban-column__content">
        {showItems &&
          sortedItems.map((item) => (
            <div
              key={item.id}
              className={`kanban-column__item ${getConnectionClass(item)}`}
              data-item-id={item.id}
              data-tooltip-id={`tooltip-${item.id}`}
              data-tooltip-content={item.tooltip}
              aria-label={item.tooltip}
            >
              {item.icon && (
                <img
                  src={item.icon}
                  alt={`${item.title} icon`}
                  className="kanban-column__item-icon"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                />
              )}
              <div className="kanban-column__item-content">
                <h3>{item.title}</h3>
                {item.description && <p>{item.description}</p>}
              </div>
              {item.tooltip && (
                <Tooltip
                  id={`tooltip-${item.id}`}
                  place="top"
                  className="custom-kanban-tooltip"
                />
              )}
            </div>
          ))}
      </div>
    </div>
  );
};

export default KanbanColumn;
