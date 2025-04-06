document.getElementById("createUserForm").addEventListener("submit", async (e) => {
    e.preventDefault();
  
    const form = e.target;
    const username = form.username.value;
    const password = form.password.value;
  
    const response = await fetch("/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password })
    });

    console.log(response)
  
    if (response.ok) {
      alert("Utilisateur créé avec succès !");
      window.location.href = "/login";
    } else {
      const text = await response.text();
      alert("Erreur : " + text);
    }
  });
  