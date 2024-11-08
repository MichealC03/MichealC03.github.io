$(document).ready(function () {

    $('#menu').click(function () {
        $(this).toggleClass('fa-times');
        $('.navbar').toggleClass('nav-toggle');
    });

    $(window).on('scroll load', function () {
        $('#menu').removeClass('fa-times');
        $('.navbar').removeClass('nav-toggle');

        if (window.scrollY > 60) {
            document.querySelector('#scroll-top').classList.add('active');
        } else {
            document.querySelector('#scroll-top').classList.remove('active');
        }
    });
});

document.addEventListener('visibilitychange',
    function () {
        if (document.visibilityState === "visible") {
            document.title = "Projects | Portfolio Micheal Callahan";
            $("#favicon").attr("href", "/assets/images/favicon.png");
        }
    });


// fetch projects start
function getProjects() {
    return fetch("projects.json")
        .then(response => response.json())
        .then(data => {
            return data
        });
}


// JavaScript implementation
function showProjects(projects) {
    const projectsContainer = document.querySelector(".work .box-container");
    const filterButtons = document.querySelectorAll("#filters button");
    
    // Function to render projects
    function renderProjects(filterCategory = '*') {
        const projectsHTML = projects
            .filter(project => {
                // Show all projects if filterCategory is '*', otherwise filter by category
                return filterCategory === '*' || project.category === filterCategory;
            })
            .map(project => `
                <div class="grid-item ${project.category}">
                    <div class="box tilt">
                        <img draggable="false" src="/assets/images/projects/${project.image}.png" alt="project" />
                        <div class="content">
                            <div class="tag">
                                <h3>${project.name}</h3>
                            </div>
                            <div class="desc">
                                <p>${project.desc}</p>
                                <div class="btns">
                                    ${project.links.view ? `<a href="${project.links.view}" class="btn" target="_blank"><i class="fas fa-eye"></i></a>` : ''}
                                    ${project.links.demo ? `<a href="${project.links.demo}" class="btn" target="_blank"><i class="fas fa-video"></i></a>` : ''}
                                    ${project.links.code ? `<a href="${project.links.code}" class="btn" target="_blank"><i class="fas fa-code"></i></a>` : ''}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `)
            .join('');
            
        projectsContainer.innerHTML = projectsHTML;
    }

    // Add click event listeners to filter buttons
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove is-checked class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('is-checked'));
            
            // Add is-checked class to clicked button
            this.classList.add('is-checked');
            
            // Get filter value and render filtered projects
            const filterValue = this.getAttribute('data-filter');
            renderProjects(filterValue);
        });
    });

    // Initial render of all projects
    renderProjects('*');
}

getProjects().then(data => {
    showProjects(data);
})

// disable developer mode
document.onkeydown = function (e) {
    if (e.keyCode == 123) {
        return false;
    }
    if (e.ctrlKey && e.shiftKey && e.keyCode == 'I'.charCodeAt(0)) {
        return false;
    }
    if (e.ctrlKey && e.shiftKey && e.keyCode == 'C'.charCodeAt(0)) {
        return false;
    }
    if (e.ctrlKey && e.shiftKey && e.keyCode == 'J'.charCodeAt(0)) {
        return false;
    }
    if (e.ctrlKey && e.keyCode == 'U'.charCodeAt(0)) {
        return false;
    }
}