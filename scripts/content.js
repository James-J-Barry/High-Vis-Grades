// content.js

// Function to parse HTML and extract assignment names and grades
function extractAssignmentsAndGrades(assignments) {

    // Assuming the assignments and grades are in <tr> elements
    // gets all the rows in the table with the assignments
    const rows = document.querySelectorAll('tr');

    // Iterate over each row and extract the assignment name and grade
    rows.forEach(row => {
        
        // Extract the assignment name and grade
        const assignmentName = row.querySelector('a')?.textContent.trim();
        const gradeText = row.querySelector('div.submissionStatus--score')?.textContent.trim();
        const type = row.querySelector('select')?.selectedOptions[0]?.value;
        
        // If the assignment name and grade are found, add them to the assignments map
        if (gradeText && type) {

            // Extract the numeric grades from the text and calculate the percentage
            const [numerator, denominator] = gradeText.split(' / ').map(parseFloat);
            const percentage = (numerator / denominator) * 100;

            // Add the assignment to the map
            assignments.get(type).push({ name: assignmentName, grade: percentage });
        }
    });
    
    return assignments;
}

// Function to calculate the course grade
function calculateCourseGrade(assignments, assignmentTypes) {

    let total = 0;
    let totalWeight = 0;

    // Iterate over each assignment type and calculate the weighted average
    assignments.forEach((assigs, type) => {

        // Calculate the average grade for each assignment type
        if (assigs.length !== 0) {
        
            const subTotal = assigs.reduce((acc, assignment) => acc + assignment.grade, 0);
            const average = subTotal / assigs.length;
            const weight = assignmentTypes.get(type) / 100;

            totalWeight += weight;
            total += average * weight;
        }
      });

      // Calculate the total course grade
      return totalWeight > 0 ? total / totalWeight : 0;
}


// Main function 
function main() {
    
    // Get all the rows in the table with the assignments
    const rows = document.querySelectorAll('tr'); 

    // Create a map to store the assignments and their grades
    var assignments = new Map();

    // Create a map to store the assignment types and their weights
    var assignmentTypes = new Map();

    // Add a dropdown menu for each assignment to select its type
    rows.forEach(row => {

        const typeSelector = document.createElement('select');
        const assig = row.querySelector("a");
        const gradeText = row.querySelector('div.submissionStatus--score');

        if (assig && gradeText) {

            // Create a default option for the typeSelector
            const option = document.createElement('option');
            option.value = "Select Assignment Type";
            option.textContent = "Select Assignment Type";
            assignmentTypes.set("Select Assignment Type", 0);
            assignments.set("Select Assignment Type", []);
            typeSelector.appendChild(option);

            // Style the typeSelector
            Object.assign(typeSelector.style, {
                display: 'block',
                marginTop: '8px',
                marginBottom: '8px',
                width: '175px',
                padding: '5px',
                border: '1px solid #ccc',
                borderRadius: '5px',
                flexShrink: '0'
            });

            // Insert the typeSelector below the assignment name
            assig.insertAdjacentElement("afterend", typeSelector);
        }
    });

    


    // Create a button to add new assignment types
    const newTypeButton = document.createElement('button');

    // Style the newTypeButton
    Object.assign(newTypeButton.style, {
        display: 'block',
        marginLeft: '8px',
        marginRight: '8px',
        backgroundColor: '#007bff',
        color: '#191919',
        border: 'none',
        padding: '5px',
        borderRadius: '5px',
        cursor: 'pointer',
    });

    // Set the text content
    newTypeButton.textContent = 'Add';
    
    // Whne the button is clicked, add a new assignment type 
    newTypeButton.addEventListener('click', () => {

        // Extract the input values
        const assignmentTypeName = assignmentTypeInput.value.trim();
        const percentage = parseFloat(assignmentPercentageInput.value);

        // Clear the input boxes
        assignmentTypeInput.value = '';
        assignmentPercentageInput.value = '';

        // Check if the input is valid - percentage should be a number between 0 and 100
        if (assignmentTypeName && !isNaN(percentage) && percentage > 0 && percentage <= 100) {

            // Add the new assignment type to the maps
            assignmentTypes.set(assignmentTypeName, percentage);
            assignments.set(assignmentTypeName, []);

            // Update the assignment types display
            updateAssignmentTypesDisplay();

            // Add the new assignment type to the dropdown menus
            rows.forEach(row => {
                
                // Get the typeSelector and assignment name
                const assignmentName = row.querySelector('a')?.textContent.trim();
                const typeSelector = row.querySelector('select');
                if (typeSelector) {

                    // Create a new option for the dropdown menu
                    const option = document.createElement('option');
                    option.value = assignmentTypeName;
                    option.textContent = assignmentTypeName;
                    typeSelector.appendChild(option);

                    // Set the default value of the dropdown menu to the assignment type if the assignment name contains the type
                    if (assignmentName.toLowerCase().includes(assignmentTypeName.toLowerCase())) {
                        typeSelector.value = assignmentTypeName;
                    }
                }
            });

        } else {
            alert('Invalid input. Please try again.');
        }
    });

    

    // Create a button to calculate the course grade
    const calculateButton = document.createElement('button');

    // Set the text content
    calculateButton.textContent = 'Calculate Course Grade';

    // Style the calculateButton
    Object.assign(calculateButton.style, {
        display: 'block',
        marginBottom: '8px',
        backgroundColor: '#007bff',
        color: '#191919',
        backgroundColor: '#cceaff',
        border: 'none',
        padding: '10px 20px',
        borderRadius: '5px',
        cursor: 'pointer'
    });

    // When the button is clicked, calculate the course grade
    calculateButton.addEventListener('click', () => {

        // Extract the assignments and grades
        assignments = extractAssignmentsAndGrades(assignments);

        // Calculate the course grade
        var courseGrade = calculateCourseGrade(assignments, assignmentTypes);

        // Update the grade display
        gradeDisplay.textContent = `Course Grade: ${courseGrade.toFixed(2)}%`;
    });

    // Create a display element for assignment types and their weights
    const assignmentTypesTable = document.createElement("table");

    // Style the assignmentTypesTable
    Object.assign(assignmentTypesTable.style, {
        width: '350px',
        borderCollapse: 'collapse',
        marginBottom: '10px',
        flexShrink: '0' // Prevent stretching
    });

    // Create table headers
    const headerRow = document.createElement('tr');
    const headerType = document.createElement('th');
    const headerWeight = document.createElement('th');

    // Set the text content
    headerType.textContent = 'Assignment Type';
    headerWeight.textContent = 'Weight (%)';

    // Create the style for the headers
    const headerCss = {
        border: '1px solid #ccc',
        padding: '8px',
        backgroundColor: '#f2f2f2'
    }

    // Apply the style to the headers
    Object.assign(headerType.style, headerCss);
    Object.assign(headerWeight.style, headerCss);

    // Append the headers to the header row
    headerRow.appendChild(headerType);
    headerRow.appendChild(headerWeight);

    // Append the header row to the table
    assignmentTypesTable.appendChild(headerRow);

    // Function to update the assignment types display
    function updateAssignmentTypesDisplay() {

        // Clear the table rows except for the header
        assignmentTypesTable.innerHTML = '';
        assignmentTypesTable.appendChild(headerRow);

        // Add a row for each assignment type
        assignmentTypes.forEach((weight, type) => {

            if (type !== "Select Assignment Type") {

                // Create a new row
                const row = document.createElement('tr');


                // Create cells for the assignment type and weight
                const typeCell = document.createElement('td');
                const weightCell = document.createElement('td');

                typeCell.textContent = type;
                weightCell.textContent = weight;

                // Style the cells
                const cellCss = {
                    border: '1px solid #ccc',
                    padding: '8px'
                };
                Object.assign(typeCell.style, cellCss);
                Object.assign(weightCell.style, cellCss);

                // Append the cells to the row
                row.appendChild(typeCell);
                row.appendChild(weightCell);

                // Append the row to the table
                assignmentTypesTable.appendChild(row);
            }
        });
    }

    // Create a container div for the inputs
    const inputContainer = document.createElement('div');
    Object.assign(inputContainer.style, {
        display: 'flex',
        alignItems: 'center',
        marginBottom: '10px',
        width: 'auto'
    });

    // Create a text node for the label
    const labelText1 = document.createTextNode('Add new assignment type: ');
    const labelText2 = document.createTextNode(' that makes up  ');
    const labelText3 = document.createTextNode(' of the total grade');

    // Create a text input for the assignment type
    const assignmentTypeInput = document.createElement('input');
    assignmentTypeInput.type = 'text';
    assignmentTypeInput.placeholder = 'Type name';

    // Create a text input for the percentage of total grade for an assignment type
    const assignmentPercentageInput = document.createElement('input');
    assignmentPercentageInput.type = 'number';
    assignmentPercentageInput.placeholder = 'Percentage';

    // Style the inputs
    const inputCss = {
        width: '120px',
        marginRight: '8px',
        marginLeft: '8px',
        padding: '5px',
        border: '1px solid #ccc',
        borderRadius: '5px',
        flexShrink: '0'};
    Object.assign(assignmentTypeInput.style, inputCss);
    Object.assign(assignmentPercentageInput.style, inputCss);

    // Append the text nodes and inputs to the container
    inputContainer.appendChild(labelText1);
    inputContainer.appendChild(assignmentTypeInput);
    inputContainer.appendChild(labelText2);
    inputContainer.appendChild(assignmentPercentageInput);
    inputContainer.appendChild(labelText3);
    inputContainer.appendChild(newTypeButton);
    
    // Initial update of the assignment types display
    updateAssignmentTypesDisplay();

    // Create a container div for the description/instruction panel
    const descPanel = document.createElement('div');

    // Create the other panel for the grade display, assignment types, and inputs
    const panel = document.createElement('div');
        
    // Style the panels
    const panelCss = {
        border: '1px solid #ccc',
        padding: '10px',
        marginTop: '10px',
        backgroundColor: '#f9f9f9',
        borderRadius: '5px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
    };
    Object.assign(descPanel.style, panelCss);
    Object.assign(panel.style, panelCss);

    // Create a heading element for the description panel
    const descHeading = document.createElement('h2');

    // Set the text content
    descHeading.textContent = 'High-Vis Grades for Gradescope (v0.0.0.1)';

    // Style the heading
    Object.assign(descHeading.style, {
        marginBottom: '10px',
        fontSize: '20px',
        color: '#333',
        textAlign: 'center'
    });

    // Create a subheading element for the description panel
    const subHeading = document.createElement('h3');

    // Set the text content
    subHeading.textContent = 'By James Barry';

    // Style the subheading
    Object.assign(subHeading.style, {
        marginBottom: '10px',
        fontSize: '18px',
        color: '#555',
        textAlign: 'center',
        fontStyle: 'italic'
    });

    const subHeading2 = document.createElement('h3');
    const subHeading3 = document.createElement('h3');

    // Set the text content
    subHeading2.textContent = 'Assigning weights to assignments:';
    subHeading3.textContent = 'Calculating your course grade:';

    // Style the subheadings
    const subHeadingCss = {
        marginBottom: '20px',
        fontSize: '18px',
        color: '#333',
        textAlign: 'left'
    };

    // Style the rest of the text
    const textCss = {
        marginTop: '15px',
        marginLeft: '30px',
        fontSize: '16px',
        color: '#333',
        textAlign: 'left'
    };

    // Create a text element for instructions
    const weightText = document.createElement('p');

    // Set the text content
    weightText.textContent = 'To assign weights to assignments, add a new assignment type and specify the percentage \
    of the total grade that it makes up. For example, if homework assignments make up 20% of the total grade, add "Homework" and "20" \
    in the input boxes and click "Add". You can add as many assignment types as you like. If the name of an assignemnt contains the \
    name of an assignment type that you add, the dropdown menu will automatically select it. After adding all of the assignment types for your course, \
    make sure that all of the currently graded assignments are assigned a type using their dropdown menus, otherwise they will not be included in the calculation.';

    // Create a text element for instructions
    const calculateText = document.createElement('p');

    // Set the text content
    calculateText.textContent = 'To calculate your course grade, click the "Calculate Course Grade" button. The course grade will be calculated based \
    on the weighted average of the grades for each assignment type. If two assignments are supposed to have different effects on the course grade, \
    they should assigned different assignment types. This is because the amount of points that each assignment is worth is not taken into account, \
    only the percentage. If two assignments have the same name, they will be treated as the one assignment.';

    // Style the instructions text
    Object.assign(weightText.style, textCss);
    Object.assign(calculateText.style, textCss);

    // Create a display element for the course grade
    const gradeDisplay = document.createElement("p");

    // Style the gradeDisplay
    Object.assign(gradeDisplay.style, {
        display: 'block',
        marginBottom: '10px',
        fontSize: '18px',
        fontWeight: 'bold',
        color: '#007bff',
        padding: '10px',
        border: '1px solid #ccc',
        borderRadius: '5px',
        backgroundColor: '#f9f9f9',
        textAlign: 'center'
    });

    // Set the initial text content
    gradeDisplay.textContent = "Course Grade: 0%";
    
    // Append the elements to the description panel
    descPanel.appendChild(descHeading);
    descPanel.appendChild(subHeading);
    descPanel.appendChild(subHeading2);
    descPanel.appendChild(weightText);
    descPanel.appendChild(subHeading3);
    descPanel.appendChild(calculateText);


    // Append the elements to the panel
    panel.appendChild(gradeDisplay);
    panel.appendChild(assignmentTypesTable);
    panel.appendChild(inputContainer);
    panel.appendChild(calculateButton);
    
    // Insert the panel after the heading
    const heading = document.querySelector("div.courseHeader--courseID");
    heading.insertAdjacentElement("afterend", panel);
    heading.insertAdjacentElement("afterend", descPanel);
} 

// Run the main function
main();