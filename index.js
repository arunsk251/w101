
const form = document.getElementById('registrationForm');
const entriesTable = document.getElementById('entriesTable');

function calculateAge(dob) {
  const birthDate = new Date(dob);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
}

function loadEntries() {
  const entries = JSON.parse(localStorage.getItem('entries') || '[]');
  entriesTable.innerHTML = '';
  entries.forEach(entry => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${entry.name}</td>
      <td>${entry.email}</td>
      <td>${entry.password}</td>
      <td>${entry.dob}</td>
      <td>${entry.termsAccepted}</td>
    `;
    entriesTable.appendChild(row);
  });
}

window.onload = function () {
  const dobInput = document.getElementById('dob');
  const today = new Date();
  const yyyy = today.getFullYear();

  const maxDate = new Date(yyyy - 18, today.getMonth(), today.getDate());
  const minDate = new Date(yyyy - 55, today.getMonth(), today.getDate());

  dobInput.max = maxDate.toISOString().split('T')[0];
  dobInput.min = minDate.toISOString().split('T')[0];

  loadEntries();
};

form.addEventListener('submit', function (e) {
  e.preventDefault();

  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value;
  const dob = document.getElementById('dob').value;
  const termsAccepted = document.getElementById('terms').checked;

  const age = calculateAge(dob);
  if (!dob || age < 18 || age > 55) {
    alert('You must be between 18 and 55 years old to register.');
    return;
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    alert('Please enter a valid email address.');
    return;
  }

  const entry = {
    name,
    email,
    password,
    dob,
    termsAccepted
  };

  const entries = JSON.parse(localStorage.getItem('entries') || '[]');
  entries.push(entry);
  localStorage.setItem('entries', JSON.stringify(entries));

  loadEntries();
  form.reset();
});

