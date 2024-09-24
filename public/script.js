
        document.getElementById('signupBtn').addEventListener('click', function() {
            document.getElementById('signupForm').classList.add('active-form');
            document.getElementById('loginForm').classList.remove('active-form');
            this.classList.add('active');
            document.getElementById('loginBtn').classList.remove('active');
        });
        
        document.getElementById('loginBtn').addEventListener('click', function() {
            document.getElementById('loginForm').classList.add('active-form');
            document.getElementById('signupForm').classList.remove('active-form');
            this.classList.add('active');
            document.getElementById('signupBtn').classList.remove('active');
        });
        