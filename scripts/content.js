// content.js

// Function to parse HTML and extract assignment names and grades
function extractAssignmentsAndGrades() {
    // Assuming the assignments and grades are in <tr> elements
    const rows = document.querySelectorAll('tr');
    const assignments = [];

    rows.forEach(row => {
        const assignmentName = row.querySelector('a')?.textContent.trim();
        const grade = row.querySelector('div.submissionStatus--score')?.textContent.trim();

        if (assignmentName && grade) {
            assignments.push({ name: assignmentName, grade: parseFloat(grade) });
        }
    });

    return assignments;
}

// Function to calculate the course grade
function calculateCourseGrade(assignments) {
    if (assignments.length === 0) return 0;
    const total = assignments.reduce((sum, assignment) => sum + assignment.grade, 0);
    return total / assignments.length;
}

// Main function to extract and calculate grades
function main() {
    const assignments = extractAssignmentsAndGrades();
    const courseGrade = calculateCourseGrade(assignments);
    console.log('Assignments:', assignments);
    console.log('Course Grade:', courseGrade);
}

// Run the main function
main();