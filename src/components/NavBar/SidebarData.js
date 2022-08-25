import React from "react";
import * as FaIcons from "react-icons/fa";
import * as IoIcons from "react-icons/io";
import * as RiIcons from "react-icons/ri";
import * as GiIcons from "react-icons/gi";

export const SidebarData = [
{
	title: "Home",
	path: "/home",
	icon: <FaIcons.FaHome />,

},
{
	title: "Find the Pill",
	path: "/find-the-pill",
	icon: <FaIcons.FaPills />,

	iconClosed: <RiIcons.RiArrowDownSFill />,
	iconOpened: <RiIcons.RiArrowUpSFill />,

	subNav: [
	{
		title: "Pharmacy Directory",
		path: "/find-the-pill/directory",
		icon: <FaIcons.FaClipboardList />,
		cName: "sub-nav",
	},
	{
		title: "EC Locator Map",
		path: "/find-the-pill/findEC",
		icon: <FaIcons.FaMapMarkerAlt />,
		cName: "sub-nav",
	},
	{
		title: "Free Plan B",
		path: "/find-the-pill/freeplanB",
		icon: <GiIcons.GiTexas />,
	}
	],
},
{
	title: "Texas Statistics",
	path: "/pill-stats",
	icon: <FaIcons.FaChartLine />,

	iconClosed: <RiIcons.RiArrowDownSFill />,
	iconOpened: <RiIcons.RiArrowUpSFill />,

	subNav: [
	{
		title: "Major Texas Pharmacies",
		path: "/stats/major-pharmacies",
		icon: <FaIcons.FaChartBar />,
	},
	{
		title: "Accessibility",
		path: "/stats/accessibility",
		icon: <FaIcons.FaChartBar />,
	},
	],
},
{
	title: "More Information",
	path: "/more",
	icon: <FaIcons.FaInfoCircle />,

	iconClosed: <RiIcons.RiArrowDownSFill />,
	iconOpened: <RiIcons.RiArrowUpSFill />,

	subNav: [
		{
			title: "FAQ's",
			path: "/more/faqs",
			icon: <FaIcons.FaQuestionCircle />,
			cName: "sub-nav",
		},
		{
			title: "Know Your Rights",
			path: "/more/know-your-rights",
			icon: <FaIcons.FaBalanceScale />,
			cName: "sub-nav"
		}
	]
},
{
	title: "Get Involved",
	path: "/get-involved",
	icon: <FaIcons.FaWalking />,
},
];
