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
            tooltip: "Begin customer engagement process",
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
            connectedTo: ["dc2", "do2"],
            position: "both",
            verticalPosition: 1,
            isVerticalConnection: false,
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
            verticalPosition: 2,
          },
        ],
      },
      {
        id: "community",
        title: "Community",
        icon: "/assets/icons/community.svg",
        items: [], // Empty items
      },
      {
        id: "review",
        title: "Review Panel",
        icon: "/assets/icons/review.svg",
        items: [], // Empty items
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
