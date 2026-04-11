# Certificates Section Setup Guide

## Frontend (✅ Complete)
The frontend has been fully updated with:
- ✅ Certificate interface and fetcher in `src/lib/strapi.ts`
- ✅ New Certificates component at `src/app/components/home/certificates/index.tsx`
- ✅ Page updated to fetch and display certificates

## Backend (Strapi) - Setup Instructions

### Step 1: Create Certificates Collection Type in Strapi

1. Go to your Strapi admin panel (usually http://localhost:1337/admin)
2. Click **Content-Type Builder** (on the left sidebar)
3. Click **+ Create new collection type**
4. Name it: `certificate` (Strapi will pluralize it to `certificates`)
5. Click **Continue**

### Step 2: Add Fields to Certificate Collection

Add these fields in this order:

1. **title** (Text - Short text)
   - Required: Yes

2. **issuer** (Text - Short text)
   - Required: Yes
   - Example: "Coursera", "Google", "LinkedIn"

3. **description** (Text - Long text)
   - Required: No
   - Placeholder: "Brief description of the certificate"

4. **certificateUrl** (Text - Short text)
   - Field name: `certificateUrl`
   - Required: Yes
   - Placeholder: "https://example.com/certificate"
   - Help text: "Full URL to view/download the certificate"

5. **image** (Media - Single media)
   - Required: No
   - Help text: "Certificate image or badge"

6. **order** (Number - Integer)
   - Required: Yes
   - Default value: 0
   - Help text: "Display order (lower numbers appear first)"

### Step 3: Save and Publish

1. Click **Save** in the top-right corner
2. You'll see the new "Certificates" menu item in the left sidebar

### Step 4: Add Certificates via Headless CMS

1. Go to **Certificates** in the left sidebar
2. Click **+ Create new entry**
3. Fill in the fields:
   - **Title**: e.g., "AWS Solutions Architect Certification"
   - **Issuer**: e.g., "Amazon Web Services"
   - **Description**: e.g., "Associate level AWS certification"
   - **Certificate URL**: e.g., "https://www.credly.com/badges/xyz"
   - **Image**: Upload a certificate badge/image
   - **Order**: 1, 2, 3, etc.
4. Click **Publish** (top-right)

### Step 5: Update Strapi Permissions (if needed)

If using JWT authentication:

1. Go to **Settings** → **Roles** → **Public**
2. Under **Permissions**, find **Certificates**
3. Make sure `find` and `findOne` are checked
4. Click **Save**

### Step 6: Test the Connection

Once you've added certificates in Strapi:

```bash
# From your Next.js project, test the API:
curl "http://localhost:1337/api/certificates?sort=order:asc"
```

## Environment Variables

Make sure your `.env.local` has:
```
NEXT_PUBLIC_STRAPI_URL=http://localhost:1337
STRAPI_API_TOKEN=your_token_if_needed
```

## Frontend Display

The certificates will be displayed:
- **Location**: Between "Latest Work" and "Contact" sections
- **Layout**: Responsive grid (1 column mobile, 2 columns tablet, 3 columns desktop)
- **Features**:
  - Certificate image/badge preview
  - Title, issuer, and description
  - "View Certificate" button linking to certificateUrl
  - Hover animations

## API Response Example

The component expects data in this format:

```json
{
  "data": [
    {
      "id": 1,
      "title": "AWS Solutions Architect",
      "issuer": "Amazon",
      "description": "Associate level certification",
      "certificateUrl": "https://example.com/cert",
      "image": {
        "url": "/uploads/badge_xyz.png"
      },
      "order": 1
    }
  ]
}
```

## Done! 🎉

Your certificates section is ready. The data is now fully updatable through the Strapi CMS without needing to modify code.
