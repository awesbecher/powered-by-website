
# Admin Whitepaper Upload Instructions

To upload a whitepaper, you'll need to use an API client like Postman or curl to make a POST request:

## Upload Endpoint

```
POST https://cinohyzbtfzfcdtkgvij.supabase.co/functions/v1/upload-whitepaper
```

## Headers Required

```
Authorization: Bearer YOUR_ADMIN_UPLOAD_KEY
apikey: YOUR_SUPABASE_ANON_KEY
```

## Request Body (form-data)

- `file`: Your PDF file
- `title`: The title of the whitepaper
- `description`: (Optional) A brief description

## Example using curl

```bash
curl -X POST https://cinohyzbtfzfcdtkgvij.supabase.co/functions/v1/upload-whitepaper \
  -H "Authorization: Bearer YOUR_ADMIN_UPLOAD_KEY" \
  -H "apikey: YOUR_SUPABASE_ANON_KEY" \
  -F "file=@/path/to/your/whitepaper.pdf" \
  -F "title=Your Whitepaper Title" \
  -F "description=A brief description of the whitepaper"
```

## Security Note

Keep your ADMIN_UPLOAD_KEY secure and never share it publicly. This key restricts whitepaper uploads to administrators only.
