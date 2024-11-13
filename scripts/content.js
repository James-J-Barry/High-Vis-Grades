// content.js

// Function to parse HTML and extract assignment names and grades
function extractAssignmentsAndGrades(assignments) {
    // Assuming the assignments and grades are in <tr> elements
    const rows = document.querySelectorAll('tr');

    rows.forEach(row => {
        const gradeText = row.querySelector('div.submissionStatus--score')?.textContent.trim();
        const type = row.querySelector('select')?.selectedOptions[0]?.value;
        
        if (gradeText && type) {
            // Extract the numeric grades from the text
            const [numerator, denominator] = gradeText.split(' / ').map(parseFloat);
            const percentage = (numerator / denominator) * 100;
            assignments.get(type).push({ grade: percentage });
        }
    });
    // Log assignments to the console
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
            (assig).insertAdjacentElement("afterend", typeSelector);
        }
    });

    
    const gradeDisplay = document.createElement("p");
    // Use the same styling as the publish information in an article's header
    gradeDisplay.classList.add("color-secondary-text", "type--caption");
    gradeDisplay.textContent = "Course Grade: 0%";


    const newTypeButton = document.createElement('button');
    newTypeButton.textContent = 'Add New Assignment Type';

    newTypeButton.addEventListener('click', () => {
        const assignmentTypeName = prompt('Type name:');
        const percentage = parseFloat(prompt('Enter percent of grade:'));

        if (assignmentTypeName && !isNaN(percentage)) {

            console.log(`New assignment type: ${assignmentTypeName}, Percentage: ${percentage}`);
            assignmentTypes.set(assignmentTypeName, percentage);
            assignments.set(assignmentTypeName, []);

            rows.forEach(row => {
                const typeSelector = row.querySelector('select');
                if (typeSelector) {
                    const option = document.createElement('option');
                    option.value = assignmentTypeName;
                    option.textContent = assignmentTypeName;
                    typeSelector.appendChild(option);
                }
            });

        } else {
            alert('Invalid input. Please try again.');
        }
    });

    

    const calculateButton = document.createElement('button');
    calculateButton.textContent = 'Calculate Course Grade';
    calculateButton.addEventListener('click', () => {

        assignments = extractAssignmentsAndGrades(assignments);

        var courseGrade = calculateCourseGrade(assignments, assignmentTypes);

        gradeDisplay.textContent = `Course Grade: ${courseGrade.toFixed(2)}%`;
    });

    const heading = document.querySelector("div.courseHeader--courseID");
    // Append the dropdown menu to the document body or a specific element

    

    // Support for API reference docs
    

    (heading).insertAdjacentElement("afterend", gradeDisplay);

    (heading).insertAdjacentElement("afterend", newTypeButton);

    (heading).insertAdjacentElement("afterend", calculateButton);
} 

// Run the main function
main();