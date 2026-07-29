export const BRAND_NAME = "Taigra Nexus Lab";
export const PARENT_COMPANY = "Taigour Group of Organization (TGO)";
export const ACCENT_COLOR = "blue-600";

/** Office location — aligned with TGO / Janakpur area (visit by appointment) */
export const OFFICE = {
  line1: "Pidari, Janakpurdham",
  district: "Dhanusha District",
  province: "Madhesh Province, Nepal",
  fullAddress: "Pidari, Janakpurdham, Dhanusha, Madhesh Province, Nepal",
  fullAddressNe: "पिडारी, जनकपुरधाम, धनुषा जिल्ला, मधेश प्रदेश, नेपाल",
  mapQuery: "Pidari, Janakpurdham, Dhanusha, Nepal",
  lat: 26.7288,
  lng: 85.9254,
  googleMapsUrl:
    "https://www.google.com/maps/search/?api=1&query=Pidari+Janakpurdham+Dhanusha+Nepal",
  hours: "Sunday – Friday · 10:00 AM – 6:00 PM (please book a visit)",
  hoursNe: "आइतबार – शुक्रबार · बिहान १०:०० – साँझ ६:०० (भेट अघि सम्पर्क गर्नुहोस्)",
};

export const TUTORIAL_STEPS = [
  {
    target: 'hero',
    title: 'Welcome to Taigra Nexus Lab Pvt. Ltd.',
    content: `We are the specialized tech arm of ${PARENT_COMPANY}. Our mission is to build the digital backbone for the entire group.`,
    position: 'bottom'
  },
  {
    target: 'tgo-section',
    title: 'Our Heritage',
    content: 'Learn how we manage the technical lifecycle for over 12 child companies within the TGO ecosystem.',
    position: 'top'
  },
  {
    target: 'featured-projects',
    title: 'Digital Showcase',
    content: 'Explore enterprise-grade systems we have architected for logistics, real estate, and finance.',
    position: 'top'
  },
  {
    target: 'admin-btn',
    title: 'Admin Control',
    content: 'Authorized personnel can access the command center here to manage projects and internal logs.',
    position: 'bottom'
  }
];