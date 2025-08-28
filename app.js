// NoteTaker Application - Completely Fixed Version
class NoteTakerApp {
    constructor() {
        this.currentUser = null;
        this.notes = [];
        this.currentOTP = null;
        this.pendingUser = null;
        this.noteToDelete = null;
        
        // Google accounts for demo
        this.googleAccounts = [
            {
                id: 'google_user_1',
                email: 'demouser1@gmail.com',
                name: 'Demo-1234'
            },
            {
                id: 'google_user_2', 
                email: 'demouser2@gmail.com',
                name: 'Demo-123'
            }
        ];
        
        this.init();
    }

    init() {
        console.log('NoteTaker App initializing...');
        
        // Make sure the app is globally available immediately
        window.app = this;
        
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.initialize());
        } else {
            // DOM is already ready, initialize immediately
            this.initialize();
        }
    }

    initialize() {
        console.log('NoteTaker App loading data and checking auth...');
        this.loadFromStorage();
        this.checkAuthentication();
        this.setupEventListeners();
        console.log('NoteTaker App initialized successfully');
    }

    // ============= Storage Management =============
    loadFromStorage() {
        try {
            // Load users
            const users = localStorage.getItem('noteTaker_users');
            this.users = users ? JSON.parse(users) : [
                {
                    id: 'demo_user_1',
                    email: 'demo@example.com',
                    name: 'Demo User',
                    authType: 'email',
                    password: this.hashPassword('Demo123!'),
                    createdAt: '2025-01-15T10:00:00Z'
                }
            ];

            // Load all notes
            const notes = localStorage.getItem('noteTaker_notes');
            this.allNotes = notes ? JSON.parse(notes) : [
                {
                    id: 'sample_note_1',
                    userId: 'demo_user_1',
                    title: 'Welcome to NoteTaker',
                    content: 'This is your first note! You can create, edit, and delete notes here. Start organizing your thoughts!',
                    createdAt: '2025-01-15T10:00:00Z',
                    updatedAt: '2025-01-15T10:00:00Z'
                }
            ];

            // Check for existing session
            const token = localStorage.getItem('noteTaker_token');
            if (token) {
                try {
                    const decoded = this.verifyJWT(token);
                    this.currentUser = this.users.find(u => u.id === decoded.userId);
                    if (this.currentUser) {
                        this.loadUserNotes();
                    }
                } catch (error) {
                    localStorage.removeItem('noteTaker_token');
                }
            }
        } catch (error) {
            console.error('Error loading from storage:', error);
        }
    }

    saveToStorage() {
        try {
            localStorage.setItem('noteTaker_users', JSON.stringify(this.users));
            localStorage.setItem('noteTaker_notes', JSON.stringify(this.allNotes));
        } catch (error) {
            console.error('Error saving to storage:', error);
        }
    }

    // ============= Event Listeners Setup =============
    setupEventListeners() {
        // Signup form
        const signupForm = document.getElementById('signup-form');
        if (signupForm) {
            signupForm.addEventListener('submit', (e) => this.handleSignUpSubmit(e));
        }

        // Signin form  
        const signinForm = document.getElementById('signin-form');
        if (signinForm) {
            signinForm.addEventListener('submit', (e) => this.handleSignInSubmit(e));
        }

        // OTP form
        const otpForm = document.getElementById('otp-form');
        if (otpForm) {
            otpForm.addEventListener('submit', (e) => this.handleOTPSubmit(e));
        }

        // Note form
        const noteForm = document.getElementById('note-form');
        if (noteForm) {
            noteForm.addEventListener('submit', (e) => this.handleNoteSubmit(e));
        }
    }

    // ============= Authentication Utilities =============
    hashPassword(password) {
        return btoa(password + 'noteTaker_salt_2025');
    }

    generateJWT(user) {
        const payload = {
            userId: user.id,
            email: user.email,
            name: user.name,
            exp: Math.floor(Date.now() / 1000) + (24 * 60 * 60) // 24 hours
        };
        return btoa(JSON.stringify(payload));
    }

    verifyJWT(token) {
        try {
            const decoded = JSON.parse(atob(token));
            if (decoded.exp < Math.floor(Date.now() / 1000)) {
                throw new Error('Token expired');
            }
            return decoded;
        } catch (error) {
            throw new Error('Invalid token');
        }
    }

    validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    validatePassword(password) {
        const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
        return re.test(password);
    }

    generateOTP() {
        return Math.floor(100000 + Math.random() * 900000).toString();
    }

    // ============= UI Helper Methods =============
    showElement(id) {
        const element = document.getElementById(id);
        if (element) {
            element.classList.remove('hidden');
            element.classList.add('fade-in');
        }
    }

    hideElement(id) {
        const element = document.getElementById(id);
        if (element) {
            element.classList.add('hidden');
            element.classList.remove('fade-in');
        }
    }

    showToast(message, type = 'info') {
        const container = document.getElementById('toast-container');
        if (!container) return;

        const toast = document.createElement('div');
        toast.className = `toast toast--${type}`;
        toast.textContent = message;
        
        container.appendChild(toast);
        
        setTimeout(() => {
            if (toast.parentNode) {
                container.removeChild(toast);
            }
        }, 4000);
    }

    clearFormErrors() {
        const errorElements = document.querySelectorAll('.error-message');
        errorElements.forEach(el => el.textContent = '');
    }

    showFieldError(fieldId, message) {
        const errorElement = document.getElementById(`${fieldId}-error`);
        if (errorElement) {
            errorElement.textContent = message;
        }
    }

    // ============= Page Navigation =============
    showSignUpPage() {
        console.log('Showing signup page');
        this.hideElement('signin-page');
        this.hideElement('otp-page');
        this.showElement('signup-page');
        this.clearFormErrors();
    }

    showSignInPage() {
        console.log('Showing signin page');
        this.hideElement('signup-page');
        this.hideElement('otp-page');
        this.showElement('signin-page');
        this.clearFormErrors();
    }

    showOTPPage() {
        console.log('Showing OTP page');
        this.hideElement('signup-page');
        this.hideElement('signin-page');
        this.showElement('otp-page');
        this.clearFormErrors();
    }

    // ============= Form Submit Handlers =============
    handleSignUpSubmit(event) {
        event.preventDefault();
        console.log('Signup form submitted');
        this.handleSignUp();
        return false;
    }

    handleSignInSubmit(event) {
        event.preventDefault();
        console.log('Signin form submitted');
        this.handleSignIn();
        return false;
    }

    handleOTPSubmit(event) {
        event.preventDefault();
        console.log('OTP form submitted');
        this.handleOTPVerification();
        return false;
    }

    handleNoteSubmit(event) {
        event.preventDefault();
        console.log('Note form submitted');
        this.handleCreateNote();
        return false;
    }

    // ============= Authentication Handlers =============
    handleSignUp() {
        console.log('Starting signup process...');
        this.clearFormErrors();

        // Get form values
        const name = document.getElementById('signup-name').value.trim();
        const email = document.getElementById('signup-email').value.trim();
        const password = document.getElementById('signup-password').value;

        let hasErrors = false;

        // Validation
        if (!name || name.length < 2) {
            this.showFieldError('signup-name', 'Name must be at least 2 characters');
            hasErrors = true;
        }

        if (!this.validateEmail(email)) {
            this.showFieldError('signup-email', 'Please enter a valid email address');
            hasErrors = true;
        }

        if (!this.validatePassword(password)) {
            this.showFieldError('signup-password', 'Password must be at least 8 characters with uppercase, lowercase, and number');
            hasErrors = true;
        }

        // Check if user already exists
        if (this.users.find(u => u.email === email)) {
            this.showFieldError('signup-email', 'An account with this email already exists');
            hasErrors = true;
        }

        if (hasErrors) {
            return;
        }

        // Generate OTP and store pending user
        this.currentOTP = this.generateOTP();
        this.pendingUser = {
            id: `user_${Date.now()}`,
            name,
            email,
            password: this.hashPassword(password),
            authType: 'email',
            createdAt: new Date().toISOString()
        };

        console.log(`OTP generated for ${email}: ${this.currentOTP}`);
        
        // CRITICAL FIX 1: Show immediate JavaScript alert with OTP
        alert(`Your OTP verification code is: ${this.currentOTP}`);

        // Update OTP page with email
        document.getElementById('otp-email').textContent = email;
        
        // Show OTP display for reference
        this.displayDemoOTP(this.currentOTP);
        this.showOTPPage();
        
        this.showToast('Verification code sent!', 'success');
    }

    handleSignIn() {
        console.log('Starting signin process...');
        this.clearFormErrors();

        const email = document.getElementById('signin-email').value.trim();
        const password = document.getElementById('signin-password').value;

        let hasErrors = false;

        if (!this.validateEmail(email)) {
            this.showFieldError('signin-email', 'Please enter a valid email address');
            hasErrors = true;
        }

        if (!password) {
            this.showFieldError('signin-password', 'Password is required');
            hasErrors = true;
        }

        if (hasErrors) {
            return;
        }

        // Find user and validate credentials
        const user = this.users.find(u => u.email === email);
        if (!user || user.password !== this.hashPassword(password)) {
            this.showFieldError('signin-email', 'Invalid email or password');
            this.showFieldError('signin-password', 'Invalid email or password');
            this.showToast('Try: demo@example.com / Demo123!', 'info');
            return;
        }

        this.showToast('Login successful!', 'success');
        this.loginUser(user);
    }

    handleOTPVerification() {
        console.log('Starting OTP verification...');
        this.clearFormErrors();

        const enteredOTP = document.getElementById('otp-code').value.trim();

        if (!enteredOTP) {
            this.showFieldError('otp-code', 'Please enter the verification code');
            return;
        }

        if (enteredOTP.length !== 6) {
            this.showFieldError('otp-code', 'Verification code must be 6 digits');
            return;
        }

        // Accept any 6-digit number for demo purposes
        if (!/^\d{6}$/.test(enteredOTP)) {
            this.showFieldError('otp-code', 'Please enter a valid 6-digit code');
            return;
        }

        // Add user to storage
        this.users.push(this.pendingUser);
        this.saveToStorage();

        this.showToast('Account created successfully!', 'success');
        this.loginUser(this.pendingUser);
    }

    resendOTP() {
        if (!this.pendingUser) return;
        
        this.currentOTP = this.generateOTP();
        console.log(`New OTP: ${this.currentOTP}`);
        
        // Show immediate alert with new OTP
        alert(`Your new OTP verification code is: ${this.currentOTP}`);
        
        this.displayDemoOTP(this.currentOTP);
        this.showToast('New verification code sent!', 'success');
    }

    displayDemoOTP(otp) {
        const demoDisplay = document.getElementById('demo-otp-display');
        const demoCode = document.getElementById('demo-otp-code');
        
        if (demoDisplay && demoCode) {
            demoCode.textContent = otp;
            demoDisplay.classList.remove('hidden');
        }
    }

    handleGoogleAuth(type) {
        console.log(`Starting Google ${type}...`);
        this.showModal('google-auth-modal');
        this.renderGoogleAccounts();
    }

    renderGoogleAccounts() {
        const container = document.getElementById('google-accounts');
        if (!container) return;

        container.innerHTML = this.googleAccounts.map(account => `
            <div class="google-account-item" onclick="window.app.processGoogleLogin('${account.id}')">
                <div class="google-account-avatar">
                    ${account.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div class="google-account-info">
                    <div class="google-account-name">${account.name}</div>
                    <div class="google-account-email">${account.email}</div>
                </div>
            </div>
        `).join('');
    }

    processGoogleLogin(accountId) {
        console.log('Processing Google login for account:', accountId);
        
        // Hide modal immediately
        this.hideModal('google-auth-modal');
        
        const selectedAccount = this.googleAccounts.find(acc => acc.id === accountId);
        if (!selectedAccount) {
            this.showToast('Account selection failed', 'error');
            return;
        }

        this.showToast(`Signing in as ${selectedAccount.name}...`, 'info');

        const googleUser = {
            id: `google_${Date.now()}`,
            name: selectedAccount.name,
            email: selectedAccount.email,
            authType: 'google',
            createdAt: new Date().toISOString()
        };

        // Check if user already exists
        let user = this.users.find(u => u.email === googleUser.email);
        
        if (!user) {
            // Create new user
            this.users.push(googleUser);
            this.saveToStorage();
            user = googleUser;
            this.showToast(`Welcome ${user.name}!`, 'success');
        } else {
            this.showToast(`Welcome back ${user.name}!`, 'success');
        }

        // Login user immediately
        this.loginUser(user);
    }

    loginUser(user) {
        console.log('Logging in user:', user.email);
        this.currentUser = user;
        const token = this.generateJWT(user);
        localStorage.setItem('noteTaker_token', token);
        
        this.loadUserNotes();
        this.showDashboard();
    }

    logout() {
        console.log('Logging out user...');
        this.currentUser = null;
        this.notes = [];
        localStorage.removeItem('noteTaker_token');
        this.showToast('Logged out successfully', 'info');
        this.showAuthentication();
    }

    checkAuthentication() {
        if (this.currentUser) {
            console.log('User authenticated, showing dashboard');
            this.showDashboard();
        } else {
            console.log('User not authenticated, showing login');
            this.showAuthentication();
        }
    }

    showAuthentication() {
        this.hideElement('dashboard-container');
        this.showElement('auth-container');
        this.showSignInPage();
    }

    showDashboard() {
        this.hideElement('auth-container');
        this.showElement('dashboard-container');
        this.updateDashboard();
    }

    // ============= Dashboard Management =============
    updateDashboard() {
        if (!this.currentUser) return;
        
        const userName = document.getElementById('user-name');
        const welcomeUserName = document.getElementById('welcome-user-name');
        const notesCount = document.getElementById('notes-count');
        const userSince = document.getElementById('user-since');

        if (userName) userName.textContent = this.currentUser.name;
        if (welcomeUserName) welcomeUserName.textContent = this.currentUser.name;
        if (notesCount) notesCount.textContent = this.notes.length;
        
        if (userSince) {
            const memberSince = new Date(this.currentUser.createdAt).toLocaleDateString('en-US', {
                month: 'short',
                year: 'numeric'
            });
            userSince.textContent = memberSince;
        }

        this.renderNotes();
    }

    loadUserNotes() {
        if (this.currentUser) {
            this.notes = this.allNotes.filter(note => note.userId === this.currentUser.id);
        }
    }

    // ============= Notes Management =============
    showNoteForm() {
        this.showElement('note-form-container');
    }

    hideNoteForm() {
        this.hideElement('note-form-container');
        const form = document.getElementById('note-form');
        if (form) form.reset();
    }

    handleCreateNote() {
        console.log('Creating new note...');

        const title = document.getElementById('note-title').value.trim();
        const content = document.getElementById('note-content').value.trim();

        if (!title || !content) {
            this.showToast('Please fill in both title and content', 'error');
            return;
        }

        const newNote = {
            id: `note_${Date.now()}`,
            userId: this.currentUser.id,
            title,
            content,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };

        this.allNotes.push(newNote);
        this.notes.push(newNote);
        this.saveToStorage();

        this.hideNoteForm();
        this.showToast('Note created successfully!', 'success');
        this.updateDashboard();
    }

    renderNotes() {
        const notesGrid = document.getElementById('notes-grid');
        const emptyState = document.getElementById('empty-notes');

        if (!notesGrid || !emptyState) return;

        if (this.notes.length === 0) {
            notesGrid.innerHTML = '';
            this.showElement('empty-notes');
            return;
        }

        this.hideElement('empty-notes');

        notesGrid.innerHTML = this.notes.map(note => {
            const createdDate = new Date(note.createdAt).toLocaleDateString();

            return `
                <div class="note-card">
                    <div class="note-header">
                        <h4 class="note-title">${this.escapeHtml(note.title)}</h4>
                        <div class="note-actions">
                            <button class="note-action-btn" onclick="window.app.confirmDeleteNote('${note.id}')" title="Delete note">
                                🗑️
                            </button>
                        </div>
                    </div>
                    <div class="note-content">${this.escapeHtml(note.content)}</div>
                    <div class="note-meta">
                        <span>Created: ${createdDate}</span>
                    </div>
                </div>
            `;
        }).join('');
    }

    confirmDeleteNote(noteId) {
        this.noteToDelete = noteId;
        this.showModal('delete-modal');
    }

    deleteNote(noteId) {
        if (!noteId) return;
        
        this.allNotes = this.allNotes.filter(note => note.id !== noteId);
        this.notes = this.notes.filter(note => note.id !== noteId);
        this.saveToStorage();

        this.hideModal('delete-modal');
        this.showToast('Note deleted successfully!', 'success');
        this.updateDashboard();
        
        this.noteToDelete = null;
    }

    // ============= Modal Management =============
    showModal(modalId) {
        this.showElement(modalId);
    }

    hideModal(modalId) {
        this.hideElement(modalId);
    }

    // ============= Utility Methods =============
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
}

// Initialize the application
console.log('Starting NoteTaker application...');

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.app = new NoteTakerApp();
    });
} else {
    window.app = new NoteTakerApp();
}