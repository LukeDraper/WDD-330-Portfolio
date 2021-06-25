const nextBtn = document.getElementById('next'),
      previousBtn = document.getElementById('previous'),
      content = document.getElementById('content');

let pageNumber = 1,
    apiUrl = "https://swapi.dev/api/people",
    prevUrl,
    nextUrl,
    currentUrl;

function fetchPeople(url) {
  fetch(url).then(response => response.json()).then(data => {
    console.log(data);
    prevUrl = data.previous;
    nextUrl = data.next;
    currentUrl = url;
    renderPersonList(data.results);
    nextBtn.style.display = "block";
    previousBtn.style.display = "block";
    
  });
}

function renderPersonList(resultsArray) {
  content.innerHTML = "";
  resultsArray.forEach(element => {
    const li = document.createElement('li');
    const h2 = document.createElement('h2');
    const p = document.createElement('p');
    h2.textContent = element.name;
    p.textContent = element.gender;
    li.appendChild(h2);
    li.appendChild(p);

    li.addEventListener('click', () => {
      fetchPerson(element.url);
    });

    content.appendChild(li);
  });
}

function fetchPerson(url) {
  fetch(url).then(response => response.json()).then(data => {
    console.log(data);
    renderOnePerson(data);
    
  });

}

function renderOnePerson(results) {
  content.innerHTML = "";
  const element = `
    <h2>${results.name}</h2>
    <table>
      <tr>
        <td>Name:</td>
        <td>${results.name}</td>
      </tr>
      <tr>
        <td>Gender:</td>
        <td>${results.gender}</td>
      </tr>
      <tr>
        <td>Height:</td>
        <td>${results.height}</td>
      </tr>
      <tr>
        <td>Mass:</td>
        <td>${results.mass}</td>
      </tr>
      <tr>
        <td>Hair Color:</td>
        <td>${results.hair_color}</td>
      </tr>
      <tr>
        <td>Skin Color:</td>
        <td>${results.skin_color}</td>
      </tr>
      <tr>
        <td>Eye Color:</td>
        <td>${results.eye_color}</td>
      </tr>
      <tr>
        <td>Birth Year:</td>
        <td>${results.birth_year}</td>
      </tr>
    </table>
  `;
  content.innerHTML = element;
  const button = document.createElement('button');
  button.textContent = "Go Back";

  button.addEventListener('click', () => {
    fetchPeople(currentUrl);
  });

  content.appendChild(button);
  nextBtn.style.display = "none";
  previousBtn.style.display = "none";
  
}

fetchPeople(apiUrl);

nextBtn.addEventListener('click', () => {
  console.log(nextUrl);
  if (!nextUrl) {
    return;
  }
  fetchPeople(nextUrl);
});

previousBtn.addEventListener('click', () => {
  console.log(prevUrl);
  if (!prevUrl) {
    return;
  }
  fetchPeople(prevUrl);
});