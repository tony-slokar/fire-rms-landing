const mockEventsData = [
    {
        id: '2025-00123',
        dispatchNumber: 'CAD-2025-004321',
        type: '111 - Building Fire',
        typeCode: '111',
        address: '455 Main St',
        city: 'Anytown',
        dispatchTime: '2025-07-20T14:02:00',
        arrivalTime: '2025-07-20T14:06:32',
        clearedTime: '2025-07-20T15:30:00',
        status: 'Closed',
        priority: 'High',
        unitsAssigned: ['E-1', 'L-1', 'C-1', 'A-1'],
        casualties: 1,
        damage: 'Moderate',
        weather: 'Clear, 78°F',
        narrative: 'E-1 arrived on scene at 14:06 to find a two-and-a-half story wood-frame single-family dwelling with heavy smoke showing from the second floor windows and light smoke from the eaves. Engine crew deployed 1¾" attack line through the front door while L-1 crew performed primary search of first floor. Fire was located in the second floor bedroom with extension to the attic space. Ventilation was completed via roof operations. One occupant, 68-year-old male, was located on first floor suffering from smoke inhalation and transported to Regional Medical Center by A-1. Fire was knocked down at 14:23 and completely extinguished at 14:45. Overhaul operations revealed fire originated from electrical outlet behind bed. Power was secured by utility company. Red Cross contacted for displaced residents. Estimated damage: $45,000 to structure, $15,000 to contents.',
        lastUpdated: '2025-07-20T15:35:00',
        updatedBy: 'Cpt. Davis'
    },
    {
        id: '2025-00124',
        dispatchNumber: 'CAD-2025-004322',
        type: '322 - Motor Vehicle Fire',
        typeCode: '322',
        address: 'Route 9 @ Mile Marker 23',
        city: 'Anytown',
        dispatchTime: '2025-07-20T16:45:00',
        arrivalTime: '2025-07-20T16:51:15',
        clearedTime: null,
        status: 'In Progress',
        priority: 'Medium',
        unitsAssigned: ['E-2', 'C-1'],
        casualties: 0,
        damage: 'Total Loss',
        weather: 'Clear, 82°F',
        narrative: 'E-2 arrived to find a 2018 Toyota Camry fully involved in fire on the shoulder of Route 9 southbound. Driver had safely exited vehicle and was standing clear when units arrived. Initial attack with 1¾" handline knocked down visible flames within 5 minutes. Vehicle appeared to be total loss with fire damage throughout engine compartment and passenger cabin. Driver stated he noticed smoke coming from under hood while driving and immediately pulled over. No mechanical issues reported prior to incident. State Police on scene for traffic control and investigation. Roadway partially blocked during suppression operations. Vehicle will be towed by Charlies Auto Recovery. No environmental hazards noted.',
        lastUpdated: '2025-07-20T17:02:00',
        updatedBy: 'Lt. Miller'
    },
    {
        id: '2025-00125',
        dispatchNumber: 'CAD-2025-004323',
        type: '611 - EMS Call',
        typeCode: '611',
        address: '789 Oak Street, Apt 2B',
        city: 'Anytown',
        dispatchTime: '2025-07-20T18:20:00',
        arrivalTime: '2025-07-20T18:24:45',
        clearedTime: '2025-07-20T19:15:00',
        status: 'Closed',
        priority: 'High',
        unitsAssigned: ['A-1', 'E-1'],
        casualties: 1,
        damage: 'None',
        weather: 'Clear, 79°F',
        narrative: 'A-1 responded to report of 68-year-old male experiencing chest pain. Patient found conscious and alert sitting in living room chair, complaining of crushing chest pain radiating to left arm, onset 20 minutes prior to call. Patient has history of hypertension and diabetes. Vital signs: BP 160/95, HR 88 irregular, RR 20, O2 sat 94% on room air. 12-lead EKG showed ST elevation in leads II, III, aVF consistent with inferior MI. Patient given 324mg ASA, IV established, oxygen at 4L/min via nasal cannula. Nitro SL administered with some pain relief. Patient transported to Regional Medical Center code 3 with paramedic intercept en route. Report given to Dr. Matthews in ED. Patient was conscious and vital signs stable throughout transport.',
        lastUpdated: '2025-07-20T19:20:00',
        updatedBy: 'PM Rodriguez'
    },
    {
        id: '2025-00122',
        dispatchNumber: 'CAD-2025-004320',
        type: '554 - Water/Ice Emergency',
        typeCode: '554',
        address: 'Riverside Park Boat Launch',
        city: 'Anytown',
        dispatchTime: '2025-07-20T11:30:00',
        arrivalTime: '2025-07-20T11:38:20',
        clearedTime: '2025-07-20T13:45:00',
        status: 'Closed',
        priority: 'High',
        unitsAssigned: ['E-1', 'L-1', 'R-1', 'C-1'],
        casualties: 0,
        damage: 'None',
        weather: 'Sunny, 85°F',
        narrative: 'Units dispatched for kayaker in distress approximately 200 yards from boat launch. R-1 deployed rescue boat with two-person crew while L-1 established shore-based rope rescue system as backup. Victim, 34-year-old male, had capsized in swift current and became separated from kayak. He was conscious, alert, and maintaining position by treading water when rescue boat arrived. Water temperature estimated at 72°F. Victim was successfully retrieved using rescue boat at 11:52 and brought to shore. Medical evaluation by A-1 paramedics revealed mild hypothermia and exhaustion but no injuries. Patient refused transport after warming and full assessment. Kayak was also recovered downstream and returned to owner. Park rangers advised of incident and recommended safety briefing be posted at launch area regarding current water conditions.',
        lastUpdated: '2025-07-20T13:50:00',
        updatedBy: 'Cpt. Wilson'
    },
    {
        id: '2025-00121',
        dispatchNumber: 'CAD-2025-004319',
        type: '735 - Alarm Activation',
        typeCode: '735',
        address: '150 Industrial Way',
        city: 'Anytown',
        dispatchTime: '2025-07-20T09:15:00',
        arrivalTime: '2025-07-20T09:22:10',
        clearedTime: '2025-07-20T09:45:00',
        status: 'Closed',
        priority: 'Low',
        unitsAssigned: ['E-2'],
        casualties: 0,
        damage: 'None',
        weather: 'Partly Cloudy, 72°F',
        narrative: 'E-2 responded to automatic fire alarm activation at Precision Manufacturing. Upon arrival, building maintenance supervisor met crew at front entrance and reported alarm activation in Zone 4 (break room area). No visible signs of fire or smoke upon 360-degree size-up. Entry team conducted investigation and found smoke detector activation was caused by burned food in microwave oven in employee break room. Employee had been reheating lunch and left area when food overcooked and generated smoke. No actual fire occurred. Facility ventilated using exhaust fans. Alarm system was reset by building maintenance after confirmation that area was clear. Advised facility manager to review employee training on proper use of kitchen appliances. No further action required.',
        lastUpdated: '2025-07-20T09:50:00',
        updatedBy: 'FF Johnson'
    },
    {
        id: '2025-00120',
        dispatchNumber: 'CAD-2025-004318',
        type: '311 - Motor Vehicle Accident',
        typeCode: '311',
        address: 'Main St & Center Ave',
        city: 'Anytown',
        dispatchTime: '2025-07-19T15:30:00',
        arrivalTime: '2025-07-19T15:35:45',
        clearedTime: '2025-07-19T17:20:00',
        status: 'Closed',
        priority: 'Medium',
        unitsAssigned: ['E-1', 'A-1', 'C-1'],
        casualties: 2,
        damage: 'Moderate',
        weather: 'Light Rain, 68°F',
        narrative: 'E-1 responded to two-vehicle collision at intersection of Main St and Center Ave. Upon arrival found 2015 Honda Civic with significant front-end damage and 2020 Ford F-150 with driver side impact damage. Both vehicles were in roadway blocking traffic. Vehicle stabilization completed using cribbing and wheel chocks. Extrication required for driver of Honda Civic due to door damage - used hydraulic spreaders to create access. Driver, 45-year-old female, conscious with complaint of neck and back pain, extracted using long spine board and cervical collar. Passenger in Honda, 16-year-old female, ambulatory with minor lacerations to forehead from broken glass. Both patients transported to Regional Medical Center by A-1 for evaluation. Driver of F-150, 52-year-old male, refused medical treatment. State Police conducted accident investigation - preliminary report indicates Honda failed to yield on left turn. Roadway cleared at 17:20 after vehicles were towed. Minor fuel spill from Honda absorbed with speedy dry.',
        lastUpdated: '2025-07-19T17:25:00',
        updatedBy: 'Lt. Chen'
    },
    {
        id: '2025-00119',
        dispatchNumber: 'CAD-2025-004317',
        type: '142 - Brush Fire',
        typeCode: '142',
        address: 'Woodland Trail, Mile 2.5',
        city: 'Anytown',
        dispatchTime: '2025-07-19T13:45:00',
        arrivalTime: '2025-07-19T14:12:30',
        clearedTime: '2025-07-19T16:30:00',
        status: 'Closed',
        priority: 'High',
        unitsAssigned: ['E-1', 'E-2', 'T-1', 'C-1'],
        casualties: 0,
        damage: 'Minor',
        weather: 'Windy, 88°F',
        narrative: 'Multiple units dispatched to brush fire reported by hikers on Woodland Trail. E-1 arrived to find approximately 2 acres of mixed grass and light brush burning with 15-20 mph winds pushing fire toward residential area 500 yards to the east. Immediate attack initiated with 1½" forestry line while T-1 established water supply from drafting site at Mill Pond. E-2 crew deployed second handline to protect exposures and establish firebreak. Mutual aid requested from County Forestry due to wind conditions and proximity to structures. Fire appeared to have started from illegal campfire that was not properly extinguished. County units arrived at 14:45 with bulldozer for firebreak construction. Fire was contained at 15:30 and completely extinguished by 16:15. Total area burned estimated at 2.1 acres with no structure damage. State Forest Service contacted for investigation and issued citation to responsible party. Area will be monitored for next 24 hours for potential rekindle.',
        lastUpdated: '2025-07-19T16:35:00',
        updatedBy: 'Chief Johnson'
    },
    {
        id: '2025-00118',
        dispatchNumber: 'CAD-2025-004316',
        type: '444 - Power Line Down',
        typeCode: '444',
        address: '567 Elm Street',
        city: 'Anytown',
        dispatchTime: '2025-07-19T08:20:00',
        arrivalTime: '2025-07-19T08:28:15',
        clearedTime: '2025-07-19T10:45:00',
        status: 'Closed',
        priority: 'Medium',
        unitsAssigned: ['E-2', 'C-1'],
        casualties: 0,
        damage: 'None',
        weather: 'Storms, 65°F',
        narrative: 'E-2 responded to report of power lines down on Elm Street following overnight thunderstorms. Upon arrival found primary electrical service line had been brought down by large oak tree branch that fell during storms. Live wire was on roadway approximately 50 feet from nearest residence. Established safety perimeter of 100 feet and requested immediate response from Electric Company. E-2 positioned to block traffic from both directions while awaiting utility crew. Resident at 567 Elm St reported power outage to home but no other hazards noted. Electric Company crew arrived at 09:15 and confirmed line was de-energized before approaching. Tree removal required assistance from Highway Department crew with chainsaw. Power line repair completed by 10:30 and roadway reopened to traffic. Approximately 12 homes in immediate area experienced power outage for 3 hours total. No injuries or property damage reported.',
        lastUpdated: '2025-07-19T10:50:00',
        updatedBy: 'Cpt. Davis'
    },
    {
        id: '2025-00117',
        dispatchNumber: 'CAD-2025-004315',
        type: '412 - Gas Leak',
        typeCode: '412',
        address: '234 Pine Avenue',
        city: 'Anytown',
        dispatchTime: '2025-07-18T20:30:00',
        arrivalTime: '2025-07-18T20:36:50',
        clearedTime: '2025-07-18T22:15:00',
        status: 'Closed',
        priority: 'High',
        unitsAssigned: ['E-1', 'HAZ-1', 'C-1'],
        casualties: 0,
        damage: 'None',
        weather: 'Clear, 72°F',
        narrative: 'E-1 responded to report of natural gas odor from resident at 234 Pine Ave. Upon arrival, strong mercaptan odor was detected in street area near gas meter. Four-gas monitor readings showed 18% LEL at ground level near service line. Immediate evacuation of 234 Pine Ave and adjacent properties at 232 and 236 Pine Ave as precautionary measure. Gas Company emergency crew notified and responded. HAZ-1 established safety perimeter and monitored air quality during operations. Source of leak identified as damaged underground service line approximately 3 feet from meter, likely caused by recent landscaping work. Gas Company crew isolated service and vented line to atmosphere. Excavation revealed service line had been nicked by shovel during flower bed installation two days prior. Temporary repair completed and permanent repair scheduled for following day. All evacuated residents allowed to return at 22:00 after area was confirmed safe with gas readings at 0% LEL. Resident advised to contact Dig Safe before any future excavation work.',
        lastUpdated: '2025-07-18T22:20:00',
        updatedBy: 'Lt. Wilson'
    },
    {
        id: '2025-00116',
        dispatchNumber: 'CAD-2025-004314',
        type: '321 - EMS Call - Cardiac',
        typeCode: '321',
        address: '890 Maple Drive',
        city: 'Anytown',
        dispatchTime: '2025-07-18T14:15:00',
        arrivalTime: '2025-07-18T14:19:30',
        clearedTime: '2025-07-18T15:30:00',
        status: 'Closed',
        priority: 'High',
        unitsAssigned: ['A-1', 'E-1'],
        casualties: 1,
        damage: 'None',
        weather: 'Sunny, 78°F',
        narrative: 'A-1 responded emergency to 72-year-old male in cardiac arrest. Family member was performing CPR when crew arrived. Patient found unresponsive, pulseless, and apneic. CPR immediately resumed with bag-mask ventilation while defibrillator was prepared. Initial rhythm analysis showed ventricular fibrillation. First shock delivered at 14:22 with immediate resumption of CPR. Second rhythm check at 14:24 showed return of spontaneous circulation with weak pulse palpated. Advanced airway established with supraglottic device, IV access obtained, and ACLS protocols followed. Patient regained consciousness during transport and was able to follow simple commands. Continuous cardiac monitoring showed normal sinus rhythm with occasional PVCs. Patient transported code 3 to Regional Medical Center with report given to cardiology team. Total downtime estimated at 8 minutes. Family member stated patient had no prior cardiac history but had complained of chest discomfort earlier in day.',
        lastUpdated: '2025-07-18T15:35:00',
        updatedBy: 'PM Garcia'
    },
    {
        id: '2025-00115',
        dispatchNumber: 'CAD-2025-004313',
        type: '671 - Hazmat Release',
        typeCode: '671',
        address: '500 Commerce Blvd',
        city: 'Anytown',
        dispatchTime: '2025-07-18T10:45:00',
        arrivalTime: '2025-07-18T10:52:20',
        clearedTime: '2025-07-18T14:30:00',
        status: 'Closed',
        priority: 'High',
        unitsAssigned: ['HAZ-1', 'E-1', 'E-2', 'C-1'],
        casualties: 0,
        damage: 'Minor',
        weather: 'Overcast, 70°F',
        narrative: 'HAZ-1 responded to report of hydraulic fluid spill at industrial facility. Upon arrival found approximately 50 gallons of biodegradable hydraulic fluid had leaked from damaged fitting on delivery truck hydraulic lift system. Spill was contained to loading dock area with minimal environmental impact. Driver reported hearing loud pop followed by rapid loss of hydraulic pressure while unloading cargo. Initial response included establishing safety perimeter and identifying material using shipping papers and SDS sheets. Hydraulic fluid identified as non-hazardous biodegradable ISO 46 weight oil. Spill was contained using absorbent pads and speedy dry compound. Environmental contractor (CleanCorp) contacted for proper disposal of contaminated absorbent materials. No exposure to personnel and no threat to storm drains or waterways. Facility maintenance completed temporary repair of hydraulic system. State DEP notified per regulations but determined no further action required due to minimal quantity and biodegradable nature of spilled material.',
        lastUpdated: '2025-07-18T14:35:00',
        updatedBy: 'Cpt. Brown'
    },
    {
        id: '2025-00114',
        dispatchNumber: 'CAD-2025-004312',
        type: '113 - Cooking Fire',
        typeCode: '113',
        address: '123 Restaurant Row',
        city: 'Anytown',
        dispatchTime: '2025-07-17T19:20:00',
        arrivalTime: '2025-07-17T19:25:45',
        clearedTime: '2025-07-17T21:10:00',
        status: 'Closed',
        priority: 'Medium',
        unitsAssigned: ['E-1', 'L-1'],
        casualties: 0,
        damage: 'Minor',
        weather: 'Clear, 75°F',
        narrative: 'E-1 responded to automatic fire alarm and report of kitchen fire at Marios Italian Restaurant. Upon arrival found light smoke visible from kitchen exhaust system but no visible flames. Manager reported fire had occurred in commercial deep fryer but was extinguished by automatic suppression system before crews arrived. Investigation revealed cooking oil had overheated when chef stepped away from fryer, causing oil to ignite. Kitchen Ansul suppression system activated properly, discharging dry chemical agent and securing gas supply to fryer. Ventilation completed using positive pressure fans to clear smoke from dining and kitchen areas. Minor damage limited to fryer unit and surrounding stainless steel surfaces from suppression agent discharge. Fire marshal inspection required before restaurant could reopen. Suppression system will need to be recharged by certified technician. Estimated loss: $2,500 for fryer replacement and system recharge. Restaurant closed for remainder of evening for cleanup and system restoration.',
        lastUpdated: '2025-07-17T21:15:00',
        updatedBy: 'Lt. Taylor'
    }
];

// Helper function to get events by status
const getEventsByStatus = (status) => {
    return mockEventsData.filter(event => event.status === status);
};

// Helper function to get events by priority
const getEventsByPriority = (priority) => {
    return mockEventsData.filter(event => event.priority === priority);
};

// Helper function to get recent events (last 24 hours)
const getRecentEvents = () => {
    const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
    return mockEventsData.filter(event => new Date(event.dispatchTime) > oneDayAgo);
};

// Helper function to get events by type code
const getEventsByType = (typeCode) => {
    return mockEventsData.filter(event => event.typeCode === typeCode);
};