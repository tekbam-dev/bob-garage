// File: src/middleware/admin.js
// Middleware file to test for admin users.
// This will help secure routes for admin only people to access.

// Create our middleware function.
// Remember that we need req, res, next
const admin = (req, res, next)=> {
    // Check if the user is an admin.
    // Note that this is req.user.user.isAdmin is set by our auth middleware from our decoded token.
    // This middleware needs to run after the auth middleware.
    console.log('Admin mw - user')
    console.log(req.user);
    if(!req.user.isadmin){
      return res.status(403).send('Access Denied');
      // 401 = Unauthorised - No valid token
      // 403 = Forbidden - Valid token, insufficent privileges.
    }
    // Run the next piece of middleware
    next();
  }
  
  export default admin;