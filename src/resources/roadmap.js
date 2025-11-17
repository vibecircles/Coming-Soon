const roadmap = [
  {
    product: "Frontend Roadmap",
    brand: "indigo",
    columns: [
      {
        title: "Planned",
        tasks: [
          {
            title: "Project Setup & Structure",
            description: "Set up React 18.2.0 project with Create React App, organize directory structure with actions, api, Components, Pages, reducers, and store folders",
            type: "feature"
          },
          {
            title: "Dependencies Installation",
            description: "Install and configure React Router DOM v6, Redux with Redux Thunk, Axios, Material-UI v5, and Emotion for CSS-in-JS",
            type: "feature"
          },
          {
            title: "Main Entry Point Configuration",
            description: "Configure index.js with React DOM root, Redux Provider, BrowserRouter, and App component with route guards",
            type: "feature"
          },
          {
            title: "Routing Implementation",
            description: "Implement client-side routing with React Router DOM: Auth route (/auth), Home route (/home), Profile route (/profile/:id) with authentication guards",
            type: "feature"
          },
          {
            title: "Redux Store Setup",
            description: "Configure Redux store with Redux Thunk middleware, localStorage persistence, and combine reducers (authReducer, postReducer)",
            type: "feature"
          },
          {
            title: "Authentication Reducer",
            description: "Create authReducer to manage authentication state with AUTH_START, AUTH_SUCCESS, AUTH_FAIL, and LOG_OUT actions",
            type: "feature"
          },
          {
            title: "Post Reducer",
            description: "Create postReducer to manage posts state with RETREIVING_START, RETREIVING_SUCCESS, RETREIVING_FAIL, UPLOAD_START, UPLOAD_SUCCESS, UPLOAD_FAIL actions",
            type: "feature"
          },
          {
            title: "Auth Page",
            description: "Build authentication page with login/signup toggle, form validation, password confirmation matching, and loading states",
            type: "feature"
          },
          {
            title: "Home Page",
            description: "Create home page with three-column layout: ProfileSide (left), PostSide (center), RightSide (right) for trends and suggestions",
            type: "feature"
          },
          {
            title: "Profile Page",
            description: "Build profile page with ProfilePageLeft navigation, ProfileCard display, and user's posts feed",
            type: "feature"
          },
          {
            title: "UI Components - LogoSearch",
            description: "Create LogoSearch component with application logo and search input field",
            type: "feature"
          },
          {
            title: "UI Components - InfoCard",
            description: "Build InfoCard component for displaying information in a card format",
            type: "feature"
          },
          {
            title: "UI Components - RightSide",
            description: "Create RightSide container component for trends and follow suggestions sidebar",
            type: "feature"
          },
          {
            title: "UI Components - ShareModal",
            description: "Build ShareModal component for sharing posts with modal overlay and share options",
            type: "feature"
          },
          {
            title: "UI Components - ProfileModal",
            description: "Create ProfileModal for editing profile with image upload, form fields, validation, and save/cancel actions",
            type: "feature"
          },
          {
            title: "Post Components - PostShare",
            description: "Build PostShare component for creating posts with text input, image upload, preview, and post options (Photo, Video, Location, Schedule)",
            type: "feature"
          },
          {
            title: "Post Components - Post",
            description: "Create Post component to display individual posts with like/unlike functionality, like count, description, and author information",
            type: "feature"
          },
          {
            title: "Post Components - Posts",
            description: "Build Posts container component that renders multiple Post components and fetches posts from Redux store or API",
            type: "feature"
          },
          {
            title: "Post Components - PostSide",
            description: "Create PostSide container combining PostShare and Posts components for consistent post section layout",
            type: "feature"
          },
          {
            title: "Profile Components - ProfileCard",
            description: "Build ProfileCard to display user profile with profile/cover pictures, name, work description, followers/following counts, and posts count",
            type: "feature"
          },
          {
            title: "Profile Components - ProfilePageLeft",
            description: "Create ProfilePageLeft navigation sidebar component for profile page with navigation links",
            type: "feature"
          },
          {
            title: "Profile Components - profileSide",
            description: "Build profileSide component for home page left sidebar with compact profile display",
            type: "feature"
          },
          {
            title: "API Integration - AuthRequest",
            description: "Create AuthRequest.js with logIn and signUp functions for POST /auth/login and POST /auth/register endpoints",
            type: "feature"
          },
          {
            title: "API Integration - PostRequest",
            description: "Build PostRequest.js with getTimelinePosts and likePost functions for GET /post/:id/timeline and PUT /post/:id/like endpoints",
            type: "feature"
          },
          {
            title: "API Integration - UploadRequest",
            description: "Create UploadRequest.js with uploadImage function for POST /upload endpoint with FormData handling",
            type: "feature"
          },
          {
            title: "API Integration - UserRequest",
            description: "Build UserRequest.js with getUser, updateUser, followUser, and unFollowUser functions for user-related endpoints",
            type: "feature"
          },
          {
            title: "Redux Actions - AuthAction",
            description: "Create AuthAction.js with logIn, signUp, and logOut async action creators using Redux Thunk pattern",
            type: "feature"
          },
          {
            title: "Redux Actions - PostAction",
            description: "Build PostAction.js with getTimelinePosts and likePost async action creators",
            type: "feature"
          },
          {
            title: "Redux Actions - UploadAction",
            description: "Create UploadAction.js with uploadImage and uploadPost async action creators for file uploads",
            type: "feature"
          },
          {
            title: "Redux Actions - UserAction",
            description: "Build UserAction.js with getUser, updateUser, followUser, and unFollowUser async action creators",
            type: "feature"
          },
          {
            title: "Styling Architecture",
            description: "Set up CSS architecture with component-specific CSS files, global App.css, CSS variables for theming, and three-column grid layouts",
            type: "feature"
          },
          {
            title: "Responsive Design",
            description: "Implement responsive design with media queries, mobile adaptations, single column layout on mobile, and touch-friendly button sizes",
            type: "improvement"
          },
          {
            title: "Visual Effects & Animations",
            description: "Add blur effects, hover states, transitions, loading animations, and skeleton loaders for better UX",
            type: "improvement"
          },
          {
            title: "Environment Configuration",
            description: "Set up environment variables with REACT_APP_PUBLIC_FOLDER, configure proxy for development, and create .env file",
            type: "feature"
          },
          {
            title: "Development Scripts",
            description: "Configure npm scripts for development server (npm start), production build (npm run build), and testing (npm test)",
            type: "feature"
          },
          {
            title: "Error Handling",
            description: "Implement comprehensive error handling in API calls, Redux actions, and user-facing error messages",
            type: "improvement"
          },
          {
            title: "JWT Token Management",
            description: "Implement JWT token handling with request interceptors, token storage in Redux/localStorage, and Authorization headers",
            type: "security"
          },
          {
            title: "Image Upload & Handling",
            description: "Complete image upload flow for profile pictures, cover images, and post images with preview, progress indication, and error handling",
            type: "feature"
          },
          {
            title: "Optimistic UI Updates",
            description: "Implement optimistic UI updates for likes, posts, and follows to provide immediate feedback before API responses",
            type: "improvement"
          },
          {
            title: "Loading States",
            description: "Add loading indicators, spinners, and skeleton loaders throughout the application for better user feedback",
            type: "improvement"
          },
          {
            title: "Form Validation",
            description: "Implement comprehensive form validation for authentication forms, profile editing, and post creation",
            type: "improvement"
          },
          {
            title: "Accessibility Features",
            description: "Add semantic HTML, ARIA labels, keyboard navigation support, focus management, and sufficient color contrast",
            type: "improvement"
          },
          {
            title: "Testing Setup",
            description: "Set up testing infrastructure with React Testing Library, Jest, and write tests for components, actions, and reducers",
            type: "improvement"
          },
          {
            title: "Performance Optimization",
            description: "Implement code splitting, lazy loading, image optimization, bundle size reduction, and analyze bundle with webpack-bundle-analyzer",
            type: "performance"
          },
          {
            title: "Social Components - FollowersCard",
            description: "Create FollowersCard component to display followers list with user information",
            type: "feature"
          },
          {
            title: "Social Components - TrendCard",
            description: "Build TrendCard component to display trending topics and hashtags",
            type: "feature"
          },
          {
            title: "Social Components - UserFollow",
            description: "Create UserFollow component for follow/unfollow functionality with user suggestions",
            type: "feature"
          }
        ]
      }
    ]
  },
  {
    product: "VibeCircles Docs Extensions",
    brand: "cyan",
    columns: [
      {
        title: "Planned",
        tasks: [
          {
            title: "Analytics Integration",
            description: "Add support for popular analytics platforms",
            type: "feature"
          },
          {
            title: "Localization Support",
            description: "Add multi-language support for documentation",
            type: "feature"
          },
          {
            title: "Backend - Project Overview",
            description: "Document VibeCircles backend RESTful API overview covering user authentication, profile management, social features (follow/unfollow), post creation, like/dislike functionality, timeline generation, and file uploads. Technology stack: Node.js, Express.js, MongoDB with Mongoose, JWT, Multer, bcrypt",
            type: "documentation"
          },
          {
            title: "Backend - Project Structure",
            description: "Document MVC architecture with directory layout: index.js entry point, Models (userModel, postModel), Controllers (AuthController, UserController, PostController), Routes (AuthRoute, UserRoute, PostRoute, UploadRoute), Middleware (authMiddleWare), and public/images for file storage",
            type: "documentation"
          },
          {
            title: "Backend - Dependencies",
            description: "Document core dependencies: express, mongoose, body-parser, cors, dotenv. Security packages: jsonwebtoken, bcrypt. File handling: multer. Development: nodemon. Installation and version requirements",
            type: "documentation"
          },
          {
            title: "Backend - Main Entry Point",
            description: "Document index.js server configuration: Express initialization, middleware setup (CORS, body-parser with 30MB limit), static file serving, MongoDB connection, route registration (/auth, /user, /post, /upload), and server startup",
            type: "documentation"
          },
          {
            title: "Backend - Database Models",
            description: "Document User and Post Mongoose schemas. User model: email, password, firstname, lastname, profilePicture, coverPicture, followers, following arrays. Post model: userId, desc, likes array, image. Relationships and field definitions",
            type: "documentation"
          },
          {
            title: "Backend - Controllers",
            description: "Document business logic: AuthController (registerUser, loginUser with JWT), UserController (getAllUsers, getUser, updateUser, deleteUser, followUser, UnFollowUser), PostController (createPost, getPost, updatePost, deletePost, like_dislike_Post, timeline with aggregation)",
            type: "documentation"
          },
          {
            title: "Backend - Routes",
            description: "Document API route definitions: AuthRoute (/register, /login), UserRoute (GET /, GET /:id, PUT /:id, DELETE /:id, PUT /:id/follow, PUT /:id/unfollow), PostRoute (POST /, GET /:id, PUT /:id, DELETE /:id, PUT /:id/like_dislike, GET /:id/timeline), UploadRoute (POST / with Multer)",
            type: "documentation"
          },
          {
            title: "Backend - Middleware",
            description: "Document authentication middleware (authMiddleWare): JWT token extraction from Authorization header, token verification using JWT_KEY, user ID extraction and attachment to req.body, error handling improvements needed for production",
            type: "documentation"
          },
          {
            title: "Backend - API Endpoints",
            description: "Document complete API reference with request/response examples for all endpoints: authentication (register, login), user management (get all, get by ID, update, delete, follow, unfollow), post operations (create, read, update, delete, like/dislike, timeline), and file upload",
            type: "documentation"
          },
          {
            title: "Backend - Environment Variables",
            description: "Document required environment variables: MONGO_DB (connection string), PORT (server port), JWT_KEY (secret for token signing). Security best practices, .env file setup, production considerations, and dotenv configuration",
            type: "documentation"
          },
          {
            title: "Backend - Security Considerations",
            description: "Document security features: password hashing with bcrypt, JWT authentication, authorization checks, password exclusion from responses, file upload security. Areas for improvement: input validation, rate limiting, file type validation, HTTPS, token expiration, CORS configuration",
            type: "security"
          },
          {
            title: "Backend - Error Handling",
            description: "Document HTTP status codes (200, 400, 403, 404, 500), error response patterns, try-catch blocks, validation errors, authorization errors. Areas for improvement: consistent error format, error logging, error middleware, detailed validation messages, database error handling",
            type: "improvement"
          },
          {
            title: "Backend - Development",
            description: "Document development setup: prerequisites (Node.js, MongoDB), installation steps, environment configuration, MongoDB setup (local/Atlas), running server with nodemon, project scripts, development workflow, API testing with curl/Postman, common issues and solutions",
            type: "documentation"
          },
          {
            title: "Backend - Future Improvements",
            description: "Document enhancement suggestions: security (input validation, rate limiting, file upload validation), features (pagination, search, comments, notifications, email verification), performance (database indexing, caching, API optimization), code quality (testing, linting, API docs), infrastructure (Docker, CI/CD, monitoring)",
            type: "improvement"
          },
          {
            title: "Custom Themes",
            description: "Allow users to create and apply custom themes",
            type: "improvement"
          },
          {
            title: "Code Syntax Highlighting",
            description: "Support for syntax highlighting in code blocks",
            type: "feature"
          },
          {
            title: "Image Optimization",
            description: "Automatic optimization of images in documentation",
            type: "performance"
          }
        ]
      }
    ]
  }
];

const task = {
  bug: {
    label: "Bug", 
    color: "red" 
  },
  feature: { 
    label: "Feature", 
    color: "green" 
  },
  improvement: { 
    label: "Improvement", 
    color: "blue" 
  },
  documentation: { 
    label: "Docs", 
    color: "magenta" 
  },
  performance: { 
    label: "Performance", 
    color: "orange" 
  },
  security: { 
    label: "Security", 
    color: "indigo" 
  }
};

export { roadmap, task };