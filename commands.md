meilisearch --master-key=cbxwT43xWA5aVCljzkF6h0YvIAHW3aQ4


curl -X GET 'http://51.158.117.47/keys' \
  --header "X-Meili-API-Key: masterKey"

sudo certbot --nginx -d meilisearch.alerti.com -d www.meilisearch.alerti.com