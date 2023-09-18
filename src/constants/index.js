import {
  mobile,
  backend,
  creator,
  web,
  javascript,
  typescript,
  html,
  css,
  reactjs,
  nodejs,
  git,
  figma,
  premiere,
  ae,
  docker,
  photoshop,
  illustrator,
  meta,
  starbucks,
  tesla,
  shopify,
  carrent,
  jobit,
  tripguide,
} from "../assets";

export const navLinks = [
  {
    id: "about",
    title: "About",
  },
  {
    id: "work",
    title: "Work",
  },
  {
    id: "contact",
    title: "Contact",
  },
];

const services = [
  {
    title: "Web Developer",
    icon: web,
  },
  {
    title: "Product Designer",
    icon: mobile,
  },
  {
    title: "Prompt Engineer",
    icon: backend,
  },
  {
    title: "Visual Designer",
    icon: creator,
  },
];

const technologies = [
  {
    name: "HTML 5",
    icon: html,
  },
  {
    name: "CSS 3",
    icon: css,
  },
  {
    name: "JavaScript",
    icon: javascript,
  },
  {
    name: "TypeScript",
    icon: typescript,
  },
  {
    name: "React JS",
    icon: reactjs,
  },
  {
    name: "Node JS",
    icon: nodejs,
  },
  {
    name: "git",
    icon: git,
  },
  {
    name: "figma",
    icon: figma,
  },
  {
    name: "docker",
    icon: docker,
  },
  {
    name: "Photoshop",
    icon: photoshop,
  },
  {
    name: "After Effects",
    icon: ae,
  },
  {
    name: "Illustrator",
    icon: illustrator,
  },
  {
    name: "Premiere",
    icon: premiere,
  },
];

const experiences = [
  {
    title: "Senior UX Engineer",
    company_name: "CloudFit Software",
    icon: starbucks,
    iconBg: "#383E56",
    date: "Apr 2019 - Current",
    points: [
      "Developing and designing web applications using React.js and other related technologies.",
      "Collaborating with cross-functional teams including designers, product managers, and other developers to create high-quality products.",
      "Implementing responsive design and ensuring cross-browser compatibility.",
      "Delivering breath taking user experiences.",
    ],
  },
  {
    title: "Area Director",
    company_name: "Young Life",
    icon: tesla,
    iconBg: "#E6DEDD",
    date: "Oct 2014 - Apr 2018",
    points: [
      "Founded and Directed a local non-profit chapter",
      "Used UX design principles to fundraise digitally",
      "Mentored youth, committee members, volunteers, donors, and staff",
      "Hired staff, recruited volunteers, and managed committees.",
    ],
  },
  {
    title: "Founder & CEO",
    company_name: "Kizuka Technologies",
    icon: shopify,
    iconBg: "#E6DEDD",
    date: "Nov 2012 - Nov 2014",
    points: [
      "Provided visual, web, UX, and UI design services to companies",
      "UX design and research roles at Microsoft, conducted user research, developed mockups, and presented redesigns to stakeholders",
      "Devleoped a fan engagement web app for the Seahawks",
      "founded Ikos, a Homeless Solution Web App, winning an award for it and being featured in GeekWire",
    ],
  },
  {
    title: "Inventory Control Specialist",
    company_name: "Apple",
    icon: meta,
    iconBg: "#E6DEDD",
    date: "Sep 2007 - Sep 2009",
    points: [
      "Ensured accurate and up-to-date inventory levels for Apple products through regular audits.",
      "Monitored the quality of incoming inventory, addressing issues to uphold Apple's high product standards.",
      "Continuously improved inventory management processes, implementing efficiency enhancements.",
      "Utilized advanced inventory tracking systems to maintain accurate records and track product movements.",
    ],
  },
];

const testimonials = [
  {
    testimonial:
      "Brandon does high-quality work with great care and creativity. His excellence and efficiency are off the charts!",
    name: "Ben Malcolmson",
    designation: "Director",
    company: "Trinity Capital",
    image: "https://i.imgur.com/m7yLiox.jpg",
  },
  {
    testimonial:
      "Brandon created an excellent user experience for my start up. He is extremely good at understanding what the users want.",
    name: "Clint Gresham",
    designation: "Founder",
    company: "CG Speaks",
    image: "https://i.imgur.com/QGsSS4v.jpg",
  },
];

const projects = [
  {
    name: "CloudFit Software",
    description:
      "Cutting-edge website tailored to our cloud software company, offering a seamless digital hub for users to explore, deploy, and oversee our suite of cloud-based solutions, simplifying their technological endeavors.",
    tags: [
      {
        name: "JavaScript",
        color: "blue-text-gradient",
      },
      {
        name: "HTML",
        color: "green-text-gradient",
      },
      {
        name: "CSS",
        color: "pink-text-gradient",
      },
    ],
    image: carrent,
    source_code_link: "https://cloudfitsoftware.com/",
  },
  {
    name: "Sector 7 Contracting",
    description:
      "A web-based platform for a landscaping contracting business, empowering users to effortlessly explore, hire, and oversee landscaping services from a diverse range of professionals, offering an accessible.",
    tags: [
      {
        name: "Javascript",
        color: "blue-text-gradient",
      },
      {
        name: "CSS",
        color: "green-text-gradient",
      },
      {
        name: "HTML",
        color: "pink-text-gradient",
      },
    ],
    image: jobit,
    source_code_link: "https://sector7gc.com/",
  },
  {
    name: "Neuomorphic ToDo",
    description:
      "A digital to-do application with a neumorphic design approach, offering an intuitive and visually pleasing solution for task management. Users can effortlessly create, organize, and complete tasks with a user-friendly interface.",
    tags: [
      {
        name: "Javascript",
        color: "blue-text-gradient",
      },
      {
        name: "CSS",
        color: "green-text-gradient",
      },
      {
        name: "HTML",
        color: "pink-text-gradient",
      },
    ],
    image: tripguide,
    source_code_link: "https://github.com/brandoncamerer/Neumorphism-ToDo",
  },
];

export { services, technologies, experiences, testimonials, projects };
