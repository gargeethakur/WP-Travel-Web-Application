function toggleSidebar() {
            let sidebar = document.getElementById("sidebar");
            let content = document.getElementById("content");
            sidebar.classList.toggle("collapsed");
            
            if(sidebar.classList.contains("collapsed")) {
                content.classList.add("expanded-content");
            } else {
                content.classList.remove("expanded-content")
            }
        }