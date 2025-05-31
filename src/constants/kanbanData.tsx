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
            tooltip:
              "NASA worked closely with Topcoder to define user needs, interface goals, and required features.",
            connectedTo: ["dd2"],
            position: "both",
            verticalPosition: 1,
            isVerticalConnection: false,
          },
          {
            id: "dc3",
            title: "Review Round 1 Designs",
            icon: "/assets/icons/customer.png",
            tooltip:
              "NASA reviewed the initial design submissions and provided detailed feedback to guide refinement.",
            verticalPosition: 2,
            connectedTo: ["rev1", "do5"],
            position: "both",
          },
          {
            id: "dc4",
            title: "Final Review and Select Winners",
            icon: "/assets/icons/customer.png",
            tooltip:
              "NASA conducted a final review of all submissions and selected the best designs based on usability, alignment with requirements, and visual quality.",
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
            title: "Requirement & Feasible Study",
            icon: "/assets/icons/topcoder.png",
            tooltip:
              "Topcoder analyzed NASA’s requirements and confirmed that the redesign was feasible with available tools and timelines.",
            connectedTo: "do1",
            position: "end",
            isVerticalConnection: true,
            verticalPosition: 0,
          },
          {
            id: "dd2",
            title: "Collaborates on Requirements",
            icon: "/assets/icons/topcoder.png",
            tooltip:
              "A Topcoder copilot and project manager worked with NASA to turn initial ideas into actionable design tasks and clear design goals.",
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
            tooltip:
              "A design challenge was launched to crowdsource interface ideas for NASA’s control station.",
            verticalPosition: 2,
            connectedTo: ["do3", "dd2"],
            position: "both",
            isVerticalConnection: true,
          },
          {
            id: "dd4",
            title: "Documentation & forums",
            icon: "/assets/icons/topcoder.png",
            tooltip:
              "Provided design briefs, references, and support to help designers align with NASA's vision.",
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
            tooltip:
              "Topcoder assigned a copilot and project manager to manage challenge delivery and quality.",
            connectedTo: ["dc1", "dd1"],
            position: "both",
            verticalConnectionTarget: "dd1",
            verticalPosition: 0,
          },
          {
            id: "do2",
            title: "Write Specifications",
            icon: "/assets/icons/specification.svg",
            tooltip:
              "Detailed specs were written for layout, components, interactions, and design constraints.",
            connectedTo: "dd2",
            position: "end",
            verticalPosition: 1,
          },
          {
            id: "do3",
            title: "Challenge Posting",
            icon: "/assets/icons/challengePosting.png",
            tooltip:
              "The design challenge was published on the Topcoder platform for the global design community.",
            verticalPosition: 2,
            connectedTo: ["dd3", "do4"],
            position: "both",
            verticalConnectionTarget: "do4",
          },
          {
            id: "do4",
            title: "Notification",
            icon: "/assets/icons/notification.svg",
            tooltip:
              "The Topcoder community was notified via emails, platform alerts, and social media posts.",
            verticalPosition: 3,
            connectedTo: ["do3", "com1"],
            position: "both",
            isVerticalConnection: true,
          },
          {
            id: "do5",
            title: "Announce Round 1 Feedback",
            icon: "/assets/icons/AnounceRounde1.svg",
            tooltip: "",
            verticalPosition: 4,
            connectedTo: "rev1",
            position: "end",
          },
          {
            id: "do6",
            title: "Announce Winners",
            icon: "/assets/icons/Anouncewinner.svg",
            tooltip:
              "Winning designs were announced to the community and finalists.",
            verticalPosition: 5,
            connectedTo: "dc4",
            position: "end",
          },
          {
            id: "do7",
            title: "Prepare Deliverables",
            icon: "/assets/icons/prepareDeliverable.svg",
            tooltip:
              "Topcoder prepared final design assets and packaged deliverables for NASA’s internal use.",
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
            tooltip:
              "Designers joined to contribute creative UI/UX solutions aligned with NASA’s needs.",
            verticalPosition: 0,
            connectedTo: "do4",
            position: "end",
          },
          {
            id: "com2",
            title: "Ask questions",
            icon: "/assets/icons/askquestion.svg",
            tooltip:
              "Participants asked questions in the forum to clarify functionality, visuals, or design scope.",
            verticalPosition: 1,
            connectedTo: ["com1", "com3"],
            position: "both",
            isVerticalConnection: true,
            verticalConnectionTarget: "com3",
          },
          {
            id: "com3",
            title: "Documentation & forums",
            icon: "/assets/icons/documentationAndForum.svg",
            tooltip:
              "Used shared documents, reference images, and the forum to guide and validate design directions.",
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
            icon: "/assets/icons/submitRound1Design.svg",
            tooltip:
              "Designers submitted their initial concepts for review based on challenge requirements.",
            verticalPosition: 3,
            connectedTo: ["com3", "rev1"],
            position: "both",
            isVerticalConnection: true,
          },
          {
            id: "com5",
            title: "Submit Round 2 Designs",
            icon: "/assets/icons/submitRound1Design.svg",
            tooltip:
              "Refined versions of the designs were submitted, incorporating feedback from Round 1.",
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
            icon: "/assets/icons/reviewRound.svg",
            tooltip:
              "Initial designs were evaluated for layout clarity, feature coverage, adherence to specifications, and overall user experience—including usability, accessibility, and intuitive navigation.",
            verticalPosition: 0,
            connectedTo: ["com4", "dc3"],
            position: "both",
          },
          {
            id: "rev2",
            title: "Review Round 2 Designs",
            icon: "/assets/icons/reviewRound.svg",
            tooltip:
              "Final designs were reviewed by experts to select winners based on design quality and alignment with NASA's goals.",
            verticalPosition: 1,
            connectedTo: "com5",
            position: "end",
          },
        ],
      },
    ],
    description:
      "NASA set out to redesign its drone control station with a sharper focus on usability, safety, and efficiency. Through a series of Topcoder design challenges, they explored innovative interface solutions to support real-time flight tracking, emergency handling, and multi-drone operations. Here's how the Topcoder workflows of project and challenge management led to success:",
  },
  // Add similar data structure for other challenge types
  devChallenge: {
    columns: [
      {
        id: "customer",
        title: "Customer",
        icon: "/assets/icons/devCustomer.svg",
        items: [
          {
            id: "dc1",
            title: "Start Engagement",
            icon: "/assets/icons/devCustomer.svg",
            tooltip:
              "T-Mobile engaged Topcoder to build custom JIRA-based dashboards to enhance agile team visibility.",
            connectedTo: "do1",
            position: "start",
            verticalPosition: 0,
          },
          {
            id: "dc2",
            title: "Collaborates on Requirements",
            icon: "/assets/icons/devCustomer.svg",
            tooltip:
              "T-Mobile worked with Topcoder to define dashboard metrics, data sources, and user flows.",
            connectedTo: ["dd2"],
            position: "both",
            verticalPosition: 1,
            isVerticalConnection: false,
          },
          {
            id: "reviewaccept",
            title: "Final Review & Acceptance",
            icon: "/assets/icons/devCustomer.svg",
            tooltip:
              "T-Mobile reviewed the final implementation and approved the solution after verifying all deliverables.",
            verticalPosition: 6,
            connectedTo: "reviewAccept",
            position: "both",
            isBidirectional: true,
          },
        ],
      },
      {
        id: "delivery",
        title: "Topcoder Delivery",
        icon: "./assets/icons/topcoder.png",
        items: [
          {
            id: "dd1",
            title: "Requirement & Feasible Study",
            icon: "/assets/icons/topcoder.png",
            tooltip:
              "Topcoder assessed the feasibility of integrating JIRA APIs and building interactive dashboards.",
            connectedTo: "do1",
            position: "end",
            isVerticalConnection: true,
            verticalPosition: 0,
          },
          {
            id: "dd2",
            title: "Collaborates on Requirements",
            icon: "/assets/icons/topcoder.png",
            tooltip:
              "Worked closely with T-Mobile to align feature requirements with user needs and technical constraints.",
            connectedTo: ["dc2", "do2", "dd3"],
            position: "both",
            verticalPosition: 1,
            isVerticalConnection: false,
            verticalConnectionTarget: "dd3",
          },
          {
            id: "dd3",
            title: "Development Challenge",
            icon: "/assets/icons/topcoder.png",
            tooltip:
              "Topcoder launched a development challenge to implement real-time dashboards with filters, charts, and custom views.",
            verticalPosition: 2,
            connectedTo: ["do3", "dd2"],
            position: "both",
            isVerticalConnection: true,
          },
          {
            id: "dd4",
            title: "Documentation & forums",
            icon: "/assets/icons/topcoder.png",
            tooltip:
              "Challenge included detailed docs and dedicated forums to support participants and answer questions.",
            verticalPosition: 3,
            connectedTo: "com3",
            position: "both",
            isBidirectional: true,
          },
        ],
      },
      {
        id: "operation",
        title: "platform",
        icon: "/assets/icons/platform.svg",
        items: [
          {
            id: "do1",
            title: "Team Allocation",
            icon: "/assets/icons/teamAllocation.svg",
            tooltip:
              "A delivery team including PM, copilot and a technical reviewer was assigned to support the challenge lifecycle.",
            connectedTo: ["dc1", "dd1"],
            position: "both",
            verticalConnectionTarget: "dd1",
            verticalPosition: 0,
          },
          {
            id: "do2",
            title: "Write Specifications",
            icon: "/assets/icons/specification.svg",
            tooltip:
              "Created detailed specifications including API usage, chart requirements, and expected outputs.",
            connectedTo: "dd2",
            position: "end",
            verticalPosition: 1,
          },
          {
            id: "do3",
            title: "Challenge Posting",
            icon: "/assets/icons/challengePosting.png",
            tooltip:
              "Published the development challenge on Topcoder’s platform for global talent participation.",
            verticalPosition: 2,
            connectedTo: ["dd3", "do4"],
            position: "both",
            verticalConnectionTarget: "do4",
          },
          {
            id: "do4",
            title: "Notification",
            icon: "/assets/icons/notification.svg",
            tooltip:
              "The Topcoder community was notified via emails, platform alerts, and social media posts.",
            verticalPosition: 3,
            connectedTo: ["do3", "com1"],
            position: "both",
            isVerticalConnection: true,
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
            tooltip:
              "Developers joined to build dashboard features using JavaScript, JIRA APIs, and D3.js.",
            verticalPosition: 0,
            connectedTo: "do4",
            position: "end",
          },
          {
            id: "com2",
            title: "Ask questions",
            icon: "/assets/icons/askquestion.svg",
            tooltip:
              "Participants used forums to ask technical questions and get clarifications from the copilot.",
            verticalPosition: 1,
            connectedTo: ["com1", "com3"],
            position: "both",
            isVerticalConnection: true,
            verticalConnectionTarget: "com3",
          },
          {
            id: "com3",
            title: "Documentation & forums",
            icon: "/assets/icons/documentationAndForum.svg",
            tooltip:
              "Resources included API docs, dataset examples, and UI/UX guidelines for implementation.",
            verticalPosition: 2,
            connectedTo: ["com2", "dd4", "com4"],
            position: "both",
            isVerticalConnection: true,
            isBidirectional: true,
            verticalConnectionTarget: "com4",
          },
          {
            id: "com4",
            title: "Submit Solutions",
            icon: "/assets/icons/submitRound1Design.svg",
            tooltip:
              "Final submissions included working code, deployment instructions, and documentation.",
            verticalPosition: 3,
            connectedTo: ["com3", "rev1"],
            position: "both",
            isVerticalConnection: true,
          },
        ],
      },
      {
        id: "review",
        title: "Review Panel",
        icon: "/assets/icons/review.svg",
        items: [
          {
            id: "revs",
            title: "Review Submissions",
            icon: "/assets/icons/reviewRound.svg",
            tooltip:
              "Topcoder staff and technical experts reviewed solutions for functionality, completeness, and UI alignment.",
            verticalPosition: 0,
            connectedTo: "com4",
            position: "end",
          },
          {
            id: "score",
            title: "Score Submissions",
            icon: "/assets/icons/scoreSubmission.svg",
            tooltip:
              "Submissions were scored on integration quality, chart interactivity, and adherence to specs.",
            verticalPosition: 1,
            connectedTo: ["revs", "reviewAccept"],
            position: "both",
            isVerticalConnection: true,
            verticalConnectionTarget: "reviewAccept",
          },
          {
            id: "reviewAccept",
            title: "Final Review & Acceptance",
            icon: "/assets/icons/finalReview.svg",
            tooltip:
              "Top solutions were validated and delivered for final customer approval.",
            verticalPosition: 2,
            connectedTo: ["score", "dd4", "prepare"],
            position: "both",
            isVerticalConnection: true,
            isBidirectional: true,
            verticalConnectionTarget: "prepare",
          },
          {
            id: "prepare",
            title: "Prepare Whitepapers",
            icon: "/assets/icons/prepareWhitepaper.svg",
            tooltip:
              "Winning solutions were documented in whitepapers describing implementation and future recommendations.",
            verticalPosition: 3,
            connectedTo: "rev2",
            isVerticalConnection: true,
            position: "end",
          },
        ],
      },
    ],
    description:
      "T-Mobile needed a better way to track and visualize performance across their agile development teams by building metrics-based dashboards integrated with JIRA to drive efficiency and alignment. They partnered with Topcoder to crowdsource the solution and accelerate delivery. Here's how the Topcoder workflows of project and challenge management led to success:",
  },

  qaChallenge: {
    columns: [
      {
        id: "customer",
        title: "Customer",
        icon: "/assets/icons/qaCustomer.svg",
        items: [
          {
            id: "dc1",
            title: "Start Engagement",
            icon: "/assets/icons/qaCustomer.svg",
            tooltip:
              "Microsoft engaged Topcoder to improve testing velocity through global crowdsourced QA.",
            connectedTo: "do1",
            position: "start",
            verticalPosition: 0,
          },
          {
            id: "dc2",
            title: "Collaborates on Requirements",
            icon: "/assets/icons/qaCustomer.svg",
            tooltip:
              "Microsoft and Topcoder collaborated to define goals for weekly regression and in-the-wild testing.",
            connectedTo: ["dd2"],
            position: "both",
            verticalPosition: 1,
            isVerticalConnection: false,
          },
          {
            id: "reviewaccept",
            title: "Final Review & Acceptance",
            icon: "/assets/icons/qaCustomer.svg",
            tooltip:
              "Topcoder assessed testing needs, proposed a recurring challenge model, and scoped deliverables.",
            verticalPosition: 6,
            connectedTo: "reviewAccept",
            position: "both",
            isBidirectional: true,
          },
        ],
      },
      {
        id: "delivery",
        title: "Topcoder Delivery",
        icon: "./assets/icons/topcoder.png",
        items: [
          {
            id: "dd1",
            title: "Requirement & Feasible Study",
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
            tooltip:
              "Worked closely with Microsoft to finalize testing workflows, platforms, and reporting expectations.",
            connectedTo: ["dc2", "do2", "dd3"],
            position: "both",
            verticalPosition: 1,
            isVerticalConnection: false,
            verticalConnectionTarget: "dd3",
          },
          {
            id: "dd3",
            title: "QA Challenge",
            icon: "/assets/icons/topcoder.png",
            tooltip:
              "The QA challenge was launched to execute both structured regression and exploratory testing.",
            verticalPosition: 2,
            connectedTo: ["do3", "dd2"],
            position: "both",
            isVerticalConnection: true,
          },
          {
            id: "dd4",
            title: "Documentation & forums",
            icon: "/assets/icons/topcoder.png",
            tooltip:
              "Provided test plans, device targets, and QA templates; opened forums for participant support.",
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
            tooltip:
              "Assigned a copilot and QA manager to coordinate logistics, guide testers, and ensure quality results.",
            connectedTo: ["dc1", "dd1"],
            position: "both",
            verticalConnectionTarget: "dd1",
            verticalPosition: 0,
          },
          {
            id: "do2",
            title: "Write Specifications",
            icon: "/assets/icons/specification.svg",
            tooltip:
              "Wrote detailed testing instructions, device/browser coverage needs, and reporting formats.",
            connectedTo: "dd2",
            position: "end",
            verticalPosition: 1,
          },
          {
            id: "do3",
            title: "Challenge Posting",
            icon: "/assets/icons/challengePosting.png",
            tooltip:
              "Published the QA challenge on the platform to recruit global testers.",
            verticalPosition: 2,
            connectedTo: ["dd3", "do4"],
            position: "both",
            verticalConnectionTarget: "do4",
          },
          {
            id: "do4",
            title: "Notification",
            icon: "/assets/icons/notification.svg",
            tooltip:
              "The Topcoder community was notified via emails, platform alerts, and social media posts.",
            verticalPosition: 3,
            connectedTo: ["do3", "com1"],
            position: "both",
            isVerticalConnection: true,
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
            tooltip:
              "QA experts across regions joined to participate in the scheduled test cycles.",
            verticalPosition: 0,
            connectedTo: "do4",
            position: "end",
          },
          {
            id: "com2",
            title: "Ask questions",
            icon: "/assets/icons/askquestion.svg",
            tooltip:
              "Testers used the forum to clarify requirements and edge cases with the challenge manager.",
            verticalPosition: 1,
            connectedTo: ["com1", "com3"],
            position: "both",
            isVerticalConnection: true,
            verticalConnectionTarget: "com3",
          },
          {
            id: "com3",
            title: "Documentation & forums",
            icon: "/assets/icons/documentationAndForum.svg",
            tooltip:
              "Accessed bug reporting formats, environment setup instructions, and discussion threads.",
            verticalPosition: 2,
            connectedTo: ["com2", "dd4", "com4"],
            position: "both",
            isVerticalConnection: true,
            isBidirectional: true,
            verticalConnectionTarget: "com4",
          },
          {
            id: "com4",
            title: "Submit Solutions",
            icon: "/assets/icons/submitRound1Design.svg",
            tooltip:
              "Participants submitted detailed test reports, defect logs, and screenshots/videos of findings.",
            verticalPosition: 3,
            connectedTo: ["com3", "rev1"],
            position: "both",
            isVerticalConnection: true,
          },
        ],
      },
      {
        id: "review",
        title: "Review Panel",
        icon: "/assets/icons/review.svg",
        items: [
          {
            id: "revs",
            title: "Review Submissions",
            icon: "/assets/icons/reviewRound.svg",
            tooltip:
              "Topcoder staff and Microsoft QA reviewers verified and evaluated submitted bug reports.",
            verticalPosition: 0,
            connectedTo: "com4",
            position: "end",
          },
          {
            id: "score",
            title: "Score Submissions",
            icon: "/assets/icons/scoreSubmission.svg",
            tooltip:
              "Defects were scored based on severity, reproducibility, and relevance to the test scope.",
            verticalPosition: 1,
            connectedTo: ["revs", "reviewAccept"],
            position: "both",
            isVerticalConnection: true,
            verticalConnectionTarget: "reviewAccept",
          },
          {
            id: "reviewAccept",
            title: "Final Review & Acceptance",
            icon: "/assets/icons/finalReview.svg",
            tooltip:
              "Final shortlist of validated issues was approved and prioritized by Microsoft.",
            verticalPosition: 2,
            connectedTo: ["score", "dd4", "prepare"],
            position: "both",
            isVerticalConnection: true,
            isBidirectional: true,
            verticalConnectionTarget: "prepare",
          },
          {
            id: "prepare",
            title: "Prepare Whitepapers",
            icon: "/assets/icons/prepareWhitepaper.svg",
            tooltip:
              "Top submissions were summarized in QA reports and whitepapers for Microsoft’s internal use.",
            verticalPosition: 3,
            connectedTo: "rev2",
            isVerticalConnection: true,
            position: "end",
          },
        ],
      },
    ],
    description:
      "Microsoft Teams needed a way to match their rapid 7-day release cycle with equally fast, global QA testing. By turning to Topcoder, they unlocked the power of crowdsourced testing to scale quality assurance across geographies, devices, and OS environments. Here's how the Topcoder workflows of project and challenge management led to success:",
  },
  marathonMatch: {
    columns: [
      {
        id: "customer",
        title: "Customer",
        icon: "/assets/icons/marathonCustomer.svg",
        items: [
          {
            id: "dc1",
            title: "Start Engagement",
            icon: "/assets/icons/marathonCustomer.svg",
            tooltip:
              "Harvard Medical School reached out to Topcoder with their project requirements to improve tumor detection.",
            connectedTo: "do1",
            position: "start",
            verticalPosition: 0,
          },
          {
            id: "dc2",
            title: "Collaborates on Requirements",
            icon: "/assets/icons/marathonCustomer.svg",
            tooltip:
              "Customer and Topcoder delivery team work together to gather detailed requirements and define project goals.",
            connectedTo: ["dd2"],
            position: "both",
            verticalPosition: 1,
            isVerticalConnection: false,
          },
          {
            id: "marathonreview",
            title: "Final Review & Acceptance",
            icon: "/assets/icons/marathonCustomer.svg",
            tooltip:
              "Harvard reviewed all deliverables and granted final acceptance after thorough testing and documentation.",
            verticalPosition: 6,
            connectedTo: "reviewAccept",
            position: "both",
            isBidirectional: true,
          },
        ],
      },
      {
        id: "delivery",
        title: "Topcoder Delivery",
        icon: "./assets/icons/topcoder.png",
        items: [
          {
            id: "dd1",
            title: "Requirement & Feasible Study",
            icon: "/assets/icons/topcoder.png",
            tooltip:
              "Topcoder conducted a feasibility study with the copilot to assess project viability and direction.",
            connectedTo: "do1",
            position: "end",
            isVerticalConnection: true,
            verticalPosition: 0,
          },
          {
            id: "dd2",
            title: "Collaborates on Requirements",
            icon: "/assets/icons/topcoder.png",
            tooltip:
              "Worked closely with Harvard to refine problem statements and define clear challenge goals. \nThe Topcoder team identified and proposed three distinct challenges to address the problem:\nChallenge One: Locate the tumor and trace it.\nChallenge Two: Improve therapeutic trace.\nChallenge Three: An invite-only challenge for final enhancement and fixes.",
            connectedTo: ["dc2", "do2", "DEprep"],
            position: "both",
            verticalPosition: 1,
            isVerticalConnection: false,
            verticalConnectionTarget: "dd3",
          },
          {
            id: "DEprep",
            title: "Data Engineering & Prep",
            icon: "/assets/icons/topcoder.png",
            tooltip:
              "Prepared datasets and cleaned data to ensure it was usable for the challenge participants.",
            verticalPosition: 2,
            connectedTo: ["dd2", "dd4"],
            isVerticalConnection: true,
          },
          {
            id: "marathonmatch",
            title: "Marathon Match",
            icon: "/assets/icons/topcoder.png",
            tooltip:
              "Topcoder designed and launched three distinct challenges to solve different parts of the problem.",
            verticalPosition: 2,
            connectedTo: ["challengeposting", "DEprep"],
            position: "both",
            isVerticalConnection: true,
          },
          {
            id: "dd4",
            title: "Documentation & forums",
            icon: "/assets/icons/topcoder.png",
            tooltip:
              "Created supporting documentation and set up forums to guide participants and answer questions.",
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
            tooltip:
              "A dedicated team, including a copilot and project manager, was assigned to manage the challenge.",
            connectedTo: ["dc1", "dd1"],
            position: "both",
            verticalConnectionTarget: "dd1",
            verticalPosition: 0,
          },
          {
            id: "do2",
            title: "Write Specifications",
            icon: "/assets/icons/specification.svg",
            tooltip:
              "Challenge specs were created by the copilot to outline objectives, rules, datasets, and scoring details.",
            connectedTo: "dd2",
            position: "end",
            verticalPosition: 1,
          },
          {
            id: "challengeposting",
            title: "Challenge Posting",
            icon: "/assets/icons/challengePosting.png",
            tooltip:
              "Challenges were published on the Topcoder platform and made available to the global community.",
            verticalPosition: 2,
            connectedTo: ["marathonmatch", "notification"],
            position: "both",
            verticalConnectionTarget: "notification",
          },
          {
            id: "notification",
            title: "Notification",
            icon: "/assets/icons/notification.svg",
            tooltip:
              "The Topcoder community was notified via emails, platform alerts, and social media posts.",
            verticalPosition: 3,
            connectedTo: ["challengeposting", "joinchallenge"],
            position: "both",
            isVerticalConnection: true,
          },
        ],
      },
      {
        id: "community",
        title: "Community",
        icon: "/assets/icons/community.svg",
        items: [
          {
            id: "joinchallenge",
            title: "Join Challenge",
            icon: "/assets/icons/community.svg",
            tooltip:
              "Members decided to join based on their expertise and interest in the problem.",
            verticalPosition: 0,
            connectedTo: "do4",
            position: "end",
          },
          {
            id: "com2",
            title: "Ask questions",
            icon: "/assets/icons/askquestion.svg",
            tooltip:
              "Participants asked questions in forums or communicated directly with project managers.",
            verticalPosition: 1,
          },
          {
            id: "com3",
            title: "Documentation & forums",
            icon: "/assets/icons/documentationAndForum.svg",
            tooltip:
              "Forums and documentation helped participants understand the challenge and data context.",
            verticalPosition: 2,
            connectedTo: ["com2", "dd4", "com4"],
            position: "both",
            isVerticalConnection: true,
            isBidirectional: true,
            verticalConnectionTarget: "com4",
          },
          {
            id: "com4",
            title: "Submit Solutions",
            icon: "/assets/icons/submitRound1Design.svg",
            tooltip:
              "Participants submitted algorithms, code, and documentation as part of their final entries.",
            verticalPosition: 3,
            connectedTo: ["com3", "fedback"],
            position: "both",
            isVerticalConnection: true,
            verticalConnectionTarget: "fedback",
          },
          {
            id: "fedback",
            title: "Get Feedback",
            icon: "/assets/icons/feedback.svg",
            tooltip:
              "Real-time scoring enabled participants to test and improve solutions before the deadline.",
            verticalPosition: 4,
            connectedTo: ["com4", "review"],
            position: "both",
            isVerticalConnection: true,
            verticalConnectionTarget: "review",
          },
        ],
      },
      {
        id: "review",
        title: "Review Panel",
        icon: "/assets/icons/review.svg",
        items: [
          {
            id: "autoScore",
            title: "Automated System Scoring",
            icon: "/assets/icons/autoScore.svg",
            tooltip:
              "Solutions were scored using an automated system for immediate feedback. ",
          },
          {
            id: "reviewAccept",
            title: "Final Review & Acceptance",
            icon: "/assets/icons/finalReview.svg",
            tooltip:
              "A panel of Topcoder and external experts reviewed the top submissions.",
            verticalPosition: 2,
            connectedTo: ["score", "dd4", "prepare"],
            position: "both",
            isVerticalConnection: true,
            isBidirectional: true,
            verticalConnectionTarget: "prepare",
          },
          {
            id: "prepare",
            title: "Prepare Whitepapers",
            icon: "/assets/icons/prepareWhitepaper.svg",
            tooltip:
              "Winners submitted whitepapers detailing their algorithms, which were shared with Harvard.",
            verticalPosition: 3,
            connectedTo: "rev2",
            isVerticalConnection: true,
            position: "end",
          },
        ],
      },
    ],
    description:
      "Harvard Medical School faced a significant challenge: identifying tumors in medical images with greater accuracy and efficiency. They turned to Topcoder to leverage the power of crowdsourcing and innovative solutions. Here's how the Topcoder workflows of project and challenge management led to success:",
  },
  ideationChallenge: {
    columns: [
      {
        id: "customer",
        title: "Customer",
        icon: "/assets/icons/ideation.svg",
        items: [
          {
            id: "dc1",
            title: "Start Engagement",
            icon: "/assets/icons/ideation.svg",
            tooltip:
              "Estée Lauder engaged Topcoder to explore inclusive technology solutions for the beauty industry.",
            connectedTo: "do1",
            position: "start",
            verticalPosition: 0,
          },
          {
            id: "dc2",
            title: "Collaborates on Requirements",
            icon: "/assets/icons/ideation.svg",
            tooltip:
              "Customer and Topcoder delivery team work together to define goals, focus areas, and expectations for accessible beauty solutions.",
            connectedTo: ["dd2"],
            position: "both",
            verticalPosition: 1,
            isVerticalConnection: false,
          },
          {
            id: "reviewacceptidea",
            title: "Final Review & Acceptance",
            icon: "/assets/icons/ideation.svg",
            tooltip:
              "Estée Lauder reviewed the submissions, approved selected ideas, and finalized project handover.",
            verticalPosition: 6,
            connectedTo: "reviewAccept",
            position: "both",
            isBidirectional: true,
          },
        ],
      },
      {
        id: "delivery",
        title: "Topcoder Delivery",
        icon: "./assets/icons/topcoder.png",
        items: [
          {
            id: "dd1",
            title: "Requirement & Feasible Study",
            icon: "/assets/icons/topcoder.png",
            tooltip:
              "Topcoder assessed project feasibility, refined scope, and validated challenge structure for ideation goals.",
            connectedTo: "do1",
            position: "end",
            isVerticalConnection: true,
            verticalPosition: 0,
          },
          {
            id: "dd2",
            title: "Collaborates on Requirements",
            icon: "/assets/icons/topcoder.png",
            tooltip:
              "Partnered with Estée Lauder to shape challenge themes, judging criteria, and submission guidelines.",
            connectedTo: ["dc2", "do2", "dd3"],
            position: "both",
            verticalPosition: 1,
            isVerticalConnection: false,
            verticalConnectionTarget: "dd3",
          },
          {
            id: "dd3",
            title: "Ideation Challenge",
            icon: "/assets/icons/topcoder.png",
            tooltip:
              "Launched the challenge to crowdsource ideas for inclusive beauty technology solutions.",
            verticalPosition: 2,
            connectedTo: ["do3", "dd2"],
            position: "both",
            isVerticalConnection: true,
          },
          {
            id: "dd4",
            title: "Documentation & forums",
            icon: "/assets/icons/topcoder.png",
            tooltip:
              "Created supporting documentation and set up forums to guide participants and answer questions.",
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
            tooltip:
              "A dedicated team, including a copilot and project manager, was assigned to manage the challenge.",
            connectedTo: ["dc1", "dd1"],
            position: "both",
            verticalConnectionTarget: "dd1",
            verticalPosition: 0,
          },
          {
            id: "do2",
            title: "Write Specifications",
            icon: "/assets/icons/specification.svg",
            tooltip:
              "Challenge specs were created by the copilot to outline objectives, rules and scoring details.",
            connectedTo: "dd2",
            position: "end",
            verticalPosition: 1,
          },
          {
            id: "do3",
            title: "Challenge Posting",
            icon: "/assets/icons/challengePosting.png",
            tooltip:
              "Challenges were published on the Topcoder platform and made available to the global community.",
            verticalPosition: 2,
            connectedTo: ["dd3", "do4"],
            position: "both",
            verticalConnectionTarget: "do4",
          },
          {
            id: "do4",
            title: "Notification",
            icon: "/assets/icons/notification.svg",
            tooltip:
              "The Topcoder community was notified via emails, platform alerts, and social media posts.",
            verticalPosition: 3,
            connectedTo: ["do3", "com1"],
            position: "both",
            isVerticalConnection: true,
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
            tooltip:
              "Members decided to join based on their expertise and interest in the problem.",
            verticalPosition: 0,
            connectedTo: "do4",
            position: "end",
          },
          {
            id: "com2",
            title: "Ask questions",
            icon: "/assets/icons/askquestion.svg",
            tooltip:
              "Participants asked questions in forums or communicated directly with project managers.",
            verticalPosition: 1,
            connectedTo: ["com1", "com3"],
            position: "both",
            isVerticalConnection: true,
            verticalConnectionTarget: "com3",
          },
          {
            id: "com3",
            title: "Documentation & forums",
            icon: "/assets/icons/documentationAndForum.svg",
            tooltip:
              "Forums and documentation helped participants understand the challenge and data context.",
            verticalPosition: 2,
            connectedTo: ["com2", "dd4", "com4"],
            position: "both",
            isVerticalConnection: true,
            isBidirectional: true,
            verticalConnectionTarget: "com4",
          },
          {
            id: "com4",
            title: "Submit Ideas",
            icon: "/assets/icons/submitRound1Design.svg",
            tooltip:
              "Participants submitted their final ideas in the form of detailed documents.",
            verticalPosition: 3,
            connectedTo: ["com3", "rev1"],
            position: "both",
            isVerticalConnection: true,
          },
        ],
      },
      {
        id: "review",
        title: "Review Panel",
        icon: "/assets/icons/review.svg",
        items: [
          {
            id: "reviewIdea",
            title: "Review Ideas",
            icon: "/assets/icons/reviewRound.svg",
            tooltip: "A panel of Topcoder experts reviewed the submissions.",
          },
          {
            id: "prepareIdea",
            title: "Prepare Whitepapers",
            icon: "/assets/icons/prepareWhitepaper.svg",
            tooltip:
              "Winners submitted whitepapers detailing their ideas, which were shared with Estée Lauder.",
            verticalPosition: 3,
          },
        ],
      },
    ],
    description:
      "Estée Lauder set out to make beauty more accessible for the 1.3 billion people worldwide living with disabilities. Through Topcoder, they launched an ideation challenge to crowdsource inclusive tech solutions that could transform the beauty experience for everyone. Here's how the Topcoder workflows of project and challenge management led to success:",
  },
};
