# Render.com Configuration - TranscriptorPro

## Build Command
```
npm install && npm run build
```

## Start Command
```
npm start
```

## Environment Variables
Set these in your Render.com dashboard:

### Required
- `NODE_ENV=production`
- `NEXT_PUBLIC_SITE_URL=https://your-app-name.onrender.com`
- `OPENAI_API_KEY=your_openai_api_key_here`

### Application Config
- `NEXT_PUBLIC_MAX_FILE_SIZE=104857600`
- `NEXT_PUBLIC_MAX_DURATION=600`
- `NEXT_PUBLIC_SUPPORTED_FORMATS=mp4,avi,mov,mkv,webm,flv,wmv,m4v`
- `RATE_LIMIT_MAX_REQUESTS=10`
- `RATE_LIMIT_WINDOW=60000`

### Developer Info
- `NEXT_PUBLIC_DEVELOPER_NAME=Kelvin Jose Piña Gomez`
- `NEXT_PUBLIC_DEVELOPER_EMAIL=kelvin8bp@gmail.com`
- `NEXT_PUBLIC_DEVELOPER_GITHUB=https://github.com/Kelvin0880`
- `NEXT_PUBLIC_DEVELOPER_LINKEDIN=https://www.linkedin.com/in/kelvin-jose-pi%C3%B1a-9a5249373/`

### Optional (for enhanced features)
- `GOOGLE_TRANSLATE_API_KEY=your_google_translate_api_key_here`

## Deployment Steps

1. **Create Account**: Sign up at [render.com](https://render.com)

2. **Connect Repository**: 
   - Click "New +"
   - Select "Web Service"
   - Connect your GitHub repository

3. **Configure Service**:
   - **Name**: transcriptor-pro (or your preferred name)
   - **Environment**: Node
   - **Region**: Choose closest to your users
   - **Branch**: main
   - **Root Directory**: Leave empty
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`

4. **Set Environment Variables**:
   - Add the environment variables listed above
   - Set `NODE_ENV` to `production`

5. **Deploy**: Click "Create Web Service"

## Features Available

✅ **Free Tier Includes**:
- 750 hours/month of runtime
- Automatic SSL certificates
- Custom domains
- Git-based deployments
- Automatic builds on push

⚠️ **Limitations on Free Tier**:
- Service sleeps after 15 minutes of inactivity
- 512MB RAM limit
- Shared CPU
- 10GB bandwidth/month

## Upgrading for Production

For production use, consider upgrading to paid plans for:
- Always-on services
- More RAM and CPU
- Higher bandwidth
- Priority support

## Additional Notes

- The app will be available at `https://your-app-name.onrender.com`
- Build time is typically 2-5 minutes
- Deployments are automatic on git push to main branch
- View logs in the Render dashboard for debugging

## Database Setup (Optional)

If you need a database later:
1. Create a PostgreSQL database on Render
2. Add the connection string to environment variables
3. Update your application to use the database

## Monitoring

Render provides built-in monitoring:
- CPU and memory usage
- Response times
- Error rates
- Deploy history
