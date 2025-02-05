document.addEventListener("DOMContentLoaded", () => {
    const postContainer = document.getElementById("post-container");

    // Buscar posts
    fetch("https://jsonplaceholder.typicode.com/posts")
        .then(response => response.json())
        .then(posts => {
            posts.slice(0, 10).forEach(post => {
                fetch(`https://jsonplaceholder.typicode.com/users/${post.userId}`)
                    .then(response => response.json())
                    .then(user => {
                        const postElement = document.createElement("div");
                        postElement.classList.add("col-md-6");
                        postElement.innerHTML = `
                            <div class="card p-3 mb-3">
                                <h5 class="card-title">${post.title}</h5>
                                <h6 class="card-subtitle mb-2">${user.name} (${user.email})</h6>
                                <p class="card-text">${post.body}</p>
                                <button class="btn btn-primary btn-sm show-comments" data-post-id="${post.id}">Carregar Comentários</button>
                                <div class="comments-container" id="comments-${post.id}" style="display:none;"></div>
                            </div>
                        `;
                        postContainer.appendChild(postElement);
                    });
            });
        });

    // Evento para carregar comentários
    document.addEventListener("click", (event) => {
        if (event.target.classList.contains("show-comments")) {
            const postId = event.target.getAttribute("data-post-id");
            const commentsContainer = document.getElementById(`comments-${postId}`);

            if (commentsContainer.style.display === "none") {
                commentsContainer.innerHTML = "<p>Carregando...</p>";
                commentsContainer.style.display = "block";

                fetch(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`)
                    .then(response => response.json())
                    .then(comments => {
                        commentsContainer.innerHTML = comments.map(comment => `
                            <div class="comment">
                                <strong>${comment.name}</strong> (${comment.email})<br>
                                <p>${comment.body}</p>
                            </div>
                        `).join("");
                    })
                    .catch(error => {
                        commentsContainer.innerHTML = "<p>Erro ao carregar os comentários.</p>";
                        console.error("Erro ao buscar comentários:", error);
                    });
            } else {
                commentsContainer.style.display = "none";
            }
        }
    });
});
