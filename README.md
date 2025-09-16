# [Odin Blog Viewer](https://odin-blog-viewer.hussein-kandil.vercel.app/)

A **blog viewing app** built as part of the required projects at [The Odin Project Node.js course](https://www.theodinproject.com/paths/full-stack-javascript/courses/nodejs).

**The course requirements for this project are divided into 3 pieces**:

1. **Backend API**, which I built as part of the [`generic-express-service`](https://github.com/hussein-m-kandil/generic-express-service).
2. **Blog Author Site**: which I built in [`odin-blog-author`](https://github.com/hussein-m-kandil/odin-blog-author).
3. **Blog Viewer Site**: which I built in this project for only viewing the blog posts and interacting with them.

**Here are the requirements from the course website**:

> We’re actually going to create the backend and two different front-ends for accessing and editing your blog posts. One of the front-end sites will be for people that want to read and comment on your posts, while the other one will be just for you to write, edit and publish your posts. Why are we setting it up like this? Because we can! The important exercise here is setting up the API and then accessing it from the outside.

---

## Tech Stack

- [TypeScript](https://www.typescriptlang.org/)
- [Zod](https://zod.dev/) for input validation
- [React](https://react.dev/) with its Context API
- [React Hook Form](https://react-hook-form.com/) for controlled form state
- [React Testing Library](https://testing-library.com/) for component testing
- [Next.js](https://nextjs.org/) with SSR and `fetch` for server HTTP requests
- [TanStack Query](https://tanstack.com/query/) for data fetching and caching
- [Motion (prev Framer Motion)](https://motion.dev/) for animations
- [axios](https://axios-http.com/) for browser HTTP requests
- [date-fns](https://date-fns.org/) for date formatting
- [shadcn/ui](https://ui.shadcn.com/) for UI primitives
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [vitest](https://vitest.dev/) for running tests

---

## Challenges

While building this project, I faced several challenges, such as:

- **Authentication with SSR**:
  I wanted the backend to handle auth while still leveraging Next.js SSR. The solution was to introduce a custom Next.js API route that proxies auth requests, maintains a cookie between the Next server and frontend, and uses a Bearer token schema between the Next server and backend. Check out the [auth route](./src/app/api/auth/[action]/route.ts), [auth module](./src/lib/auth.ts), and [auth context](./src/contexts/auth-context/auth-context.tsx) for implementation details.

- **Avatar Uploader & Editor**:
  The backend image upload was already a challenge in the [`generic-express-service`](https://github.com/hussein-m-kandil/generic-express-service). On the frontend, I needed to show the selected image immediately and allow deleting the image or positioning it within the image boundaries, while not committing any of these changes until submitting the image form. I built a small custom image toolkit to handle this. Check out [`ImageToolkit`](./src/components/image-toolkit/image-toolkit.tsx), [`MutableImage`](./src/components/mutable-image/mutable-image.tsx), [`ImageInput`](./src/components/image-input/image-input.tsx), [`ImageForm`](./src/components/image-form/image-form.tsx), and [`UserProfile`](./src/components/user-profile/user-profile.tsx) for implementation details.

- **Reusable/Customizable Tested Components**:
  I tried hard to build this app consists of multiple reusable/customizable components to be useful for future usage, and to facilitate the app's maintainability.

---

## Features

- **Authentication & Authorization**

  - Custom solution that bridges SSR in Next.js with backend auth.
  - Auth API route in Next.js acts as a middle layer between frontend and backend.
  - Auth context on the frontend with cookie-based session between the Next.js server and its frontend.
  - Bearer token schema between Next.js and the backend.

- **Comments**

  - Add, update, and delete comments.
  - Infinite loading of comments.

- **User Profile**

  - View/Edit profile info (username, bio, avatar).
  - Profile-specific post listings.
  - delete account.

- **User Avatar**

  - Upload and store avatar using the backend service.
  - Simple in-app avatar editor to adjust position.
  - Temporarily delete/edit an avatar until submission.
  - Automatic image browser-cache invalidation, for real-time mutations.

- **UI/UX**

  - Animated components via [Motion (prev Framer Motion)](https://motion.dev/).
  - Loading skeletons for better perceived performance.
  - Responsive, dark/light/system mode.
  - Toast notifications for global feedback.

- **Testing**
  - Component tests with [`vitest`](https://vitest.dev/).

---

## Local Development

### Requirements

- Node.js (20 LTS or later)
- Clone of [`generic-express-service`](https://github.com/hussein-m-kandil/generic-express-service)

### Setup

1. **Clone and set up the backend**

   > Refer to [`generic-express-service`](https://github.com/hussein-m-kandil/generic-express-service) for more details.

   ```bash
   git clone https://github.com/hussein-m-kandil/generic-express-service.git
   cd generic-express-service
   npm install
   # Refer to `.env.test` to configure .env (DB connection, ports, etc.)
   # Start the PostgreSQL database
   npm run pg:up
   # Build the backend source code
   npm run build
   # Start the backend production server
   npm run start
   ```

   > Make note of the backend base URL, which should be `http://localhost:8080/api/v1`. You will need it in the frontend `.env`.

2. **Clone, install, and configure the Next.js app**

   ```bash
   git clone https://github.com/hussein-m-kandil/odin-blog-viewer.git
   cd odin-blog-viewer
   npm ci
   cp env.sample .env
   cp env.sample .env.test
   npm run test -- --run
   npm run dev
   ```

   > The app will be available at: `http://localhost:3000`.

3. **Useful scripts**

   - **Start dev server**: `npm run dev`
   - **Build**: `npm run build`
   - **Run tests**: `npm test`
   - **Lint**: `npm run lint`
   - **Type check**: `npm run type-check`
   - **Start production server**: `npm run start`

   > **Important Note**: A secure cookie is used for authentication between the browser and the Next.js server, _hence an `https` scheme is mandatory_. So, connecting to the local `http` server via local IP address from another device (e.g, mobile phone), won't work as expected, and _you will never leave the signin/signup pages even after a successful sign-in_. The only solution that I know for this situation is using the [`--experimental-https` option with the Next.js dev server](https://nextjs.org/docs/app/api-reference/cli/next#using-https-during-development).
