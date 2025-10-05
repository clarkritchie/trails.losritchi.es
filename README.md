# trails.losritchi.es

This is a tiny and very simple React app for me and myself only.  I use it to formulate my mountain bike ride names (for Strava) using the actual trail names in the Bend area in the form that I want, for example:  Ben's > VooDoo > Phil's

See [trails.losritchi.es](http://trails.losritchi.es).

## Recent Updates (October 2025)

The project has been modernized with the following updates:

### Dependency Updates
- **React**: Updated to 18.3.1 with modern hooks-based components
- **React-DOM**: Updated to 18.3.1 with new `createRoot` API
- **React-Bootstrap**: Updated to 2.10.5 (Bootstrap 5)
- **Bootstrap**: Updated to 5.3.3
- **React-Select**: Updated to 5.8.1
- **Clipboard**: Updated to 2.0.11
- **Underscore**: Updated to 1.13.7

### Code Modernization
- Converted from `React.createClass` to modern functional components with hooks
- Replaced deprecated `ReactDOM.render` with `createRoot`
- Updated React-Bootstrap components to v5 API
- Removed incompatible `react-interval` dependency (replaced with native `setTimeout`)
- Added proper accessibility attributes and modern React patterns

### Build System
- Added `rimraf` as proper dev dependency
- Updated browserslist configuration
- Fixed test runner configuration

## Build and Deploy

Assuming your AWS CLI is setup, then:

```bash
npm install --legacy-peer-deps  # Install dependencies
npm run build                   # Build for production
npm run deploy [patch|minor|major] # Deploy (default is patch)
```

## Development

```bash
npm start  # Start development server
npm test   # Run tests
```

## Links

- [Favicon Generator](https://favicon.io/favicon-generator/)
- [React 18 Documentation](https://react.dev/)
- [React-Bootstrap Documentation](https://react-bootstrap.github.io/)
