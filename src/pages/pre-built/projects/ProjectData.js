import TeamImg from "../../../images/avatar/b-sm.jpg";
import TeamImg2 from "../../../images/avatar/c-sm.jpg";
import TeamImg3 from "../../../images/avatar/a-sm.jpg";
import TeamImg4 from "../../../images/avatar/d-sm.jpg";

import { setDeadline } from "../../../utils/Utils";

export const projectData = [
  {
    id: 1,
    avatarClass: "purple",
    title: "FrontEnd Developer",
    subtitle: "IT",
    desc: "Development of the graphical user interface of a website, through the use of HTML, CSS, and JavaScript, so that users can view and interact with that website",
    lead: "Abu Bin",
    tasks: "4",
    totalTask: "10",
    checked: false,
    url: '/demo1/1/frontend',
    deadline: setDeadline(94), // Format ** mm/dd/yyyy
    team: [
      {
        value: "Abu Bin",
        label: "Abu Bin",
        image: null,
        theme: "purple",
      },
      { value: "Milagros Betts", label: "Milagros Betts", theme: "pink" },
      { value: "Ryu Duke", label: "Ryu Duke", theme: "orange" },
    ],
  },
  {
    id: 2,
    avatarClass: "warning",
    title: "Web Design",
    subtitle: "IT, Art",
    desc: "Web design refers to the design of websites that are displayed on the internet. It usually refers to the user experience aspects of website development rather than software development",
    tasks: "10",
    totalTask: "18",
    lead: "Newman John",
    checked: false,
    url: '/demo1/1/webdesign',
    deadline: setDeadline(22), // Format ** mm/dd/yyyy
    team: [
      {
        value: "Abu Bin",
        label: "Abu Bin",
        image: TeamImg2,
        theme: "purple",
      },
      {
        value: "Newman John",
        label: "Newman John",
        image: null,
        theme: "primary",
      },
    ],
  },
  {
    id: 3,
    avatarClass: "info",
    title: "Game Developer",
    subtitle: "IT, Art",
    desc: "Game developers, are responsible for designing and developing video games for PC, console, and mobile applications",
    tasks: "8",
    totalTask: "19",
    lead: "Abu Bin",
    checked: false,
    url: '/demo1/1/gamedev',
    deadline: setDeadline(5), // Format ** mm/dd/yyyy
    team: [
      {
        value: "Abu Bin",
        label: "Abu Bin",
        image: TeamImg3,
        theme: "purple",
      },
    ],
  },
];

export const teamList = [
  { value: "Abu Bin", label: "Abu Bin", theme: "purple" },
  { value: "Newman John", label: "Newman John", theme: "primary" },
  { value: "Milagros Betts", label: "Milagros Betts", theme: "purple" },
  { value: "Joshua Wilson", label: "Joshua Wilson", theme: "pink" },
  { value: "Ryu Duke", label: "Ryu Duke", theme: "orange" },
  { value: "Aliah Pitts", label: "Aliah Pitts", theme: "blue" },
];
