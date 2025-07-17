// demo/modules/reports/mockReportData.js

const mockReportData = {
    "Response Time & Turnout Time Breakdown by Unit": {
        title: "Response Time & Turnout Time Breakdown by Unit",
        dateRange: "July 1, 2025 - July 18, 2025",
        kpis: [
            { label: "Department Average Turnout", value: "1:02 min" },
            { label: "Department Average Response", value: "4:58 min" },
            { label: "Busiest Unit", value: "Engine 1" },
            { label: "Total Events", value: "123" }
        ],
        table: {
            headers: ["Unit", "Events", "Avg. Turnout Time", "Avg. Travel Time", "Avg. Total Response"],
            rows: [
                ["Engine 1", "48", "0:58", "4:15", "5:13"],
                ["Engine 2", "35", "1:10", "4:45", "5:55"],
                ["Ladder 1", "28", "1:25", "5:10", "6:35"],
                ["Ambulance 1", "65", "0:45", "3:55", "4:40"],
                ["Command 1", "15", "0:55", "4:05", "5:00"]
            ]
        }
    },
    "Apparatus Usage & On-Scene Time by Event Type": {
        title: "Apparatus Usage & On-Scene Time by Event Type",
        dateRange: "July 1, 2025 - July 18, 2025",
        kpis: [
            { label: "Total Apparatus Hours", value: "284 hrs" },
            { label: "Highest Usage Event Type", value: "Structure Fire" },
            { label: "Longest Avg. Scene Time", value: "2:15 hrs" },
            { label: "Total Responses", value: "182" }
        ],
        table: {
            headers: ["Event Type", "Total Responses", "Avg. Units Per Response", "Avg. On-Scene Time"],
            rows: [
                ["111 - Structure Fire", "12", "4.2", "2:15:30"],
                ["322 - Vehicle Fire", "25", "2.1", "0:45:10"],
                ["611 - EMS Call", "88", "1.5", "0:22:45"],
                ["554 - Water Rescue", "5", "3.0", "1:30:00"],
                ["735 - Alarm Activation", "52", "1.8", "0:15:20"]
            ]
        }
    },
     "Civilian & Firefighter Casualty Analysis": {
        title: "Civilian & Firefighter Casualty Analysis",
        dateRange: "Year-to-Date 2025",
        kpis: [
            { label: "Total Civilian Casualties", value: "8" },
            { label: "Total Firefighter Injuries", value: "3" },
            { label: "Events with Casualties", value: "5" },
            { label: "Most Common Injury", value: "Smoke Inhalation" }
        ],
        table: {
            headers: ["Event ID", "Event Type", "Civilian Injuries", "Civilian Fatalities", "Firefighter Injuries"],
            rows: [
                ["2025-00045", "111 - Structure Fire", "2", "0", "1 (Sprain)"],
                ["2025-00098", "311 - Motor Vehicle Accident", "3", "1", "0"],
                ["2025-00123", "111 - Structure Fire", "1", "0", "1 (Smoke Inhalation)"],
                ["2025-00140", "412 - Gas Leak", "1", "0", "1 (Exhaustion)"],
                ["2025-00155", "322 - Vehicle Fire", "0", "0", "0"]
            ]
        }
    },
    "Mutual Aid Given vs. Received Summary": {
        title: "Mutual Aid Given vs. Received Summary",
        dateRange: "Year-to-Date 2025",
        kpis: [
            { label: "Aid Given Responses", value: "14" },
            { label: "Aid Received Responses", value: "9" },
            { label: "Net Aid", value: "+5 Given" },
            { label: "Primary Partner", value: "Anytown Fire Dept." }
        ],
        table: {
            headers: ["Partner Agency", "Aid Given", "Aid Received", "Net"],
            rows: [
                ["Anytown Fire Dept.", "8", "5", "+3"],
                ["Pleasantville EMS", "4", "2", "+2"],
                ["County Hazmat", "2", "2", "0"]
            ]
        }
    },
    "Occupancy Inspection Status & Violation Trends": {
        title: "Occupancy Inspection Status & Violation Trends",
        dateRange: "Q3 2025 (Projected)",
        kpis: [
            { label: "Total Occupancies", value: "482" },
            { label: "Inspections Due This Qtr", value: "112" },
            { label: "Most Common Violation", value: "Blocked Exits" },
            { label: "Violations Corrected", value: "92%" }
        ],
        table: {
            headers: ["Occupancy Type", "Total", "Inspections Due", "Overdue", "Common Violations"],
            rows: [
                ["Mercantile", "150", "38", "4", "Fire Extinguishers, Blocked Exits"],
                ["Multi-Family Residential", "85", "22", "2", "Smoke Detectors, Electrical"],
                ["Educational", "25", "25", "0", "N/A"],
                ["Industrial", "40", "10", "1", "Hazmat Storage, Sprinkler Maint."],
                ["Assembly", "62", "17", "3", "Occupant Load, Blocked Exits"]
            ]
        }
    },
    "Expiring Certifications & Training Requirements": {
        title: "Expiring Certifications & Training Requirements",
        dateRange: "Next 90 Days",
        kpis: [
            { label: "Personnel with Expirations", value: "8" },
            { label: "Total Certs Expiring", value: "12" },
            { label: "Most Common Expiring Cert", value: "EMT-Basic" },
            { label: "Classes Scheduled", value: "4" }
        ],
        table: {
            headers: ["Personnel", "Certification", "Expiration Date", "Status"],
            rows: [
                ["Mike Johnson", "EMT-Basic", "2025-08-12", "Scheduled for Recert"],
                ["Lisa Chen", "ACLS", "2025-08-15", "Needs Scheduling"],
                ["John Davis", "Fire Officer I", "2025-09-01", "Needs Scheduling"],
                ["Robert Wilson", "EVOC", "2025-09-22", "Scheduled for Recert"]
            ]
        }
    },
    "Hydrant Maintenance & Flow Test History": {
        title: "Hydrant Maintenance & Flow Test History",
        dateRange: "Last 12 Months",
         kpis: [
            { label: "Total Hydrants", value: "1,240" },
            { label: "Inspections Completed", value: "1,180 (95%)" },
            { label: "Hydrants OOS", value: "12" },
            { label: "Avg. Static Pressure", value: "65 PSI" }
        ],
        table: {
            headers: ["Hydrant ID", "Location", "Last Inspection", "Static PSI", "Flow GPM", "Status"],
            rows: [
                ["H-001", "Main St & 1st Ave", "2025-07-15", "68", "1,550", "In Service"],
                ["H-045", "River Rd & Oak Ln", "2025-07-12", "62", "1,280", "In Service"],
                ["H-112", "Industrial Way", "2025-06-20", "55", "980", "Needs Repair"],
                ["H-210", "Center St", "2025-06-18", "70", "1,620", "In Service"]
            ]
        }
    },
     "Apparatus Maintenance & Cost Analysis": {
        title: "Apparatus Maintenance & Cost Analysis",
        dateRange: "Year-to-Date 2025",
        kpis: [
            { label: "Total Maintenance Cost", value: "$45,280" },
            { label: "Most Expensive Unit", value: "Ladder 1" },
            { label: "Work Orders Created", value: "89" },
            { label: "Downtime Hours", value: "215 hrs" }
        ],
        table: {
            headers: ["Apparatus", "Work Orders", "Downtime (hrs)", "Parts Cost", "Labor Cost", "Total Cost"],
            rows: [
                ["Engine 1", "25", "60", "$5,200", "$4,800", "$10,000"],
                ["Ladder 1", "18", "95", "$12,500", "$7,500", "$20,000"],
                ["Ambulance 1", "35", "40", "$3,800", "$3,200", "$7,000"],
                ["Command 1", "11", "20", "$1,280", "$1,000", "$2,280"]
            ]
        }
    }
};
