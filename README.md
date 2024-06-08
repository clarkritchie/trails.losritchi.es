# Trails

I made this little React app so that I can formulate my mountain bike ride names for Strava using trail names in the format that I want, for example:  Ben's > VooDoo > Phil's

See [trails.losritchi.es](http://trails.losritchi.es).

Assuming your AWS CLI is setup, then `npm run build; cd build; export AWS_PROFILE=personal; aws s3 sync . s3://trails.losritchi.es`

### Upgrade

- [official docs](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md#updating-to-new-releases)
- `npm install --save-dev --save-exact react-scripts@x.y.z`

### Etc

- [Favicon Generator](https://favicon.io/favicon-generator/)
