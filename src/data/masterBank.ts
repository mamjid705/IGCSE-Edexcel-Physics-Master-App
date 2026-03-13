import { StrategistQuestion } from '../types';

export const masterQuestions: StrategistQuestion[] = [
    {
        id: 1,
        topic: "Forces and Motion",
        type: "activity",
        drawType: "trolleyRamp",
        question: "Describe an experiment to investigate how the acceleration of a trolley depends on the resultant force. (6 Marks)",
        markScheme: [
            "Set up a trolley on a ramp with a pulley and hanging masses.",
            "Compensate for friction by tilting the ramp until the trolley just moves.",
            "Measure the distance between two light gates.",
            "Vary the hanging mass (Force) while keeping the total system mass constant.",
            "Record the time taken to pass between gates using a data logger.",
            "Calculate acceleration and plot Force against Acceleration."
        ],
        hint: "The slope should be adjusted so the trolley moves at a constant speed before you add any weights."
    },
    {
        id: 2,
        topic: "Forces and Motion",
        type: "activity",
        drawType: "springStretch",
        question: "Design an investigation to find the spring constant of a metal spring. (6 Marks)",
        markScheme: [
            "Hang a spring from a clamp stand and place a vertical ruler next to it.",
            "Measure the natural length of the spring (at eye level).",
            "Add a 100g mass (1N) and record the new length.",
            "Repeat for at least 5 different masses.",
            "Calculate extension for each (New Length - Original Length).",
            "Plot Force vs Extension; the gradient of the straight line is the spring constant."
        ],
        hint: "Always check the spring hasn't been permanently stretched (exceeded elastic limit)."
    },
    {
        id: 3,
        topic: "Forces and Motion",
        type: "activity",
        drawType: "fallingCases",
        question: "Plan an experiment to see how mass affects the terminal velocity of a falling object. (6 Marks)",
        markScheme: [
            "Use stackable paper muffin cases to vary mass while keeping area constant.",
            "Mark a 'timing zone' near the floor where the cases have reached constant speed.",
            "Drop a single case and time its fall through the zone using a stopwatch.",
            "Repeat for 2, 3, 4, and 5 cases stacked together.",
            "Calculate terminal velocity (Distance / Time).",
            "Plot a graph of Terminal Velocity against Mass."
        ],
        hint: "Make sure the 'start' of your timing zone is at least 1 meter below the release point."
    },
    {
        id: 4,
        topic: "Forces and Motion",
        type: "activity",
        drawType: "centerGravity",
        question: "Explain the procedure to find the centre of gravity of an irregular card shape. (6 Marks)",
        markScheme: [
            "Punch three holes near the edges of the card.",
            "Suspend the card from a pin through one hole so it swings freely.",
            "Hang a plumb line from the same pin.",
            "Draw a line on the card following the vertical string of the plumb line.",
            "Repeat for the other two holes.",
            "The intersection of the three lines is the centre of gravity."
        ],
        hint: "The card must be allowed to settle completely before drawing each line."
    },
    {
        id: 5,
        topic: "Electricity",
        type: "activity",
        drawType: "ivTracer",
        simType: "ivTracer",
        config: { 
            component: "filament_lamp", 
            minV: 0, 
            maxV: 12, 
            step: 0.5,
            uiLayout: "balanced"
        },
        question: "Describe how you would carry out an experiment to investigate the relationship between current and voltage for a filament lamp. (6 Marks)",
        markScheme: [
            "Apparatus: Ammeter, voltmeter, filament lamp, variable resistor, and DC power supply.",
            "Circuit: Connect the ammeter in series with the lamp and the voltmeter in parallel across the lamp.",
            "Method: Adjust the variable resistor to vary the voltage across the lamp from 0V up to 12V.",
            "Measurement: Record the current (I) and voltage (V) at regular intervals (e.g., every 1V).",
            "Reliability: Repeat the experiment three times and calculate an average current for each voltage level.",
            "Analysis: Plot a graph of I against V. Describe how the gradient decreases as voltage increases, showing that resistance is rising."
        ],
        hint: "Focus on the positive quadrant: notice how the line curves as the filament gets hotter. This curve represents the increase in resistance."
    },
    {
        id: 6,
        topic: "Electricity",
        type: "activity",
        drawType: "lightSensor",
        simType: "lightSensor",
        config: { lampPower: "60W", maxDistance: 100, unit: "cm" },
        question: "Design an investigation to see how the resistance of an LDR changes with light intensity. (6 Marks)",
        markScheme: [
            "Apparatus: LDR connected to an ohmmeter (or ammeter/voltmeter setup) and a lamp.",
            "Independent Variable: Light intensity, controlled by the distance (d) of the lamp from the LDR.",
            "Dependent Variable: The resistance (R) of the LDR.",
            "Method: Start with the lamp at 10cm, record R. Move the lamp to 20cm, 30cm, 40cm, and 50cm.",
            "Control: Perform the experiment in a dark room to ensure the only light source is the lamp.",
            "Analysis: Plot a graph of Resistance against Distance; describe the decrease in R as distance decreases (intensity increases)."
        ],
        hint: "The light intensity is highest when the lamp is closest. What happens to the resistance then?"
    },
    {
        id: 7,
        topic: "Electricity",
        type: "activity",
        drawType: "thermalSensor",
        simType: "thermalSensor",
        config: { startTemp: 20, maxTemp: 100, medium: "water_bath" },
        question: "Plan an experiment to investigate how the resistance of a thermistor changes as it is heated. (6 Marks)",
        markScheme: [
            "Apparatus: Thermistor, beaker of water, electric heater, thermometer, and ohmmeter.",
            "Method: Place the thermistor and thermometer in the water bath.",
            "Procedure: Heat the water slowly. Record the resistance at 10-degree intervals (e.g., 20°C, 30°C, etc.).",
            "Measurement: Stir the water regularly to ensure the temperature is uniform throughout the beaker.",
            "Safety: Use an electric heater rather than a Bunsen burner for better control and safety around water.",
            "Analysis: Plot a graph of Resistance against Temperature; show that resistance decreases as temperature rises."
        ],
        hint: "Why is it important to stir the water? It ensures the thermometer and thermistor are at the exact same temperature."
    },
    {
        id: 8,
        topic: "Waves",
        type: "activity",
        drawType: "refractionBox",
        simType: "refractionBox",
        config: { 
            material: "glass_block", 
            minAngle: 0, 
            maxAngle: 80, 
            step: 10,
            tableColumns: ["i (°)", "r (°)", "sin i", "sin r", "n (Refractive Index)"]
        },
        question: "Describe an experiment to determine the refractive index of a rectangular glass block. (6 Marks)",
        markScheme: [
            "Apparatus: Ray box, rectangular glass block, protractor, and plain paper.",
            "Method: Place the block on paper and draw its outline. Shine a light ray at an angle into the block.",
            "Marking: Mark the path of the incident and emergent rays using crosses. Remove the block to draw the refracted ray.",
            "Measurement: Draw a normal at the point of entry and use a protractor to measure the angle of incidence (i) and angle of refraction (r).",
            "Repetition: Repeat for at least five different angles of incidence.",
            "Analysis: Calculate n using the formula n = sin i / sin r for each pair of angles and find the average."
        ],
        hint: "The refractive index n is a ratio and has no units. Ensure your calculator is in Degree mode when calculating sines."
    },
    {
        id: 9,
        topic: "Waves",
        type: "activity",
        drawType: "semiCircleRefraction",
        simType: "semiCircleRefraction",
        config: { 
            material: "perspex_semi_circle", 
            minAngle: 30, 
            maxAngle: 60,
            tableColumns: ["Critical Angle c (°)", "sin c", "n (1 / sin c)"]
        },
        question: "Plan an investigation to measure the critical angle of a semi-circular glass block. (6 Marks)",
        markScheme: [
            "Apparatus: Semi-circular glass block, ray box, and protractor.",
            "Method: Direct a ray of light through the curved side toward the center of the flat face.",
            "Observation: Slowly increase the angle of incidence until the light ray refracts along the flat boundary (90 degrees).",
            "Measurement: Record the angle of incidence at this specific point; this is the critical angle (c).",
            "Proof: Increase the angle further to observe Total Internal Reflection (TIR).",
            "Analysis: Use the formula n = 1 / sin c to calculate the refractive index of the material."
        ],
        hint: "Total Internal Reflection only occurs when light moves from a more dense medium (glass) to a less dense medium (air)."
    },
    {
        id: 10,
        topic: "Waves",
        type: "activity",
        drawType: "echoTimer",
        simType: "echoTimer",
        config: { 
            distanceToWall: 100, 
            claps: 20, 
            soundSpeed: 340,
            tableColumns: ["Distance d (m)", "Total Time (s)", "Time for 1 clap t (s)", "Speed v (m/s)"]
        },
        question: "Plan an investigation to measure the speed of sound in air using an echo from a large wall. (6 Marks)",
        markScheme: [
            "Apparatus: Two wooden blocks (to create a sharp sound), a stopwatch, and a long measuring tape.",
            "Setup: Measure a large distance (d), such as 100m, from a flat wall using the tape measure.",
            "Method: Stand at the measured distance and clap the blocks together. When the echo returns, clap again to create a steady rhythm.",
            "Measurement: Use a stopwatch to time the interval for 20 claps to reduce human reaction time error.",
            "Calculation: Calculate the time for one clap (total time / 20). The distance traveled by sound is 2d (to the wall and back).",
            "Analysis: Use the formula Speed = Distance / Time (v = 2d / t) to find the speed of sound."
        ],
        hint: "By timing 20 claps, you spread the starting and stopping error across many intervals, making your result much more accurate."
    },
    {
        id: 11,
        topic: "Waves",
        type: "activity",
        drawType: "rippleTank",
        simType: "rippleTank",
        config: { 
            frequencyRange: [10, 50], 
            depth: "shallow",
            tableColumns: ["Frequency f (Hz)", "Wavelength λ (m)", "Wave Speed v (m/s)"]
        },
        question: "Describe how to use a ripple tank to measure the speed, frequency, and wavelength of water waves. (6 Marks)",
        markScheme: [
            "Setup: Use a motor-driven bar to create straight wavefronts and a strobe light to 'freeze' the waves.",
            "Wavelength: Place a ruler on the paper below the tank. Measure the distance across 10 wavefronts and divide by 10 to find λ.",
            "Frequency: Count the number of waves passing a point in 10 seconds and divide by 10 to find f.",
            "Speed Calculation: Multiply the measured frequency by the wavelength (v = f x λ).",
            "Speed Measurement: Alternatively, time how long a single wavefront takes to travel a fixed distance (v = d / t).",
            "Reliability: Repeat the measurements at different motor frequencies and calculate an average speed."
        ],
        hint: "Using a strobe light makes it much easier to measure wavelength because the waves appear to stand still."
    },
    {
        id: 12,
        topic: "Energy Resources",
        type: "activity",
        drawType: "insulationLab",
        simType: "insulationLab",
        config: { 
            startTemp: 80, 
            duration: 600, 
            roomTemp: 20,
            materials: ["Control", "Newspaper", "Wool", "Bubble Wrap"],
            lidPenalty: 0.35, // 35% faster cooling without lid
            tableColumns: ["Time / s", "Material", "Lid Status", "Temperature / °C"],
            coolingRates: { "Control": 0.05, "Newspaper": 0.03, "Wool": 0.02, "Bubble Wrap": 0.015 }
        },
        question: "Design an investigation to compare the effectiveness of different insulating materials. (6 Marks)",
        markScheme: [
            "Apparatus: Beaker, thermometer, stopwatch, and various insulating materials.",
            "Independent Variable: The type of insulating material used.",
            "Dependent Variable: The temperature change over a fixed time period (e.g., 10 minutes).",
            "Control Variables: Volume of water (e.g., 200 cm³), starting temperature, and the use of a lid.",
            "Safety: The boiling water is a hazard; use a funnel to pour and keep beakers away from desk edges.",
            "Analysis: The material with the smallest temperature drop is the most effective insulator.",
            "Accuracy: Mention the use of a lid to prevent energy loss via evaporation."
        ],
        hint: "Examiner Tip: Many students forget to mention the lid. Without a lid, evaporation causes more heat loss than conduction, invalidating your results!"
    },
    {
        id: 13,
        topic: "Energy Resources",
        type: "activity",
        drawType: "leslieCube",
        simType: "leslieCube",
        config: { 
            surfaces: ["Matte Black", "Shiny Black", "Matte White", "Shiny Silver"],
            distanceRange: [10, 50],
            baseIntensity: 100,
            emissivity: { "Matte Black": 0.95, "Shiny Black": 0.88, "Matte White": 0.90, "Shiny Silver": 0.12 },
            tableColumns: ["Surface Finish", "Distance / cm", "IR Intensity / a.u."]
        },
        question: "Describe how a student could use a Leslie Cube to investigate how surface color affects the emission of infrared radiation. (6 Marks)",
        markScheme: [
            "Setup: Fill the Leslie Cube with boiling water so all faces are at the same temperature.",
            "Measurement: Use an infrared detector (or thermopile) to measure the radiation from each face.",
            "Control: Ensure the infrared detector is kept at a constant distance from each face (e.g., 10 cm).",
            "Independent Variable: The surface finish/color of the cube faces.",
            "Reliability: Repeat the readings for each face and calculate a mean.",
            "Analysis: Matte black will give the highest reading; shiny silver will give the lowest.",
            "Physics: Conclude that dark, matte surfaces are better emitters of IR than shiny, light ones."
        ],
        hint: "The distance must be perfectly constant because IR intensity follows the inverse square law—move it back a little, and the reading drops a lot!"
    },
    {
        id: 14,
        topic: "Energy Resources",
        type: "activity",
        drawType: "shcLab",
        simType: "shcLab",
        config: { 
            liquid: "Water", 
            mass: 0.1, // kg
            voltage: 12, 
            current: 2,
            shcValue: 4200,
            stirringRequirement: true,
            tableColumns: ["Mass / kg", "Energy / J", "Temp Change / °C", "Calculated SHC / J/kg°C"]
        },
        question: "Plan an experiment to determine the specific heat capacity of a liquid using an electrical method. (6 Marks)",
        markScheme: [
            "Apparatus: Insulated beaker, immersion heater, thermometer, joulemeter (or ammeter/voltmeter), and balance.",
            "Measurements: Record the mass of the liquid using the balance and the initial temperature.",
            "Procedure: Turn on the heater and record the total energy supplied (from a joulemeter) and the final temperature.",
            "Accuracy: Stir the liquid continuously to ensure the temperature is uniform throughout.",
            "Analysis: Use the formula c = ΔQ / (m x ΔT) to calculate the specific heat capacity.",
            "Evaluation: Insulation is required to ensure all energy from the heater goes into the liquid, not the surroundings."
        ],
        hint: "Examiner Tip: Don't just say 'measure the energy.' Specify that you use a joulemeter OR record current, voltage, and time (E = V x I x t)."
    },
    {
        id: 15,
        topic: "Energy Resources",
        type: "activity",
        drawType: "convectionBeaker",
        simType: "convectionBeaker",
        config: { 
            tracer: "Potassium Manganate(VII)", 
            heatSource: "Bunsen Burner",
            animationSteps: ["Crystal placed", "Heat applied", "Rising current", "Surface spread", "Sinking current"]
        },
        question: "Explain how a student can visualize convection currents in a liquid. (6 Marks)",
        markScheme: [
            "Setup: Fill a large beaker with water and place a single crystal of potassium manganate(VII) at the bottom to one side.",
            "Method: Heat the water directly under the crystal using a small Bunsen flame.",
            "Observation: Observe the purple streak of dissolved crystal rising, moving across the top, and sinking on the cold side.",
            "Physics: The heated water expands and becomes less dense, causing it to rise.",
            "Physics: Cooler, denser water sinks to replace it, creating a continuous convection cell.",
            "Terminology: Ensure you state that the fluid expands (particles spread out), not the particles themselves."
        ],
        hint: "Be careful with your words! Particles do NOT expand; the distance between them increases, which causes the fluid to expand."
    },
    {
        id: 16,
        topic: "States of Matter",
        type: "activity",
        simType: "densityTank",
        config: { 
            liquids: [{ name: "Water", density: 1.0 }, { name: "Cooking Oil", density: 0.915 }],
            objects: [{ name: "Stone", mass: 62.5, trueVol: 25.0 }, { name: "Brass Nut", mass: 22.1, trueVol: 2.6 }],
            tableColumns: ["Object", "Mass / g", "Initial Vol / cm³", "Final Vol / cm³", "Object Vol / cm³", "Density / g/cm³"]
        },
        question: "Describe an experiment to find the density of an irregularly shaped object. (6 Marks)",
        markScheme: [
            "Apparatus: Electronic top-pan balance and a displacement (Eureka) can.",
            "Measurement: Use the balance to measure the mass (m) of the dry object first.",
            "Method: Fill the Eureka can until water just starts to drip from the spout.",
            "Procedure: Place a measuring cylinder under the spout and gently lower the object into the can.",
            "Accuracy: Read the volume (V) of displaced water from the measuring cylinder at eye level (bottom of meniscus).",
            "Analysis: Use the formula density = mass / volume (ρ = m / V) to calculate the density.",
            "Reliability: Repeat the displacement three times and calculate an average volume."
        ],
        hint: "Examiner Tip: Always measure the mass *before* putting the object in water, or the added water weight will make your density calculation incorrect!"
    },
    {
        id: 17,
        topic: "States of Matter",
        type: "activity",
        simType: "boylesPiston",
        config: { 
            k: 2000, 
            minPressure: 100, 
            maxPressure: 400,
            tableColumns: ["Pressure / kPa", "Volume / cm³", "P x V (Constant)"]
        },
        question: "Design an investigation to show the relationship between the pressure and volume of a fixed mass of gas at constant temperature. (6 Marks)",
        markScheme: [
            "Apparatus: Sealed vertical cylinder with a movable piston connected to a pressure pump/gauge.",
            "Method: Change the pressure of the gas by adjusting the pump or adding weights in fixed steps.",
            "Measurement: Record the volume (V) from the cylinder scale for each corresponding pressure (P).",
            "Variables: Keep the temperature constant by waiting for the gas to cool after each pressure change.",
            "Control: Ensure the system is airtight so the mass of the gas remains constant.",
            "Analysis: Plot a graph of Pressure against 1/Volume; a straight line through the origin proves inverse proportionality.",
            "Accuracy: Use a fiducial marker to ensure the volume is read from the same point on the piston."
        ],
        hint: "If you push the plunger too fast, the gas heats up and Boyle's Law no longer applies. Slow movement is key!"
    },
    {
        id: 18,
        topic: "States of Matter",
        type: "activity",
        simType: "pressureKelvin",
        config: { 
            startTempC: 0, 
            maxTempC: 100, 
            initialP: 101,
            tableColumns: ["Temp / °C", "Temp / K", "Pressure / kPa", "P / T (Constant)"]
        },
        question: "Plan an experiment to investigate how the pressure of a gas changes with its temperature. (6 Marks)",
        markScheme: [
            "Apparatus: Sealed flask of air in a water bath, thermometer, and pressure gauge.",
            "Method: Heat the water bath slowly using a Bunsen burner or electric heater.",
            "Measurement: Record the pressure at 10-degree intervals from 0°C to 100°C.",
            "Variables: The volume of the flask must remain constant throughout.",
            "Processing: Convert all Celsius temperatures to Kelvin by adding 273.",
            "Analysis: Plot Pressure against Kelvin Temperature; the line should be straight and pass through the origin.",
            "Safety: Wear goggles to protect against pressure-related glass failure or hot water splashes."
        ],
        hint: "Crucial Step: You MUST convert to Kelvin. P is directly proportional to T ONLY if T is in Kelvin ($0 \\text{ K} = -273^\\circ\\text{C}$)."
    },
    {
        id: 19,
        topic: "Magnetism",
        type: "activity",
        simType: "electromagnetLab",
        config: { 
            minTurns: 0, 
            maxTurns: 60, 
            stepTurns: 10,
            currentRange: [0, 5],
            tableColumns: ["Number of Turns (N)", "Current (I) / A", "Paperclips Lifted"]
        },
        question: "Design an investigation to see how the number of turns on a coil affects the strength of an electromagnet. (6 Marks)",
        markScheme: [
            "Apparatus: Insulated wire, soft iron nail, variable power supply, ammeter, and steel paperclips.",
            "Independent Variable: The number of turns of wire around the iron nail (e.g., 10, 20, 30, 40, 50).",
            "Dependent Variable: The strength of the electromagnet, measured by the number of paperclips it can pick up.",
            "Control Variables: Keep the current (measured by ammeter) and the core material (soft iron) the same.",
            "Method: Wrap the wire around the nail, connect to power, and count how many paperclips are lifted in a chain.",
            "Accuracy: Repeat each measurement 3 times and calculate a mean to identify anomalies.",
            "Safety: The wire can get hot if current is left on; turn off the power supply between readings."
        ],
        hint: "Examiner Tip: Always mention using a 'soft iron core'—it is easily magnetized and demagnetized, making it far superior to steel for an electromagnet."
    },
    {
        id: 20,
        topic: "Magnetism",
        type: "activity",
        simType: "motorForce",
        config: { 
            B: 0.8, // Magnetic Flux Density in Tesla
            L: 0.12, // Length of wire in field in Meters
            currentRange: [0, 5],
            tableColumns: ["Current (I) / A", "Length (L) / m", "Flux Density (B) / T", "Force (F) / mN"]
        },
        question: "Describe an experiment to investigate how the current affects the force on a wire in a magnetic field. (6 Marks)",
        markScheme: [
            "Apparatus: Horseshoe magnet, stiff wire, electronic balance (to measure force), ammeter, and variable power supply.",
            "Setup: Place the magnets on the balance and suspend the wire between the poles (perpendicular to field lines).",
            "Method: Vary the current in steps of 1.0A and record the change in mass reading on the balance.",
            "Calculation: Convert mass change to Force using F = mg or read directly in Newtons if using a force meter.",
            "Relationship: Show that Force is directly proportional to Current (F = BIL).",
            "Orientation: State that the wire must be at 90 degrees to the magnetic field for maximum force.",
            "Rule: Use Fleming's Left-Hand Rule to predict the direction of the force (Thumb = Force)."
        ],
        hint: "Physics Fact: If the wire is parallel to the magnetic field lines, the force is zero. The 'cutting' must be perpendicular!"
    },
    {
        id: 21,
        topic: "Magnetism",
        type: "activity",
        simType: "inductionLab",
        config: { 
            turns: [100, 200, 400],
            speeds: ["Slow", "Medium", "Fast"],
            tableColumns: ["Speed of Magnet", "Number of Turns", "Direction", "Induced Voltage / V"]
        },
        question: "Explain how a student can demonstrate the factors that affect the size of an induced voltage. (6 Marks)",
        markScheme: [
            "Apparatus: Sensitive center-zero voltmeter (galvanometer), coil of wire, and a strong bar magnet.",
            "Method: Move the magnet into the coil and observe the momentary deflection on the voltmeter.",
            "Factor 1: Move the magnet faster to increase the 'rate of cutting' of magnetic field lines.",
            "Factor 2: Use a coil with more turns of wire to increase the induced voltage.",
            "Factor 3: Use a stronger magnet to increase the density of field lines being cut.",
            "Direction: Reversing the magnet's pole or the direction of movement reverses the voltage direction.",
            "Terminology: You MUST use the phrase 'cutting magnetic field lines' to get full marks."
        ],
        hint: "Common Pitfall: Do not say 'it produces a current' immediately. A voltage (e.m.f) is INDUCED first; current only flows if the circuit is complete."
    },
    {
        id: 22,
        topic: "Magnetism",
        type: "activity",
        simType: "transformerSim",
        config: { 
            Vp_range: [2, 12],
            Np_options: [100, 200, 500],
            Ns_options: [100, 500, 1000],
            tableColumns: ["Vp / V", "Np", "Ns", "Vs / V", "Type"]
        },
        question: "Explain the operation of a step-up transformer and why it is used in the National Grid. (6 Marks)",
        markScheme: [
            "Input: An alternating current (AC) is supplied to the primary coil.",
            "Magnetic Field: This creates a constantly changing magnetic field in the soft iron core.",
            "Induction: The changing field is 'cut' by the secondary coil, inducing an alternating voltage.",
            "Step-up: A step-up transformer has more turns on the secondary coil than the primary (Ns > Np).",
            "National Grid: It increases voltage to decrease current for long-distance transmission.",
            "Efficiency: Lower current reduces heat loss in the cables (P = I^2 R), making transmission more efficient.",
            "Requirement: Transformers ONLY work with AC because a changing magnetic field is required."
        ],
        hint: "National Grid Logic: High Voltage = Low Current = Low Heat Loss. This is the foundation of energy efficiency!"
    },
    {
        id: 23,
        topic: "Radioactivity",
        type: "activity",
        simType: "radioactivityLab",
        question: "Compare the penetrating and ionizing powers of alpha, beta, and gamma radiation, and describe how they can be identified in a laboratory. (6 Marks)",
        markScheme: [
            "Alpha: Highly ionizing, low penetration (stopped by paper or a few cm of air).",
            "Beta: Moderately ionizing, moderate penetration (stopped by a few mm of aluminum).",
            "Gamma: Weakly ionizing, highly penetrating (reduced by thick lead or concrete).",
            "Identification: Place a GM tube near the source and measure the count rate.",
            "Test with absorbers: If count rate drops with paper, it's alpha; if with aluminum, it's beta; if only with lead, it's gamma.",
            "Safety: Use tongs, keep distance, and minimize exposure time during the experiment."
        ],
        hint: "Think about the 'bully' (Alpha) vs the 'ghost' (Gamma) analogy for ionization and penetration."
    },
    {
        id: 24,
        topic: "Radioactivity",
        type: "activity",
        simType: "halfLifeSim",
        question: "Explain how to determine the half-life of a radioactive isotope from a set of experimental data or a graph of activity against time. (6 Marks)",
        markScheme: [
            "Measure the initial activity (A0) of the sample at time t = 0.",
            "Measure the activity at regular time intervals using a GM tube and counter.",
            "Subtract background radiation from each reading to get the corrected count rate.",
            "Plot a graph of corrected activity against time.",
            "Find the time taken for the activity to fall from A0 to A0/2.",
            "Repeat for other starting points (e.g., A0/2 to A0/4) and calculate an average half-life."
        ],
        hint: "Don't forget to subtract the background radiation first! It's a common mistake in exam questions."
    },
    {
        id: 25,
        topic: "Radioactivity",
        type: "activity",
        simType: "fissionSim",
        question: "Describe the process of nuclear fission in a U-235 nucleus and explain how a controlled chain reaction is maintained in a nuclear reactor. (6 Marks)",
        markScheme: [
            "A slow-moving (thermal) neutron is absorbed by a Uranium-235 nucleus.",
            "The nucleus becomes unstable and splits into two smaller daughter nuclei.",
            "Two or three neutrons are released along with a large amount of kinetic energy.",
            "Moderator (e.g., graphite): Slows down released neutrons so they can cause further fissions.",
            "Control Rods (e.g., boron): Absorb excess neutrons to ensure only one neutron from each fission causes another.",
            "Shielding (e.g., concrete): Prevents dangerous radiation from escaping the reactor vessel."
        ],
        hint: "Fission is 'splitting'. Remember: Moderator = Speed control, Control Rods = Population control."
    },
    {
        id: 26,
        topic: "Radioactivity",
        type: "activity",
        simType: "smokeDetectorSim",
        question: "Explain how an alpha source is used in a smoke detector and why it does not pose a risk to people in the house. (6 Marks)",
        markScheme: [
            "The alpha source ionizes air particles inside a small chamber, allowing a current to flow.",
            "If smoke enters the chamber, the smoke particles absorb the alpha radiation.",
            "This reduces the ionization of the air and causes the current to drop.",
            "The drop in current is detected by an electronic circuit, which triggers the alarm.",
            "Safety: Alpha particles have a very short range in air (a few cm) and cannot penetrate the plastic casing.",
            "Safety: Even if it escaped the casing, alpha cannot penetrate the dead layer of human skin."
        ],
        hint: "Alpha is the perfect 'sensor' because it's so easily blocked by smoke particles."
    },
    {
        id: 27,
        topic: "Astrophysics",
        type: "activity",
        simType: "stellarEvolution",
        config: { 
            stages: ["Nebula", "Protostar", "Main Sequence", "Red Giant", "White Dwarf"],
            tableColumns: ["Stage", "Physical Process", "Internal Pressure State"]
        },
        question: "Describe the evolution of a star with a mass similar to the Sun, from its formation to its end. (6 Marks)",
        markScheme: [
            "Nebula: A cloud of dust and gas is pulled together by gravitational attraction.",
            "Protostar: As the cloud collapses, it becomes denser and hotter until fusion begins.",
            "Main Sequence: The star is stable because inward gravity is balanced by outward radiation pressure from fusion.",
            "Red Giant: Hydrogen in the core runs out; the core contracts while the outer layers expand and cool.",
            "White Dwarf: Fusion stops; the star sheds its outer layers as a planetary nebula.",
            "Final State: A dense, hot core remains which eventually cools down."
        ],
        hint: "Stability is a balance! Remember: Gravity pulls IN, Fusion pushes OUT."
    },
    {
        id: 28,
        topic: "Astrophysics",
        type: "activity",
        simType: "orbitalLab",
        config: { 
            bodies: [
                { name: "Mercury", r: 58, T: 88, type: "circular" },
                { name: "Earth", r: 150, T: 365, type: "circular" },
                { name: "Comet", r: 300, T: 2000, type: "elliptical" }
            ],
            tableColumns: ["Body", "Radius / 10^6 km", "Time Period / days", "Orbital Speed / km/s"]
        },
        question: "Explain why a comet's speed changes as it orbits the Sun. (6 Marks)",
        markScheme: [
            "Orbit Shape: Comets have highly elliptical (oval) orbits with the Sun near one end.",
            "Gravitational Pull: The Sun's gravitational field strength is much stronger when the comet is closer.",
            "Acceleration: This stronger force causes the comet to accelerate as it approaches the Sun.",
            "Energy Transfer: Gravitational Potential Energy (GPE) is transferred into Kinetic Energy (KE).",
            "Velocity: Speed is maximum at the closest point (perihelion) and minimum at the furthest point.",
            "Conservation: The total energy remains constant, but the speed must vary to maintain the orbit."
        ],
        hint: "Use the formula v = (2 * pi * r) / T for circular orbits, but remember speed varies for ellipses!"
    },
    {
        id: 29,
        topic: "Astrophysics",
        type: "activity",
        simType: "hrDiagram",
        question: "Describe how an H-R diagram is used to classify stars and explain the significance of the Main Sequence. (6 Marks)",
        markScheme: [
            "Classification: Stars are plotted based on their surface temperature (x-axis) and absolute magnitude/luminosity (y-axis).",
            "Temperature Scale: Note that the temperature scale is inverted, with hotter stars on the left.",
            "Main Sequence: Most stars (including the Sun) fall along a diagonal band where they fuse hydrogen into helium.",
            "Red Giants: Located at the top right; they are cool but very large and luminous.",
            "White Dwarfs: Located at the bottom left; they are very hot but small and dim.",
            "Significance: The position of a star on the H-R diagram reveals its stage in the stellar life cycle."
        ],
        hint: "Remember that 'Absolute Magnitude' is a measure of a star's true brightness, regardless of its distance from Earth."
    },
    {
        id: 30,
        topic: "Astrophysics",
        type: "activity",
        simType: "redshiftSim",
        config: { 
            galaxies: [
                { name: "Nearby Galaxy", distance: 10, velocity: 700 },
                { name: "Distant Galaxy", distance: 100, velocity: 7000 },
                { name: "Very Distant Galaxy", distance: 500, velocity: 35000 }
            ],
            tableColumns: ["Galaxy", "Distance / Mpc", "Recessional Velocity / km/s", "Red-shift (z)"]
        },
        question: "Explain how red-shift provides evidence for the Big Bang theory. (6 Marks)",
        markScheme: [
            "Observation: Light from distant galaxies is shifted towards the red end of the spectrum.",
            "Doppler Effect: This indicates that galaxies are moving away from us (receding).",
            "Hubble's Law: More distant galaxies have a greater red-shift, meaning they are moving faster.",
            "Expansion: This suggests that the entire universe is expanding in all directions.",
            "Extrapolation: If we go back in time, all matter must have started from a single, tiny point.",
            "Big Bang: This supports the idea that the universe began with a massive explosion from a singularity."
        ],
        hint: "Think about a balloon being inflated—every point moves away from every other point."
    }
];
