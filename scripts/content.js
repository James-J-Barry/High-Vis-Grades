// content.js

// Function to parse HTML and extract assignment names and grades
function extractAssignmentsAndGrades(assignments) {
    // Assuming the assignments and grades are in <tr> elements
    const rows = document.querySelectorAll('tr');

    rows.forEach(row => {
        const assignmentName = row.querySelector('a')?.textContent.trim();
        const gradeText = row.querySelector('div.submissionStatus--score')?.textContent.trim();
        const type = row.querySelector('select')?.selectedOptions[0]?.value;
        
        if (gradeText && type) {
            // Extract the numeric grades from the text
            const [numerator, denominator] = gradeText.split(' / ').map(parseFloat);
            const percentage = (numerator / denominator) * 100;
            assignments.get(type).push({ name: assignmentName, grade: percentage });
        }
    });
    
    return assignments;
}

// Function to calculate the course grade
function calculateCourseGrade(assignments, assignmentTypes) {
    let total = 0;
    let totalWeight = 0;

    assignments.forEach((assigs, type) => {
        if (assigs.length !== 0) {
            const subTotal = assigs.reduce((acc, assignment) => acc + assignment.grade, 0);
            const average = subTotal / assigs.length;
            const weight = assignmentTypes.get(type) / 100;
            
            console.log(assignmentTypes);
            console.log(`Type: ${type}, Average: ${average}, Weight: ${weight}, percentage: ${assignmentTypes.get(type)}`);

            totalWeight += weight;
            total += average * weight;
            console.log(`Total: ${total}`);
        }
      });

      console.log(`Total: ${total}, Total Weight: ${totalWeight}`);
      return totalWeight > 0 ? total / totalWeight : 0;
}


// Main function to extract and calculate grades
function main() {

    const rows = document.querySelectorAll('tr'); 

    var assignments = new Map();

    var assignmentTypes = new Map();

    // Add a dropdown menu for each assignment to select its type
    rows.forEach(row => {
        const typeSelector = document.createElement('select');
        const assig = row.querySelector("a");
        if (assig) {
            const option = document.createElement('option');
            option.value = "Select Assignment Type";
            option.textContent = "Select Assignment Type";

            assignmentTypes.set("Select Assignment Type", 0);
            assignments.set("Select Assignment Type", []);

            typeSelector.appendChild(option);

            // Style the typeSelector
            typeSelector.style.display = 'block';
            typeSelector.style.marginTop = '8px';
            typeSelector.style.marginBottom = '8px';
            typeSelector.style.width = '175px';
            typeSelector.style.padding = '5px';
            typeSelector.style.border = '1px solid #ccc';
            typeSelector.style.borderRadius = '5px';
            typeSelector.style.flexShrink = '0';

            // Insert the typeSelector below the assignment name
            assig.insertAdjacentElement("afterend", typeSelector);
        }
    });

    
    // Create a display element for the course grade
    const gradeDisplay = document.createElement("p");
    gradeDisplay.textContent = "Course Grade: 0%";


    // Create a button to add new assignment types
    const newTypeButton = document.createElement('button');
    newTypeButton.textContent = 'Add';
    newTypeButton.style.display = 'block';
    newTypeButton.style.marginLeft = '8px';
    newTypeButton.style.marginRight = '8px';
    newTypeButton.style.backgroundColor = '#007bff';
    newTypeButton.style.color = '#191919';
    newTypeButton.style.backgroundColor = '#cceaff';
    newTypeButton.style.border = 'none';
    newTypeButton.style.padding = '5px';
    newTypeButton.style.borderRadius = '5px';
    newTypeButton.style.cursor = 'pointer';

    newTypeButton.addEventListener('click', () => {
        const assignmentTypeName = assignmentTypeInput.value.trim();
        const percentage = parseFloat(assignmentPercentageInput.value);
        assignmentTypeInput.value = '';
        assignmentPercentageInput.value = '';

        if (assignmentTypeName && !isNaN(percentage)) {

            console.log(`New assignment type: ${assignmentTypeName}, Percentage: ${percentage}`);
            assignmentTypes.set(assignmentTypeName, percentage);
            assignments.set(assignmentTypeName, []);

            updateAssignmentTypesDisplay();

            rows.forEach(row => {
                const assignmentName = row.querySelector('a')?.textContent.trim();
                const typeSelector = row.querySelector('select');
                if (typeSelector) {
                    const option = document.createElement('option');
                    option.value = assignmentTypeName;
                    option.textContent = assignmentTypeName;
                    typeSelector.appendChild(option);

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
    calculateButton.textContent = 'Calculate Course Grade';
    calculateButton.style.display = 'block';
    calculateButton.style.marginBottom = '8px';
    calculateButton.style.backgroundColor = '#007bff';
    calculateButton.style.color = '#191919';
    calculateButton.style.backgroundColor = '#cceaff';
    calculateButton.style.border = 'none';
    calculateButton.style.padding = '10px 20px';
    calculateButton.style.borderRadius = '5px';
    calculateButton.style.cursor = 'pointer';
    calculateButton.addEventListener('click', () => {

        assignments = extractAssignmentsAndGrades(assignments);

        var courseGrade = calculateCourseGrade(assignments, assignmentTypes);

        gradeDisplay.textContent = `Course Grade: ${courseGrade.toFixed(2)}%`;
    });

    // Create a display element for assignment types and their weights
    const assignmentTypesTable = document.createElement("table");
    assignmentTypesTable.style.width = '350px';
    assignmentTypesTable.style.borderCollapse = 'collapse';
    assignmentTypesTable.style.marginBottom = '10px';
    assignmentTypesTable.style.flexShrink = '0'; // Prevent stretching

    // Create table headers
    const headerRow = document.createElement('tr');
    const headerType = document.createElement('th');
    headerType.textContent = 'Assignment Type';
    headerType.style.border = '1px solid #ccc';
    headerType.style.padding = '8px';
    headerType.style.backgroundColor = '#f2f2f2';

    const headerWeight = document.createElement('th');
    headerWeight.textContent = 'Weight (%)';
    headerWeight.style.border = '1px solid #ccc';
    headerWeight.style.padding = '8px';
    headerWeight.style.backgroundColor = '#f2f2f2';

    headerRow.appendChild(headerType);
    headerRow.appendChild(headerWeight);
    assignmentTypesTable.appendChild(headerRow);

    // Function to update the assignment types display
    function updateAssignmentTypesDisplay() {
        // Clear the table rows except for the header
        assignmentTypesTable.innerHTML = '';
        assignmentTypesTable.appendChild(headerRow);

        assignmentTypes.forEach((weight, type) => {
            if (type !== "Select Assignment Type") {
                const row = document.createElement('tr');

                const typeCell = document.createElement('td');
                typeCell.textContent = type;
                typeCell.style.border = '1px solid #ccc';
                typeCell.style.padding = '8px';

                const weightCell = document.createElement('td');
                weightCell.textContent = weight;
                weightCell.style.border = '1px solid #ccc';
                weightCell.style.padding = '8px';

                row.appendChild(typeCell);
                row.appendChild(weightCell);
                assignmentTypesTable.appendChild(row);
            }
        });
    }

    // Create a container div for the inputs
    const inputContainer = document.createElement('div');
    inputContainer.style.display = 'flex';
    inputContainer.style.alignItems = 'center';
    inputContainer.style.marginBottom = '10px';
    inputContainer.style.width = 'auto'; // Set a fixed width for the container

    // Create a text node for the label
    const labelText1 = document.createTextNode('Add new assignment type: ');
    const labelText2 = document.createTextNode(' that makes up  ');
    const labelText3 = document.createTextNode(' of the total grade');

    // Create a text input for the assignment type
    const assignmentTypeInput = document.createElement('input');
    assignmentTypeInput.type = 'text';
    assignmentTypeInput.placeholder = 'Type name';
    assignmentTypeInput.style.width = '120px'; // Set a specific width
    assignmentTypeInput.style.marginRight = '8px';
    assignmentTypeInput.style.marginLeft = '8px';
    assignmentTypeInput.style.padding = '5px';
    assignmentTypeInput.style.border = '1px solid #ccc';
    assignmentTypeInput.style.borderRadius = '5px';
    assignmentTypeInput.style.flexShrink = '0'; // Prevent stretching

    // Create a text input for the percentage of total grade for an assignment type
    const assignmentPercentageInput = document.createElement('input');
    assignmentPercentageInput.type = 'number';
    assignmentPercentageInput.placeholder = 'Percentage';
    assignmentPercentageInput.style.width = '100px';
    assignmentPercentageInput.style.marginRight = '8px';
    assignmentPercentageInput.style.marginLeft = '8px';
    assignmentPercentageInput.style.padding = '5px';
    assignmentPercentageInput.style.border = '1px solid #ccc';
    assignmentPercentageInput.style.borderRadius = '5px';
    assignmentPercentageInput.style.flexShrink = '0'; // Prevent stretching

    // Append the text nodes and inputs to the container
    inputContainer.appendChild(labelText1);
    inputContainer.appendChild(assignmentTypeInput);
    inputContainer.appendChild(labelText2);
    inputContainer.appendChild(assignmentPercentageInput);
    inputContainer.appendChild(labelText3);
    inputContainer.appendChild(newTypeButton);
    

    // Initial update of the assignment types display
    updateAssignmentTypesDisplay();

    // Create a container div for the panel
    const panel = document.createElement('div');
    panel.style.border = '1px solid #ccc';
    panel.style.padding = '10px';
    panel.style.marginTop = '10px';
    panel.style.backgroundColor = '#f9f9f9';
    panel.style.borderRadius = '5px';
    panel.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.1)';

    gradeDisplay.style.display = 'block';
    gradeDisplay.style.marginBottom = '10px';

    newTypeButton.style.display = 'block';
    newTypeButton.style.marginBottom = '10px';

    calculateButton.style.display = 'block';
    calculateButton.style.marginBottom = '10px';

    // Append the elements to the panel
    panel.appendChild(gradeDisplay);
    panel.appendChild(assignmentTypesTable);
    panel.appendChild(inputContainer);
    panel.appendChild(calculateButton);
    

    // Insert the panel after the heading
    const heading = document.querySelector("div.courseHeader--courseID");
    heading.insertAdjacentElement("afterend", panel);
} 

// Run the main function
main();