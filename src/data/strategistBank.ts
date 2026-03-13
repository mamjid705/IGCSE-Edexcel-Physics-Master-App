import { StrategistQuestion } from '../types';

export const strategistQuestions: StrategistQuestion[] = [
    {
        id: 1,
        topic: "Forces and Motion",
        question: "Explain, in terms of forces, why a falling object eventually reaches terminal velocity. (4 Marks)",
        markScheme: [
            "Weight acts downwards (initial acceleration).",
            "Air resistance increases as speed increases.",
            "Air resistance eventually equals weight (Drag = Weight).",
            "Resultant force becomes zero, so acceleration stops (Constant Velocity)."
        ],
        hint: "Mention what happens to the resultant force when drag and weight match."
    },
    {
        id: 2,
        topic: "Forces and Motion",
        question: "A car driver sees a rabbit and brakes suddenly. State and explain four factors that could increase the stopping distance of the car. (4 Marks)",
        markScheme: [
            "Wet/Icy roads (reduces between tires and road).",
            "Worn brakes/tires (increases braking distance).",
            "Higher speed (increases both thinking and braking distance).",
            "Driver tiredness/alcohol (increases reaction time/thinking distance)."
        ],
        hint: "Think about things that affect the road, the car, and the driver."
    },
    {
        id: 3,
        topic: "Forces and Motion",
        question: "Describe how a seatbelt reduces the risk of injury to a passenger during a collision. (4 Marks)",
        markScheme: [
            "Seatbelt stretches (increasing the time taken to stop).",
            "This reduces the rate of change of momentum.",
            "This results in a smaller force acting on the passenger (F = Δp / t).",
            "Force is spread over a larger area of the body."
        ],
        hint: "Use the formula linking Force, Momentum, and Time."
    },
    {
        id: 4,
        topic: "Forces and Motion",
        question: "A toy train travels across a bridge. Explain why the upward force on one support increases as the train moves toward it. (4 Marks)",
        markScheme: [
            "The bridge acts as a pivot (Principle of Moments).",
            "Clockwise moments must equal anticlockwise moments for equilibrium.",
            "As distance from support decreases, the required force increases to maintain the moment.",
            "The support closest to the train takes a larger share of the train's weight."
        ],
        hint: "Think about the 'Principle of Moments'."
    },
    {
        id: 5, // Replacing the Scalar question
        topic: "Forces and Motion",
        question: "A skydiver jumps from a plane. Explain why their acceleration decreases before they reach terminal velocity. (4 Marks)",
        markScheme: [
            "As speed increases, air resistance (drag) increases.",
            "Weight remains constant acting downwards.",
            "The resultant force (Weight - Drag) decreases.",
            "According to F=ma, if the resultant force decreases, acceleration must also decrease."
        ],
        hint: "Think about the gap between Weight and Air Resistance."
    },
    {
        id: 6,
        topic: "Forces and Motion",
        type: "graph",
        question: "The graph shows the velocity of a paratrooper after jumping from a plane. Calculate their acceleration during the first 10 seconds and state their terminal velocity after opening the parachute. (4 Marks)",
        graphData: [
            { x: 0, y: 0 },
            { x: 10, y: 50 },
            { x: 20, y: 50 },
            { x: 25, y: 10 },
            { x: 35, y: 10 }
        ],
        markScheme: [
            "Formula: Acceleration = (v - u) / t.",
            "Calculation: (50 - 0) / 10 = 5 m/s².",
            "Terminal velocity (with parachute): Read the second horizontal section of the graph.",
            "Result: 10 m/s."
        ],
        hint: "Acceleration is the gradient of the first section; terminal velocity is where the graph is horizontal."
    },
    {
        id: 7,
        topic: "Forces and Motion",
        question: "Explain how a parachute helps a paratrooper land safely. (4 Marks)",
        markScheme: [
            "Opening the parachute greatly increases the surface area.",
            "This increases air resistance (drag).",
            "The upward force becomes greater than weight, causing deceleration.",
            "The paratrooper reaches a new, much lower terminal velocity."
        ],
        hint: "Focus on surface area and the new terminal velocity."
    },
    {
        id: 8,
        topic: "Forces and Motion",
        question: "A comet orbits the Sun in an elliptical path. Explain why the comet travels fastest when it is closest to the Sun. (4 Marks)",
        markScheme: [
            "Gravitational pull is strongest when the distance is smallest.",
            "GPE (Gravitational Potential Energy) is converted into KE (Kinetic Energy).",
            "As the comet gets closer, GPE decreases and KE increases.",
            "Higher KE results in a higher velocity (1/2mv²)."
        ],
        hint: "Talk about energy transfers: GPE to KE."
    },
    {
        id: 9,
        topic: "Forces and Motion",
        question: "Using Newton's Third Law, explain the motion of a rocket as it launches into space. (4 Marks)",
        markScheme: [
            "The rocket pushes the exhaust gases downwards (Action force).",
            "The gases push the rocket upwards with an equal and opposite force (Reaction force).",
            "This upward force is greater than the weight of the rocket.",
            "This creates an upward resultant force, causing the rocket to accelerate."
        ],
        hint: "Action and Reaction are the keywords here."
    },
    {
        id: 10,
        topic: "Forces and Motion",
        question: "Explain why a ball bouncing on a floor does not return to its original height. (4 Marks)",
        markScheme: [
            "Energy is transferred to the surroundings during the impact.",
            "Energy is lost as thermal energy (heat) and sound energy.",
            "The ball has less Kinetic Energy (KE) as it leaves the floor.",
            "Therefore, it has less GPE at the top of the next bounce."
        ],
        hint: "Think about 'Conservation of Energy' and 'Losses'."
    },
    {
        id: 11,
        topic: "Forces and Motion",
        type: "graph",
        question: "A car decelerates from 20 m/s to 0 m/s in 5 seconds. Sketch how this appears on a Velocity-Time graph and calculate the deceleration. (4 Marks)",
        graphData: [
            { x: 0, y: 20 },
            { x: 5, y: 0 }
        ],
        markScheme: [
            "Description: A straight line sloping downwards from (0, 20) to (5, 0).",
            "Formula: Acceleration = (v - u) / t.",
            "Calculation: (0 - 20) / 5 = -4 m/s².",
            "The negative sign (or the word 'deceleration') indicates slowing down."
        ],
        hint: "Deceleration is just negative acceleration."
    },
    {
        id: 12,
        topic: "Forces and Motion",
        question: "Explain why the area under a Velocity-Time graph represents the distance moved. (4 Marks)",
        markScheme: [
            "Velocity is defined as the rate of change of displacement (v = d / t).",
            "Rearranging gives d = v x t.",
            "On a graph, the Y-axis is Velocity and the X-axis is Time.",
            "The product of the axes (area) therefore equals the distance (Base x Height)."
        ],
        hint: "Think about the units: m/s multiplied by s equals meters."
    },
    {
        id: 13,
        topic: "Forces and Motion",
        question: "Look at the generated graph. Calculate the acceleration during the first 5 seconds. (4 Marks)",
        graphData: [{x: 0, y: 0}, {x: 5, y: 20}, {x: 10, y: 20}], // Data for the Canvas to draw
        markScheme: [
            "Acceleration = Change in Velocity / Time.",
            "Change in velocity = 20 - 0 = 20 m/s.",
            "Time = 5s.",
            "Calculation: 20 / 5 = 4 m/s²."
        ],
        hint: "The gradient of the first section of the line is the acceleration."
    },
    {
        id: 14,
        topic: "Forces and Motion",
        question: "Using the graph, calculate the total distance travelled in 10 seconds. (4 Marks)",
        graphData: [{x: 0, y: 0}, {x: 5, y: 20}, {x: 10, y: 20}],
        markScheme: [
            "Distance = Area under the graph.",
            "Area of Triangle (0-5s) = 0.5 x 5 x 20 = 50m.",
            "Area of Rectangle (5-10s) = 5 x 20 = 100m.",
            "Total Distance = 150m."
        ],
        hint: "Find the area of the triangle and the rectangle then add them."
    },
    {
        id: 15,
        topic: "Forces and Motion",
        question: "Explain why a feather and a hammer fall at the same rate in a vacuum. (4 Marks)",
        markScheme: [
            "In a vacuum, there is no air resistance / drag.",
            "The only force acting is weight (gravity).",
            "All objects have the same acceleration due to gravity (g).",
            "Resultant force per unit mass is the same for both."
        ],
        hint: "Think about what force is 'missing' in a vacuum."
    },
    {
        id: 16,
        topic: "Forces and Motion",
        question: "A car travels at 30 m/s. The driver has a reaction time of 0.7s. Calculate the thinking distance. (4 Marks)",
        markScheme: [
            "Thinking distance = Speed x Reaction Time.",
            "Calculation: 30 x 0.7.",
            "Result: 21 meters.",
            "Explain: This is the distance moved before the brakes are applied."
        ],
        hint: "Use Distance = Speed x Time."
    },
    {
        id: 17,
        topic: "Forces and Motion",
        question: "Describe how the stopping distance of a car changes when the road is icy. (4 Marks)",
        markScheme: [
            "Stopping distance = Thinking distance + Braking distance.",
            "Icy roads reduce /grip between tires and road.",
            "This increases the braking distance significantly.",
            "The thinking distance remains the same (as it depends on the driver)."
        ],
        hint: "Does ice affect the driver's brain or the car's tires?"
    },
    {
        id: 18,
        topic: "Forces and Motion",
        type: "graph",
        question: "A student investigates Hooke's Law using a spring. The graph shows the results. Calculate the spring constant (k) in N/cm and identify the limit of proportionality. (4 Marks)",
        xAxisLabel: "Extension (cm)",
        yAxisLabel: "Force (N)",
        graphData: [
            { x: 0, y: 0 },
            { x: 2, y: 10 },
            { x: 4, y: 20 },
            { x: 6, y: 30 },
            { x: 8, y: 38 },
            { x: 10, y: 44 }
        ],
        markScheme: [
            "Formula: Force = spring constant x extension (F = kx).",
            "Calculation: k = F / x = 20 / 4 = 5 N/cm (using any point on the linear section).",
            "Limit of proportionality: The point where the graph stops being a straight line.",
            "Result: 6 cm (after this, the extension is no longer proportional to force)."
        ],
        hint: "The spring constant is the gradient of the straight-line section."
    },
    {
        id: 19,
        topic: "Electricity",
        type: "drawing",
        drawType: "staticRod",
        question: "Explain how a polyethene rod becomes negatively charged when rubbed with a dry cloth. (4 Marks)",
        markScheme: [
            "Rubbing between the rod and the cloth causes the transfer of electrons.",
            "Electrons move from the cloth to the polyethene rod.",
            "The rod gains a net negative charge because it has an excess of electrons.",
            "The cloth is left with an equal net positive charge."
        ],
        hint: "Remember: only electrons move, never protons!"
    },
    {
        id: 20,
        topic: "Electricity",
        question: "A current of 0.5 A flows through a lamp for 2 minutes. Calculate the total charge that passes through the lamp. (4 Marks)",
        markScheme: [
            "State formula: Q = I x t.",
            "Convert time to seconds: 2 minutes = 120 seconds.",
            "Substitute values: Q = 0.5 x 120.",
            "Final Answer: 60 Coulombs."
        ],
        hint: "Always check that your time is in seconds before calculating."
    },
    {
        id: 21,
        topic: "Electricity",
        type: "drawing",
        drawType: "ivGraphFilament",
        question: "Describe and explain the shape of the I-V graph for a filament lamp. (4 Marks)",
        markScheme: [
            "As voltage increases, the current increases at a decreasing rate (non-linear).",
            "The temperature of the filament increases as more current flows.",
            "Increased temperature causes the metal ions in the filament to vibrate more.",
            "This leads to more frequent collisions with electrons, increasing the resistance."
        ],
        hint: "The graph curves because the lamp gets hot."
    },
    {
        id: 22,
        topic: "Electricity",
        type: "drawing",
        drawType: "ldrThermistor",
        question: "Explain how the resistance of a Light Dependent Resistor (LDR) changes as light intensity increases and give a practical use. (4 Marks)",
        markScheme: [
            "As light intensity increases, the resistance of the LDR decreases.",
            "This happens because the light energy releases more free charge carriers in the material.",
            "Practical use: Street lights that turn on automatically at night.",
            "In a circuit, this change in resistance is often used to trigger a switch."
        ],
        hint: "Bright light = Low resistance."
    },
    {
        id: 23,
        topic: "Electricity",
        type: "drawing",
        drawType: "seriesParallel",
        question: "Compare the behavior of voltage and current in a series circuit versus a parallel circuit. (4 Marks)",
        markScheme: [
            "Series: Current is the same everywhere; Voltage is shared between components.",
            "Parallel: Current is shared between branches; Voltage is the same across each branch.",
            "In series, if one bulb breaks, the whole circuit stops.",
            "In parallel, components can be switched on/off independently."
        ],
        hint: "Think: Series is one loop, Parallel is many paths."
    },
    {
        id: 24,
        topic: "Electricity",
        type: "drawing",
        drawType: "ivGraphResistor",
        question: "A resistor has a resistance of 20 Ω. If a voltage of 5 V is applied across it, calculate the current. (4 Marks)",
        markScheme: [
            "State formula: V = I x R.",
            "Rearrange for current: I = V / R.",
            "Substitute values: I = 5 / 20.",
            "Final Answer: 0.25 A."
        ],
        hint: "Voltage / Resistance = Current."
    },
    {
        id: 25,
        topic: "Electricity",
        type: "drawing",
        drawType: "threePinPlug",
        question: "Explain the role of the Earth wire and how it works with a fuse to protect a user. (4 Marks)",
        markScheme: [
            "If a fault occurs and the live wire touches the metal casing, the Earth wire provides a low-resistance path to ground.",
            "This causes a large surge in current to flow through the Earth wire.",
            "The high current causes the fuse to melt (blow).",
            "This breaks the circuit and prevents the user from receiving an electric shock."
        ],
        hint: "The Earth wire is a safety 'escape route' for current."
    },
    {
        id: 26,
        topic: "Electricity",
        question: "Explain why some appliances do not require an Earth wire and identify the symbol for this safety feature. (4 Marks)",
        markScheme: [
            "These appliances are 'Double Insulated'.",
            "They have a plastic outer casing that is an insulator.",
            "Even if a wire comes loose inside, the casing cannot become live/conduct electricity.",
            "The symbol is a 'square within a square'."
        ],
        hint: "Plastic cases don't need grounding."
    },
    {
        id: 27,
        topic: "Electricity",
        question: "Describe how a fuse protects a circuit and state why a 13 A fuse is not suitable for a 3 A appliance. (4 Marks)",
        markScheme: [
            "A fuse contains a thin wire that melts if the current exceeds its rating.",
            "This breaks the circuit and stops the flow of electricity.",
            "A 13 A fuse would allow too much current to flow before melting.",
            "This could lead to the appliance overheating or a fire occurring."
        ],
        hint: "Choose a fuse slightly higher than the operating current."
    },
    {
        id: 28,
        topic: "Electricity",
        question: "A toaster is rated at 900 W and is connected to a 230 V supply. Calculate the current flowing through it. (4 Marks)",
        markScheme: [
            "State formula: P = I x V.",
            "Rearrange for current: I = P / V.",
            "Substitute values: I = 900 / 230.",
            "Final Answer: 3.91 A."
        ],
        hint: "Power / Voltage = Current."
    },
    {
        id: 29,
        topic: "Electricity",
        question: "Explain how the resistance of an NTC thermistor changes with temperature and suggest one use. (4 Marks)",
        markScheme: [
            "As temperature increases, the resistance of the thermistor decreases.",
            "Thermal energy releases more charge carriers in the semi-conductor material.",
            "Use: Digital thermometers or oven temperature sensors.",
            "In a potential divider, this can be used to control a heating/cooling system."
        ],
        hint: "Negative Temperature Coefficient (NTC) means up = down."
    },
    {
        id: 30,
        topic: "Electricity",
        type: "drawing",
        drawType: "ivGraphDiode",
        question: "Describe the function of a diode and explain its I-V characteristic. (4 Marks)",
        markScheme: [
            "A diode allows current to flow in only one direction (forward bias).",
            "In the reverse direction, it has a very high resistance, so no current flows.",
            "In the forward direction, there is zero current until a threshold voltage is reached.",
            "After the threshold, the current increases rapidly with small increases in voltage."
        ],
        hint: "A diode is like a one-way valve for electricity."
    },
    {
        id: 31,
        topic: "Electricity",
        question: "Two 10 Ω resistors are connected in parallel. Explain what happens to the total resistance of the circuit compared to a single resistor. (4 Marks)",
        markScheme: [
            "The total resistance of a parallel circuit is always less than the resistance of the smallest branch.",
            "Adding a branch provides an extra path for the current to flow.",
            "This increases the total current for the same supply voltage.",
            "Since R = V/I, an increase in total current means a decrease in total resistance."
        ],
        hint: "More paths = Easier flow = Lower resistance."
    },
    {
        id: 32,
        topic: "Electricity",
        question: "State two factors that affect the resistance of a metal wire and explain how they affect it. (4 Marks)",
        markScheme: [
            "Length: Resistance is directly proportional to length (longer = higher resistance).",
            "Cross-sectional area: Resistance is inversely proportional to area (thicker = lower resistance).",
            "Longer wires mean more collisions for electrons; thicker wires provide more space to flow.",
            "Temperature also increases resistance as ions vibrate more."
        ],
        hint: "Think of a wire as a hallway; long and narrow is hard to walk through."
    },
    {
        id: 33,
        topic: "Electricity",
        question: "Distinguish between direct current (DC) and alternating current (AC). (4 Marks)",
        markScheme: [
            "DC: The current flows in only one direction (e.g. from a battery).",
            "AC: The current constantly changes direction (e.g. mains electricity).",
            "Mains supply in the UK is AC with a frequency of 50 Hz.",
            "DC has a constant voltage, while AC voltage varies sinusoidally."
        ],
        hint: "Batteries = DC; Plugs = AC."
    },
    {
        id: 34,
        topic: "Electricity",
        question: "Explain the energy transfers that occur when a current flows through a resistor. (4 Marks)",
        markScheme: [
            "Electrical energy is transferred to the thermal energy store of the resistor.",
            "This happens because electrons collide with the ions in the metal lattice.",
            "The kinetic energy of the ions increases, causing them to vibrate more.",
            "This thermal energy is then dissipated to the surroundings."
        ],
        hint: "Collision between electrons and ions creates heat."
    },
    {
        id: 35,
        topic: "Electricity",
        type: "drawing",
        drawType: "circuitSymbols",
        question: "Identify symbols C and F in the grid, and explain their functions. (4 Marks)",
        markScheme: [
            "Symbol C is a Variable Resistor (A rectangle with a diagonal arrow).",
            "Symbol F is a Fuse (A rectangle with a line passing through it).",
            "The variable resistor allows for manual control of the circuit's resistance.",
            "The fuse protects the circuit by breaking it if current becomes too high."
        ],
        hint: "Arrow = change; Line through = safety wire."
    },
    {
        id: 36,
        topic: "Electricity",
        question: "Three resistors (5 Ω, 10 Ω, and 15 Ω) are connected in series. Calculate the total resistance. (4 Marks)",
        markScheme: [
            "State formula: R_total = R1 + R2 + R3.",
            "Substitute values: R_total = 5 + 10 + 15.",
            "Calculation: 30 Ω.",
            "Explain that the total resistance is the sum of all individual resistances in a single loop."
        ],
        hint: "Just add them up for series!"
    },
    {
        id: 37,
        topic: "Electricity",
        question: "Explain why switches in a bathroom are often operated by a pull-cord and are splash-proof. (4 Marks)",
        markScheme: [
            "Water is a good conductor of electricity.",
            "Damp hands on a standard wall switch could create a path for current to the user.",
            "The pull-cord ensures the user does not touch any electrical components directly.",
            "Splash-proof covers prevent steam/water from entering and short-circuiting the device."
        ],
        hint: "Water + Electricity = Danger."
    },
    {
        id: 38,
        topic: "Electricity",
        question: "Calculate the energy transferred when a charge of 200 C passes through a potential difference of 12 V. (4 Marks)",
        markScheme: [
            "State formula: E = Q x V.",
            "Substitute values: E = 200 x 12.",
            "Calculation: 2,400 Joules.",
            "Explain that potential difference is the energy transferred per unit of charge."
        ],
        hint: "Energy = Charge x Voltage."
    },
    {
        id: 501,
        topic: "Waves",
        type: "drawing",
        drawType: "waveLabels",
        question: "Label the following parts of a transverse wave: Amplitude, Wavelength, Peak, and Trough. (4 Marks)",
        markScheme: [
            "Peak: The highest point of the wave above the rest position.",
            "Trough: The lowest point of the wave below the rest position.",
            "Amplitude: The maximum displacement from the rest position to a peak or trough.",
            "Wavelength: The distance between two consecutive identical points (e.g., peak to peak)."
        ],
        hint: "Think about the vertical and horizontal dimensions of the wave."
    },
    {
        id: 502,
        topic: "Waves",
        type: "drawing",
        drawType: "refractionRay",
        question: "Explain why a light ray bends towards the normal when entering a glass block from air. (4 Marks)",
        markScheme: [
            "Glass is more optically dense than air.",
            "Light travels slower in glass than in air.",
            "The part of the wavefront entering first slows down first, causing the ray to pivot.",
            "This change in speed results in a change in direction towards the normal."
        ],
        hint: "Speed decreases in denser materials."
    },
    {
        id: 503,
        topic: "Waves",
        type: "drawing",
        drawType: "tirRay",
        question: "State the two conditions required for Total Internal Reflection (TIR) to occur. (4 Marks)",
        markScheme: [
            "The light must be traveling from a more dense medium to a less dense medium (e.g., glass to air).",
            "The angle of incidence must be greater than the critical angle for that boundary.",
            "At the critical angle, the ray refracts along the boundary (90 degrees).",
            "Beyond the critical angle, all light is reflected back into the denser medium."
        ],
        hint: "Think about the 'Critical Angle' and the 'Denser to Less Dense' rule."
    },
    {
        id: 504,
        topic: "Waves",
        type: "drawing",
        drawType: "diffraction",
        question: "Describe how the width of a gap affects the amount of diffraction that occurs as waves pass through it. (4 Marks)",
        markScheme: [
            "Diffraction is the spreading out of waves as they pass through a gap or around an obstacle.",
            "Maximum diffraction occurs when the gap width is approximately equal to the wavelength.",
            "If the gap is much wider than the wavelength, very little diffraction occurs.",
            "The waves emerge more curved when the gap is narrow relative to the wavelength."
        ],
        hint: "Gap size vs Wavelength is the key ratio."
    },
    {
        id: 505,
        topic: "Waves",
        type: "drawing",
        drawType: "oscilloscope",
        question: "Compare the sound waves produced by a high-pitched, quiet sound versus a low-pitched, loud sound. (4 Marks)",
        markScheme: [
            "High-pitched sound has a higher frequency (more waves per second).",
            "Quiet sound has a smaller amplitude (shorter peaks).",
            "Low-pitched sound has a lower frequency (fewer waves per second).",
            "Loud sound has a larger amplitude (taller peaks)."
        ],
        hint: "Frequency = Pitch; Amplitude = Loudness."
    },
    {
        id: 506,
        topic: "Waves",
        type: "drawing",
        drawType: "emSpectrum",
        question: "List the seven regions of the electromagnetic spectrum in order of increasing frequency. (4 Marks)",
        markScheme: [
            "Radio waves, Microwaves, Infrared, Visible light.",
            "Ultraviolet, X-rays, Gamma rays.",
            "Radio waves have the longest wavelength and lowest frequency.",
            "Gamma rays have the shortest wavelength and highest frequency."
        ],
        hint: "Remember: 'Rich Men In Vegas Use X-ray Glasses'."
    },
    {
        id: 507,
        topic: "Waves",
        type: "drawing",
        drawType: "dopplerEffect",
        question: "Explain why the pitch of a siren sounds higher as an ambulance approaches an observer. (4 Marks)",
        markScheme: [
            "As the source moves towards the observer, the sound waves are 'bunched up' in front.",
            "This results in a shorter observed wavelength.",
            "Since wave speed is constant, a shorter wavelength means a higher frequency.",
            "The observer hears a higher frequency, which is perceived as a higher pitch."
        ],
        hint: "Waves are compressed in the direction of motion."
    },
    {
        id: 508,
        topic: "Waves",
        type: "drawing",
        drawType: "opticalFiber",
        question: "Explain how optical fibers are used to transmit data over long distances using TIR. (4 Marks)",
        markScheme: [
            "Light signals are sent down a core made of high-purity glass.",
            "The light hits the boundary between the core and cladding at an angle greater than the critical angle.",
            "Total Internal Reflection occurs, keeping the light trapped inside the core.",
            "The signal can travel long distances with very little loss of energy."
        ],
        hint: "Light 'bounces' along the inside of the fiber."
    },
    {
        id: 509,
        topic: "Waves",
        type: "drawing",
        drawType: "soundVibrations",
        question: "Describe how sound travels through air in terms of compressions and rarefactions. (4 Marks)",
        markScheme: [
            "Sound is a longitudinal wave caused by vibrating objects.",
            "Compressions are regions where air particles are pushed close together (high pressure).",
            "Rarefactions are regions where air particles are spread further apart (low pressure).",
            "The vibrations are passed from particle to particle in the direction of wave travel."
        ],
        hint: "Sound needs a medium (particles) to travel."
    },
    {
        id: 510,
        topic: "Waves",
        question: "Define 'Frequency' and 'Period' of a wave and state the relationship between them. (4 Marks)",
        markScheme: [
            "Frequency (f): The number of complete waves passing a point per second (measured in Hertz, Hz).",
            "Period (T): The time taken for one complete wave to pass a point (measured in seconds).",
            "Relationship: Frequency = 1 / Period (f = 1/T).",
            "If the period is 0.5s, the frequency is 2 Hz."
        ],
        hint: "Frequency is 'how often'; Period is 'how long'."
    },
    {
        id: 511,
        topic: "Waves",
        question: "State the wave equation and calculate the speed of a wave with a frequency of 500 Hz and a wavelength of 0.2 m. (4 Marks)",
        markScheme: [
            "Wave Equation: Wave Speed = Frequency x Wavelength (v = fλ).",
            "Substitute values: v = 500 x 0.2.",
            "Calculation: v = 100.",
            "Units: 100 m/s."
        ],
        hint: "v = f x lambda."
    },
    {
        id: 512,
        topic: "Waves",
        question: "Explain the difference between specular reflection and diffuse reflection. (4 Marks)",
        markScheme: [
            "Specular reflection occurs on smooth surfaces (like a mirror).",
            "Parallel incident rays are reflected as parallel rays, forming a clear image.",
            "Diffuse reflection occurs on rough surfaces (like paper).",
            "Incident rays are scattered in many different directions, so no clear image is formed."
        ],
        hint: "Smooth = Mirror-like; Rough = Scattered."
    },
    {
        id: 513,
        topic: "Waves",
        question: "List two uses of Microwaves and explain why they are suitable for these purposes. (4 Marks)",
        markScheme: [
            "Cooking: Microwaves are absorbed by water molecules, transferring energy to heat food.",
            "Satellite Communication: Microwaves can pass through the Earth's ionosphere to reach satellites.",
            "They have a relatively short wavelength, allowing for high-bandwidth data transmission.",
            "They travel in straight lines (line-of-sight), which is useful for point-to-point links."
        ],
        hint: "Think about your kitchen and your phone."
    },
    {
        id: 514,
        topic: "Waves",
        question: "Describe the dangers of overexposure to Ultraviolet (UV) radiation and X-rays. (4 Marks)",
        markScheme: [
            "UV: Can cause sunburn and premature aging of the skin.",
            "UV: Increases the risk of skin cancer and can damage eyes (cataracts).",
            "X-rays: Are ionizing radiation that can damage DNA in cells.",
            "X-rays: High doses can lead to cell mutations and cancer."
        ],
        hint: "Both are higher energy than visible light."
    },
    {
        id: 515,
        topic: "Waves",
        question: "Explain how a prism splits white light into a spectrum of colors (dispersion). (4 Marks)",
        markScheme: [
            "White light is a mixture of different colors (wavelengths).",
            "Different colors travel at different speeds in glass.",
            "Violet light slows down the most and refracts (bends) the most.",
            "Red light slows down the least and refracts the least, causing the colors to spread out."
        ],
        hint: "ROY G BIV - Red is at the top, Violet at the bottom."
    },
    {
        id: 516,
        topic: "Waves",
        type: "drawing",
        drawType: "reflection",
        question: "State the law of reflection and explain what the 'Normal' line is. (4 Marks)",
        markScheme: [
            "Law of Reflection: The angle of incidence is equal to the angle of reflection (i = r).",
            "The angles are measured between the ray and the Normal line.",
            "The Normal is an imaginary line drawn perpendicular (90 degrees) to the surface at the point of incidence.",
            "Both the incident ray, reflected ray, and normal lie in the same plane."
        ],
        hint: "i = r. Always measure from the normal."
    },
    {
        id: 517,
        topic: "Waves",
        question: "Describe an experiment to measure the speed of sound in air using an echo. (4 Marks)",
        markScheme: [
            "Stand a measured distance (e.g., 100m) from a large flat wall.",
            "Clap two wooden blocks together and listen for the echo.",
            "Adjust the timing of claps so the next clap coincides with the previous echo.",
            "Speed = (2 x Distance) / Time for one clap-echo cycle."
        ],
        hint: "Distance is doubled because the sound goes there and back."
    },
    {
        id: 518,
        topic: "Waves",
        question: "Calculate the critical angle for a glass-air boundary if the refractive index of glass is 1.5. (4 Marks)",
        markScheme: [
            "Formula: sin(c) = 1 / n.",
            "Substitute values: sin(c) = 1 / 1.5 = 0.667.",
            "Calculation: c = arcsin(0.667).",
            "Final Answer: c = 41.8 degrees (approx)."
        ],
        hint: "sin(c) = 1/n."
    },
    {
        id: 519,
        topic: "Waves",
        question: "Explain why sound cannot travel through a vacuum. (4 Marks)",
        markScheme: [
            "Sound is a mechanical wave that requires a medium to travel.",
            "It travels by passing vibrations from one particle to the next.",
            "A vacuum contains no particles (it is empty space).",
            "Therefore, there are no particles to vibrate and pass the energy along."
        ],
        hint: "In space, no one can hear you scream."
    },
    {
        id: 520,
        topic: "Waves",
        question: "Compare the properties of P-waves and S-waves produced during an earthquake. (4 Marks)",
        markScheme: [
            "P-waves (Primary): Longitudinal waves that travel faster and can pass through solids and liquids.",
            "S-waves (Secondary): Transverse waves that travel slower and can only pass through solids.",
            "P-waves cause the ground to move back and forth in the direction of travel.",
            "S-waves cause the ground to move side-to-side (perpendicular to travel)."
        ],
        hint: "P = Push/Pull (Longitudinal); S = Side-to-side (Transverse)."
    },
    {
        id: 521,
        topic: "Waves",
        question: "Explain how an ultrasound scan is used to produce an image of a fetus. (4 Marks)",
        markScheme: [
            "High-frequency sound waves (ultrasound) are sent into the body.",
            "The waves are partially reflected at boundaries between different tissues (e.g., fluid and bone).",
            "The time taken for the echoes to return is measured.",
            "A computer uses the speed of sound and the time to calculate distance and build an image."
        ],
        hint: "It's like sonar for the body."
    },
    {
        id: 522,
        topic: "Waves",
        question: "State two uses of Infrared radiation and explain one danger. (4 Marks)",
        markScheme: [
            "Uses: Remote controls, Thermal imaging cameras, Cooking (grills/toasters).",
            "Suitability: IR is absorbed by surfaces, increasing their thermal energy.",
            "Danger: Overexposure can cause skin burns as it heats the tissue.",
            "It is also used in fiber optic communication (short range)."
        ],
        hint: "Think about heat and remotes."
    },
    {
        id: 523,
        topic: "Waves",
        question: "Describe the relationship between the energy of an EM wave and its frequency. (4 Marks)",
        markScheme: [
            "The energy of an EM wave is directly proportional to its frequency.",
            "Higher frequency waves (like Gamma) carry much more energy than lower frequency waves (like Radio).",
            "This is why high-frequency waves are more likely to be ionizing and dangerous.",
            "Energy = Planck's constant x Frequency (E = hf)."
        ],
        hint: "High frequency = High energy."
    },
    {
        id: 524,
        topic: "Waves",
        question: "Explain how a radio antenna works to receive signals. (4 Marks)",
        markScheme: [
            "Radio waves are oscillating electromagnetic fields.",
            "When they hit a metal antenna, they cause electrons in the metal to oscillate.",
            "This creates an alternating current (AC) in the antenna circuit.",
            "The frequency of the AC matches the frequency of the radio wave."
        ],
        hint: "Waves move electrons in the wire."
    },
    {
        id: 525,
        topic: "Waves",
        type: "drawing",
        drawType: "refraction",
        question: "Define 'Refractive Index' and state the formula linking it to the speed of light. (4 Marks)",
        markScheme: [
            "Refractive Index (n) is a measure of how much a medium slows down light.",
            "Formula: n = Speed of light in vacuum (c) / Speed of light in medium (v).",
            "It is a ratio and has no units.",
            "A higher refractive index means light travels slower in that material."
        ],
        hint: "n = c / v."
    },
    {
        id: 526,
        topic: "Waves",
        question: "Explain why the sky appears blue during the day. (4 Marks)",
        markScheme: [
            "Sunlight (white light) enters the Earth's atmosphere.",
            "The atmosphere contains small molecules that scatter sunlight.",
            "Shorter wavelengths (blue/violet) are scattered much more than longer wavelengths (red).",
            "Our eyes see this scattered blue light coming from all directions in the sky."
        ],
        hint: "Blue light scatters more easily."
    },
    {
        id: 527,
        topic: "Waves",
        question: "Describe the properties of a virtual image formed by a plane mirror. (4 Marks)",
        markScheme: [
            "The image is virtual (cannot be projected onto a screen).",
            "The image is upright (the same way up as the object).",
            "The image is the same size as the object.",
            "The image is laterally inverted (left and right are swapped)."
        ],
        hint: "Think about what you see when you look in a mirror."
    },
    {
        id: 528,
        topic: "Waves",
        question: "Explain how a stethoscope works to help a doctor hear a heartbeat. (4 Marks)",
        markScheme: [
            "The chest piece captures sound vibrations from the heart.",
            "The sound waves travel through hollow tubes to the earpieces.",
            "The tubes prevent the sound from spreading out, keeping the intensity high.",
            "Multiple reflections inside the tubes guide the sound to the doctor's ears."
        ],
        hint: "It channels the sound waves."
    },
    {
        id: 529,
        topic: "Waves",
        question: "State the human hearing range and define 'Ultrasound' and 'Infrasound'. (4 Marks)",
        markScheme: [
            "Human hearing range: 20 Hz to 20,000 Hz (20 kHz).",
            "Ultrasound: Sound waves with frequencies higher than 20,000 Hz.",
            "Infrasound: Sound waves with frequencies lower than 20 Hz.",
            "Many animals (like bats or elephants) can hear outside the human range."
        ],
        hint: "20 to 20k is the magic range."
    },
    {
        id: 530,
        topic: "Waves",
        question: "Explain why we see lightning before we hear thunder. (4 Marks)",
        markScheme: [
            "Light and sound are both waves, but they travel at very different speeds.",
            "Light travels at approximately 300,000,000 m/s.",
            "Sound travels at approximately 340 m/s in air.",
            "The light from the lightning reacher our eyes almost instantly, while the sound takes much longer."
        ],
        hint: "Light is much, much faster than sound."
    },
    {
        id: 531,
        topic: "Waves",
        question: "Describe how the pitch of a sound changes if the tension in a guitar string is increased. (4 Marks)",
        markScheme: [
            "Increasing the tension makes the string tighter.",
            "A tighter string vibrates faster (higher frequency) when plucked.",
            "Frequency is directly related to pitch.",
            "Therefore, the pitch of the sound produced will be higher."
        ],
        hint: "Tighter string = Faster vibration = Higher pitch."
    },
    {
        id: 532,
        topic: "Waves",
        type: "drawing",
        drawType: "wavefronts",
        question: "Explain what is meant by 'Wavefronts' and how they relate to rays. (4 Marks)",
        markScheme: [
            "A wavefront is an imaginary line joining all the points on a wave that are in the same phase (e.g., all peaks).",
            "Rays are lines drawn to show the direction of wave travel.",
            "Rays are always perpendicular (at 90 degrees) to the wavefronts.",
            "The distance between consecutive wavefronts is equal to the wavelength."
        ],
        hint: "Wavefronts are like the crests of ripples in a pond."
    },
    {
        id: 533,
        topic: "Waves",
        question: "State two properties that are common to all electromagnetic waves. (4 Marks)",
        markScheme: [
            "All EM waves travel at the same speed in a vacuum (3 x 10^8 m/s).",
            "All EM waves are transverse waves (oscillations are perpendicular to travel).",
            "They can all travel through a vacuum (do not require a medium).",
            "They all transfer energy from a source to an observer."
        ],
        hint: "Think about speed and wave type."
    },
    {
        id: 534,
        topic: "Waves",
        question: "Explain how a microwave oven heats food, referring to the penetration of waves. (4 Marks)",
        markScheme: [
            "Microwaves penetrate a few centimeters into the food.",
            "They are absorbed by water, fat, and sugar molecules.",
            "The energy causes these molecules to vibrate rapidly, increasing their thermal energy.",
            "The heat is then conducted to the center of the food."
        ],
        hint: "Absorption by water molecules is the key."
    },
    {
        id: 535,
        topic: "Waves",
        question: "Describe the difference between a pulse and a continuous wave. (4 Marks)",
        markScheme: [
            "A pulse is a single disturbance that moves through a medium.",
            "A continuous wave is a series of repeated disturbances (oscillations).",
            "A pulse has a definite start and end; a continuous wave has a frequency and period.",
            "Both transfer energy without transferring matter."
        ],
        hint: "One-off hit vs steady vibration."
    },
    {
        id: 301,
        topic: "Energy Resources",
        type: "energy",
        drawType: "sankey",
        usefulEnergy: 20,
        question: "Look at the Sankey diagram for a filament bulb. Calculate the efficiency and explain what happens to the 'wasted' energy. (4 Marks)",
        markScheme: [
            "Efficiency = (Useful Energy / Total Energy) x 100.",
            "Calculation: 20% (as shown by the width of the useful arrow).",
            "Wasted energy is transferred to the surroundings as thermal energy (heat).",
            "The energy becomes 'dissipated' and is no longer useful for its purpose."
        ],
        hint: "Efficiency is always Useful divided by Total."
    },
    {
        id: 302,
        topic: "Energy Resources",
        type: "energy",
        drawType: "vacuumFlask",
        question: "Describe how a vacuum flask (Thermos) minimizes energy transfer by conduction and convection. (4 Marks)",
        markScheme: [
            "The vacuum between the walls prevents conduction (needs particles).",
            "The vacuum also prevents convection (needs a fluid/gas to move).",
            "The plastic cap is an insulator, reducing conduction.",
            "The tight lid prevents evaporation and convection currents from escaping."
        ],
        hint: "Think about why a 'vacuum' is the ultimate insulator."
    },
    {
        id: 303,
        topic: "Energy Resources",
        type: "energy",
        drawType: "convection",
        question: "Explain the process of a convection current in a room heated by a radiator. (4 Marks)",
        markScheme: [
            "Air near the radiator is heated, causing the particles to move faster and spread out.",
            "The heated air becomes less dense and rises.",
            "Cooler, denser air sinks to take its place near the radiator.",
            "This cycle continues, creating a continuous flow of air (convection current)."
        ],
        hint: "Density is the key word here!"
    },
    {
        id: 304,
        topic: "Energy Resources",
        type: "energy",
        drawType: "radiationSurface",
        question: "Explain why black, matte surfaces are better than shiny, silver surfaces for cooling down a hot object. (4 Marks)",
        markScheme: [
            "Black, matte surfaces are the best emitters of infrared radiation.",
            "Shiny, silver surfaces are poor emitters (they reflect radiation back in).",
            "Energy is transferred away from the object faster via radiation.",
            "This results in a quicker drop in temperature for the black object."
        ],
        hint: "Think about 'Emitters' vs 'Absorbers'."
    },
    {
        id: 305,
        topic: "Energy Resources",
        type: "energy",
        drawType: "windTurbine",
        question: "Describe the energy transfers that occur in a wind turbine used to generate electricity. (4 Marks)",
        markScheme: [
            "Kinetic energy of the wind is transferred to the kinetic energy of the turbine blades.",
            "The blades turn a generator.",
            "In the generator, kinetic energy is transferred to electrical energy.",
            "Some energy is wasted as thermal and sound energy due to ."
        ],
        hint: "Start with the wind and end with the wires."
    },
    {
        id: 306,
        topic: "Energy Resources",
        question: "Explain the difference between renewable and non-renewable energy resources, giving one example of each. (4 Marks)",
        markScheme: [
            "Renewable: Resources that are replenished at a rate equal to or faster than they are used (e.g., Solar/Wind).",
            "Non-renewable: Resources that are finite and will eventually run out (e.g., Coal/Oil/Gas).",
            "Renewables usually have a lower environmental impact (less CO2).",
            "Non-renewables are currently more reliable for meeting base-load demand."
        ],
        hint: "Think about 'Running out' vs 'Always there'."
    },
    {
        id: 307,
        topic: "Energy Resources",
        type: "energy",
        drawType: "fallingBall",
        question: "A ball is dropped from a height. Explain the energy transfers from the moment it is released until it hits the ground. (4 Marks)",
        markScheme: [
            "At the start, the ball has maximum Gravitational Potential Energy (GPE).",
            "As it falls, GPE is transferred into Kinetic Energy (KE).",
            "Energy is also lost to the surroundings as heat due to air resistance.",
            "Just before impact, KE is at its maximum and GPE is at its minimum."
        ],
        hint: "GPE to KE is the main transition."
    },
    {
        id: 308,
        topic: "Energy Resources",
        question: "Discuss the advantages and disadvantages of using nuclear power to generate electricity. (4 Marks)",
        markScheme: [
            "Advantage: Does not produce greenhouse gases (CO2) during operation.",
            "Advantage: Produces a huge amount of energy from a small amount of fuel.",
            "Disadvantage: Produces radioactive waste that is difficult/expensive to store safely.",
            "Disadvantage: Risk of major accidents (though rare) and high decommissioning costs."
        ],
        hint: "Think 'Clean air' but 'Bad waste'."
    },
    {
        id: 309,
        topic: "Energy Resources",
        question: "Define the Principle of Conservation of Energy. (4 Marks)",
        markScheme: [
            "Energy cannot be created or destroyed.",
            "Energy can only be transferred from one store to another.",
            "The total energy in a closed system remains constant.",
            "Energy can be dissipated (wasted) but it is still present in the system."
        ],
        hint: "The total never changes!"
    },
    {
        id: 310,
        topic: "Energy Resources",
        type: "energy",
        drawType: "loftInsulation",
        question: "Explain how loft insulation reduces energy loss from a house. (4 Marks)",
        markScheme: [
            "Insulation (like fiberglass) traps pockets of air.",
            "Air is a very poor conductor, reducing energy loss by conduction.",
            "Trapped air cannot move, preventing energy loss by convection currents.",
            "This keeps the house warmer for longer, reducing heating costs."
        ],
        hint: "Trapped air is the secret to insulation."
    },
    {
        id: 311,
        topic: "Energy Resources",
        type: "energy",
        drawType: "rollerCoaster",
        question: "A 400 kg roller coaster cart starts from rest at Peak A (height 30m). Using the Work-Energy Principle, calculate its speed at Point B (height 0m). (4 Marks)",
        markScheme: [
            "Calculate initial GPE: m x g x h = 400 x 10 x 30 = 120,000 J.",
            "At Point B, all GPE has been transferred to Kinetic Energy (KE = 120,000 J).",
            "Use KE = 1/2 x m x v^2 to solve: 120,000 = 0.5 x 400 x v^2.",
            "Solve for v: v^2 = 600, so v = 24.5 m/s (approx)."
        ],
        hint: "GPE at the top = KE at the bottom."
    },
    {
        id: 312,
        topic: "Energy Resources",
        type: "energy",
        drawType: "rollerCoaster",
        question: "The roller coaster continues to Hill C (height 15m). If 20,000 J of work is done against , calculate the kinetic energy at Hill C. (4 Marks)",
        markScheme: [
            "Initial Energy at Peak A = 120,000 J.",
            "GPE at Hill C: m x g x h = 400 x 10 x 15 = 60,000 J.",
            "Energy Equation: Initial GPE = GPE at C + KE at C + Work against .",
            "KE at C = 120,000 - 60,000 - 20,000 = 40,000 J."
        ],
        hint: "Initial Energy - GPE at new height - Wasted Energy = Remaining KE."
    },
    {
        id: 313,
        topic: "Energy Resources",
        question: "A motor uses 50,000 J of energy to pull the roller coaster cart up the first hill in 25 seconds. Calculate the power of the motor. (4 Marks)",
        markScheme: [
            "Formula: Power = Work Done / Time.",
            "Substitute values: P = 50,000 / 25.",
            "Calculation: 2,000 Watts.",
            "State that 1 Watt is equal to 1 Joule per second."
        ],
        hint: "Power is the rate of doing work."
    },
    {
        id: 314,
        topic: "Energy Resources",
        question: "The motor from the previous question is only 75% efficient. Calculate the total electrical energy input required. (4 Marks)",
        markScheme: [
            "Formula: Efficiency = (Useful Energy / Total Energy) x 100.",
            "Rearrange: Total Energy = Useful Energy / Efficiency.",
            "Calculation: 50,000 / 0.75 = 66,667 J.",
            "Explain that the extra energy is wasted as thermal energy."
        ],
        hint: "The input must be larger than the useful output."
    },
    {
        id: 315,
        topic: "Energy Resources",
        question: "Discuss the environmental impact of using hydroelectric power to supply energy to a theme park. (4 Marks)",
        markScheme: [
            "Hydroelectric is renewable and does not produce CO2 during operation.",
            "Building the dam can lead to habitat loss for local wildlife.",
            "It can cause flooding of land and displacement of local communities.",
            "It provides a reliable constant supply of electricity unlike solar/wind."
        ],
        hint: "Think about both the clean energy and the physical impact of the dam."
    },
    {
        id: 316,
        topic: "Energy Resources",
        type: "energy",
        drawType: "metalConduction",
        question: "Explain why metals are much better thermal conductors than non-metals. (4 Marks)",
        markScheme: [
            "Metals contain delocalized (free) electrons.",
            "These electrons gain kinetic energy and move rapidly through the metal lattice.",
            "They collide with cooler ions, transferring energy very quickly.",
            "In non-metals, energy is only transferred through lattice vibrations, which is slower."
        ],
        hint: "It's all about the 'free' electrons."
    },
    {
        id: 317,
        topic: "Energy Resources",
        type: "energy",
        drawType: "leslieCube",
        question: "Describe an experiment to investigate how the color of a surface affects the rate of absorption of thermal radiation. (4 Marks)",
        markScheme: [
            "Use two identical flasks, one painted matte black and one shiny silver.",
            "Place them at equal distances from a source of infrared radiation (e.g., a radiant heater).",
            "Record the temperature of the water in each flask at regular intervals.",
            "The temperature of the black flask will rise faster because it is a better absorber."
        ],
        hint: "Keep everything identical except the color."
    },
    {
        id: 318,
        topic: "Energy Resources",
        type: "energy",
        drawType: "stairClimb",
        question: "A student of mass 60 kg climbs a flight of stairs of height 5m. Calculate the work done. (4 Marks)",
        markScheme: [
            "State formula: Work Done = Force x Distance (or GPE = mgh).",
            "Calculate force (weight): 60 x 10 = 600 N.",
            "Substitute into formula: 600 x 5.",
            "Final Answer: 3,000 Joules."
        ],
        hint: "Work done is equal to the GPE gained."
    },
    {
        id: 319,
        topic: "Energy Resources",
        question: "A car of mass 1200 kg travels at 20 m/s. Calculate its kinetic energy. (4 Marks)",
        markScheme: [
            "State formula: KE = 1/2 x m x v^2.",
            "Substitute values: KE = 0.5 x 1200 x 20^2.",
            "Calculation: 0.5 x 1200 x 400.",
            "Final Answer: 240,000 Joules (or 240 kJ)."
        ],
        hint: "Don't forget to square the velocity!"
    },
    {
        id: 320,
        topic: "Energy Resources",
        question: "Explain how geothermal energy can be used to generate electricity and state one disadvantage. (4 Marks)",
        markScheme: [
            "Cold water is pumped down into hot rocks underground.",
            "The water turns into steam, which rises and turns a turbine.",
            "The turbine drives a generator to produce electricity.",
            "Disadvantage: Can only be built in specific tectonic locations (e.g., Iceland/volcanic areas)."
        ],
        hint: "Steam turns the turbine, just like in a coal power station."
    },
    {
        id: 321,
        topic: "Energy Resources",
        type: "energy",
        drawType: "solarPanel",
        question: "Distinguish between a solar cell (photovoltaic) and a solar water heating panel. (4 Marks)",
        markScheme: [
            "Solar Cell: Directly transfers light energy into electrical energy.",
            "Solar Water Heating Panel: Uses infrared radiation to heat water in pipes.",
            "Cells are used for low-power devices or grid-tie systems.",
            "Water panels are used to provide domestic hot water directly."
        ],
        hint: "One makes electricity, the other makes hot water."
    },
    {
        id: 322,
        topic: "Energy Resources",
        question: "Describe the energy transfers that occur during a bungee jump from the moment the person jumps until they stop at the bottom. (4 Marks)",
        markScheme: [
            "At the top: All energy is in the GPE store.",
            "Falling (cord slack): GPE is transferred to KE.",
            "Falling (cord stretching): KE and GPE are transferred to Elastic Potential Energy.",
            "At the bottom: Most energy is in the Elastic store, some is dissipated as heat."
        ],
        hint: "GPE -> KE -> Elastic."
    },
    {
        id: 323,
        topic: "Energy Resources",
        type: "energy",
        drawType: "pendulum",
        question: "Explain why a pendulum will eventually stop swinging, referring to energy conservation. (4 Marks)",
        markScheme: [
            "Total energy is conserved, but it is transferred to non-useful stores.",
            "Work is done against air resistance as the pendulum swings.",
            "Energy is dissipated as thermal energy to the surroundings.",
            "The amplitude decreases until all energy is lost from the kinetic/potential stores."
        ],
        hint: "The energy doesn't disappear; it just becomes heat in the air."
    },
    {
        id: 324,
        topic: "Energy Resources",
        type: "energy",
        drawType: "doubleGlazing",
        question: "Explain how double glazing reduces energy loss from a home. (4 Marks)",
        markScheme: [
            "Two panes of glass are separated by a gap of trapped air (or vacuum).",
            "Air is a very poor conductor, minimizing energy loss by conduction.",
            "The gap is too narrow for convection currents to circulate easily.",
            "This creates a barrier that slows down the transfer of heat to the outside."
        ],
        hint: "Air gap = Poor conduction."
    },
    {
        id: 325,
        topic: "Energy Resources",
        question: "Explain why fossil fuels are still widely used despite being non-renewable. (4 Marks)",
        markScheme: [
            "They have a very high energy density (release lots of energy per kg).",
            "They provide a reliable, constant supply of electricity (not weather dependent).",
            "The infrastructure for transport and power stations is already well-established.",
            "They are currently cheaper to produce than many large-scale renewable alternatives."
        ],
        hint: "High energy per kg and reliability are the main reasons."
    },
    {
        id: 326,
        topic: "Energy Resources",
        type: "energy",
        drawType: "sankey",
        usefulEnergy: 35,
        question: "A power station has a total energy input of 1000 MJ. If 350 MJ is transferred to electricity, calculate the efficiency and state what happens to the remaining 650 MJ. (4 Marks)",
        markScheme: [
            "Calculation: (350 / 1000) x 100 = 35%.",
            "The remaining 650 MJ is 'wasted' energy.",
            "It is transferred to the surroundings as thermal energy.",
            "This usually happens in the cooling towers or through  in the turbines."
        ],
        hint: "Output / Input = Efficiency."
    },
    {
        id: 327,
        topic: "Energy Resources",
        question: "Compare tidal power and wave power as energy resources. (4 Marks)",
        markScheme: [
            "Tidal: Highly predictable (based on moon's gravity), but only available 4 times a day.",
            "Wave: Less predictable (depends on wind), but more widely available on coastlines.",
            "Both are renewable and do not produce CO2.",
            "Tidal requires large barrages (habitat damage); Wave uses smaller surface devices."
        ],
        hint: "Tides are predictable; Waves depend on wind."
    },
    {
        id: 328,
        topic: "Energy Resources",
        question: "Explain how thermal radiation is involved in the greenhouse effect. (4 Marks)",
        markScheme: [
            "Short-wavelength radiation from the Sun passes through the atmosphere.",
            "The Earth's surface absorbs this and re-emits it as long-wavelength infrared.",
            "Greenhouse gases (like CO2) absorb this long-wavelength radiation.",
            "This traps the energy in the atmosphere, leading to an increase in temperature."
        ],
        hint: "Short waves come in; long waves get trapped."
    },
    {
        id: 329,
        topic: "Energy Resources",
        question: "Explain what is meant by 'thermal equilibrium' when a hot cup of coffee is left in a room. (4 Marks)",
        markScheme: [
            "Heat flows from the hot coffee to the cooler air (high to low temperature).",
            "As the coffee loses energy, its temperature drops.",
            "This continues until the coffee and the room are at the same temperature.",
            "At this point, there is no net transfer of energy; this is thermal equilibrium."
        ],
        hint: "Everything eventually reaches the same temperature."
    },
    {
        id: 330,
        topic: "Energy Resources",
        question: "A weightlifter lifts a 100 kg barbell to a height of 2m in 0.5 seconds. Calculate their power. (4 Marks)",
        markScheme: [
            "Calculate work done (GPE): 100 x 10 x 2 = 2,000 J.",
            "State power formula: Power = Work / Time.",
            "Substitute values: 2,000 / 0.5.",
            "Final Answer: 4,000 Watts (or 4 kW)."
        ],
        hint: "Calculate the energy first, then divide by time."
    },
    {
        id: 331,
        topic: "Energy Resources",
        question: "Explain why wind turbines are not suitable for providing the entire base-load electricity for a country. (4 Marks)",
        markScheme: [
            "Wind is intermittent and unpredictable (it's not always windy).",
            "The power output varies significantly, which can destabilize the grid.",
            "Thousands of turbines would be needed to match one nuclear power station.",
            "Energy storage (batteries) on such a large scale is currently too expensive."
        ],
        hint: "Reliability is the main issue."
    },
    {
        id: 332,
        topic: "Energy Resources",
        question: "Explain why coastal areas have less extreme temperature changes than inland areas. (4 Marks)",
        markScheme: [
            "Water has a very high specific heat capacity compared to land/rocks.",
            "This means it takes a lot of energy to change the temperature of the sea.",
            "In summer, the sea stays cooler than the land; in winter, it stays warmer.",
            "The sea acts as a thermal buffer, regulating the temperature of the nearby coast."
        ],
        hint: "Water takes a long time to heat up and cool down."
    },
    {
        id: 333,
        topic: "Energy Resources",
        question: "A car brakes to a stop. Explain the energy transfers and what happens to the temperature of the brakes. (4 Marks)",
        markScheme: [
            "The kinetic energy of the car is transferred to the thermal store of the brakes.",
            "Work is done by the  force between the brake pads and the discs.",
            "The temperature of the brakes increases significantly.",
            "This thermal energy is eventually dissipated to the surroundings."
        ],
        hint: "KE is transferred to heat by ."
    },
    {
        id: 334,
        topic: "Energy Resources",
        type: "energy",
        drawType: "powerStation",
        question: "Explain how a heat exchanger in a power station improves overall efficiency. (4 Marks)",
        markScheme: [
            "It captures thermal energy from waste steam or exhaust gases.",
            "This 'recycled' energy is used to pre-heat the incoming cold water.",
            "Less fuel is required to bring the water to boiling point.",
            "This reduces the total energy input needed for the same electrical output."
        ],
        hint: "Recycling waste heat reduces fuel costs."
    },
    {
        id: 335,
        topic: "Energy Resources",
        question: "Explain why solar power is more reliable in countries like Saudi Arabia than in the UK. (4 Marks)",
        markScheme: [
            "Reliability depends on the consistency of the resource (sunlight).",
            "Saudi Arabia has more cloud-free days and higher light intensity.",
            "The UK has more cloud cover and fewer daylight hours in winter.",
            "Therefore, the average power output per m^2 is much higher and more predictable in desert climates."
        ],
        hint: "More sun = more reliable energy."
    },
    {
        id: 75,
        topic: "States of Matter",
        type: "drawing",
        drawType: "solid",
        question: "Describe an experiment to determine the density of an irregularly shaped object, such as a stone. (4 Marks)",
        markScheme: [
            "Measure the mass of the stone using an electronic balance.",
            "Fill a displacement (Eureka) can with water until it reaches the spout.",
            "Submerge the stone and collect the displaced water in a measuring cylinder.",
            "Density = Mass / Volume. Ensure the volume is read from the bottom of the meniscus."
        ],
        hint: "Volume of displaced water = Volume of the stone."
    },
    {
        id: 76,
        topic: "States of Matter",
        type: "drawing",
        drawType: "molecules",
        question: "Compare the arrangement and motion of particles in a liquid versus a gas. (4 Marks)",
        markScheme: [
            "Liquid: Particles are close together/touching but in an irregular arrangement.",
            "Gas: Particles are far apart with no regular arrangement.",
            "Liquid: Particles slide over each other in random motion.",
            "Gas: Particles move rapidly and randomly in all directions."
        ],
        hint: "Think about how much space is between the particles."
    },
    {
        id: 77,
        topic: "States of Matter",
        type: "drawing",
        drawType: "pressureHole",
        question: "Explain why the pressure in a liquid increases with depth and how this is demonstrated by water shooting out of holes in a tank. (4 Marks)",
        markScheme: [
            "Pressure is caused by the weight of the liquid above a certain point.",
            "At greater depths, there is a larger column of water above, increasing the force.",
            "Formula: Pressure = height x density x g.",
            "The bottom stream shoots furthest because the pressure (and force) is highest there."
        ],
        hint: "P = hρg. More water on top = more pressure."
    },
    {
        id: 78,
        topic: "States of Matter",
        type: "drawing",
        drawType: "piston",
        question: "A fixed mass of gas is compressed at a constant temperature. Explain, using kinetic theory, why the pressure increases. (4 Marks)",
        markScheme: [
            "As volume decreases, the particles become more crowded.",
            "The frequency of collisions between particles and the container walls increases.",
            "Each collision exerts a force on the walls.",
            "Since Pressure = Force / Area, the increased frequency of force leads to higher pressure."
        ],
        hint: "Crowded particles hit the walls more often."
    },
    {
        id: 79,
        topic: "States of Matter",
        question: "Explain what is meant by 'Specific Heat Capacity' and state the formula used to calculate energy changes. (4 Marks)",
        markScheme: [
            "Definition: The energy required to raise the temperature of 1kg of a substance by 1 degree Celsius.",
            "Formula: Q = m x c x ΔT.",
            "Q is energy in Joules, m is mass in kg.",
            "c is specific heat capacity, ΔT is change in temperature."
        ],
        hint: "Energy = Mass x SHC x Temp Change."
    },
    {
        id: 80,
        topic: "States of Matter",
        question: "Explain why the pressure of a gas increases when its temperature is increased at a constant volume. (4 Marks)",
        markScheme: [
            "Particles gain kinetic energy and move faster at higher temperatures.",
            "They collide with the walls of the container more frequently.",
            "The collisions occur with a greater force.",
            "Pressure increases because the total force exerted on the walls increases."
        ],
        hint: "Hotter particles move faster and hit harder."
    },
    {
        id: 81,
        topic: "States of Matter",
        question: "Explain why a person wearing snowshoes does not sink into deep snow as much as a person wearing normal boots. (4 Marks)",
        markScheme: [
            "Snowshoes have a much larger surface area than normal boots.",
            "The weight of the person is spread over this larger area.",
            "Formula: Pressure = Force / Area.",
            "A larger area results in a lower pressure exerted on the snow."
        ],
        hint: "High area = Low pressure."
    },
    {
        id: 82,
        topic: "States of Matter",
        question: "Explain what is meant by 'Absolute Zero' and state its value in degrees Celsius. (4 Marks)",
        markScheme: [
            "Absolute Zero is the temperature at which particles have zero kinetic energy / stop moving.",
            "It is the lowest possible temperature.",
            "The value is -273 degrees Celsius.",
            "On the Kelvin scale, this is 0 K."
        ],
        hint: "It's the point where all motion stops."
    },
    {
        id: 83,
        topic: "States of Matter",
        question: "Explain how evaporation causes a liquid to cool down. (4 Marks)",
        markScheme: [
            "Particles with the highest kinetic energy escape from the surface of the liquid.",
            "The average kinetic energy of the remaining particles decreases.",
            "Since temperature is proportional to average kinetic energy, the temperature drops.",
            "This transfers thermal energy away from the remaining liquid."
        ],
        hint: "The 'fast' particles leave, leaving the 'slow' (cool) ones behind."
    },
    {
        id: 84,
        topic: "States of Matter",
        question: "Convert 27 degrees Celsius to Kelvin and explain why scientists prefer using the Kelvin scale for gas law calculations. (4 Marks)",
        markScheme: [
            "Calculation: 27 + 273 = 300 K.",
            "The Kelvin scale starts at absolute zero.",
            "Pressure and Volume are directly proportional to Kelvin temperature.",
            "Using Celsius would result in incorrect ratios because the scale is not absolute."
        ],
        hint: "T(K) = T(C) + 273."
    },
    {
        id: 85,
        topic: "States of Matter",
        question: "A gas occupies 2.0 liters at a pressure of 100 kPa. If the volume is reduced to 0.5 liters at constant temperature, calculate the new pressure. (4 Marks)",
        markScheme: [
            "State Boyle's Law formula: P1V1 = P2V2.",
            "Substitute values: 100 x 2.0 = P2 x 0.5.",
            "Rearrange for P2: (100 x 2.0) / 0.5.",
            "Final Answer: 400 kPa."
        ],
        hint: "If volume decreases by 4 times, pressure must increase by 4 times."
    },
    {
        id: 86,
        topic: "States of Matter",
        question: "Describe how a U-tube manometer is used to measure the pressure difference between a gas supply and the atmosphere. (4 Marks)",
        markScheme: [
            "The U-tube is partially filled with a liquid (usually water or mercury).",
            "One end is connected to the gas supply, the other is open to the atmosphere.",
            "The gas pressure pushes the liquid down on one side, causing a height difference (h).",
            "The pressure difference is calculated using ΔP = h x ρ x g."
        ],
        hint: "The height difference 'h' tells you how much stronger the gas is than the air."
    },
    {
        id: 87,
        topic: "States of Matter",
        question: "Explain why gaps are left between the rails of a railway track. (4 Marks)",
        markScheme: [
            "On hot days, the iron/steel rails absorb thermal energy and expand.",
            "The particles in the metal vibrate more and move further apart.",
            "The gaps provide space for this expansion to occur safely.",
            "Without gaps, the rails would expand against each other and buckle/bend."
        ],
        hint: "Think about what happens to the length of the metal when it gets hot."
    },
    {
        id: 88,
        topic: "States of Matter",
        question: "Describe Brownian motion and explain what it provides evidence for. (4 Marks)",
        markScheme: [
            "Definition: The random, jerky movement of small visible particles (like smoke) suspended in a fluid.",
            "Cause: Invisible fast-moving air/water molecules collide with the visible particles.",
            "Evidence: It proves that matter is made of tiny, discrete particles.",
            "Evidence: It proves these particles are in constant, random motion."
        ],
        hint: "Big particles get 'kicked' by many tiny, invisible particles."
    },
    {
        id: 89,
        topic: "States of Matter",
        question: "The pressure of a gas in a sealed container is 120 kPa at 27 °C. Calculate the pressure at 127 °C. (4 Marks)",
        markScheme: [
            "Convert temperatures to Kelvin: 27°C = 300K, 127°C = 400K.",
            "State Pressure Law: P1 / T1 = P2 / T2.",
            "Substitute: 120 / 300 = P2 / 400.",
            "Final Answer: P2 = (120 x 400) / 300 = 160 kPa."
        ],
        hint: "ALWAYS convert to Kelvin before doing gas law math!"
    },
    {
        id: 90,
        topic: "States of Matter",
        question: "Describe the difference between 'Specific Heat Capacity' and 'Specific Latent Heat'. (4 Marks)",
        markScheme: [
            "Specific Heat Capacity involves a change in temperature without a change in state.",
            "Specific Latent Heat involves a change in state at a constant temperature.",
            "SHC measures energy per kg per degree; SLH measures energy per kg to melt/boil.",
            "During a latent heat transfer, internal energy increases but kinetic energy remains constant."
        ],
        hint: "Temperature changes in one, state changes in the other."
    },
    {
        id: 91,
        topic: "States of Matter",
        question: "Explain how to determine absolute zero by plotting a graph of pressure against temperature in degrees Celsius. (4 Marks)",
        markScheme: [
            "Measure the pressure of a fixed mass of gas at various temperatures (e.g., using a water bath).",
            "Plot a graph of Pressure (y-axis) against Temperature in Celsius (x-axis).",
            "The graph will be a straight line with a positive gradient.",
            "Extrapolate the line backwards to find where pressure is zero; this intercept is -273 °C."
        ],
        hint: "Follow the line back to where the gas stops 'pushing'."
    },
    {
        id: 92,
        topic: "States of Matter",
        question: "Explain why the atmosphere exerts a pressure on the surface of the Earth. (4 Marks)",
        markScheme: [
            "Air is made of gas molecules that have weight due to gravity.",
            "The column of air above the Earth's surface pushes down on it.",
            "The particles collide with the surface, exerting a force.",
            "Since Pressure = Force / Area, the weight of the air creates atmospheric pressure."
        ],
        hint: "Air has mass and gravity pulls it down."
    },
    {
        id: 93,
        topic: "States of Matter",
        question: "Explain why solids cannot be compressed but gases can be easily compressed. (4 Marks)",
        markScheme: [
            "In solids, particles are touching and very close together with no empty space.",
            "Strong intermolecular forces hold them in a fixed, rigid position.",
            "In gases, there are large gaps between particles (mostly empty space).",
            "This space allows particles to be pushed closer together when pressure is applied."
        ],
        hint: "It's all about the 'empty space' between particles."
    },
    {
        id: 94,
        topic: "States of Matter",
        question: "Explain how the pressure of a gas changes if its volume is halved at a constant temperature. (4 Marks)",
        markScheme: [
            "Halving the volume makes the particles twice as crowded (higher density).",
            "The frequency of collisions with the container walls doubles.",
            "According to Boyle's Law (P1V1 = P2V2), the pressure will double.",
            "The temperature remains constant, so the force of each individual collision is the same."
        ],
        hint: "Half the room = Twice as many hits on the wall."
    },
    {
        id: 98,
        topic: "States of Matter",
        question: "Describe the relationship between the temperature of a gas and the average kinetic energy of its particles. (4 Marks)",
        markScheme: [
            "The Kelvin temperature of a gas is directly proportional to the average kinetic energy of its particles.",
            "As temperature increases, the particles move at higher speeds/velocities.",
            "This leads to more frequent collisions with container walls.",
            "It also results in more forceful collisions, increasing the overall pressure."
        ],
        hint: "Temperature is essentially a measure of how fast the particles are moving."
    },
    {
        id: 99,
        topic: "States of Matter",
        question: "Describe how a student could measure the specific heat capacity of an aluminum block in a laboratory. (4 Marks)",
        markScheme: [
            "Measure the mass of the block and the initial temperature using a thermometer.",
            "Use an immersion heater connected to a joulemeter to heat the block.",
            "Measure the final temperature and calculate the temperature change (ΔT).",
            "Use the formula c = Q / (m × ΔT) where Q is the energy reading from the joulemeter."
        ],
        hint: "You need Mass, Energy Input, and Change in Temperature."
    },
    {
        id: 100,
        topic: "States of Matter",
        type: "graph",
        question: "A student plots a graph of Pressure against 1/Volume for a fixed mass of gas at constant temperature. Describe the shape of the graph and explain what it shows. (4 Marks)",
        graphData: [
            { x: 0, y: 0 },
            { x: 1, y: 10 },
            { x: 2, y: 20 },
            { x: 3, y: 30 },
            { x: 4, y: 40 }
        ],
        xAxisLabel: "1/Volume (1/m³)",
        yAxisLabel: "Pressure (Pa)",
        markScheme: [
            "The graph will be a straight line passing through the origin (0,0).",
            "This shows that Pressure is inversely proportional to Volume.",
            "A straight line through the origin proves that P × V = constant.",
            "The gradient of the line represents the constant 'k' in the equation PV = k."
        ],
        hint: "P is proportional to 1/V, so the graph is linear."
    },
    {
        id: 101,
        topic: "States of Matter",
        question: "Explain why the density of a substance changes significantly when it turns from a liquid into a gas. (4 Marks)",
        markScheme: [
            "In a liquid, particles are close together and touching.",
            "In a gas, the particles are very far apart with large amounts of empty space between them.",
            "The same mass of substance occupies a much larger volume as a gas.",
            "Since Density = Mass / Volume, a huge increase in volume results in a very low density."
        ],
        hint: "Think about how much 'empty space' is in a gas compared to a liquid."
    },
    {
        id: 102,
        topic: "States of Matter",
        question: "Define 'Internal Energy' and explain how it changes when a solid is heated until it melts. (4 Marks)",
        markScheme: [
            "Internal Energy is the sum of the total kinetic energy and potential energy of all the particles.",
            "As the solid is heated, the kinetic energy of the particles increases (temperature rises).",
            "During melting, the temperature stays constant, so kinetic energy stays constant.",
            "The potential energy increases as energy is used to break the bonds between particles."
        ],
        hint: "Internal Energy = KE + PE. Kinetic energy is temperature; Potential energy is state."
    },
    {
        id: 103,
        topic: "States of Matter",
        question: "When a bike pump is used rapidly, it becomes hot. Explain this in terms of the work-energy principle and internal energy. (4 Marks)",
        markScheme: [
            "Work is done on the gas by pushing the plunger against pressure.",
            "This work is transferred into the internal energy store of the gas.",
            "The average kinetic energy of the gas particles increases.",
            "This results in a rise in temperature, which is then conducted to the walls of the pump."
        ],
        hint: "Doing work on a gas increases its temperature."
    },
    {
        id: 104,
        topic: "States of Matter",
        question: "A block of metal has dimensions 5cm x 10cm x 20cm. Explain which face should be placed on a table to exert the maximum pressure. (4 Marks)",
        markScheme: [
            "Pressure is calculated using the formula Pressure = Force / Area.",
            "The force (weight) remains constant regardless of which face is used.",
            "To maximize pressure, the area of contact must be minimized.",
            "The 5cm x 10cm face has the smallest area (50 cm²), thus exerting the most pressure."
        ],
        hint: "Smaller area = Higher pressure for the same weight."
    },
    {
        id: 105,
        topic: "States of Matter",
        question: "Calculate the energy needed to melt 2kg of ice at 0°C. (Specific Latent Heat of fusion = 334,000 J/kg). (4 Marks)",
        markScheme: [
            "State the formula: Energy = mass x Specific Latent Heat (Q = mL).",
            "Substitute values: Q = 2 kg x 334,000 J/kg.",
            "Calculation: 668,000 Joules.",
            "State that the temperature remains constant during this process."
        ],
        hint: "Use Q=mL when the state is changing but temperature isn't."
    },
    {
        id: 106,
        topic: "States of Matter",
        question: "A gas has volume V and pressure P. If both the Kelvin temperature and the volume are doubled, calculate the new pressure. (4 Marks)",
        markScheme: [
            "Use the combined gas law: PV / T = constant.",
            "Doubling Kelvin temperature alone would double the pressure.",
            "Doubling volume alone would halve the pressure.",
            "Therefore, the pressure remains the same (P)."
        ],
        hint: "The temperature increase and volume increase cancel each other out."
    },
    {
        id: 107,
        topic: "States of Matter",
        question: "Suggest two ways to improve the accuracy of an experiment measuring the density of a liquid. (4 Marks)",
        markScheme: [
            "Ensure the measuring cylinder is on a flat, level surface when reading.",
            "Read the volume at eye level from the bottom of the meniscus to avoid parallax error.",
            "Zero (tare) the balance with the empty cylinder before adding the liquid.",
            "Use a larger volume of liquid to reduce the percentage uncertainty in measurements."
        ],
        hint: "Think about how to avoid measurement errors."
    },
    {
        id: 178,
        topic: "States of Matter",
        type: "drawing",
        drawType: "molecularCollisions",
        question: "Explain why gas pressure acts equally in all directions within a container. (4 Marks)",
        markScheme: [
            "Gas particles move randomly at high speeds in all directions.",
            "They collide with every part of the container walls with equal frequency on average.",
            "Each collision exerts a force at right angles to the wall surface.",
            "The large number of random collisions results in a uniform pressure throughout the container."
        ],
        hint: "Random motion leads to uniform hits on all sides."
    },
    {
        id: 179,
        topic: "States of Matter",
        question: "Explain why a substance with a high specific heat capacity, like water, is useful as a coolant in car engines. (4 Marks)",
        markScheme: [
            "Water can absorb a large amount of thermal energy before its temperature rises significantly.",
            "It remains in the liquid state over a wide temperature range.",
            "It can carry energy away from the hot engine parts to the radiator efficiently.",
            "High SHC means less water is needed to absorb the same amount of heat compared to other liquids."
        ],
        hint: "It can soak up lots of heat without getting too hot itself."
    },
    {
        id: 180,
        topic: "States of Matter",
        type: "drawing",
        drawType: "latentHeatGraph",
        question: "A sample of water is cooled from 10°C to -10°C. Describe the changes in the energy and arrangement of particles during freezing. (4 Marks)",
        markScheme: [
            "As it cools to 0°C, the kinetic energy of the particles decreases.",
            "At 0°C, the temperature remains constant as latent heat of fusion is released.",
            "Energy is lost from the potential energy store as bonds form between particles.",
            "The particles move from a random arrangement in the liquid to a fixed, regular lattice in the solid."
        ],
        hint: "KE drops first, then PE drops while it turns to ice."
    },
    {
        id: 181,
        topic: "States of Matter",
        type: "drawing",
        drawType: "charlesLawGraph",
        question: "State the relationship between the volume and Kelvin temperature of a gas at constant pressure (Charles's Law). (4 Marks)",
        markScheme: [
            "Volume is directly proportional to the Kelvin temperature (V ∝ T).",
            "If the Kelvin temperature doubles, the volume also doubles.",
            "This relationship only holds if the pressure and mass of the gas remain constant.",
            "A graph of Volume against Kelvin temperature would be a straight line passing through the origin."
        ],
        hint: "Higher temperature = more volume (if it can expand)."
    },
    {
        id: 182,
        topic: "States of Matter",
        question: "Explain why it is important to stir the water when measuring its specific heat capacity. (4 Marks)",
        markScheme: [
            "Stirring ensures that the thermal energy is distributed evenly throughout the liquid.",
            "It prevents 'hot spots' from forming near the heater.",
            "It ensures the thermometer reading represents the average temperature of the whole mass.",
            "This leads to a more accurate calculation of the temperature change (ΔT)."
        ],
        hint: "Mix it up to get an even temperature."
    },
    {
        id: 108,
        topic: "Magnetism",
        type: "drawing",
        drawType: "fieldLines",
        question: "Describe how to use a plotting compass to map the magnetic field lines around a bar magnet. (4 Marks)",
        markScheme: [
            "Place the magnet on a sheet of paper and place the compass near one pole.",
            "Mark the direction the compass needle points with a pencil dot.",
            "Move the compass so its tail is at the dot and mark the new head position.",
            "Connect the dots to form a field line and repeat for several lines, adding arrows from N to S."
        ],
        hint: "Field lines never cross and always point from North to South."
    },
    {
        id: 109,
        topic: "Magnetism",
        type: "drawing",
        drawType: "wireField",
        question: "Explain the shape and direction of the magnetic field around a straight, current-carrying wire. (4 Marks)",
        markScheme: [
            "The field consists of concentric circles centered on the wire.",
            "The field is strongest closest to the wire (circles are closer together).",
            "The direction of the field can be determined using the Right-Hand Grip Rule.",
            "If current reverses, the direction of the magnetic field lines also reverses."
        ],
        hint: "Thumb = Current, Fingers = Field direction."
    },
    {
        id: 110,
        topic: "Magnetism",
        question: "Describe how to create a uniform magnetic field and explain its properties. (4 Marks)",
        markScheme: [
            "Place the North pole of one magnet near the South pole of another.",
            "The field in the gap between the parallel poles is uniform.",
            "Property 1: The field lines are parallel to each other.",
            "Property 2: The field lines are equally spaced, indicating constant strength."
        ],
        hint: "Uniform means 'the same everywhere' in the gap."
    },
    {
        id: 111,
        topic: "Magnetism",
        question: "Describe three ways to increase the strength of the magnetic field produced by a solenoid. (4 Marks)",
        markScheme: [
            "Increase the magnitude of the current flowing through the wire.",
            "Increase the number of turns (loops) in the coil of wire.",
            "Insert a 'soft' iron core into the center of the solenoid.",
            "Explain that the iron core becomes magnetized and adds to the total field."
        ],
        hint: "Think about Current, Coils, and the Core."
    },
    {
        id: 112,
        topic: "Magnetism",
        type: "drawing",
        drawType: "motorEffect",
        question: "A wire carrying a current is placed in a magnetic field. Explain why it experiences a force. (4 Marks)",
        markScheme: [
            "The current-carrying wire creates its own magnetic field around it.",
            "This field interacts with the external permanent magnetic field.",
            "The fields reinforce each other on one side and cancel on the other.",
            "This creates a magnetic pressure/force moving the wire from the stronger to the weaker field."
        ],
        hint: "Interaction between two fields is the key."
    },
    {
        id: 113,
        topic: "Magnetism",
        question: "Explain how to use Fleming's Left-Hand Rule to determine the direction of the force on a conductor. (4 Marks)",
        markScheme: [
            "Hold the thumb, first finger, and second finger of the left hand at right angles.",
            "First finger points in the direction of the magnetic Field (N to S).",
            "Second finger points in the direction of the Current (+ to -).",
            "The Thumb then indicates the direction of the resulting Force (Motion)."
        ],
        hint: "Field, Current, Force = Finger 1, Finger 2, Thumb."
    },
    {
        id: 114,
        topic: "Magnetism",
        question: "Explain the role of the split-ring commutator in a DC electric motor. (4 Marks)",
        markScheme: [
            "The commutator reverses the direction of the current in the coil every half-turn.",
            "This ensures that the force on each side of the coil always acts in the same direction.",
            "As a result, the coil continues to rotate in a single direction.",
            "Without it, the coil would just oscillate back and forth at the vertical position."
        ],
        hint: "It 'swaps' the electricity every 180 degrees."
    },
    {
        id: 115,
        topic: "Magnetism",
        question: "Describe how a loudspeaker uses the motor effect to produce sound waves. (4 Marks)",
        markScheme: [
            "An alternating current flows through a coil attached to a cone.",
            "The coil is placed inside a permanent magnetic field, so it experiences a force.",
            "Because the current is AC, the direction of the force reverses constantly.",
            "The coil and cone vibrate back and forth, creating longitudinal pressure waves in the air."
        ],
        hint: "Electricity -> Vibration -> Sound."
    },
    {
        id: 116,
        topic: "Magnetism",
        question: "Explain how a voltage is induced when a magnet is moved into a coil of wire. (4 Marks)",
        markScheme: [
            "The magnetic field lines of the magnet are cut by the turns of the coil.",
            "This 'cutting' of field lines induces a potential difference (voltage) across the wire.",
            "If the circuit is complete, an induced current will flow.",
            "Moving the magnet faster or using a stronger magnet increases the induced voltage."
        ],
        hint: "The coil must 'cut' through the invisible field lines."
    },
    {
        id: 117,
        topic: "Magnetism",
        question: "Explain how a simple alternator (AC generator) produces a continuous alternating current. (4 Marks)",
        markScheme: [
            "A coil is rotated within a permanent magnetic field.",
            "As it spins, it constantly cuts through magnetic field lines, inducing a voltage.",
            "Slip rings and brushes allow the current to flow out while the coil rotates.",
            "Because the sides of the coil move up then down, the induced voltage changes direction every half-turn."
        ],
        hint: "Rotation + Cutting lines = AC Electricity."
    },
    {
        id: 118,
        topic: "Magnetism",
        type: "drawing",
        drawType: "transformer",
        question: "Explain how a transformer changes the size of an alternating voltage. (4 Marks)",
        markScheme: [
            "An AC voltage in the primary coil creates a changing magnetic field in the iron core.",
            "The iron core carries this changing magnetic field to the secondary coil.",
            "The secondary coil 'cuts' this changing field, inducing an AC voltage.",
            "The ratio of voltages depends on the ratio of the number of turns on each coil."
        ],
        hint: "It uses induction twice: once to make a field, once to catch it."
    },
    {
        id: 119,
        topic: "Magnetism",
        question: "A transformer has 200 turns on the primary and 4000 on the secondary. If the input is 230V, calculate the output voltage. (4 Marks)",
        markScheme: [
            "State formula: Vp / Vs = Np / Ns.",
            "Substitute values: 230 / Vs = 200 / 4000.",
            "Rearrange: Vs = (230 x 4000) / 200.",
            "Final Answer: 4600V (Step-up transformer)."
        ],
        hint: "More turns on the secondary means a higher voltage out."
    },
    {
        id: 120,
        topic: "Magnetism",
        question: "Explain why step-up transformers are used at power stations before electricity is sent through transmission lines. (4 Marks)",
        markScheme: [
            "Step-up transformers increase the voltage and decrease the current.",
            "Power loss in cables is calculated using P = I^2 R.",
            "Lower current means much less energy is wasted as heat in the wires.",
            "This makes the transmission of electricity across long distances more efficient."
        ],
        hint: "High Voltage = Low Current = Low Heat Loss."
    },
    {
        id: 121,
        topic: "Magnetism",
        question: "Explain why step-down transformers are necessary before electricity enters a consumer's home. (4 Marks)",
        markScheme: [
            "Transmission lines carry electricity at very high voltages (e.g., 400,000V).",
            "High voltage is extremely dangerous to users and would cause arcing.",
            "Household appliances are designed to operate at much lower voltages (e.g., 230V).",
            "The transformer reduces the voltage to a level that is safe and compatible with home wiring."
        ],
        hint: "Safety and compatibility are the main reasons."
    },
    {
        id: 122,
        topic: "Magnetism",
        question: "Compare 'soft' magnetic materials (like iron) and 'hard' magnetic materials (like steel). (4 Marks)",
        markScheme: [
            "Soft materials are easy to magnetize but lose their magnetism quickly when the field is removed.",
            "Soft iron is used in electromagnets and transformer cores.",
            "Hard materials are difficult to magnetize but retain their magnetism for a long time.",
            "Steel is used to make permanent magnets."
        ],
        hint: "Iron is 'soft' for induction; Steel is 'hard' for permanent magnets."
    },
    {
        id: 123,
        topic: "Magnetism",
        type: "drawing",
        drawType: "relay",
        question: "Explain how an electromagnetic relay allows a small current to control a much larger current in a separate circuit. (4 Marks)",
        markScheme: [
            "A small current flows through a solenoid in the first circuit, creating a magnetic field.",
            "This field attracts a soft iron armature which pivots.",
            "The movement of the armature pushes two contacts together in the second circuit.",
            "This completes the high-current circuit safely without the user touching it."
        ],
        hint: "Think about how one circuit 'pulls' a switch in another."
    },
    {
        id: 124,
        topic: "Magnetism",
        type: "drawing",
        drawType: "solenoidField",
        question: "Describe the magnetic field pattern inside and outside a current-carrying solenoid. (4 Marks)",
        markScheme: [
            "Inside the solenoid, the field is strong and uniform (parallel lines).",
            "Outside the solenoid, the field pattern is identical to that of a bar magnet.",
            "The field lines emerge from the North pole and enter the South pole.",
            "The strength of the field decreases as you move further away from the solenoid."
        ],
        hint: "Internal = Parallel; External = Bar Magnet pattern."
    },
    {
        id: 125,
        topic: "Magnetism",
        type: "drawing",
        drawType: "dynamo",
        question: "Explain how a bicycle dynamo uses electromagnetic induction to power a lamp. (4 Marks)",
        markScheme: [
            "A permanent magnet is rotated inside or near a coil of wire (driven by the wheel).",
            "As the magnet spins, the magnetic field lines are constantly cut by the coil.",
            "This induces an alternating voltage (and current) across the coil.",
            "The faster the bicycle moves, the faster the lines are cut, making the lamp brighter."
        ],
        hint: "Spinning magnet + Coil = Electricity."
    },
    {
        id: 126,
        topic: "Magnetism",
        question: "A student moves a wire through a magnetic field. Describe two ways they can increase the size of the induced voltage. (4 Marks)",
        markScheme: [
            "Move the wire through the magnetic field at a higher speed.",
            "Use a stronger pair of magnets to create a denser magnetic field.",
            "Increase the length of the wire inside the magnetic field (e.g., by coiling it).",
            "The voltage is only induced if the wire 'cuts' the field lines, not moves parallel to them."
        ],
        hint: "More 'cutting' per second = More voltage."
    },
    {
        id: 127,
        topic: "Magnetism",
        type: "drawing",
        drawType: "lenzLaw",
        question: "When a magnet is pushed into a coil, a current is induced. Explain how the direction of this current relates to the movement of the magnet. (4 Marks)",
        markScheme: [
            "The induced current creates its own magnetic field around the coil.",
            "This field always acts to oppose the change that created it (Lenz's Law).",
            "If the North pole is pushed in, the coil creates a North pole at that end to repel it.",
            "Work must be done to move the magnet against this repulsive force."
        ],
        hint: "The coil tries to 'fight' the magnet's movement."
    },
    {
        id: 128,
        topic: "Magnetism",
        question: "Describe three ways to increase the speed of rotation of a DC electric motor. (4 Marks)",
        markScheme: [
            "Increase the current flowing through the coil.",
            "Use a stronger magnetic field (stronger permanent magnets).",
            "Increase the number of turns on the coil of wire.",
            "Decrease  by using better bearings or lubrication."
        ],
        hint: "Speed up the motor using Current, Field, or Coils."
    },
    {
        id: 129,
        topic: "Magnetism",
        type: "drawing",
        drawType: "microphone",
        question: "Explain how a moving-coil microphone uses electromagnetic induction to convert sound into electrical signals. (4 Marks)",
        markScheme: [
            "Sound waves cause the diaphragm to vibrate back and forth.",
            "The diaphragm is attached to a coil of wire, which moves inside a permanent magnetic field.",
            "The movement of the coil cuts through magnetic field lines, inducing a voltage.",
            "The frequency and amplitude of the induced electrical signal match the original sound wave."
        ],
        hint: "Microphones are the exact opposite of loudspeakers."
    },
    {
        id: 130,
        topic: "Magnetism",
        type: "drawing",
        drawType: "circuitBreaker",
        question: "Explain how a magnetic circuit breaker protects a circuit when the current becomes too high. (4 Marks)",
        markScheme: [
            "When current exceeds a safe limit, the electromagnet becomes strong enough to pull an iron catch.",
            "The catch releases a spring-loaded switch which opens (breaks) the circuit.",
            "This stops the flow of current instantly to prevent overheating or fire.",
            "The breaker can be reset easily once the fault is fixed, unlike a fuse."
        ],
        hint: "Electromagnetism acts as a fast, resettable switch."
    },
    {
        id: 131,
        topic: "Magnetism",
        type: "drawing",
        drawType: "coilField",
        question: "Describe the magnetic field pattern around a single flat circular coil carrying a current. (4 Marks)",
        markScheme: [
            "The field lines are concentric circles around the wire at the edges of the coil.",
            "In the center of the coil, the field lines are straight and parallel.",
            "The field is strongest at the center of the coil where the lines are most dense.",
            "One side of the coil acts as a North pole and the other as a South pole."
        ],
        hint: "Think of it as two 'straight wire' patterns meeting in the middle."
    },
    {
        id: 132,
        topic: "Magnetism",
        question: "Discuss the energy transfers that occur in an AC generator (alternator). (4 Marks)",
        markScheme: [
            "Mechanical work is done to rotate the coil within the magnetic field.",
            "Kinetic energy from the rotation is transferred into electrical energy through induction.",
            "Some energy is wasted as thermal energy due to  in the bearings.",
            "Some energy is also wasted as heat in the coils due to electrical resistance."
        ],
        hint: "Kinetic energy goes IN; Electrical energy comes OUT."
    },
    {
        id: 133,
        topic: "Radioactivity",
        type: "drawing",
        drawType: "atom",
        question: "Define the terms 'Atomic Number' and 'Mass Number' and explain what an isotope is. (4 Marks)",
        markScheme: [
            "Atomic Number: The number of protons in the nucleus of an atom.",
            "Mass Number: The total number of protons and neutrons in the nucleus.",
            "Isotope: Atoms of the same element with the same number of protons but different number of neutrons.",
            "Explain that isotopes have identical chemical properties but different physical properties (like stability)."
        ],
        hint: "Protons define the element; Neutrons define the isotope."
    },
    {
        id: 134,
        topic: "Radioactivity",
        type: "drawing",
        drawType: "penetration",
        question: "Compare the ionizing power and penetrating power of Alpha, Beta, and Gamma radiation. (4 Marks)",
        markScheme: [
            "Alpha: Highly ionizing but low penetration (stopped by paper/skin).",
            "Beta: Moderately ionizing and penetrating (stopped by few mm of aluminum).",
            "Gamma: Weakly ionizing but highly penetrating (reduced by thick lead/concrete).",
            "Explain that ionizing power is linked to the charge and mass of the radiation particle."
        ],
        hint: "Alpha is a big 'bully' (strong charge), Gamma is a 'ghost' (no charge)."
    },
    {
        id: 135,
        topic: "Radioactivity",
        question: "A nucleus of Americium-241 (Atomic number 95) undergoes Alpha decay. State the mass and atomic number of the resulting daughter nucleus. (4 Marks)",
        markScheme: [
            "An Alpha particle consists of 2 protons and 2 neutrons (Helium nucleus).",
            "New Mass Number: 241 - 4 = 237.",
            "New Atomic Number: 95 - 2 = 93.",
            "Identify that the element changes (to Neptunium) because the proton number changed."
        ],
        hint: "Subtract 4 from the top and 2 from the bottom."
    },
    {
        id: 136,
        topic: "Radioactivity",
        type: "drawing",
        drawType: "halfLifeGraph",
        question: "A radioactive sample has a half-life of 10 minutes. If the initial activity is 800 Bq, calculate the activity after 30 minutes. (4 Marks)",
        markScheme: [
            "Determine the number of half-lives: 30 / 10 = 3 half-lives.",
            "After 1 half-life: 800 / 2 = 400 Bq.",
            "After 2 half-lives: 400 / 2 = 200 Bq.",
            "After 3 half-lives: 200 / 2 = 100 Bq."
        ],
        hint: "Divide by 2 for every half-life that passes."
    },
    {
        id: 137,
        topic: "Radioactivity",
        question: "Explain what happens inside the nucleus during Beta-minus decay and how it affects the atomic and mass numbers. (4 Marks)",
        markScheme: [
            "A neutron in the nucleus changes into a proton and an electron.",
            "The electron is emitted as a Beta particle.",
            "The Mass Number remains the same (total nucleons unchanged).",
            "The Atomic Number increases by 1 (an extra proton is gained)."
        ],
        hint: "A neutron 'flips' into a proton."
    },
    {
        id: 138,
        topic: "Radioactivity",
        type: "drawing",
        drawType: "fission",
        question: "Describe the process of nuclear fission of Uranium-235 and explain how it can lead to a chain reaction. (4 Marks)",
        markScheme: [
            "A slow-moving neutron is absorbed by a U-235 nucleus, making it unstable.",
            "The nucleus splits into two smaller daughter nuclei and releases 2 or 3 neutrons.",
            "Kinetic energy is released during the split.",
            "The released neutrons can be absorbed by other U-235 nuclei, triggering further fissions (the chain reaction)."
        ],
        hint: "One neutron in -> Three neutrons out."
    },
    {
        id: 139,
        topic: "Radioactivity",
        question: "Describe the process of nuclear fusion and state where this occurs naturally. (4 Marks)",
        markScheme: [
            "Two light nuclei (e.g., Hydrogen isotopes) join together to form a heavier nucleus (Helium).",
            "A large amount of energy is released (from the conversion of mass).",
            "Fusion requires extremely high temperatures and pressures to overcome electrostatic repulsion between nuclei.",
            "This process occurs naturally in the stars (like our Sun)."
        ],
        hint: "Fusion = Fusing/Joining together."
    },
    {
        id: 140,
        topic: "Radioactivity",
        question: "Explain the roles of the moderator and the control rods in a nuclear fission reactor. (4 Marks)",
        markScheme: [
            "Moderator (graphite/water): Slows down fast-moving neutrons so they can be absorbed by U-235.",
            "Control Rods (boron/cadmium): Absorb excess neutrons to prevent the chain reaction from becoming uncontrolled.",
            "Control rods can be raised or lowered to adjust the rate of energy production.",
            "The moderator ensures fissions are efficient; control rods ensure they are safe."
        ],
        hint: "Moderator = Speed control; Control Rods = Population control of neutrons."
    },
    {
        id: 141,
        topic: "Radioactivity",
        question: "Explain the difference between radioactive contamination and irradiation. (4 Marks)",
        markScheme: [
            "Irradiation: Occurs when an object is exposed to radiation from an external source (it does not become radioactive).",
            "Contamination: Occurs when radioactive atoms get onto or into an object (it becomes a source of radiation).",
            "Irradiation stops as soon as the source is removed.",
            "Contamination remains dangerous until the radioactive isotopes decay or are removed."
        ],
        hint: "Irradiation is being 'hit' by light; Contamination is having 'dust' on you."
    },
    {
        id: 142,
        topic: "Radioactivity",
        question: "State what is meant by 'Background Radiation' and list two natural and two man-made sources. (4 Marks)",
        markScheme: [
            "Background radiation is the constant, low-level radiation present in the environment.",
            "Natural sources: Radon gas from rocks, Cosmic rays from space, Food (carbon-14).",
            "Man-made sources: Medical X-rays, Nuclear fallout from testing, Nuclear waste.",
            "Measurement: Students must subtract background count from their readings for accuracy."
        ],
        hint: "It's all around us, all the time."
    },
    {
        id: 143,
        topic: "Radioactivity",
        question: "Explain why a radioactive isotope used as a medical tracer should have a short half-life and emit gamma radiation. (4 Marks)",
        markScheme: [
            "Gamma: Highly penetrating, so it can be detected outside the body.",
            "Gamma: Weakly ionizing, so it causes minimal damage to body cells.",
            "Short half-life: The activity falls to a safe level quickly after the procedure.",
            "Short half-life: This prevents the patient from being exposed to radiation for a long duration."
        ],
        hint: "You want the doctor to see it, but you want it gone quickly."
    },
    {
        id: 144,
        topic: "Radioactivity",
        question: "Describe three safety precautions taken by scientists when handling radioactive sources in a laboratory. (4 Marks)",
        markScheme: [
            "Keep sources in lead-lined containers when not in use.",
            "Use long-handled tongs to increase distance from the source.",
            "Limit the time of exposure to the source.",
            "Wear a film badge (dosimeter) to monitor total radiation dose received."
        ],
        hint: "Think: Shielding, Distance, and Time."
    },
    {
        id: 145,
        topic: "Radioactivity",
        question: "Describe the Gold Foil Experiment and explain how it changed our model of the atom. (4 Marks)",
        markScheme: [
            "Alpha particles were fired at a thin sheet of gold foil.",
            "Most passed straight through, showing the atom is mostly empty space.",
            "Some were deflected at large angles, showing a small, positively charged center.",
            "This led to the Nuclear Model, replacing the Plum Pudding model."
        ],
        hint: "The nucleus was discovered here!"
    },
    {
        id: 146,
        topic: "Radioactivity",
        question: "Explain how ionizing radiation can lead to cancer in humans. (4 Marks)",
        markScheme: [
            "Ionizing radiation hits DNA molecules in cells.",
            "This causes the DNA to become ionized and damaged (mutations).",
            "If the cell repairs itself incorrectly, it may begin to divide uncontrollably.",
            "This uncontrolled cell division leads to the formation of a tumor (cancer)."
        ],
        hint: "Ionization -> DNA damage -> Mutation -> Uncontrolled division."
    },
    {
        id: 147,
        topic: "Radioactivity",
        question: "Compare the fuel and conditions required for nuclear fission versus nuclear fusion. (4 Marks)",
        markScheme: [
            "Fission: Uses heavy nuclei (Uranium/Plutonium); occurs at 'low' temperatures.",
            "Fusion: Uses light nuclei (Hydrogen); requires extreme temperatures (10 million Kelvin).",
            "Fission: Produces radioactive daughter nuclei (waste).",
            "Fusion: Produces Helium (safe) but is currently very difficult to achieve on Earth."
        ],
        hint: "Heavy atoms split (Fission); Light atoms join (Fusion)."
    },
    {
        id: 148,
        topic: "Radioactivity",
        type: "drawing",
        drawType: "gmTube",
        question: "Explain how a Geiger-Müller (GM) tube and counter are used to measure the radioactivity of a sample. (4 Marks)",
        markScheme: [
            "Measure the background count rate first without the sample present.",
            "Place the sample near the GM tube and measure the total count rate over a set time.",
            "Subtract the background count rate from the total to get the corrected count rate.",
            "Repeat measurements and calculate an average for better reliability."
        ],
        hint: "Don't forget the background radiation!"
    },
    {
        id: 149,
        topic: "Radioactivity",
        type: "drawing",
        drawType: "smokeDetector",
        question: "Explain why Alpha radiation is used in smoke detectors and why it does not pose a health risk to people in the room. (4 Marks)",
        markScheme: [
            "Alpha particles ionize the air, allowing a small current to flow across a gap.",
            "Smoke particles absorb the alpha radiation, breaking the circuit and triggering the alarm.",
            "Alpha has very low penetrating power and is stopped by the plastic casing of the detector.",
            "It cannot travel more than a few centimeters in air, so it never reaches people in the room."
        ],
        hint: "Alpha is easily stopped by smoke and plastic."
    },
    {
        id: 150,
        topic: "Radioactivity",
        type: "drawing",
        drawType: "thicknessMonitor",
        question: "Explain why Beta radiation, rather than Alpha or Gamma, is used in industrial thickness monitoring of paper or aluminum foil. (4 Marks)",
        markScheme: [
            "Alpha would be stopped by even the thinnest paper, so the count would always be zero.",
            "Gamma is too penetrating and would pass through with almost no change in count rate.",
            "Beta is partially absorbed by the material; a change in thickness leads to a detectable change in count rate.",
            "This signal is used to automatically adjust the rollers to maintain correct thickness."
        ],
        hint: "Beta is 'just right' for detecting small changes in thin materials."
    },
    {
        id: 151,
        topic: "Radioactivity",
        type: "drawing",
        drawType: "nuclearWaste",
        question: "Discuss the problems associated with the disposal of high-level radioactive waste from nuclear power stations. (4 Marks)",
        markScheme: [
            "High-level waste remains dangerously radioactive for thousands of years due to long half-lives.",
            "It must be stored in secure, leak-proof containers (often encased in glass/concrete).",
            "Deep underground storage (geological disposal) is required to prevent environmental contamination.",
            "There is a risk of radioactive leaks into groundwater or being targeted for security reasons."
        ],
        hint: "Think about long timescales and leaking."
    },
    {
        id: 152,
        topic: "Radioactivity",
        type: "drawing",
        drawType: "betaDecay",
        question: "Carbon-14 (Atomic number 6) undergoes Beta-minus decay. State the mass and atomic number of the resulting daughter nucleus. (4 Marks)",
        markScheme: [
            "In Beta-minus decay, a neutron turns into a proton and an electron is emitted (Beta particle).",
            "The Mass Number remains the same: 14.",
            "The Atomic Number increases by 1: 6 + 1 = 7.",
            "The resulting element is Nitrogen (N-14)."
        ],
        hint: "Mass stays the same; Proton number goes up by 1."
    },
    {
        id: 153,
        topic: "Radioactivity",
        type: "drawing",
        drawType: "halfLifeGraph",
        question: "Describe the steps to determine the half-life of a radioactive isotope from a graph of Activity against Time. (4 Marks)",
        markScheme: [
            "Find the initial activity at time t = 0.",
            "Determine the value that is half of that initial activity.",
            "Draw a horizontal line from that 'half-activity' value to the curve.",
            "Draw a vertical line down from the curve to the x-axis to read the time interval (half-life)."
        ],
        hint: "Use the 'Half-the-Y, Read-the-X' rule."
    },
    {
        id: 154,
        topic: "Radioactivity",
        type: "drawing",
        drawType: "sterilization",
        question: "Explain why Gamma radiation is used to sterilize medical equipment and why this is preferred over heating. (4 Marks)",
        markScheme: [
            "Gamma rays are highly penetrating and can kill bacteria/viruses through packaging.",
            "The equipment remains sterile inside the sealed package until it is opened.",
            "Unlike heating (autoclaving), Gamma does not damage heat-sensitive plastics.",
            "The equipment does not become radioactive itself because it only undergoes irradiation."
        ],
        hint: "Penetration and heat-sensitivity are the keywords."
    },
    {
        id: 155,
        topic: "Radioactivity",
        type: "drawing",
        drawType: "internalExternal",
        question: "Compare the hazards of being exposed to Alpha radiation from a source outside the body versus a source inside the body. (4 Marks)",
        markScheme: [
            "Outside: Alpha is low risk as it cannot penetrate the dead outer layer of skin.",
            "Inside: Alpha is extremely high risk because it is highly ionizing.",
            "Inside: It can damage living cells/DNA at very short range since it cannot escape.",
            "This can lead to significant mutations or cell death within internal organs."
        ],
        hint: "Outside = Shielded by skin; Inside = Targeted ionization."
    },
    {
        id: 156,
        topic: "Radioactivity",
        type: "drawing",
        drawType: "radonEntry",
        question: "Explain why Radon gas is the most significant source of background radiation and how it enters homes. (4 Marks)",
        markScheme: [
            "Radon gas is produced naturally by the decay of Uranium in rocks and soil.",
            "It is an Alpha emitter that can be easily inhaled into the lungs.",
            "It seeps through cracks in floors or foundations from the ground beneath buildings.",
            "In poorly ventilated areas, the concentration can build up to dangerous levels."
        ],
        hint: "It comes from the ground and builds up in air."
    },
    {
        id: 157,
        topic: "Radioactivity",
        type: "drawing",
        drawType: "countRateDiff",
        question: "Define the 'Bequerel (Bq)' and explain the difference between 'Activity' and 'Count Rate'. (4 Marks)",
        markScheme: [
            "Bequerel: A unit of activity equal to one nuclear decay per second.",
            "Activity: The total rate at which a source emits radiation (all directions).",
            "Count Rate: The number of radiation particles detected by a device (e.g. GM tube) per second.",
            "The count rate is always lower than activity because the detector only catches a fraction of the rays."
        ],
        hint: "Bq = Decays per second. Activity is the source; Count Rate is the detector."
    },
    {
        id: 158,
        topic: "Radioactivity",
        type: "drawing",
        drawType: "carbonDating",
        question: "Explain how Carbon-14 is used to determine the age of an ancient wooden artifact. (4 Marks)",
        markScheme: [
            "Living trees absorb Carbon-14 from the atmosphere until they die.",
            "After death, the Carbon-14 inside the wood begins to decay with a known half-life.",
            "The activity (or ratio) of Carbon-14 in the artifact is measured.",
            "By comparing this to the activity in a living sample, the age can be calculated."
        ],
        hint: "Death marks the start of the 'decay clock'."
    },
    {
        id: 159,
        topic: "Radioactivity",
        type: "drawing",
        drawType: "reactorShielding",
        question: "Describe the shielding used in a nuclear reactor and explain why it is necessary. (4 Marks)",
        markScheme: [
            "The core is surrounded by a steel pressure vessel and a thick concrete containment building.",
            "This shielding absorbs neutrons and highly penetrating Gamma radiation released during fission.",
            "It prevents harmful ionizing radiation from escaping into the environment.",
            "It also protects workers from high radiation doses during operation."
        ],
        hint: "Steel and thick concrete are the primary barriers."
    },
    {
        id: 160,
        topic: "Radioactivity",
        type: "drawing",
        drawType: "brachytherapy",
        question: "Explain the difference between external beam radiotherapy and brachytherapy (internal radiotherapy). (4 Marks)",
        markScheme: [
            "External: High-energy Gamma rays are aimed at the tumor from multiple angles outside the body.",
            "Internal (Brachytherapy): A small radioactive 'seed' or source is placed directly inside or near the tumor.",
            "Internal treatment uses short-range Alpha or Beta radiation to minimize damage to healthy surrounding tissue.",
            "External treatment must pass through healthy tissue to reach the tumor."
        ],
        hint: "Think: External 'beams' vs Internal 'seeds'."
    },
    {
        id: 161,
        topic: "Radioactivity",
        type: "drawing",
        drawType: "fieldDeflection",
        question: "Describe how Alpha, Beta, and Gamma radiation behave when passed through an electric field. (4 Marks)",
        markScheme: [
            "Alpha particles are positively charged and are deflected toward the negative plate.",
            "Beta particles are negatively charged and are deflected more strongly toward the positive plate.",
            "Gamma rays have no charge and pass straight through without any deflection.",
            "Beta deflects more because it has a much smaller mass than Alpha."
        ],
        hint: "Opposites attract; no charge means no pull."
    },
    {
        id: 162,
        topic: "Radioactivity",
        type: "drawing",
        drawType: "dataInterpretation",
        question: "A student records the count rate of a sample as 400 cpm at 12:00 and 100 cpm at 12:40. Calculate the half-life. (4 Marks)",
        markScheme: [
            "From 400 to 100 is two half-lives (400 -> 200 -> 100).",
            "Total time elapsed is 40 minutes (12:00 to 12:40).",
            "Two half-lives = 40 minutes.",
            "One half-life = 20 minutes."
        ],
        hint: "How many times did the number halve?"
    },
    {
        id: 163,
        topic: "Radioactivity",
        question: "Explain what is meant by the terms 'random' and 'spontaneous' in the context of radioactive decay. (4 Marks)",
        markScheme: [
            "Random: It is impossible to predict which specific nucleus will decay next or exactly when it will happen.",
            "Spontaneous: The decay is not affected by external factors like temperature, pressure, or chemical state.",
            "The rate of decay is only determined by the type of isotope and the number of nuclei present.",
            "This leads to the concept of half-life as a statistical average for large numbers of atoms."
        ],
        hint: "Think about 'unpredictability' and 'external influences'."
    },
    {
        id: 164,
        topic: "Radioactivity",
        question: "Compare the use of photographic film and Geiger-Müller tubes as methods of detecting ionizing radiation. (4 Marks)",
        markScheme: [
            "Photographic film gets darker (fogs) when exposed to radiation; it provides a permanent record.",
            "Film is often used in badges worn by workers to monitor total dose over a period of time.",
            "A GM tube detects individual radiation particles and produces an immediate digital count or 'click'.",
            "GM tubes are better for measuring current activity or finding the location of a source."
        ],
        hint: "One is a 'monitor' over time, the other is an 'instant' counter."
    },
    {
        id: 165,
        topic: "Radioactivity",
        type: "drawing",
        drawType: "modelComparison",
        question: "Describe the differences between the 'Plum Pudding' model and the modern 'Nuclear' model of the atom. (4 Marks)",
        markScheme: [
            "Plum Pudding: The atom is a ball of positive charge with electrons embedded throughout it.",
            "Nuclear Model: The mass and positive charge are concentrated in a tiny central nucleus.",
            "Plum Pudding: The atom is solid throughout; Nuclear: The atom is mostly empty space.",
            "Nuclear Model: Electrons orbit the nucleus at a distance rather than being inside the positive charge."
        ],
        hint: "Think 'solid ball' vs 'empty space with a center'."
    },
    {
        id: 166,
        topic: "Radioactivity",
        question: "Explain why nuclear fission and fusion processes both release large amounts of energy. (4 Marks)",
        markScheme: [
            "In both processes, the total mass of the resulting particles is slightly less than the initial mass.",
            "This 'mass defect' is converted directly into energy according to E=mc².",
            "Since the speed of light (c) is very large, even a tiny loss of mass releases massive energy.",
            "This energy is released primarily as the kinetic energy of the product particles."
        ],
        hint: "It's all about mass being converted into energy."
    },
    {
        id: 167,
        topic: "Radioactivity",
        type: "drawing",
        drawType: "foodIrradiation",
        question: "Discuss the advantages and safety concerns of using Gamma radiation to treat fresh fruit for export. (4 Marks)",
        markScheme: [
            "Advantage: Kills bacteria and insects, significantly increasing the shelf-life of the fruit.",
            "Advantage: The process does not involve heat, so the fruit remains fresh and uncooked.",
            "Safety: The fruit does not become radioactive because it is only irradiated, not contaminated.",
            "Concern: Some vitamins may be slightly reduced, and people may have a fear of 'radioactive food' despite it being safe."
        ],
        hint: "Bacteria die, but the fruit stays 'raw' and safe."
    },
    {
        id: 168,
        topic: "Magnetism",
        type: "drawing",
        drawType: "electronBeam",
        question: "A beam of electrons enters a uniform magnetic field at right angles. Describe and explain the motion of the electrons. (4 Marks)",
        markScheme: [
            "The electrons experience a magnetic force at right angles to their direction of motion.",
            "Use Fleming's Left-Hand Rule to determine the force direction (remembering current is opposite to electron flow).",
            "This constant perpendicular force causes the electrons to move in a circular path.",
            "The force changes the direction of the electrons but not their speed."
        ],
        hint: "Fleming's Rule applies, but electron current is reversed!"
    },
    {
        id: 169,
        topic: "Magnetism",
        type: "drawing",
        drawType: "transformerMath",
        question: "An ideal transformer is used to step down 240V to 12V. If the input current is 0.1A, calculate the output current. (4 Marks)",
        markScheme: [
            "State the power equation for an ideal transformer: Vp Ip = Vs Is.",
            "Substitute the known values: 240 x 0.1 = 12 x Is.",
            "Rearrange for Is: Is = 24 / 12.",
            "Final Answer: 2.0 A."
        ],
        hint: "Power In = Power Out for an ideal transformer."
    },
    {
        id: 170,
        topic: "Magnetism",
        type: "drawing",
        drawType: "laminatedCore",
        question: "Explain why the iron core of a transformer is often laminated and made of soft iron. (4 Marks)",
        markScheme: [
            "Lamination: Reduces energy loss from 'eddy currents' by breaking their path with insulating layers.",
            "Soft Iron: Easily magnetized and demagnetized, which reduces energy lost as heat during the switching of the field.",
            "This increases the overall efficiency of the transformer.",
            "Less thermal energy is dissipated to the surroundings."
        ],
        hint: "Lamination stops circular currents; Soft iron switches fields easily."
    },
    {
        id: 171,
        topic: "Magnetism",
        type: "drawing",
        drawType: "generatorGraph",
        question: "Describe how the output voltage graph of an AC generator changes if the speed of rotation is doubled. (4 Marks)",
        markScheme: [
            "The frequency of the alternating voltage doubles (two cycles in the same time).",
            "The peak voltage (amplitude) also doubles because field lines are cut twice as fast.",
            "The graph becomes narrower (compressed horizontally) and taller (stretched vertically).",
            "Both peak voltage and frequency are directly proportional to the rotation speed."
        ],
        hint: "Twice as fast = Twice as tall and twice as many waves."
    },
    {
        id: 172,
        topic: "Magnetism",
        type: "drawing",
        drawType: "handRules",
        question: "Distinguish between the use of the Right-Hand Grip Rule and Fleming's Left-Hand Rule. (4 Marks)",
        markScheme: [
            "Right-Hand Grip Rule: Used to find the direction of a magnetic field around a current-carrying wire or solenoid.",
            "Fleming's Left-Hand Rule: Used to find the direction of the force (motion) on a wire in an external magnetic field.",
            "Grip Rule: Thumb is current, fingers are field circles.",
            "Left-Hand Rule: Thumb is motion, First finger is field, Second finger is current."
        ],
        hint: "Grip is for fields; Left-Hand is for force/motion."
    },
    {
        id: 173,
        topic: "Magnetism",
        type: "drawing",
        drawType: "transformerDC",
        question: "Explain why a transformer will not work if a steady direct current (DC) is applied to the primary coil. (4 Marks)",
        markScheme: [
            "A steady DC creates a constant magnetic field in the iron core.",
            "Electromagnetic induction requires a changing magnetic field to induce a voltage.",
            "Since the field lines are not being 'cut' by the secondary coil, no voltage is induced.",
            "Transformers only work with alternating current (AC) because it creates a continuously changing magnetic field."
        ],
        hint: "No change in field = No induced voltage."
    },
    {
        id: 174,
        topic: "Magnetism",
        type: "drawing",
        drawType: "lenzEnergy",
        question: "Explain how Lenz's Law is an example of the Principle of Conservation of Energy. (4 Marks)",
        markScheme: [
            "Lenz's Law states the induced current creates a field that opposes the change that caused it.",
            "This means work must be done to push a magnet into a coil against the repulsive force.",
            "This mechanical work is then transferred into electrical energy in the circuit.",
            "If the field attracted the magnet instead, energy would be created from nothing, violating the law of conservation."
        ],
        hint: "You have to do work to get electricity out."
    },
    {
        id: 175,
        topic: "Magnetism",
        type: "drawing",
        drawType: "forceFactors",
        question: "State the three factors that determine the magnitude of the force acting on a current-carrying wire in a magnetic field. (4 Marks)",
        markScheme: [
            "The magnitude of the current flowing through the wire.",
            "The strength of the external magnetic field (magnetic flux density).",
            "The length of the wire that is inside the magnetic field.",
            "The angle between the wire and the field lines (force is maximum at 90 degrees)."
        ],
        hint: "Think: F = B × I × L."
    },
    {
        id: 176,
        topic: "Magnetism",
        type: "drawing",
        drawType: "coreInduction",
        question: "Explain Faraday's Law of electromagnetic induction in terms of 'cutting' magnetic field lines. (4 Marks)",
        markScheme: [
            "The magnitude of the induced voltage is directly proportional to the rate of 'cutting' field lines.",
            "Faster movement results in more lines being cut per second, inducing a higher voltage.",
            "Using a stronger magnet increases the density of field lines, leading to more 'cuts' at the same speed.",
            "Increasing the number of turns in a coil means more wire is available to 'cut' the lines simultaneously."
        ],
        hint: "More 'cuts' per second = More voltage."
    },
    {
        id: 177,
        topic: "Magnetism",
        type: "drawing",
        drawType: "transmissionMath",
        question: "Use the formula P = I²R to explain why high-voltage transmission is more efficient for the National Grid. (4 Marks)",
        markScheme: [
            "Power loss in cables is determined by the square of the current multiplied by resistance (P = I²R).",
            "By increasing the voltage with a step-up transformer, the current is significantly reduced for the same power.",
            "A lower current results in a much smaller amount of energy wasted as thermal energy in the wires.",
            "This allows electricity to be sent over long distances with minimal power loss."
        ],
        hint: "Lower current means less heat is wasted in the wires."
    },
    {
        id: 178,
        topic: "Electricity",
        type: "drawing",
        drawType: "potentialDivider",
        question: "A circuit consists of a 6 V battery and two resistors in series (2 Ω and 4 Ω). Calculate the voltage across the 4 Ω resistor. (4 Marks)",
        markScheme: [
            "Total resistance R_T = 2 + 4 = 6 Ω.",
            "Circuit current I = V / R_T = 6 / 6 = 1 A.",
            "Voltage across 4 Ω resistor: V = I × R = 1 × 4.",
            "Final Answer: 4 V (Potential is divided in ratio to resistance)."
        ],
        hint: "Voltage is shared based on the size of the resistor."
    },
    {
        id: 179,
        topic: "Electricity",
        question: "A kettle operates at 230 V with a current of 10 A. Calculate the energy transferred to the water in 3 minutes. (4 Marks)",
        markScheme: [
            "State formula: E = I × V × t.",
            "Convert time: 3 minutes = 180 seconds.",
            "Substitute values: E = 10 × 230 × 180.",
            "Final Answer: 414,000 J (or 414 kJ)."
        ],
        hint: "Energy = Current x Voltage x Time."
    },
    {
        id: 180,
        topic: "Electricity",
        type: "drawing",
        drawType: "ldrSensor",
        question: "In a light-sensing circuit, an LDR is connected in series with a fixed resistor. Explain how the voltage across the fixed resistor changes as it gets darker. (4 Marks)",
        markScheme: [
            "As it gets darker, the resistance of the LDR increases.",
            "The total resistance of the circuit increases, so the current decreases.",
            "The fixed resistor has a constant resistance, so V = I × R means its voltage decreases.",
            "The voltage across the LDR increases as it takes a larger share of the battery potential."
        ],
        hint: "Dark = LDR gets 'greedy' and takes more voltage."
    },
    {
        id: 181,
        topic: "Electricity",
        type: "drawing",
        drawType: "fuelStatic",
        question: "Explain why aircraft are 'earthed' with a metal wire before refuelling begins. (4 Marks)",
        markScheme: [
            "Friction between the fuel and the pipe can cause a build-up of static charge.",
            "A large charge could lead to a spark.",
            "The spark could ignite the flammable fuel vapours, causing an explosion.",
            "The earthing wire provides a path for the charge to flow safely to the ground, preventing build-up."
        ],
        hint: "Earthing prevents dangerous sparks."
    },
    {
        id: 182,
        topic: "Electricity",
        type: "drawing",
        drawType: "breakerVsFuse",
        question: "Compare the operation of a circuit breaker with a standard fuse. (4 Marks)",
        markScheme: [
            "Both protect the circuit from high currents.",
            "A fuse melts and must be replaced once it 'blows'.",
            "A circuit breaker is an electromagnetic switch that 'trips' (opens).",
            "Circuit breakers are faster and can be easily reset without being replaced."
        ],
        hint: "One melts; the other clicks off."
    },
    {
        id: 183,
        topic: "Electricity",
        type: "drawing",
        drawType: "acOscilloscope",
        question: "An oscilloscope shows an AC signal with a peak voltage of 10 V. Describe the waveform and how it differs from DC. (4 Marks)",
        markScheme: [
            "The waveform is a sine wave.",
            "The voltage continuously varies between +10 V and -10 V.",
            "The current direction reverses every half-cycle.",
            "In DC, the voltage would be a flat horizontal line at a constant value."
        ],
        hint: "AC goes up and down; DC is flat."
    },
    {
        id: 184,
        topic: "Electricity",
        question: "A heater has a resistance of 50 Ω. Calculate the power output when a current of 2 A flows through it. (4 Marks)",
        markScheme: [
            "State formula: P = I^2 × R.",
            "Substitute values: P = 2^2 × 50.",
            "Calculation: 4 × 50.",
            "Final Answer: 200 W."
        ],
        hint: "Power = Current squared x Resistance."
    },
    {
        id: 185,
        topic: "Electricity",
        question: "Calculate the total resistance of two 12 Ω resistors connected in parallel. (4 Marks)",
        markScheme: [
            "State formula: 1/R_T = 1/R_1 + 1/R_2.",
            "Substitute: 1/R_T = 1/12 + 1/12 = 2/12.",
            "Invert to find R_T: R_T = 12 / 2.",
            "Final Answer: 6 Ω."
        ],
        hint: "For two identical resistors in parallel, the total is half."
    },
    {
        id: 186,
        topic: "Electricity",
        question: "Explain two advantages of using Light Emitting Diodes (LEDs) rather than filament lamps for home lighting. (4 Marks)",
        markScheme: [
            "LEDs are much more efficient (less energy is wasted as heat).",
            "They have a much longer functional life / last longer.",
            "They use a smaller current for the same brightness.",
            "This reduces the environmental impact and lowers electricity bills."
        ],
        hint: "Efficiency and Longevity."
    },
    {
        id: 187,
        topic: "Electricity",
        type: "drawing",
        drawType: "electroscope",
        question: "Describe how a Gold-Leaf Electroscope can be used to detect the presence of static charge. (4 Marks)",
        markScheme: [
            "A charged object is brought near the metal cap of the electroscope.",
            "Charge is induced or transferred down to the metal stem and gold leaves.",
            "The two gold leaves gain the same charge (e.g., both positive).",
            "Like charges repel, causing the thin gold leaves to move apart (diverge)."
        ],
        hint: "Like charges repel!"
    },
    {
        id: 188,
        topic: "Electricity",
        question: "Explain why the resistance of a metal wire increases as its temperature rises. (4 Marks)",
        markScheme: [
            "Positive metal ions in the lattice gain kinetic energy and vibrate more.",
            "These vibrations increase the frequency of collisions with flowing electrons.",
            "The collisions obstruct the flow of charge through the metal.",
            "This makes it harder for the current to flow, resulting in higher resistance."
        ],
        hint: "Vibrating ions get in the way of electrons."
    },
    {
        id: 189,
        topic: "Electricity",
        question: "The charge on a single electron is 1.6 × 10^-19 C. If a current of 1 A flows for 1 s, calculate the number of electrons passing a point. (4 Marks)",
        markScheme: [
            "Calculate total charge: Q = I × t = 1 × 1 = 1 C.",
            "Number of electrons = Total Charge / Charge per electron.",
            "Calculation: 1 / (1.6 × 10^-19).",
            "Final Answer: 6.25 × 10^18 electrons."
        ],
        hint: "Divide the total charge by the tiny charge of one electron."
    },
    {
        id: 190,
        topic: "Electricity",
        question: "Explain why household sockets are connected in parallel rather than in series. (4 Marks)",
        markScheme: [
            "Appliances can be switched on and off independently.",
            "If one appliance fails or is unplugged, the others continue to work.",
            "Each socket receives the full mains voltage (230 V).",
            "Adding more appliances does not increase the total resistance of the whole house loop."
        ],
        hint: "Parallel allows independent control."
    },
    {
        id: 191,
        topic: "Electricity",
        question: "Define the term 'Volt' in terms of energy and charge. (4 Marks)",
        markScheme: [
            "One Volt is defined as one Joule per Coulomb.",
            "It is a measure of the energy transferred per unit of charge.",
            "Formula: V = E / Q.",
            "As charge through a component, it 'drops' its energy, which is the voltage."
        ],
        hint: "Volts = Joules divided by Coulombs."
    },
    {
        id: 192,
        topic: "Electricity",
        question: "An electric motor uses 12 V and 5 A for 10 s to lift a weight. Calculate the useful work done if the motor is 60% efficient. (4 Marks)",
        markScheme: [
            "Calculate Total Energy Input: E = I × V × t = 5 × 12 × 10 = 600 J.",
            "State Efficiency formula: Useful = Total × Efficiency.",
            "Calculation: 600 × 0.60.",
            "Final Answer: 360 J."
        ],
        hint: "Find the total input energy first, then apply the 60%."
    },
    {
        id: 193,
        topic: "Forces and Motion",
        question: "A 2kg trolley moving at 6 m/s hits a stationary 4kg trolley. They stick together. Calculate their final velocity. (4 Marks)",
        markScheme: [
            "Initial momentum = (2 x 6) + (4 x 0) = 12 kg m/s.",
            "Total final mass = 2 + 4 = 6 kg.",
            "Final velocity = Total Momentum / Total Mass.",
            "Calculation: 12 / 6 = 2 m/s."
        ],
        hint: "Total momentum before = Total momentum after."
    },
    {
        id: 194,
        topic: "Forces and Motion",
        question: "A tennis ball of mass 0.06kg hits a wall at 20 m/s and bounces back at 15 m/s. Calculate the change in momentum. (4 Marks)",
        markScheme: [
            "Change in momentum = m(v - u).",
            "Take direction into account: u = 20, v = -15.",
            "Calculation: 0.06 x (-15 - 20) = 0.06 x -35.",
            "Final Answer: -2.1 kg m/s (or 2.1 magnitude)."
        ],
        hint: "Velocity is a vector! Change in direction means a negative sign."
    },
    {
        id: 195,
        topic: "Forces and Motion",
        question: "Explain how the position of the center of gravity affects the stability of a racing car. (4 Marks)",
        markScheme: [
            "A racing car is designed with a very low center of gravity.",
            "This means the line of action of the weight is less likely to fall outside the base.",
            "This allows the car to corner at high speeds without toppling.",
            "A wide base also increases the angle the car can tilt before becoming unstable."
        ],
        hint: "Low and wide = Stable."
    },
    {
        id: 196,
        topic: "Forces and Motion",
        question: "Explain why an object moving in a circle at a constant speed is still accelerating. (4 Marks)",
        markScheme: [
            "Acceleration is the rate of change of velocity.",
            "Velocity is a vector quantity (magnitude and direction).",
            "In circular motion, the direction of travel is constantly changing.",
            "Since direction changes, velocity changes, therefore it is accelerating."
        ],
        hint: "Velocity involves direction."
    },
    {
        id: 197,
        topic: "Forces and Motion",
        question: "Describe how a student could investigate how the surface material affects the friction force on a block. (4 Marks)",
        markScheme: [
            "Use a Newton-meter to pull a wooden block across different surfaces.",
            "Pull the block at a constant slow speed.",
            "Record the force reading on the Newton-meter (which equals friction).",
            "Repeat for surfaces like sandpaper, glass, and carpet, keeping mass constant."
        ],
        hint: "Control variable: The mass of the block."
    },
    {
        id: 198,
        topic: "Forces and Motion",
        type: "drawing",
        drawType: "slopeForces",
        question: "A block is sliding down a rough slope at a constant speed. Draw and label the forces acting on the block. (4 Marks)",
        markScheme: [
            "Weight (W) acting vertically downwards.",
            "Normal Reaction (R) acting perpendicular to the slope surface.",
            "Friction (f) acting up the slope (opposite to motion).",
            "The resultant force must be zero because the speed is constant."
        ],
        hint: "Balanced forces = Constant speed."
    },
    {
        id: 199,
        topic: "Forces and Motion",
        question: "A car is traveling at 30 m/s. The driver has a reaction time of 0.6s. Calculate the thinking distance. (4 Marks)",
        markScheme: [
            "State formula: Distance = Speed x Time.",
            "Substitute: 30 x 0.6.",
            "Calculation: 18 meters.",
            "Thinking distance is the distance traveled before the brakes are applied."
        ],
        hint: "Use d = v x t."
    },
    {
        id: 200,
        topic: "Forces and Motion",
        question: "Classify the following as scalar or vector: Displacement, Mass, Force, Temperature, Acceleration. (4 Marks)",
        markScheme: [
            "Vector: Displacement, Force, Acceleration.",
            "Scalar: Mass, Temperature.",
            "Vectors have magnitude and direction.",
            "Scalars only have magnitude."
        ],
        hint: "Vectors have 'compass' directions."
    },
    {
        id: 201,
        topic: "Forces and Motion",
        question: "Explain the energy transfer that occurs when a spring is stretched and then released. (4 Marks)",
        markScheme: [
            "Work is done to stretch the spring.",
            "This energy is stored as Elastic Potential Energy.",
            "When released, EPE is transferred to Kinetic Energy of the spring.",
            "Some energy is dissipated as thermal energy due to internal friction."
        ],
        hint: "Work done = Energy stored."
    },
    {
        id: 202,
        topic: "Forces and Motion",
        question: "A 60kg ice skater pushes a 40kg skater. The 40kg skater moves away at 3 m/s. Calculate the 60kg skater's velocity. (4 Marks)",
        markScheme: [
            "Initial total momentum = 0.",
            "Final momentum: (60 x v) + (40 x 3) = 0.",
            "Simplify: 60v + 120 = 0.",
            "Final Answer: v = -2 m/s (moves in opposite direction)."
        ],
        hint: "The total momentum after an 'explosion' is still zero."
    },
    {
        id: 203,
        topic: "Forces and Motion",
        question: "A ball is thrown upwards at 15 m/s. Calculate the maximum height reached (g = 10 m/s^2). (4 Marks)",
        markScheme: [
            "Use v^2 = u^2 + 2as.",
            "At max height, v = 0. u = 15, a = -10.",
            "0 = 15^2 + 2(-10)s.",
            "Calculation: 225 / 20 = 11.25 meters."
        ],
        hint: "At the very top, the velocity is zero."
    },
    {
        id: 204,
        topic: "Forces and Motion",
        question: "Describe three ways that a force can change the motion or shape of an object. (4 Marks)",
        markScheme: [
            "Change in speed: Acceleration or deceleration.",
            "Change in direction: Turning or circular motion.",
            "Change in shape: Stretching, compressing, or bending.",
            "State that a resultant force is required for changes in motion."
        ],
        hint: "Speed, Direction, Shape."
    },
    {
        id: 205,
        topic: "Forces and Motion",
        question: "State Newton's First Law and explain why passengers in a car lurch forward when the brakes are applied. (4 Marks)",
        markScheme: [
            "An object remains at rest or constant velocity unless acted on by a resultant force.",
            "The passengers have inertia (resistance to change in motion).",
            "When the car stops, no resultant force acts on the passengers initially.",
            "They continue moving at the car's original speed until the seatbelt applies a force."
        ],
        hint: "Inertia is the key concept."
    },
    {
        id: 206,
        topic: "Forces and Motion",
        question: "A car of 1000kg traveling at 20 m/s hits a wall and stops in 0.5s. Calculate the average force. (4 Marks)",
        markScheme: [
            "Calculate Δp: 1000 x (0 - 20) = -20,000 kg m/s.",
            "State formula: F = Δp / t.",
            "Calculation: 20,000 / 0.5.",
            "Final Answer: 40,000 Newtons."
        ],
        hint: "Force = Change in momentum / Time."
    },
    {
        id: 207,
        topic: "Forces and Motion",
        type: "drawing",
        drawType: "dtGraph",
        question: "Describe the shape of a distance-time graph for an object that is accelerating. (4 Marks)",
        markScheme: [
            "The line is a curve.",
            "The gradient of the line is increasing over time.",
            "A steeper gradient represents a higher instantaneous speed.",
            "If the line was straight, the speed would be constant."
        ],
        hint: "Curved line = Changing speed."
    },
    {
        id: 208,
        topic: "Forces and Motion",
        type: "drawing",
        drawType: "momentsPivot",
        question: "A 40N weight is 2m from a pivot. How far from the pivot on the other side should a 10N weight be to balance? (4 Marks)",
        markScheme: [
            "Clockwise moment = Anticlockwise moment.",
            "40 x 2 = 10 x distance.",
            "80 = 10d.",
            "Final Answer: 8 meters."
        ],
        hint: "Force1 x Dist1 = Force2 x Dist2."
    },
    {
        id: 209,
        topic: "Forces and Motion",
        question: "Sketch a velocity-time graph for a parachutist. Label the point where the parachute opens. (4 Marks)",
        markScheme: [
            "Initial curve upwards to a plateau (first terminal velocity).",
            "Sharp vertical drop in velocity when the parachute opens.",
            "Curve down to a second, lower plateau (new terminal velocity).",
            "The gradient is zero at both plateaus."
        ],
        hint: "Parachute increases surface area and air resistance."
    },
    {
        id: 210,
        topic: "Astrophysics",
        question: "Define the terms 'Universe', 'Galaxy', and 'Solar System' and arrange them in order of size. (4 Marks)",
        markScheme: [
            "Universe: A large collection of billions of galaxies.",
            "Galaxy: A large collection of billions of stars.",
            "Solar System: A collection of planets orbiting a central star (the Sun).",
            "Order (largest to smallest): Universe > Galaxy > Solar System."
        ],
        hint: "The Milky Way is our galaxy; the Sun is just one star in it."
    },
    {
        id: 211,
        topic: "Astrophysics",
        type: "drawing",
        drawType: "orbitalPaths",
        question: "Compare the orbital paths of a planet and a comet around the Sun. (4 Marks)",
        markScheme: [
            "Planets have orbits that are nearly circular.",
            "Comets have highly elliptical (elongated) orbits.",
            "The Sun is at the center for planets; it is at one focus for comets.",
            "Comets vary in speed significantly, while planets have relatively constant speeds."
        ],
        hint: "Think 'Circle' vs 'Squashed Oval'."
    },
    {
        id: 212,
        topic: "Astrophysics",
        question: "Explain the role of gravitational force in the motion of moons and planets. (4 Marks)",
        markScheme: [
            "Gravity provides the centripetal force required for circular motion.",
            "It acts toward the center of the orbit (e.g. toward the planet or star).",
            "It causes the object to constantly change direction (accelerate).",
            "Without gravity, the object would move off in a straight line at a constant speed."
        ],
        hint: "Gravity is the 'invisible string' holding everything in orbit."
    },
    {
        id: 213,
        topic: "Astrophysics",
        type: "drawing",
        drawType: "orbitalMath",
        question: "A satellite orbits the Earth at a height of 400 km. If the Earth's radius is 6400 km and the orbital period is 90 minutes, calculate the orbital speed. (4 Marks)",
        markScheme: [
            "Calculate total radius (r): 6400 + 400 = 6800 km.",
            "Convert time to seconds (T): 90 x 60 = 5400 s.",
            "State formula: v = (2 x \pi x r) / T.",
            "Calculation: (2 x 3.14 x 6800) / 5400 = 7.91 km/s."
        ],
        hint: "Don't forget to add the Earth's radius to the height!"
    },
    {
        id: 214,
        topic: "Astrophysics",
        type: "drawing",
        drawType: "starLifecycle",
        question: "Describe the lifecycle of a star with a mass similar to the Sun, starting from a Nebula. (4 Marks)",
        markScheme: [
            "Nebula: A cloud of gas and dust collapses under gravity to form a Protostar.",
            "Main Sequence: Fusion of Hydrogen into Helium begins; forces are balanced.",
            "Red Giant: Hydrogen runs out; the star expands and cools as Helium begins to fuse.",
            "White Dwarf: The outer layers are ejected (planetary nebula), leaving a hot, dense core."
        ],
        hint: "Nebula -> Main Sequence -> Red Giant -> White Dwarf."
    },
    {
        id: 215,
        topic: "Astrophysics",
        type: "drawing",
        drawType: "starLifecycle",
        question: "Explain the final stages of a star much more massive than the Sun. (4 Marks)",
        markScheme: [
            "The star expands into a Red Supergiant.",
            "It eventually explodes in a Supernova.",
            "The explosion leaves behind a very dense Neutron Star.",
            "If the mass is high enough, the core collapses further to form a Black Hole."
        ],
        hint: "Supergiants lead to Supernovas!"
    },
    {
        id: 216,
        topic: "Astrophysics",
        question: "How are stars classified based on their surface temperature and color? (4 Marks)",
        markScheme: [
            "Star color is determined by its surface temperature.",
            "Coolest stars are Red (approx 3000 K).",
            "Hottest stars are Blue (approx 30,000 K).",
            "The sequence follows: Red, Orange, Yellow, White, Blue."
        ],
        hint: "Think about a piece of metal heating up; it goes from red to white to blue."
    },
    {
        id: 217,
        topic: "Astrophysics",
        type: "drawing",
        drawType: "hrDiagram",
        question: "Describe the main features of a Hertzsprung-Russell (H-R) diagram. (4 Marks)",
        markScheme: [
            "Vertical axis represents Luminosity (or Absolute Magnitude).",
            "Horizontal axis represents Temperature (decreasing from left to right).",
            "Main Sequence: A diagonal band from top-left to bottom-right.",
            "Red Giants are at the top-right; White Dwarfs are at the bottom-left."
        ],
        hint: "It's a map of star types based on brightness and heat."
    },
    {
        id: 218,
        topic: "Astrophysics",
        question: "Define 'Absolute Magnitude' and explain how it differs from 'Apparent Magnitude'. (4 Marks)",
        markScheme: [
            "Apparent Magnitude: How bright a star looks from Earth.",
            "Absolute Magnitude: How bright a star would be if placed at a standard distance (10 parsecs).",
            "Apparent brightness depends on both luminosity and distance.",
            "Absolute magnitude allows scientists to compare the actual power output of stars."
        ],
        hint: "Absolute magnitude is the 'fair' way to compare brightness."
    },
    {
        id: 219,
        topic: "Astrophysics",
        type: "drawing",
        drawType: "bigBang",
        question: "State the Big Bang Theory and identify two pieces of evidence that support it. (4 Marks)",
        markScheme: [
            "Theory: The Universe began from a single very hot, dense point and has been expanding ever since.",
            "Evidence 1: Redshift of distant galaxies (expansion).",
            "Evidence 2: Cosmic Microwave Background Radiation (CMBR).",
            "Expansion causes light to stretch and leave a 'glow' from the early universe."
        ],
        hint: "Expansion and the 'echo' of the explosion."
    },
    {
        id: 220,
        topic: "Astrophysics",
        type: "drawing",
        drawType: "redshift",
        question: "Explain what is meant by 'Redshift' and how it provides evidence for the expansion of the universe. (4 Marks)",
        markScheme: [
            "Light from distant galaxies has a longer wavelength than expected.",
            "The absorption lines in the spectrum are shifted toward the red end.",
            "This indicates the galaxies are moving away from us (Doppler Effect).",
            "More distant galaxies show a greater redshift, meaning they are moving faster."
        ],
        hint: "Stretched light means moving away."
    },
    {
        id: 221,
        topic: "Astrophysics",
        question: "Explain how Cosmic Microwave Background Radiation (CMBR) provides evidence for the Big Bang. (4 Marks)",
        markScheme: [
            "CMBR is low-frequency microwave radiation detected from all parts of the sky.",
            "It is the remains of the intense thermal energy (gamma rays) released at the Big Bang.",
            "As the universe expanded, the radiation stretched into the microwave region.",
            "The Big Bang is the only theory that explains the presence of this uniform background radiation."
        ],
        hint: "It's the 'afterglow' of the Big Bang."
    },
    {
        id: 222,
        topic: "Astrophysics",
        question: "State the Doppler equation for light and identify each variable. (4 Marks)",
        markScheme: [
            "Equation: \Delta\lambda / \lambda_0 = v / c.",
            "\Delta\lambda is the change in wavelength.",
            "\lambda_0 is the original (source) wavelength.",
            "v is the velocity of the galaxy, and c is the speed of light."
        ],
        hint: "Change in wavelength over original wavelength = velocity over speed of light."
    },
    {
        id: 223,
        topic: "Astrophysics",
        question: "Describe the Milky Way and explain its classification. (4 Marks)",
        markScheme: [
            "The Milky Way is our home galaxy.",
            "It is a spiral galaxy containing billions of stars.",
            "Our solar system is located in one of the spiral arms.",
            "It orbits a supermassive black hole at the center."
        ],
        hint: "We are in a spinning disk of stars."
    },
    {
        id: 224,
        topic: "Astrophysics",
        question: "State Hubble's Law and explain its significance in cosmology. (4 Marks)",
        markScheme: [
            "Hubble's Law states the recessional velocity of a galaxy is proportional to its distance.",
            "Formula: v = H_0 d.",
            "Significance: It proves the universe is expanding uniformly.",
            "It allows scientists to estimate the age of the universe."
        ],
        hint: "Further away = moving faster."
    },
    {
        id: 225,
        topic: "Astrophysics",
        question: "List three conditions required for a planet to be classified as a 'planet' rather than a 'dwarf planet'. (4 Marks)",
        markScheme: [
            "It must orbit a star (the Sun).",
            "It must be large enough for its own gravity to make it nearly spherical.",
            "It must have 'cleared the neighborhood' around its orbit of other objects.",
            "Dwarf planets like Pluto fail the third condition."
        ],
        hint: "Planets must 'clear their path'."
    },
    {
        id: 226,
        topic: "Astrophysics",
        question: "How does the orbital speed of a planet change with its distance from the Sun? Explain why. (4 Marks)",
        markScheme: [
            "Planets closer to the Sun move at higher orbital speeds.",
            "Gravitational force is stronger at shorter distances.",
            "A stronger force is required to provide the centripetal acceleration for a smaller radius.",
            "Planets further away have larger orbits and lower speeds."
        ],
        hint: "Closer planets are 'whipped' around faster by gravity."
    },
    {
        id: 227,
        topic: "Astrophysics",
        type: "drawing",
        drawType: "supernova",
        question: "What is a Supernova and why is it important for the composition of the universe? (4 Marks)",
        markScheme: [
            "A Supernova is the massive explosion of a high-mass star at the end of its life.",
            "The explosion releases a huge amount of energy and light.",
            "It creates and distributes heavy elements (heavier than iron) into space.",
            "These elements eventually form new stars, planets, and even life."
        ],
        hint: "You are made of 'star-stuff' from these explosions."
    },
    {
        id: 228,
        topic: "Astrophysics",
        question: "Distinguish between a Neutron Star and a Black Hole. (4 Marks)",
        markScheme: [
            "Both are remnants of high-mass stars after a Supernova.",
            "Neutron Star: An extremely dense core made almost entirely of neutrons.",
            "Black Hole: A region where gravity is so strong that even light cannot escape.",
            "The outcome depends on the mass of the remaining core; highest mass becomes a black hole."
        ],
        hint: "Densely packed neutrons vs Infinite gravity."
    },
    {
        id: 229,
        topic: "Astrophysics",
        type: "drawing",
        drawType: "redshift",
        question: "How do absorption lines in stellar spectra help determine a star's composition? (4 Marks)",
        markScheme: [
            "Elements in the star's atmosphere absorb specific frequencies of light.",
            "This creates dark lines in the continuous spectrum.",
            "Every element has a unique 'fingerprint' of lines.",
            "By matching these lines to laboratory data, we can identify elements like Hydrogen and Helium."
        ],
        hint: "Dark lines are shadows of the atoms in the star."
    },
    {
        id: 230,
        topic: "Astrophysics",
        question: "What is a binary star system and how can it be detected using redshift? (4 Marks)",
        markScheme: [
            "A system where two stars orbit a common center of mass.",
            "As one star moves toward us, its light is blueshifted.",
            "As the other moves away, its light is redshifted.",
            "Observing these periodic shifts in the spectral lines allows us to identify the binary pair."
        ],
        hint: "Wobbling lines mean a star has a partner."
    },
    {
        id: 231,
        topic: "Astrophysics",
        question: "Explain the balance of forces that keeps a Main Sequence star stable. (4 Marks)",
        markScheme: [
            "Gravitational pull acts inwards, trying to collapse the star.",
            "Thermal expansion (gas/radiation pressure) from nuclear fusion acts outwards.",
            "During the main sequence, these two forces are equal and opposite.",
            "The star is in a state of stable equilibrium."
        ],
        hint: "Gravity vs Fusion Pressure."
    },
    {
        id: 232,
        topic: "Astrophysics",
        question: "Predict the future stages of our Sun over the next 5 billion years. (4 Marks)",
        markScheme: [
            "The Sun will remain a Main Sequence star until its Hydrogen is used up.",
            "It will expand into a Red Giant, swallowing the inner planets.",
            "The outer layers will drift away as a Planetary Nebula.",
            "It will eventually collapse into a hot White Dwarf."
        ],
        hint: "Our Sun is a medium-sized star."
    },
    {
        id: 233,
        topic: "Astrophysics",
        question: "Why can we only see distant galaxies as they were in the past? (4 Marks)",
        markScheme: [
            "Light travels at a finite speed (300,000 km/s).",
            "Distant galaxies are millions or billions of light-years away.",
            "It takes light millions of years to reach our telescopes.",
            "Therefore, we see the light that was emitted long ago, showing the galaxy's history."
        ],
        hint: "Looking at stars is like using a time machine."
    },
    {
        id: 234,
        topic: "Astrophysics",
        question: "Briefly explain why scientists believe Dark Matter and Dark Energy exist. (4 Marks)",
        markScheme: [
            "Galaxies rotate faster than expected based on their visible mass (suggests Dark Matter).",
            "The expansion of the universe is accelerating (suggests Dark Energy).",
            "Visible matter cannot account for the gravity needed to hold galaxies together.",
            "Dark energy provides the 'push' needed to overcome gravity on a universal scale."
        ],
        hint: "Invisible stuff that holds things together or pushes them apart."
    },
    {
        id: 235,
        topic: "Astrophysics",
        question: "State the average temperature of the universe today and link it to CMBR. (4 Marks)",
        markScheme: [
            "The average temperature is approximately 2.7 K (above absolute zero).",
            "This corresponds perfectly to the peak wavelength of the CMBR.",
            "This temperature has dropped as the universe expanded and the radiation stretched.",
            "It is uniform in all directions, confirming a singular origin."
        ],
        hint: "The universe is very cold and getting colder."
    },
    {
        id: 236,
        topic: "Astrophysics",
        question: "What are Nebulae made of and how do they lead to star formation? (4 Marks)",
        markScheme: [
            "Nebulae are huge clouds of Hydrogen gas and dust particles.",
            "Gravity pulls the particles together, increasing density.",
            "Gravitational potential energy is transferred into thermal energy.",
            "When the temperature is high enough (millions of degrees), nuclear fusion begins."
        ],
        hint: "Gas + Gravity = Hot Protostar."
    },
    {
        id: 237,
        topic: "Astrophysics",
        question: "Explain why a protostar is not yet considered a 'Main Sequence' star. (4 Marks)",
        markScheme: [
            "A protostar is still accumulating mass and contracting.",
            "The temperature in the core is not yet high enough for Hydrogen fusion.",
            "It glows due to the release of gravitational energy rather than nuclear energy.",
            "Main sequence starts only when stable Hydrogen fusion is established."
        ],
        hint: "Fusion is the 'on switch' for a real star."
    },
    {
        id: 238,
        topic: "Astrophysics",
        type: "drawing",
        drawType: "orbitalPaths",
        question: "Explain using energy stores why a comet moves fastest at its perihelion (closest point to Sun). (4 Marks)",
        markScheme: [
            "At the furthest point, the comet has maximum Gravitational Potential Energy (GPE).",
            "As it falls toward the Sun, GPE is transferred into Kinetic Energy (KE).",
            "At the perihelion, GPE is at its minimum and KE is at its maximum.",
            "Since KE is proportional to speed squared, the speed is highest at this point."
        ],
        hint: "Think of a roller coaster dropping toward the sun."
    },
    {
        id: 239,
        topic: "Astrophysics",
        question: "List two factors that determine how bright a star appears to us on Earth. (4 Marks)",
        markScheme: [
            "Luminosity: How much light energy the star actually emits per second.",
            "Distance: How far the star is from the observer.",
            "Surface temperature and surface area (size) determine the luminosity.",
            "The 'Inverse Square Law' means brightness drops quickly with distance."
        ],
        hint: "Power output and distance."
    },
    {
        id: 240,
        topic: "Astrophysics",
        question: "If a galaxy's spectrum shows a blue-shift, what does this tell us about its motion? (4 Marks)",
        markScheme: [
            "The light's wavelength has shortened and frequency has increased.",
            "This indicates the galaxy is moving toward us.",
            "This is a localized effect (e.g. the Andromeda galaxy).",
            "It does not contradict universal expansion, which applies to distant galaxies."
        ],
        hint: "Blue = Coming closer."
    },
    {
        id: 241,
        topic: "Astrophysics",
        question: "Explain the 'Balloon Analogy' used to describe the expansion of the universe. (4 Marks)",
        markScheme: [
            "The surface of the balloon represents the 3D space of the universe.",
            "Galaxies are represented by dots drawn on the balloon's surface.",
            "As the balloon is inflated, the space between all dots increases.",
            "Dots further apart move away from each other faster than those closer together."
        ],
        hint: "Space itself is stretching, not just the objects moving through it."
    },
    {
        id: 242,
        topic: "Astrophysics",
        question: "Describe how the Hubble Constant (H_0) can be used to estimate the age of the universe. (4 Marks)",
        markScheme: [
            "Recessional velocity v = H_0 d.",
            "Time = Distance / Velocity.",
            "By substituting the law: Time = d / (H_0 d) = 1 / H_0.",
            "The age of the universe is approximately the reciprocal of the Hubble Constant."
        ],
        hint: "Age \approx 1 / Hubble Constant."
    },
    {
        id: 243,
        topic: "Astrophysics",
        question: "Why does a White Dwarf eventually stop glowing? (4 Marks)",
        markScheme: [
            "A White Dwarf has no nuclear fusion occurring in its core.",
            "It only glows because it is still cooling down from its previous stages.",
            "It radiates its remaining thermal energy into space.",
            "Eventually, it will cool completely and become a cold, dark 'Black Dwarf'."
        ],
        hint: "It's like a hot coal taken out of a fire."
    },
    {
        id: 244,
        topic: "Astrophysics",
        type: "drawing",
        drawType: "hrDiagram",
        question: "Draw an arrow on an H-R diagram to show the movement of the Sun as it leaves the Main Sequence. (4 Marks)",
        markScheme: [
            "The arrow should move from the Main Sequence up and to the right.",
            "This shows an increase in Luminosity (becoming a Giant).",
            "It also shows a decrease in surface temperature (becoming Red).",
            "Later, it will drop down to the bottom-left corner to become a White Dwarf."
        ],
        hint: "Up and right = Red Giant; Down and left = White Dwarf."
    }
];
