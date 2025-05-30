import { ColumnType } from "../types/KanbanTypes";

export interface Connection {
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

export const calculateConnections = (
  boardRef: any,
  activeColumnId: ColumnType
): Connection[] => {
  if (!boardRef.current) return [];

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

  // Connection: Start Engagement to Team Allocation
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

  // Connection: Collaborates on Requirements (Customer to Delivery)
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

  // Vertical connection: Requirement Study to Collaborates on Requirements
  const reqStudyItem = boardRef.current.querySelector('[data-item-id="dd1"]');
  const collabReqItem = boardRef.current.querySelector('[data-item-id="dd2"]');

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
  /// Verticical connection: Collaborates on Requirements to Data Engineering & Prep
  const collabReqItem3 = boardRef.current.querySelector('[data-item-id="dd2"]');
  const DEprepItem = boardRef.current.querySelector('[data-item-id="DEprep"]');

  if (collabReqItem3 && DEprepItem) {
    const collabRect = collabReqItem3.getBoundingClientRect();
    const DEprepRect = DEprepItem.getBoundingClientRect();
    const boardRect = boardRef.current.getBoundingClientRect();

    const collabColumn = collabReqItem3.closest(".kanban-column");

    if (collabColumn?.classList.contains("active")) {
      const startX = collabRect.left - boardRect.left + collabRect.width * 0.5;
      const startY = collabRect.bottom - boardRect.top;
      const endY = DEprepRect.top - boardRect.top - 3;

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

  /// Vertical connection: Data Engineering & Prep to Marathon Match
  const DEprepItem2 = boardRef.current.querySelector('[data-item-id="DEprep"]');
  const marathonMatchItem2 = boardRef.current.querySelector(
    '[data-item-id="marathonmatch"]'
  );

  if (DEprepItem2 && marathonMatchItem2) {
    const DEprepRect = DEprepItem2.getBoundingClientRect();
    const marathonRect = marathonMatchItem2.getBoundingClientRect();
    const boardRect = boardRef.current.getBoundingClientRect();

    const DEprepColumn = DEprepItem2.closest(".kanban-column");

    if (DEprepColumn?.classList.contains("active")) {
      const startX = DEprepRect.left - boardRect.left + DEprepRect.width * 0.5;
      const startY = DEprepRect.bottom - boardRect.top;
      const endY = marathonRect.top - boardRect.top - 3;

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

  // Connection: Write Specification to Collaborates on Requirements
  const writeSpecItem = boardRef.current.querySelector('[data-item-id="do2"]');
  const collabReqItem2 = boardRef.current.querySelector('[data-item-id="dd2"]');

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

  // Connection: Design Challenge to Challenge Posting
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
  ///Connection: Marathon Match and challenge posting
  const marathonMatchItem = boardRef.current.querySelector(
    '[data-item-id="marathonmatch"]'
  );
  const challengePostingItem2 = boardRef.current.querySelector(
    '[data-item-id="challengeposting"]'
  );

  if (marathonMatchItem && challengePostingItem2) {
    const marathonRect = marathonMatchItem.getBoundingClientRect();
    const postingRect = challengePostingItem2.getBoundingClientRect();
    const boardRect = boardRef.current.getBoundingClientRect();

    const marathonColumn = marathonMatchItem.closest(".kanban-column");
    const postingColumn = challengePostingItem2.closest(".kanban-column");

    if (
      marathonColumn?.classList.contains("active") &&
      postingColumn?.classList.contains("active")
    ) {
      newConnections.push({
        startX: marathonRect.right - boardRect.left + 2,
        startY: marathonRect.top - boardRect.top + marathonRect.height / 2,
        endX: postingRect.left - boardRect.left - 2,
        endY: postingRect.top - boardRect.top + postingRect.height / 2,
        isVertical: false,
        connectionType: "left-to-right",
      });
    }
  }

  ////////////////////////////////
  // Vertical connection: Challenge Posting to Notification
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

  /// Vertical connection: Challenge Posting and Notification on marathon match
  const challengePostingItem3 = boardRef.current.querySelector(
    '[data-item-id="challengeposting"]'
  );
  const notificationItem2 = boardRef.current.querySelector(
    '[data-item-id="notification"]'
  );

  if (challengePostingItem3 && notificationItem2) {
    const challengeRect = challengePostingItem3.getBoundingClientRect();
    const notifRect = notificationItem2.getBoundingClientRect();
    const boardRect = boardRef.current.getBoundingClientRect();

    const challengeColumn = challengePostingItem3.closest(".kanban-column");
    const notifColumn = notificationItem2.closest(".kanban-column");

    if (challengeColumn?.classList.contains("active")) {
      const startX =
        challengeRect.left - boardRect.left + challengeRect.width * 0.5;
      const startY = challengeRect.bottom - boardRect.top;
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
  // Connection: Notification to Join Challenge
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
  // Connection: Notification to Join Challenge on Marathon project
  const notifItem1 = boardRef.current.querySelector(
    '[data-item-id="notification"]'
  );
  const joinChallengeItem1 = boardRef.current.querySelector(
    '[data-item-id="joinchallenge"]'
  );

  if (notifItem1 && joinChallengeItem1) {
    const notifRect = notifItem1.getBoundingClientRect();
    const joinRect = joinChallengeItem1.getBoundingClientRect();
    const boardRect = boardRef.current.getBoundingClientRect();

    const notifColumn = notifItem1.closest(".kanban-column");
    const joinColumn = joinChallengeItem1.closest(".kanban-column");

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

  /// Connection: Submit Solution and Review Submition
  const submitSolutionItem = boardRef.current.querySelector(
    '[data-item-id="com4"]'
  );
  const reviewSubmitionItem = boardRef.current.querySelector(
    '[data-item-id="revs"]'
  );

  if (submitSolutionItem && reviewSubmitionItem) {
    const submitRect = submitSolutionItem.getBoundingClientRect();
    const reviewRect = reviewSubmitionItem.getBoundingClientRect();
    const boardRect = boardRef.current.getBoundingClientRect();

    const submitColumn = submitSolutionItem.closest(".kanban-column");
    const reviewColumn = reviewSubmitionItem.closest(".kanban-column");

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

  // Vertical connection: Join Challenge to Ask Question
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

  /// Vertical connection: Join Challenge to Ask Question on Marathon project
  const joinChallengeItem3 = boardRef.current.querySelector(
    '[data-item-id="joinchallenge"]'
  );
  const askQuestionItem1 = boardRef.current.querySelector(
    '[data-item-id="com2"]'
  );

  if (joinChallengeItem3 && askQuestionItem1) {
    const joinRect = joinChallengeItem3.getBoundingClientRect();
    const askRect = askQuestionItem1.getBoundingClientRect();
    const boardRect = boardRef.current.getBoundingClientRect();

    const joinColumn = joinChallengeItem3.closest(".kanban-column");

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

  // Vertical connections: Submit Solution to Get Feedback (top-down and bottom-up)
  const submitSolutionItem2 = boardRef.current.querySelector(
    '[data-item-id="com4"]'
  );
  const getFeedbackItem = boardRef.current.querySelector(
    '[data-item-id="fedback"]'
  );

  if (submitSolutionItem2 && getFeedbackItem) {
    const submitRect = submitSolutionItem2.getBoundingClientRect();
    const feedbackRect = getFeedbackItem.getBoundingClientRect();
    const boardRect = boardRef.current.getBoundingClientRect();

    const submitColumn = submitSolutionItem2.closest(".kanban-column");

    if (submitColumn?.classList.contains("active")) {
      const baseX = submitRect.left - boardRect.left + submitRect.width * 0.5;
      const gap = 60; // Horizontal gap to prevent overlap (adjust as needed)
      const submitBottomY = submitRect.bottom - boardRect.top;
      const feedbackTopY = feedbackRect.top - boardRect.top - 3;
      const feedbackBottomY = feedbackRect.bottom - boardRect.top;
      const submitTopY = submitRect.top - boardRect.top + 3;

      // Top-down connection (existing)
      newConnections.push({
        startX: baseX,
        startY: submitBottomY,
        endX: baseX,
        endY: feedbackTopY,
        isVertical: true,
        connectionType: "top-down",
      });

      // Bottom-up connection (new)
      newConnections.push({
        startX: baseX + gap,
        startY: feedbackBottomY - 70,
        endX: baseX + gap,
        endY: submitTopY + 70,
        isVertical: true,
        connectionType: "bottom-up",
      });
    }
  }

  /// Vertical connection: Review Submition to Score Submission
  const reviewSubmitionItem2 = boardRef.current.querySelector(
    '[data-item-id="revs"]'
  );
  const scoreSubmissionItem = boardRef.current.querySelector(
    '[data-item-id="score"]'
  );

  if (reviewSubmitionItem2 && scoreSubmissionItem) {
    const reviewRect = reviewSubmitionItem2.getBoundingClientRect();
    const scoreRect = scoreSubmissionItem.getBoundingClientRect();
    const boardRect = boardRef.current.getBoundingClientRect();

    const reviewColumn = reviewSubmitionItem2.closest(".kanban-column");

    if (reviewColumn?.classList.contains("active")) {
      const startX = reviewRect.left - boardRect.left + reviewRect.width * 0.5;
      const startY = reviewRect.bottom - boardRect.top;
      const endY = scoreRect.top - boardRect.top - 3;

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

  /// Vertical connection: Score Submission to Prepare Whitepaper
  const scoreSubmissionItem2 = boardRef.current.querySelector(
    '[data-item-id="score"]'
  );
  const prepareWhitepaperItem = boardRef.current.querySelector(
    '[data-item-id="reviewAccept"]'
  );

  if (scoreSubmissionItem2 && prepareWhitepaperItem) {
    const scoreRect = scoreSubmissionItem2.getBoundingClientRect();
    const prepareRect = prepareWhitepaperItem.getBoundingClientRect();
    const boardRect = boardRef.current.getBoundingClientRect();

    const scoreColumn = scoreSubmissionItem2.closest(".kanban-column");

    if (scoreColumn?.classList.contains("active")) {
      const startX = scoreRect.left - boardRect.left + scoreRect.width * 0.5;
      const startY = scoreRect.bottom - boardRect.top;
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

  /// Vertical connection: Final Review & Acceptance to Prepare Whitepaper
  const finalReviewAcceptItem = boardRef.current.querySelector(
    '[data-item-id="reviewAccept"]'
  );
  const prepareWhitepaperItem2 = boardRef.current.querySelector(
    '[data-item-id="prepare"]'
  );

  if (finalReviewAcceptItem && prepareWhitepaperItem2) {
    const finalRect = finalReviewAcceptItem.getBoundingClientRect();
    const prepareRect = prepareWhitepaperItem2.getBoundingClientRect();
    const boardRect = boardRef.current.getBoundingClientRect();

    const finalColumn = finalReviewAcceptItem.closest(".kanban-column");

    if (finalColumn?.classList.contains("active")) {
      const startX = finalRect.left - boardRect.left + finalRect.width * 0.5;
      const startY = finalRect.bottom - boardRect.top;
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

  // Vertical connection: Collaborates on Requirements to Design Challenge
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
      const startX = collabRect.left - boardRect.left + collabRect.width * 0.5;
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

  // Vertical connection: Team Allocation to Requirement Study
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
      // Start from the center of the bottom edge of endItem
      const startX = endRect.left + endRect.width / 2 - boardRect.left;
      const startY = endRect.bottom - boardRect.top;

      // End at the center of the right side of requirementItem
      const endX = reqRect.right - boardRect.left;
      const endY = reqRect.top + reqRect.height / 2 - boardRect.top;

      // Calculate midpoint for the elbow (vertical segment height)
      const midY = startY + 43.5; // Adjust this value to control elbow height

      // Create the elbow path: move down, then left
      const customPath = `M ${startX} ${startY} L ${startX} ${midY} L ${endX} ${midY} L ${endX} ${endY}`;

      newConnections.push({
        startX,
        startY,
        endX,
        endY,
        isVertical: true,
        connectionType: "right-to-left",
        customPath,
      });
    }
  }

  // Vertical connection: Ask Question to Documentation & Forum
  const askQuestionItem2 = boardRef.current.querySelector(
    '[data-item-id="com2"]'
  );
  const docForumItem = boardRef.current.querySelector('[data-item-id="com3"]');

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
  /// Vertical connection: Automated System Scoring to Final Review & Acceptance
  const autoScoreItem = boardRef.current.querySelector(
    '[data-item-id="autoScore"]'
  );
  const finalReviewAcceptItem3 = boardRef.current.querySelector(
    '[data-item-id="reviewAccept"]'
  );

  if (autoScoreItem && finalReviewAcceptItem3) {
    const autoScoreRect = autoScoreItem.getBoundingClientRect();
    const finalRect = finalReviewAcceptItem3.getBoundingClientRect();
    const boardRect = boardRef.current.getBoundingClientRect();

    const autoScoreColumn = autoScoreItem.closest(".kanban-column");

    if (autoScoreColumn?.classList.contains("active")) {
      const startX =
        autoScoreRect.left - boardRect.left + autoScoreRect.width * 0.5;
      const startY = autoScoreRect.bottom - boardRect.top;
      const endY = finalRect.top - boardRect.top - 3;

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

  // Bidirectional connection: Documentation & Forum (Delivery to Community)
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

  /// Bidirectional connection: Final Review & Acceptance (customer to review panel)
  const finalReviewAcceptItem2 = boardRef.current.querySelector(
    '[data-item-id="reviewAccept"]'
  );
  const customerReviewItemDev = boardRef.current.querySelector(
    '[data-item-id="reviewaccept"]'
  );

  if (finalReviewAcceptItem2 && customerReviewItemDev) {
    const finalRect = finalReviewAcceptItem2.getBoundingClientRect();
    const customerRect = customerReviewItemDev.getBoundingClientRect();
    const boardRect = boardRef.current.getBoundingClientRect();

    const finalColumn = finalReviewAcceptItem2.closest(".kanban-column");
    const customerColumn = customerReviewItemDev.closest(".kanban-column");

    if (
      finalColumn?.classList.contains("active") &&
      customerColumn?.classList.contains("active")
    ) {
      // forward connection (customer to review panel)
      newConnections.push({
        startX: customerRect.right - boardRect.left + 2,
        startY: customerRect.top - boardRect.top + customerRect.height / 2,
        endX: finalRect.left - boardRect.left - 2,
        endY: finalRect.top - boardRect.top + finalRect.height / 2,
        isVertical: false,
        connectionType: "left-to-right",
      });
      // backward connection (review panel to customer)
      newConnections.push({
        startX: finalRect.left - boardRect.left - 2,
        startY: finalRect.top - boardRect.top + finalRect.height / 2,
        endX: customerRect.right - boardRect.left + 2,
        endY: customerRect.top - boardRect.top + customerRect.height / 2,
        isVertical: false,
        connectionType: "right-to-left",
      });
    }
  }

  /// Bidirectional connection: Final Review & Acceptance (customer to review panel) on marathon project
  const finalReviewAcceptItemmarathon = boardRef.current.querySelector(
    '[data-item-id="reviewAccept"]'
  );
  const customerReviewItemmarathon = boardRef.current.querySelector(
    '[data-item-id="marathonreview"]'
  );

  if (finalReviewAcceptItemmarathon && customerReviewItemmarathon) {
    const finalRect = finalReviewAcceptItemmarathon.getBoundingClientRect();
    const customerRect = customerReviewItemmarathon.getBoundingClientRect();
    const boardRect = boardRef.current.getBoundingClientRect();

    const finalColumn = finalReviewAcceptItemmarathon.closest(".kanban-column");
    const customerColumn = customerReviewItemmarathon.closest(".kanban-column");

    if (
      finalColumn?.classList.contains("active") &&
      customerColumn?.classList.contains("active")
    ) {
      // forward connection (customer to review panel)
      newConnections.push({
        startX: customerRect.right - boardRect.left + 2,
        startY: customerRect.top - boardRect.top + customerRect.height / 2,
        endX: finalRect.left - boardRect.left - 2,
        endY: finalRect.top - boardRect.top + finalRect.height / 2,
        isVertical: false,
        connectionType: "left-to-right",
      });
      // backward connection (review panel to customer)
      newConnections.push({
        startX: finalRect.left - boardRect.left - 2,
        startY: finalRect.top - boardRect.top + finalRect.height / 2,
        endX: customerRect.right - boardRect.left + 2,
        endY: customerRect.top - boardRect.top + customerRect.height / 2,
        isVertical: false,
        connectionType: "right-to-left",
      });
    }
  }

  /// connection: feedback to automated system scoring
  const feedbackItemmarathon = boardRef.current.querySelector(
    '[data-item-id="fedback"]'
  );
  const autoScoreItemmarathon = boardRef.current.querySelector(
    '[data-item-id="autoScore"]'
  );

  if (feedbackItemmarathon && autoScoreItemmarathon) {
    const feedbackRect = feedbackItemmarathon.getBoundingClientRect();
    const autoScoreRect = autoScoreItemmarathon.getBoundingClientRect();
    const boardRect = boardRef.current.getBoundingClientRect();

    const feedbackColumn = feedbackItemmarathon.closest(".kanban-column");
    const autoScoreColumn = autoScoreItemmarathon.closest(".kanban-column");

    if (
      feedbackColumn?.classList.contains("active") &&
      autoScoreColumn?.classList.contains("active")
    ) {
      newConnections.push({
        startX: feedbackRect.right - boardRect.left + 2,
        startY: feedbackRect.top - boardRect.top + feedbackRect.height / 2,
        endX: autoScoreRect.left - boardRect.left - 2,
        endY: autoScoreRect.top - boardRect.top + autoScoreRect.height / 2,
        isVertical: false,
        connectionType: "left-to-right",
      });
    }
  }

  // Vertical connection: Documentation & Forum to Submit Round 1 Designs
  const docForumItem2 = boardRef.current.querySelector('[data-item-id="com3"]');
  const submitDesignsItem = boardRef.current.querySelector(
    '[data-item-id="com4"]'
  );

  if (docForumItem2 && submitDesignsItem) {
    const docRect = docForumItem2.getBoundingClientRect(); // Fixed typo
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

  // Connection: Submit Round 1 Designs to Review Round 1 Designs
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

  // Connection: Review Round 1 Designs (Review Panel to Customer)
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
      const startX = reviewRect.left - boardRect.left + reviewRect.width / 2;
      const startY = reviewRect.bottom - boardRect.top;
      const midY = startY + 40;

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

  // Connection: Customer's Review Round 1 Designs to Announce Round 1 Feedback
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

  // Connection: Announce Round 1 Feedback to Submit Round 2 Designs
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

  // Connection: Submit Round 2 Designs to Review Round 2 Designs
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

  // Connection: Review Round 2 Designs to Final Review and Select Winners
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
      const startX = reviewRect.left - boardRect.left + reviewRect.width / 2;
      const startY = reviewRect.bottom - boardRect.top;
      const midY = startY + 40;

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

  // Connection: Final Review and Select Winners to Announce Winners
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

  // Vertical connection: Announce Winners to Prepare Deliverables
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

  return newConnections; // Explicit return to satisfy TypeScript
};
