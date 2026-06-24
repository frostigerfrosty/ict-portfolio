console.log("JavaScript-Datei wurde erfolgreich geladen!");

// 1. Passwort-Schutz Mechanismen
function checkPassword(event) {
    // Verhindert das Neuladen oder Springen der Seite
    event.preventDefault(); 
    
    // Eingabefenster öffnen
    const eingabe = prompt("Bitte geben Sie das Passwort ein, um die Dokumente freizuschalten:");
    
    // Abbrechen, falls der User nichts eingibt oder abbricht
    if (!eingabe) {
        return; 
    }

    alert("Verarbeite Autorisierung...");
    
    // Die Eingabe wird direkt als Dateiname interpretiert.
    // Wer "geheim2026" eintippt, wird an geheim2026.html weitergeleitet.
    window.location.href = eingabe.toLowerCase() + ".html";
}

// 2. Dynamischer Theme-Wechsler (Dark / Light Mode)
function toggleTheme() {
    const body = document.body;
    if (body.getAttribute("data-theme") === "light") {
        body.removeAttribute("data-theme");
        localStorage.setItem("theme", "dark");
    } else {
        body.setAttribute("data-theme", "light");
        localStorage.setItem("theme", "light");
    }
}

// 3. Initialisierung beim Laden der Seite (Theme & Projektsuche)
document.addEventListener("DOMContentLoaded", () => {
    // Gespeichertes Theme anwenden
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "light") {
        document.body.setAttribute("data-theme", "light");
    }

    // Interaktive Projektsuche Logik (falls Suchfeld existiert)
    const searchInput = document.getElementById("projectSearch");
    if (searchInput) {
        searchInput.addEventListener("input", (e) => {
            const filter = e.target.value.toLowerCase();
            const cards = document.querySelectorAll(".card");
            
            cards.forEach(card => {
                const text = card.textContent.toLowerCase();
                if (text.includes(filter)) {
                    card.style.display = "block";
                } else {
                    card.style.display = "none";
                }
            });
        });
    }
});

// Globale Scroll-Animation für alle Seiten
document.addEventListener("DOMContentLoaded", () => {
    // Holt sich alle wichtigen Inhaltselemente innerhalb des Containers
    const animatedElements = document.querySelectorAll(
        ".container section, .container .card, .container h1, .container h2, .container p, .container ul"
    );

    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                // Element wird sichtbar geschaltet
                entry.target.classList.add("revealed");
                // Animation soll nur einmal passieren, danach nicht mehr überwachen
                scrollObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.05, // Startet, sobald 5% des Elements zu sehen sind
        rootMargin: "0px 0px -50px 0px" // Startet kurz bevor es ganz im Bild ist, wirkt flüssiger
    });

    animatedElements.forEach((el) => {
        scrollObserver.observe(el);
    });
});