async function loadPage(page) {
  const app = document.getElementById('app');
  if (page === 'home') {
    app.innerHTML = '<h2>Bienvenue sur le Wiki des Valorant Europe Federation</h2><p>Retrouvez ici les 12 équipes, différents splits et palmarès.</p>';
  } else if (page === 'teams') {
    const res = await fetch('data/teams.json');
    const teams = await res.json();
    app.innerHTML = '<h2>Équipes</h2>' + teams.map(t => `<div class='card'><h3>${t.name}</h3><p>Pays : ${t.country}</p></div>`).join('');
  } else if (page === 'events') {
    const res = await fetch('data/events.json');
    const events = await res.json();
    app.innerHTML = '<h2>Compétitions</h2>' + events.map(e => `<div class='card'><h3>${e.name}</h3><p>${e.city}</p></div>`).join('');
  }
}
loadPage('home');
