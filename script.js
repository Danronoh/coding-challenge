fetch('https://jsonplaceholder.typicode.com/users')
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            appendData(data);
        })
        .catch(function (err) {
            console.log('error: ' + err);
        });

    function appendData(data) {
        var mainContainer = document.getElementById("users");
        for (var i = 0; i < data.length; i++) {
            var li = document.createElement("li");
            li.innerHTML =  data[i].username;
            li.classList.add('item');
            li.dataset.userId = data[i].id;
            li.addEventListener('click', (event) => getPosts(event))
            mainContainer.appendChild(li);
        }

    }

    function cleanPosts() {
        var users = document.querySelectorAll('.item ul');
        for(var i = 0; i < users.length; i++) {
            if(users[i]) {
                users[i].style.display = 'none';
            }
        }
    }

    function getPosts(event) {

        var userId = event.target.dataset.userId;

        fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`)
            .then(response => response.json())
            .then(json => renderPosts(json, event.target))
    }

    function renderPosts(posts, target) {
        var postsList = target.childNodes[1];

        cleanPosts();

        if(postsList){
            postsList.style.display = 'block';
        } else {
            var list = document.createElement("ul");

            for (var i = 0; i < posts.length; i++) {

                var item = document.createElement("li");
                var liTitle = document.createElement("strong");
                var liBody = document.createElement("p");

                liTitle.innerHTML = posts[i].title;
                liBody.innerHTML = posts[i].body;

                item.appendChild(liTitle);
                item.appendChild(liBody);
                list.appendChild(item);
            }

            target.appendChild(list);
        }

    }