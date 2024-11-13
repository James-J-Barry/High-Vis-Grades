// content.js

// Function to parse HTML and extract assignment names and grades
function extractAssignmentsAndGrades() {
    // Assuming the assignments and grades are in <tr> elements
    const rows = document.querySelectorAll('tr');
    var assignments = [];

    rows.forEach(row => {
        const assignmentName = row.querySelector('a')?.textContent.trim();
        const gradeText = row.querySelector('div.submissionStatus--score')?.textContent.trim();
        
        if (assignmentName && gradeText) {
            // Extract the numeric grades from the text
            const [numerator, denominator] = gradeText.split(' / ').map(parseFloat);
            const percentage = (numerator / denominator) * 100;
            assignments.push({ name: assignmentName, grade: percentage });
        }
    });
    // Log assignments to the console
    console.log(assignments);
    return assignments;
}

// Function to calculate the course grade
function calculateCourseGrade(assignments) {
    if (assignments.length === 0) return 0;
    const total = assignments.reduce((sum, assignment) => sum + assignment.grade, 0);
    return total / assignments.length;
}

function updatePopup(assignments, courseGrade) {
    const assignmentsDiv = document.getElementById('assignments');
    const courseGradeDiv = document.getElementById('course-grade');

    // Clear previous content
    assignmentsDiv.innerHTML = '';
    courseGradeDiv.innerHTML = '';

    // Display assignments
    assignments.forEach(assignment => {
        const assignmentElement = document.createElement('div');
        assignmentElement.textContent = `${assignment.name}: ${assignment.grade.toFixed(2)}%`;
        assignmentsDiv.appendChild(assignmentElement);
    });

    // Display course grade
    courseGradeDiv.textContent = `Course Grade: ${courseGrade.toFixed(2)}%`;
}

// Main function to extract and calculate grades
function main() {

    const rows = document.querySelectorAll('tr'); 

    var assignmentTypes = [];

    rows.forEach(row => {
        const typeSelector = document.createElement('select');
        const assig = row.querySelector("a");
        if (assig) {
            const option = document.createElement('option');
            option.value = 0;
            option.textContent = "Select Assignment Type";
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
            assignmentTypes.push({ Type: assignmentTypeName, gradePercentage: percentage });
            rows.forEach(row => {
                const typeSelector = row.querySelector('select');
                if (typeSelector) {
                    const option = document.createElement('option');
                    option.value = percentage;
                     option.textContent = assignmentTypeName;
                    typeSelector.appendChild(option);
                    console.log(option.textContent);
                }
            });
        } else {

            alert('Invalid input. Please try again.');
        }
    });

    

    const calculateButton = document.createElement('button');
    calculateButton.textContent = 'Calculate Course Grade';
    calculateButton.addEventListener('click', () => {
        var assignments = extractAssignmentsAndGrades();
        var courseGrade = calculateCourseGrade(assignments);
        gradeDisplay.textContent = `Course Grade: ${courseGrade.toFixed(2)}%`;
    });

    const heading = document.querySelector("div.courseHeader--courseID");
    // Append the dropdown menu to the document body or a specific element

    

    // Support for API reference docs
    

    (heading).insertAdjacentElement("afterend", gradeDisplay);

    (heading).insertAdjacentElement("afterend", newTypeButton);
} 

// Run the main function
main();