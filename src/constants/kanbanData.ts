import { KanbanData } from "../types/KanbanTypes";

export const KANBAN_DATA: KanbanData = {
  designChallenge: {
    columns: [
      {
        id: "customer",
        title: "Customer",
        icon: "/assets/icons/customer.png",
        items: [
          {
            id: "dc1",
            title: "Start Engagement",
            icon: "/assets/icons/customer.png",
            tooltip:
              "NASA initiated the project with Topcoder to redesign its drone control interface for safety and usability.",
            connectedTo: "do1",
            position: "start",
            verticalPosition: 0,
          },
          {
            id: "dc2",
            title: "Collaborates on Requirements",
            icon: "/assets/icons/customer.png",
            tooltip: "Customer collaborates on project requirements",
            connectedTo: ["dd2"],
            position: "both",
            verticalPosition: 1,
            isVerticalConnection: false,
          },
          {
            id: "dc3",
            title: "Review Round 1 Designs",
            icon: "/assets/icons/customer.png",
            tooltip: "Customer reviews initial design submissions",
            verticalPosition: 2,
            connectedTo: ["rev1", "do5"],
            position: "both",
          },
          {
            id: "dc4",
            title: "Final Review and Select Winners",
            icon: "/assets/icons/customer.png",
            tooltip: "Customer reviews final submissions and selects winners",
            verticalPosition: 3,
            connectedTo: "rev2",
            position: "end",
          },
        ],
      },
      {
        id: "delivery",
        title: "Topcoder Delivery",
        icon: "/assets/icons/topcoder.png",
        items: [
          {
            id: "dd1",
            title: "Requirement and Feasible Study",
            icon: "/assets/icons/topcoder.png",
            tooltip: "Analyze requirements and conduct feasibility study",
            connectedTo: "do1",
            position: "end",
            isVerticalConnection: true,
            verticalPosition: 0,
          },
          {
            id: "dd2",
            title: "Collaborates on Requirements",
            icon: "/assets/icons/topcoder.png",
            tooltip: "Topcoder team collaborates on requirements",
            connectedTo: ["dc2", "do2", "dd3"],
            position: "both",
            verticalPosition: 1,
            isVerticalConnection: false,
            verticalConnectionTarget: "dd3",
          },
          {
            id: "dd3",
            title: "Design Challenge",
            icon: "/assets/icons/topcoder.png",
            tooltip: "Create and manage design challenge",
            verticalPosition: 2,
            connectedTo: ["do3", "dd2"],
            position: "both",
            isVerticalConnection: true,
          },
          {
            id: "dd4",
            title: "Documentation & forum",
            icon: "/assets/icons/topcoder.png",
            tooltip: "Create and manage documentation and forum content",
            verticalPosition: 3,
            connectedTo: "com3",
            position: "both",
            isBidirectional: true,
          },
        ],
      },
      {
        id: "operation",
        title: "Platform",
        icon: "/assets/icons/platform.svg",
        items: [
          {
            id: "do1",
            title: "Team Allocation",
            icon: "/assets/icons/teamAllocation.svg",
            tooltip: "Operations team assigns resources",
            connectedTo: ["dc1", "dd1"],
            position: "both",
            verticalConnectionTarget: "dd1",
            verticalPosition: 0,
          },
          {
            id: "do2",
            title: "Write Specification",
            icon: "/assets/icons/platform.svg",
            tooltip: "Platform team writes detailed specifications",
            connectedTo: "dd2",
            position: "end",
            verticalPosition: 1,
          },
          {
            id: "do3",
            title: "Challenge Posting",
            icon: "/assets/icons/platform.svg",
            tooltip: "Post the challenge on the platform",
            verticalPosition: 2,
            connectedTo: ["dd3", "do4"],
            position: "both",
            verticalConnectionTarget: "do4",
          },
          {
            id: "do4",
            title: "Notification",
            icon: "/assets/icons/platform.svg",
            tooltip: "Send notifications to relevant stakeholders",
            verticalPosition: 3,
            connectedTo: ["do3", "com1"],
            position: "both",
            isVerticalConnection: true,
          },
          {
            id: "do5",
            title: "Announce Round 1 Feedback",
            icon: "/assets/icons/platform.svg",
            tooltip: "Announce the feedback from Round 1 design reviews",
            verticalPosition: 4,
            connectedTo: "rev1",
            position: "end",
          },
          {
            id: "do6",
            title: "Announce Winners",
            icon: "/assets/icons/platform.svg",
            tooltip: "Announce the winners of the design challenge",
            verticalPosition: 5,
            connectedTo: "dc4",
            position: "end",
          },
          {
            id: "do7",
            title: "Prepare Deliverables",
            icon: "/assets/icons/platform.svg",
            tooltip: "Prepare and package final design deliverables",
            verticalPosition: 6,
            connectedTo: "do6",
            position: "end",
          },
        ],
      },
      {
        id: "community",
        title: "Community",
        icon: "/assets/icons/community.svg",
        items: [
          {
            id: "com1",
            title: "Join Challenge",
            icon: "/assets/icons/community.svg",
            tooltip: "Community members join the challenge",
            verticalPosition: 0,
            connectedTo: "do4",
            position: "end",
          },
          {
            id: "com2",
            title: "Ask question",
            icon: "/assets/icons/community.svg",
            tooltip: "Community members can ask questions about the challenge",
            verticalPosition: 1,
            connectedTo: ["com1", "com3"],
            position: "both",
            isVerticalConnection: true,
            verticalConnectionTarget: "com3",
          },
          {
            id: "com3",
            title: "Documentation & forum",
            icon: "/assets/icons/community.svg",
            tooltip:
              "Access documentation and participate in forum discussions",
            verticalPosition: 2,
            connectedTo: ["com2", "dd4", "com4"],
            position: "both",
            isVerticalConnection: true,
            isBidirectional: true,
            verticalConnectionTarget: "com4",
          },
          {
            id: "com4",
            title: "Submit Round 1 Designs",
            icon: "/assets/icons/community.svg",
            tooltip: "Community members submit their initial design proposals",
            verticalPosition: 3,
            connectedTo: ["com3", "rev1"],
            position: "both",
            isVerticalConnection: true,
          },
          {
            id: "com5",
            title: "Submit Round 2 Designs",
            icon: "/assets/icons/community.svg",
            tooltip: "Community members submit their revised design proposals",
            verticalPosition: 4,
            connectedTo: "do5",
            position: "end",
          },
        ],
      },
      {
        id: "review",
        title: "Review Panel",
        icon: "/assets/icons/review.svg",
        items: [
          {
            id: "rev1",
            title: "Review Round 1 Designs",
            icon: "/assets/icons/review.svg",
            tooltip: "Review panel evaluates initial design submissions",
            verticalPosition: 0,
            connectedTo: ["com4", "dc3"],
            position: "both",
          },
          {
            id: "rev2",
            title: "Review Round 2 Designs",
            icon: "/assets/icons/review.svg",
            tooltip: "Review panel evaluates revised design submissions",
            verticalPosition: 1,
            connectedTo: "com5",
            position: "end",
          },
        ],
      },
    ],
    description:
      "Transform your ideas into stunning visual designs with our design challenge.",
  },
  // Add similar data structure for other challenge types
  devChallenge: {
    columns: [
      {
        id: "customer",
        title: "Customer",
        icon: "/assets/icons/customer.svg",
        items: [
          {
            id: "devc1",
            title: "Technical Requirements",
            tooltip:
              "Customer provides technical requirements and specifications",
          },
        ],
      },
      {
        id: "delivery",
        title: "Delivery Platform",
        icon: "./assets/icons/topcoder.png",
        items: [
          {
            id: "devd1",
            title: "Tech Stack Review",
            tooltip: "Platform team reviews technology requirements",
          },
        ],
      },
      {
        id: "operation",
        title: "Operation",
        icon: "/assets/icons/platform.svg",
        items: [
          {
            id: "devo1",
            title: "Developer Assignment",
            tooltip: "Operations team assigns developers",
          },
        ],
      },
      {
        id: "community",
        title: "Community",
        icon: "/assets/icons/community.svg",
        items: [
          {
            id: "devcom1",
            title: "Developer Selection",
            tooltip: "Community developers submit their proposals",
          },
        ],
      },
      {
        id: "review",
        title: "Review Panel",
        icon: "/assets/icons/review.svg",
        items: [
          {
            id: "devr1",
            title: "Code Review",
            tooltip: "Panel reviews and evaluates code submissions",
          },
        ],
      },
    ],
    description: "Build robust solutions with our development challenges.",
  },

  qaChallenge: {
    columns: [
      {
        id: "customer",
        title: "Customer",
        icon: "/assets/icons/customer.svg",
        items: [
          {
            id: "devc1",
            title: "Technical Requirements",
            tooltip:
              "Customer provides technical requirements and specifications",
          },
        ],
      },
      {
        id: "delivery",
        title: "Delivery Platform",
        icon: "./assets/icons/topcoder.png",
        items: [
          {
            id: "devd1",
            title: "Tech Stack Review",
            tooltip: "Platform team reviews technology requirements",
          },
        ],
      },
      {
        id: "operation",
        title: "Operation",
        icon: "/assets/icons/platform.svg",
        items: [
          {
            id: "devo1",
            title: "Developer Assignment",
            tooltip: "Operations team assigns developers",
          },
        ],
      },
      {
        id: "community",
        title: "Community",
        icon: "/assets/icons/community.svg",
        items: [
          {
            id: "devcom1",
            title: "Developer Selection",
            tooltip: "Community developers submit their proposals",
          },
        ],
      },
      {
        id: "review",
        title: "Review Panel",
        icon: "/assets/icons/review.svg",
        items: [
          {
            id: "devr1",
            title: "Code Review",
            tooltip: "Panel reviews and evaluates code submissions",
          },
        ],
      },
    ],
    description: "Build robust solutions with our development challenges.",
  },
  marathonMatch: {
    columns: [
      {
        id: "customer",
        title: "Customer",
        icon: "/assets/icons/customer.svg",
        items: [
          {
            id: "devc1",
            title: "Technical Requirements",
            tooltip:
              "Customer provides technical requirements and specifications",
          },
        ],
      },
      {
        id: "delivery",
        title: "Delivery Platform",
        icon: "./assets/icons/topcoder.png",
        items: [
          {
            id: "devd1",
            title: "Tech Stack Review",
            tooltip: "Platform team reviews technology requirements",
          },
        ],
      },
      {
        id: "operation",
        title: "Operation",
        icon: "/assets/icons/platform.svg",
        items: [
          {
            id: "devo1",
            title: "Developer Assignment",
            tooltip: "Operations team assigns developers",
          },
        ],
      },
      {
        id: "community",
        title: "Community",
        icon: "/assets/icons/community.svg",
        items: [
          {
            id: "devcom1",
            title: "Developer Selection",
            tooltip: "Community developers submit their proposals",
          },
        ],
      },
      {
        id: "review",
        title: "Review Panel",
        icon: "/assets/icons/review.svg",
        items: [
          {
            id: "devr1",
            title: "Code Review",
            tooltip: "Panel reviews and evaluates code submissions",
          },
        ],
      },
    ],
    description: "Build robust solutions with our development challenges.",
  },
  ideationChallenge: {
    columns: [
      {
        id: "customer",
        title: "Customer",
        icon: "/assets/icons/customer.svg",
        items: [
          {
            id: "devc1",
            title: "Technical Requirements",
            tooltip:
              "Customer provides technical requirements and specifications",
          },
        ],
      },
      {
        id: "delivery",
        title: "Delivery Platform",
        icon: "./assets/icons/topcoder.png",
        items: [
          {
            id: "devd1",
            title: "Tech Stack Review",
            tooltip: "Platform team reviews technology requirements",
          },
        ],
      },
      {
        id: "operation",
        title: "Operation",
        icon: "/assets/icons/platform.svg",
        items: [
          {
            id: "devo1",
            title: "Developer Assignment",
            tooltip: "Operations team assigns developers",
          },
        ],
      },
      {
        id: "community",
        title: "Community",
        icon: "/assets/icons/community.svg",
        items: [
          {
            id: "devcom1",
            title: "Developer Selection",
            tooltip: "Community developers submit their proposals",
          },
        ],
      },
      {
        id: "review",
        title: "Review Panel",
        icon: "/assets/icons/review.svg",
        items: [
          {
            id: "devr1",
            title: "Code Review",
            tooltip: "Panel reviews and evaluates code submissions",
          },
        ],
      },
    ],
    description: "Build robust solutions with our development challenges.",
  },
};
