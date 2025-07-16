function loadScript(src) {
    return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = src;
        script.type = 'text/babel'; // Ensure babel processes it
        script.onload = resolve;
        script.onerror = reject;
        document.body.appendChild(script);
    });
}

// All your new script files
const scripts = [
    // Globals
    'demo/colors.js',

    // UI Components
    'demo/components/ui/FormField.js',
    'demo/components/ui/SelectField.js',
    'demo/components/ui/TextArea.js',
    'demo/components/ui/PageHeader.js',
    'demo/components/ui/SubNav.js',
    'demo/components/ui/Modal.js',
    'demo/components/ui/CheckboxItem.js',

    // Layout Components
    'demo/components/layout/Sidebar.js',

    // Module Content
    'demo/modules/dashboard/DashboardContent.js',
    'demo/modules/incidents/IncidentReportContent.js',
    'demo/modules/occupancies/OccupanciesContent.js',
    'demo/modules/personnel/PersonnelContent.js',
    'demo/modules/equipment/EquipmentContent.js',
    'demo/modules/reports/PlaceholderContent.js',
    'demo/modules/settings/PlaceholderContent.js', // Or a separate one

    // Main App Component
    'demo/App.js'
];

// Load all scripts sequentially
async function loadAllScripts() {
    for (const script of scripts) {
        await loadScript(script);
    }

    // After all scripts are loaded, render the App
    ReactDOM.render(React.createElement(App), document.getElementById('react-app-container'));
}

// Start loading scripts when the DOM is ready
document.addEventListener('DOMContentLoaded', loadAllScripts);
