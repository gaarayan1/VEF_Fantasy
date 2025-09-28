async function loadPage(page) {
  const app = document.getElementById('app');

  if (page === 'home') {
    app.innerHTML = '<h2>Bienvenue sur le Wiki des Valorant Europe Federation</h2><p>Retrouvez ici les 12 équipes, différents splits et palmarès.</p>';
  } 
  else if (page === 'teams') {
    const res = await fetch('data/teams.json');
    const teams = await res.json();
    app.innerHTML = '<h2>Équipes</h2>' + 
      teams.map(t => `
        <div class='card'>
          <h3>${t.name}</h3>
          <p>Pays : ${t.country}</p>
        </div>
      `).join('');
  } 
  else if (page === 'events') {
    const res = await fetch('data/events.json');
    const events = await res.json();
    app.innerHTML = '<h2>Compétitions</h2>' + 
      events.map(e => `
        <div class='card'>
          <h3><a href="#" onclick="loadEventDetail('${e.id}')">${e.name}</a></h3>
          <p>${e.city}</p>
        </div>
      `).join('');
  }
}

async function loadEventDetail(id) {
  const res = await fetch('data/events.json');
  const events = await res.json();
  const ev = events.find(e => e.id === id);

  const app = document.getElementById('app');
  if (!ev) {
    app.innerHTML = "<p>Événement introuvable.</p>";
    return;
  }

  app.innerHTML = `
    <div class="card">
      <h2>${ev.name}</h2>
      <p><strong>Ville :</strong> ${ev.city}</p>
      <p><strong>Date :</strong> ${ev.date}</p>
      <p><strong>Vainqueur :</strong> ${ev.winner}</p>
      <p><strong>Finaliste :</strong> ${ev.runnerUp}</p>
      <p><strong>Prize Pool :</strong> ${ev.prizePool}</p>
      <p>${ev.description}</p>
    </div>
    <button onclick="loadPage('events')">← Retour aux compétitions</button>
  `;
}

loadPage('home');
