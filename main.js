const courseDiv = document.getElementById('all-course');
const addCourseButton = document.getElementById('add-course');
const actionLetterDiv = document.getElementById('action-letter');

/// Array to save course in memory
let courses = [];

/// Load saved s from local storage to memory
const jsonString = localStorage.getItem('courses');
if (jsonString) {
	courses = JSON.parse(jsonString);
}

/// Update UI to reflect the actual data
updateHtmlUi();

/// Listen for clicking the add button to add new course
addCourseButton.addEventListener('click', (event) => {

	/// Add to memory
	const newTaskInput = prompt('What do you want to add?');
	if (!newTaskInput) return;
	courses.push({
		input: newTaskInput,
		id: new Date(),
		isChecked: false,
	});

	
	/// Save to local storage
	saveToLocalStorage();
	/// Update UI
	updateHtmlUi();
});

function saveToLocalStorage() {
	const jsonString = JSON.stringify(courses);
	localStorage.setItem('courses', jsonString);
}

function updateHtmlUi() {
	courseDiv.replaceChildren([]);

	for (let i = 0; i < courses.length; i++) {
		const checkboxHtml = document.createElement('div');
		const course = courses[i];
		const newCourseHtml = document.createElement('div');
		if (course.isChecked) {
			newCourseHtml.className = 'box course checked';
			checkboxHtml.innerHTML = ' <span class=" material-symbols-outlined"> done_outline </span>';
		} else {
			newCourseHtml.className = 'box course';
		}

		checkboxHtml.className = 'check-box ';
		checkboxHtml.addEventListener('click', (event) => {
			courses[i].isChecked = !courses[i].isChecked;
			saveToLocalStorage();
			updateHtmlUi();
 return false; 
		});
		newCourseHtml.appendChild(checkboxHtml);

		const courseHtml = document.createElement('p');
		courseHtml.innerText = course.input;
		newCourseHtml.appendChild(courseHtml);

		newCourseHtml.addEventListener('dblclick', (event) => {
			event.preventDefault();
			if (didPressD) {
				const yes = confirm('are you sure?');
				if (!yes) {
					return;
				}
				courses = courses.filter((t, index) => index !== i);
				updateHtmlUi();
				saveToLocalStorage();
				didPressD = false;
				actionLetterDiv.innerText = 'P';
			} else {
				const value = prompt('What is the new value?');
				if (!value) {
					return;
				}
				courses[i].input = value;
				updateHtmlUi();
				saveToLocalStorage();
			}
			return false;

		});

		// newCourseHtml.addEventListener('');

		courseDiv.appendChild(newCourseHtml);
	}
}

let didPressD = false;
let didPressC = false;

window.addEventListener('keypress', (event) => {
	if (event.key === 'd') {
		didPressD = true;
		didPressC = false;
		actionLetterDiv.innerText = 'D';

	} else if (event.key === 'p') {
		didPressD = false;
		didPressC = false;
		actionLetterDiv.innerText = 'P';
	} else if (event.key === 'c') {
		didPressC = true;
		didPressD = false;
		actionLetterDiv.innerText = 'C';
	}
});
















