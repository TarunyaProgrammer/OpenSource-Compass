let programs = [];

const grid = document.getElementById("programsGrid");
const searchBar = document.getElementById("searchBar");
const categoryFilter = document.getElementById("categoryFilter");

async function init() {
    try {
        const response = await fetch("data/programs.json");
        programs = await response.json();
        renderPrograms(programs);
    } catch (err) {
        console.error("Data fetch failed", err);
        grid.innerHTML = `<p style="color:#9ca3af;">Failed to load programs.</p>`;
    }
}

function renderPrograms(data) {
    grid.innerHTML = "";

    if (data.length === 0) {
        grid.innerHTML = `<p style="color:#9ca3af;">No programs found.</p>`;
        return;
    }

    data.forEach(program => {
        const badgeClass =
            program.difficulty === "Beginner Friendly"
                ? "Beginner"
                : program.difficulty;

        const card = document.createElement("div");
        card.className = "program-card fade-in-up active";

        card.innerHTML = `
            <h3 class="program-title">${program.name}</h3>
            <p class="program-desc">${program.description}</p>

            <div class="program-meta">
                <span class="badge ${badgeClass}">
                    ${program.difficulty || program.category}
                </span>
                <a class="program-link" href="${program.link}" target="_blank">
                    Learn More →
                </a>
            </div>

            ${
                program.timeline
                    ? `<p><strong>Timeline:</strong> ${program.timeline}</p>`
                    : ""
            }
            ${
                program.stipend
                    ? `<p><strong>Stipend:</strong> ${program.stipend}</p>`
                    : ""
            }
        `;

        grid.appendChild(card);
    });
}

function filterPrograms() {
    const searchText = searchBar.value.toLowerCase();
    const category = categoryFilter.value;

    const filtered = programs.filter(program => {
        const matchesSearch = program.name.toLowerCase().includes(searchText);
        const matchesCategory =
            category === "all" ||
            program.difficulty === category ||
            program.category === category;

        return matchesSearch && matchesCategory;
    });

    renderPrograms(filtered);
}

searchBar.addEventListener("input", filterPrograms);
categoryFilter.addEventListener("change", filterPrograms);
document.addEventListener("DOMContentLoaded", init);
