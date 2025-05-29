import React, { useState, useRef, useEffect } from "react";
import {
  ColumnType,
  KanbanColumn as IKanbanColumn,
  KanbanItem,
} from "../../types/KanbanTypes";
import KanbanColumn from "./KanbanColumn";
import ConnectionLine from "./ConnectionLine";
import "./KanbanBoard.scss";

interface KanbanBoardProps {
  columns: IKanbanColumn[];
  onReset?: () => void;
}

const COLUMN_ORDER: ColumnType[] = [
  "customer",
  "delivery",
  "operation",
  "community",
  "review",
];

interface Connection {
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  isVertical?: boolean;
  direction?: "left" | "right";
  connectionType?:
    | "bottom-center"
    | "center-right"
    | "bidirectional"
    | "top-down"
    | "bottom-up"
    | "vertical-bidirectional"
    | "left-to-right"
    | "right-to-left"
    | "horizontal-bidirectional";
  customPath?: string;
}

const KanbanBoard: React.FC<KanbanBoardProps> = ({ columns, onReset }) => {
  const [activeColumnId, setActiveColumnId] = useState<ColumnType>("customer");
  const [connections, setConnections] = useState<Connection[]>([]);
  const boardRef = useRef<HTMLDivElement>(null);
  const columnsRef = useRef<HTMLDivElement>(null);

  const handleColumnClick = (columnId: ColumnType) => {
    setActiveColumnId(columnId);
  };

  const isColumnActive = (column: IKanbanColumn) => {
    const clickedColumnIndex = COLUMN_ORDER.indexOf(activeColumnId);
    const currentColumnIndex = COLUMN_ORDER.indexOf(column.id);
    return currentColumnIndex <= clickedColumnIndex;
  };

  const shouldShowItems = (column: IKanbanColumn) => {
    const clickedColumnIndex = COLUMN_ORDER.indexOf(activeColumnId);
    const currentColumnIndex = COLUMN_ORDER.indexOf(column.id);
    return currentColumnIndex <= clickedColumnIndex;
  };

  const updateConnections = () => {
    if (!boardRef.current) return;

    const newConnections: Connection[] = [];

    // Horizontal connection from Start Engagement to Team Allocation
    const startItem = boardRef.current.querySelector('[data-item-id="dc1"]');
    const endItem = boardRef.current.querySelector('[data-item-id="do1"]');
    const requirementItem = boardRef.current.querySelector(
      '[data-item-id="dd1"]'
    );

    // New connection between Collaborates on Requirements items
    const collaborateCustomer = boardRef.current.querySelector(
      '[data-item-id="dc2"]'
    );
    const collaborateDelivery = boardRef.current.querySelector(
      '[data-item-id="dd2"]'
    );

    if (startItem && endItem) {
      const startRect = startItem.getBoundingClientRect();
      const endRect = endItem.getBoundingClientRect();
      const boardRect = boardRef.current.getBoundingClientRect();

      const startColumn = startItem.closest(".kanban-column");
      const endColumn = endItem.closest(".kanban-column");

      if (
        startColumn?.classList.contains("active") &&
        endColumn?.classList.contains("active")
      ) {
        newConnections.push({
          startX: startRect.right - boardRect.left,
          startY: startRect.top - boardRect.top + startRect.height / 2,
          endX: endRect.left - boardRect.left,
          endY: endRect.top - boardRect.top + endRect.height / 2,
          connectionType: "center-right",
        });
      }
    }

    // Add connection for Collaborates on Requirements items
    if (collaborateCustomer && collaborateDelivery) {
      const startRect = collaborateCustomer.getBoundingClientRect();
      const endRect = collaborateDelivery.getBoundingClientRect();
      const boardRect = boardRef.current.getBoundingClientRect();

      const startColumn = collaborateCustomer.closest(".kanban-column");
      const endColumn = collaborateDelivery.closest(".kanban-column");

      if (
        startColumn?.classList.contains("active") &&
        endColumn?.classList.contains("active")
      ) {
        newConnections.push({
          startX: startRect.right - boardRect.left,
          startY: startRect.top - boardRect.top + startRect.height / 2,
          endX: endRect.left - boardRect.left,
          endY: endRect.top - boardRect.top + endRect.height / 2,
          connectionType: "bidirectional",
        });
      }
    }

    // Add vertical connection between Requirement Study and Collaborates on Requirements
    const reqStudyItem = boardRef.current.querySelector('[data-item-id="dd1"]');
    const collabReqItem = boardRef.current.querySelector(
      '[data-item-id="dd2"]'
    );

    if (reqStudyItem && collabReqItem) {
      const reqRect = reqStudyItem.getBoundingClientRect();
      const collabRect = collabReqItem.getBoundingClientRect();
      const boardRect = boardRef.current.getBoundingClientRect();

      const reqColumn = reqStudyItem.closest(".kanban-column");

      if (reqColumn?.classList.contains("active")) {
        const startX = reqRect.left - boardRect.left + reqRect.width * 0.5;
        const startY = reqRect.bottom - boardRect.top;
        const endY = collabRect.top - boardRect.top - 3;

        newConnections.push({
          startX,
          startY,
          endX: startX,
          endY,
          isVertical: true,
          connectionType: "top-down",
        });
      }
    }

    // Add connection from Write Specification to Collaborates on Requirements
    const writeSpecItem = boardRef.current.querySelector(
      '[data-item-id="do2"]'
    );
    const collabReqItem2 = boardRef.current.querySelector(
      '[data-item-id="dd2"]'
    );

    if (writeSpecItem && collabReqItem2) {
      const writeSpecRect = writeSpecItem.getBoundingClientRect();
      const collabRect = collabReqItem2.getBoundingClientRect();
      const boardRect = boardRef.current.getBoundingClientRect();

      const writeSpecColumn = writeSpecItem.closest(".kanban-column");
      const collabColumn = collabReqItem2.closest(".kanban-column");

      if (
        writeSpecColumn?.classList.contains("active") &&
        collabColumn?.classList.contains("active")
      ) {
        newConnections.push({
          startX: writeSpecRect.left - boardRect.left - 2,
          startY: writeSpecRect.top - boardRect.top + writeSpecRect.height / 2,
          endX: collabRect.right - boardRect.left + 2,
          endY: collabRect.top - boardRect.top + collabRect.height / 2,
          isVertical: false,
          connectionType: "right-to-left",
        });
      }
    }

    // Add connection from Design Challenge to Challenge Posting
    const designChallengeItem = boardRef.current.querySelector(
      '[data-item-id="dd3"]'
    );
    const challengePostingItem = boardRef.current.querySelector(
      '[data-item-id="do3"]'
    );

    if (designChallengeItem && challengePostingItem) {
      const designRect = designChallengeItem.getBoundingClientRect();
      const postingRect = challengePostingItem.getBoundingClientRect();
      const boardRect = boardRef.current.getBoundingClientRect();

      const designColumn = designChallengeItem.closest(".kanban-column");
      const postingColumn = challengePostingItem.closest(".kanban-column");

      if (
        designColumn?.classList.contains("active") &&
        postingColumn?.classList.contains("active")
      ) {
        newConnections.push({
          startX: designRect.right - boardRect.left + 2,
          startY: designRect.top - boardRect.top + designRect.height / 2,
          endX: postingRect.left - boardRect.left - 2,
          endY: postingRect.top - boardRect.top + postingRect.height / 2,
          isVertical: false,
          connectionType: "left-to-right",
        });
      }
    }

    // Add vertical connection between Challenge Posting and Notification
    const postingItem = boardRef.current.querySelector('[data-item-id="do3"]');
    const notificationItem = boardRef.current.querySelector(
      '[data-item-id="do4"]'
    );

    if (postingItem && notificationItem) {
      const postingRect = postingItem.getBoundingClientRect();
      const notifRect = notificationItem.getBoundingClientRect();
      const boardRect = boardRef.current.getBoundingClientRect();

      const postingColumn = postingItem.closest(".kanban-column");

      if (postingColumn?.classList.contains("active")) {
        const startX =
          postingRect.left - boardRect.left + postingRect.width * 0.5;
        const startY = postingRect.bottom - boardRect.top;
        const endY = notifRect.top - boardRect.top - 3;

        newConnections.push({
          startX,
          startY,
          endX: startX,
          endY,
          isVertical: true,
          connectionType: "top-down",
        });
      }
    }

    // Add connection from Notification to Join Challenge
    const notifItem = boardRef.current.querySelector('[data-item-id="do4"]');
    const joinChallengeItem = boardRef.current.querySelector(
      '[data-item-id="com1"]'
    );

    if (notifItem && joinChallengeItem) {
      const notifRect = notifItem.getBoundingClientRect();
      const joinRect = joinChallengeItem.getBoundingClientRect();
      const boardRect = boardRef.current.getBoundingClientRect();

      const notifColumn = notifItem.closest(".kanban-column");
      const joinColumn = joinChallengeItem.closest(".kanban-column");

      if (
        notifColumn?.classList.contains("active") &&
        joinColumn?.classList.contains("active")
      ) {
        newConnections.push({
          startX: notifRect.right - boardRect.left + 2,
          startY: notifRect.top - boardRect.top + notifRect.height / 2,
          endX: joinRect.left - boardRect.left - 2,
          endY: joinRect.top - boardRect.top + joinRect.height / 2,
          isVertical: false,
          connectionType: "left-to-right",
        });
      }
    }

    // Add vertical connection between Join Challenge and Ask Question
    const joinChallengeItem2 = boardRef.current.querySelector(
      '[data-item-id="com1"]'
    );
    const askQuestionItem = boardRef.current.querySelector(
      '[data-item-id="com2"]'
    );

    if (joinChallengeItem2 && askQuestionItem) {
      const joinRect = joinChallengeItem2.getBoundingClientRect();
      const askRect = askQuestionItem.getBoundingClientRect();
      const boardRect = boardRef.current.getBoundingClientRect();

      const joinColumn = joinChallengeItem2.closest(".kanban-column");

      if (joinColumn?.classList.contains("active")) {
        const startX = joinRect.left - boardRect.left + joinRect.width * 0.5;
        const startY = joinRect.bottom - boardRect.top;
        const endY = askRect.top - boardRect.top - 3;

        newConnections.push({
          startX,
          startY,
          endX: startX,
          endY,
          isVertical: true,
          connectionType: "top-down",
        });
      }
    }

    // Add vertical connection between Collaborates on Requirements and Design Challenge
    const collabReqDeliveryItem = boardRef.current.querySelector(
      '[data-item-id="dd2"]'
    );
    const designChallengeItem2 = boardRef.current.querySelector(
      '[data-item-id="dd3"]'
    );

    if (collabReqDeliveryItem && designChallengeItem2) {
      const collabRect = collabReqDeliveryItem.getBoundingClientRect();
      const designRect = designChallengeItem2.getBoundingClientRect();
      const boardRect = boardRef.current.getBoundingClientRect();

      const collabColumn = collabReqDeliveryItem.closest(".kanban-column");

      if (collabColumn?.classList.contains("active")) {
        const startX =
          collabRect.left - boardRect.left + collabRect.width * 0.5;
        const startY = collabRect.bottom - boardRect.top;
        const endY = designRect.top - boardRect.top - 3;

        newConnections.push({
          startX,
          startY,
          endX: startX,
          endY,
          isVertical: true,
          connectionType: "top-down",
        });
      }
    }

    // Vertical connection from Team Allocation to Requirement Study
    if (endItem && requirementItem) {
      const endRect = endItem.getBoundingClientRect();
      const reqRect = requirementItem.getBoundingClientRect();
      const boardRect = boardRef.current.getBoundingClientRect();

      const endColumn = endItem.closest(".kanban-column");
      const reqColumn = requirementItem.closest(".kanban-column");

      if (
        endColumn?.classList.contains("active") &&
        reqColumn?.classList.contains("active")
      ) {
        newConnections.push({
          startX: endRect.left - boardRect.left + endRect.width / 2,
          startY: endRect.bottom - boardRect.top,
          endX: reqRect.right - boardRect.left,
          endY: reqRect.top - boardRect.top + reqRect.height / 2,
          isVertical: true,
          direction: "left",
          connectionType: "bottom-center",
        });
      }
    }

    // Add vertical connection between Ask Question and Documentation & Forum
    const askQuestionItem2 = boardRef.current.querySelector(
      '[data-item-id="com2"]'
    );
    const docForumItem = boardRef.current.querySelector(
      '[data-item-id="com3"]'
    );

    if (askQuestionItem2 && docForumItem) {
      const askRect = askQuestionItem2.getBoundingClientRect();
      const docRect = docForumItem.getBoundingClientRect();
      const boardRect = boardRef.current.getBoundingClientRect();

      const askColumn = askQuestionItem2.closest(".kanban-column");

      if (askColumn?.classList.contains("active")) {
        const startX = askRect.left - boardRect.left + askRect.width * 0.5;
        const startY = askRect.bottom - boardRect.top;
        const endY = docRect.top - boardRect.top - 3;

        newConnections.push({
          startX,
          startY,
          endX: startX,
          endY,
          isVertical: true,
          connectionType: "top-down",
        });
      }
    }

    // Add bidirectional connection between Documentation & Forum items
    const docForumDeliveryItem = boardRef.current.querySelector(
      '[data-item-id="dd4"]'
    );
    const docForumCommunityItem = boardRef.current.querySelector(
      '[data-item-id="com3"]'
    );

    if (docForumDeliveryItem && docForumCommunityItem) {
      const deliveryRect = docForumDeliveryItem.getBoundingClientRect();
      const communityRect = docForumCommunityItem.getBoundingClientRect();
      const boardRect = boardRef.current.getBoundingClientRect();

      const deliveryColumn = docForumDeliveryItem.closest(".kanban-column");
      const communityColumn = docForumCommunityItem.closest(".kanban-column");

      if (
        deliveryColumn?.classList.contains("active") &&
        communityColumn?.classList.contains("active")
      ) {
        // Forward connection (Delivery to Community)
        newConnections.push({
          startX: deliveryRect.right - boardRect.left + 2,
          startY: deliveryRect.top - boardRect.top + deliveryRect.height / 2,
          endX: communityRect.left - boardRect.left - 2,
          endY: communityRect.top - boardRect.top + communityRect.height / 2,
          isVertical: false,
          connectionType: "left-to-right",
        });

        // Backward connection (Community to Delivery)
        newConnections.push({
          startX: communityRect.left - boardRect.left - 2,
          startY: communityRect.top - boardRect.top + communityRect.height / 2,
          endX: deliveryRect.right - boardRect.left + 2,
          endY: deliveryRect.top - boardRect.top + deliveryRect.height / 2,
          isVertical: false,
          connectionType: "right-to-left",
        });
      }
    }

    // Add vertical connection between Documentation & Forum and Submit Round 1 Designs
    const docForumItem2 = boardRef.current.querySelector(
      '[data-item-id="com3"]'
    );
    const submitDesignsItem = boardRef.current.querySelector(
      '[data-item-id="com4"]'
    );

    if (docForumItem2 && submitDesignsItem) {
      const docRect = docForumItem2.getBoundingClientRect();
      const submitRect = submitDesignsItem.getBoundingClientRect();
      const boardRect = boardRef.current.getBoundingClientRect();

      const docColumn = docForumItem2.closest(".kanban-column");

      if (docColumn?.classList.contains("active")) {
        const startX = docRect.left - boardRect.left + docRect.width * 0.5;
        const startY = docRect.bottom - boardRect.top;
        const endY = submitRect.top - boardRect.top - 3;

        newConnections.push({
          startX,
          startY,
          endX: startX,
          endY,
          isVertical: true,
          connectionType: "top-down",
        });
      }
    }

    // Add connection between Submit Round 1 Designs and Review Round 1 Designs
    const submitDesignsItem2 = boardRef.current.querySelector(
      '[data-item-id="com4"]'
    );
    const reviewDesignsItem = boardRef.current.querySelector(
      '[data-item-id="rev1"]'
    );

    if (submitDesignsItem2 && reviewDesignsItem) {
      const submitRect = submitDesignsItem2.getBoundingClientRect();
      const reviewRect = reviewDesignsItem.getBoundingClientRect();
      const boardRect = boardRef.current.getBoundingClientRect();

      const submitColumn = submitDesignsItem2.closest(".kanban-column");
      const reviewColumn = reviewDesignsItem.closest(".kanban-column");

      if (
        submitColumn?.classList.contains("active") &&
        reviewColumn?.classList.contains("active")
      ) {
        newConnections.push({
          startX: submitRect.right - boardRect.left + 2,
          startY: submitRect.top - boardRect.top + submitRect.height / 2,
          endX: reviewRect.left - boardRect.left - 2,
          endY: reviewRect.top - boardRect.top + reviewRect.height / 2,
          isVertical: false,
          connectionType: "left-to-right",
        });
      }
    }

    // Add connection between Review Panel's Review Round 1 Designs and Customer's Review Round 1 Designs
    const reviewDesignsItem2 = boardRef.current.querySelector(
      '[data-item-id="rev1"]'
    );
    const customerReviewItem = boardRef.current.querySelector(
      '[data-item-id="dc3"]'
    );

    if (reviewDesignsItem2 && customerReviewItem) {
      const reviewRect = reviewDesignsItem2.getBoundingClientRect();
      const customerRect = customerReviewItem.getBoundingClientRect();
      const boardRect = boardRef.current.getBoundingClientRect();

      const reviewColumn = reviewDesignsItem2.closest(".kanban-column");
      const customerColumn = customerReviewItem.closest(".kanban-column");

      if (
        reviewColumn?.classList.contains("active") &&
        customerColumn?.classList.contains("active")
      ) {
        // Vertical line from bottom center
        const startX = reviewRect.left - boardRect.left + reviewRect.width / 2;
        const startY = reviewRect.bottom - boardRect.top;
        const midY = startY + 40; // Add some vertical space for the elbow

        // Create a single connection with a custom path for both segments
        newConnections.push({
          startX,
          startY,
          endX: customerRect.right - boardRect.left + 2,
          endY: midY,
          isVertical: false,
          connectionType: "right-to-left",
          customPath: `M ${startX} ${startY} L ${startX} ${midY} L ${
            customerRect.right - boardRect.left + 2
          } ${midY}`,
        });
      }
    }

    // Add connection between Customer's Review Round 1 Designs and Announce Round 1 Feedback
    const customerReviewItem2 = boardRef.current.querySelector(
      '[data-item-id="dc3"]'
    );
    const announceFeedbackItem = boardRef.current.querySelector(
      '[data-item-id="do5"]'
    );

    if (customerReviewItem2 && announceFeedbackItem) {
      const customerRect = customerReviewItem2.getBoundingClientRect();
      const announceRect = announceFeedbackItem.getBoundingClientRect();
      const boardRect = boardRef.current.getBoundingClientRect();

      const customerColumn = customerReviewItem2.closest(".kanban-column");
      const announceColumn = announceFeedbackItem.closest(".kanban-column");

      if (
        customerColumn?.classList.contains("active") &&
        announceColumn?.classList.contains("active")
      ) {
        newConnections.push({
          startX: customerRect.left - boardRect.left + 189,
          startY: customerRect.top - boardRect.top + customerRect.height / 1.2,
          endX: announceRect.left - boardRect.left + 2,
          endY: announceRect.top - boardRect.top + announceRect.height / 2.3,
          isVertical: false,
          connectionType: "left-to-right",
        });
      }
    }

    // Add connection between Announce Round 1 Feedback and Submit Round 2 Designs
    const announceFeedbackItem2 = boardRef.current.querySelector(
      '[data-item-id="do5"]'
    );
    const submitRound2Item = boardRef.current.querySelector(
      '[data-item-id="com5"]'
    );

    if (announceFeedbackItem2 && submitRound2Item) {
      const announceRect = announceFeedbackItem2.getBoundingClientRect();
      const submitRect = submitRound2Item.getBoundingClientRect();
      const boardRect = boardRef.current.getBoundingClientRect();

      const announceColumn = announceFeedbackItem2.closest(".kanban-column");
      const submitColumn = submitRound2Item.closest(".kanban-column");

      if (
        announceColumn?.classList.contains("active") &&
        submitColumn?.classList.contains("active")
      ) {
        newConnections.push({
          startX: announceRect.right - boardRect.left + 2,
          startY: announceRect.top - boardRect.top + announceRect.height / 2,
          endX: submitRect.left - boardRect.left - 2,
          endY: submitRect.top - boardRect.top + submitRect.height / 2,
          isVertical: false,
          connectionType: "left-to-right",
        });
      }
    }

    // Add connection between Submit Round 2 Designs and Review Round 2 Designs
    const submitRound2Item2 = boardRef.current.querySelector(
      '[data-item-id="com5"]'
    );
    const reviewRound2Item = boardRef.current.querySelector(
      '[data-item-id="rev2"]'
    );

    if (submitRound2Item2 && reviewRound2Item) {
      const submitRect = submitRound2Item2.getBoundingClientRect();
      const reviewRect = reviewRound2Item.getBoundingClientRect();
      const boardRect = boardRef.current.getBoundingClientRect();

      const submitColumn = submitRound2Item2.closest(".kanban-column");
      const reviewColumn = reviewRound2Item.closest(".kanban-column");

      if (
        submitColumn?.classList.contains("active") &&
        reviewColumn?.classList.contains("active")
      ) {
        newConnections.push({
          startX: submitRect.right - boardRect.left + 2,
          startY: submitRect.top - boardRect.top + submitRect.height / 2,
          endX: reviewRect.left - boardRect.left - 2,
          endY: reviewRect.top - boardRect.top + reviewRect.height / 2,
          isVertical: false,
          connectionType: "left-to-right",
        });
      }
    }

    // Add connection between Review Round 2 Designs and Final Review and Select Winners
    const reviewRound2Item2 = boardRef.current.querySelector(
      '[data-item-id="rev2"]'
    );
    const finalReviewItem = boardRef.current.querySelector(
      '[data-item-id="dc4"]'
    );

    if (reviewRound2Item2 && finalReviewItem) {
      const reviewRect = reviewRound2Item2.getBoundingClientRect();
      const finalRect = finalReviewItem.getBoundingClientRect();
      const boardRect = boardRef.current.getBoundingClientRect();

      const reviewColumn = reviewRound2Item2.closest(".kanban-column");
      const finalColumn = finalReviewItem.closest(".kanban-column");

      if (
        reviewColumn?.classList.contains("active") &&
        finalColumn?.classList.contains("active")
      ) {
        // Vertical line from bottom center
        const startX = reviewRect.left - boardRect.left + reviewRect.width / 2;
        const startY = reviewRect.bottom - boardRect.top;
        const midY = startY + 40; // Add some vertical space for the elbow

        // Create a single connection with a custom path for both segments
        newConnections.push({
          startX,
          startY,
          endX: finalRect.right - boardRect.left + 2,
          endY: midY,
          isVertical: false,
          connectionType: "right-to-left",
          customPath: `M ${startX} ${startY} L ${startX} ${midY} L ${
            finalRect.right - boardRect.left + 2
          } ${midY}`,
        });
      }
    }

    // Add connection between Final Review and Select Winners and Announce Winners
    const finalReviewItem2 = boardRef.current.querySelector(
      '[data-item-id="dc4"]'
    );
    const announceWinnersItem = boardRef.current.querySelector(
      '[data-item-id="do6"]'
    );

    if (finalReviewItem2 && announceWinnersItem) {
      const finalRect = finalReviewItem2.getBoundingClientRect();
      const announceRect = announceWinnersItem.getBoundingClientRect();
      const boardRect = boardRef.current.getBoundingClientRect();

      const finalColumn = finalReviewItem2.closest(".kanban-column");
      const announceColumn = announceWinnersItem.closest(".kanban-column");

      if (
        finalColumn?.classList.contains("active") &&
        announceColumn?.classList.contains("active")
      ) {
        newConnections.push({
          startX: finalRect.left - boardRect.left + 189,
          startY: finalRect.top - boardRect.top + finalRect.height / 1.3,
          endX: announceRect.left - boardRect.left - 2,
          endY: announceRect.top - boardRect.top + announceRect.height / 2.3,
          isVertical: false,
          connectionType: "left-to-right",
        });
      }
    }

    // Add vertical connection between Announce Winners and Prepare Deliverables
    const announceWinnersItem2 = boardRef.current.querySelector(
      '[data-item-id="do6"]'
    );
    const prepareDeliverablesItem = boardRef.current.querySelector(
      '[data-item-id="do7"]'
    );

    if (announceWinnersItem2 && prepareDeliverablesItem) {
      const announceRect = announceWinnersItem2.getBoundingClientRect();
      const prepareRect = prepareDeliverablesItem.getBoundingClientRect();
      const boardRect = boardRef.current.getBoundingClientRect();

      const announceColumn = announceWinnersItem2.closest(".kanban-column");

      if (announceColumn?.classList.contains("active")) {
        const startX =
          announceRect.left - boardRect.left + announceRect.width * 0.5;
        const startY = announceRect.bottom - boardRect.top;
        const endY = prepareRect.top - boardRect.top - 3;

        newConnections.push({
          startX,
          startY,
          endX: startX,
          endY,
          isVertical: true,
          connectionType: "top-down",
        });
      }
    }

    setConnections(newConnections);
  };

  useEffect(() => {
    updateConnections();
    const observer = new ResizeObserver(updateConnections);
    if (boardRef.current) {
      observer.observe(boardRef.current);
    }

    // Add scroll event listener
    const handleScroll = () => {
      requestAnimationFrame(updateConnections);
    };

    const columnsElement = columnsRef.current;
    if (columnsElement) {
      columnsElement.addEventListener("scroll", handleScroll);
    }

    return () => {
      observer.disconnect();
      if (columnsElement) {
        columnsElement.removeEventListener("scroll", handleScroll);
      }
    };
  }, [columns, activeColumnId]);

  // Reset to initial state when project type changes
  React.useEffect(() => {
    setActiveColumnId("customer");
  }, [columns]);

  return (
    <div className="kanban-board" ref={boardRef}>
      <div className="kanban-board__columns" ref={columnsRef}>
        {columns.map((column, index) => (
          <KanbanColumn
            key={column.id}
            column={column}
            isActive={isColumnActive(column)}
            showItems={shouldShowItems(column)}
            onHeaderClick={handleColumnClick}
            columnIndex={index}
          />
        ))}
      </div>
      {connections.map((connection, index) => (
        <ConnectionLine key={index} {...connection} />
      ))}
    </div>
  );
};

export default KanbanBoard;
