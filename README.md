# Document Management System

A modern Single Page Application (SPA) built with React, TypeScript, Redux, and Material UI for managing documents.

## Features

- User authentication with persistent session
- CRUD operations for documents
- Modern and responsive UI with Material UI components
- Form validation using Formik and Yup
- Error handling and loading states
- Type-safe development with TypeScript
- State management with Redux Toolkit

## Prerequisites

- Node.js (v18 or higher)
- npm (v7 or higher)

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd <repository-name>
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Usage

1. Login using the following credentials:
   - Username: `user{N}` (where N is a number from 1 to 33)
   - Password: `password`

2. After successful login, you'll be redirected to the documents page where you can:
   - View all documents in a table format
   - Add new documents
   - Edit existing documents
   - Delete documents

## Project Structure

```
src/
├── components/     # Reusable UI components
├── pages/         # Page components
├── store/         # Redux store configuration and slices
├── services/      # API services
├── types/         # TypeScript type definitions
├── utils/         # Utility functions
├── hooks/         # Custom React hooks
└── layouts/       # Layout components
```

## Technologies Used

- React
- TypeScript
- Redux Toolkit
- Material UI
- React Router
- Formik
- Yup
- Axios
- date-fns

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
