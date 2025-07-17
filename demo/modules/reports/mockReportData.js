// demo/modules/reports/mockReportData.js

const mockReportData = {
    "Response Time & Turnout Time Breakdown by Unit": {
        title: "Response Time & Turnout Time Breakdown by Unit",
        dateRange: "July 1, 2025 - July 17, 2025",
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
    }
    // Add mock data for other reports here as needed
};
