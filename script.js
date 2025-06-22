// ----- Login Functionality -----
document.addEventListener("DOMContentLoaded", () => {
  if (document.getElementById("loginForm")) {
    login();
  }
});

function login() {
  document.getElementById("loginForm").addEventListener("submit", function (event) {
    event.preventDefault();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    if ((email === "admin" || email === "admin@demo.com") && password === "admin123") {
      localStorage.setItem("isLoggedIn", "true");
      window.location.href = "index.html";
    } else {
      alert("Invalid email or password");
    }
  });
}

function logout() {
  localStorage.removeItem("isLoggedIn");
  window.location.href = "login.html";
}

// ----- Auth Guard on Index Page -----
document.addEventListener("DOMContentLoaded", () => {
  if (!document.getElementById("loginForm")) {
    if (localStorage.getItem("isLoggedIn") !== "true") {
      window.location.href = "login.html";
    }
  }
});

// ----- Counter Animation -----
document.addEventListener("DOMContentLoaded", () => {
  const counters = document.querySelectorAll(".counter");
  let animated = false;

  function animateCounter(counter) {
    const target = +counter.getAttribute("data-target");
    const isCurrency = counter.textContent.trim().startsWith("$");
    const increment = target / 100;
    let current = 0;

    function update() {
      current += increment;
      if (current < target) {
        counter.textContent = isCurrency
          ? `$${Math.ceil(current)}`
          : Math.ceil(current);
        requestAnimationFrame(update);
      } else {
        counter.textContent = isCurrency ? `$${target}` : target;
      }
    }

    update();
  }

  function handleScroll() {
    const section = document.querySelector(".cards");
    if (!section) return;
    const rect = section.getBoundingClientRect();
    if (!animated && rect.top < window.innerHeight - 100) {
      counters.forEach(animateCounter);
      animated = true;
    }
  }

  window.addEventListener("scroll", handleScroll);
  handleScroll();
});

// ----- Chart.js Logic -----
document.addEventListener("DOMContentLoaded", () => {
  const ctx = document.getElementById("userActivityChart")?.getContext("2d");
  if (ctx) {
    new Chart(ctx, {
      type: "line",
      data: {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
        datasets: [
          {
            label: "New Users",
            data: [12, 19, 7, 15, 10, 18, 20],
            fill: true,
            backgroundColor: "rgba(37, 99, 235, 0.2)",
            borderColor: "rgba(37, 99, 235, 1)",
            borderWidth: 3,
            tension: 0.3,
            pointRadius: 5,
            pointHoverRadius: 7,
            pointBackgroundColor: "rgba(37, 99, 235, 1)",
          },
        ],
      },
      options: {
        responsive: true,
        interaction: { mode: "nearest", axis: "x", intersect: false },
        plugins: {
          legend: {
            display: true,
            labels: { font: { size: 14, weight: "bold" }, color: "#1f2937" },
          },
          tooltip: {
            enabled: true,
            backgroundColor: "#2563eb",
            titleFont: { weight: "bold" },
            bodyFont: { size: 14 },
            cornerRadius: 6,
            padding: 10,
          },
        },
        scales: {
          y: {
            beginAtZero: true,
            grid: { color: "#e5e7eb" },
            ticks: { color: "#6b7280", font: { size: 13 } },
          },
          x: {
            grid: { display: false },
            ticks: { color: "#6b7280", font: { size: 13 } },
          },
        },
      },
    });
  }
});

// ----- Modal Edit + Delete Functionality -----
window.openEditModal = function (button) {
  const row = button.closest("tr");
  if (!row) return;

  const name = row.cells[1].textContent;
  const email = row.cells[2].textContent;
  const index = Array.from(row.parentElement.children).indexOf(row);

  document.getElementById("editRowIndex").value = index;
  document.getElementById("editName").value = name;
  document.getElementById("editEmail").value = email;
  document.getElementById("editModal").style.display = "flex";
};

window.closeModal = function () {
  document.getElementById("editModal").style.display = "none";
};

window.deleteRow = function (button) {
  const row = button.closest("tr");
  if (row) {
    row.remove();
    showToast("User deleted.");
  }
};

document.getElementById("editForm")?.addEventListener("submit", function (e) {
  e.preventDefault();
  const index = parseInt(document.getElementById("editRowIndex").value, 10);
  const newName = document.getElementById("editName").value;
  const newEmail = document.getElementById("editEmail").value;

  const rows = document.querySelectorAll("table tbody tr");
  if (rows[index]) {
    rows[index].cells[1].textContent = newName;
    rows[index].cells[2].textContent = newEmail;
    showToast("User updated.");
  }

  closeModal();
});

function showToast(message) {
  const toast = document.getElementById("toast");
  if (!toast) return;
  toast.textContent = message;
  toast.style.display = "block";
  setTimeout(() => {
    toast.style.display = "none";
  }, 3000);
}

function addUserCard(name, email) {
  const container = document.getElementById("userCards");
  const card = document.createElement("div");
  card.className = "user-card";
  const date = new Date().toLocaleDateString();

  card.innerHTML = `
    <h3>${name}</h3>
    <p>${email}</p>
    <p>Signed up: ${date}</p>
  `;

  container?.prepend(card);
}
