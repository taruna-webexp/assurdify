export const menus = [
    { Title: "About Us", path: `/about` },
    { Title: "Verified Projects", path: `/` },
    {
        Title: "Services",
        path: ``,
        children: [
            { Title: "Code Audit", path: `/code-audit` },
            { Title: "Growth Packages", path: `/growth-packages` },
        ],
    },
    { Title: "Partners", path: `/partners` },
    { Title: "Report A Scam", path: `/report` },
];
