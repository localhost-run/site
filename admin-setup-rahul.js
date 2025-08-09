// Admin Setup Script for Rahul Kashyap
// UID: lwrLF01gp1hcEwF0rZr4vu6oeju2
// Email: rahulkashyap10091009@gmail.com
// Password: @rahul420

// Function to make Rahul admin
async function makeRahulAdmin() {
    try {
        const user = auth.currentUser;
        if (!user) {
            alert('Please login first with rahulkashyap10091009@gmail.com');
            return;
        }

        // Check if it's Rahul's account
        if (user.uid !== 'lwrLF01gp1hcEwF0rZr4vu6oeju2' && user.email !== 'rahulkashyap10091009@gmail.com') {
            alert('This function is for Rahul\'s account only. Please login with rahulkashyap10091009@gmail.com');
            return;
        }

        await updateDoc(doc(db, 'users', user.uid), {
            admin: true
        });
        
        alert('Rahul has been made admin! Please refresh the page.');
        console.log('Admin status updated for Rahul:', user.email);
    } catch (error) {
        alert('Failed to make Rahul admin: ' + error.message);
        console.error('Error:', error);
    }
}

// Function to check Rahul's admin status
async function checkRahulAdminStatus() {
    try {
        const user = auth.currentUser;
        if (!user) {
            alert('Please login first');
            return;
        }

        const userDoc = await getDoc(doc(db, 'users', user.uid));
        if (userDoc.exists()) {
            const userData = userDoc.data();
            if (userData.admin) {
                alert('Rahul is already an admin!');
                console.log('Rahul is admin:', userData);
            } else {
                alert('Rahul is not an admin yet. Use makeRahulAdmin() to become admin.');
            }
        } else {
            alert('User document not found');
        }
    } catch (error) {
        alert('Error checking admin status: ' + error.message);
        console.error('Error:', error);
    }
}

// Function to verify Rahul's credentials
async function verifyRahulCredentials() {
    try {
        const user = auth.currentUser;
        if (!user) {
            alert('Please login first');
            return;
        }

        console.log('Current user:', {
            uid: user.uid,
            email: user.email,
            expectedUID: 'lwrLF01gp1hcEwF0rZr4vu6oeju2',
            expectedEmail: 'rahulkashyap10091009@gmail.com'
        });

        if (user.uid === 'lwrLF01gp1hcEwF0rZr4vu6oeju2' && user.email === 'rahulkashyap10091009@gmail.com') {
            alert('✅ Rahul\'s credentials verified!');
            console.log('✅ Rahul\'s credentials are correct');
        } else {
            alert('❌ Wrong credentials. Please login with rahulkashyap10091009@gmail.com');
            console.log('❌ Wrong credentials detected');
        }
    } catch (error) {
        alert('Error verifying credentials: ' + error.message);
        console.error('Error:', error);
    }
}

// Instructions for Rahul
console.log(`
=== RAHUL'S ADMIN SETUP INSTRUCTIONS ===

Your Credentials:
- UID: lwrLF01gp1hcEwF0rZr4vu6oeju2
- Email: rahulkashyap10091009@gmail.com
- Password: @rahul420

Steps to become admin:

1. Login to user panel with your credentials
2. Open browser console (F12)
3. Run one of these commands:

   makeRahulAdmin()           - Make yourself admin
   checkRahulAdminStatus()    - Check if you're admin
   verifyRahulCredentials()   - Verify your credentials

4. After making admin, refresh the page
5. Try accessing admin panel

If you get "Access Denied":
- Make sure you're logged in with the correct email
- Run makeRahulAdmin() in console
- Check if admin field was added to your user document
`);