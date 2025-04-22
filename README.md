# House Finder

House Finder is a modern, responsive platform for finding and listing homes, featuring secure authentication, seamless property search, and an intuitive user experience.

## Features

- **Responsive Design**: Ensures seamless performance across all devices.
- **User Authentication**: Secure registration and login functionality for buyers, sellers, and agents.
- **Advanced Search**: Filter properties by location, price, size, and amenities.
- **Property Listings**: Detailed property pages with high-quality images, descriptions, and virtual tours.
- **User Dashboard**: Manage saved properties, inquiries, and account settings.
- **Real-time Notifications**: Success toasts for important actions like inquiries and updates.
- **Robust Error Handling**: Clear validation messages for forms and actions.

## Tech Stack

### Frontend
- **Next**: A powerful React framework for building web applications.
- **RadixUi**: A customizable component library for modern UIs.
- **TailwindCSS**: A utility-first CSS framework for rapid UI development.
- **NextAuth**: An authentication solution for Next.js applications.
- **TypeScript**: A statically typed superset of JavaScript.

### State Management
- **Next State Management**: Efficiently manage state in Next.js applications.
- **Context API**: A React feature for global state management.

### Forms & Validation
- React Hook Form
- Zod Validation

### Notifications & UI Enhancements
- **Sonner**: A lightweight notification library.
- **Lucide Icons**: A modern icon library for UI components.
- **NodeMailer**: A mail sending platform.

### Authentication & Security
- **JWT Decode**: A library for decoding JSON Web Tokens.

### Build & Development
- **Next**: A framework for building server-side rendered and static web applications.
- **TypeScript**: Enhances JavaScript with static typing for better code maintainability.
- 
## Live Demo

[Live Demo](https://house-finder-rakibul.vercel.app)

## Screenshots

![Homepage](https://i.ibb.co.com/Lzf71z7w/hr-banner.png
)
![listing](https://i.ibb.co.com/5XkQwRWP/listin-details.png
)
![userProfile](https://i.ibb.co.com/8gngQ4qx/user-profile.png
)
![Admin panel](https://i.ibb.co.com/Vp069bH9/admin-dashboard.png
)
![Admin panel2](https://i.ibb.co.com/4nqMChyk/dashboard-2.png
)
![create](https://i.ibb.co.com/9HQWdVXK/create-listing.png
)


## Getting Started

Follow these steps to set up the project locally:

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

## Environment Variables

Create a `.env.local` or `.env` file in the root directory and configure the following variables:

```env

NEXT_PUBLIC_BASE_API=<your_server_url>
#google re-captcha
NEXT_PUBLIC_RECAPTCHA_CLIENT_KEY=<your_recaptcha_client_key>
NEXT_PUBLIC_RECAPTCHA_SERVER_KEY=<your_recaptcha_server_key>
#cloudinary setup
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=<your_cloudinary_cloud_name>
NEXT_PUBLIC_CLOUDINARY_API_KEY=<your_cloudinary_api_key>
NEXT_PUBLIC_CLOUDINARY_API_SECRET=<your_cloudinary_api_secret>
CLOUDINARY_URL=<your_cloudinary_url>
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=<your_cloudinary_upload_preset>

```

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Rakibul-98/house-rent-client.git
   ```

2. Navigate to the project directory:
   ```bash
   cd house-rent-client
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open your browser and visit:
   ```
   http://localhost:3000
   ```

## Usage

- **Search for Properties**: Use the search bar and filters to find your dream home.
- **Create an Account**: Register to save properties, contact agents, and manage your profile.
- **List a Property**: Sellers and agents can list properties with detailed descriptions and images.
- **Track Inquiries**: View and manage inquiries from potential buyers or renters.

---

### 📌 Contributing
Feel free to fork the repository and submit pull requests.

### 📜 License
This project is licensed under the MIT License.

