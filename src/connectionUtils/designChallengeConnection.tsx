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
  boardRef: React.RefObject<HTMLDivElement>,
  activeColumnId: ColumnType
): Connection[] => {
  if (!boardRef.current) return [];

  const newConnections: Connection[] = [];
  const COLUMN_ORDER: ColumnType[] = [
    "customer",
    "delivery",
    "operation",
    "community",
    "review",
  ];

  // Determine which columns are "active" for connections (up to activeColumnId)
  const activeColumnIndex = activeColumnId
    ? COLUMN_ORDER.indexOf(activeColumnId)
    : COLUMN_ORDER.length - 1; // Include all columns if null
  const activeColumns = COLUMN_ORDER.slice(0, activeColumnIndex + 1);

  // Helper function to check if an item’s column is in activeColumns
  const isColumnActiveForConnection = (item: Element | null) => {
    if (!item) return false;
    const column = item.closest(".kanban-column");
    if (!column) return false;
    const columnId = column.getAttribute("data-column-id") as ColumnType;
    return activeColumns.includes(columnId);
  };

  // Horizontal connection: Start Engagement to Team Allocation
  const startItem = boardRef.current.querySelector('[data-item-id="dc1"]');
  const endItem = boardRef.current.querySelector('[data-item-id="do1"]');

  if (
    startItem &&
    endItem &&
    isColumnActiveForConnection(startItem) &&
    isColumnActiveForConnection(endItem)
  ) {
    const startRect = startItem.getBoundingClientRect();
    const endRect = endItem.getBoundingClientRect();
    const boardRect = boardRef.current.getBoundingClientRect();

    newConnections.push({
      startX: startRect.right - boardRect.left,
      startY: startRect.top - boardRect.top + startRect.height / 2,
      endX: endRect.left - boardRect.left,
      endY: endRect.top - boardRect.top + endRect.height / 2,
      connectionType: "center-right",
    });
  }

  // Horizontal connection: Collaborates on Requirements (Customer to Delivery) left-to-right
  const collaborateCustomer = boardRef.current.querySelector(
    '[data-item-id="dc2"]'
  );
  const collaborateDelivery = boardRef.current.querySelector(
    '[data-item-id="dd2"]'
  );

  if (
    collaborateCustomer &&
    collaborateDelivery &&
    isColumnActiveForConnection(collaborateCustomer) &&
    isColumnActiveForConnection(collaborateDelivery)
  ) {
    const startRect = collaborateCustomer.getBoundingClientRect();
    const endRect = collaborateDelivery.getBoundingClientRect();
    const boardRect = boardRef.current.getBoundingClientRect();

    newConnections.push({
      startX: startRect.right - boardRect.left,
      startY: startRect.top - boardRect.top + startRect.height / 2,
      endX: endRect.left - boardRect.left,
      endY: endRect.top - boardRect.top + endRect.height / 2,
      isVertical: false,
      connectionType: "left-to-right",
    });
  }

  /// Horizontal connection: Collaborates on Requirements (delivery to customer) right-to-left
  const collaborateCustomer2 = boardRef.current.querySelector(
    '[data-item-id="dc2"]'
  );
  const collaborateDelivery2 = boardRef.current.querySelector(
    '[data-item-id="dd2"]'
  );

  if (
    collaborateDelivery2 &&
    collaborateCustomer2 &&
    isColumnActiveForConnection(collaborateDelivery2) &&
    isColumnActiveForConnection(collaborateCustomer2)
  ) {
    const startRect = collaborateDelivery2.getBoundingClientRect();
    const endRect = collaborateCustomer2.getBoundingClientRect();
    const boardRect = boardRef.current.getBoundingClientRect();

    newConnections.push({
      startX: startRect.left - boardRect.left - 2,
      startY: startRect.top - boardRect.top + startRect.height / 2,
      endX: endRect.right - boardRect.left + 2,
      endY: endRect.top - boardRect.top + endRect.height / 2,
      isVertical: false,
      connectionType: "right-to-left",
    });
  }

  // Vertical connection: Requirement Study to Collaborates on Requirements
  const reqStudyItem = boardRef.current.querySelector('[data-item-id="dd1"]');
  const collabReqItem = boardRef.current.querySelector('[data-item-id="dd2"]');

  if (
    reqStudyItem &&
    collabReqItem &&
    isColumnActiveForConnection(reqStudyItem)
  ) {
    const reqRect = reqStudyItem.getBoundingClientRect();
    const collabRect = collabReqItem.getBoundingClientRect();
    const boardRect = boardRef.current.getBoundingClientRect();

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

  // Vertical connection: Collaborates on Requirements to Data Engineering & Prep
  const collabReqItem3 = boardRef.current.querySelector('[data-item-id="dd2"]');
  const DEprepItem = boardRef.current.querySelector('[data-item-id="DEprep"]');

  if (
    collabReqItem3 &&
    DEprepItem &&
    isColumnActiveForConnection(collabReqItem3)
  ) {
    const collabRect = collabReqItem3.getBoundingClientRect();
    const DEprepRect = DEprepItem.getBoundingClientRect();
    const boardRect = boardRef.current.getBoundingClientRect();

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

  // Vertical connection: Data Engineering & Prep to Marathon Match
  const DEprepItem2 = boardRef.current.querySelector('[data-item-id="DEprep"]');
  const marathonMatchItem2 = boardRef.current.querySelector(
    '[data-item-id="marathonmatch"]'
  );

  if (
    DEprepItem2 &&
    marathonMatchItem2 &&
    isColumnActiveForConnection(DEprepItem2)
  ) {
    const DEprepRect = DEprepItem2.getBoundingClientRect();
    const marathonRect = marathonMatchItem2.getBoundingClientRect();
    const boardRect = boardRef.current.getBoundingClientRect();

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

  // Connection: Write Specification to Collaborates on Requirements
  const writeSpecItem = boardRef.current.querySelector('[data-item-id="do2"]');
  const collabReqItem2 = boardRef.current.querySelector('[data-item-id="dd2"]');

  if (
    writeSpecItem &&
    collabReqItem2 &&
    isColumnActiveForConnection(writeSpecItem) &&
    isColumnActiveForConnection(collabReqItem2)
  ) {
    const writeSpecRect = writeSpecItem.getBoundingClientRect();
    const collabRect = collabReqItem2.getBoundingClientRect();
    const boardRect = boardRef.current.getBoundingClientRect();
    //writeSpecRect
    //collabRect
    newConnections.push({
      startX: collabRect.right - boardRect.left + 2,
      startY: collabRect.top - boardRect.top + collabRect.height / 2,
      endX: writeSpecRect.left - boardRect.left - 2,
      endY: writeSpecRect.top - boardRect.top + writeSpecRect.height / 2,
      isVertical: false,
      connectionType: "left-to-right",
    });
  }

  // Connection: Design Challenge to Challenge Posting
  const designChallengeItem = boardRef.current.querySelector(
    '[data-item-id="dd3"]'
  );
  const challengePostingItem = boardRef.current.querySelector(
    '[data-item-id="do3"]'
  );

  if (
    designChallengeItem &&
    challengePostingItem &&
    isColumnActiveForConnection(designChallengeItem) &&
    isColumnActiveForConnection(challengePostingItem)
  ) {
    const designRect = designChallengeItem.getBoundingClientRect();
    const postingRect = challengePostingItem.getBoundingClientRect();
    const boardRect = boardRef.current.getBoundingClientRect();

    newConnections.push({
      startX: designRect.right - boardRect.left + 2,
      startY: designRect.top - boardRect.top + designRect.height / 2,
      endX: postingRect.left - boardRect.left - 2,
      endY: postingRect.top - boardRect.top + postingRect.height / 2,
      isVertical: false,
      connectionType: "left-to-right",
    });
  }

  // Connection: Marathon Match to Challenge Posting
  const marathonMatchItem = boardRef.current.querySelector(
    '[data-item-id="marathonmatch"]'
  );
  const challengePostingItem2 = boardRef.current.querySelector(
    '[data-item-id="challengeposting"]'
  );

  if (
    marathonMatchItem &&
    challengePostingItem2 &&
    isColumnActiveForConnection(marathonMatchItem) &&
    isColumnActiveForConnection(challengePostingItem2)
  ) {
    const marathonRect = marathonMatchItem.getBoundingClientRect();
    const postingRect = challengePostingItem2.getBoundingClientRect();
    const boardRect = boardRef.current.getBoundingClientRect();

    newConnections.push({
      startX: marathonRect.right - boardRect.left + 2,
      startY: marathonRect.top - boardRect.top + marathonRect.height / 2,
      endX: postingRect.left - boardRect.left - 2,
      endY: postingRect.top - boardRect.top + postingRect.height / 2,
      isVertical: false,
      connectionType: "left-to-right",
    });
  }

  // Vertical connection: Challenge Posting to Notification
  const postingItem = boardRef.current.querySelector('[data-item-id="do3"]');
  const notificationItem = boardRef.current.querySelector(
    '[data-item-id="do4"]'
  );

  if (
    postingItem &&
    notificationItem &&
    isColumnActiveForConnection(postingItem)
  ) {
    const postingRect = postingItem.getBoundingClientRect();
    const notifRect = notificationItem.getBoundingClientRect();
    const boardRect = boardRef.current.getBoundingClientRect();

    const startX = postingRect.left - boardRect.left + postingRect.width * 0.5;
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

  // Vertical connection: Challenge Posting to Notification (Marathon)
  const challengePostingItem3 = boardRef.current.querySelector(
    '[data-item-id="challengeposting"]'
  );
  const notificationItem2 = boardRef.current.querySelector(
    '[data-item-id="notification"]'
  );

  if (
    challengePostingItem3 &&
    notificationItem2 &&
    isColumnActiveForConnection(challengePostingItem3)
  ) {
    const challengeRect = challengePostingItem3.getBoundingClientRect();
    const notifRect = notificationItem2.getBoundingClientRect();
    const boardRect = boardRef.current.getBoundingClientRect();

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

  // Connection: Notification to Join Challenge
  const notifItem = boardRef.current.querySelector('[data-item-id="do4"]');
  const joinChallengeItem = boardRef.current.querySelector(
    '[data-item-id="com1"]'
  );

  if (
    notifItem &&
    joinChallengeItem &&
    isColumnActiveForConnection(notifItem) &&
    isColumnActiveForConnection(joinChallengeItem)
  ) {
    const notifRect = notifItem.getBoundingClientRect();
    const joinRect = joinChallengeItem.getBoundingClientRect();
    const boardRect = boardRef.current.getBoundingClientRect();

    newConnections.push({
      startX: notifRect.right - boardRect.left + 2,
      startY: notifRect.top - boardRect.top + notifRect.height / 2,
      endX: joinRect.left - boardRect.left - 2,
      endY: joinRect.top - boardRect.top + joinRect.height / 2,
      isVertical: false,
      connectionType: "left-to-right",
    });
  }

  // Connection: Notification to Join Challenge (Marathon)
  const notifItem1 = boardRef.current.querySelector(
    '[data-item-id="notification"]'
  );
  const joinChallengeItem1 = boardRef.current.querySelector(
    '[data-item-id="joinchallenge"]'
  );

  if (
    notifItem1 &&
    joinChallengeItem1 &&
    isColumnActiveForConnection(notifItem1) &&
    isColumnActiveForConnection(joinChallengeItem1)
  ) {
    const notifRect = notifItem1.getBoundingClientRect();
    const joinRect = joinChallengeItem1.getBoundingClientRect();
    const boardRect = boardRef.current.getBoundingClientRect();

    newConnections.push({
      startX: notifRect.right - boardRect.left + 2,
      startY: notifRect.top - boardRect.top + notifRect.height / 2,
      endX: joinRect.left - boardRect.left - 2,
      endY: joinRect.top - boardRect.top + joinRect.height / 2,
      isVertical: false,
      connectionType: "left-to-right",
    });
  }

  // Connection: Submit Solution to Review Submission
  const submitSolutionItem = boardRef.current.querySelector(
    '[data-item-id="com4"]'
  );
  const reviewSubmissionItem = boardRef.current.querySelector(
    '[data-item-id="revs"]'
  );

  if (
    submitSolutionItem &&
    reviewSubmissionItem &&
    isColumnActiveForConnection(submitSolutionItem) &&
    isColumnActiveForConnection(reviewSubmissionItem)
  ) {
    const submitRect = submitSolutionItem.getBoundingClientRect();
    const reviewRect = reviewSubmissionItem.getBoundingClientRect();
    const boardRect = boardRef.current.getBoundingClientRect();

    newConnections.push({
      startX: submitRect.right - boardRect.left + 2,
      startY: submitRect.top - boardRect.top + submitRect.height / 2,
      endX: reviewRect.left - boardRect.left - 2,
      endY: reviewRect.top - boardRect.top + reviewRect.height / 2,
      isVertical: false,
      connectionType: "left-to-right",
    });
  }

  // Vertical connection: Join Challenge to Ask Question
  const joinChallengeItem2 = boardRef.current.querySelector(
    '[data-item-id="com1"]'
  );
  const askQuestionItem = boardRef.current.querySelector(
    '[data-item-id="com2"]'
  );

  if (
    joinChallengeItem2 &&
    askQuestionItem &&
    isColumnActiveForConnection(joinChallengeItem2)
  ) {
    const joinRect = joinChallengeItem2.getBoundingClientRect();
    const askRect = askQuestionItem.getBoundingClientRect();
    const boardRect = boardRef.current.getBoundingClientRect();

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

  // Vertical connection: Join Challenge to Ask Question (Marathon)
  const joinChallengeItem3 = boardRef.current.querySelector(
    '[data-item-id="joinchallenge"]'
  );
  const askQuestionItem1 = boardRef.current.querySelector(
    '[data-item-id="com2"]'
  );

  if (
    joinChallengeItem3 &&
    askQuestionItem1 &&
    isColumnActiveForConnection(joinChallengeItem3)
  ) {
    const joinRect = joinChallengeItem3.getBoundingClientRect();
    const askRect = askQuestionItem1.getBoundingClientRect();
    const boardRect = boardRef.current.getBoundingClientRect();

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

  // Vertical connections: Submit Solution to Get Feedback (top-down and bottom-up)
  const submitSolutionItem2 = boardRef.current.querySelector(
    '[data-item-id="com4"]'
  );
  const getFeedbackItem = boardRef.current.querySelector(
    '[data-item-id="fedback"]'
  );

  if (
    submitSolutionItem2 &&
    getFeedbackItem &&
    isColumnActiveForConnection(submitSolutionItem2)
  ) {
    const submitRect = submitSolutionItem2.getBoundingClientRect();
    const feedbackRect = getFeedbackItem.getBoundingClientRect();
    const boardRect = boardRef.current.getBoundingClientRect();

    const baseX = submitRect.left - boardRect.left + submitRect.width * 0.5;
    const gap = 60;
    const submitBottomY = submitRect.bottom - boardRect.top;
    const feedbackTopY = feedbackRect.top - boardRect.top - 3;
    const feedbackBottomY = feedbackRect.bottom - boardRect.top;
    const submitTopY = submitRect.top - boardRect.top + 3;

    newConnections.push({
      startX: baseX,
      startY: submitBottomY,
      endX: baseX,
      endY: feedbackTopY,
      isVertical: true,
      connectionType: "top-down",
    });

    newConnections.push({
      startX: baseX + gap,
      startY: feedbackBottomY - 70,
      endX: baseX + gap,
      endY: submitTopY + 70,
      isVertical: true,
      connectionType: "bottom-up",
    });
  }

  // Vertical connection: Review Submission to Score Submission
  const reviewSubmissionItem2 = boardRef.current.querySelector(
    '[data-item-id="revs"]'
  );
  const scoreSubmissionItem = boardRef.current.querySelector(
    '[data-item-id="score"]'
  );

  if (
    reviewSubmissionItem2 &&
    scoreSubmissionItem &&
    isColumnActiveForConnection(reviewSubmissionItem2)
  ) {
    const reviewRect = reviewSubmissionItem2.getBoundingClientRect();
    const scoreRect = scoreSubmissionItem.getBoundingClientRect();
    const boardRect = boardRef.current.getBoundingClientRect();

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

  // Vertical connection: Score Submission to Prepare Whitepaper
  const scoreSubmissionItem2 = boardRef.current.querySelector(
    '[data-item-id="score"]'
  );
  const prepareWhitepaperItem = boardRef.current.querySelector(
    '[data-item-id="reviewAccept"]'
  );

  if (
    scoreSubmissionItem2 &&
    prepareWhitepaperItem &&
    isColumnActiveForConnection(scoreSubmissionItem2)
  ) {
    const scoreRect = scoreSubmissionItem2.getBoundingClientRect();
    const prepareRect = prepareWhitepaperItem.getBoundingClientRect();
    const boardRect = boardRef.current.getBoundingClientRect();

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

  // Vertical connection: Final Review & Acceptance to Prepare Whitepaper
  const finalReviewAcceptItem = boardRef.current.querySelector(
    '[data-item-id="reviewAccept"]'
  );
  const prepareWhitepaperItem2 = boardRef.current.querySelector(
    '[data-item-id="prepare"]'
  );

  if (
    finalReviewAcceptItem &&
    prepareWhitepaperItem2 &&
    isColumnActiveForConnection(finalReviewAcceptItem)
  ) {
    const finalRect = finalReviewAcceptItem.getBoundingClientRect();
    const prepareRect = prepareWhitepaperItem2.getBoundingClientRect();
    const boardRect = boardRef.current.getBoundingClientRect();

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

  // Vertical connection: Collaborates on Requirements to Design Challenge
  const collabReqDeliveryItem = boardRef.current.querySelector(
    '[data-item-id="dd2"]'
  );
  const designChallengeItem2 = boardRef.current.querySelector(
    '[data-item-id="dd3"]'
  );

  if (
    collabReqDeliveryItem &&
    designChallengeItem2 &&
    isColumnActiveForConnection(collabReqDeliveryItem)
  ) {
    const collabRect = collabReqDeliveryItem.getBoundingClientRect();
    const designRect = designChallengeItem2.getBoundingClientRect();
    const boardRect = boardRef.current.getBoundingClientRect();

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

  // Vertical connection: Team Allocation to Requirement Study
  const requirementItem = boardRef.current.querySelector(
    '[data-item-id="dd1"]'
  );
  if (
    endItem &&
    requirementItem &&
    isColumnActiveForConnection(endItem) &&
    isColumnActiveForConnection(requirementItem)
  ) {
    const endRect = endItem.getBoundingClientRect();
    const reqRect = requirementItem.getBoundingClientRect();
    const boardRect = boardRef.current.getBoundingClientRect();

    const startX = endRect.left + endRect.width / 2 - boardRect.left;
    const startY = endRect.bottom - boardRect.top;
    const endX = reqRect.right - boardRect.left;
    const endY = reqRect.top + reqRect.height / 2 - boardRect.top;
    const midY = startY + 43.5;

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

  // Vertical connection: Ask Question to Documentation & Forum
  const askQuestionItem2 = boardRef.current.querySelector(
    '[data-item-id="com2"]'
  );
  const docForumItem = boardRef.current.querySelector('[data-item-id="com3"]');

  if (
    askQuestionItem2 &&
    docForumItem &&
    isColumnActiveForConnection(askQuestionItem2)
  ) {
    const askRect = askQuestionItem2.getBoundingClientRect();
    const docRect = docForumItem.getBoundingClientRect();
    const boardRect = boardRef.current.getBoundingClientRect();

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

  // Vertical connection: Automated System Scoring to Final Review & Acceptance
  const autoScoreItem = boardRef.current.querySelector(
    '[data-item-id="autoScore"]'
  );
  const finalReviewAcceptItem3 = boardRef.current.querySelector(
    '[data-item-id="reviewAccept"]'
  );

  if (
    autoScoreItem &&
    finalReviewAcceptItem3 &&
    isColumnActiveForConnection(autoScoreItem)
  ) {
    const autoScoreRect = autoScoreItem.getBoundingClientRect();
    const finalRect = finalReviewAcceptItem3.getBoundingClientRect();
    const boardRect = boardRef.current.getBoundingClientRect();

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

  // Bidirectional connection: Documentation & Forum (Delivery to Community)
  const docForumDeliveryItem = boardRef.current.querySelector(
    '[data-item-id="dd4"]'
  );
  const docForumCommunityItem = boardRef.current.querySelector(
    '[data-item-id="com3"]'
  );

  if (
    docForumDeliveryItem &&
    docForumCommunityItem &&
    isColumnActiveForConnection(docForumDeliveryItem) &&
    isColumnActiveForConnection(docForumCommunityItem)
  ) {
    const deliveryRect = docForumDeliveryItem.getBoundingClientRect();
    const communityRect = docForumCommunityItem.getBoundingClientRect();
    const boardRect = boardRef.current.getBoundingClientRect();

    newConnections.push({
      startX: deliveryRect.right - boardRect.left + 2,
      startY: deliveryRect.top - boardRect.top + deliveryRect.height / 2,
      endX: communityRect.left - boardRect.left - 2,
      endY: communityRect.top - boardRect.top + communityRect.height / 2,
      isVertical: false,
      connectionType: "left-to-right",
    });

    newConnections.push({
      startX: communityRect.left - boardRect.left - 2,
      startY: communityRect.top - boardRect.top + communityRect.height / 2,
      endX: deliveryRect.right - boardRect.left + 2,
      endY: deliveryRect.top - boardRect.top + deliveryRect.height / 2,
      isVertical: false,
      connectionType: "right-to-left",
    });
  }

  // connection: Final Review & Acceptance (Customer to Review)
  const finalReviewAcceptItem2 = boardRef.current.querySelector(
    '[data-item-id="reviewAccept"]'
  );
  const customerReviewItemDev = boardRef.current.querySelector(
    '[data-item-id="reviewaccept"]'
  );

  if (
    finalReviewAcceptItem2 &&
    customerReviewItemDev &&
    isColumnActiveForConnection(finalReviewAcceptItem2) &&
    isColumnActiveForConnection(customerReviewItemDev)
  ) {
    const finalRect = finalReviewAcceptItem2.getBoundingClientRect();
    const customerRect = customerReviewItemDev.getBoundingClientRect();
    const boardRect = boardRef.current.getBoundingClientRect();

    newConnections.push({
      startX: customerRect.right - boardRect.left,
      startY: customerRect.top - boardRect.top + customerRect.height / 2,
      endX: finalRect.left - boardRect.left - 2,
      endY: finalRect.top - boardRect.top + finalRect.height / 2,
      isVertical: false,
      connectionType: "left-to-right",
    });
    newConnections.push({
      startX: finalRect.left - boardRect.left - 2,
      startY: finalRect.top - boardRect.top + finalRect.height / 2,
      endX: customerRect.right - boardRect.left + 2,
      endY: customerRect.top - boardRect.top + customerRect.height / 2,
      isVertical: false,
      connectionType: "right-to-left",
    });
  }

  // Bidirectional connection: Final Review & Acceptance (Customer  Marathon)
  const finalReviewAcceptItemMarathon = boardRef.current.querySelector(
    '[data-item-id="reviewAccept"]'
  );
  const customerReviewItemMarathon = boardRef.current.querySelector(
    '[data-item-id="marathonreview"]'
  );

  if (
    finalReviewAcceptItemMarathon &&
    customerReviewItemMarathon &&
    isColumnActiveForConnection(finalReviewAcceptItemMarathon) &&
    isColumnActiveForConnection(customerReviewItemMarathon)
  ) {
    const finalRect = finalReviewAcceptItemMarathon.getBoundingClientRect();
    const customerRect = customerReviewItemMarathon.getBoundingClientRect();
    const boardRect = boardRef.current.getBoundingClientRect();

    newConnections.push({
      startX: customerRect.right - boardRect.left,
      startY: customerRect.top - boardRect.top + customerRect.height / 2,
      endX: finalRect.left - boardRect.left - 2,
      endY: finalRect.top - boardRect.top + finalRect.height / 2,
      isVertical: false,
      connectionType: "left-to-right",
    });

    newConnections.push({
      startX: finalRect.left - boardRect.left - 2,
      startY: finalRect.top - boardRect.top + finalRect.height / 2,
      endX: customerRect.right - boardRect.left + 2,
      endY: customerRect.top - boardRect.top + customerRect.height / 2,
      isVertical: false,
      connectionType: "right-to-left",
    });
  }

  // Connection: Feedback to Automated System Scoring
  const feedbackItemMarathon = boardRef.current.querySelector(
    '[data-item-id="fedback"]'
  );
  const autoScoreItemMarathon = boardRef.current.querySelector(
    '[data-item-id="autoScore"]'
  );

  if (
    feedbackItemMarathon &&
    autoScoreItemMarathon &&
    isColumnActiveForConnection(feedbackItemMarathon) &&
    isColumnActiveForConnection(autoScoreItemMarathon)
  ) {
    const feedbackRect = feedbackItemMarathon.getBoundingClientRect();
    const autoScoreRect = autoScoreItemMarathon.getBoundingClientRect();
    const boardRect = boardRef.current.getBoundingClientRect();

    newConnections.push({
      startX: feedbackRect.right - boardRect.left + 2,
      startY: feedbackRect.top - boardRect.top + feedbackRect.height / 2,
      endX: autoScoreRect.left - boardRect.left - 2,
      endY: autoScoreRect.top - boardRect.top + autoScoreRect.height / 2,
      isVertical: false,
      connectionType: "left-to-right",
    });
  }

  // Vertical connection: Documentation & Forum to Submit Round 1 Designs
  const docForumItem2 = boardRef.current.querySelector('[data-item-id="com3"]');
  const submitDesignsItem = boardRef.current.querySelector(
    '[data-item-id="com4"]'
  );

  if (
    docForumItem2 &&
    submitDesignsItem &&
    isColumnActiveForConnection(docForumItem2)
  ) {
    const docRect = docForumItem2.getBoundingClientRect();
    const submitRect = submitDesignsItem.getBoundingClientRect();
    const boardRect = boardRef.current.getBoundingClientRect();

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

  // Connection: Submit Round 1 Designs to Review Round 1 Designs
  const submitDesignsItem2 = boardRef.current.querySelector(
    '[data-item-id="com4"]'
  );
  const reviewDesignsItem = boardRef.current.querySelector(
    '[data-item-id="rev1"]'
  );

  if (
    submitDesignsItem2 &&
    reviewDesignsItem &&
    isColumnActiveForConnection(submitDesignsItem2) &&
    isColumnActiveForConnection(reviewDesignsItem)
  ) {
    const submitRect = submitDesignsItem2.getBoundingClientRect();
    const reviewRect = reviewDesignsItem.getBoundingClientRect();
    const boardRect = boardRef.current.getBoundingClientRect();

    newConnections.push({
      startX: submitRect.right - boardRect.left + 2,
      startY: submitRect.top - boardRect.top + submitRect.height / 2,
      endX: reviewRect.left - boardRect.left - 2,
      endY: reviewRect.top - boardRect.top + reviewRect.height / 2,
      isVertical: false,
      connectionType: "left-to-right",
    });
  }

  // Connection: Final Review & Acceptance to Prepare Whitepaper
  const finalReviewAcceptItem5 = boardRef.current.querySelector(
    '[data-item-id="reviewacceptidea"]'
  );
  const prepareWhitepaperItem1 = boardRef.current.querySelector(
    '[data-item-id="prepareIdea"]'
  );

  if (
    finalReviewAcceptItem5 &&
    prepareWhitepaperItem1 &&
    isColumnActiveForConnection(finalReviewAcceptItem5) &&
    isColumnActiveForConnection(prepareWhitepaperItem1)
  ) {
    const finalRect = finalReviewAcceptItem5.getBoundingClientRect();
    const prepareRect = prepareWhitepaperItem1.getBoundingClientRect();
    const boardRect = boardRef.current.getBoundingClientRect();

    newConnections.push({
      startX: finalRect.right - boardRect.left + 2,
      startY: finalRect.top - boardRect.top + finalRect.height / 1.2,
      endX: prepareRect.left - boardRect.left - 2,
      endY: prepareRect.top - boardRect.top + prepareRect.height / 3.2,
      isVertical: false,
      connectionType: "left-to-right",
    });
  }

  // Connection: Review Round 1 Designs (Review Panel to Customer)
  const reviewDesignsItem2 = boardRef.current.querySelector(
    '[data-item-id="rev1"]'
  );
  const customerReviewItem = boardRef.current.querySelector(
    '[data-item-id="dc3"]'
  );

  if (
    reviewDesignsItem2 &&
    customerReviewItem &&
    isColumnActiveForConnection(reviewDesignsItem2) &&
    isColumnActiveForConnection(customerReviewItem)
  ) {
    const reviewRect = reviewDesignsItem2.getBoundingClientRect();
    const customerRect = customerReviewItem.getBoundingClientRect();
    const boardRect = boardRef.current.getBoundingClientRect();

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

  // Connection: Review Idea to Final Review & Acceptance
  const reviewIdeaItem2 = boardRef.current.querySelector(
    '[data-item-id="reviewIdea"]'
  );
  const finalReviewAcceptItem4 = boardRef.current.querySelector(
    '[data-item-id="reviewacceptidea"]'
  );

  if (
    reviewIdeaItem2 &&
    finalReviewAcceptItem4 &&
    isColumnActiveForConnection(reviewIdeaItem2) &&
    isColumnActiveForConnection(finalReviewAcceptItem4)
  ) {
    const reviewRect = reviewIdeaItem2.getBoundingClientRect();
    const finalRect = finalReviewAcceptItem4.getBoundingClientRect();
    const boardRect = boardRef.current.getBoundingClientRect();

    const startX = reviewRect.left - boardRect.left + reviewRect.width / 2.8;
    const startY = reviewRect.bottom - boardRect.top;
    const midY = startY + 130;

    newConnections.push({
      startX,
      startY,
      endX: finalRect.right - boardRect.left + 2,
      endY: midY,
      isVertical: false,
      connectionType: "right-to-left",
      customPath: `M ${startX} ${startY} L ${startX} ${midY} L ${
        finalRect.left - boardRect.left + 190
      } ${midY}`,
    });
  }

  // Connection: Customer's Review Round 1 Designs to Announce Round 1 Feedback
  const customerReviewItem2 = boardRef.current.querySelector(
    '[data-item-id="dc3"]'
  );
  const announceFeedbackItem = boardRef.current.querySelector(
    '[data-item-id="do5"]'
  );

  if (
    customerReviewItem2 &&
    announceFeedbackItem &&
    isColumnActiveForConnection(customerReviewItem2) &&
    isColumnActiveForConnection(announceFeedbackItem)
  ) {
    const customerRect = customerReviewItem2.getBoundingClientRect();
    const announceRect = announceFeedbackItem.getBoundingClientRect();
    const boardRect = boardRef.current.getBoundingClientRect();

    newConnections.push({
      startX: customerRect.left - boardRect.left + 189,
      startY: customerRect.top - boardRect.top + customerRect.height / 1.2,
      endX: announceRect.left - boardRect.left + 2,
      endY: announceRect.top - boardRect.top + announceRect.height / 2.3,
      isVertical: false,
      connectionType: "left-to-right",
    });
  }

  // Connection: Submit Solutions to Review Idea
  const submitIdeaItem = boardRef.current.querySelector(
    '[data-item-id="com4"]'
  );
  const reviewIdeaItem = boardRef.current.querySelector(
    '[data-item-id="reviewIdea"]'
  );

  if (
    submitIdeaItem &&
    reviewIdeaItem &&
    isColumnActiveForConnection(submitIdeaItem) &&
    isColumnActiveForConnection(reviewIdeaItem)
  ) {
    const submitRect = submitIdeaItem.getBoundingClientRect();
    const reviewRect = reviewIdeaItem.getBoundingClientRect();
    const boardRect = boardRef.current.getBoundingClientRect();

    newConnections.push({
      startX: submitRect.right - boardRect.left + 2,
      startY: submitRect.top - boardRect.top + submitRect.height / 2,
      endX: reviewRect.left - boardRect.left - 2,
      endY: reviewRect.top - boardRect.top + reviewRect.height / 2,
      isVertical: false,
      connectionType: "left-to-right",
    });
  }

  // Connection: Announce Round 1 Feedback to Submit Round 2 Designs
  const announceFeedbackItem2 = boardRef.current.querySelector(
    '[data-item-id="do5"]'
  );
  const submitRound2Item = boardRef.current.querySelector(
    '[data-item-id="com5"]'
  );

  if (
    announceFeedbackItem2 &&
    submitRound2Item &&
    isColumnActiveForConnection(announceFeedbackItem2) &&
    isColumnActiveForConnection(submitRound2Item)
  ) {
    const announceRect = announceFeedbackItem2.getBoundingClientRect();
    const submitRect = submitRound2Item.getBoundingClientRect();
    const boardRect = boardRef.current.getBoundingClientRect();

    newConnections.push({
      startX: announceRect.right - boardRect.left + 2,
      startY: announceRect.top - boardRect.top + announceRect.height / 2,
      endX: submitRect.left - boardRect.left - 2,
      endY: submitRect.top - boardRect.top + submitRect.height / 2,
      isVertical: false,
      connectionType: "left-to-right",
    });
  }

  // Connection: Submit Round 2 Designs to Review Round 2 Designs
  const submitRound2Item2 = boardRef.current.querySelector(
    '[data-item-id="com5"]'
  );
  const reviewRound2Item = boardRef.current.querySelector(
    '[data-item-id="rev2"]'
  );

  if (
    submitRound2Item2 &&
    reviewRound2Item &&
    isColumnActiveForConnection(submitRound2Item2) &&
    isColumnActiveForConnection(reviewRound2Item)
  ) {
    const submitRect = submitRound2Item2.getBoundingClientRect();
    const reviewRect = reviewRound2Item.getBoundingClientRect();
    const boardRect = boardRef.current.getBoundingClientRect();

    newConnections.push({
      startX: submitRect.right - boardRect.left + 2,
      startY: submitRect.top - boardRect.top + submitRect.height / 2,
      endX: reviewRect.left - boardRect.left - 2,
      endY: reviewRect.top - boardRect.top + reviewRect.height / 2,
      isVertical: false,
      connectionType: "left-to-right",
    });
  }

  // Connection: Review Round 2 Designs to Final Review and Select Winners
  const reviewRound2Item2 = boardRef.current.querySelector(
    '[data-item-id="rev2"]'
  );
  const finalReviewItem = boardRef.current.querySelector(
    '[data-item-id="dc4"]'
  );

  if (
    reviewRound2Item2 &&
    finalReviewItem &&
    isColumnActiveForConnection(reviewRound2Item2) &&
    isColumnActiveForConnection(finalReviewItem)
  ) {
    const reviewRect = reviewRound2Item2.getBoundingClientRect();
    const finalRect = finalReviewItem.getBoundingClientRect();
    const boardRect = boardRef.current.getBoundingClientRect();

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

  // Connection: Final Review and Select Winners to Announce Winners
  const finalReviewItem2 = boardRef.current.querySelector(
    '[data-item-id="dc4"]'
  );
  const announceWinnersItem = boardRef.current.querySelector(
    '[data-item-id="do6"]'
  );

  if (
    finalReviewItem2 &&
    announceWinnersItem &&
    isColumnActiveForConnection(finalReviewItem2) &&
    isColumnActiveForConnection(announceWinnersItem)
  ) {
    const finalRect = finalReviewItem2.getBoundingClientRect();
    const announceRect = announceWinnersItem.getBoundingClientRect();
    const boardRect = boardRef.current.getBoundingClientRect();

    newConnections.push({
      startX: finalRect.left - boardRect.left + 189,
      startY: finalRect.top - boardRect.top + finalRect.height / 1.3,
      endX: announceRect.left - boardRect.left - 2,
      endY: announceRect.top - boardRect.top + announceRect.height / 2.3,
      isVertical: false,
      connectionType: "left-to-right",
    });
  }

  // Vertical connection: Announce Winners to Prepare Deliverables
  const announceWinnersItem2 = boardRef.current.querySelector(
    '[data-item-id="do6"]'
  );
  const prepareDeliverablesItem = boardRef.current.querySelector(
    '[data-item-id="do7"]'
  );

  if (
    announceWinnersItem2 &&
    prepareDeliverablesItem &&
    isColumnActiveForConnection(announceWinnersItem2)
  ) {
    const announceRect = announceWinnersItem2.getBoundingClientRect();
    const prepareRect = prepareDeliverablesItem.getBoundingClientRect();
    const boardRect = boardRef.current.getBoundingClientRect();

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

  return newConnections;
};
